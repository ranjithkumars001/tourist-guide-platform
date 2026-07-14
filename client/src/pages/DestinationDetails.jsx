import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Compass, LogOut, MapPin, Star, Calendar, ArrowLeft, CheckCircle } from 'lucide-react';

const DestinationDetails = () => {
  const { id } = useParams();
  const { user, logout } = useAuth();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        const response = await axios.get(`/api/destinations/${id}`);
        if (response.data && response.data.success) {
          setDestination(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching destination details:', err);
        setError('Failed to load destination details. It may not exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationDetails();
  }, [id]);

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
                Destination Profile
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/explore"
              className="text-xs font-bold text-gray-600 hover:text-brand-primary transition-colors"
            >
              Explore
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
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/explore"
            className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Explore
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="bg-brand-primary/10 p-3 rounded-xl mb-4 text-brand-primary">
              <Compass className="h-8 w-8 animate-spin-slow" />
            </div>
            <p className="text-sm text-gray-500">Loading details, please wait...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm text-center my-10 max-w-md mx-auto">
            {error}
          </div>
        )}

        {/* Details View */}
        {!loading && !error && destination && (
          <div className="clean-panel rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-200">
            {/* Hero Image */}
            <div className="w-full h-80 bg-gray-100 relative">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white pointer-events-none">
                <div className="flex items-center space-x-1.5 text-xs text-emerald-300 font-bold uppercase tracking-wider mb-1">
                  <MapPin className="h-4 w-4" />
                  <span>{destination.location}</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight">{destination.name}</h2>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-yellow-50 px-3 py-1.5 rounded-full flex items-center space-x-1.5 border border-yellow-100">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold text-gray-800">{destination.rating} / 5.0 Rating</span>
                  </div>
                </div>

                {destination.bestTimeToVisit && (
                  <div className="flex items-center space-x-2 text-gray-600 text-xs font-semibold">
                    <Calendar className="h-4 w-4 text-brand-primary" />
                    <span>Best Time: {destination.bestTimeToVisit}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="prose max-w-none text-gray-600 text-sm leading-relaxed mb-8">
                <p className="text-base text-gray-900 font-medium mb-4 italic">
                  "{destination.description}"
                </p>
                <p className="whitespace-pre-line">
                  {destination.detailedDescription || 'No additional details provided.'}
                </p>
              </div>

              {/* Highlights */}
              {destination.highlights && destination.highlights.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base mb-4">Key Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-700 text-sm bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                        <CheckCircle className="h-4 w-4 text-brand-primary shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

export default DestinationDetails;
