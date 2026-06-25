'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, ArrowUpRight, Target, Cpu, Layers, DollarSign, ShoppingBag, Radio, 
  FileText, Search, Clock, Sun, Moon, Send, BrainCircuit, Calendar, TrendingUp, 
  TrendingDown, Minus, Menu, X, CheckCircle2, CreditCard, Plane, Building, 
  Activity, Flame, Globe, Film, HeartPulse, ChevronDown, Trophy, Play, Square, Volume2, Command, Hexagon, Landmark, Briefcase, ShieldAlert, Lock, Fingerprint
} from 'lucide-react';

const SIDEBAR_GROUPS = [
  {
    title: "Global Sports Arena",
    categories: {
      "Cricket World": { icon: <Trophy className="w-4 h-4" />, color: "bg-emerald-600 text-white", desc: "Live match telemetry & player form" },
      "Football & Transfers": { icon: <Activity className="w-4 h-4" />, color: "bg-blue-600 text-white", desc: "Global league standings & transfers" },
      "Basketball & NBA": { icon: <Flame className="w-4 h-4" />, color: "bg-orange-500 text-white", desc: "Tournament analysis & records" },
      "Tennis & Racquet Sports": { icon: <Target className="w-4 h-4" />, color: "bg-lime-600 text-white", desc: "Grand Slam draws & ATP/WTA rankings" },
      "Combat Sports (MMA/Box)": { icon: <Layers className="w-4 h-4" />, color: "bg-red-700 text-white", desc: "UFC fight cards & sentiment" }
    }
  },
  {
    title: "Trending & Viral",
    categories: {
      "Trending Now (Breaking)": { icon: <Flame className="w-4 h-4" />, color: "bg-rose-500 text-white", desc: "Global breaking news alerts" },
      "Viral Content & Buzz": { icon: <Activity className="w-4 h-4" />, color: "bg-pink-500 text-white", desc: "Social media trends & buzz" },
      "Most Searched Topics": { icon: <Search className="w-4 h-4" />, color: "bg-indigo-500 text-white", desc: "Top queries across search engines" }
    }
  },
  {
    title: "Finance & Cards Hub",
    categories: {
      "Credit & Debit Cards": { icon: <CreditCard className="w-4 h-4" />, color: "bg-emerald-500 text-white", desc: "Bank policies & card launches" },
      "Rewards & Cashback": { icon: <DollarSign className="w-4 h-4" />, color: "bg-amber-500 text-white", desc: "Points, fuel & cashback deals" },
      "Travel & Forex": { icon: <Plane className="w-4 h-4" />, color: "bg-cyan-500 text-white", desc: "International spending & forex" },
      "World Money & Stocks": { icon: <TrendingUp className="w-4 h-4" />, color: "bg-teal-600 text-white", desc: "Global markets & IPOs" }
    }
  },
  {
    title: "Core Intelligence",
    categories: {
      "SME & Corporate Expansion": { icon: <Target className="w-4 h-4" />, color: "bg-emerald-600 text-white", desc: "B2B Lead Gen & facility ops" },
      "AI & Neural Networks": { icon: <Cpu className="w-4 h-4" />, color: "bg-blue-600 text-white", desc: "LLM breakthroughs & software" },
      "Cybersecurity & Threats": { icon: <ShieldAlert className="w-4 h-4" />, color: "bg-red-600 text-white", desc: "Threat intel & vulnerability defense" },
      "Data Privacy & Compliance": { icon: <Lock className="w-4 h-4" />, color: "bg-amber-600 text-white", desc: "Regulatory standards & protocols" },
      "Digital Identity": { icon: <Fingerprint className="w-4 h-4" />, color: "bg-indigo-600 text-white", desc: "Auth systems & biometrics" },
      "Ads Creatives & Meta": { icon: <Radio className="w-4 h-4" />, color: "bg-purple-600 text-white", desc: "Marketing platform algorithms" }
    }
  },
  {
    title: "Everyday Essentials",
    categories: {
      "E-commerce & Retail": { icon: <ShoppingBag className="w-4 h-4" />, color: "bg-orange-500 text-white", desc: "Online shopping & retail" },
      "Real Estate & Property": { icon: <Building className="w-4 h-4" />, color: "bg-blue-500 text-white", desc: "Housing & commercial markets" },
      "Health & Lifestyle": { icon: <HeartPulse className="w-4 h-4" />, color: "bg-rose-400 text-white", desc: "Wellness & fitness trends" },
      "Global Entertainment": { icon: <Film className="w-4 h-4" />, color: "bg-purple-500 text-white", desc: "Media, box office & celebrity" }
    }
  }
];

