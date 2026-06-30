'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, ArrowUpRight, Target, Cpu, Layers, DollarSign, ShoppingBag, Radio, 
  Search, Clock, Sun, Moon, Send, Calendar, TrendingUp, TrendingDown, Minus, 
  Menu, X, CheckCircle2, CreditCard, Plane, Building, Activity, Flame, Globe, 
  Film, HeartPulse, ChevronDown, Trophy, Play, Square, Volume2, Command, Briefcase,
  ShieldAlert, Lock, Fingerprint, Bookmark, BookmarkCheck, Copy, Car, Rocket,
  GraduationCap, Bitcoin, Shield, Newspaper, Banknote, Users, BarChart2
} from 'lucide-react';

// ── PINNED QUICK ACCESS ──
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
      "Cricket World":           { icon: <Trophy className="w-4 h-4" />, color: "bg-emerald-600 text-white", desc: "Live scores, match schedules, and player stats" },
      "Football & Transfers":    { icon: <Activity className="w-4 h-4" />, color: "bg-blue-600 text-white", desc: "League standings, results, and transfer tickers" },
      "Basketball & NBA":        { icon: <Flame className="w-4 h-4" />, color: "bg-orange-500 text-white", desc: "Tournament analysis, rankings, and records" },
      "Tennis & Racquet Sports": { icon: <Target className="w-4 h-4" />, color: "bg-lime-600 text-white", desc: "Grand Slam draws, rankings, and results" },
      "Combat Sports (MMA/Box)": { icon: <Layers className="w-4 h-4" />, color: "bg-red-700 text-white", desc: "UFC fight cards, division updates, and news" },
    }
  },
  {
    title: "Finance & Cards Hub",
    categories: {
      "Credit & Debit Cards":      { icon: <CreditCard className="w-4 h-4" />, color: "bg-emerald-500 text-white", desc: "Bank offers, policies, and card launches" },
      "Rewards & Cashback Offers": { icon: <DollarSign className="w-4 h-4" />, color: "bg-amber-500 text-white", desc: "Points, fuel cards, and cashback deals" },
      "Travel & Forex Cards":      { icon: <Plane className="w-4 h-4" />, color: "bg-cyan-500 text-white", desc: "International spending and forex rates" },
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
      "Real Estate & Property": { icon: <Building className="w-4 h-4" />, color: "bg-blue-500 text-white", desc: "Housing, commercial, and property markets" },
      "Health & Lifestyle":     { icon: <HeartPulse className="w-4 h-4" />, color: "bg-rose-400 text-white", desc: "Wellness, fitness, and living" },
      "Global Entertainment":   { icon: <Globe className="w-4 h-4" />, color: "bg-purple-500 text-white", desc: "Movies, sports, and celebrity culture" },
    }
  },
];

const ALL_CATS = {};
SIDEBAR_GROUPS.forEach(g => Object.entries(g.categories).forEach(([k, v]) => { ALL_CATS[k] = v; }));

const MohitIntelligenceLogo = ({ animated = false }) => (
  <div className="relative flex items-center justify-center w-12 h-12 shrink-0 mr-2">
    <motion.div className="absolute inset-0 bg-cyan-500 rounded-full opacity-20 blur-xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl z-10">
      <motion.path d="M20 80V30L50 55L80 30V80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
      <motion.circle cx="50" cy="55" r="6.5" fill="#06b6d4"
        initial={animated ? { scale: 0 } : { scale: 1 }} animate={{ scale: 1 }}
        transition={{ delay: animated ? 1.5 : 0, type: "spring", stiffness: 200, damping: 10 }} />
      <motion.path d="M50 55V85" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round"
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
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-xl font-mono text-xs font-bold flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4" /> {message}
      </motion.div>
    )}
  </AnimatePresence>
);

