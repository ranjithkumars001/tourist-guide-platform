import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-gray-800 relative">
        <div className="clean-panel p-8 rounded-3xl flex flex-col items-center max-w-sm w-full mx-4 relative z-10 text-center bg-white">
          <div className="bg-brand-primary/10 p-3 rounded-xl mb-4 text-brand-primary">
            <Compass className="h-8 w-8 animate-spin-slow" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Authenticating</h3>
          <p className="text-xs text-gray-500">Verifying session details, please wait...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
