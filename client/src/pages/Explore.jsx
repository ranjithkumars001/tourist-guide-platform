import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Compass, LogOut, MapPin, Star, Search, ArrowLeft } from 'lucide-react';

const Explore = () => {
  const { user, logout } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('/api/destinations');
        if (response.data && response.data.success) {
          setDestinations(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Failed to load destinations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                Explore Destinations
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Page Title & Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center space-x-2 mb-2 text-xs font-bold text-brand-primary tracking-wider uppercase">
              <Link to="/dashboard" className="flex items-center hover:underline">
                <ArrowLeft className="h-3 w-3 mr-1" /> Back to Dashboard
              </Link>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Explore Destinations
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find inspiration for your next itinerary from our curated selection.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 focus:outline-none text-sm transition-all text-gray-800"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="bg-brand-primary/10 p-3 rounded-xl mb-4 text-brand-primary">
              <Compass className="h-8 w-8 animate-spin-slow" />
            </div>
            <p className="text-sm text-gray-500">Loading destinations, please wait...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm text-center my-10 max-w-md mx-auto">
            {error}
          </div>
        )}

        {/* Main Grid */}
        {!loading && !error && (
          filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDestinations.map((dest) => (
                <Link
                  key={dest._id}
                  to={`/destinations/${dest._id}`}
                  className="clean-card rounded-2xl overflow-hidden flex flex-col group"
                >
                  {/* Destination Card Image */}
                  <div className="w-full h-48 bg-gray-100 overflow-hidden relative">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm border border-gray-100">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-[11px] font-bold text-gray-900">{dest.rating}</span>
                    </div>
                  </div>

                  {/* Destination Card Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-base text-gray-900 group-hover:text-brand-primary transition-colors">
                        {dest.name}
                      </h4>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2 mt-0.5">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        <span>{dest.location}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-brand-primary flex items-center justify-between">
                      <span>Explore details</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl p-8 max-w-md mx-auto">
              <p className="text-sm text-gray-500">No destinations found matching your search.</p>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-gray-200 text-center text-xs text-gray-400 bg-white">
        <p>&copy; {new Date().getFullYear()} Tourist Travel Planner. Scalable Full-Stack Architecture.</p>
      </footer>
    </div>
  );
};

export default Explore;
