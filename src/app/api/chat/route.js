import { NextResponse } from 'next/server';

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

    let responseText = "";

    // ==========================================
    // PROVIDER 1: LLAMA 3.1 (FREE CLOUD 24/7 via OpenRouter)
    // ==========================================
    if (provider === 'llama-cloud') {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) return NextResponse.json({ error: "OpenRouter API Key is missing. Add OPENROUTER_API_KEY to .env.local" }, { status: 400 });

      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://mohits-intelligence.com', 
          'X-Title': 'Mohit Intelligence Dashboard',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // ⚡ THIS IS THE FIX: Updated to the NEW 3.1 Free Model!
         model: 'openrouter/free',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.2
        })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(`Cloud Llama Error: ${data.error.message || 'Rate limit reached, please wait a moment.'}`);
      responseText = data.choices[0].message.content;

    // ==========================================
    // PROVIDER 2: GOOGLE GEMINI
    // ==========================================
    } else if (provider === 'gemini') {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return NextResponse.json({ error: "Gemini API Key is missing." }, { status: 400 });

      let retries = 1;
      let data;
      
      while (retries >= 0) {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: { text: systemInstruction } },
            contents: [{ parts: [{ text: userMessage }] }],
            generationConfig: { temperature: 0.2 }
          })
        });
        
        data = await res.json();
        
        if (data.error && (data.error.code === 429 || data.error.message.includes('high demand'))) {
          if (retries === 0) throw new Error(`Gemini Servers are currently overloaded: ${data.error.message}`);
          await new Promise(resolve => setTimeout(resolve, 1500));
          retries--;
        } else if (data.error) {
          throw new Error(`Gemini Error: ${data.error.message}`);
        } else {
          break;
        }
      }
      responseText = data.candidates[0].content.parts[0].text;

    // ==========================================
    // PROVIDER 3: OPENAI
    // ==========================================
    } else if (provider === 'openai') {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) return NextResponse.json({ error: "OpenAI API Key is missing." }, { status: 400 });

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.2
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(`OpenAI Error: ${data.error.message}`);
      responseText = data.choices[0].message.content;
    }

    return NextResponse.json({ response: responseText });

  } catch (err) {
    console.error("AI Routing Error:", err);
    return NextResponse.json({ error: err.message || "Failed processing AI request." }, { status: 500 });
  }
}

