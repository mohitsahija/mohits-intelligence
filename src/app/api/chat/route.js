import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { headline, source, customPrompt, provider = 'llama-cloud' } = await request.json();
    
    // Optimized system instruction: shorter tokens = faster generation
    const systemInstruction = `You are Mohit's Intelligence. Analyze: "${headline}" [Source: ${source}]. Provide a structured summary.
    
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
      ? `Query: "${customPrompt}".` 
      : `Analyze this news: "${headline}" [${source}].`;

    // Strict 15-second timeout logic
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    let responseText = "";

    if (provider === 'llama-cloud') {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://mohitsahija.info',
          'Content-Type': 'application/json'
        },
        signal: controller.signal, // Attaching timeout
        body: JSON.stringify({
          // ⚡ UPDATED: Using the fastest dedicated model instead of the generic load balancer
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.2,
          max_tokens: 500 // ⚡ Limit length to force speed
        })
      });

      const data = await res.json();
      clearTimeout(timeoutId);
      
      if (data.error) throw new Error(data.error.message);
      responseText = data.choices[0].message.content;
    }

    return NextResponse.json({ response: responseText });

  } catch (err) {
    console.error("AI Error:", err);
    return NextResponse.json({ 
      error: err.name === 'AbortError' ? "The AI is taking too long to respond. Please try again." : err.message 
    }, { status: 500 });
  }
}
