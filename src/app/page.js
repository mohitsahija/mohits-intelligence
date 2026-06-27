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
      "Viral Content & Buzz":    { icon: <Activity className="w-4 h-4" />, iconClass: "icon-pink",  desc: "Social media trends & buzzworthy topics" },
      "Most Searched Topics":    { icon: <Search className="w-4 h-4" />,   iconClass: "icon-indigo",desc: "Top queries across search engines" }
    }
  },
  {
    title: "Global Sports Arena",
    categories: {
      "Cricket World":           { icon: <Trophy className="w-4 h-4" />,   iconClass: "icon-green",   desc: "Live scores, match schedules, player stats" },
      "Football & Transfers":    { icon: <Activity className="w-4 h-4" />, iconClass: "icon-blue",    desc: "League standings, results, transfer tickers" },
      "Basketball & NBA":        { icon: <Flame className="w-4 h-4" />,    iconClass: "icon-orange",  desc: "Tournament analysis, rankings, records" },
      "Tennis & Racquet Sports": { icon: <Target className="w-4 h-4" />,   iconClass: "icon-lime",    desc: "Grand Slam draws, rankings, results" },
      "Combat Sports (MMA/Box)": { icon: <Layers className="w-4 h-4" />,   iconClass: "icon-crimson", desc: "UFC fight cards, division updates, news" }
    }
  },
  {
    title: "Finance & Cards Hub",
    categories: {
      "Credit & Debit Cards":      { icon: <CreditCard className="w-4 h-4" />, iconClass: "icon-green",  desc: "Bank offers, policies, card launches" },
      "Rewards & Cashback Offers": { icon: <DollarSign className="w-4 h-4" />, iconClass: "icon-amber",  desc: "Points, fuel cards, cashback deals" },
      "Travel & Forex Cards":      { icon: <Plane className="w-4 h-4" />,      iconClass: "icon-cyan",   desc: "International spending & forex rates" },
      "Business & Virtual Cards":  { icon: <Building className="w-4 h-4" />,   iconClass: "icon-slate",  desc: "Corporate expense & enterprise cards" },
      "World Money & Stocks":      { icon: <TrendingUp className="w-4 h-4" />, iconClass: "icon-teal",   desc: "Global markets, shares, and IPOs" }
    }
  },
  {
    title: "Core Intelligence",
    categories: {
      "SME & Corporate Expansion": { icon: <Target className="w-4 h-4" />,      iconClass: "icon-green",  desc: "B2B Lead Gen: Facilities & Operations" },
      "AI & Neural Tech":          { icon: <Cpu className="w-4 h-4" />,         iconClass: "icon-blue",   desc: "Latest artificial intelligence software" },
      "Cybersecurity & Threats":   { icon: <ShieldAlert className="w-4 h-4" />, iconClass: "icon-red",    desc: "Threat intel, vulnerabilities & defense" },
      "Data Privacy & Compliance": { icon: <Lock className="w-4 h-4" />,        iconClass: "icon-amber",  desc: "Regulatory standards & privacy protocols" },
      "Digital Identity":          { icon: <Fingerprint className="w-4 h-4" />, iconClass: "icon-indigo", desc: "Auth systems, biometrics & KYC" },
      "Ads Creatives & Meta":      { icon: <Radio className="w-4 h-4" />,       iconClass: "icon-purple", desc: "Marketing and platform algorithms" },
      "Tech Innovations":          { icon: <Layers className="w-4 h-4" />,      iconClass: "icon-slate",  desc: "Hardware and enterprise technology" }
    }
  },
  {
    title: "Everyday Essentials",
    categories: {
      "E-commerce & Retail":    { icon: <ShoppingBag className="w-4 h-4" />, iconClass: "icon-orange", desc: "Online shopping & retail industry" },
      "Real Estate & Property": { icon: <Building className="w-4 h-4" />,    iconClass: "icon-blue",   desc: "Housing, commercial, property markets" },
      "Health & Lifestyle":     { icon: <HeartPulse className="w-4 h-4" />,  iconClass: "icon-rose",   desc: "Wellness, fitness, and living" },
      "Global Entertainment":   { icon: <Film className="w-4 h-4" />,        iconClass: "icon-purple", desc: "Movies, sports, and celebrity culture" }
    }
  }
];

