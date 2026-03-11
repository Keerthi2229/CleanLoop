import { useState } from 'react';
import { User, Mail, Phone, Lock, UserPlus, ArrowLeft, Zap, ShieldCheck, Contact } from 'lucide-react';

interface SignupProps {
  onSignup: (email: string, password: string, name: string, phone: string, role: string) => void;
  onNavigate: (page: string) => void;
  error: string;
}

export default function Signup({ onSignup, onNavigate, error }: SignupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(email, password, name, phone, role);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-blue-100/50 p-12 border border-white transition-all duration-300 hover:shadow-emerald-200/50">
          <header className="text-center mb-10">
            <button
              onClick={() => onNavigate('login')}
              className="flex items-center space-x-2 text-xs font-black text-emerald-600/60 uppercase tracking-widest hover:text-emerald-600 mb-6 bg-emerald-50 px-4 py-2 rounded-full mx-auto transition-all"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back to Login</span>
            </button>
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none mb-4">Start Strong</h2>
            <p className="text-gray-400 font-black uppercase tracking-widest text-[11px] bg-gray-50 inline-block px-4 py-1.5 rounded-full border border-gray-100">
              Join the Global Ecosystem
            </p>
          </header>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl mb-8 flex items-center space-x-3 text-sm font-bold animate-pulse">
              <span className="shrink-0 w-2 h-2 bg-red-500 rounded-full"></span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Account Type Selection */}
            <div className="space-y-3 mb-8">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account Permission Level</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`flex items-center justify-center space-x-2 py-4 rounded-2xl border-2 transition-all font-bold text-sm ${role === 'user'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md'
                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'
                    }`}
                >
                  <Contact className="h-4 w-4" />
                  <span>Standard User</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex items-center justify-center space-x-2 py-4 rounded-2xl border-2 transition-all font-bold text-sm ${role === 'admin'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'
                    }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Admin Access</span>
                </button>
              </div>
            </div>

            {[
              { label: 'Display Identity', icon: User, type: 'text', placeholder: 'John Phoenix', value: name, setter: setName },
              { label: 'Neural Link Email', icon: Mail, type: 'email', placeholder: 'connect@cleanloop.io', value: email, setter: setEmail },
              { label: 'Secure Phone Line', icon: Phone, type: 'tel', placeholder: '+1 777 888 990', value: phone, setter: setPhone },
              { label: 'Master Security Pin', icon: Lock, type: 'password', placeholder: '••••••••', value: password, setter: setPassword },
            ].map((field, i) => (
              <div key={i} className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{field.label}</label>
                <div className="relative group">
                  <field.icon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-gray-100/50 border border-transparent rounded-[1.25rem] focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none font-bold text-base"
                    placeholder={field.placeholder}
                    required
                    minLength={field.type === 'password' ? 6 : undefined}
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full group mt-6 relative overflow-hidden bg-emerald-600 text-white py-6 rounded-[1.5rem] font-black text-xl shadow-2xl shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-95 flex items-center justify-center space-x-3"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:scale-x-200 transition-transform duration-1000"></div>
              <span>SIGN UP</span>
              <UserPlus className="h-6 w-6 group-hover:rotate-[360deg] transition-transform duration-500" />
            </button>
          </form>

          <footer className="mt-12 pt-10 border-t border-gray-100 text-center">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-[2rem] border border-gray-100 text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Zap className="h-4 w-4 text-emerald-500 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-800">100% Secure Transaction</p>
              </div>
              <p className="text-xs text-gray-400 font-bold leading-relaxed px-4">
                By clicking "Sign Up", you agree to our 2026 Smart Waste Protocols.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