export default function DeepIntelligencePlatform() {
  const [isIntroPlaying, setIsIntroPlaying] = useState(true);
  const [isDarkMode, setIsDarkMode]         = useState(true);
  const [data, setData]                     = useState({});
  const [tickerData, setTickerData]         = useState([]);
  const [activeCategory, setActiveCategory] = useState("Trending Now (Breaking)");
  const [expandedGroups, setExpandedGroups] = useState({ "Trending & Viral": true, "India Daily": true });
  const [selectedItem, setSelectedItem]     = useState(null);
  const [isSyncing, setIsSyncing]           = useState(true);
  const [toastMsg, setToastMsg]             = useState("");
  const [searchQuery, setSearchQuery]       = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [analysisCache, setAnalysisCache]   = useState({});
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [cmdSearch, setCmdSearch]           = useState("");
  const [aiProvider, setAiProvider]         = useState("llama-cloud");
  const [aiAnalysis, setAiAnalysis]         = useState("");
  const [aiLoading, setAiLoading]           = useState(false);
  const [isStreaming, setIsStreaming]       = useState(false);
  const [customQuery, setCustomQuery]       = useState("");
  const [textSizeModifier, setTextSizeModifier] = useState(0);
  const [isSpeaking, setIsSpeaking]         = useState(false);
  const [time, setTime]                     = useState({ ahmedabad: '', ny: '', lon: '' });

  // NEW FEATURE STATES
  const [bookmarks, setBookmarks]           = useState([]);
  const [showBookmarks, setShowBookmarks]   = useState(false);
  const [seenIds, setSeenIds]               = useState(new Set());
  const [nextSyncIn, setNextSyncIn]         = useState(900);
  const [copied, setCopied]                 = useState(false);
  const [readProgress, setReadProgress]     = useState(0);
  const [sentimentSummary, setSentimentSummary] = useState({ bull: 0, bear: 0, neutral: 0 });
  const detailScrollRef = useRef(null);

  // ── KEYBOARD ──
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdPaletteOpen(prev => !prev); }
      if (e.key === 'Escape') { setCmdPaletteOpen(false); setShowBookmarks(false); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ── INIT ──
  useEffect(() => {
    const splashTimer = setTimeout(() => setIsIntroPlaying(false), 2400);
    // Load persisted data
    const saved = localStorage.getItem('mi_bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
    const savedSeen = localStorage.getItem('mi_seen');
    if (savedSeen) setSeenIds(new Set(JSON.parse(savedSeen)));
    const savedDark = localStorage.getItem('mi_dark');
    if (savedDark !== null) setIsDarkMode(JSON.parse(savedDark));

    const clockInterval = setInterval(() => {
      const now = new Date();
      setTime({
        ahmedabad: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }),
        ny: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
        lon: now.toLocaleTimeString('en-US', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' })
      });
    }, 1000);

    pullRealtimeFeeds(false);
    return () => { clearTimeout(splashTimer); clearInterval(clockInterval); };
  }, []);

  // ── AUTO REFRESH COUNTDOWN ──
  useEffect(() => {
    const interval = setInterval(() => {
      setNextSyncIn(p => {
        if (p <= 1) { pullRealtimeFeeds(false); return 900; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ── DARK MODE PERSIST ──
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('mi_dark', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // ── RESET ON ITEM CHANGE ──
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

  const handleDetailScroll = () => {
    const el = detailScrollRef.current;
    if (!el) return;
    const prog = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    setReadProgress(Math.min(100, Math.round(prog)));
  };

  const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 3000); };

  const pullRealtimeFeeds = async (isManual = true) => {
    setIsSyncing(true);
    try {
      const response = await fetch(`/api/stream?t=${Date.now()}&hash=${Math.random()}`, {
        cache: 'no-store', headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });
      const freshData = await response.json();
      setData(freshData.feeds);
      setTickerData(freshData.ticker);
      setNextSyncIn(900);
      // track seen
      const newSeen = new Set(seenIds);
      Object.values(freshData.feeds).forEach(items => items.forEach(i => newSeen.add(i.id)));
      setSeenIds(newSeen);
      localStorage.setItem('mi_seen', JSON.stringify([...newSeen]));
      if (isManual) showToast("Live radar synced & verified.");
      if (freshData.feeds[activeCategory]?.length > 0 && !selectedItem) {
        handleItemSelection(freshData.feeds[activeCategory][0]);
      }
    } catch (err) {
      if (isManual) showToast("Sync failed. Check network.");
    } finally { setIsSyncing(false); }
  };

  const handleItemSelection = async (item, forceProvider = aiProvider) => {
    setSelectedItem(item);
    const cacheKey = `${item.id}-${forceProvider}`;
    if (analysisCache[cacheKey]) {
      setAiAnalysis(analysisCache[cacheKey]); setAiLoading(false);
      if (window.innerWidth < 1024) setMobileMenuOpen(false);
      return;
    }
    setAiAnalysis(""); setAiLoading(true); setIsStreaming(false);
    if (window.innerWidth < 1024) setMobileMenuOpen(false);
    try {
      const chatRes = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: item.title, source: item.source, provider: forceProvider })
      });
      const isStream = chatRes.headers.get('X-Stream') === 'true';
      if (isStream) {
        setAiLoading(false); setIsStreaming(true);
        const reader = chatRes.body.getReader(); const decoder = new TextDecoder();
        let fullText = "";
        while (true) {
          const { done, value } = await reader.read(); if (done) break;
          fullText += decoder.decode(value, { stream: true }); setAiAnalysis(fullText);
        }
        setIsStreaming(false); setAnalysisCache(prev => ({ ...prev, [cacheKey]: fullText }));
      } else {
        const chatData = await chatRes.json();
        if (chatData.error) { setAiAnalysis(`❌ [API CONNECTION FAILED]:\n${chatData.error}`); }
        else { setAiAnalysis(chatData.response); setAnalysisCache(prev => ({ ...prev, [cacheKey]: chatData.response })); }
        setAiLoading(false);
      }
    } catch (err) { setAiAnalysis(`❌ [NETWORK ERROR]: Failed to contact backend server.`); setAiLoading(false); }
  };

  const executeCustomAiQuery = async () => {
    if (!customQuery.trim() || !selectedItem) return;
    setAiLoading(true); setAiAnalysis(""); setIsStreaming(false);
    try {
      const chatRes = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: selectedItem.title, source: selectedItem.source, customPrompt: customQuery, provider: aiProvider })
      });
      const isStream = chatRes.headers.get('X-Stream') === 'true';
      if (isStream) {
        setAiLoading(false); setIsStreaming(true);
        const reader = chatRes.body.getReader(); const decoder = new TextDecoder();
        let fullText = "";
        while (true) {
          const { done, value } = await reader.read(); if (done) break;
          fullText += decoder.decode(value, { stream: true }); setAiAnalysis(fullText);
        }
        setIsStreaming(false);
      } else {
        const chatData = await chatRes.json();
        if (chatData.error) { setAiAnalysis(`❌ [ERROR]: ${chatData.error}`); }
        else { setAiAnalysis(chatData.response); }
        setAiLoading(false);
      }
    } catch (err) { setAiAnalysis("❌ [NETWORK ERROR]: Failed to process custom query."); setAiLoading(false); }
    finally { setCustomQuery(""); }
  };

  const toggleVoiceSummary = () => {
    if (!window.speechSynthesis || !selectedItem) return;
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); return; }
    const cleanTextForAudio = aiAnalysis.replace(/[■✦*]/g, '');
    const utterance = new SpeechSynthesisUtterance(`${selectedItem.title}. ${cleanTextForAudio || 'No analysis available.'}`);
    utterance.onend = () => setIsSpeaking(false); utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true); window.speechSynthesis.speak(utterance);
  };

  const changeProvider = (newProvider) => { setAiProvider(newProvider); if (selectedItem) handleItemSelection(selectedItem, newProvider); };
  const toggleGroup = (groupName) => setExpandedGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  const switchCategory = (cat) => { setActiveCategory(cat); setSelectedItem(null); setSearchQuery(""); if (window.innerWidth < 1024) setMobileMenuOpen(false); };

  const toggleBookmark = (item) => {
    const exists = bookmarks.find(b => b.id === item.id);
    const updated = exists ? bookmarks.filter(b => b.id !== item.id) : [...bookmarks, { ...item, savedAt: Date.now() }];
    setBookmarks(updated);
    localStorage.setItem('mi_bookmarks', JSON.stringify(updated));
    showToast(exists ? 'Bookmark removed.' : '✦ Article saved!');
  };
  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  const copyAnalysis = () => {
    if (!aiAnalysis || !selectedItem) return;
    const text = `${selectedItem.title}\nSource: ${selectedItem.source}\n\n${aiAnalysis.replace(/[■✦]/g, '').trim()}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true); showToast('Analysis copied!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getSentimentBadge = (sentiment) => {
    if (sentiment === 'BULLISH') return <span className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full text-[9px] font-bold font-mono"><TrendingUp className="w-3 h-3"/> BULLISH</span>;
    if (sentiment === 'BEARISH') return <span className="flex items-center gap-1 text-rose-500 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded-full text-[9px] font-bold font-mono"><TrendingDown className="w-3 h-3"/> BEARISH</span>;
    return <span className="flex items-center gap-1 text-slate-400 bg-slate-400/10 border border-slate-400/20 px-1.5 py-0.5 rounded-full text-[9px] font-bold font-mono"><Minus className="w-3 h-3"/> NEUTRAL</span>;
  };

  const renderPremiumSemanticContent = (rawText) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      const cleanLine = line.trim();
      const isLast = idx === lines.length - 1;
      if (cleanLine.startsWith('■')) return (
        <h3 key={idx} className="text-xs font-black tracking-widest text-slate-900 dark:text-cyan-400 uppercase mt-6 mb-2 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-1 font-mono">
          <span className="w-0.5 h-3.5 bg-cyan-500 rounded-full inline-block" />
          {cleanLine.replace('■', '').trim()}
        </h3>
      );
      if (cleanLine.startsWith('✦')) return (
        <div key={idx} className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-start gap-3 pl-1 py-1 leading-relaxed">
          <span className="text-cyan-500 font-bold mt-0.5">✦</span>
          <span>
            {cleanLine.replace('✦', '').trim()}
            {isStreaming && isLast && <span className="text-cyan-500 animate-pulse ml-0.5">▋</span>}
          </span>
        </div>
      );
      return cleanLine ? (
        <p key={idx} className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-normal pl-4 mb-3">
          {cleanLine}{isStreaming && isLast && <span className="text-cyan-500 animate-pulse ml-0.5">▋</span>}
        </p>
      ) : <div key={idx} className="h-2" />;
    });
  };

  const formatCountdown = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  let activeCatData = { icon: <Globe className="w-4 h-4" />, color: "bg-slate-500 text-white" };
  SIDEBAR_GROUPS.forEach(group => { if (group.categories[activeCategory]) activeCatData = group.categories[activeCategory]; });

  const displayData = (showBookmarks ? bookmarks : (data[activeCategory] || []))
    .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.source.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="luxury-grid h-screen w-full flex flex-col font-sans transition-colors duration-300 selection:bg-cyan-500 selection:text-white relative">

      {/* ── BOOKMARK DRAWER ── */}
      <AnimatePresence>
        {showBookmarks && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-40"
            onClick={() => setShowBookmarks(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Saved Articles</h3>
                  <p className="text-[9px] font-mono text-slate-400 mt-0.5">{bookmarks.length} BOOKMARKS</p>
                </div>
                <button onClick={() => setShowBookmarks(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scroll">
                {bookmarks.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 pt-16">
                    <Bookmark className="w-8 h-8 mb-3" />
                    <p className="text-xs font-mono">No saved articles yet.</p>
                  </div>
                ) : bookmarks.map(item => (
                  <div key={item.id} onClick={() => { handleItemSelection(item); setShowBookmarks(false); }}
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 cursor-pointer hover:border-cyan-500/50 transition-all">
                    <p className="text-[9px] font-mono text-slate-400 mb-1">{item.source}</p>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">{item.title}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[9px] font-mono text-slate-400">{item.dateString}</span>
                      <button onClick={e => { e.stopPropagation(); toggleBookmark(item); }}
                        className="text-[9px] font-mono font-bold text-rose-500 hover:text-rose-600">REMOVE</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CMD PALETTE ── */}
      <AnimatePresence>
        {cmdPaletteOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setCmdPaletteOpen(false)}>
            <motion.div initial={{ scale: 0.96, y: -10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: -10 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}>
              <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5 bg-slate-50 dark:bg-slate-950/40">
                <Command className="w-4 h-4 text-cyan-500" />
                <input type="text" autoFocus placeholder="Search all categories..."
                  value={cmdSearch} onChange={(e) => setCmdSearch(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none" />
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-slate-500">ESC</kbd>
              </div>
              <div className="max-h-72 overflow-y-auto p-2 custom-scroll space-y-0.5">
                {SIDEBAR_GROUPS.flatMap(g => Object.keys(g.categories))
                  .filter(cat => cat.toLowerCase().includes(cmdSearch.toLowerCase()))
                  .map(cat => (
                    <button key={cat} onClick={() => { switchCategory(cat); setCmdPaletteOpen(false); setCmdSearch(""); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold font-mono transition-colors flex items-center justify-between ${activeCategory === cat ? 'bg-cyan-500 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'}`}>
                      <span>{cat}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
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
          <motion.div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center text-white"
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: "easeInOut" } }}>
            <div className="flex flex-col items-center gap-6">
              <MohitIntelligenceLogo animated={true} />
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="text-center">
                <h2 className="text-xl font-black tracking-[0.3em] text-slate-100 uppercase">MOHIT SAHIJA</h2>
                <p className="text-[10px] font-mono tracking-[0.5em] text-cyan-400 uppercase mt-2">AI-DRIVEN MACRO ANALYTICS ENGINE</p>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="flex gap-1.5">
                {[0,1,2].map(i => <motion.div key={i} className="w-1 h-1 rounded-full bg-cyan-500" animate={{ opacity: [0.2,1,0.2] }} transition={{ delay: i*0.2, duration: 1, repeat: Infinity }} />)}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast message={toastMsg} isVisible={toastMsg !== ""} />

      {/* ── TICKER ── */}
      <div className="ticker-wrap h-8 flex items-center bg-slate-900 shrink-0 border-b border-slate-800 text-[10px] font-mono font-bold">
        <div className="ticker-move">
          {[...Array(3)].map((_, loopIdx) => (
            <span key={loopIdx}>
              {tickerData.length > 0 ? tickerData.map((stock, idx) => (
                <span key={`${loopIdx}-${idx}`} className={`mx-6 ${stock.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stock.isUp ? '▲' : '▼'} {stock.name} {stock.price} ({stock.percent}%)
                </span>
              )) : <span className="mx-6 text-slate-500">CONNECTING REAL-TIME GLOBAL MARKET CHANNELS...</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className="bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 py-2.5 flex justify-between items-center backdrop-blur-xl z-20 shrink-0 shadow-sm sticky top-0">
        <div className="flex items-center gap-3 md:gap-4">
          <button className="lg:hidden text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="scale-75 origin-left -my-2 flex items-center">
            <MohitIntelligenceLogo animated={false} />
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg md:text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">MOHIT'S INTELLIGENCE</h1>
            <div className="flex items-center gap-1.5">
              <div className="relative w-1.5 h-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-40 animate-ping" />
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-500 tracking-widest hidden sm:inline">LIVE</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Auto-sync countdown */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md">
            <Clock className="w-3 h-3 text-cyan-500" />
            <span className="text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400">SYNC {formatCountdown(nextSyncIn)}</span>
          </div>

          {/* Bookmarks */}
          <button onClick={() => setShowBookmarks(true)}
            className="relative p-2 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-cyan-500 transition-colors">
            <Bookmark className="w-3.5 h-3.5" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-white text-[8px] font-bold font-mono flex items-center justify-center">{bookmarks.length}</span>
            )}
          </button>

          <button onClick={() => setCmdPaletteOpen(true)}
            className="hidden xl:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-2.5 py-1.5 rounded-md text-[10px] font-mono font-bold text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-cyan-500 transition-colors">
            <Command className="w-3 h-3 text-cyan-500" /><span>CMD+K</span>
          </button>

          <div className="hidden lg:flex items-center gap-4 text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 pr-3">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400"/> IND: {time.ahmedabad}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400"/> NY: {time.ny}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400"/> LON: {time.lon}</span>
          </div>

          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all border border-slate-200 dark:border-slate-800">
            {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => pullRealtimeFeeds(true)} disabled={isSyncing}
            className="px-3 md:px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-[9px] tracking-widest uppercase rounded-md transition-all flex items-center gap-2 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 active:scale-95">
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-400 dark:text-cyan-600' : ''}`} />
            <span className="hidden sm:inline">{isSyncing ? 'SYNCING' : 'REFRESH'}</span>
          </button>
        </div>
      </header>

      {/* ── PINNED QUICK ACCESS STRIP ── */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-1.5 flex gap-1.5 overflow-x-auto shrink-0 items-center">
        <span className="text-[8px] font-mono font-bold text-slate-300 dark:text-slate-600 tracking-widest shrink-0 mr-1">QUICK:</span>
        {PINNED_CATEGORIES.map(cat => {
          const catMeta = ALL_CATS[cat];
          const isActive = activeCategory === cat;
          return (
            <button key={cat} onClick={() => switchCategory(cat)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold whitespace-nowrap shrink-0 transition-all ${isActive ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-cyan-500/30 hover:text-cyan-500'}`}>
              {catMeta?.icon}
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-1 min-h-0 overflow-hidden relative">

        {/* ── SIDEBAR ── */}
        <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 absolute lg:relative top-0 left-0 h-full w-[300px] bg-white dark:bg-slate-900/95 border-r border-slate-200 dark:border-slate-800 flex flex-col z-30 shrink-0 transition-transform duration-300 ease-in-out`}>
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">Intelligence Matrices</span>
          </div>
          <div className="flex-1 custom-scroll overflow-y-auto p-2 space-y-2">
            {SIDEBAR_GROUPS.map((group, groupIdx) => (
              <div key={groupIdx} className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/30 overflow-hidden">
                <button onClick={() => toggleGroup(group.title)} className="w-full flex justify-between items-center p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                  <span className="text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest font-mono">{group.title}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${expandedGroups[group.title] ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedGroups[group.title] && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-1.5 pb-2 space-y-0.5">
                        {Object.entries(group.categories).map(([catName, catData]) => {
                          const isActive = activeCategory === catName;
                          const catItems = data[catName] || [];
                          const isNew = catItems.some(i => !seenIds.has(i.id));
                          return (
                            <button key={catName} onClick={() => switchCategory(catName)}
                              className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-all ${isActive ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700' : 'hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent'}`}>
                              <span className={`p-1.5 rounded-md shrink-0 ${isActive ? catData.color : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                                {catData.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className={`text-xs font-bold truncate ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{catName}</div>
                              </div>
                              {/* Article count */}
                              {catItems.length > 0 && (
                                <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full shrink-0 ${isActive ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                  {catItems.length}
                                </span>
                              )}
                              {/* NEW dot */}
                              {isNew && !isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
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
        <div className="flex-1 border-r border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40 flex flex-col min-w-0 lg:min-w-[380px]">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 space-y-2">
            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-2.5">
                <span className={`p-1.5 rounded-md ${activeCatData.color}`}>{activeCatData.icon}</span>
                <div>
                  <h2 className="text-xs font-black tracking-tight text-slate-900 dark:text-white uppercase font-mono">{showBookmarks ? 'Saved Articles' : activeCategory}</h2>
                  <p className="text-[9px] font-mono text-slate-400 mt-0.5">{displayData.length} articles</p>
                </div>
              </div>
              <div className="relative">
                <Search className="w-3 h-3 absolute left-2.5 top-2 text-slate-400" />
                <input type="text" placeholder="Filter..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-7 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors w-36 md:w-44" />
              </div>
            </div>

            {/* SENTIMENT SUMMARY BAR */}
            {!showBookmarks && displayData.length > 0 && (
              <div className="flex items-center gap-2">
                <BarChart2 className="w-3 h-3 text-slate-300 dark:text-slate-600 shrink-0" />
                {[
                  { label: 'BULLISH', count: sentimentSummary.bull, cls: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400' },
                  { label: 'BEARISH', count: sentimentSummary.bear, cls: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400' },
                  { label: 'NEUTRAL', count: sentimentSummary.neutral, cls: 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400' },
                ].map(s => (
                  <span key={s.label} className={`flex items-center gap-1 text-[8px] font-mono font-bold px-2 py-0.5 rounded-full ${s.cls}`}>
                    ● {s.count} {s.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 p-3 custom-scroll overflow-y-auto space-y-2.5">
            {isSyncing && !data[activeCategory] ? (
              [...Array(5)].map((_, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-2/5 shimmer-bg" />
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-11/12 shimmer-bg" />
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4 shimmer-bg" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/4 shimmer-bg" />
                </div>
              ))
            ) : displayData.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60 pt-10">
                <Target className="w-10 h-10 mb-3 stroke-1" />
                <p className="text-xs font-mono">No articles found for this segment.</p>
                <p className="text-[10px] text-slate-500 mt-2">Try refreshing the data stream.</p>
              </div>
            ) : displayData.map((item) => {
              const selected = selectedItem?.id === item.id;
              const isNew = !seenIds.has(item.id);
              return (
                <motion.div key={item.id} onClick={() => handleItemSelection(item)}
                  className={`p-4 rounded-xl border bg-white dark:bg-slate-900 cursor-pointer shadow-sm relative group transition-all duration-200 ${selected ? 'border-cyan-500 ring-1 ring-cyan-500/30 shadow-md translate-x-0.5' : 'border-slate-200 dark:border-slate-800 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700'}`}>
                  {/* Left accent bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl transition-all duration-200 ${selected ? 'bg-cyan-500' : 'bg-transparent group-hover:bg-slate-300 dark:group-hover:bg-slate-700'}`} />
                  {/* NEW dot */}
                  {isNew && <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-500" />}

                  <div className="flex justify-between items-center mb-2 gap-2">
                    <span className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 font-bold text-[9px] font-mono">{item.source}</span>
                    {getSentimentBadge(item.sentiment)}
                  </div>

                  <h3 className={`text-xs md:text-sm font-bold leading-snug mb-3 transition-colors ${selected ? 'text-cyan-700 dark:text-cyan-400' : 'text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                    {item.title}
                  </h3>

                  <div className="flex justify-between items-center text-[9px] font-mono font-medium text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.dateString}</span>
                    <span className="text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-2 py-0.5 rounded-full">{getTimeAgo(item.rawDate)}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── DETAIL PANEL ── */}
        <div className={`${selectedItem ? 'flex' : 'hidden'} lg:flex w-full absolute lg:relative top-0 left-0 h-full lg:w-[480px] xl:w-[560px] bg-white dark:bg-slate-900 flex-col z-20 shrink-0 border-l border-slate-200 dark:border-slate-800`}>

          {/* Read progress bar */}
          <div className="h-0.5 bg-slate-100 dark:bg-slate-800 shrink-0">
            <div className="h-full bg-cyan-500 transition-all duration-300 rounded-full" style={{ width: `${readProgress}%` }} />
          </div>

          {/* Detail toolbar */}
          <div className="px-3 py-2.5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0 bg-slate-50 dark:bg-slate-950">
            <button onClick={() => setSelectedItem(null)} className="flex items-center gap-1 text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase">
              ← BACK
            </button>
            <div className="flex items-center gap-1.5">
              {/* Bookmark */}
              <button onClick={() => selectedItem && toggleBookmark(selectedItem)}
                className={`flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-1 rounded border transition-all ${isBookmarked(selectedItem?.id) ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-300 dark:border-cyan-700 text-cyan-600 dark:text-cyan-400' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-cyan-300'}`}>
                {isBookmarked(selectedItem?.id) ? <BookmarkCheck className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                {isBookmarked(selectedItem?.id) ? 'SAVED' : 'SAVE'}
              </button>
              {/* Copy */}
              <button onClick={copyAnalysis}
                className={`flex items-center gap-1 text-[9px] font-mono font-bold px-2 py-1 rounded border transition-all ${copied ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 text-emerald-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'}`}>
                <Copy className="w-3 h-3" /> {copied ? 'COPIED!' : 'COPY'}
              </button>
              <button onClick={() => setTextSizeModifier(prev => Math.max(-2, prev - 1))} className="text-[10px] font-mono font-black border border-slate-200 dark:border-slate-800 px-2 py-1 rounded bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">A−</button>
              <button onClick={() => setTextSizeModifier(prev => Math.min(4, prev + 1))} className="text-[10px] font-mono font-black border border-slate-200 dark:border-slate-800 px-2 py-1 rounded bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">A+</button>
            </div>
          </div>

          <div ref={detailScrollRef} onScroll={handleDetailScroll} className="flex-1 p-5 custom-scroll overflow-y-auto">
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div key={selectedItem.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">

                  <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                    <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      {selectedItem.source} · {selectedItem.dateString} AT {selectedItem.timeString}
                    </p>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight tracking-tight" style={{ fontSize: `${20 + textSizeModifier}px` }}>
                      {selectedItem.title}
                    </h2>
                  </div>

                  {/* Voice button */}
                  <button onClick={toggleVoiceSummary}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${isSpeaking ? 'bg-cyan-500/10 border-cyan-400 dark:border-cyan-600' : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full transition-all ${isSpeaking ? 'bg-cyan-500 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                        {isSpeaking ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">Listen to AI Voice Summary</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">{isSpeaking ? 'Click to stop playback' : 'Text-to-speech synthesis'}</p>
                      </div>
                    </div>
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-cyan-500 animate-bounce' : 'text-slate-300 dark:text-slate-600'}`} />
                  </button>

                  {/* Key Takeaways */}
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                      <span className="text-amber-500">⚡</span>
                      <span className="text-[9px] font-black uppercase tracking-wider font-mono text-slate-700 dark:text-slate-300">KEY TAKEAWAYS</span>
                    </div>
                    <div className="p-4 space-y-2.5">
                      <div className="text-xs font-medium text-slate-900 dark:text-slate-100 flex items-start gap-2.5 leading-relaxed">
                        <span className="text-cyan-500 font-bold mt-0.5">✦</span>
                        <span>{selectedItem.title}</span>
                      </div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-start gap-2.5 leading-relaxed">
                        <span className="text-slate-300 dark:text-slate-600 mt-0.5">✦</span>
                        <span>Sourced from {selectedItem.source} via {activeCategory} intelligence index.</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div style={{ fontSize: `${13 + textSizeModifier}px` }} className="leading-relaxed space-y-0.5 transition-all">
                    {aiLoading ? (
                      <div className="p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-slate-200 dark:border-slate-700 border-t-cyan-500 rounded-full animate-spin" />
                        <p className="text-[9px] font-mono uppercase font-bold text-slate-400 tracking-widest">Parsing via {aiProvider}...</p>
                      </div>
                    ) : aiAnalysis ? (
                      <div className="pt-1">{renderPremiumSemanticContent(aiAnalysis)}</div>
                    ) : null}
                  </div>

                  {/* Ask AI */}
                  <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[9px] font-black tracking-widest uppercase font-mono text-slate-400 dark:text-slate-500">✦ Ask Intelligence AI</h4>
                      <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full p-0.5 gap-0.5">
                        {[['llama-cloud','Llama'],['gemini','Gemini'],['openai','GPT-4']].map(([val, lbl]) => (
                          <button key={val} onClick={() => changeProvider(val)}
                            className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full transition-all ${aiProvider === val ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                            {lbl}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input type="text" value={customQuery} onChange={(e) => setCustomQuery(e.target.value)}
                        placeholder="Ask anything about this article..."
                        className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        onKeyDown={(e) => e.key === 'Enter' && executeCustomAiQuery()} />
                      <button onClick={executeCustomAiQuery}
                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-3.5 rounded-lg text-xs font-bold hover:scale-105 transition-transform flex items-center justify-center">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <a href={selectedItem.link} target="_blank" rel="noopener noreferrer"
                    className="w-full py-3 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl font-black text-[10px] tracking-widest uppercase flex justify-center items-center gap-2 transition-all shadow-sm">
                    READ ORIGINAL SOURCE <ArrowUpRight className="w-4 h-4" />
                  </a>

                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                  <Target className="w-14 h-14 stroke-1 mb-4" />
                  <p className="text-xs font-mono text-center">Select an article to view AI analysis.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
