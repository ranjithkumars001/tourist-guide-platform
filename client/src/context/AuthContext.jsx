import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure Axios defaults on load/state change
  const setAxiosHeader = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAxiosHeader(token);
        try {
          const response = await axios.get('/api/auth/me');
          if (response.data && response.data.success) {
            setUser(response.data.data);
          } else {
            localStorage.removeItem('token');
            setAxiosHeader(null);
          }
        } catch (err) {
          console.error('Failed to load user info:', err);
          localStorage.removeItem('token');
          setAxiosHeader(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data && response.data.success) {
        const { token, ...userData } = response.data.data;
        localStorage.setItem('token', token);
        setAxiosHeader(token);
        setUser(userData);
        setLoading(false);
        return true;
      }
    } catch (err) {
      console.error('Login failed:', err);
      const errMsg = err.response?.data?.message || 'Invalid email or password';
      setError(errMsg);
      setLoading(false);
      throw new Error(errMsg);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/register', { username, email, password });
      if (response.data && response.data.success) {
        const { token, ...userData } = response.data.data;
        localStorage.setItem('token', token);
        setAxiosHeader(token);
        setUser(userData);
        setLoading(false);
        return true;
      }
    } catch (err) {
      console.error('Registration failed:', err);
      const errMsg = err.response?.data?.message || 'Registration failed';
      setError(errMsg);
      setLoading(false);
      throw new Error(errMsg);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAxiosHeader(null);
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
