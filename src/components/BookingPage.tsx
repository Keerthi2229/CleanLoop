import { useState, useEffect } from 'react';
import { MapPin, Clock, Navigation, Calendar, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { WasteType } from '../types';
import { wasteCategories } from '../constants/waste';

interface BookingPageProps {
  wasteType: WasteType | null;
  onBookingComplete: (address: string, lat: number, lng: number, scheduledTime: string) => void;
  onCancel: () => void;
}

export default function BookingPage({ wasteType, onBookingComplete, onCancel }: BookingPageProps) {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const category = wasteCategories.find(c => c.type === wasteType);

  const getCurrentLocation = () => {
    setLocationError('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setAddress(`Precision Coordinates: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          setLocationError('Precision location access denied. Please type your address below.');
          console.error('Location error:', error);
        }
      );
    } else {
      setLocationError('Geolocation not supported by this browser.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address || !scheduledDate || !scheduledTime) {
      alert('Please complete all fields to proceed.');
      return;
    }

    const scheduledDateTime = `${scheduledDate}T${scheduledTime}:00`;
    const lat = location?.lat || 40.7128 + Math.random() * 0.1;
    const lng = location?.lng || -74.0060 + Math.random() * 0.1;

    onBookingComplete(address, lat, lng, scheduledDateTime);
  };

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    setScheduledDate(minDate);
  }, []);

  if (!category) return null;

  return (
    <div className="min-h-screen bg-[#fcfdfd] py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <button
          onClick={onCancel}
          className="flex items-center space-x-2 text-gray-500 hover:text-emerald-600 font-bold mb-8 group transition-colors"
        >
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Categories</span>
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-100/50 overflow-hidden border border-gray-50">
          <div className="p-10 lg:p-12">
            <header className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Schedule Pickup</h2>
                  <p className="text-gray-500 mt-2 font-semibold">Tell us where and when to collect your {category.name.toLowerCase()}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-3xl">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-16 w-16 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4 p-5 bg-gray-50 rounded-3xl border border-gray-100">
                <div className={`${category.color} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-100`}>
                  <CheckCircle2 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900">{category.name}</h4>
                  <p className="text-sm text-gray-500 font-medium line-clamp-1">{category.description}</p>
                </div>
              </div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="flex items-center text-sm font-bold text-gray-700 ml-1">
                  <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                  PICKUP ADDRESS
                </label>

                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="w-full md:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-bold hover:bg-emerald-100 transition-all border border-emerald-100"
                  >
                    <Navigation className="h-5 w-5" />
                    <span>Auto-detect My Location</span>
                  </button>

                  {locationError && (
                    <p className="text-sm text-red-500 font-bold flex items-center bg-red-50 p-3 rounded-xl border border-red-100">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                      {locationError}
                    </p>
                  )}

                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-3xl focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none font-medium min-h-[120px]"
                    placeholder="Type your full address here (House No, Street, Landmark...)"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center text-sm font-bold text-gray-700 ml-1">
                    <Calendar className="h-4 w-4 mr-2 text-emerald-500" />
                    COLLECTION DATE
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none font-bold"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center text-sm font-bold text-gray-700 ml-1">
                    <Clock className="h-4 w-4 mr-2 text-emerald-500" />
                    TIME WINDOW
                  </label>
                  <select
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none font-bold appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Choose a slot</option>
                    <option value="08:00">Early Morning (08:00 - 10:00)</option>
                    <option value="10:00">Late Morning (10:00 - 12:00)</option>
                    <option value="12:00">Early Afternoon (12:00 - 14:00)</option>
                    <option value="14:00">Late Afternoon (14:00 - 16:00)</option>
                    <option value="16:00">Evening (16:00 - 18:00)</option>
                  </select>
                </div>
              </div>

              <div className="pt-8 flex flex-col md:flex-row gap-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-[1.5rem] hover:bg-gray-200 transition-all font-extrabold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-emerald-600 text-white py-5 rounded-[1.5rem] hover:bg-emerald-700 transition-all duration-300 font-extrabold shadow-xl shadow-emerald-200 active:scale-[0.98]"
                >
                  Confirm Pickup Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
