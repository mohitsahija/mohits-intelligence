import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { headline, source, customPrompt, provider = 'gemini' } = await request.json();
    
    const systemInstruction = `You are the core intelligence engine for "Mohit Sahija's Intelligence Dashboard".
    Your objective is to provide a highly structured, premium study guide based on the provided headline and source.
    DO NOT use markdown asterisks (**). Use uppercase letters and simple symbols (like ✦ or ■) to ensure a clean, modern aesthetic.
    
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
      ? `Query: "${customPrompt}". Context: "${headline}" [Published via ${source}].`
      : `Deconstruct and expand: "${headline}" [Published via ${source}].`;

    // 1. LLAMA 3.1 (FASTEST FREE MODEL)
    if (provider === 'llama-cloud') {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) throw new Error("OpenRouter API Key missing.");

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://mohitsahija.info',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          messages: [{ role: 'system', content: systemInstruction }, { role: 'user', content: userMessage }],
          temperature: 0.2,
          stream: true
        })
      });

      return new Response(response.body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

    // 2. GOOGLE GEMINI (STREAMING)
    } else if (provider === 'gemini') {
      const apiKey = process.env.GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: { text: systemInstruction } },
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: { temperature: 0.2 }
        })
      });
      
      return new Response(response.body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }

    return NextResponse.json({ error: "Provider not supported" }, { status: 400 });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
```

### 2. Update your `handleItemSelection` in `page.js`
Because the backend now "streams" the text, you must update the function in your `page.js` that talks to this API. **Replace your current `handleItemSelection` with this version:**

```javascript
  const handleItemSelection = async (item, forceProvider = aiProvider) => {
    setSelectedItem(item);
    setAiAnalysis("");
    setAiLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: item.title, source: item.source, provider: forceProvider })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      setAiLoading(false); // Stop loading spinner as soon as stream starts

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        setAiAnalysis(prev => prev + chunk); // Text appears live!
      }
    } catch (err) {
      setAiAnalysis("❌ Error: Failed to stream analysis.");
      setAiLoading(false);
    }
  };
```
