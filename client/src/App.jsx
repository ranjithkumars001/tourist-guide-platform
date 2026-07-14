import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Compass, Database, Globe, Layers, Server, ArrowRight } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import DestinationDetails from './pages/DestinationDetails';
import CreateTrip from './pages/CreateTrip';
import EditTrip from './pages/EditTrip';
import ViewTrip from './pages/ViewTrip';

function Home() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [dbStatus, setDbStatus] = useState('checking');
  const [timestamp, setTimestamp] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await axios.get('/api/health');
        if (response.data && response.data.status === 'UP') {
          setBackendStatus('online');
          setDbStatus(response.data.database === 'connected' ? 'connected' : 'disconnected');
          setTimestamp(new Date(response.data.timestamp).toLocaleTimeString());
        }
      } catch (error) {
        setBackendStatus('offline');
        setDbStatus('unreachable');
        console.error('Error fetching backend health check:', error);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between text-gray-800 relative">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200/80 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-brand-primary/10 p-2 rounded-xl">
              <Compass className="h-6 w-6 text-brand-primary animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                TOURIST
              </h1>
              <p className="text-[10px] text-brand-primary tracking-wider font-semibold uppercase">
                Redesign Active
              </p>
            </div>
          </div>
          
          {/* Connection Badges */}
          <div className="flex space-x-3 text-xs">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-100/80 border border-gray-200">
              <Server className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-gray-600 font-medium">API Server:</span>
              {backendStatus === 'online' ? (
                <span className="text-brand-primary font-bold flex items-center">
                  <span className="h-2 w-2 rounded-full bg-brand-primary inline-block animate-pulse mr-1.5" />
                  ONLINE
                </span>
              ) : backendStatus === 'checking' ? (
                <span className="text-yellow-600 font-bold">CHECKING...</span>
              ) : (
                <span className="text-red-500 font-bold">OFFLINE</span>
              )}
            </div>

            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-100/80 border border-gray-200">
              <Database className="h-3.5 w-3.5 text-gray-500" />
              <span className="text-gray-600 font-medium">Database:</span>
              {dbStatus === 'connected' ? (
                <span className="text-brand-primary font-bold flex items-center">
                  <span className="h-2 w-2 rounded-full bg-brand-primary inline-block mr-1.5" />
                  CONNECTED
                </span>
              ) : dbStatus === 'disconnected' ? (
                <span className="text-orange-500 font-bold">DISCONNECTED</span>
              ) : dbStatus === 'checking' ? (
                <span className="text-yellow-600 font-bold">CHECKING...</span>
              ) : (
                <span className="text-red-500 font-bold">UNREACHABLE</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-16 flex flex-col items-center justify-center relative z-10 text-center">
        <div className="clean-panel max-w-2xl w-full p-8 md:p-12 rounded-3xl relative">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-[10px] text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Modern Travel Redesign
          </div>
          
          <Globe className="h-16 w-16 text-brand-primary mx-auto mb-6 opacity-90 animate-pulse" />
          
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-gray-900">
            Travel Planner Workspace
          </h2>
          
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed text-sm">
            Discover places, plan custom itineraries, and manage itineraries with a clean, high-performance web experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {user ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-6 py-3 bg-brand-primary hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all shadow-md shadow-brand-primary/10 text-sm"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-6 py-3 bg-brand-primary hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 active:scale-[0.98] transition-all shadow-md shadow-brand-primary/10 text-sm"
                >
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl flex items-center justify-center hover:bg-gray-50 active:scale-[0.98] transition-all text-sm"
                >
                  <span>Create Account</span>
                </Link>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="clean-card p-5 rounded-2xl">
              <div className="flex items-center space-x-3 mb-2.5">
                <div className="bg-brand-primary/10 p-2 rounded-lg text-brand-primary">
                  <Layers className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Clean MVC Architecture</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Backend files are organized under <code>server/src/</code> containing dedicated folders for controllers, routes, schemas, and config.
              </p>
            </div>

            <div className="clean-card p-5 rounded-2xl">
              <div className="flex items-center space-x-3 mb-2.5">
                <div className="bg-brand-secondary/10 p-2 rounded-lg text-brand-secondary">
                  <Compass className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Modern Accent Theme</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Design system featuring emerald-green and sky-blue highlights. Styled to provide a premium Airbnb/Booking.com inspired user interface.
              </p>
            </div>
          </div>

          {timestamp && (
            <p className="text-[11px] text-gray-400 mt-8">
              Last status ping at <span className="text-brand-primary font-semibold">{timestamp}</span>
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-gray-200/80 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} Tourist Travel Planner. Scalable Full-Stack Architecture.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/destinations/:id"
            element={
              <ProtectedRoute>
                <DestinationDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/new"
            element={
              <ProtectedRoute>
                <CreateTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/:id"
            element={
              <ProtectedRoute>
                <ViewTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips/:id/edit"
            element={
              <ProtectedRoute>
                <EditTrip />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
