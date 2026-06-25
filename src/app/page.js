'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Add these to your existing imports
import { ..., ShieldAlert, Lock, Fingerprint } from 'lucide-react';
import { 
  RefreshCw, ArrowUpRight, Target, Cpu, Layers, DollarSign, ShoppingBag, Radio, 
  FileText, Search, Clock, Sun, Moon, Send, BrainCircuit, Calendar, TrendingUp, 
  TrendingDown, Minus, Menu, X, CheckCircle2, CreditCard, Plane, Building, 
  Activity, Flame, Globe, Film, HeartPulse, ChevronDown, Trophy, Play, Square, Volume2, Command, Hexagon, Landmark, Briefcase, 
  ShieldAlert, Lock, Fingerprint // Add these three
} from 'lucide-react';

const SIDEBAR_GROUPS = [

    {
    title: "Trending & Viral",
    categories: {
      "Trending Now (Breaking)": { icon: <Flame className="w-5 h-5" />, color: "bg-rose-500 text-white", desc: "Global breaking news and alerts" },
      "Viral Content & Buzz": { icon: <Activity className="w-5 h-5" />, color: "bg-pink-500 text-white", desc: "Social media trends & buzzworthy topics" },
      "Most Searched Topics": { icon: <Search className="w-5 h-5" />, color: "bg-indigo-500 text-white", desc: "Top queries across search engines" }
    }
  },
  {
    title: "Global Sports Arena",
    categories: {
      "Cricket World": { icon: <Trophy className="w-5 h-5" />, color: "bg-emerald-600 text-white", desc: "Live scores, match schedules, and player stats" },
      "Football & Transfers": { icon: <Activity className="w-5 h-5" />, color: "bg-blue-600 text-white", desc: "League standings, results, and transfer tickers" },
      "Basketball & NBA": { icon: <Flame className="w-5 h-5" />, color: "bg-orange-500 text-white", desc: "Tournament analysis, rankings, and records" },
      "Tennis & Racquet Sports": { icon: <Target className="w-5 h-5" />, color: "bg-lime-600 text-white", desc: "Grand Slam draws, rankings, and results" },
      "Combat Sports (MMA/Box)": { icon: <Layers className="w-5 h-5" />, color: "bg-red-700 text-white", desc: "UFC fight cards, division updates, and news" }
    }
  },

  {
    title: "Finance & Cards Hub",
    categories: {
      "Credit & Debit Cards": { icon: <CreditCard className="w-5 h-5" />, color: "bg-emerald-500 text-white", desc: "Bank offers, policies, and card launches" },
      "Rewards & Cashback Offers": { icon: <DollarSign className="w-5 h-5" />, color: "bg-amber-500 text-white", desc: "Points, fuel cards, and cashback deals" },
      "Travel & Forex Cards": { icon: <Plane className="w-5 h-5" />, color: "bg-cyan-500 text-white", desc: "International spending and forex rates" },
      "Business & Virtual Cards": { icon: <Building className="w-5 h-5" />, color: "bg-slate-700 text-white", desc: "Corporate expense & enterprise cards" },
      "World Money & Stocks": { icon: <TrendingUp className="w-5 h-5" />, color: "bg-teal-600 text-white", desc: "Global markets, shares, and IPOs" }
    }
  },
{
    title: "Core Intelligence",
    categories: {
      "SME & Corporate Expansion": { icon: <Target className="w-5 h-5" />, color: "bg-emerald-600 text-white", desc: "B2B Lead Gen: Facilities & Operations" },
      "AI & Neural Tech": { icon: <Cpu className="w-5 h-5" />, color: "bg-blue-600 text-white", desc: "Latest artificial intelligence software" },
      "Cybersecurity & Threats": { icon: <ShieldAlert className="w-5 h-5" />, color: "bg-red-600 text-white", desc: "Threat intel, vulnerabilities & defense" },
      "Data Privacy & Compliance": { icon: <Lock className="w-5 h-5" />, color: "bg-amber-600 text-white", desc: "Regulatory standards & privacy protocols" },
      "Digital Identity": { icon: <Fingerprint className="w-5 h-5" />, color: "bg-indigo-600 text-white", desc: "Auth systems, biometrics & KYC" },
      "Ads Creatives & Meta": { icon: <Radio className="w-5 h-5" />, color: "bg-purple-600 text-white", desc: "Marketing and platform algorithms" },
      "Tech Innovations": { icon: <Layers className="w-5 h-5" />, color: "bg-slate-800 text-white", desc: "Hardware and enterprise technology" }
    }
  },
  {
    title: "Everyday Essentials",
    categories: {
      "E-commerce & Retail": { icon: <ShoppingBag className="w-5 h-5" />, color: "bg-orange-500 text-white", desc: "Online shopping & retail industry" },
      "Real Estate & Property": { icon: <Building className="w-5 h-5" />, color: "bg-blue-500 text-white", desc: "Housing, commercial, and property markets" },
      "Health & Lifestyle": { icon: <HeartPulse className="w-5 h-5" />, color: "bg-rose-400 text-white", desc: "Wellness, fitness, and living" },
      "Global Entertainment": { icon: <Film className="w-5 h-5" />, color: "bg-purple-500 text-white", desc: "Movies, sports, and celebrity culture" }
    }
  }
];

