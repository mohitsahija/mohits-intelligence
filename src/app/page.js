'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw, ArrowUpRight, Target, Cpu, Layers, DollarSign, ShoppingBag, Radio,
  Search, Clock, Sun, Moon, Send, Calendar, TrendingUp, TrendingDown, Minus,
  Menu, X, CheckCircle2, CreditCard, Plane, Building, Activity, Flame, Globe,
  Film, HeartPulse, ChevronDown, Trophy, Play, Square, Volume2, Command,
  ShieldAlert, Lock, Fingerprint, Briefcase, Bookmark, BookmarkCheck, Copy,
  Car, Rocket, GraduationCap, Bitcoin, Shield, Newspaper, Banknote, Users,
  Star, Bell, ChevronRight, BarChart2
} from 'lucide-react';

// ── PINNED QUICK ACCESS (shown as top strip) ──
const PINNED_CATEGORIES = [
  "Trending Now (Breaking)", "Cricket World", "Politics & Government",
  "Personal Finance & Tax", "Bollywood & OTT", "Jobs & Career", "Automobile & EVs"
];

const SIDEBAR_GROUPS = [
  {
    title: "Trending & Viral",
    categories: {
      "Trending Now (Breaking)": { icon: <Flame className="w-4 h-4" />, color: "bg-rose-500 text-white", desc: "Global breaking news and alerts" },
      "Viral Content & Buzz":    { icon: <Activity className="w-4 h-4" />, color: "bg-pink-500 text-white", desc: "Social media trends & buzzworthy topics" },
      "Most Searched Topics":    { icon: <Search className="w-4 h-4" />, color: "bg-indigo-500 text-white", desc: "Top queries across search engines" },
    }
  },
  {
    title: "Global Sports Arena",
    categories: {
      "Cricket World":           { icon: <Trophy className="w-4 h-4" />, color: "bg-emerald-600 text-white", desc: "Live scores, match schedules, player stats" },
      "Football & Transfers":    { icon: <Activity className="w-4 h-4" />, color: "bg-blue-600 text-white", desc: "League standings, results, transfer tickers" },
      "Basketball & NBA":        { icon: <Flame className="w-4 h-4" />, color: "bg-orange-500 text-white", desc: "Tournament analysis, rankings, records" },
      "Tennis & Racquet Sports": { icon: <Target className="w-4 h-4" />, color: "bg-lime-600 text-white", desc: "Grand Slam draws, rankings, results" },
      "Combat Sports (MMA/Box)": { icon: <Layers className="w-4 h-4" />, color: "bg-red-700 text-white", desc: "UFC fight cards, division updates, news" },
    }
  },
  {
    title: "Finance & Cards Hub",
    categories: {
      "Credit & Debit Cards":      { icon: <CreditCard className="w-4 h-4" />, color: "bg-emerald-500 text-white", desc: "Bank offers, policies, card launches" },
      "Rewards & Cashback Offers": { icon: <DollarSign className="w-4 h-4" />, color: "bg-amber-500 text-white", desc: "Points, fuel cards, cashback deals" },
      "Travel & Forex Cards":      { icon: <Plane className="w-4 h-4" />, color: "bg-cyan-500 text-white", desc: "International spending & forex rates" },
      "Business & Virtual Cards":  { icon: <Building className="w-4 h-4" />, color: "bg-slate-700 text-white", desc: "Corporate expense & enterprise cards" },
      "World Money & Stocks":      { icon: <TrendingUp className="w-4 h-4" />, color: "bg-teal-600 text-white", desc: "Global markets, shares, and IPOs" },
      "Personal Finance & Tax":    { icon: <Banknote className="w-4 h-4" />, color: "bg-green-700 text-white", desc: "GST, income tax, SIP, RBI, gold prices" },
      "Crypto & Web3":             { icon: <Bitcoin className="w-4 h-4" />, color: "bg-orange-600 text-white", desc: "Bitcoin, altcoins, blockchain news" },
    }
  },
  {
    title: "Core Intelligence",
    categories: {
      "SME & Corporate Expansion":  { icon: <Target className="w-4 h-4" />, color: "bg-emerald-600 text-white", desc: "B2B Lead Gen: Facilities & Operations" },
      "Ahmedabad Business Leads":   { icon: <Building className="w-4 h-4" />, color: "bg-cyan-600 text-white", desc: "Live corporate expansion in Ahmedabad" },
      "Gujarat Industry Watch":     { icon: <Briefcase className="w-4 h-4" />, color: "bg-violet-600 text-white", desc: "Gujarat SME, MSME & industry moves" },
      "AI & Neural Tech":           { icon: <Cpu className="w-4 h-4" />, color: "bg-blue-600 text-white", desc: "Latest artificial intelligence software" },
      "Cybersecurity & Threats":    { icon: <ShieldAlert className="w-4 h-4" />, color: "bg-red-600 text-white", desc: "Threat intel, vulnerabilities & defense" },
      "Data Privacy & Compliance":  { icon: <Lock className="w-4 h-4" />, color: "bg-amber-600 text-white", desc: "Regulatory standards & privacy protocols" },
      "Digital Identity":           { icon: <Fingerprint className="w-4 h-4" />, color: "bg-indigo-600 text-white", desc: "Auth systems, biometrics & KYC" },
      "Ads Creatives & Meta":       { icon: <Radio className="w-4 h-4" />, color: "bg-purple-600 text-white", desc: "Marketing and platform algorithms" },
      "Tech Innovations":           { icon: <Layers className="w-4 h-4" />, color: "bg-slate-800 text-white", desc: "Hardware and enterprise technology" },
      "Startups & Funding":         { icon: <Rocket className="w-4 h-4" />, color: "bg-pink-600 text-white", desc: "Funding rounds, unicorns, VC news" },
      "Defense & National Security":{ icon: <Shield className="w-4 h-4" />, color: "bg-gray-700 text-white", desc: "Military, border, defense deals" },
    }
  },
  {
    title: "India Daily",
    categories: {
      "Politics & Government": { icon: <Newspaper className="w-4 h-4" />, color: "bg-orange-700 text-white", desc: "Elections, policy, government schemes" },
      "Jobs & Career":         { icon: <Users className="w-4 h-4" />, color: "bg-blue-700 text-white", desc: "Hiring, layoffs, salary trends" },
      "Education & Exams":     { icon: <GraduationCap className="w-4 h-4" />, color: "bg-teal-700 text-white", desc: "JEE, NEET, UPSC, MBA admissions" },
      "Automobile & EVs":      { icon: <Car className="w-4 h-4" />, color: "bg-red-500 text-white", desc: "New launches, EV, petrol prices" },
      "Science & Space":       { icon: <Rocket className="w-4 h-4" />, color: "bg-purple-700 text-white", desc: "ISRO, NASA, SpaceX, discoveries" },
      "Bollywood & OTT":       { icon: <Film className="w-4 h-4" />, color: "bg-rose-600 text-white", desc: "Movies, OTT releases, box office" },
    }
  },
  {
    title: "Everyday Essentials",
    categories: {
      "E-commerce & Retail":    { icon: <ShoppingBag className="w-4 h-4" />, color: "bg-orange-500 text-white", desc: "Online shopping & retail industry" },
      "Real Estate & Property": { icon: <Building className="w-4 h-4" />, color: "bg-blue-500 text-white", desc: "Housing, commercial, property markets" },
      "Health & Lifestyle":     { icon: <HeartPulse className="w-4 h-4" />, color: "bg-rose-400 text-white", desc: "Wellness, fitness, and living" },
      "Global Entertainment":   { icon: <Globe className="w-4 h-4" />, color: "bg-purple-500 text-white", desc: "Movies, sports, celebrity culture" },
    }
  },
];

