import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LogOut, Compass, MapPin, Calendar, Plus, Globe, Users, Trash2, Edit, Eye, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrips = async () => {
    try {
      const response = await axios.get('/api/trips');
      if (response.data && response.data.success) {
        setTrips(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching trips:', err);
      setError('Failed to fetch your trips. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        const response = await axios.delete(`/api/trips/${id}`);
        if (response.data && response.data.success) {
          setTrips(trips.filter((trip) => trip._id !== id));
        }
      } catch (err) {
        console.error('Error deleting trip:', err);
        alert(err.response?.data?.message || 'Failed to delete trip. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Color options for the trip card headers to make them look vibrant and premium
  const headerColors = [
    'from-emerald-500/10 to-teal-500/10 text-emerald-600',
    'from-sky-500/10 to-blue-500/10 text-sky-600',
    'from-orange-500/10 to-amber-500/10 text-orange-600',
    'from-pink-500/10 to-rose-500/10 text-rose-600',
  ];

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
                Dashboard Active
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/explore"
              className="text-xs font-bold text-brand-primary hover:text-emerald-700 transition-colors mr-2"
            >
              Explore Destinations
            </Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <div className="hidden sm:block text-right">
              <div className="text-sm font-bold text-gray-900">{user?.username}</div>
              <div className="text-[10px] text-gray-500">{user?.email}</div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 active:scale-[0.97] transition-all shadow-sm"
            >
              <LogOut className="h-3.5 w-3.5 text-gray-500" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Welcome Back, {user?.username}!
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Plan your next journey or resume custom itineraries.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="clean-panel p-6 rounded-2xl flex items-center space-x-4">
            <div className="bg-emerald-50 p-3 rounded-xl text-brand-primary">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{loading ? '...' : trips.length}</div>
              <div className="text-xs text-gray-500 font-medium">Total Trips</div>
            </div>
          </div>

          <div className="clean-panel p-6 rounded-2xl flex items-center space-x-4">
            <div className="bg-sky-50 p-3 rounded-xl text-brand-secondary">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {loading ? '...' : [...new Set(trips.map((t) => t.destination.toLowerCase()))].length}
              </div>
              <div className="text-xs text-gray-500 font-medium">Destinations</div>
            </div>
          </div>

          <div className="clean-panel p-6 rounded-2xl flex items-center space-x-4">
            <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-xs text-gray-500 font-medium">Travel Groups</div>
            </div>
          </div>
        </div>

        {/* Trips Sections */}
        <div className="clean-panel p-8 rounded-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Your Itineraries</h3>
              <p className="text-xs text-gray-500 mt-0.5">Manage and edit your travel plans</p>
            </div>
            <Link
              to="/trips/new"
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-emerald-700 active:scale-[0.98] text-xs font-semibold text-white transition-all shadow-md shadow-brand-primary/10"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Trip</span>
            </Link>
          </div>

          {/* Loading state inside dashboard list */}
          {loading && (
            <div className="py-16 text-center">
              <div className="bg-brand-primary/10 p-3 rounded-xl mb-4 text-brand-primary inline-block">
                <Compass className="h-8 w-8 animate-spin-slow" />
              </div>
              <p className="text-sm text-gray-500">Loading your itineraries...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm text-center mb-8 max-w-md mx-auto flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Trip Cards */}
          {!loading && !error && (
            trips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trips.map((trip, idx) => {
                  const color = headerColors[idx % headerColors.length];
                  const parts = color.split(' ');
                  return (
                    <div key={trip._id} className="clean-card p-5 rounded-2xl flex flex-col justify-between group">
                      <div>
                        <div className={`w-full h-32 rounded-xl bg-gradient-to-tr ${parts[0]} ${parts[1]} mb-4 relative overflow-hidden flex items-center justify-center`}>
                          <Compass className={`h-10 w-10 ${parts[2]} opacity-40 group-hover:scale-110 transition-transform duration-500`} />
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-base text-gray-900 group-hover:text-brand-primary transition-colors">
                            {trip.name}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-1.5 text-xs text-gray-500 mb-1">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          <span>{trip.destination}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <button
                          onClick={() => handleDelete(trip._id)}
                          className="flex items-center space-x-1 text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                          title="Delete Trip"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>

                        <div className="flex items-center space-x-3">
                          <Link
                            to={`/trips/${trip._id}/edit`}
                            className="flex items-center space-x-1 text-xs font-bold text-gray-500 hover:text-brand-primary transition-colors"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Edit</span>
                          </Link>
                          
                          <Link
                            to={`/trips/${trip._id}`}
                            className="flex items-center space-x-1 text-xs font-bold text-brand-primary hover:text-emerald-700 transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View Itinerary</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-3xl p-8 max-w-md mx-auto">
                <Compass className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h4 className="font-bold text-gray-800 text-sm mb-1">No trips planned yet</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6">
                  Ready to explore the world? Start by creating your very first travel itinerary.
                </p>
                <Link
                  to="/trips/new"
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-emerald-700 text-xs font-bold text-white transition-all shadow-md shadow-brand-primary/10"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Your First Trip</span>
                </Link>
              </div>
            )
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-gray-200 text-center text-xs text-gray-400 bg-white">
        <p>&copy; {new Date().getFullYear()} Tourist Travel Planner. Scalable Full-Stack Architecture.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
