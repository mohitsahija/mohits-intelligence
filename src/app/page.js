'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw, ArrowUpRight, Target, Cpu, Layers, DollarSign, ShoppingBag, Radio,
  Search, Clock, Sun, Moon, Send, Calendar, TrendingUp, TrendingDown, Minus,
  Menu, X, CheckCircle2, CreditCard, Plane, Building, Activity, Flame, Globe,
  Film, HeartPulse, ChevronDown, Trophy, Play, Square, Volume2, Command,
  ShieldAlert, Lock, Fingerprint
} from 'lucide-react';

const SIDEBAR_GROUPS = [
  {
    title: "Trending & Viral",
    categories: {
      "Trending Now (Breaking)": { icon: <Flame className="w-4 h-4" />, iconClass: "icon-rose",    desc: "Global breaking news and alerts" },
      "Viral Content & Buzz":    { icon: <Activity className="w-4 h-4" />, iconClass: "icon-pink",    desc: "Social media trends & buzzworthy topics" },
      "Most Searched Topics":    { icon: <Search className="w-4 h-4" />,   iconClass: "icon-indigo",  desc: "Top queries across search engines" }
    }
  },
  {
    title: "Global Sports Arena",
    categories: {
      "Cricket World":           { icon: <Trophy className="w-4 h-4" />,   iconClass: "icon-green",   desc: "Live scores, match schedules, and player stats" },
      "Football & Transfers":    { icon: <Activity className="w-4 h-4" />, iconClass: "icon-blue",    desc: "League standings, results, and transfer tickers" },
      "Basketball & NBA":        { icon: <Flame className="w-4 h-4" />,    iconClass: "icon-orange",  desc: "Tournament analysis, rankings, and records" },
      "Tennis & Racquet Sports": { icon: <Target className="w-4 h-4" />,   iconClass: "icon-lime",    desc: "Grand Slam draws, rankings, and results" },
      "Combat Sports (MMA/Box)": { icon: <Layers className="w-4 h-4" />,   iconClass: "icon-crimson", desc: "UFC fight cards, division updates, and news" }
    }
  },
  {
    title: "Finance & Cards Hub",
    categories: {
      "Credit & Debit Cards":      { icon: <CreditCard className="w-4 h-4" />, iconClass: "icon-green",  desc: "Bank offers, policies, and card launches" },
      "Rewards & Cashback Offers": { icon: <DollarSign className="w-4 h-4" />, iconClass: "icon-amber",  desc: "Points, fuel cards, and cashback deals" },
      "Travel & Forex Cards":      { icon: <Plane className="w-4 h-4" />,      iconClass: "icon-cyan",   desc: "International spending and forex rates" },
      "Business & Virtual Cards":  { icon: <Building className="w-4 h-4" />,   iconClass: "icon-slate",  desc: "Corporate expense & enterprise cards" },
      "World Money & Stocks":      { icon: <TrendingUp className="w-4 h-4" />, iconClass: "icon-teal",   desc: "Global markets, shares, and IPOs" }
    }
  },
  {
    title: "Core Intelligence",
    categories: {
      "SME & Corporate Expansion": { icon: <Target className="w-4 h-4" />,      iconClass: "icon-green",   desc: "B2B Lead Gen: Facilities & Operations" },
      "AI & Neural Tech":          { icon: <Cpu className="w-4 h-4" />,         iconClass: "icon-blue",    desc: "Latest artificial intelligence software" },
      "Cybersecurity & Threats":   { icon: <ShieldAlert className="w-4 h-4" />, iconClass: "icon-red",     desc: "Threat intel, vulnerabilities & defense" },
      "Data Privacy & Compliance": { icon: <Lock className="w-4 h-4" />,        iconClass: "icon-amber",   desc: "Regulatory standards & privacy protocols" },
      "Digital Identity":          { icon: <Fingerprint className="w-4 h-4" />, iconClass: "icon-indigo",  desc: "Auth systems, biometrics & KYC" },
      "Ads Creatives & Meta":      { icon: <Radio className="w-4 h-4" />,       iconClass: "icon-purple",  desc: "Marketing and platform algorithms" },
      "Tech Innovations":          { icon: <Layers className="w-4 h-4" />,      iconClass: "icon-slate",   desc: "Hardware and enterprise technology" }
    }
  },
  {
    title: "Everyday Essentials",
    categories: {
      "E-commerce & Retail":    { icon: <ShoppingBag className="w-4 h-4" />,  iconClass: "icon-orange", desc: "Online shopping & retail industry" },
      "Real Estate & Property": { icon: <Building className="w-4 h-4" />,      iconClass: "icon-blue",   desc: "Housing, commercial, and property markets" },
      "Health & Lifestyle":     { icon: <HeartPulse className="w-4 h-4" />,    iconClass: "icon-rose",   desc: "Wellness, fitness, and living" },
      "Global Entertainment":   { icon: <Film className="w-4 h-4" />,          iconClass: "icon-purple", desc: "Movies, sports, and celebrity culture" }
    }
  }
];

