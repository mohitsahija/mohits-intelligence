import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const revalidate = 0;

const parser = new Parser({
  customFields: { item: ['content:encoded', 'description'] },
  timeout: 8000, 
});

// MASSIVE EXPANSION: Added all Global Sports Arena feeds to fix the blank screens
const LIVE_FEEDS = {
  // --- GLOBAL SPORTS ARENA ---
  "Cricket World": "https://news.google.com/rss/search?q=Cricket+live+score+match+updates+ICC+BCCI+when:1d&hl=en-IN&gl=IN&ceid=IN:en",
  "Football & Transfers": "https://news.google.com/rss/search?q=Football+soccer+premier+league+champions+league+transfer+news+when:1d&hl=en-GB&gl=GB&ceid=GB:en",
  "Basketball & NBA": "https://news.google.com/rss/search?q=NBA+basketball+scores+standings+highlights+when:1d&hl=en-US&gl=US&ceid=US:en",
  "Tennis & Racquet Sports": "https://news.google.com/rss/search?q=Tennis+ATP+WTA+Grand+Slam+results+news+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Combat Sports (MMA/Box)": "https://news.google.com/rss/search?q=UFC+MMA+Boxing+fight+results+news+when:2d&hl=en-US&gl=US&ceid=US:en",

  // --- VIRAL & TRENDING ---
  "Trending Now (Breaking)": "https://news.google.com/rss/search?q=Breaking+News+Trending+Now+when:1d&hl=en-US&gl=US&ceid=US:en",
  "Viral Content & Buzz": "https://news.google.com/rss/search?q=Viral+internet+trends+buzzworthy+social+media+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Most Searched Topics": "https://news.google.com/rss/search?q=most+searched+trends+google+when:1d&hl=en-US&gl=US&ceid=US:en",

  // --- FINANCE & CARDS ---
  "World Money & Stocks": "https://news.google.com/rss/search?q=Stock+Market+Global+Finance+IPO+news+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Credit & Debit Cards": "https://news.google.com/rss/search?q=Credit+Cards+OR+Debit+Cards+banking+offers+finance+when:3d&hl=en-IN&gl=IN&ceid=IN:en",
  "Travel & Forex Cards": "https://news.google.com/rss/search?q=Travel+Cards+OR+Forex+Cards+international+spending+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
  "Business & Virtual Cards": "https://news.google.com/rss/search?q=Business+Credit+Cards+OR+Virtual+Cards+corporate+expense+when:7d&hl=en-US&gl=US&ceid=US:en",
  "Rewards & Cashback Offers": "https://news.google.com/rss/search?q=Credit+Card+Rewards+OR+Cashback+Offers+points+when:3d&hl=en-US&gl=US&ceid=US:en",

  // --- CORE INTELLIGENCE ---
  "SME & Corporate Expansion": "https://news.google.com/rss/search?q=(announces+new+facility+OR+opens+new+office+OR+infrastructure+expansion)+AND+(India+OR+Global)+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Ahmedabad Business Leads": "https://news.google.com/rss/search?q=(Ahmedabad+OR+GIFT+City+OR+Sanand+OR+Naroda+OR+Bavla+OR+Changodar)+(inaugurates+OR+opens+office+OR+new+branch+OR+facility+OR+plant+OR+investment+OR+MOU+OR+deal+OR+expansion+OR+sets+up+OR+launches)+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Gujarat Industry Watch": "https://news.google.com/rss/search?q=(Gujarat+OR+Ahmedabad)+(company+OR+business+OR+corporate+OR+SME+OR+startup+OR+MSME+OR+industry+OR+tender+OR+infrastructure+OR+telecom+OR+IT+company)+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "AI & Neural Tech": "https://news.google.com/rss/search?q=Artificial+Intelligence+software+tools+updates+when:2d&hl=en-US&gl=US&ceid=US:en",
  // ⚡ ADDED CYBERSECURITY FEED
  "Cybersecurity & Threats": "https://news.google.com/rss/search?q=Cybersecurity+threats+data+breach+vulnerabilities+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Data Privacy & Compliance": "https://news.google.com/rss/search?q=Data+privacy+GDPR+compliance+news+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Digital Identity": "https://news.google.com/rss/search?q=Digital+identity+authentication+biometrics+news+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Ads Creatives & Meta": "https://news.google.com/rss/search?q=Meta+Facebook+Ads+Algorithm+Creative+Marketing+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Tech Innovations": "https://news.google.com/rss/search?q=Enterprise+Technology+Hardware+Networking+News+when:2d&hl=en-US&gl=US&ceid=US:en",
  
  // --- EVERYDAY ESSENTIALS ---
  "E-commerce & Retail": "https://news.google.com/rss/search?q=Ecommerce+retail+business+trends+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Real Estate & Property": "https://news.google.com/rss/search?q=Real+Estate+OR+Property+market+housing+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Health & Lifestyle": "https://news.google.com/rss/search?q=Health+wellness+lifestyle+fitness+trends+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Global Entertainment": "https://news.google.com/rss/search?q=Entertainment+movies+celebrity+music+trends+when:1d&hl=en-US&gl=US&ceid=US:en"
};

