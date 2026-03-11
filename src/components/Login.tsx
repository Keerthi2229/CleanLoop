import { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight, RefreshCw, ArrowLeft } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onNavigate: (page: string) => void;
  error: string;
}

export default function Login({ onLogin, onNavigate, error: loginError }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResetStatus(null);
    try {
      await supabaseService.resetPassword(resetEmail);
      setResetStatus({ type: 'success', message: 'Password reset link sent to your email!' });
    } catch (err: any) {
      setResetStatus({ type: 'error', message: err.message || 'Failed to send reset link.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center px-4">
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-emerald-100/50 p-12 border border-white">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-8">
              <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-emerald-50 transform hover:scale-110 transition-transform cursor-pointer">
                <img
                  src="/logo.png"
                  alt="CleanLoop Logo"
                  className="h-32 w-32 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none mb-4">
              {isResetMode ? 'Recovery' : 'Welcome Home'}
            </h2>
            <p className="text-gray-400 mt-3 font-black uppercase tracking-widest text-[11px] bg-gray-50 inline-block px-4 py-1.5 rounded-full border border-gray-100">
              {isResetMode ? 'Security Protocol' : 'Access the Smart Loop'}
            </p>
          </div>

          {!isResetMode ? (
            <>
              {loginError && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 flex items-center space-x-3 text-sm font-bold animate-pulse">
                  <span className="shrink-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Connection</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 bg-gray-100/50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none font-bold text-lg"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Secure Pin</label>
                    <button
                      type="button"
                      onClick={() => setIsResetMode(true)}
                      className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700"
                    >
                      Forgot Pin?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 bg-gray-100/50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none font-bold text-lg"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full group mt-4 relative overflow-hidden bg-emerald-600 text-white py-6 rounded-[1.5rem] font-black text-xl shadow-2xl shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-95 flex items-center justify-center space-x-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span>LOGIN</span>
                  <LogIn className="h-6 w-6 group-hover:translate-x-2 transition-transform h-6 w-6" />
                </button>
              </form>
            </>
          ) : (
            <div className="space-y-6">
              {resetStatus && (
                <div className={`px-6 py-4 rounded-2xl mb-8 flex items-center space-x-3 text-sm font-bold ${resetStatus.type === 'success' ? 'bg-emerald-50 border border-emerald-100 text-emerald-600' : 'bg-red-50 border border-red-100 text-red-600'
                  }`}>
                  <span className={`shrink-0 w-2 h-2 rounded-full ${resetStatus.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                  <span>{resetStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Recovery Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 bg-gray-100/50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none font-bold text-lg"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group mt-4 relative overflow-hidden bg-emerald-600 text-white py-6 rounded-[1.5rem] font-black text-xl shadow-2xl shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-95 flex items-center justify-center space-x-3 disabled:opacity-50"
                >
                  <span>{isLoading ? 'SENDING...' : 'RESET PASSWORD'}</span>
                  <RefreshCw className={`h-6 w-6 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(false);
                    setResetStatus(null);
                  }}
                  className="w-full flex items-center justify-center space-x-2 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Login</span>
                </button>
              </form>
            </div>
          )}

          <div className="mt-12 text-center space-y-6">
            <p className="text-gray-400 font-bold text-sm tracking-tight">
              New to the ecosystem?
            </p>
            <button
              onClick={() => onNavigate('signup')}
              className="inline-flex items-center space-x-3 text-emerald-600 hover:text-emerald-700 font-black py-4 px-10 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition-all w-full justify-center group"
            >
              <span>CREATE ACCOUNT</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
