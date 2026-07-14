import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Compass, LogOut, MapPin, Calendar, ArrowLeft, Edit, AlertCircle } from 'lucide-react';

const ViewTrip = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`/api/trips/${id}`);
        if (response.data && response.data.success) {
          setTrip(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching trip details:', err);
        setError('Failed to load trip details. It may not exist or you may not have permission to view it.');
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
                Itinerary Viewer
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
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-12 relative z-10">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Dashboard
          </Link>

          {!loading && !error && trip && (
            <Link
              to={`/trips/${trip._id}/edit`}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-sm transition-all"
            >
              <Edit className="h-3.5 w-3.5 text-gray-500" />
              <span>Edit Trip</span>
            </Link>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="bg-brand-primary/10 p-3 rounded-xl mb-4 text-brand-primary">
              <Compass className="h-8 w-8 animate-spin-slow" />
            </div>
            <p className="text-sm text-gray-500">Loading trip itinerary...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm text-center my-10 max-w-md mx-auto flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Trip Profile details */}
        {!loading && !error && trip && (
          <div className="space-y-6">
            <div className="clean-panel rounded-3xl p-8 bg-white shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 text-xs font-bold text-brand-primary tracking-wider uppercase mb-1">
                <MapPin className="h-4 w-4" />
                <span>{trip.destination}</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                {trip.name}
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">Start:</span>
                  <span>{formatDate(trip.startDate)}</span>
                </div>
                <div className="hidden sm:block text-gray-300">|</div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">End:</span>
                  <span>{formatDate(trip.endDate)}</span>
                </div>
              </div>
            </div>

            {/* Itinerary details Card Placeholder */}
            <div className="clean-panel rounded-3xl p-8 bg-white border border-gray-200">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Daily Itinerary Plans</h3>
              <p className="text-xs text-gray-500 mb-6">Create activities and schedule events for your trip days.</p>
              
              <div className="border border-dashed border-gray-200 rounded-2xl p-10 text-center">
                <Compass className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <h4 className="font-bold text-sm text-gray-800 mb-1">No activities listed</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mb-4">
                  Add places, flights, hotel reservations, or excursions to visualize your schedule here.
                </p>
                <button className="px-4 py-2 rounded-xl bg-brand-primary/10 hover:bg-brand-primary/15 text-brand-primary text-xs font-bold transition-all">
                  + Add Activity
                </button>
              </div>
            </div>
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

export default ViewTrip;