const Logo = ({ animated = false }) => (
  <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d="M20 80V30L50 55L80 30V80" stroke="#0891B2" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, ease: 'easeInOut' }} />
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
  if (s < 3600) return Math.floor(s/60) + 'm ago';
  if (s < 86400) return Math.floor(s/3600) + 'h ago';
  if (s < 2592000) return Math.floor(s/86400) + 'd ago';
  return Math.floor(s/2592000) + 'mo ago';
};

export default function IntelligencePlatform() {
  const [isIntro, setIsIntro]             = useState(true);
  const [isDark, setIsDark]               = useState(false); // ← LIGHT MODE DEFAULT
  const [data, setData]                   = useState({});
  const [ticker, setTicker]               = useState([]);
  const [activeCategory, setActiveCategory] = useState('Cricket World');
  const [expandedGroups, setExpandedGroups] = useState({ 'Global Sports Arena': true });
  const [selectedItem, setSelectedItem]   = useState(null);
  const [isSyncing, setIsSyncing]         = useState(true);
  const [toast, setToast]                 = useState('');
  const [searchQuery, setSearchQuery]     = useState('');
  const [mobileMenu, setMobileMenu]       = useState(false);
  const [cache, setCache]                 = useState({});
  const [cmdOpen, setCmdOpen]             = useState(false);
  const [cmdSearch, setCmdSearch]         = useState('');
  const [provider, setProvider]           = useState('gemini');
  const [analysis, setAnalysis]           = useState('');
  const [aiLoading, setAiLoading]         = useState(false);
  const [isStreaming, setIsStreaming]      = useState(false);
  const [customQ, setCustomQ]             = useState('');
  const [textMod, setTextMod]             = useState(0);
  const [isSpeaking, setIsSpeaking]       = useState(false);
  const [time, setTime]                   = useState({ ind: '', ny: '', lon: '' });

  useEffect(() => {
    const kd = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(p => !p); }
      if (e.key === 'Escape') setCmdOpen(false);
    };
    window.addEventListener('keydown', kd);
    return () => window.removeEventListener('keydown', kd);
  }, []);

  useEffect(() => {
    setTimeout(() => setIsIntro(false), 2400);
    const tick = setInterval(() => {
      const now = new Date();
      setTime({
        ind: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata',     hour: '2-digit', minute: '2-digit' }),
        ny:  now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
        lon: now.toLocaleTimeString('en-US', { timeZone: 'Europe/London',    hour: '2-digit', minute: '2-digit' }),
      });
    }, 1000);
    fetchFeeds(false);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    if (window.speechSynthesis) { window.speechSynthesis.cancel(); setIsSpeaking(false); }
  }, [selectedItem]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchFeeds = async (manual = true) => {
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/stream?t=${Date.now()}`, { cache: 'no-store' });
      const d = await res.json();
      setData(d.feeds); setTicker(d.ticker);
      if (manual) showToast('Live data synced successfully.');
      if (d.feeds[activeCategory]?.length > 0 && !selectedItem) {
        selectItem(d.feeds[activeCategory][0]);
      }
    } catch { if (manual) showToast('Sync failed. Check network.'); }
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

  const switchProvider = (p) => { setProvider(p); if (selectedItem) selectItem(selectedItem, p); };
  const toggleGroup = (g) => setExpandedGroups(prev => ({ ...prev, [g]: !prev[g] }));

  let activeCat = { icon: <Globe className="w-4 h-4" />, iconClass: 'icon-slate' };
  SIDEBAR_GROUPS.forEach(g => { if (g.categories[activeCategory]) activeCat = g.categories[activeCategory]; });

  const feedItems = data[activeCategory]?.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.source.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const renderAnalysis = (text, streaming) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const c = line.trim();
      const isLast = i === lines.length - 1;
      if (c.startsWith('■')) return (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ width: 3, height: 14, background: '#0891B2', borderRadius: 2, flexShrink: 0 }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0891B2' }}>
            {c.replace('■', '').trim()}
          </span>
        </div>
      );
      if (c.startsWith('✦')) return (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '6px 0', lineHeight: 1.65 }}>
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

  // ── SENTIMENT BADGE ──
  const SentimentBadge = ({ s }) => {
    const map = {
      BULLISH: { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0', icon: <TrendingUp style={{ width: 9, height: 9 }} />, label: 'BULLISH' },
      BEARISH: { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', icon: <TrendingDown style={{ width: 9, height: 9 }} />, label: 'BEARISH' },
      NEUTRAL: { bg: '#F9FAFB', color: '#6B7280', border: '#E5E7EB', icon: <Minus style={{ width: 9, height: 9 }} />, label: 'NEUTRAL' },
    };
    const b = map[s] || map.NEUTRAL;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 99, background: b.bg, color: b.color, border: `1px solid ${b.border}`, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, flexShrink: 0 }}>
        {b.icon} {b.label}
      </span>
    );
  };

  // ─────────── STYLES (light-mode hardcoded for cards) ───────────
  const S = {
    page:       { fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif", height: '100vh', display: 'flex', flexDirection: 'column', background: '#F8F9FB', overflow: 'hidden' },
    ticker:     { height: 30, display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#111827', borderBottom: '1px solid #1F2937', flexShrink: 0, position: 'relative' },
    header:     { background: 'rgba(255,255,255,0.96)', borderBottom: '1px solid #E5E7EB', padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 20 },
    sidebar:    { width: 300, background: '#FFFFFF', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100%' },
    feedPanel:  { flex: 1, display: 'flex', flexDirection: 'column', background: '#F3F4F6', minWidth: 0, borderRight: '1px solid #E5E7EB' },
    feedHeader: { padding: '12px 16px', background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 },
    detailPanel:{ width: 520, background: '#FFFFFF', borderLeft: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', flexShrink: 0 },
    card: (selected) => ({
      background: selected ? '#FFFFFF' : '#FFFFFF',
      border: selected ? '1.5px solid #0891B2' : '1px solid #E5E7EB',
      borderRadius: 12,
      padding: '14px 16px',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: 0,
      boxShadow: selected ? '0 0 0 3px rgba(8,145,178,0.1), 0 2px 8px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.04)',
      transition: 'all 0.18s cubic-bezier(0.34,1.56,0.64,1)',
      transform: selected ? 'translateX(3px)' : 'translateX(0)',
    }),
  };

  return (
    <div style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@700;800&display=swap');
        @keyframes tickerRun { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
        @keyframes livePulse { 0%{transform:scale(1);opacity:.4} 70%{transform:scale(2.2);opacity:0} 100%{transform:scale(1);opacity:0} }
        @keyframes spin { to { transform: rotate(360deg); } }
        .feed-card:hover { border-color: #CBD5E1 !important; box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important; transform: translateY(-1px) !important; }
        .cat-btn:hover { background: #F1F5F9; }
        .cat-btn.active-cat { background: #F0F9FF; border-color: #BAE6FD; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; } ::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }
        .ticker-inner { display: inline-block; animation: tickerRun 50s linear infinite; white-space: nowrap; }
        .ticker-inner:hover { animation-play-state: paused; }
      `}</style>

      {/* ── INTRO ── */}
      <AnimatePresence>
        {isIntro && (
          <motion.div exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6 } }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#060A14', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Logo animated />
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} style={{ textAlign: 'center', marginTop: 24 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: '0.3em', color: '#F1F5F9', textTransform: 'uppercase' }}>MOHIT SAHIJA</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.5em', color: '#0891B2', textTransform: 'uppercase', fontWeight: 700, marginTop: 10 }}>AI-DRIVEN INTELLIGENCE ENGINE</div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} style={{ display: 'flex', gap: 6, marginTop: 32 }}>
              {[0,1,2].map(i => <motion.div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#0891B2' }} animate={{ opacity: [0.2,1,0.2] }} transition={{ delay: i*0.2, duration: 1, repeat: Infinity }} />)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:20 }}
            style={{ position:'fixed', bottom:24, right:24, zIndex:99, background:'#059669', color:'#fff', padding:'10px 16px', borderRadius:10, fontFamily:"'JetBrains Mono',monospace", fontSize:11, fontWeight:700, display:'flex', alignItems:'center', gap:8, boxShadow:'0 8px 24px rgba(0,0,0,0.15)' }}>
            <CheckCircle2 style={{ width:14, height:14 }} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CMD PALETTE ── */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)', zIndex:50, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:'14vh' }}
            onClick={() => setCmdOpen(false)}>
            <motion.div initial={{ scale:0.95, y:-10 }} animate={{ scale:1, y:0 }} exit={{ scale:0.95, y:-10 }}
              style={{ width:'100%', maxWidth:520, background:'#FFFFFF', border:'1px solid #E5E7EB', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.2)', overflow:'hidden' }}
              onClick={e => e.stopPropagation()}>
              <div style={{ padding:'12px 16px', borderBottom:'1px solid #F3F4F6', display:'flex', alignItems:'center', gap:10, background:'#F9FAFB' }}>
                <Command style={{ width:14, height:14, color:'#0891B2', flexShrink:0 }} />
                <input autoFocus type="text" placeholder="Search categories..." value={cmdSearch} onChange={e => setCmdSearch(e.target.value)}
                  style={{ flex:1, border:'none', outline:'none', fontSize:13, color:'#111827', background:'transparent', fontFamily:"'Inter',sans-serif" }} />
                <kbd style={{ fontSize:9, padding:'3px 7px', background:'#E5E7EB', borderRadius:4, fontFamily:"'JetBrains Mono',monospace", color:'#6B7280' }}>ESC</kbd>
              </div>
              <div style={{ maxHeight:280, overflowY:'auto', padding:8, display:'flex', flexDirection:'column', gap:2 }}>
                {SIDEBAR_GROUPS.flatMap(g => Object.keys(g.categories)).filter(c => c.toLowerCase().includes(cmdSearch.toLowerCase())).map(cat => (
                  <button key={cat} onClick={() => { setActiveCategory(cat); setSelectedItem(null); setCmdOpen(false); setCmdSearch(''); }}
                    style={{ width:'100%', textAlign:'left', padding:'9px 12px', borderRadius:8, border:'none', cursor:'pointer', fontSize:12, fontWeight:600, background: activeCategory===cat ? '#0891B2' : 'transparent', color: activeCategory===cat ? '#fff' : '#374151', display:'flex', alignItems:'center', justifyContent:'space-between', transition:'all 0.12s' }}>
                    <span>{cat}</span><ArrowUpRight style={{ width:12, height:12, opacity:0.5 }} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TICKER ── */}
      <div style={S.ticker}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:50, background:'linear-gradient(to right,#111827,transparent)', zIndex:2, pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:50, background:'linear-gradient(to left,#111827,transparent)', zIndex:2, pointerEvents:'none' }} />
        <div className="ticker-inner">
          {[...Array(3)].map((_, li) => (
            <span key={li}>
              {ticker.length > 0 ? ticker.map((s, i) => (
                <span key={`${li}-${i}`} style={{ margin:'0 24px', fontFamily:"'JetBrains Mono',monospace", fontSize:10, fontWeight:700, color: s.isUp ? '#10B981' : '#F87171' }}>
                  {s.isUp ? '▲' : '▼'} {s.name} {s.price} ({s.percent}%)
                </span>
              )) : <span style={{ margin:'0 24px', fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'#4B5563' }}>CONNECTING MARKET FEED...</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── HEADER ── */}
      <header style={S.header}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <button className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)} style={{ border:'none', background:'none', cursor:'pointer', color:'#6B7280', padding:4 }}>
            {mobileMenu ? <X style={{ width:18, height:18 }} /> : <Menu style={{ width:18, height:18 }} />}
          </button>
          <Logo animated={false} />
          <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:800, letterSpacing:'-0.02em', color:'#0F172A', textTransform:'uppercase' }}>MOHIT'S INTELLIGENCE</h1>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'#10B981', position:'relative' }}>
                <div style={{ position:'absolute', inset:-3, borderRadius:'50%', background:'#10B981', opacity:0.3, animation:'livePulse 2s ease-out infinite' }} />
              </div>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:700, color:'#10B981', letterSpacing:'0.1em' }}>LIVE</span>
            </div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <button onClick={() => setCmdOpen(true)} className="hidden xl:flex"
            style={{ alignItems:'center', gap:8, padding:'6px 12px', background:'#F1F5F9', border:'1px solid #E2E8F0', borderRadius:8, cursor:'pointer', fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:700, color:'#64748B', transition:'all 0.15s' }}>
            <Command style={{ width:11, height:11, color:'#0891B2' }} /> CMD+K
          </button>
          <div className="hidden lg:flex" style={{ alignItems:'center', gap:14, paddingRight:14, borderRight:'1px solid #E5E7EB' }}>
            {[['IND', time.ind], ['NY', time.ny], ['LON', time.lon]].map(([l, t]) => (
              <span key={l} style={{ display:'flex', alignItems:'center', gap:5, fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:600, color:'#94A3B8' }}>
                <Clock style={{ width:10, height:10 }} /> {l}: {t}
              </span>
            ))}
          </div>
          <button onClick={() => setIsDark(!isDark)} style={{ padding:8, borderRadius:8, background:'#F1F5F9', border:'1px solid #E2E8F0', cursor:'pointer', display:'flex', color:'#64748B' }}>
            {isDark ? <Sun style={{ width:14, height:14 }} /> : <Moon style={{ width:14, height:14 }} />}
          </button>
          <button onClick={() => fetchFeeds(true)} disabled={isSyncing}
            style={{ padding:'8px 16px', background:'#0F172A', color:'#fff', border:'none', borderRadius:8, fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', display:'flex', alignItems:'center', gap:7, transition:'all 0.2s' }}>
            <RefreshCw style={{ width:13, height:13 }} className={isSyncing ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">{isSyncing ? 'SYNCING...' : 'REFRESH'}</span>
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display:'flex', flex:1, minHeight:0, overflow:'hidden', position:'relative' }}>

        {/* ── SIDEBAR ── */}
        <div className={`${mobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
          style={{ ...S.sidebar, position:'absolute', top:0, left:0, height:'100%', zIndex:30, transition:'transform 0.3s ease' }}>
          <div style={{ padding:'12px 16px', borderBottom:'1px solid #F1F5F9', flexShrink:0 }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'#94A3B8' }}>INTELLIGENCE MATRICES</span>
          </div>
          <div style={{ flex:1, overflowY:'auto', padding:10, display:'flex', flexDirection:'column', gap:6 }}>
            {SIDEBAR_GROUPS.map((group, gi) => (
              <div key={gi} style={{ border:'1px solid #F1F5F9', borderRadius:10, overflow:'hidden', background:'#FAFAFA' }}>
                <button onClick={() => toggleGroup(group.title)}
                  style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 12px', background:'transparent', border:'none', cursor:'pointer', fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'#475569', transition:'background 0.15s' }}>
                  {group.title}
                  <ChevronDown style={{ width:13, height:13, color:'#94A3B8', transition:'transform 0.3s', transform: expandedGroups[group.title] ? 'rotate(180deg)' : 'rotate(0)' }} />
                </button>
                <AnimatePresence>
                  {expandedGroups[group.title] && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} style={{ overflow:'hidden' }}>
                      <div style={{ padding:'4px 8px 8px', display:'flex', flexDirection:'column', gap:2 }}>
                        {Object.entries(group.categories).map(([catName, catData]) => {
                          const isActive = activeCategory === catName;
                          return (
                            <button key={catName} className={`cat-btn ${isActive ? 'active-cat' : ''}`}
                              onClick={() => { setActiveCategory(catName); setSelectedItem(null); setSearchQuery(''); if (window.innerWidth < 1024) setMobileMenu(false); }}
                              style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, border: isActive ? '1px solid #BAE6FD' : '1px solid transparent', background: isActive ? '#F0F9FF' : 'transparent', cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
                              <span className={`cat-icon ${isActive ? catData.iconClass : 'icon-slate'}`} style={{ padding:6, borderRadius:6, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', opacity: isActive ? 1 : 0.55 }}>
                                {catData.icon}
                              </span>
                              <div style={{ flex:1, minWidth:0 }}>
                                <div style={{ fontSize:11, fontWeight: isActive ? 700 : 600, color: isActive ? '#0369A1' : '#374151', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{catName}</div>
                                <div style={{ fontSize:9, color:'#9CA3AF', marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{catData.desc}</div>
                              </div>
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
        <div style={{ ...S.feedPanel, marginLeft: 300 }} className="lg:ml-0">
          {/* Feed header */}
          <div style={S.feedHeader}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span className={`cat-icon ${activeCat.iconClass}`} style={{ padding:7, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>{activeCat.icon}</span>
              <div>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:800, color:'#0F172A', letterSpacing:'-0.01em' }}>{activeCategory}</h2>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#94A3B8', marginTop:1 }}>{feedItems.length} articles loaded</p>
              </div>
            </div>
            <div style={{ position:'relative' }}>
              <Search style={{ width:12, height:12, position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF' }} />
              <input type="text" placeholder="Filter articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft:30, paddingRight:12, paddingTop:7, paddingBottom:7, fontSize:12, border:'1px solid #E5E7EB', borderRadius:8, background:'#F9FAFB', color:'#374151', fontFamily:"'Inter',sans-serif", outline:'none', width:190, transition:'all 0.15s' }} />
            </div>
          </div>

          {/* Feed cards */}
          <div style={{ flex:1, overflowY:'auto', padding:14, display:'flex', flexDirection:'column', gap:10 }}>
            {isSyncing && !data[activeCategory] ? (
              [...Array(5)].map((_, i) => (
                <div key={i} style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:12, padding:16, display:'flex', flexDirection:'column', gap:10 }}>
                  <div style={{ height:12, borderRadius:6, background:'#F1F5F9', width:'40%' }} className="shimmer-bg" />
                  <div style={{ height:16, borderRadius:6, background:'#F1F5F9', width:'85%' }} className="shimmer-bg" />
                  <div style={{ height:16, borderRadius:6, background:'#F1F5F9', width:'70%' }} className="shimmer-bg" />
                  <div style={{ height:10, borderRadius:6, background:'#F1F5F9', width:'30%' }} className="shimmer-bg" />
                </div>
              ))
            ) : feedItems.length === 0 ? (
              <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#9CA3AF', paddingTop:60 }}>
                <Target style={{ width:36, height:36, marginBottom:12, opacity:0.4 }} />
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11 }}>No articles found.</p>
              </div>
            ) : feedItems.map(item => {
              const selected = selectedItem?.id === item.id;
              return (
                <motion.div key={item.id} onClick={() => selectItem(item)}
                  className="feed-card"
                  style={S.card(selected)}
                  whileHover={!selected ? { y: -1 } : {}}
                >
                  {/* Left accent bar */}
                  <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background: selected ? '#0891B2' : 'transparent', borderRadius:'12px 0 0 12px', transition:'background 0.2s' }} />

                  {/* Top row: source + sentiment */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10, paddingLeft:6 }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', padding:'3px 8px', borderRadius:5, background:'#F1F5F9', border:'1px solid #E2E8F0', color:'#475569' }}>
                      {item.source}
                    </span>
                    <SentimentBadge s={item.sentiment} />
                  </div>

                  {/* ── TITLE — the most important element ── */}
                  <h3 style={{ fontSize:13, fontWeight:650, lineHeight:1.48, color: selected ? '#0369A1' : '#111827', marginBottom:10, paddingLeft:6, fontFamily:"'Inter',sans-serif", letterSpacing:'-0.01em', transition:'color 0.2s' }}>
                    {item.title}
                  </h3>

                  {/* Bottom row: date + time ago */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingLeft:6 }}>
                    <span style={{ display:'flex', alignItems:'center', gap:5, fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#9CA3AF' }}>
                      <Calendar style={{ width:10, height:10 }} /> {item.dateString}
                    </span>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:600, color:'#0891B2', background:'rgba(8,145,178,0.08)', padding:'2px 8px', borderRadius:99, border:'1px solid rgba(8,145,178,0.15)' }}>
                      {getTimeAgo(item.rawDate)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── DETAIL PANEL ── */}
        <div style={{ ...S.detailPanel, display: selectedItem ? 'flex' : 'none', position:'absolute', right:0, top:0, height:'100%', zIndex:20 }} className="lg:relative lg:flex">

          {/* Detail header */}
          <div style={{ padding:'10px 16px', borderBottom:'1px solid #F1F5F9', background:'#FAFAFA', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
            <button onClick={() => setSelectedItem(null)}
              style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 10px', background:'#fff', border:'1px solid #E5E7EB', borderRadius:7, fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:700, letterSpacing:'0.08em', color:'#64748B', cursor:'pointer', textTransform:'uppercase' }}>
              ← BACK
            </button>
            <div style={{ display:'flex', gap:6 }}>
              {[['A−', -1], ['A+', 1]].map(([lbl, d]) => (
                <button key={lbl} onClick={() => setTextMod(p => Math.max(-2, Math.min(4, p+d)))}
                  style={{ padding:'4px 10px', background:'#fff', border:'1px solid #E5E7EB', borderRadius:6, fontFamily:"'JetBrains Mono',monospace", fontSize:10, fontWeight:700, color:'#64748B', cursor:'pointer' }}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {/* Detail content */}
          <div style={{ flex:1, overflowY:'auto', padding:24 }}>
            <AnimatePresence mode="wait">
              {selectedItem && (
                <motion.div key={selectedItem.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  style={{ display:'flex', flexDirection:'column', gap:20 }}>

                  {/* Article title block */}
                  <div style={{ paddingBottom:16, borderBottom:'1px solid #F1F5F9' }}>
                    <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'#94A3B8', marginBottom:10 }}>
                      {selectedItem.source} · {selectedItem.dateString} AT {selectedItem.timeString}
                    </p>
                    <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:20+textMod, fontWeight:800, lineHeight:1.2, letterSpacing:'-0.02em', color:'#0F172A' }}>
                      {selectedItem.title}
                    </h2>
                  </div>

                  {/* Voice button */}
                  <button onClick={toggleVoice}
                    style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', borderRadius:10, border: isSpeaking ? '1px solid #0891B2' : '1px solid #E5E7EB', background: isSpeaking ? '#F0F9FF' : '#FAFAFA', cursor:'pointer', transition:'all 0.2s' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <div style={{ width:32, height:32, borderRadius:'50%', background: isSpeaking ? '#0891B2' : '#F1F5F9', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}>
                        {isSpeaking ? <Square style={{ width:11, height:11, fill:'#fff', color:'#fff' }} /> : <Play style={{ width:11, height:11, fill:'#64748B', color:'#64748B', marginLeft:1 }} />}
                      </div>
                      <div style={{ textAlign:'left' }}>
                        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:700, color:'#374151', marginBottom:2 }}>Listen to AI Voice Summary</p>
                        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'#9CA3AF' }}>{isSpeaking ? 'Click to stop' : 'Synthesize speech stream'}</p>
                      </div>
                    </div>
                    <Volume2 style={{ width:15, height:15, color: isSpeaking ? '#0891B2' : '#CBD5E1' }} />
                  </button>

                  {/* Key Takeaways box */}
                  <div style={{ border:'1px solid #E5E7EB', borderRadius:12, overflow:'hidden' }}>
                    <div style={{ padding:'10px 14px', background:'#F8FAFC', borderBottom:'1px solid #E5E7EB', display:'flex', alignItems:'center', gap:7 }}>
                      <span style={{ color:'#F59E0B', fontSize:12 }}>⚡</span>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'#374151' }}>KEY TAKEAWAYS</span>
                    </div>
                    <div style={{ padding:14, display:'flex', flexDirection:'column', gap:10 }}>
                      <div style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:12, lineHeight:1.6, color:'#111827' }}>
                        <span style={{ color:'#0891B2', fontWeight:700, marginTop:2 }}>✦</span>
                        <span style={{ fontWeight:500 }}>{selectedItem.title}</span>
                      </div>
                      <div style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:12, lineHeight:1.6, color:'#6B7280' }}>
                        <span style={{ color:'#CBD5E1', marginTop:2 }}>✦</span>
                        <span>Sourced from {selectedItem.source} via the {activeCategory} intelligence index.</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div>
                    {aiLoading ? (
                      <div style={{ padding:28, border:'1px dashed #E5E7EB', borderRadius:12, display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
                        <div style={{ width:18, height:18, border:'2px solid #E5E7EB', borderTopColor:'#0891B2', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
                        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:700, color:'#94A3B8', letterSpacing:'0.14em', textTransform:'uppercase' }}>
                          PARSING INTELLIGENCE VIA {provider.toUpperCase()}...
                        </p>
                      </div>
                    ) : analysis ? (
                      <div style={{ paddingTop:4 }}>{renderAnalysis(analysis, isStreaming)}</div>
                    ) : null}
                  </div>

                  {/* Ask AI box */}
                  <div style={{ border:'1px solid #E5E7EB', borderRadius:12, background:'#FAFAFA', padding:14, display:'flex', flexDirection:'column', gap:12 }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'#94A3B8' }}>✦ ASK INTELLIGENCE AI</span>
                      <div style={{ background:'#F1F5F9', border:'1px solid #E2E8F0', borderRadius:99, padding:3, display:'flex', gap:2 }}>
                        {[['llama-cloud','Llama'],['gemini','Gemini'],['openai','OpenAI']].map(([val, lbl]) => (
                          <button key={val} onClick={() => switchProvider(val)}
                            style={{ padding:'3px 10px', borderRadius:99, border:'none', cursor:'pointer', fontFamily:"'JetBrains Mono',monospace", fontSize:9, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', background: provider===val ? '#0891B2' : 'transparent', color: provider===val ? '#fff' : '#64748B', boxShadow: provider===val ? '0 2px 6px rgba(8,145,178,0.25)' : 'none', transition:'all 0.2s' }}>
                            {lbl}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      <input type="text" value={customQ} onChange={e => setCustomQ(e.target.value)} onKeyDown={e => e.key==='Enter' && askCustom()}
                        placeholder="Ask about this article..."
                        style={{ flex:1, padding:'8px 12px', fontSize:12, border:'1px solid #E5E7EB', borderRadius:8, outline:'none', background:'#fff', color:'#374151', fontFamily:"'Inter',sans-serif", transition:'border-color 0.15s' }} />
                      <button onClick={askCustom}
                        style={{ padding:'8px 14px', background:'#0F172A', color:'#fff', border:'none', borderRadius:8, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}>
                        <Send style={{ width:13, height:13 }} />
                      </button>
                    </div>
                  </div>

                  {/* Read Original */}
                  <a href={selectedItem.link} target="_blank" rel="noopener noreferrer"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'13px', background:'#0F172A', color:'#fff', borderRadius:10, fontFamily:"'JetBrains Mono',monospace", fontSize:10, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', transition:'all 0.2s' }}>
                    READ ORIGINAL SOURCE <ArrowUpRight style={{ width:14, height:14 }} />
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
