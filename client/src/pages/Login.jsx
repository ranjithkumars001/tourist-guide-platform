import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Compass, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message || 'Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-gray-800 px-4 relative overflow-hidden">
      {/* Brand Header */}
      <div className="flex items-center space-x-3 mb-8 relative z-10">
        <div className="bg-brand-primary/10 p-2 rounded-xl">
          <Compass className="h-6 w-6 text-brand-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          TOURIST
        </h1>
      </div>

      {/* Login Card */}
      <div className="clean-panel w-full max-w-md p-8 rounded-3xl relative z-10 bg-white">
        <h2 className="text-2xl font-extrabold text-center mb-1 tracking-tight text-gray-900">
          Welcome Back
        </h2>
        <p className="text-xs text-gray-500 text-center mb-6">
          Sign in to your account to resume your itineraries
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
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 focus:outline-none text-sm transition-all placeholder:text-gray-400 text-gray-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 focus:outline-none text-sm transition-all placeholder:text-gray-400 text-gray-800"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-primary hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-brand-primary/10 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:pointer-events-none mt-2"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-primary hover:text-emerald-700 font-semibold hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