const MohitIntelligenceLogo = ({ animated = false }) => (
  <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ background: 'var(--accent)', opacity: 0.15, filter: 'blur(10px)' }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="z-10" style={{ color: 'var(--text-primary)' }}>
      <motion.path d="M20 80V30L50 55L80 30V80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
      <motion.circle cx="50" cy="55" r="6.5" fill="var(--accent)"
        initial={animated ? { scale: 0 } : { scale: 1 }} animate={{ scale: 1 }}
        transition={{ delay: animated ? 1.5 : 0, type: "spring", stiffness: 200, damping: 10 }} />
      <motion.path d="M50 55V85" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }} animate={{ pathLength: 1 }}
        transition={{ delay: animated ? 1.8 : 0, duration: 0.8, ease: "easeOut" }} />
    </svg>
  </div>
);

const getTimeAgo = (timestamp) => {
  const seconds = Math.floor((new Date() - timestamp) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
};

const Toast = ({ message, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        className="intel-toast fixed bottom-6 right-6 z-50"
      >
        <CheckCircle2 style={{ width: 14, height: 14 }} /> {message}
      </motion.div>
    )}
  </AnimatePresence>
);

export default function DeepIntelligencePlatform() {
  const [isIntroPlaying, setIsIntroPlaying]   = useState(true);
  const [isDarkMode, setIsDarkMode]           = useState(true);
  const [data, setData]                       = useState({});
  const [tickerData, setTickerData]           = useState([]);
  const [activeCategory, setActiveCategory]   = useState("Cricket World");
  const [expandedGroups, setExpandedGroups]   = useState({ "Global Sports Arena": true });
  const [selectedItem, setSelectedItem]       = useState(null);
  const [isSyncing, setIsSyncing]             = useState(true);
  const [toastMsg, setToastMsg]               = useState("");
  const [searchQuery, setSearchQuery]         = useState("");
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [analysisCache, setAnalysisCache]     = useState({});
  const [cmdPaletteOpen, setCmdPaletteOpen]   = useState(false);
  const [cmdSearch, setCmdSearch]             = useState("");
  const [aiProvider, setAiProvider]           = useState("gemini");
  const [aiAnalysis, setAiAnalysis]           = useState("");
  const [aiLoading, setAiLoading]             = useState(false);
  const [customQuery, setCustomQuery]         = useState("");
  const [textSizeModifier, setTextSizeModifier] = useState(0);
  const [isSpeaking, setIsSpeaking]           = useState(false);
  const [isStreaming, setIsStreaming]         = useState(false);
  const [time, setTime]                       = useState({ ahmedabad: '', ny: '', lon: '' });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdPaletteOpen(p => !p); }
      if (e.key === 'Escape') setCmdPaletteOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const splashTimer = setTimeout(() => setIsIntroPlaying(false), 2600);
    const clockInterval = setInterval(() => {
      const now = new Date();
      setTime({
        ahmedabad: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata',      hour: '2-digit', minute: '2-digit' }),
        ny:        now.toLocaleTimeString('en-US', { timeZone: 'America/New_York',  hour: '2-digit', minute: '2-digit' }),
        lon:       now.toLocaleTimeString('en-US', { timeZone: 'Europe/London',     hour: '2-digit', minute: '2-digit' })
      });
    }, 1000);
    pullRealtimeFeeds(false);
    return () => { clearTimeout(splashTimer); clearInterval(clockInterval); };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    if (window.speechSynthesis) { window.speechSynthesis.cancel(); setIsSpeaking(false); }
  }, [selectedItem]);

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 3000); };

  const pullRealtimeFeeds = async (isManual = true) => {
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/stream?t=${Date.now()}&hash=${Math.random()}`, {
        cache: 'no-store', headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });
      const freshData = await res.json();
      setData(freshData.feeds);
      setTickerData(freshData.ticker);
      if (isManual) showToast("Live radar synced & verified.");
      if (freshData.feeds[activeCategory]?.length > 0 && !selectedItem) {
        handleItemSelection(freshData.feeds[activeCategory][0]);
      }
    } catch {
      if (isManual) showToast("Sync failed. Check network.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleItemSelection = async (item, forceProvider = aiProvider) => {
    setSelectedItem(item);
    const cacheKey = `${item.id}-${forceProvider}`;
    if (analysisCache[cacheKey]) {
      setAiAnalysis(analysisCache[cacheKey]);
      setAiLoading(false);
      if (window.innerWidth < 1024) setMobileMenuOpen(false);
      return;
    }
    setAiAnalysis(""); setAiLoading(true); setIsStreaming(false);
    if (window.innerWidth < 1024) setMobileMenuOpen(false);
    try {
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: item.title, source: item.source, provider: forceProvider })
      });
      const isStream = chatRes.headers.get('X-Stream') === 'true';
      if (isStream) {
        setAiLoading(false); setIsStreaming(true);
        const reader = chatRes.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
          setAiAnalysis(fullText);
        }
        setIsStreaming(false);
        setAnalysisCache(prev => ({ ...prev, [cacheKey]: fullText }));
      } else {
        const chatData = await chatRes.json();
        setAiAnalysis(chatData.error ? `❌ ${chatData.error}` : chatData.response);
        if (!chatData.error) setAnalysisCache(prev => ({ ...prev, [cacheKey]: chatData.response }));
        setAiLoading(false);
      }
    } catch {
      setAiAnalysis("❌ [NETWORK ERROR]: Failed to contact backend.");
      setAiLoading(false); setIsStreaming(false);
    }
  };

  const executeCustomAiQuery = async () => {
    if (!customQuery.trim() || !selectedItem) return;
    setAiLoading(true); setAiAnalysis(""); setIsStreaming(false);
    try {
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: selectedItem.title, source: selectedItem.source, customPrompt: customQuery, provider: aiProvider })
      });
      const isStream = chatRes.headers.get('X-Stream') === 'true';
      if (isStream) {
        setAiLoading(false); setIsStreaming(true);
        const reader = chatRes.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
          setAiAnalysis(fullText);
        }
        setIsStreaming(false);
      } else {
        const chatData = await chatRes.json();
        setAiAnalysis(chatData.error ? `❌ ${chatData.error}` : chatData.response);
        setAiLoading(false);
      }
    } catch {
      setAiAnalysis("❌ [NETWORK ERROR]: Failed to process query.");
      setAiLoading(false); setIsStreaming(false);
    } finally {
      setCustomQuery("");
    }
  };

  const toggleVoiceSummary = () => {
    if (!window.speechSynthesis || !selectedItem) return;
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); return; }
    const clean = aiAnalysis.replace(/[■✦*]/g, '');
    const utt = new SpeechSynthesisUtterance(`${selectedItem.title}. ${clean || 'No analysis available.'}`);
    utt.onend = () => setIsSpeaking(false);
    utt.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utt);
  };

  const changeProvider = (p) => { setAiProvider(p); if (selectedItem) handleItemSelection(selectedItem, p); };
  const toggleGroup = (g) => setExpandedGroups(prev => ({ ...prev, [g]: !prev[g] }));

  const getSentimentBadge = (sentiment) => {
    if (sentiment === 'BULLISH') return (
      <span className="badge-bull flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
        <TrendingUp style={{ width: 10, height: 10 }} /> BULLISH
      </span>
    );
    if (sentiment === 'BEARISH') return (
      <span className="badge-bear flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
        <TrendingDown style={{ width: 10, height: 10 }} /> BEARISH
      </span>
    );
    return (
      <span className="badge-neutral flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
        <Minus style={{ width: 10, height: 10 }} /> NEUTRAL
      </span>
    );
  };

  const renderAnalysis = (rawText, streaming) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      const clean = line.trim();
      const isLast = idx === lines.length - 1;
      if (clean.startsWith('■')) return (
        <h3 key={idx} className="analysis-section-header">
          <span>■</span> {clean.replace('■', '').trim()}
        </h3>
      );
      if (clean.startsWith('✦')) return (
        <div key={idx} className="analysis-bullet">
          <span className="bullet-mark">✦</span>
          <span>{clean.replace('✦', '').trim()}{streaming && isLast ? <span className="streaming-cursor" /> : ''}</span>
        </div>
      );
      return clean ? (
        <p key={idx} style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--text-secondary)', paddingLeft: 16, marginBottom: 8 }}>
          {clean}{streaming && isLast ? <span className="streaming-cursor" /> : ''}
        </p>
      ) : <div key={idx} style={{ height: 6 }} />;
    });
  };

  let activeCatData = { icon: <Globe className="w-4 h-4" />, iconClass: "icon-slate" };
  SIDEBAR_GROUPS.forEach(g => { if (g.categories[activeCategory]) activeCatData = g.categories[activeCategory]; });

  const displayData = data[activeCategory]?.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.source.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="luxury-grid h-screen w-full flex flex-col relative" style={{ fontFamily: 'var(--font-body)', userSelect: 'none' }}>

      {/* ── CMD PALETTE ── */}
      <AnimatePresence>
        {cmdPaletteOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="cmd-overlay fixed inset-0 z-50 flex items-start justify-center px-4"
            style={{ paddingTop: '15vh' }}
            onClick={() => setCmdPaletteOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, y: -10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: -10 }}
              className="cmd-panel w-full" style={{ maxWidth: 520 }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg-tertiary)' }}>
                <Command style={{ width: 14, height: 14, color: 'var(--accent)', flexShrink: 0 }} />
                <input
                  autoFocus type="text"
                  placeholder="Search intelligence categories..."
                  value={cmdSearch} onChange={e => setCmdSearch(e.target.value)}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 12, color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}
                />
                <kbd style={{ fontSize: 9, fontFamily: 'var(--font-mono)', padding: '3px 6px', background: 'var(--bg-secondary)', border: '1px solid var(--border-mid)', borderRadius: 4, color: 'var(--text-muted)' }}>ESC</kbd>
              </div>
              <div className="custom-scroll" style={{ maxHeight: 280, padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {SIDEBAR_GROUPS.flatMap(g => Object.keys(g.categories))
                  .filter(cat => cat.toLowerCase().includes(cmdSearch.toLowerCase()))
                  .map(cat => (
                    <button key={cat}
                      onClick={() => { setActiveCategory(cat); setSelectedItem(null); setCmdPaletteOpen(false); setCmdSearch(""); }}
                      style={{
                        width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                        fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.06em',
                        background: activeCategory === cat ? 'var(--accent)' : 'transparent',
                        color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        transition: 'all 0.15s'
                      }}
                    >
                      <span>{cat}</span>
                      <ArrowUpRight style={{ width: 12, height: 12, opacity: 0.5 }} />
                    </button>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INTRO SPLASH ── */}
      <AnimatePresence>
        {isIntroPlaying && (
          <motion.div
            className="intro-screen"
            exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.7, ease: "easeInOut" } }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, position: 'relative', zIndex: 1 }}>
              <MohitIntelligenceLogo animated />
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.9 }}
                style={{ textAlign: 'center' }}
              >
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, letterSpacing: '0.28em', color: '#EEF2FF', textTransform: 'uppercase', marginBottom: 10 }}>
                  MOHIT SAHIJA
                </h2>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.5em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 700 }}>
                  AI-DRIVEN MACRO ANALYTICS ENGINE
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                style={{ display: 'flex', gap: 6 }}
              >
                {[0,1,2].map(i => (
                  <motion.div key={i}
                    style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ delay: i * 0.2, duration: 1, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast message={toastMsg} isVisible={toastMsg !== ""} />

      {/* ── TICKER ── */}
      <div className="ticker-wrap shrink-0" style={{ height: 32, display: 'flex', alignItems: 'center', fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
        <div className="ticker-move">
          {[...Array(3)].map((_, loopIdx) => (
            <span key={loopIdx}>
              {tickerData.length > 0 ? tickerData.map((stock, idx) => (
                <span key={`${loopIdx}-${idx}`} style={{ marginLeft: 28, marginRight: 28, color: stock.isUp ? 'var(--signal-bull)' : 'var(--signal-bear)' }}>
                  {stock.isUp ? '▲' : '▼'} {stock.name} {stock.price} ({stock.percent}%)
                </span>
              )) : (
                <span style={{ marginLeft: 24, color: 'var(--text-muted)' }}>CONNECTING REAL-TIME GLOBAL MARKET CHANNELS...</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="main-header shrink-0" style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 4 }}>
            {mobileMenuOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
          </button>
          <MohitIntelligenceLogo animated={false} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              MOHIT'S INTELLIGENCE
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div className="live-dot" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase' }}>LIVE</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => setCmdPaletteOpen(true)}
            className="hidden xl:flex"
            style={{ alignItems: 'center', gap: 8, background: 'var(--bg-tertiary)', padding: '6px 12px', borderRadius: 8, fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)', border: '1px solid var(--border-soft)', cursor: 'pointer', transition: 'all 0.15s' }}>
            <Command style={{ width: 11, height: 11, color: 'var(--accent)' }} />
            CMD+K
          </button>

          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 16, paddingRight: 16, borderRight: '1px solid var(--border-soft)' }}>
            {[['IND', time.ahmedabad], ['NY', time.ny], ['LON', time.lon]].map(([label, t]) => (
              <span key={label} className="time-chip">
                <Clock style={{ width: 10, height: 10 }} /> {label}: {t}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setIsDarkMode(!isDarkMode)}
              style={{ padding: 8, borderRadius: 8, background: 'var(--bg-tertiary)', border: '1px solid var(--border-soft)', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
              {isDarkMode ? <Sun style={{ width: 14, height: 14 }} /> : <Moon style={{ width: 14, height: 14 }} />}
            </button>
            <button onClick={() => pullRealtimeFeeds(true)} disabled={isSyncing}
              style={{ padding: '8px 16px', background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, transition: 'all 0.2s' }}>
              <RefreshCw style={{ width: 13, height: 13 }} className={isSyncing ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">{isSyncing ? 'SYNCING' : 'REFRESH'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>

        {/* ── SIDEBAR ── */}
        <div
          className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
          style={{
            position: 'absolute', top: 0, left: 0, height: '100%', width: 320,
            background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-soft)',
            display: 'flex', flexDirection: 'column', zIndex: 30, flexShrink: 0,
            transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)'
          }}
          // make it relative on lg
        >
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-soft)', flexShrink: 0 }}>
            <span className="intel-label">Unified Search Matrices</span>
          </div>
          <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SIDEBAR_GROUPS.map((group, gi) => (
              <div key={gi} className="sidebar-group">
                <button className="sidebar-group-header" onClick={() => toggleGroup(group.title)}>
                  <span>{group.title}</span>
                  <ChevronDown style={{ width: 14, height: 14, color: 'var(--text-muted)', transition: 'transform 0.3s', transform: expandedGroups[group.title] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                <AnimatePresence>
                  {expandedGroups[group.title] && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '4px 8px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {Object.entries(group.categories).map(([catName, catData]) => (
                          <button key={catName}
                            className={`cat-btn ${activeCategory === catName ? 'active' : ''}`}
                            onClick={() => { setActiveCategory(catName); setSelectedItem(null); setSearchQuery(""); if (window.innerWidth < 1024) setMobileMenuOpen(false); }}
                          >
                            <span className={`cat-icon ${activeCategory === catName ? catData.iconClass : 'icon-slate'}`} style={{ opacity: activeCategory === catName ? 1 : 0.6 }}>
                              {catData.icon}
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 11, fontWeight: 700, color: activeCategory === catName ? 'var(--text-primary)' : 'var(--text-secondary)', truncate: true, marginBottom: 2 }}>
                                {catName}
                              </div>
                              <div style={{ fontSize: 9, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {catData.desc}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEED PANEL ── */}
        <div style={{ flex: 1, borderRight: '1px solid var(--border-soft)', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', minWidth: 0, marginLeft: 320 }} className="lg:ml-0">
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-soft)', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className={`cat-icon ${activeCatData.iconClass}`}>{activeCatData.icon}</span>
              <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                {activeCategory}
              </h2>
            </div>
            <div style={{ position: 'relative' }}>
              <Search style={{ width: 12, height: 12, position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Filter nodes..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="intel-input" style={{ width: 200, paddingLeft: 30, paddingRight: 12, paddingTop: 7, paddingBottom: 7 }} />
            </div>
          </div>

          <div className="custom-scroll" style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
            {isSyncing && !data[activeCategory] ? (
              [...Array(5)].map((_, i) => (
                <div key={i} style={{ padding: 16, borderRadius: 12, border: '1px solid var(--border-soft)', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div className="shimmer-bg" style={{ height: 14, borderRadius: 6, width: '75%' }} />
                  <div className="shimmer-bg" style={{ height: 10, borderRadius: 6, width: '45%' }} />
                </div>
              ))
            ) : displayData.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', paddingTop: 60 }}>
                <Target style={{ width: 36, height: 36, marginBottom: 12, opacity: 0.4 }} />
                <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>No telemetry blocks found for this segment.</p>
                <p style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 6 }}>Try refreshing the data stream.</p>
              </div>
            ) : displayData.map(item => (
              <motion.div key={item.id} layoutId={`card-${item.id}`}
                onClick={() => handleItemSelection(item)}
                className={`feed-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                  <span className="source-badge">{item.source}</span>
                  {getSentimentBadge(item.sentiment)}
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.45, color: 'var(--text-primary)', marginBottom: 10, transition: 'color 0.2s' }}>
                  {item.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    <Calendar style={{ width: 10, height: 10 }} /> {item.dateString}
                  </span>
                  <span className="time-ago">{getTimeAgo(item.rawDate)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── DETAIL PANEL ── */}
        <div
          style={{
            width: 520, flexShrink: 0,
            background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border-soft)',
            display: selectedItem ? 'flex' : 'none', flexDirection: 'column',
            position: 'absolute', top: 0, right: 0, height: '100%', zIndex: 20
          }}
          className="lg:relative lg:flex lg:flex-col"
        >
          {/* Detail header */}
          <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-soft)', background: 'var(--bg-tertiary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <button onClick={() => setSelectedItem(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 9, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)', padding: '5px 10px', borderRadius: 6, cursor: 'pointer', transition: 'all 0.15s' }}>
              ← BACK
            </button>
            <div style={{ display: 'flex', gap: 6 }}>
              {[-1, 1].map((delta, i) => (
                <button key={i} onClick={() => setTextSizeModifier(p => Math.max(-2, Math.min(4, p + delta)))}
                  style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700, padding: '4px 10px', borderRadius: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  {delta > 0 ? 'A+' : 'A−'}
                </button>
              ))}
            </div>
          </div>

          <div className="custom-scroll" style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div key={selectedItem.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                  {/* Article header */}
                  <div style={{ paddingBottom: 16, borderBottom: '1px solid var(--border-soft)' }}>
                    <p className="article-meta" style={{ marginBottom: 10 }}>
                      {selectedItem.source} • STAFF REPORTER • {selectedItem.dateString} AT {selectedItem.timeString}
                    </p>
                    <h2 className="article-headline" style={{ fontSize: 20 + textSizeModifier }}>
                      {selectedItem.title}
                    </h2>
                  </div>

                  {/* Voice button */}
                  <button onClick={toggleVoiceSummary} className={`voice-btn ${isSpeaking ? 'speaking' : ''}`}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ padding: 8, borderRadius: '50%', background: isSpeaking ? 'var(--accent)' : 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                        {isSpeaking
                          ? <Square style={{ width: 12, height: 12, fill: '#fff', color: '#fff' }} />
                          : <Play style={{ width: 12, height: 12, fill: 'var(--text-secondary)', color: 'var(--text-secondary)', marginLeft: 1 }} />
                        }
                      </div>
                      <div>
                        <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>Listen to Takeaways (AI Voice)</p>
                        <p style={{ fontSize: 9, color: 'var(--text-muted)' }}>{isSpeaking ? 'Click to stop playback' : 'Synthesize speech ledger stream'}</p>
                      </div>
                    </div>
                    <Volume2 style={{ width: 16, height: 16, color: isSpeaking ? 'var(--accent)' : 'var(--text-muted)' }} />
                  </button>

                  {/* Key Takeaways */}
                  <div className="takeaways-box">
                    <div className="takeaways-header">
                      <span style={{ color: 'var(--accent)' }}>⚡</span> KEY TAKEAWAYS
                    </div>
                    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, lineHeight: 1.6, color: 'var(--text-primary)' }}>
                        <span style={{ color: 'var(--accent)', fontWeight: 700, marginTop: 1 }}>✦</span>
                        <span>{selectedItem.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--text-muted)', marginTop: 1 }}>✦</span>
                        <span>Live feed routed from {activeCategory} sector intelligence index.</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div style={{ fontSize: 12 + textSizeModifier }}>
                    {aiLoading ? (
                      <div style={{ padding: 24, border: '1px dashed var(--border-mid)', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                        <div className="ai-spinner" />
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                          Parsing analytics via {aiProvider}...
                        </p>
                      </div>
                    ) : aiAnalysis ? (
                      <div>{renderAnalysis(aiAnalysis, isStreaming)}</div>
                    ) : null}
                  </div>

                  {/* Ask AI */}
                  <div style={{ border: '1px solid var(--border-soft)', borderRadius: 12, background: 'var(--bg-tertiary)', padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        ✦ Ask Intelligence AI
                      </span>
                      <div className="pill-toggle">
                        {[['llama-cloud', 'Llama'], ['gemini', 'Gemini'], ['openai', 'OpenAI']].map(([val, label]) => (
                          <button key={val} className={`pill-option ${aiProvider === val ? 'active' : ''}`} onClick={() => changeProvider(val)}>
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input type="text" value={customQuery} onChange={e => setCustomQuery(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && executeCustomAiQuery()}
                        placeholder="Query this article or ask for analysis..."
                        className="intel-input" style={{ flex: 1, padding: '8px 12px' }} />
                      <button onClick={executeCustomAiQuery}
                        style={{ padding: '8px 14px', background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}>
                        <Send style={{ width: 13, height: 13 }} />
                      </button>
                    </div>
                  </div>

                  {/* Read Original */}
                  <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="read-original-btn">
                    READ ORIGINAL SOURCE <ArrowUpRight style={{ width: 14, height: 14 }} />
                  </a>

                </motion.div>
              ) : (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', opacity: 0.5 }}>
                  <Target style={{ width: 48, height: 48, marginBottom: 12 }} />
                  <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)' }}>Select a node to parse intelligence.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
