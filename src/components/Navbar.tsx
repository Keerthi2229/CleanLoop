import { LogOut, User as UserIcon, Menu, Bell } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  currentUser: UserType | null;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function Navbar({ currentUser, currentPage, onNavigate, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white/70 backdrop-blur-2xl sticky top-0 z-50 border-b border-gray-100/50 transition-all duration-300">
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 group"
            >
              <div className="bg-white p-1 rounded-2xl shadow-xl shadow-emerald-100 border border-emerald-50">
                <img
                  src="/logo.png"
                  alt="CleanLoop Logo"
                  className="h-14 w-14 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-black tracking-tighter text-gray-900 leading-none">
                  Clean<span className="text-emerald-600">Loop</span>
                </span>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-emerald-600/50 mt-1">Just a Click Away</span>
              </div>
            </button>
          </div>

          <div className="flex items-center space-x-10">
            {currentUser ? (
              <>
                <div className="hidden lg:flex items-center space-x-8">
                  <button
                    onClick={() => onNavigate('home')}
                    className={`relative text-sm font-black uppercase tracking-widest transition-all h-20 flex items-center group ${currentPage === 'home' ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'
                      }`}
                  >
                    <span>Home</span>
                    {currentPage === 'home' && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-t-full"></div>}
                  </button>
                  <button
                    onClick={() => onNavigate('bookings')}
                    className={`relative text-sm font-black uppercase tracking-widest transition-all h-20 flex items-center group ${currentPage === 'bookings' ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'
                      }`}
                  >
                    <span>My Bookings</span>
                    {currentPage === 'bookings' && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-t-full"></div>}
                  </button>
                  {(currentUser.role === 'admin' || currentUser.email === 'admin@cleanloop.com') && (
                    <button
                      onClick={() => onNavigate('admin')}
                      className={`relative text-sm font-black uppercase tracking-widest transition-all h-20 flex items-center group ${currentPage === 'admin' ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'
                        }`}
                    >
                      <span>Admin</span>
                      {currentPage === 'admin' && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-t-full"></div>}
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-6 pl-8 border-l border-gray-100">
                  <button className="p-2 text-gray-400 hover:text-emerald-500 transition-colors relative">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
                  </button>

                  <div className="flex items-center space-x-3 px-4 py-2 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200 transition-transform active:scale-95 cursor-pointer">
                    <UserIcon className="h-5 w-5" />
                    <span className="font-black text-sm">{currentUser.name.split(' ')[0]}</span>
                  </div>

                  <button
                    onClick={onLogout}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-[1.25rem] transition-all duration-300"
                    title="Logout"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => onNavigate('login')}
                  className="text-sm font-black uppercase tracking-widest text-gray-900 hover:text-emerald-600 transition-colors px-4 py-2"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="bg-emerald-600 text-white px-8 py-3.5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
                >
                  Join Us
                </button>
              </div>
            )}

            <button className="lg:hidden p-2 text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
