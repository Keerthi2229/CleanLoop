import { Users, Package, TrendingUp, MapPin, RefreshCw } from 'lucide-react';
import { Booking, User } from '../types';
import { wasteCategories } from '../constants/waste';
import { useState, useMemo } from 'react';

interface AdminDashboardProps {
  users: User[];
  bookings: Booking[];
  onUpdateStatus?: (id: string, status: Booking['status']) => void;
  onRefresh?: () => void;
}

export default function AdminDashboard({ users, bookings, onUpdateStatus, onRefresh }: AdminDashboardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Optimize: Use a Set for O(1) lookups
  const userIds = useMemo(() => new Set(users.map(u => u.id)), [users]);

  // Filter ONLY bookings made by normal users (those in the users array) - Memoized
  const normalUserBookings = useMemo(() =>
    bookings.filter(b => userIds.has(b.userId)),
    [bookings, userIds]
  );

  const stats = useMemo(() => ({
    totalUsers: users.length,
    totalBookings: normalUserBookings.length,
    completedBookings: normalUserBookings.filter(b => b.status === 'completed').length,
    pendingBookings: normalUserBookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length
  }), [users.length, normalUserBookings]);

  const sortedBookings = useMemo(() =>
    [...normalUserBookings].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    [normalUserBookings]
  );

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      await onRefresh();
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Monitor incoming pickup requests from standard users</p>
          </div>
          <button
            onClick={handleRefresh}
            className={`flex items-center space-x-2 px-6 py-3 bg-white text-emerald-600 font-bold rounded-2xl shadow-sm border border-emerald-100 transition-all hover:bg-emerald-50 active:scale-95 ${isRefreshing ? 'opacity-50' : ''}`}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Standard Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">New Requests</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalBookings}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Package className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Handled</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.completedBookings}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Awaiting Action</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pendingBookings}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Package className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Standard User List</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-bold">
                        {(user.name || 'U').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name || 'Standard User'}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
              ))}
              {users.length === 0 && <p className="text-center text-gray-400 py-8 font-medium">No users found</p>}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pickup Requests</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {sortedBookings.map((booking) => {
                const category = wasteCategories.find(c => c.type === booking.wasteType);
                const user = users.find(u => u.id === booking.userId);
                return (
                  <div
                    key={booking.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`${category?.color} w-8 h-8 rounded flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">
                            {category?.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{category?.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          value={booking.status}
                          onChange={(e) => onUpdateStatus?.(booking.id, e.target.value as Booking['status'])}
                          className={`text-xs px-2 py-1 rounded-full border-0 focus:ring-2 focus:ring-emerald-500 font-medium ${booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'in-progress' ? 'bg-emerald-100 text-emerald-700' :
                              booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                          <option value="pending">pending</option>
                          <option value="confirmed">confirmed</option>
                          <option value="in-progress">in-progress</option>
                          <option value="completed">completed</option>
                          <option value="cancelled">cancelled</option>
                        </select>

                        {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                          <button
                            onClick={() => onUpdateStatus?.(booking.id, 'completed')}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Mark as Completed"
                          >
                            <TrendingUp className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-600 truncate">{booking.location.address}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {user?.name || 'Anonymous'} • {formatDate(booking.scheduledTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {sortedBookings.length === 0 && <p className="text-center text-gray-400 py-8 font-medium">No pickup requests yet</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
