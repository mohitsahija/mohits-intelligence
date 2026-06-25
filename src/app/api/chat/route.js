import { NextResponse } from 'next/server';

// ⚡ HELPER: Converts complex AI responses into a lightning-fast raw text stream
function createTextStream(response, provider) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  return new ReadableStream({
    async start(controller) {
      const reader = response.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ""; // Keep incomplete lines in the buffer

          for (const line of lines) {
            if (line.trim() === "" || line.trim() === "data: [DONE]") continue;
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                let text = provider === "gemini" 
                    ? (data.candidates?.[0]?.content?.parts?.[0]?.text || "") 
                    : (data.choices?.[0]?.delta?.content || "");
                
                if (text) controller.enqueue(encoder.encode(text));
              } catch (err) {
                // Ignore incomplete JSON chunks, they will resolve on the next pass
              }
            }
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    }
  });
}

export async function POST(request) {
  try {
    const { headline, source, customPrompt, provider = 'gemini' } = await request.json();
    
    const systemInstruction = `You are the core intelligence engine for "Mohit Sahija's Intelligence Dashboard".
    Your objective is to provide a highly structured, premium study guide based on the provided headline and source.
    
    DO NOT use markdown asterisks (**) for bolding. Use uppercase letters and simple text symbols (like ✦ or ■) to ensure a clean, modern aesthetic.
    
    FORMAT YOUR RESPONSE EXACTLY LIKE THIS:
    
    ■ COMPREHENSIVE OVERVIEW
    (Provide a 2-paragraph maximum summary of the event, match, or news item. Keep it professional, clear, and easy to read.)
    
    ■ KEY POINTERS & HIGHLIGHTS
    ✦ (Important fact or statistic 1)
    ✦ (Important fact or statistic 2)
    ✦ (Important fact or statistic 3)
    ✦ (Important fact or statistic 4)
    
    ■ DEEP INSIGHTS & ANALYSIS
    ✦ (Strategic implication, player performance, market impact, or future prediction based on the data)
    ✦ (Additional high-level insight)`;

    const userMessage = customPrompt 
      ? `Query: "${customPrompt}". Context Data: "${headline}" [Published via ${source}].`
      : `Deconstruct and expand this primary data payload: "${headline}" [Published via ${source}]. Extract every implicit structural impact.`;

    let apiResponse;

    // ==========================================
    // PROVIDER 1: LLAMA 3.1 (OpenRouter)
    // ==========================================
    if (provider === 'llama-cloud') {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) return NextResponse.json({ error: "OpenRouter API Key missing." }, { status: 400 });

      apiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://mohits-intelligence.com', 
          'X-Title': 'Mohit Intelligence Dashboard',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openrouter/free',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.2,
          stream: true // ⚡ STREAM ENABLED
        })
      });

    // ==========================================
    // PROVIDER 2: GOOGLE GEMINI
    // ==========================================
    } else if (provider === 'gemini') {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return NextResponse.json({ error: "Gemini API Key missing." }, { status: 400 });

      // ⚡ ENDPOINT CHANGED TO STREAMING (alt=sse)
      apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: { text: systemInstruction } },
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: { temperature: 0.2 }
        })
      });

    // ==========================================
    // PROVIDER 3: OPENAI
    // ==========================================
    } else if (provider === 'openai') {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) return NextResponse.json({ error: "OpenAI API Key missing." }, { status: 400 });

      apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.2,
          stream: true // ⚡ STREAM ENABLED
        })
      });
    }

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(errorData.error?.message || "Failed to connect to AI provider");
    }

    // ⚡ Return the live stream directly to the frontend
    const stream = createTextStream(apiResponse, provider);
    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });

  } catch (err) {
    console.error("AI Routing Error:", err);
    return NextResponse.json({ error: err.message || "Failed processing AI request." }, { status: 500 });
  }
}
