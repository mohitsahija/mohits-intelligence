import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const revalidate = 0;

const parser = new Parser({
  customFields: { item: ['content:encoded', 'description'] },
  timeout: 8000,
});

const LIVE_FEEDS = {
  // --- TRENDING & VIRAL ---
  "Trending Now (Breaking)": "https://news.google.com/rss/search?q=Breaking+News+Trending+Now+when:1d&hl=en-IN&gl=IN&ceid=IN:en",
  "Viral Content & Buzz": "https://news.google.com/rss/search?q=Viral+internet+trends+buzzworthy+social+media+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Most Searched Topics": "https://news.google.com/rss/search?q=most+searched+trends+google+when:1d&hl=en-IN&gl=IN&ceid=IN:en",

  // --- GLOBAL SPORTS ---
  "Cricket World": "https://news.google.com/rss/search?q=Cricket+live+score+match+updates+ICC+BCCI+when:1d&hl=en-IN&gl=IN&ceid=IN:en",
  "Football & Transfers": "https://news.google.com/rss/search?q=Football+soccer+premier+league+champions+league+transfer+news+when:1d&hl=en-GB&gl=GB&ceid=GB:en",
  "Basketball & NBA": "https://news.google.com/rss/search?q=NBA+basketball+scores+standings+highlights+when:1d&hl=en-US&gl=US&ceid=US:en",
  "Tennis & Racquet Sports": "https://news.google.com/rss/search?q=Tennis+ATP+WTA+Grand+Slam+results+news+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Combat Sports (MMA/Box)": "https://news.google.com/rss/search?q=UFC+MMA+Boxing+fight+results+news+when:2d&hl=en-US&gl=US&ceid=US:en",

  // --- FINANCE & CARDS ---
  "Credit & Debit Cards": "https://news.google.com/rss/search?q=Credit+Cards+OR+Debit+Cards+banking+offers+finance+when:3d&hl=en-IN&gl=IN&ceid=IN:en",
  "Rewards & Cashback Offers": "https://news.google.com/rss/search?q=Credit+Card+Rewards+OR+Cashback+Offers+points+when:3d&hl=en-US&gl=US&ceid=US:en",
  "Travel & Forex Cards": "https://news.google.com/rss/search?q=Travel+Cards+OR+Forex+Cards+international+spending+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
  "Business & Virtual Cards": "https://news.google.com/rss/search?q=Business+Credit+Cards+OR+Virtual+Cards+corporate+expense+when:7d&hl=en-US&gl=US&ceid=US:en",
  "World Money & Stocks": "https://news.google.com/rss/search?q=Stock+Market+Global+Finance+IPO+Sensex+Nifty+news+when:1d&hl=en-IN&gl=IN&ceid=IN:en",

  // --- CORE INTELLIGENCE ---
  "SME & Corporate Expansion": "https://news.google.com/rss/search?q=(announces+new+facility+OR+opens+new+office+OR+infrastructure+expansion)+AND+(India+OR+Global)+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Ahmedabad Business Leads": "https://news.google.com/rss/search?q=(Ahmedabad+OR+GIFT+City+OR+Sanand+OR+Naroda+OR+Bavla+OR+Changodar)+(inaugurates+OR+opens+office+OR+new+branch+OR+facility+OR+plant+OR+investment+OR+MOU+OR+deal+OR+expansion+OR+sets+up+OR+launches)+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Gujarat Industry Watch": "https://news.google.com/rss/search?q=(Gujarat+OR+Ahmedabad)+(company+OR+business+OR+corporate+OR+SME+OR+startup+OR+MSME+OR+industry+OR+tender+OR+infrastructure+OR+telecom+OR+IT+company)+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "AI & Neural Tech": "https://news.google.com/rss/search?q=Artificial+Intelligence+software+tools+updates+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Cybersecurity & Threats": "https://news.google.com/rss/search?q=Cybersecurity+threats+data+breach+vulnerabilities+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Data Privacy & Compliance": "https://news.google.com/rss/search?q=Data+privacy+GDPR+compliance+news+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Digital Identity": "https://news.google.com/rss/search?q=Digital+identity+authentication+biometrics+news+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Ads Creatives & Meta": "https://news.google.com/rss/search?q=Meta+Facebook+Ads+Algorithm+Creative+Marketing+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Tech Innovations": "https://news.google.com/rss/search?q=Enterprise+Technology+Hardware+Networking+News+when:2d&hl=en-US&gl=US&ceid=US:en",

  // --- EVERYDAY ESSENTIALS ---
  "E-commerce & Retail": "https://news.google.com/rss/search?q=Ecommerce+retail+business+trends+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Real Estate & Property": "https://news.google.com/rss/search?q=Real+Estate+OR+Property+market+housing+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Health & Lifestyle": "https://news.google.com/rss/search?q=Health+wellness+lifestyle+fitness+trends+when:2d&hl=en-US&gl=US&ceid=US:en",
  "Global Entertainment": "https://news.google.com/rss/search?q=Entertainment+movies+celebrity+music+trends+when:1d&hl=en-US&gl=US&ceid=US:en",

  // --- NEW: HIGH TRAFFIC CATEGORIES ---
  "Jobs & Career": "https://news.google.com/rss/search?q=jobs+hiring+layoffs+career+salary+recruitment+India+when:1d&hl=en-IN&gl=IN&ceid=IN:en",
  "Personal Finance & Tax": "https://news.google.com/rss/search?q=personal+finance+income+tax+GST+mutual+fund+SIP+RBI+gold+price+India+when:1d&hl=en-IN&gl=IN&ceid=IN:en",
  "Politics & Government": "https://news.google.com/rss/search?q=India+politics+government+policy+election+parliament+Modi+scheme+when:1d&hl=en-IN&gl=IN&ceid=IN:en",
  "Bollywood & OTT": "https://news.google.com/rss/search?q=Bollywood+OTT+Netflix+Prime+Video+movie+release+box+office+celebrity+when:1d&hl=en-IN&gl=IN&ceid=IN:en",
  "Automobile & EVs": "https://news.google.com/rss/search?q=automobile+car+launch+EV+electric+vehicle+petrol+price+auto+India+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Startups & Funding": "https://news.google.com/rss/search?q=startup+funding+unicorn+venture+capital+India+investment+round+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Crypto & Web3": "https://news.google.com/rss/search?q=Bitcoin+crypto+cryptocurrency+blockchain+Web3+price+when:1d&hl=en-US&gl=US&ceid=US:en",
  "Science & Space": "https://news.google.com/rss/search?q=ISRO+NASA+SpaceX+science+space+discovery+research+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Education & Exams": "https://news.google.com/rss/search?q=JEE+NEET+UPSC+MBA+education+exam+results+admission+university+India+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
  "Defense & National Security": "https://news.google.com/rss/search?q=India+defense+military+army+navy+airforce+security+border+when:2d&hl=en-IN&gl=IN&ceid=IN:en",
};

