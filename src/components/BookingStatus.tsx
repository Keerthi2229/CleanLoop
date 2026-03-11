import { Clock, CheckCircle, Truck, XCircle, MapPin, Calendar, Inbox } from 'lucide-react';
import { Booking } from '../types';
import { wasteCategories } from '../constants/waste';
import { useMemo } from 'react';

interface BookingStatusProps {
  bookings: Booking[];
  onNavigate: (page: string) => void;
}

export default function BookingStatus({ bookings, onNavigate }: BookingStatusProps) {
  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5" />;
      case 'in-progress':
        return <Truck className="h-5 w-5" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5" />;
    }
  };

  const getStatusClasses = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'confirmed':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'in-progress':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'completed':
        return 'bg-green-50 text-green-600 border-green-100';
      case 'cancelled':
        return 'bg-red-50 text-red-600 border-red-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedBookings = useMemo(() =>
    [...bookings].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    [bookings]
  );

  return (
    <div className="min-h-screen bg-[#fcfdfd] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Activity Tracking</h2>
          <p className="text-gray-500 mt-2 font-semibold">Monitor your current and past pickup requests</p>
        </header>

        {sortedBookings.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-emerald-100/30 p-20 text-center border border-gray-50">
            <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Inbox className="h-10 w-10 text-emerald-300" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">No Request History</h3>
            <p className="text-gray-500 mb-10 font-medium max-w-xs mx-auto">You haven't booked any pickups yet. Start today for a cleaner home.</p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-emerald-600 text-white px-10 py-4 rounded-2xl hover:bg-emerald-700 transition-all font-extrabold shadow-lg shadow-emerald-200 active:scale-95"
            >
              Make Your First Booking
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedBookings.map((booking) => {
              const category = wasteCategories.find(c => c.type === booking.wasteType);
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center space-x-5">
                      <div className={`${category?.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-50 transition-transform group-hover:scale-105`}>
                        <CheckCircle className="text-white h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-gray-900">{category?.name}</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">ID: {booking.id.slice(-8)}</p>
                      </div>
                    </div>

                    <div className={`px-5 py-2.5 rounded-full border ${getStatusClasses(booking.status)} flex items-center space-x-2 font-bold text-sm uppercase tracking-wide`}>
                      {getStatusIcon(booking.status)}
                      <span>{booking.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="bg-white p-2 rounded-xl shadow-sm">
                        <MapPin className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">LOCATION</p>
                        <p className="text-gray-900 font-bold text-sm leading-relaxed">{booking.location.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-white p-2 rounded-xl shadow-sm">
                        <Calendar className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">SCHEDULED FOR</p>
                        <p className="text-gray-900 font-bold text-sm">{formatDate(booking.scheduledTime)}</p>
                      </div>
                    </div>
                  </div>

                  {booking.status === 'in-progress' && (
                    <div className="mt-6 flex items-center space-x-3 p-4 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-100 animate-pulse">
                      <Truck className="h-5 w-5 shrink-0" />
                      <p className="text-sm font-bold">
                        Great news! Our collection team is currently on the way to your location.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
