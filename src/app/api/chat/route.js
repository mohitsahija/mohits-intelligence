import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { headline, source, customPrompt, provider = 'gemini' } = await request.json();
    
    const systemInstruction = `You are the core intelligence engine for "Mohit Sahija's Intelligence Dashboard". 
    Provide a structured study guide based on the provided headline and source.
    DO NOT use markdown asterisks (**). Use uppercase letters and simple symbols (✦ or ■).
    
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
      ? `Query: "${customPrompt}". Context: "${headline}" [Source: ${source}].` 
      : `Analyze: "${headline}" [Source: ${source}].`;

    // Controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    let responseText = "";

    // ==========================================
    // PROVIDER 1: LLAMA 3.1 (FAST)
    // ==========================================
    if (provider === 'llama-cloud') {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [{ role: 'system', content: systemInstruction }, { role: 'user', content: userMessage }],
          temperature: 0.2,
          max_tokens: 600
        })
      });

      const data = await res.json();
      clearTimeout(timeoutId);
      
      // Safety check: ensure response structure exists
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error(data.error?.message || "AI failed to return a valid response.");
      }
      responseText = data.choices[0].message.content;

    // ==========================================
    // PROVIDER 2: GOOGLE GEMINI
    // ==========================================
    } else if (provider === 'gemini') {
      const apiKey = process.env.GEMINI_API_KEY;
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          system_instruction: { parts: { text: systemInstruction } },
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: { temperature: 0.2 }
        })
      });
      
      const data = await res.json();
      clearTimeout(timeoutId);
      
      if (!data.candidates || !data.candidates[0].content) {
        throw new Error("Gemini returned an empty response.");
      }
      responseText = data.candidates[0].content.parts[0].text;
    }

    return NextResponse.json({ response: responseText });

  } catch (err) {
    console.error("AI Error:", err);
    return NextResponse.json({ 
      error: err.name === 'AbortError' ? "Request timed out." : err.message 
    }, { status: 500 });
  }
}