const TICKER_SYMBOLS = {
  "SENSEX": "^BSESN", "NIFTY 50": "^NSEI", "NASDAQ": "^IXIC", "AAPL": "AAPL", "TSLA": "TSLA", "META": "META"
};

const analyzeSentiment = (text) => {
  const lowerText = text.toLowerCase();
  const bullishWords = ['growth', 'raises', 'surges', 'soars', 'profit', 'expansion', 'upgrades', 'wins', 'jumps', 'victory', 'champion'];
  const bearishWords = ['layoffs', 'risk', 'falls', 'drops', 'plunges', 'loss', 'lawsuit', 'declines', 'misses', 'defeat', 'injury'];
  
  let score = 0;
  bullishWords.forEach(w => { if (lowerText.includes(w)) score++; });
  bearishWords.forEach(w => { if (lowerText.includes(w)) score--; });
  
  if (score > 0) return 'BULLISH';
  if (score < 0) return 'BEARISH';
  return 'NEUTRAL';
};

export async function GET() {
  const finalMatrix = {};
  const liveTickerData = [];

  const newsPromise = Promise.all(
    Object.entries(LIVE_FEEDS).map(async ([category, url]) => {
      try {
        const feed = await parser.parseURL(url);
        let processedItems = feed.items.map(item => {
          const rawTitle = item.title || "Intercepted Transmission";
          const titleParts = rawTitle.split(" - ");
          const cleanTitle = titleParts[0];
          const originSource = titleParts.length > 1 ? titleParts[titleParts.length - 1] : "Open Web Feed";

          let rawDate = new Date();
          let cleanDate = "LIVE";
          let cleanTime = "";
          
          if (item.pubDate) {
            rawDate = new Date(item.pubDate);
            cleanDate = rawDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            cleanTime = rawDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }

          return {
            id: item.guid || Math.random().toString(36).substring(2),
            title: cleanTitle,
            link: item.link,
            source: originSource,
            rawDate: rawDate.getTime(),
            dateString: cleanDate,
            timeString: cleanTime,
            sentiment: analyzeSentiment(cleanTitle)
          };
        });

        processedItems.sort((a, b) => b.rawDate - a.rawDate);
        finalMatrix[category] = processedItems.slice(0, 15);
      } catch (error) {
        finalMatrix[category] = []; 
      }
    })
  );

  const tickerPromise = Promise.all(
    Object.entries(TICKER_SYMBOLS).map(async ([name, symbol]) => {
      try {
        const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d`, { cache: 'no-store' });
        const data = await res.json();
        const meta = data.chart.result[0].meta;
        const price = meta.regularMarketPrice;
        const prevClose = meta.chartPreviousClose;
        const change = price - prevClose;
        const percent = (change / prevClose) * 100;
        
        liveTickerData.push({
          name, price: price.toLocaleString('en-IN', { maximumFractionDigits: 2 }), percent: percent.toFixed(2), isUp: change >= 0
        });
      } catch (error) {
        liveTickerData.push({ name, price: "OFFLINE", percent: "0.00", isUp: true });
      }
    })
  );

  await Promise.all([newsPromise, tickerPromise]);

  const sortedTicker = Object.keys(TICKER_SYMBOLS).map(key => 
    liveTickerData.find(t => t.name === key) || { name: key, price: "ERR", percent: "0", isUp: true }
  );

  return NextResponse.json({ feeds: finalMatrix, ticker: sortedTicker, serverTime: Date.now() }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Content-Type': 'application/json'
    }
  });
}
