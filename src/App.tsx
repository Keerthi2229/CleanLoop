import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import { User, WasteType, Booking } from './types';
import { supabaseService } from './services/supabaseService';
import { supabase } from './lib/supabase';

// Lazy load components for faster initial load and reduced reloading time
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const BookingPage = lazy(() => import('./components/BookingPage'));
const BookingStatus = lazy(() => import('./components/BookingStatus'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

type Page = 'home' | 'login' | 'signup' | 'booking' | 'bookings' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedWasteType, setSelectedWasteType] = useState<WasteType | null>(null);
  const [authError, setAuthError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await supabaseService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
          await loadData(user);
        }
      } catch (err) {
        console.error('Initial auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const user = await supabaseService.getCurrentUser();
        setCurrentUser(user);
        if (user) await loadData(user);
      } else {
        setCurrentUser(null);
        setBookings([]);
        setAllUsers([]);
      }
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, []);

  async function loadData(user: User) {
    try {
      if (user.role === 'admin' || user.email === 'admin@cleanloop.com') {
        const [users, allBookings] = await Promise.all([
          supabaseService.getAllUsers(),
          supabaseService.getBookings()
        ]);
        setAllUsers(users);
        setBookings(allBookings);
      } else {
        const userBookings = await supabaseService.getBookings(user.id);
        setBookings(userBookings);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await supabaseService.signIn(email, password);

      if (user) {
        setCurrentUser(user);
        await loadData(user);

        if (user.role === 'admin' || user.email === 'admin@cleanloop.com') {
          setCurrentPage('admin');
        } else {
          setCurrentPage('home');
        }
      }

      setAuthError('');
    } catch (error: any) {
      setAuthError(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, name: string, phone: string, role: string) => {
    try {
      setLoading(true);
      const user = await supabaseService.signUp(email, password, name, phone, role);

      if (user) {
        setCurrentUser(user);
        await loadData(user);
        setCurrentPage('home');
      } else {
        setAuthError('Account created! Please confirm via email.');
      }
      setAuthError('');
    } catch (error: any) {
      setAuthError(error.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabaseService.signOut();
    setCurrentUser(null);
    setBookings([]);
    setCurrentPage('home');
  };

  const handleBookNow = (wasteType: WasteType) => {
    if (!currentUser) {
      setCurrentPage('login');
      return;
    }
    setSelectedWasteType(wasteType);
    setCurrentPage('booking');
  };

  const handleBookingComplete = async (address: string, lat: number, lng: number, scheduledTime: string) => {
    if (!currentUser || !selectedWasteType) return;

    try {
      await supabaseService.addBooking({
        userId: currentUser.id,
        wasteType: selectedWasteType,
        location: { address, lat, lng },
        scheduledTime,
        status: 'pending'
      });

      const updatedBookings = await supabaseService.getBookings(currentUser.id);
      setBookings(updatedBookings);
      setCurrentPage('bookings');
    } catch (error: any) {
      alert('Failed to create booking: ' + error.message);
    }
  };

  const handleUpdateBookingStatus = async (id: string, status: Booking['status']) => {
    try {
      await supabaseService.updateBookingStatus(id, status);
      const updatedBookings = await (currentUser?.role === 'admin' ? supabaseService.getBookings() : supabaseService.getBookings(currentUser?.id));
      setBookings(updatedBookings);
    } catch (error: any) {
      alert('Failed to update status: ' + error.message);
    }
  };

  const handleNavigate = (page: string) => {
    setAuthError('');
    setCurrentPage(page as Page);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const userBookings = currentUser ? bookings.filter(b => b.userId === currentUser.id) : [];
  const isAdminCandidate = currentUser?.role === 'admin' || currentUser?.email === 'admin@cleanloop.com';

  return (
    <div className="min-h-screen bg-gray-50 font-outfit">
      {currentPage !== 'login' && currentPage !== 'signup' && (
        <Navbar
          currentUser={currentUser}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}

      <main>
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
          </div>
        }>
          {currentPage === 'home' && (
            <Home onBookNow={handleBookNow} isLoggedIn={!!currentUser} />
          )}

          {currentPage === 'login' && (
            <Login onLogin={handleLogin} onNavigate={handleNavigate} error={authError} />
          )}

          {currentPage === 'signup' && (
            <Signup onSignup={handleSignup} onNavigate={handleNavigate} error={authError} />
          )}

          {currentPage === 'booking' && (
            <BookingPage
              wasteType={selectedWasteType}
              onBookingComplete={handleBookingComplete}
              onCancel={() => setCurrentPage('home')}
            />
          )}

          {currentPage === 'bookings' && (
            <BookingStatus bookings={userBookings} onNavigate={handleNavigate} />
          )}

          {currentPage === 'admin' && isAdminCandidate && (
            <AdminDashboard
              users={allUsers}
              bookings={bookings}
              onUpdateStatus={handleUpdateBookingStatus}
              onRefresh={() => loadData(currentUser!)}
            />
          )}
        </Suspense>
      </main>
    </div>
  );
}

export default App;