// flat map of all categories for lookup
const ALL_CATS = {};
SIDEBAR_GROUPS.forEach(g => Object.entries(g.categories).forEach(([k, v]) => { ALL_CATS[k] = v; }));

const Logo = ({ animated = false }) => (
  <div style={{ width: 34, height: 34, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
      <motion.path d="M20 80V30L50 55L80 30V80" stroke="#0891B2" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8 }} />
      <motion.circle cx="50" cy="55" r="7" fill="#0891B2"
        initial={animated ? { scale: 0 } : { scale: 1 }} animate={{ scale: 1 }}
        transition={{ delay: animated ? 1.4 : 0, type: 'spring', stiffness: 200 }} />
      <motion.path d="M50 55V84" stroke="#0891B2" strokeWidth="6" strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }} animate={{ pathLength: 1 }}
        transition={{ delay: animated ? 1.7 : 0, duration: 0.7 }} />
    </svg>
  </div>
);

const getTimeAgo = (ts) => {
  const s = Math.floor((new Date() - ts) / 1000);
  if (s < 60) return s + 's ago';
  if (s < 3600) return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
};

const SentimentBadge = ({ s }) => {
  const map = {
    BULLISH: { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0', icon: <TrendingUp style={{ width: 9, height: 9 }} />, label: 'BULLISH' },
    BEARISH: { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', icon: <TrendingDown style={{ width: 9, height: 9 }} />, label: 'BEARISH' },
    NEUTRAL: { bg: '#F9FAFB', color: '#6B7280', border: '#E5E7EB', icon: <Minus style={{ width: 9, height: 9 }} />, label: 'NEUTRAL' },
  };
  const b = map[s] || map.NEUTRAL;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 7px', borderRadius: 99, background: b.bg, color: b.color, border: `1px solid ${b.border}`, fontFamily: 'monospace', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>
      {b.icon} {b.label}
    </span>
  );
};

export default function IntelligencePlatform() {
  const [isIntro, setIsIntro]           = useState(true);
  const [isDark, setIsDark]             = useState(false);
  const [data, setData]                 = useState({});
  const [ticker, setTicker]             = useState([]);
  const [activeCategory, setActiveCategory] = useState('Trending Now (Breaking)');
  const [expandedGroups, setExpandedGroups] = useState({ 'Trending & Viral': true, 'India Daily': true });
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSyncing, setIsSyncing]       = useState(true);
  const [toast, setToast]               = useState('');
  const [searchQuery, setSearchQuery]   = useState('');
  const [mobileMenu, setMobileMenu]     = useState(false);
  const [cache, setCache]               = useState({});
  const [cmdOpen, setCmdOpen]           = useState(false);
  const [cmdSearch, setCmdSearch]       = useState('');
  const [provider, setProvider]         = useState('gemini');
  const [analysis, setAnalysis]         = useState('');
  const [aiLoading, setAiLoading]       = useState(false);
  const [isStreaming, setIsStreaming]   = useState(false);
  const [customQ, setCustomQ]           = useState('');
  const [textMod, setTextMod]           = useState(0);
  const [isSpeaking, setIsSpeaking]     = useState(false);
  const [time, setTime]                 = useState({ ind: '', ny: '', lon: '' });
  const [bookmarks, setBookmarks]       = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [seenIds, setSeenIds]           = useState(new Set());
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [nextSyncIn, setNextSyncIn]     = useState(900);
  const [copied, setCopied]             = useState(false);
  const [sentimentSummary, setSentimentSummary] = useState({ bull: 0, bear: 0, neutral: 0 });
  const [readProgress, setReadProgress] = useState(0);
  const detailScrollRef = useRef(null);
  const autoSyncRef = useRef(null);
  const countdownRef = useRef(null);

  // ── KEYBOARD ──
  useEffect(() => {
    const kd = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(p => !p); }
      if (e.key === 'Escape') { setCmdOpen(false); setShowBookmarks(false); }
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, []);

  // ── INIT ──
  useEffect(() => {
    setTimeout(() => setIsIntro(false), 2400);
    const saved = localStorage.getItem('mi_bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
    const savedSeen = localStorage.getItem('mi_seen');
    if (savedSeen) setSeenIds(new Set(JSON.parse(savedSeen)));
    const savedDark = localStorage.getItem('mi_dark');
    if (savedDark !== null) setIsDark(JSON.parse(savedDark));

    const tick = setInterval(() => {
      const now = new Date();
      setTime({
        ind: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }),
        ny:  now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
        lon: now.toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
      });
    }, 1000);

    fetchFeeds(false);
    return () => clearInterval(tick);
  }, []);

  // ── AUTO REFRESH COUNTDOWN ──
  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setNextSyncIn(p => {
        if (p <= 1) { fetchFeeds(false); return 900; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(countdownRef.current);
  }, []);

  // ── DARK MODE PERSIST ──
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('mi_dark', JSON.stringify(isDark));
  }, [isDark]);

  // ── SPEECH CANCEL ON ITEM CHANGE ──
  useEffect(() => {
    if (window.speechSynthesis) { window.speechSynthesis.cancel(); setIsSpeaking(false); }
    setReadProgress(0);
  }, [selectedItem]);

  // ── SENTIMENT SUMMARY ──
  useEffect(() => {
    const items = data[activeCategory] || [];
    const bull = items.filter(i => i.sentiment === 'BULLISH').length;
    const bear = items.filter(i => i.sentiment === 'BEARISH').length;
    setSentimentSummary({ bull, bear, neutral: items.length - bull - bear });
  }, [activeCategory, data]);

  // ── READ PROGRESS ──
  const handleDetailScroll = () => {
    const el = detailScrollRef.current;
    if (!el) return;
    const prog = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    setReadProgress(Math.min(100, Math.round(prog)));
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(''), 3000);
  };

  const fetchFeeds = async (manual = true) => {
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/stream?t=${Date.now()}`, { cache: 'no-store' });
      const d = await res.json();
      setData(d.feeds);
      setTicker(d.ticker);
      setLastSyncTime(new Date());
      setNextSyncIn(900);
      // mark new items
      const newSeen = new Set(seenIds);
      Object.values(d.feeds).forEach(items => items.forEach(i => newSeen.add(i.id)));
      setSeenIds(newSeen);
      localStorage.setItem('mi_seen', JSON.stringify([...newSeen]));
      if (manual) showToast('Live data synced successfully.');
      if (d.feeds[activeCategory]?.length > 0 && !selectedItem) {
        selectItem(d.feeds[activeCategory][0]);
      }
    } catch { if (manual) showToast('Sync failed. Check network.', 'error'); }
    finally { setIsSyncing(false); }
  };

  const selectItem = async (item, forceProvider = provider) => {
    setSelectedItem(item);
    const key = `${item.id}-${forceProvider}`;
    if (cache[key]) { setAnalysis(cache[key]); setAiLoading(false); return; }
    setAnalysis(''); setAiLoading(true); setIsStreaming(false);
    if (window.innerWidth < 1024) setMobileMenu(false);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: item.title, source: item.source, provider: forceProvider })
      });
      if (res.headers.get('X-Stream') === 'true') {
        setAiLoading(false); setIsStreaming(true);
        const reader = res.body.getReader(); const dec = new TextDecoder();
        let full = '';
        while (true) {
          const { done, value } = await reader.read(); if (done) break;
          full += dec.decode(value, { stream: true }); setAnalysis(full);
        }
        setIsStreaming(false); setCache(p => ({ ...p, [key]: full }));
      } else {
        const d = await res.json();
        const text = d.error ? `❌ ${d.error}` : d.response;
        setAnalysis(text);
        if (!d.error) setCache(p => ({ ...p, [key]: text }));
        setAiLoading(false);
      }
    } catch { setAnalysis('❌ Network error.'); setAiLoading(false); setIsStreaming(false); }
  };

  const askCustom = async () => {
    if (!customQ.trim() || !selectedItem) return;
    setAiLoading(true); setAnalysis(''); setIsStreaming(false);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: selectedItem.title, source: selectedItem.source, customPrompt: customQ, provider })
      });
      if (res.headers.get('X-Stream') === 'true') {
        setAiLoading(false); setIsStreaming(true);
        const reader = res.body.getReader(); const dec = new TextDecoder();
        let full = '';
        while (true) {
          const { done, value } = await reader.read(); if (done) break;
          full += dec.decode(value, { stream: true }); setAnalysis(full);
        }
        setIsStreaming(false);
      } else {
        const d = await res.json();
        setAnalysis(d.error ? `❌ ${d.error}` : d.response);
        setAiLoading(false);
      }
    } catch { setAnalysis('❌ Network error.'); setAiLoading(false); }
    finally { setCustomQ(''); }
  };

  const toggleVoice = () => {
    if (!window.speechSynthesis || !selectedItem) return;
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); return; }
    const utt = new SpeechSynthesisUtterance(`${selectedItem.title}. ${analysis.replace(/[■✦]/g, '')}`);
    utt.onend = () => setIsSpeaking(false); utt.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true); window.speechSynthesis.speak(utt);
  };

  const toggleBookmark = (item) => {
    const exists = bookmarks.find(b => b.id === item.id);
    const updated = exists ? bookmarks.filter(b => b.id !== item.id) : [...bookmarks, { ...item, savedAt: Date.now() }];
    setBookmarks(updated);
    localStorage.setItem('mi_bookmarks', JSON.stringify(updated));
    showToast(exists ? 'Bookmark removed.' : '✦ Article saved to bookmarks!');
  };

  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  const copyAnalysis = () => {
    if (!analysis || !selectedItem) return;
    const text = `${selectedItem.title}\n\nSource: ${selectedItem.source}\n\n${analysis.replace(/[■✦]/g, '').trim()}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showToast('Analysis copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const switchProvider = (p) => { setProvider(p); if (selectedItem) selectItem(selectedItem, p); };
  const toggleGroup = (g) => setExpandedGroups(prev => ({ ...prev, [g]: !prev[g] }));
  const switchCategory = (cat) => { setActiveCategory(cat); setSelectedItem(null); setSearchQuery(''); if (window.innerWidth < 1024) setMobileMenu(false); };

  const feedItems = (showBookmarks ? bookmarks : (data[activeCategory] || []))
    .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.source.toLowerCase().includes(searchQuery.toLowerCase()));

  const formatCountdown = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const renderAnalysis = (text, streaming) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const c = line.trim();
      const isLast = i === lines.length - 1;
      if (c.startsWith('■')) return (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ width: 3, height: 14, background: '#0891B2', borderRadius: 2, flexShrink: 0 }} />
          <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0891B2' }}>
            {c.replace('■', '').trim()}
          </span>
        </div>
      );
      if (c.startsWith('✦')) return (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '5px 0' }}>
          <span style={{ color: '#0891B2', fontWeight: 700, marginTop: 2, flexShrink: 0, fontSize: 11 }}>✦</span>
          <span style={{ fontSize: 12 + textMod, color: '#374151', lineHeight: 1.65 }}>
            {c.replace('✦', '').trim()}{streaming && isLast ? <span style={{ color: '#0891B2', animation: 'blink 0.8s step-end infinite' }}>▋</span> : ''}
          </span>
        </div>
      );
      return c ? (
        <p key={i} style={{ fontSize: 12 + textMod, color: '#4B5563', lineHeight: 1.7, paddingLeft: 14, marginBottom: 6 }}>
          {c}{streaming && isLast ? <span style={{ color: '#0891B2' }}>▋</span> : ''}
        </p>
      ) : <div key={i} style={{ height: 4 }} />;
    });
  };

  const activeCatMeta = ALL_CATS[activeCategory] || { icon: <Globe className="w-4 h-4" />, color: 'bg-slate-500 text-white' };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", height: '100vh', display: 'flex', flexDirection: 'column', background: '#F3F4F6', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@700;800&display=swap');
        @keyframes tickerRun { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
        @keyframes livePulse { 0%{transform:scale(1);opacity:.4} 70%{transform:scale(2.2);opacity:0} 100%{transform:scale(1);opacity:0} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .ticker-inner { display:inline-block; animation:tickerRun 55s linear infinite; white-space:nowrap; }
        .ticker-inner:hover { animation-play-state:paused; }
        .feed-card { transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1); }
        .feed-card:hover { transform:translateY(-1px); box-shadow:0 4px 16px rgba(0,0,0,0.09) !important; border-color:#CBD5E1 !important; }
        .pin-btn:hover { background:#E0F2FE !important; color:#0369A1 !important; }
        .cat-btn:hover { background:#F1F5F9 !important; }
        .cat-btn.is-active { background:#EFF6FF !important; border-color:#BFDBFE !important; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#D1D5DB;border-radius:99px} ::-webkit-scrollbar-thumb:hover{background:#9CA3AF}
      `}</style>

      {/* ── INTRO ── */}
      <AnimatePresence>
        {isIntro && (
          <motion.div exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6 } }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#060A14', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Logo animated />
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} style={{ textAlign: 'center', marginTop: 24 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: '0.3em', color: '#F1F5F9', textTransform: 'uppercase' }}>MOHIT SAHIJA</div>
              <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.5em', color: '#0891B2', textTransform: 'uppercase', fontWeight: 700, marginTop: 10 }}>AI-DRIVEN INTELLIGENCE ENGINE</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              style={{ display: 'flex', gap: 6, marginTop: 28 }}>
              {[0, 1, 2].map(i => <motion.div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#0891B2' }} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ delay: i * 0.2, duration: 1, repeat: Infinity }} />)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99, background: toast.type === 'error' ? '#DC2626' : '#059669', color: '#fff', padding: '10px 16px', borderRadius: 10, fontFamily: 'monospace', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
            <CheckCircle2 style={{ width: 14, height: 14 }} /> {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CMD PALETTE ── */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '13vh' }}
            onClick={() => setCmdOpen(false)}>
            <motion.div initial={{ scale: 0.95, y: -10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              style={{ width: '100%', maxWidth: 520, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', overflow: 'hidden' }}
              onClick={e => e.stopPropagation()}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: 10, background: '#F9FAFB' }}>
                <Command style={{ width: 14, height: 14, color: '#0891B2', flexShrink: 0 }} />
                <input autoFocus type="text" placeholder="Search all categories..." value={cmdSearch} onChange={e => setCmdSearch(e.target.value)}
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: '#111827', background: 'transparent' }} />
                <kbd style={{ fontSize: 9, padding: '3px 7px', background: '#E5E7EB', borderRadius: 4, fontFamily: 'monospace', color: '#6B7280' }}>ESC</kbd>
              </div>
              <div style={{ maxHeight: 300, overflowY: 'auto', padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {SIDEBAR_GROUPS.flatMap(g => Object.keys(g.categories))
                  .filter(c => c.toLowerCase().includes(cmdSearch.toLowerCase()))
                  .map(cat => (
                    <button key={cat} onClick={() => { switchCategory(cat); setCmdOpen(false); setCmdSearch(''); }}
                      style={{ width: '100%', textAlign: 'left', padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, background: activeCategory === cat ? '#0891B2' : 'transparent', color: activeCategory === cat ? '#fff' : '#374151', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{cat}</span><ArrowUpRight style={{ width: 12, height: 12, opacity: 0.5 }} />
                    </button>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOOKMARK DRAWER ── */}
      <AnimatePresence>
        {showBookmarks && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }}
            onClick={() => setShowBookmarks(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 360, background: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}
              onClick={e => e.stopPropagation()}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: '#0F172A' }}>Saved Articles</h3>
                  <p style={{ fontFamily: 'monospace', fontSize: 9, color: '#94A3B8', marginTop: 2 }}>{bookmarks.length} BOOKMARKS</p>
                </div>
                <button onClick={() => setShowBookmarks(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6B7280' }}><X style={{ width: 18, height: 18 }} /></button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {bookmarks.length === 0 ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', paddingTop: 60 }}>
                    <Bookmark style={{ width: 32, height: 32, marginBottom: 10, opacity: 0.4 }} />
                    <p style={{ fontFamily: 'monospace', fontSize: 11 }}>No saved articles yet.</p>
                  </div>
                ) : bookmarks.map(item => (
                  <div key={item.id} onClick={() => { selectItem(item); setShowBookmarks(false); }}
                    style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid #E5E7EB', background: '#FAFAFA', cursor: 'pointer' }}>
                    <p style={{ fontFamily: 'monospace', fontSize: 9, color: '#94A3B8', marginBottom: 6 }}>{item.source}</p>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{item.title}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#9CA3AF' }}>{item.dateString}</span>
                      <button onClick={e => { e.stopPropagation(); toggleBookmark(item); }}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#DC2626', fontFamily: 'monospace', fontSize: 9, fontWeight: 700 }}>REMOVE</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TICKER ── */}
      <div style={{ height: 30, display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0F172A', borderBottom: '1px solid #1E293B', flexShrink: 0, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 50, background: 'linear-gradient(to right,#0F172A,transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 50, background: 'linear-gradient(to left,#0F172A,transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div className="ticker-inner">
          {[...Array(3)].map((_, li) => (
            <span key={li}>
              {ticker.length > 0 ? ticker.map((s, i) => (
                <span key={`${li}-${i}`} style={{ margin: '0 24px', fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: s.isUp ? '#10B981' : '#F87171' }}>
                  {s.isUp ? '▲' : '▼'} {s.name} {s.price} ({s.percent}%)
                </span>
              )) : <span style={{ margin: '0 24px', fontFamily: 'monospace', fontSize: 10, color: '#475569' }}>CONNECTING MARKET FEED...</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── HEADER ── */}
      <header style={{ background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #E5E7EB', padding: '9px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6B7280', padding: 4 }}>
            {mobileMenu ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
          </button>
          <Logo />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A', textTransform: 'uppercase' }}>MOHIT'S INTELLIGENCE</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: '#10B981', opacity: 0.3, animation: 'livePulse 2s ease-out infinite' }} />
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: '#10B981', letterSpacing: '0.1em' }}>LIVE</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Auto sync countdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: '#F1F5F9', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <Clock style={{ width: 10, height: 10, color: '#0891B2' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: '#64748B' }}>SYNC {formatCountdown(nextSyncIn)}</span>
          </div>

          {/* Bookmarks */}
          <button onClick={() => setShowBookmarks(true)}
            style={{ position: 'relative', padding: 8, borderRadius: 8, background: '#F1F5F9', border: '1px solid #E2E8F0', cursor: 'pointer', display: 'flex', color: '#64748B' }}>
            <Bookmark style={{ width: 14, height: 14 }} />
            {bookmarks.length > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: '#0891B2', color: '#fff', fontFamily: 'monospace', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{bookmarks.length}</span>
            )}
          </button>

          <button onClick={() => setCmdOpen(true)} className="hidden xl:flex"
            style={{ alignItems: 'center', gap: 8, padding: '6px 12px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 8, cursor: 'pointer', fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: '#64748B' }}>
            <Command style={{ width: 11, height: 11, color: '#0891B2' }} /> CMD+K
          </button>

          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 14, paddingRight: 12, borderRight: '1px solid #E5E7EB' }}>
            {[['IND', time.ind], ['NY', time.ny], ['LON', time.lon]].map(([l, t]) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'monospace', fontSize: 9, fontWeight: 600, color: '#94A3B8' }}>
                <Clock style={{ width: 10, height: 10 }} /> {l}: {t}
              </span>
            ))}
          </div>

          <button onClick={() => setIsDark(!isDark)} style={{ padding: 8, borderRadius: 8, background: '#F1F5F9', border: '1px solid #E2E8F0', cursor: 'pointer', display: 'flex', color: '#64748B' }}>
            {isDark ? <Sun style={{ width: 14, height: 14 }} /> : <Moon style={{ width: 14, height: 14 }} />}
          </button>
          <button onClick={() => fetchFeeds(true)} disabled={isSyncing}
            style={{ padding: '8px 14px', background: '#0F172A', color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
            <RefreshCw style={{ width: 12, height: 12 }} className={isSyncing ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">{isSyncing ? 'SYNCING' : 'REFRESH'}</span>
          </button>
        </div>
      </header>

      {/* ── PINNED QUICK ACCESS STRIP ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '6px 16px', display: 'flex', gap: 6, overflowX: 'auto', flexShrink: 0, alignItems: 'center' }}>
        <span style={{ fontFamily: 'monospace', fontSize: 8, fontWeight: 700, color: '#CBD5E1', letterSpacing: '0.1em', flexShrink: 0, marginRight: 4 }}>QUICK:</span>
        {PINNED_CATEGORIES.map(cat => {
          const catMeta = ALL_CATS[cat];
          const isActive = activeCategory === cat;
          return (
            <button key={cat} className="pin-btn" onClick={() => switchCategory(cat)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 99, border: `1px solid ${isActive ? '#BAE6FD' : '#E5E7EB'}`, background: isActive ? '#E0F2FE' : '#F9FAFB', color: isActive ? '#0369A1' : '#64748B', cursor: 'pointer', fontSize: 10, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.15s' }}>
              <span style={{ display: 'flex', alignItems: 'center' }}>{catMeta?.icon}</span>
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>

        {/* ── SIDEBAR ── */}
        <div className={`${mobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 290, background: '#FFFFFF', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', zIndex: 30, transition: 'transform 0.3s ease' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
            <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#94A3B8' }}>INTELLIGENCE MATRICES</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {SIDEBAR_GROUPS.map((group, gi) => (
              <div key={gi} style={{ border: '1px solid #F1F5F9', borderRadius: 10, overflow: 'hidden', background: '#FAFAFA' }}>
                <button onClick={() => toggleGroup(group.title)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#475569' }}>
                  {group.title}
                  <ChevronDown style={{ width: 12, height: 12, color: '#94A3B8', transition: 'transform 0.3s', transform: expandedGroups[group.title] ? 'rotate(180deg)' : 'rotate(0)' }} />
                </button>
                <AnimatePresence>
                  {expandedGroups[group.title] && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '2px 6px 6px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {Object.entries(group.categories).map(([catName, catData]) => {
                          const isActive = activeCategory === catName;
                          const catItems = data[catName] || [];
                          const newCount = catItems.filter(i => !seenIds.has(i.id)).length;
                          return (
                            <button key={catName} className={`cat-btn ${isActive ? 'is-active' : ''}`}
                              onClick={() => switchCategory(catName)}
                              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', borderRadius: 7, border: isActive ? '1px solid #BFDBFE' : '1px solid transparent', background: isActive ? '#EFF6FF' : 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                              <span className={catData.color} style={{ padding: 5, borderRadius: 5, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isActive ? 1 : 0.7 }}>
                                {catData.icon}
                              </span>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 11, fontWeight: isActive ? 700 : 600, color: isActive ? '#1D4ED8' : '#374151', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{catName}</div>
                              </div>
                              {/* Article count badge */}
                              {catItems.length > 0 && (
                                <span style={{ fontFamily: 'monospace', fontSize: 8, fontWeight: 700, padding: '1px 5px', borderRadius: 99, background: isActive ? '#DBEAFE' : '#F1F5F9', color: isActive ? '#1D4ED8' : '#94A3B8', flexShrink: 0 }}>
                                  {catItems.length}
                                </span>
                              )}
                              {/* NEW dot */}
                              {newCount > 0 && !isActive && (
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEED PANEL ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F3F4F6', minWidth: 0, borderRight: '1px solid #E5E7EB', marginLeft: 290 }} className="lg:ml-0">

          {/* Feed header */}
          <div style={{ padding: '10px 16px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={activeCatMeta.color} style={{ padding: 7, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{activeCatMeta.icon}</span>
                <div>
                  <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>{showBookmarks ? 'Saved Articles' : activeCategory}</h2>
                  <p style={{ fontFamily: 'monospace', fontSize: 9, color: '#94A3B8', marginTop: 1 }}>{feedItems.length} articles</p>
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <Search style={{ width: 11, height: 11, position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                <input type="text" placeholder="Filter..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: 28, paddingRight: 10, paddingTop: 6, paddingBottom: 6, fontSize: 11, border: '1px solid #E5E7EB', borderRadius: 7, background: '#F9FAFB', color: '#374151', outline: 'none', width: 160 }} />
              </div>
            </div>

            {/* Sentiment Summary Bar */}
            {!showBookmarks && feedItems.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <BarChart2 style={{ width: 11, height: 11, color: '#CBD5E1', flexShrink: 0 }} />
                {[
                  { label: 'BULLISH', count: sentimentSummary.bull, color: '#059669', bg: '#ECFDF5' },
                  { label: 'BEARISH', count: sentimentSummary.bear, color: '#DC2626', bg: '#FEF2F2' },
                  { label: 'NEUTRAL', count: sentimentSummary.neutral, color: '#6B7280', bg: '#F9FAFB' },
                ].map(s => (
                  <span key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'monospace', fontSize: 8, fontWeight: 700, color: s.color, background: s.bg, padding: '2px 7px', borderRadius: 99 }}>
                    ● {s.count} {s.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Cards */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {isSyncing && feedItems.length === 0 ? (
              [...Array(5)].map((_, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ height: 10, borderRadius: 5, background: '#F1F5F9', width: '35%' }} />
                  <div style={{ height: 15, borderRadius: 5, background: '#F1F5F9', width: '90%' }} />
                  <div style={{ height: 15, borderRadius: 5, background: '#F1F5F9', width: '70%' }} />
                  <div style={{ height: 9, borderRadius: 5, background: '#F1F5F9', width: '25%' }} />
                </div>
              ))
            ) : feedItems.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', paddingTop: 60 }}>
                <Target style={{ width: 32, height: 32, marginBottom: 10, opacity: 0.3 }} />
                <p style={{ fontFamily: 'monospace', fontSize: 11 }}>No articles found.</p>
              </div>
            ) : feedItems.map(item => {
              const selected = selectedItem?.id === item.id;
              const isNew = !seenIds.has(item.id);
              return (
                <motion.div key={item.id} className="feed-card" onClick={() => selectItem(item)}
                  style={{ background: '#fff', border: selected ? '1.5px solid #0891B2' : '1px solid #E5E7EB', borderRadius: 12, padding: '12px 14px', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: selected ? '0 0 0 3px rgba(8,145,178,0.1)' : '0 1px 3px rgba(0,0,0,0.04)', transform: selected ? 'translateX(2px)' : 'translateX(0)' }}>

                  {/* Left accent */}
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: selected ? '#0891B2' : 'transparent', borderRadius: '12px 0 0 12px', transition: 'background 0.2s' }} />

                  {/* NEW badge */}
                  {isNew && (
                    <div style={{ position: 'absolute', top: 10, right: 10, width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, paddingLeft: 4 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 4, background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#475569' }}>{item.source}</span>
                    <SentimentBadge s={item.sentiment} />
                  </div>

                  <h3 style={{ fontSize: 13, fontWeight: 650, lineHeight: 1.45, color: selected ? '#0369A1' : '#111827', marginBottom: 9, paddingLeft: 4, letterSpacing: '-0.01em', transition: 'color 0.15s' }}>
                    {item.title}
                  </h3>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 4 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'monospace', fontSize: 9, color: '#9CA3AF' }}>
                      <Calendar style={{ width: 9, height: 9 }} /> {item.dateString}
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 600, color: '#0891B2', background: 'rgba(8,145,178,0.08)', padding: '2px 7px', borderRadius: 99 }}>
                      {getTimeAgo(item.rawDate)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── DETAIL PANEL ── */}
        <div style={{ width: 500, flexShrink: 0, background: '#FFFFFF', borderLeft: '1px solid #E5E7EB', display: selectedItem ? 'flex' : 'none', flexDirection: 'column', position: 'absolute', right: 0, top: 0, height: '100%', zIndex: 20 }} className="lg:relative lg:flex">

          {/* Read progress bar */}
          <div style={{ height: 3, background: '#F1F5F9', flexShrink: 0 }}>
            <div style={{ height: '100%', width: `${readProgress}%`, background: '#0891B2', borderRadius: 99, transition: 'width 0.2s' }} />
          </div>

          {/* Detail header */}
          <div style={{ padding: '9px 14px', borderBottom: '1px solid #F1F5F9', background: '#FAFAFA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <button onClick={() => setSelectedItem(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 7, fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: '#64748B', cursor: 'pointer', textTransform: 'uppercase' }}>
              ← BACK
            </button>
            <div style={{ display: 'flex', gap: 6 }}>
              {/* Bookmark button */}
              <button onClick={() => selectedItem && toggleBookmark(selectedItem)}
                style={{ padding: '4px 8px', background: isBookmarked(selectedItem?.id) ? '#EFF6FF' : '#fff', border: `1px solid ${isBookmarked(selectedItem?.id) ? '#BFDBFE' : '#E5E7EB'}`, borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: isBookmarked(selectedItem?.id) ? '#1D4ED8' : '#64748B' }}>
                {isBookmarked(selectedItem?.id) ? <BookmarkCheck style={{ width: 11, height: 11 }} /> : <Bookmark style={{ width: 11, height: 11 }} />}
                {isBookmarked(selectedItem?.id) ? 'SAVED' : 'SAVE'}
              </button>
              {/* Copy button */}
              <button onClick={copyAnalysis}
                style={{ padding: '4px 8px', background: copied ? '#ECFDF5' : '#fff', border: `1px solid ${copied ? '#A7F3D0' : '#E5E7EB'}`, borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: copied ? '#059669' : '#64748B' }}>
                <Copy style={{ width: 11, height: 11 }} /> {copied ? 'COPIED!' : 'COPY'}
              </button>
              {/* Text size */}
              {[['A−', -1], ['A+', 1]].map(([lbl, d]) => (
                <button key={lbl} onClick={() => setTextMod(p => Math.max(-2, Math.min(4, p + d)))}
                  style={{ padding: '4px 9px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 7, fontFamily: 'monospace', fontSize: 10, fontWeight: 700, color: '#64748B', cursor: 'pointer' }}>{lbl}</button>
              ))}
            </div>
          </div>

          {/* Detail content */}
          <div ref={detailScrollRef} onScroll={handleDetailScroll} style={{ flex: 1, overflowY: 'auto', padding: 22 }}>
            <AnimatePresence mode="wait">
              {selectedItem && (
                <motion.div key={selectedItem.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                  <div style={{ paddingBottom: 14, borderBottom: '1px solid #F1F5F9' }}>
                    <p style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 9 }}>
                      {selectedItem.source} · {selectedItem.dateString} · {selectedItem.timeString}
                    </p>
                    <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 19 + textMod, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#0F172A' }}>
                      {selectedItem.title}
                    </h2>
                  </div>

                  {/* Voice */}
                  <button onClick={toggleVoice}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderRadius: 10, border: isSpeaking ? '1px solid #0891B2' : '1px solid #E5E7EB', background: isSpeaking ? '#F0F9FF' : '#FAFAFA', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: isSpeaking ? '#0891B2' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {isSpeaking ? <Square style={{ width: 10, height: 10, fill: '#fff', color: '#fff' }} /> : <Play style={{ width: 10, height: 10, fill: '#64748B', color: '#64748B', marginLeft: 1 }} />}
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 1 }}>Listen to AI Voice Summary</p>
                        <p style={{ fontFamily: 'monospace', fontSize: 9, color: '#9CA3AF' }}>{isSpeaking ? 'Click to stop' : 'Text-to-speech synthesis'}</p>
                      </div>
                    </div>
                    <Volume2 style={{ width: 14, height: 14, color: isSpeaking ? '#0891B2' : '#CBD5E1' }} />
                  </button>

                  {/* Key Takeaways */}
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
                    <div style={{ padding: '9px 14px', background: '#F8FAFC', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ color: '#F59E0B' }}>⚡</span>
                      <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#374151' }}>KEY TAKEAWAYS</span>
                    </div>
                    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 12, lineHeight: 1.6, color: '#111827' }}>
                        <span style={{ color: '#0891B2', fontWeight: 700, marginTop: 2 }}>✦</span>
                        <span style={{ fontWeight: 500 }}>{selectedItem.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 12, lineHeight: 1.6, color: '#6B7280' }}>
                        <span style={{ color: '#CBD5E1', marginTop: 2 }}>✦</span>
                        <span>Sourced from {selectedItem.source} · {activeCategory} index</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div>
                    {aiLoading ? (
                      <div style={{ padding: 24, border: '1px dashed #E5E7EB', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 18, height: 18, border: '2px solid #E5E7EB', borderTopColor: '#0891B2', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                        <p style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                          ANALYSING VIA {provider.toUpperCase()}...
                        </p>
                      </div>
                    ) : analysis ? (
                      <div style={{ paddingTop: 2 }}>{renderAnalysis(analysis, isStreaming)}</div>
                    ) : null}
                  </div>

                  {/* Ask AI */}
                  <div style={{ border: '1px solid #E5E7EB', borderRadius: 12, background: '#FAFAFA', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94A3B8' }}>✦ ASK AI</span>
                      <div style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 99, padding: 3, display: 'flex', gap: 2 }}>
                        {[['llama-cloud', 'Llama'], ['gemini', 'Gemini'], ['openai', 'GPT-4']].map(([val, lbl]) => (
                          <button key={val} onClick={() => switchProvider(val)}
                            style={{ padding: '3px 9px', borderRadius: 99, border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 9, fontWeight: 700, background: provider === val ? '#0891B2' : 'transparent', color: provider === val ? '#fff' : '#64748B', transition: 'all 0.2s' }}>
                            {lbl}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 7 }}>
                      <input type="text" value={customQ} onChange={e => setCustomQ(e.target.value)} onKeyDown={e => e.key === 'Enter' && askCustom()}
                        placeholder="Ask anything about this article..."
                        style={{ flex: 1, padding: '8px 12px', fontSize: 12, border: '1px solid #E5E7EB', borderRadius: 8, outline: 'none', background: '#fff', color: '#374151' }} />
                      <button onClick={askCustom}
                        style={{ padding: '8px 13px', background: '#0F172A', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Send style={{ width: 12, height: 12 }} />
                      </button>
                    </div>
                  </div>

                  {/* Read Original */}
                  <a href={selectedItem.link} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 13, background: '#0F172A', color: '#fff', borderRadius: 10, fontFamily: 'monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    READ ORIGINAL SOURCE <ArrowUpRight style={{ width: 13, height: 13 }} />
                  </a>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
