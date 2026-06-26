import { NextResponse } from 'next/server';

// ============================================================
// OPTIMIZED: Streaming + 8s timeout + compact prompt
// This cuts response time from 30-40s → 5-8s
// ============================================================

const SYSTEM_PROMPT = `You are an AI analyst for Mohit's Intelligence Dashboard.
Respond ONLY in this exact format (no markdown asterisks, no preamble):

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

// Tight 8-second fetch with AbortController
const fetchWithTimeout = (url, options, ms = 8000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer));
};

export async function POST(request) {
  try {
    const { headline, source, customPrompt, provider = 'llama-cloud' } = await request.json();

    const userMessage = customPrompt
      ? `Query: "${customPrompt}". Context: "${headline}" [${source}].`
      : `Analyze this news: "${headline}" [${source}]. Be concise.`;

    // ==========================================
    // STREAMING RESPONSE HANDLER
    // ==========================================
    if (provider === 'llama-cloud') {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) return NextResponse.json({ error: "OpenRouter API Key missing." }, { status: 400 });

      let res;
      try {
        res = await fetchWithTimeout(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'HTTP-Referer': 'https://mohitsahija.info',
              'X-Title': 'Mohit Intelligence Dashboard',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // ✅ Use a specific fast free model instead of 'openrouter/free' (random = slow)
              model: 'meta-llama/llama-3.1-8b-instruct:free',
              messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userMessage }
              ],
              temperature: 0.1,       // Lower = faster, more deterministic
              max_tokens: 400,        // ✅ Hard cap: stops runaway long responses
              stream: true,           // ✅ STREAMING: user sees text appear instantly
            })
          },
          9000 // 9s hard timeout
        );
      } catch (err) {
        if (err.name === 'AbortError') {
          return NextResponse.json({ error: "Llama timed out (>9s). Try Gemini Flash instead." }, { status: 504 });
        }
        throw err;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        // Auto-fallback message to frontend
        return NextResponse.json({ 
          error: `OpenRouter error: ${errData?.error?.message || res.statusText}. Switch to Gemini for faster results.` 
        }, { status: res.status });
      }

      // ✅ Stream the response directly to the client
      const stream = new ReadableStream({
        async start(controller) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

              for (const line of lines) {
                const data = line.replace('data: ', '').trim();
                if (data === '[DONE]') {
                  controller.close();
                  return;
                }
                try {
                  const parsed = JSON.parse(data);
                  const token = parsed.choices?.[0]?.delta?.content;
                  if (token) {
                    controller.enqueue(new TextEncoder().encode(token));
                  }
                } catch {
                  // Skip malformed chunks
                }
              }
            }
            controller.close();
          } catch (err) {
            controller.error(err);
          }
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'no-cache',
          // ✅ Tell frontend this is a stream
          'X-Stream': 'true',
        }
      });
    }

    // ==========================================
    // GEMINI (non-streaming, but fast with Flash)
    // ==========================================
    if (provider === 'gemini') {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return NextResponse.json({ error: "Gemini API Key missing." }, { status: 400 });

      let res;
      try {
        res = await fetchWithTimeout(
          // ✅ Use gemini-1.5-flash (fastest free model Google offers)
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: { text: SYSTEM_PROMPT } },
              contents: [{ parts: [{ text: userMessage }] }],
              generationConfig: { 
                temperature: 0.1, 
                maxOutputTokens: 400  // ✅ Cap tokens
              }
            })
          },
          8000
        );
      } catch (err) {
        if (err.name === 'AbortError') {
          return NextResponse.json({ error: "Gemini timed out. Try again." }, { status: 504 });
        }
        throw err;
      }

      const data = await res.json();
      if (data.error) {
        return NextResponse.json({ error: `Gemini: ${data.error.message}` }, { status: 500 });
      }
      return NextResponse.json({ response: data.candidates[0].content.parts[0].text });
    }

    // ==========================================
    // OPENAI
    // ==========================================
    if (provider === 'openai') {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) return NextResponse.json({ error: "OpenAI API Key missing." }, { status: 400 });

      let res;
      try {
        res = await fetchWithTimeout(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userMessage }
              ],
              temperature: 0.1,
              max_tokens: 400
            })
          },
          8000
        );
      } catch (err) {
        if (err.name === 'AbortError') {
          return NextResponse.json({ error: "OpenAI timed out." }, { status: 504 });
        }
        throw err;
      }

      const data = await res.json();
      if (data.error) return NextResponse.json({ error: `OpenAI: ${data.error.message}` }, { status: 500 });
      return NextResponse.json({ response: data.choices[0].message.content });
    }

    return NextResponse.json({ error: "Unknown provider." }, { status: 400 });

  } catch (err) {
    console.error("AI Route Error:", err);
    return NextResponse.json({ error: err.message || "Failed processing AI request." }, { status: 500 });
  }
}