const MohitIntelligenceLogo = ({ animated = false }) => {
  return (
    <div className="relative flex items-center justify-center w-12 h-12 shrink-0 mr-2">
      <motion.div
        className="absolute inset-0 bg-cyan-500 rounded-full opacity-20 blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl z-10">
        <motion.path d="M20 80V30L50 55L80 30V80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} 
          animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
        <motion.circle cx="50" cy="55" r="6.5" fill="#06b6d4" 
          initial={animated ? { scale: 0 } : { scale: 1 }} animate={{ scale: 1 }} 
          transition={{ delay: animated ? 1.5 : 0, type: "spring", stiffness: 200, damping: 10 }} className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        <motion.path d="M50 55V85" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" 
          initial={animated ? { pathLength: 0 } : { pathLength: 1 }} animate={{ pathLength: 1 }} 
          transition={{ delay: animated ? 1.8 : 0, duration: 0.8, ease: "easeOut" }} className="drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
      </svg>
    </div>
  );
};

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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [data, setData] = useState({});
  const [tickerData, setTickerData] = useState([]);
  
  const [activeCategory, setActiveCategory] = useState("Cricket World");
  const [expandedGroups, setExpandedGroups] = useState({ "Global Sports Arena": true, "Trending & Viral": false });
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSyncing, setIsSyncing] = useState(true);
  const [lastSync, setLastSync] = useState('--:--:--');
  const [toastMsg, setToastMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scratchpad, setScratchpad] = useState("");
  
  const [analysisCache, setAnalysisCache] = useState({});
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState("");
  
  // ⚡ Default set to OpenRouter Llama Cloud!
  const [aiProvider, setAiProvider] = useState("llama-cloud");
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [customQuery, setCustomQuery] = useState("");
  const [textSizeModifier, setTextSizeModifier] = useState(0); 
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const [time, setTime] = useState({ ahmedabad: '', ny: '', lon: '' });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') setCmdPaletteOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const splashTimer = setTimeout(() => setIsIntroPlaying(false), 2400);
    const savedNotes = localStorage.getItem("mohit_scratchpad");
    if (savedNotes) setScratchpad(savedNotes);

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

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [selectedItem]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const pullRealtimeFeeds = async (isManual = true) => {
    setIsSyncing(true);
    try {
      const response = await fetch(`/api/stream?t=${Date.now()}&hash=${Math.random()}`, { 
        cache: 'no-store', headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });
      const freshData = await response.json();
      
      setData(freshData.feeds);
      setTickerData(freshData.ticker);
      setLastSync(new Date().toLocaleTimeString());
      
      if (isManual) showToast("Live radar synced & verified.");
      if (freshData.feeds[activeCategory]?.length > 0 && !selectedItem) {
        handleItemSelection(freshData.feeds[activeCategory][0]);
      }
    } catch (err) {
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

    setAiAnalysis("");
    setAiLoading(true);
    if (window.innerWidth < 1024) setMobileMenuOpen(false);

    try {
      const chatRes = await fetch('/api/chat', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: item.title, source: item.source, provider: forceProvider })
      });
      const chatData = await chatRes.json();
      
      if (chatData.error) {
        setAiAnalysis(`❌ [API CONNECTION FAILED]:\n${chatData.error}`);
      } else {
        setAiAnalysis(chatData.response);
        setAnalysisCache(prev => ({ ...prev, [cacheKey]: chatData.response }));
      }
    } catch (err) {
      setAiAnalysis(`❌ [NETWORK ERROR]: Failed to contact backend server.`);
    } finally {
      setAiLoading(false);
    }
  };

  const executeCustomAiQuery = async () => {
    if (!customQuery.trim() || !selectedItem) return;
    setAiLoading(true);
    setAiAnalysis("");
    try {
      const chatRes = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: selectedItem.title, source: selectedItem.source, customPrompt: customQuery, provider: aiProvider })
      });
      const chatData = await chatRes.json();
      
      if (chatData.error) {
         setAiAnalysis(`❌ [ERROR]: ${chatData.error}`);
      } else {
         setAiAnalysis(chatData.response);
      }
    } catch (err) {
      setAiAnalysis("❌ [NETWORK ERROR]: Failed to process custom query.");
    } finally {
      setAiLoading(false);
      setCustomQuery("");
    }
  };

  const toggleVoiceSummary = () => {
    if (!window.speechSynthesis || !selectedItem) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const cleanTextForAudio = aiAnalysis.replace(/[■✦*]/g, '');
      const speechText = `${selectedItem.title}. Key analysis insights state: ${cleanTextForAudio || 'Awaiting dynamic synthesis parameters.'}`;
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const changeProvider = (newProvider) => {
    setAiProvider(newProvider);
    if (selectedItem) {
      handleItemSelection(selectedItem, newProvider); 
    }
  };

  const toggleGroup = (groupName) => setExpandedGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));

  const getSentimentBadge = (sentiment) => {
    if (sentiment === 'BULLISH') return <span className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[9px] font-bold"><TrendingUp className="w-3 h-3"/> BULLISH</span>;
    if (sentiment === 'BEARISH') return <span className="flex items-center gap-1 text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded text-[9px] font-bold"><TrendingDown className="w-3 h-3"/> BEARISH</span>;
    return <span className="flex items-center gap-1 text-slate-400 bg-slate-400/10 px-1.5 py-0.5 rounded text-[9px] font-bold"><Minus className="w-3 h-3"/> NEUTRAL</span>;
  };

  const renderPremiumSemanticContent = (rawText) => {
    if (!rawText) return null;
    return rawText.split('\n').map((line, idx) => {
      const cleanLine = line.trim();
      if (cleanLine.startsWith('■')) {
        return (
          <h3 key={idx} className="text-xs font-black tracking-widest text-slate-900 dark:text-cyan-400 uppercase mt-6 mb-2 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-1 font-mono">
            <span>■</span> {cleanLine.replace('■', '').trim()}
          </h3>
        );
      }
      if (cleanLine.startsWith('✦')) {
        return (
          <div key={idx} className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-start gap-3 pl-1 py-1 leading-relaxed">
            <span className="text-cyan-500 font-bold mt-0.5">✦</span>
            <span>{cleanLine.replace('✦', '').trim()}</span>
          </div>
        );
      }
      return cleanLine ? (
        <p key={idx} className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-normal pl-4 mb-3">
          {cleanLine}
        </p>
      ) : <div key={idx} className="h-2" />;
    });
  };

  let activeCatData = { icon: <Globe className="w-5 h-5"/>, color: "bg-slate-500 text-white" };
  SIDEBAR_GROUPS.forEach(group => { if (group.categories[activeCategory]) activeCatData = group.categories[activeCategory]; });

  const displayData = data[activeCategory]?.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.source.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="luxury-grid h-screen w-full flex flex-col font-sans transition-colors duration-300 selection:bg-cyan-500 selection:text-white relative">
      
      <AnimatePresence>
        {cmdPaletteOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setCmdPaletteOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.96, y: -10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: -10 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5 bg-slate-50 dark:bg-slate-950/40">
                <Command className="w-4 h-4 text-cyan-500" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Type a matrix category to switch layout streams..."
                  value={cmdSearch}
                  onChange={(e) => setCmdSearch(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-slate-500">ESC</kbd>
              </div>
              <div className="max-h-60 overflow-y-auto p-2 custom-scroll space-y-0.5">
                {SIDEBAR_GROUPS.flatMap(g => Object.keys(g.categories))
                  .filter(cat => cat.toLowerCase().includes(cmdSearch.toLowerCase()))
                  .map(cat => (
                    <button 
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setSelectedItem(null); setCmdPaletteOpen(false); setCmdSearch(""); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold font-mono transition-colors flex items-center justify-between ${activeCategory === cat ? 'bg-cyan-500 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'}`}
                    >
                      <span>{cat}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isIntroPlaying && (
          <motion.div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center text-white" exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: "easeInOut" } }}>
            <div className="flex flex-col items-center gap-6">
              <MohitIntelligenceLogo animated={true} />
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="text-center">
                <h2 className="text-xl font-black tracking-[0.3em] text-slate-100 uppercase">MOHIT SAHIJA</h2>
                <p className="text-[10px] font-mono tracking-[0.5em] text-cyan-400 uppercase mt-2">AI-DRIVEN MACRO ANALYTICS ENGINE</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast message={toastMsg} isVisible={toastMsg !== ""} />

      <div className="ticker-wrap h-8 flex items-center border-b border-slate-200/80 dark:border-slate-800 bg-slate-900 text-[11px] font-mono font-bold text-slate-300 shrink-0">
        <div className="ticker-move">
          {[...Array(3)].map((_, loopIdx) => (
            <span key={loopIdx}>
              {tickerData.length > 0 ? (
                tickerData.map((stock, idx) => (
                  <span key={`${loopIdx}-${idx}`} className={`mx-6 ${stock.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stock.isUp ? '▲' : '▼'} {stock.name} {stock.price} ({stock.percent}%)
                  </span>
                ))
              ) : <span className="mx-6 text-slate-400">CONNECTING REAL-TIME GLOBAL MARKET CHANNELS...</span>}
            </span>
          ))}
        </div>
      </div>

     <header className="bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 py-2.5 flex justify-between items-center backdrop-blur-xl z-20 shrink-0 shadow-sm sticky top-0">
        <div className="flex items-center gap-3 md:gap-4">
          <button className="lg:hidden text-slate-700 dark:text-slate-300 hover:text-cyan-500 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="scale-75 origin-left -my-2 flex items-center">
            <MohitIntelligenceLogo animated={false} />
          </div>
          
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-lg md:text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
              MOHIT'S INTELLIGENCE
            </h1>
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 hidden sm:inline uppercase">
              INSIGHTS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <button 
            onClick={() => setCmdPaletteOpen(true)}
            className="hidden xl:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-2.5 py-1.5 rounded-md text-[10px] font-mono font-bold text-slate-400 border border-slate-200 dark:border-slate-800 shadow-inner hover:text-cyan-500 transition-colors"
          >
            <Command className="w-3 h-3 text-cyan-500" />
            <span>PRESS CMD+K</span>
          </button>

          <div className="hidden lg:flex items-center gap-4 text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 pr-5">
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-slate-400"/> IND: {time.ahmedabad}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-slate-400"/> NY: {time.ny}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-slate-400"/> LON: {time.lon}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all border border-slate-200 dark:border-slate-800">
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button onClick={() => pullRealtimeFeeds(true)} disabled={isSyncing} className="px-3 md:px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-[9px] tracking-widest uppercase rounded-md transition-all flex items-center gap-2 shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 active:scale-95">
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-400 dark:text-cyan-600' : ''}`} />
              <span className="hidden sm:inline">{isSyncing ? 'SYNCING' : 'REFRESH'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 absolute lg:relative top-0 left-0 h-full w-[340px] bg-white dark:bg-slate-900/95 border-r border-slate-200 dark:border-slate-800 flex flex-col z-30 shrink-0 transition-transform duration-300 ease-in-out`}>
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unified Search Matrices</h3>
          </div>
          
          <div className="flex-1 custom-scroll overflow-y-auto p-3 space-y-4">
            {SIDEBAR_GROUPS.map((group, groupIdx) => (
              <div key={groupIdx} className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/30 overflow-hidden">
                <button onClick={() => toggleGroup(group.title)} className="w-full flex justify-between items-center p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                  <span className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-widest">{group.title}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${expandedGroups[group.title] ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {expandedGroups[group.title] && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-2 pb-2 space-y-1">
                        {Object.entries(group.categories).map(([catName, catData]) => (
                          <button
                            key={catName}
                            onClick={() => { setActiveCategory(catName); setSelectedItem(null); setSearchQuery(""); if(window.innerWidth < 1024) setMobileMenuOpen(false); }}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-all ${activeCategory === catName ? 'bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700' : 'hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent'}`}
                          >
                            <span className={`p-1.5 rounded-md mt-0.5 shrink-0 ${activeCategory === catName ? catData.color : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                              {catData.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className={`text-xs font-bold truncate ${activeCategory === catName ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{catName}</div>
                              <div className="text-[9px] font-medium text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">{catData.desc}</div>
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

        <div className="flex-1 border-r border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40 flex flex-col min-w-0 lg:min-w-[400px]">
          <div className="px-4 md:px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <span className={`p-2 rounded-md ${activeCatData.color}`}>{activeCatData.icon}</span>
              <h2 className="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase font-mono">{activeCategory}</h2>
            </div>
            
            <div className="relative w-full md:w-auto">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
              <input type="text" placeholder="Filter nodes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-56 pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors" />
            </div>
          </div>

          <div className="flex-1 p-4 custom-scroll overflow-y-auto space-y-3 relative">
            {isSyncing && !data[activeCategory] ? (
              [...Array(6)].map((_, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-sm">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 shimmer-bg" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2 shimmer-bg" />
                </div>
              ))
            ) : displayData.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60 pt-10">
                <Target className="w-10 h-10 mb-3 stroke-1" />
                <p className="text-xs font-mono">No telemetry blocks found for this segment.</p>
                <p className="text-[10px] text-slate-500 mt-2">Try refreshing the data stream.</p>
              </div>
            ) : (
              displayData.map((item) => (
                <motion.div key={item.id} layoutId={`card-${item.id}`} onClick={() => handleItemSelection(item)}
                  className={`p-4 rounded-xl border bg-white dark:bg-slate-900 transition-all duration-200 cursor-pointer shadow-sm relative group ${selectedItem?.id === item.id ? 'border-slate-900 dark:border-white ring-1 ring-slate-900 dark:ring-white shadow-md' : 'border-slate-200 dark:border-slate-800 hover:-translate-y-0.5 hover:shadow-md'}`}>
                  
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <span className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400 font-bold text-[9px] font-mono">{item.source}</span>
                    {getSentimentBadge(item.sentiment)}
                  </div>
                  
                  <h3 className="text-xs md:text-sm font-bold leading-snug text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-cyan-400 mb-3 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex justify-between items-center text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.dateString}</span>
                    <span className="text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 px-2 py-0.5 rounded-full">{getTimeAgo(item.rawDate)}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className={`${selectedItem ? 'flex' : 'hidden'} lg:flex w-full absolute lg:relative top-0 left-0 h-full lg:w-[480px] xl:w-[580px] bg-white dark:bg-slate-900 flex-col z-20 shrink-0 border-l border-slate-200 dark:border-slate-800`}>
          
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0 bg-slate-50 dark:bg-slate-950">
            <button onClick={() => setSelectedItem(null)} className="flex items-center gap-1 text-[10px] font-mono font-bold tracking-tight text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase">
              ← Back To Front Page
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => setTextSizeModifier(prev => Math.max(-2, prev - 1))} className="text-xs font-mono font-black border border-slate-200 dark:border-slate-800 px-2 py-1 rounded bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100">A-</button>
              <button onClick={() => setTextSizeModifier(prev => Math.min(4, prev + 1))} className="text-xs font-mono font-black border border-slate-200 dark:border-slate-800 px-2 py-1 rounded bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100">A+</button>
            </div>
          </div>

          <div className="flex-1 p-6 custom-scroll overflow-y-auto">
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div key={selectedItem.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                  
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {selectedItem.source} • STAFF REPORTER • {selectedItem.dateString} AT {selectedItem.timeString}
                    </p>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight mt-2 tracking-tight">
                      {selectedItem.title}
                    </h2>
                  </div>

                  <button 
                    onClick={toggleVoiceSummary}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${isSpeaking ? 'bg-cyan-500/10 border-cyan-400 text-cyan-600' : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${isSpeaking ? 'bg-cyan-500 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-800'}`}>
                        {isSpeaking ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold font-mono">Listen to Takeaways (AI Voice)</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{isSpeaking ? 'Click to interrupt processing...' : 'Synthesize speech ledger stream'}</p>
                      </div>
                    </div>
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-cyan-500 animate-bounce' : 'text-slate-400'}`} />
                  </button>

                  <div className="border border-slate-900 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 overflow-hidden shadow-sm">
                    <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        ⚡ Key Takeaways
                      </span>
                    </div>
                    <div className="p-4 bg-slate-50/50 dark:bg-slate-950/20">
                      <ul className="space-y-2.5">
                        <li className="text-xs font-medium text-slate-900 dark:text-slate-100 flex items-start gap-2.5 leading-relaxed">
                          <span className="text-slate-900 dark:text-white mt-1">✦</span>
                          <span>{selectedItem.title}</span>
                        </li>
                        <li className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-start gap-2.5 leading-relaxed">
                          <span className="text-slate-400 mt-1">✦</span>
                          <span>Global operations update extracted cleanly via live feed routing channels under the {activeCategory} sector mapping index.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div 
                    style={{ fontSize: `${13 + textSizeModifier}px` }}
                    className="font-sans leading-relaxed tracking-normal space-y-1 font-medium transition-all"
                  >
                    {aiLoading ? (
                      <div className="p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin text-cyan-500" />
                        <p className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">Parsing Deep Analytics via {aiProvider}...</p>
                      </div>
                    ) : aiAnalysis ? (
                      <div className="pt-2">
                        {renderPremiumSemanticContent(aiAnalysis)}
                      </div>
                    ) : null}
                  </div>

                  <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black tracking-widest uppercase font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        ✦ Ask Mohit's Intelligence AI
                      </h4>
                      <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-0.5">
                        <button onClick={() => changeProvider('llama-cloud')} className={`px-2 py-0.5 text-[9px] font-bold rounded transition-colors ${aiProvider === 'llama-cloud' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-600'}`}>Llama 3</button>
                        <button onClick={() => changeProvider('gemini')} className={`px-2 py-0.5 text-[9px] font-bold rounded transition-colors ${aiProvider === 'gemini' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-600'}`}>Gemini</button>
                        <button onClick={() => changeProvider('openai')} className={`px-2 py-0.5 text-[9px] font-bold rounded transition-colors ${aiProvider === 'openai' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-600'}`}>OpenAI</button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={customQuery} 
                        onChange={(e) => setCustomQuery(e.target.value)} 
                        placeholder="Query dataset parameters or request targeted summaries..."
                        className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        onKeyDown={(e) => e.key === 'Enter' && executeCustomAiQuery()} 
                      />
                      <button 
                        onClick={executeCustomAiQuery} 
                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-3.5 rounded-lg text-xs font-bold hover:scale-105 transition-transform"
                      >
                        <Send className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                  </div>

                  <a 
                    href={selectedItem.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full py-3 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-lg font-bold text-xs tracking-wider uppercase flex justify-center items-center gap-2 transition-all shadow-md text-center"
                  >
                    Read Original Source <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                  <Target className="w-16 h-16 stroke-1 mb-4" />
                  <p className="text-xs font-mono">Select a target stream node to parse comprehensive dossier models.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
