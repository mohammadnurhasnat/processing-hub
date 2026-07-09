import { useState, useEffect, FormEvent } from 'react';
import { Shield, RefreshCw, Trash2, Eye, ExternalLink, Database, Activity, CheckCircle2, AlertCircle, X, KeyRound, LogOut, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminLeadsProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export default function AdminLeads({ isOpen: propIsOpen, onClose, onOpen }: AdminLeadsProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (isOpen) {
      if (onClose) onClose();
      else setInternalIsOpen(false);
    } else {
      if (onOpen) onOpen();
      else setInternalIsOpen(true);
    }
  };

  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('isAdminAuthenticated') === 'true';
    }
    return false;
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const fetchLeads = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLeads = async () => {
    if (!isAuthenticated) return;
    if (!confirm("Are you sure you want to clear all captured leads?")) return;
    try {
      await fetch('/api/leads/clear', { method: 'POST' });
      setLeads([]);
      setSelectedLead(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      const trimmedEmail = email.trim().toLowerCase();
      if (trimmedEmail === 'mohammadnurhasnat@gmail.com' && password === 'Turbo5max#') {
        setIsAuthenticated(true);
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        setAuthError('');
      } else {
        setAuthError('ভুল ইমেইল অথবা পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
      setIsLoggingIn(false);
    }, 600);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminAuthenticated');
    setEmail('');
    setPassword('');
    setLeads([]);
    setSelectedLead(null);
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchLeads();
      const interval = setInterval(fetchLeads, 4000); // Auto-refresh every 4s while open
      return () => clearInterval(interval);
    }
  }, [isOpen, isAuthenticated]);

  return (
    <>
      {/* Portal Overlay / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[calc(100vw-48px)] sm:w-[500px] md:w-[600px] bg-slate-950 text-slate-100 rounded-[2rem] shadow-2xl border border-slate-800 overflow-hidden flex flex-col h-[580px] z-[110]"
          >
            {/* Header */}
            <div className="bg-slate-900 p-6 border-b border-slate-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <Database className="text-emerald-400" size={24} />
                <div>
                  <h3 className="font-bold text-base md:text-lg text-white font-display">
                    {isAuthenticated ? 'Make.com Automation Gateway' : 'Admin Security Portal'}
                  </h3>
                  <p className="text-slate-400 text-xs flex items-center gap-1.5 mt-0.5">
                    {isAuthenticated ? (
                      <>
                        <Activity size={12} className="animate-pulse text-emerald-400" />
                        Listening for active lead reports...
                      </>
                    ) : (
                      <>
                        <Lock size={12} className="text-amber-500" />
                        Please verify your administrator credentials
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {isAuthenticated && (
                  <>
                    <button 
                      onClick={fetchLeads} 
                      className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                      title="Force Refresh"
                    >
                      <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                    </button>
                    <button 
                      onClick={clearLeads} 
                      className="p-2.5 hover:bg-red-950 rounded-xl text-slate-400 hover:text-red-400 transition-colors"
                      title="Clear All Leads"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={handleLogout} 
                      className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-amber-400 transition-colors"
                      title="Log Out Admin"
                    >
                      <LogOut size={18} />
                    </button>
                  </>
                )}
                <button 
                  onClick={handleToggle} 
                  className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {!isAuthenticated ? (
                /* Login screen */
                <div className="max-w-md mx-auto py-4 flex flex-col justify-center h-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-xl shadow-emerald-950/20">
                      <KeyRound size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1.5">অ্যাডমিন প্রবেশদ্বার</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      অটোমেশন গেটওয়েতে প্রবেশ করতে ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন করুন
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    {authError && (
                      <div className="bg-red-950/35 border border-red-800/40 text-red-300 text-xs p-3.5 rounded-xl flex items-center gap-2.5">
                        <AlertCircle size={16} className="text-red-400 shrink-0" />
                        <span>{authError}</span>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">ইমেইল / Email</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mohammadnurhasnat@gmail.com" 
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">পাসওয়ার্ড / Password</label>
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm transition-all"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                    >
                      {isLoggingIn ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          যাচাই করা হচ্ছে...
                        </>
                      ) : (
                        <>
                          <Shield size={16} />
                          লগইন করুন / Admin Login
                        </>
                      )}
                    </button>
                  </form>

                  {/* Hint Box for Testing convenience */}
                  <div className="mt-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-1">
                    <p className="text-slate-300 font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      Test Admin Credentials (টেস্ট লগইন তথ্য):
                    </p>
                    <div className="text-slate-400 space-y-0.5">
                      <p><span className="font-semibold text-slate-300">Email:</span> mohammadnurhasnat@gmail.com</p>
                      <p><span className="font-semibold text-slate-300">Password:</span> Turbo5max#</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Authenticated State: Active Leads list */
                leads.length === 0 ? (
                  <div className="text-center py-16 text-slate-500">
                    <Database size={48} className="mx-auto mb-4 text-slate-700" />
                    <p className="text-sm font-semibold mb-1 text-slate-400">No leads captured yet</p>
                    <p className="text-xs max-w-xs mx-auto text-slate-500">
                      Interact with the **Visa Hub AI Assistant** on the bottom right, state your name and ask about a visa to generate automated reports.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Captured Real-time Leads</p>
                    {leads.map((lead, i) => (
                      <div 
                        key={lead.id || i}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          selectedLead?.id === lead.id 
                            ? 'bg-slate-900 border-emerald-500/50' 
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                        }`}
                        onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                      >
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <div>
                            <h4 className="font-bold text-white text-sm">
                              {lead.CustomerName || "Unknown Guest"}
                            </h4>
                            <p className="text-xs text-slate-400">{lead.CoreQuery}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                            lead.Status === 'Lead Captured' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : lead.Status === 'Pending Human' 
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {lead.Status}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-800/60">
                          <span>Platform: {lead.Platform || "Website"}</span>
                          <span>{lead.timestamp}</span>
                        </div>

                        {/* Expanded View with JSON Summary for Make.com Extraction */}
                        {selectedLead?.id === lead.id && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 pt-4 border-t border-slate-800 space-y-3 text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div>
                              <span className="text-slate-400 font-bold block mb-1">Key Information Sought</span>
                              <p className="text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
                                {lead.KeyInformationSought}
                              </p>
                            </div>

                            <div>
                              <span className="text-slate-400 font-bold block mb-1.5 flex items-center gap-1.5">
                                <ExternalLink size={12} className="text-emerald-400" />
                                Structured JSON Payload (Webhook ready)
                              </span>
                              <pre className="bg-slate-950 p-3 rounded-xl text-emerald-400 font-mono text-[10px] overflow-x-auto border border-slate-800/80">
                                {JSON.stringify({
                                  event: "new_lead",
                                  payload: {
                                    name: lead.CustomerName,
                                    platform: lead.Platform,
                                    query: lead.CoreQuery,
                                    status: lead.Status,
                                    key_info: lead.KeyInformationSought,
                                    extracted_at: lead.timestamp
                                  }
                                }, null, 2)}
                              </pre>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