const EchelonLogo = ({ animated = false }) => (
  <div className="relative flex items-center justify-center w-10 h-10 shrink-0 mr-2">
    <motion.div className="absolute inset-0 bg-cyan-500 rounded-full opacity-20 blur-xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl z-10">
      <motion.path d="M20 80V30L50 55L80 30V80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
      <motion.circle cx="50" cy="55" r="6.5" fill="#06b6d4" 
        initial={animated ? { scale: 0 } : { scale: 1 }} animate={{ scale: 1 }} transition={{ delay: animated ? 1.5 : 0, type: "spring", stiffness: 200 }} className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
      <motion.path d="M50 55V85" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" 
        initial={animated ? { pathLength: 0 } : { pathLength: 1 }} animate={{ pathLength: 1 }} transition={{ delay: animated ? 1.8 : 0, duration: 0.8 }} className="drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
    </svg>
  </div>
);

const MiniSparkline = ({ trend }) => {
  const color = trend === 'BULLISH' ? 'stroke-emerald-500' : trend === 'BEARISH' ? 'stroke-rose-500' : 'stroke-slate-500';
  const path = trend === 'BULLISH' ? "M0 10 L5 6 L10 8 L20 2" : trend === 'BEARISH' ? "M0 2 L5 6 L10 4 L20 10" : "M0 5 L5 4 L10 6 L20 5";
  return (
    <svg width="24" height="12" viewBox="0 0 20 12" fill="none" className="mr-1">
      <path d={path} className={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
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
  const [expandedGroups, setExpandedGroups] = useState({ "Sports & Performance Telemetry": true, "Global Markets & Equities": true });
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSyncing, setIsSyncing] = useState(true);
  const [lastSync, setLastSync] = useState('--:--:--');
  const [toastMsg, setToastMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [analysisCache, setAnalysisCache] = useState({});
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState("");
  
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
    root.classList.add('dark');
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

  // ⚡ UPGRADED: Lightning Fast Streaming Implementation
  const handleItemSelection = async (item, forceProvider = aiProvider) => {
    setSelectedItem(item);
    const cacheKey = `${item.id}-${forceProvider}`;

    // INSTANT LOAD IF CACHED
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
      const response = await fetch('/api/chat', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: item.title, source: item.source, provider: forceProvider })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setAiAnalysis(`❌ [API ERROR]: ${errorData.error || response.statusText}`);
        setAiLoading(false);
        return;
      }

      setAiLoading(false); // Stop loader the millisecond the stream connects!

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setAiAnalysis(fullText); // Typewriter effect live to UI
      }

      setAnalysisCache(prev => ({ ...prev, [cacheKey]: fullText })); // Cache for later

    } catch (err) {
      setAiAnalysis(`❌ [NETWORK ERROR]: Failed to establish neural stream.`);
      setAiLoading(false);
    }
  };

  // ⚡ UPGRADED: Streaming for Custom Query Box
  const executeCustomAiQuery = async () => {
    if (!customQuery.trim() || !selectedItem) return;
    setAiLoading(true);
    setAiAnalysis("");
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline: selectedItem.title, source: selectedItem.source, customPrompt: customQuery, provider: aiProvider })
      });

      if (!response.ok) throw new Error("Connection failed");
      
      setAiLoading(false);
      setCustomQuery("");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setAiAnalysis(fullText);
      }
    } catch (err) {
      setAiAnalysis("❌ [NETWORK ERROR]: Failed to process custom query stream.");
      setAiLoading(false);
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
    if (sentiment === 'BULLISH') return <span className="flex items-center text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest"><MiniSparkline trend="BULLISH"/> LONG</span>;
    if (sentiment === 'BEARISH') return <span className="flex items-center text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest"><MiniSparkline trend="BEARISH"/> SHORT</span>;
    return <span className="flex items-center text-slate-400 bg-slate-400/10 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest"><MiniSparkline trend="NEUTRAL"/> HOLD</span>;
  };

  const sanitizeTitle = (title) => {
    if (!title) return "";
    return title.replace(/\|.*Live.*(Match|Commentary|Score).*$/i, '')
                .replace(/\([a-zA-Z0-9]{8,15}\)/g, '')
                .trim();
  };

  const renderPremiumSemanticContent = (rawText) => {
    if (!rawText) return null;
    return rawText.split('\n').map((line, idx) => {
      const cleanLine = line.trim();
      
      if (cleanLine.includes('■ THE EDGE') || cleanLine.includes('■ ACTIONABLE')) {
        return (
          <h3 key={idx} className="text-xs font-black tracking-widest text-cyan-400 uppercase mt-8 mb-2 flex items-center gap-2 font-mono">
            <Zap className="w-4 h-4" /> THE EDGE (PREDICTIVE IMPLICATION)
          </h3>
        );
      }
      
      if (cleanLine.startsWith('■')) {
        return (
          <h3 key={idx} className="text-xs font-black tracking-widest text-slate-100 uppercase mt-6 mb-2 flex items-center gap-2 border-b border-slate-800 pb-1 font-mono">
            <span className="text-cyan-500">■</span> {cleanLine.replace('■', '').trim()}
          </h3>
        );
      }
      
      if (cleanLine.startsWith('✦')) {
        return (
          <div key={idx} className="text-sm font-medium text-slate-300 flex items-start gap-3 pl-1 py-1.5 leading-relaxed font-sans">
            <span className="text-cyan-500 font-bold mt-0.5">✦</span>
            <span>{cleanLine.replace('✦', '').trim()}</span>
          </div>
        );
      }
      
      if (idx > 0 && (rawText.split('\n')[idx-1] || '').includes('■ THE EDGE') && cleanLine) {
        return (
          <div key={idx} className="p-4 mt-2 rounded-lg bg-gradient-to-br from-cyan-900/30 to-blue-900/10 border border-cyan-500/30 text-sm leading-relaxed text-cyan-50 font-medium shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            {cleanLine}
          </div>
        )
      }

      return cleanLine ? (
        <p key={idx} className="text-sm leading-relaxed text-slate-400 font-sans pl-4 mb-3">
          {cleanLine}
        </p>
      ) : <div key={idx} className="h-2" />;
    });
  };

  let activeCatData = { icon: <Globe className="w-4 h-4"/>, color: "bg-slate-500 text-white" };
  SIDEBAR_GROUPS.forEach(group => { if (group.categories[activeCategory]) activeCatData = group.categories[activeCategory]; });

  const displayData = data[activeCategory]?.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.source.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="bg-[#050505] h-screen w-full flex flex-col transition-colors duration-300 selection:bg-cyan-500 selection:text-white relative font-sans overflow-hidden">
      
      <AnimatePresence>
        {cmdPaletteOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setCmdPaletteOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.96, y: -10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: -10 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3.5 border-b border-slate-800 flex items-center gap-2.5 bg-slate-950/40">
                <Command className="w-4 h-4 text-cyan-500" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Query unified data streams..."
                  value={cmdSearch}
                  onChange={(e) => setCmdSearch(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
                />
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">ESC</kbd>
              </div>
              <div className="max-h-60 overflow-y-auto p-2 custom-scroll space-y-0.5">
                {SIDEBAR_GROUPS.flatMap(g => Object.keys(g.categories))
                  .filter(cat => cat.toLowerCase().includes(cmdSearch.toLowerCase()))
                  .map(cat => (
                    <button 
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setSelectedItem(null); setCmdPaletteOpen(false); setCmdSearch(""); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold font-mono transition-colors flex items-center justify-between ${activeCategory === cat ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
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
          <motion.div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center text-white" exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}>
            <div className="flex flex-col items-center gap-6">
              <EchelonLogo animated={true} />
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="text-center">
                <h2 className="text-2xl font-black tracking-[0.4em] text-white uppercase font-sans">ECHELON TERMINAL</h2>
                <p className="text-[10px] font-mono tracking-[0.5em] text-cyan-500 uppercase mt-3">NEURAL SYNTHESIS & LIVE TELEMETRY</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast message={toastMsg} isVisible={toastMsg !== ""} />

      <div className="ticker-wrap h-8 flex items-center border-b border-slate-800 bg-[#0a0a0a] text-[11px] font-mono font-bold text-slate-300 shrink-0">
        <div className="ticker-move">
          {[...Array(3)].map((_, loopIdx) => (
            <span key={loopIdx}>
              {tickerData.length > 0 ? (
                tickerData.map((stock, idx) => (
                  <span key={`${loopIdx}-${idx}`} className={`mx-6 ${stock.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {stock.isUp ? '▲' : '▼'} {stock.name} {stock.price} ({stock.percent}%)
                  </span>
                ))
              ) : <span className="mx-6 text-slate-500">ESTABLISHING CONNECTION TO GLOBAL EXCHANGES...</span>}
            </span>
          ))}
        </div>
      </div>

     <header className="bg-[#0a0a0a]/95 border-b border-slate-800 px-4 md:px-6 py-3 flex justify-between items-center backdrop-blur-xl z-20 shrink-0 shadow-sm sticky top-0">
        <div className="flex items-center gap-3 md:gap-5">
          <button className="lg:hidden text-slate-300 hover:text-cyan-400 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="scale-75 origin-left -my-2 flex items-center">
            <EchelonLogo animated={false} />
          </div>
          
          <div className="flex items-baseline gap-3">
            <h1 className="text-lg md:text-xl font-black tracking-[0.1em] text-white uppercase">
              ECHELON
            </h1>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-cyan-500 hidden sm:inline uppercase font-mono">
              TERMINAL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => setCmdPaletteOpen(true)}
            className="hidden xl:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded text-[10px] font-mono font-bold text-slate-400 border border-slate-800 hover:text-cyan-400 hover:border-cyan-900 transition-colors"
          >
            <Command className="w-3 h-3 text-cyan-500" />
            <span>CMD+K</span>
          </button>

          <div className="hidden lg:flex items-center gap-5 text-[10px] font-mono font-bold text-slate-400 border-r border-slate-800 pr-6">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-600"/> IND: {time.ahmedabad}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-600"/> NY: {time.ny}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-600"/> LON: {time.lon}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={() => pullRealtimeFeeds(true)} disabled={isSyncing} className="px-4 py-2 bg-cyan-600/10 text-cyan-400 border border-cyan-500/30 font-black text-[10px] font-mono tracking-widest uppercase rounded transition-all flex items-center gap-2 hover:bg-cyan-500 hover:text-white active:scale-95">
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isSyncing ? 'SYNCING...' : 'LIVE SYNC'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 absolute lg:relative top-0 left-0 h-full w-[320px] bg-[#0a0a0a] border-r border-slate-800 flex flex-col z-30 shrink-0 transition-transform duration-300 ease-in-out`}>
          <div className="p-4 border-b border-slate-800 flex justify-between items-center shrink-0">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Macro Data Vectors</h3>
          </div>
          
          <div className="flex-1 custom-scroll overflow-y-auto p-3 space-y-3">
            {SIDEBAR_GROUPS.map((group, groupIdx) => (
              <div key={groupIdx} className="border border-slate-800/60 rounded-xl bg-[#0d0d0d] overflow-hidden">
                <button onClick={() => toggleGroup(group.title)} className="w-full flex justify-between items-center p-3.5 text-left hover:bg-slate-900 transition-colors">
                  <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest font-mono">{group.title}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${expandedGroups[group.title] ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {expandedGroups[group.title] && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-2 pb-2 space-y-0.5">
                        {Object.entries(group.categories).map(([catName, catData]) => (
                          <button
                            key={catName}
                            onClick={() => { setActiveCategory(catName); setSelectedItem(null); setSearchQuery(""); if(window.innerWidth < 1024) setMobileMenuOpen(false); }}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all ${activeCategory === catName ? 'bg-slate-800 shadow-inner border border-slate-700' : 'hover:bg-slate-900 border border-transparent'}`}
                          >
                            <span className={`p-1.5 rounded shrink-0 ${activeCategory === catName ? catData.color : 'bg-slate-900 text-slate-500'}`}>
                              {catData.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className={`text-xs font-bold truncate tracking-wide ${activeCategory === catName ? 'text-white' : 'text-slate-400'}`}>{catName}</div>
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

        <div className="flex-1 border-r border-slate-800 bg-[#050505] flex flex-col min-w-0 lg:min-w-[400px]">
          <div className="px-4 md:px-6 py-4 border-b border-slate-800 bg-[#0a0a0a] flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <span className={`p-2 rounded ${activeCatData.color}`}>{activeCatData.icon}</span>
              <h2 className="text-sm font-black tracking-widest text-white uppercase font-mono">{activeCategory}</h2>
            </div>
            
            <div className="relative w-full md:w-auto">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input type="text" placeholder="Filter telemetry..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-9 pr-3 py-2 bg-[#0d0d0d] border border-slate-800 rounded text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono" />
            </div>
          </div>

          <div className="flex-1 p-4 md:p-6 custom-scroll overflow-y-auto space-y-4 relative">
            {isSyncing && !data[activeCategory] ? (
              [...Array(6)].map((_, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-slate-800 bg-[#0a0a0a] space-y-3">
                  <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-slate-800/50 rounded w-1/2 animate-pulse" />
                </div>
              ))
            ) : displayData.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 pt-10">
                <Target className="w-12 h-12 stroke-1 mb-4 text-slate-700" />
                <p className="text-xs font-mono uppercase tracking-widest">No telemetry signals acquired.</p>
              </div>
            ) : (
              displayData.map((item) => (
                <motion.div key={item.id} layoutId={`card-${item.id}`} onClick={() => handleItemSelection(item)}
                  className={`p-5 rounded-xl border bg-[#0a0a0a] transition-all duration-200 cursor-pointer relative group ${selectedItem?.id === item.id ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.05)]' : 'border-slate-800 hover:border-slate-600'}`}>
                  
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400 font-bold text-[10px] uppercase font-mono tracking-widest">{item.source}</span>
                    {getSentimentBadge(item.sentiment)}
                  </div>
                  
                  <h3 className="text-[15px] md:text-[17px] font-bold leading-snug text-slate-200 group-hover:text-cyan-400 mb-4 transition-colors font-serif tracking-wide">
                    {sanitizeTitle(item.title)}
                  </h3>
                  
                  <div className="flex justify-between items-center text-[10px] font-mono font-medium text-slate-500">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {item.dateString}</span>
                    <span className="text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded">{getTimeAgo(item.rawDate)}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className={`${selectedItem ? 'flex' : 'hidden'} lg:flex w-full absolute lg:relative top-0 left-0 h-full lg:w-[480px] xl:w-[600px] bg-[#050505] flex-col z-20 shrink-0 border-l border-slate-800`}>
          
          <div className="px-5 py-3 border-b border-slate-800 flex justify-between items-center shrink-0 bg-[#0a0a0a]">
            <button onClick={() => setSelectedItem(null)} className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-slate-400 border border-slate-800 px-3 py-1.5 rounded bg-slate-900 hover:text-white transition-colors uppercase">
              ← Close Dossier
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => setTextSizeModifier(prev => Math.max(-2, prev - 1))} className="text-[10px] font-mono font-black border border-slate-800 px-2.5 py-1 rounded bg-slate-900 text-slate-500 hover:text-white">A-</button>
              <button onClick={() => setTextSizeModifier(prev => Math.min(4, prev + 1))} className="text-[10px] font-mono font-black border border-slate-800 px-2.5 py-1 rounded bg-slate-900 text-slate-500 hover:text-white">A+</button>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-8 custom-scroll overflow-y-auto">
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div key={selectedItem.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                  
                  <div className="border-b border-slate-800 pb-6">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-500 mb-3 flex items-center gap-2">
                      <Target className="w-3 h-3" /> IDENTIFIED SIGNAL • {selectedItem.timeString}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-black text-white leading-[1.2] tracking-tight font-serif">
                      {sanitizeTitle(selectedItem.title)}
                    </h2>
                  </div>

                  <button 
                    onClick={toggleVoiceSummary}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${isSpeaking ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-full ${isSpeaking ? 'bg-cyan-500 text-white animate-pulse' : 'bg-slate-800'}`}>
                        {isSpeaking ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold font-mono tracking-widest uppercase text-white">Neural Voice Synthesis</p>
                        <p className="text-[10px] text-slate-500 mt-1 font-mono">{isSpeaking ? 'INTERRUPT STREAM...' : 'GENERATE AUDIO DOSSIER'}</p>
                      </div>
                    </div>
                    <Volume2 className={`w-5 h-5 ${isSpeaking ? 'text-cyan-400 animate-bounce' : 'text-slate-600'}`} />
                  </button>

                  <div className="font-sans min-h-[200px]">
                    {aiLoading ? (
                      <div className="p-10 border border-slate-800 rounded-xl flex flex-col items-center justify-center gap-4 bg-[#0a0a0a]">
                        <RefreshCw className="w-6 h-6 animate-spin text-cyan-500" />
                        <p className="text-[10px] font-mono uppercase font-bold text-slate-500 tracking-[0.2em]">Synthesizing Macro Telemetry...</p>
                      </div>
                    ) : aiAnalysis ? (
                      <div className="pt-2">
                        {renderPremiumSemanticContent(aiAnalysis)}
                      </div>
                    ) : null}
                  </div>

                  <div className="border border-slate-800 rounded-xl bg-[#0a0a0a] p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black tracking-widest uppercase font-mono text-slate-400 flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-cyan-500" /> DIRECT NEURAL QUERY
                      </h4>
                      <div className="flex bg-slate-900 border border-slate-800 rounded p-1">
                        <button onClick={() => changeProvider('llama-cloud')} className={`px-2.5 py-1 text-[9px] font-bold rounded font-mono tracking-wider transition-colors ${aiProvider === 'llama-cloud' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>LLAMA</button>
                        <button onClick={() => changeProvider('gemini')} className={`px-2.5 py-1 text-[9px] font-bold rounded font-mono tracking-wider transition-colors ${aiProvider === 'gemini' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>GEMINI</button>
                        <button onClick={() => changeProvider('openai')} className={`px-2.5 py-1 text-[9px] font-bold rounded font-mono tracking-wider transition-colors ${aiProvider === 'openai' ? 'bg-cyan-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>OPENAI</button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={customQuery} 
                        onChange={(e) => setCustomQuery(e.target.value)} 
                        placeholder="Interrogate this data node..."
                        className="flex-1 bg-slate-950 border border-slate-800 text-xs rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
                        onKeyDown={(e) => e.key === 'Enter' && executeCustomAiQuery()} 
                      />
                      <button 
                        onClick={executeCustomAiQuery} 
                        className="bg-white text-black px-4 rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center"
                      >
                        <Send className="w-4 h-4"/>
                      </button>
                    </div>
                  </div>

                  <a 
                    href={selectedItem.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full py-3.5 bg-slate-900 hover:bg-cyan-900/30 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 rounded-lg font-bold text-[10px] font-mono tracking-[0.2em] uppercase flex justify-center items-center gap-2 transition-all text-center"
                  >
                    ACCESS RAW SOURCE NODE <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-60">
                  <Target className="w-16 h-16 stroke-1 mb-6 text-slate-700" />
                  <p className="text-xs font-mono uppercase tracking-widest text-center max-w-xs leading-relaxed">Awaiting node selection to initiate deep semantic parsing.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