const TICKER_SYMBOLS = {
  "SENSEX": "^BSESN", "NIFTY 50": "^NSEI", "NASDAQ": "^IXIC", "AAPL": "AAPL", "TSLA": "TSLA", "META": "META"
};

const analyzeSentiment = (text) => {
  const t = text.toLowerCase();
  const bull = ['growth','raises','surges','soars','profit','expansion','upgrades','wins','jumps','victory','champion','launches','inaugurates','investment','hiring','record'];
  const bear = ['layoffs','risk','falls','drops','plunges','loss','lawsuit','declines','misses','defeat','injury','fraud','scam','crash','ban','penalty'];
  let score = 0;
  bull.forEach(w => { if (t.includes(w)) score++; });
  bear.forEach(w => { if (t.includes(w)) score--; });
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
        let items = feed.items.map(item => {
          const raw = item.title || "Intercepted Transmission";
          const parts = raw.split(" - ");
          const cleanTitle = parts[0];
          const source = parts.length > 1 ? parts[parts.length - 1] : "Open Web Feed";
          let rawDate = new Date();
          let dateString = "LIVE";
          let timeString = "";
          if (item.pubDate) {
            rawDate = new Date(item.pubDate);
            dateString = rawDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            timeString = rawDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }
          return {
            id: item.guid || Math.random().toString(36).substring(2),
            title: cleanTitle, link: item.link, source,
            rawDate: rawDate.getTime(), dateString, timeString,
            sentiment: analyzeSentiment(cleanTitle)
          };
        });
        items.sort((a, b) => b.rawDate - a.rawDate);
        finalMatrix[category] = items.slice(0, 15);
      } catch {
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
        const prev = meta.chartPreviousClose;
        const change = price - prev;
        const percent = (change / prev) * 100;
        liveTickerData.push({ name, price: price.toLocaleString('en-IN', { maximumFractionDigits: 2 }), percent: percent.toFixed(2), isUp: change >= 0 });
      } catch {
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
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache', 'Expires': '0', 'Content-Type': 'application/json'
    }
  });
}
