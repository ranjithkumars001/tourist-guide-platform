import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Compass, LogOut, Calendar, MapPin, Tag, ArrowLeft, AlertCircle } from 'lucide-react';

const EditTrip = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`/api/trips/${id}`);
        if (response.data && response.data.success) {
          const trip = response.data.data;
          setName(trip.name);
          setDestination(trip.destination);
          setStartDate(trip.startDate.substring(0, 10));
          setEndDate(trip.endDate.substring(0, 10));
        }
      } catch (err) {
        console.error('Error fetching trip details:', err);
        setFormError('Failed to fetch trip details. It may not exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name || !destination || !startDate || !endDate) {
      setFormError('Please fill in all fields');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      setFormError('End date cannot be before start date');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(`/api/trips/${id}`, {
        name,
        destination,
        startDate,
        endDate
      });

      if (response.data && response.data.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error updating trip:', err);
      setFormError(err.response?.data?.message || 'Failed to update trip. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-800 relative overflow-x-hidden">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-brand-primary/10 p-2 rounded-xl">
              <Compass className="h-6 w-6 text-brand-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                TOURIST
              </h1>
              <p className="text-[10px] text-brand-primary tracking-wider font-semibold uppercase">
                Trip Planner
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-xs font-bold text-gray-600 hover:text-brand-primary transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-gray-300">|</span>
            <div className="hidden sm:block text-right">
              <div className="text-sm font-bold text-gray-900">{user?.username}</div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 active:scale-[0.97] transition-all shadow-sm"
            >
              <LogOut className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-xl mx-auto px-6 py-12 relative z-10">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Dashboard
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="bg-brand-primary/10 p-3 rounded-xl mb-4 text-brand-primary">
              <Compass className="h-8 w-8 animate-spin-slow" />
            </div>
            <p className="text-sm text-gray-500">Loading trip details...</p>
          </div>
        ) : (
          /* Edit Card */
          <div className="clean-panel p-8 rounded-3xl bg-white shadow-sm border border-gray-200">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-1">
              Edit Trip Details
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Update your itinerary configurations below.
            </p>

            {formError && (
              <div className="flex items-center space-x-2 bg-red-50 border border-red-100 text-red-600 p-3.5 rounded-xl text-xs mb-5">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Trip Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <Tag className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 focus:outline-none text-sm transition-all text-gray-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Destination
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 focus:outline-none text-sm transition-all text-gray-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 focus:outline-none text-sm transition-all text-gray-800"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 focus:outline-none text-sm transition-all text-gray-800"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-primary hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-brand-primary/10 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:pointer-events-none mt-4"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-gray-200 text-center text-xs text-gray-400 bg-white">
        <p>&copy; {new Date().getFullYear()} Tourist Travel Planner. Scalable Full-Stack Architecture.</p>
      </footer>
    </div>
  );
};

export default EditTrip;
