// frontend/src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth(); //

  // Remove the useEffect for CSRF token fetching as it's no longer needed with JWT
  useEffect(() => {
    // const fetchAndLogCsrfToken = async () => { ... };
    // fetchAndLogCsrfToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

  
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      // --- CRITICAL CHANGE: Use JWT Token Endpoint ---
      const response = await axios.post(`${API_BASE_URL}token/`, { // <--- Changed URL to /api/token/
        username,
        password,
      }, {
        // withCredentials: false because JWT does NOT rely on cookies (it's handled by token in headers)
        // Axios defaults is already withCredentials = true, so we explicitly set to false here or change global default later.
        // For now, let's explicitly set it here to be safe.
        withCredentials: false, // JWT auth does not use cookies
        headers: {
          'Content-Type': 'application/json', // JWT endpoints typically expect JSON
          // 'X-CSRFToken': csrfToken || '', // <--- REMOVE THIS HEADER!
        },
      });

    if (response.status === 200) {
        console.log('Login successful! JWT tokens received:', response.data);
        login(response.data.access, response.data.refresh); // <--- Use context's login function
        navigate('/dashboard'); // Redirect to dashboard/ Redirect to dashboard
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 400 || err.response.status === 401) { // 401 Unauthorized for invalid credentials
          setError('Invalid username or password. Please try again.');
        } else {
          setError(`Login failed: ${err.response.status} ${err.response.statusText}`);
        }
        console.error('Login API error:', err.response.data);
      } else {
        setError('An unexpected error occurred. Please try again later.');
        console.error('Unexpected error during login:', err);
      }
    }
  };



  return (
    <div className="min-h-screen flex bg-slate-950"> {/* Main flex container, overall deep dark background */}

      {/* Left Column - Illustration / Branding (Hidden on mobile, 50% width on desktop) */}
      <div className="hidden md:flex md:w-1/2 relative items-center justify-center overflow-hidden">
        {/* Background Illustration Container - fills this column */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dvl2r3bdw/image/upload/f_auto,q_auto/v1749566313/scheduling-forming-filling-timetable-digital-calendar-time-management-arranging-controlling-optimizing-effective-plans-organization-vector-isolated-concept-metaphor-illustration_sprvkn.png')"
          }}
        ></div>
        {/* Semi-transparent Overlay for Contrast */}
        <div className="absolute inset-0 bg-slate-950 opacity-70"></div> {/* Adjust opacity as needed */}

    
      </div>

      {/* Right Column - Form Card (Full width on mobile, 50% on desktop) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        {/* Form Card */}
        <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md text-neutral-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-cyan-400">FlowMeld</h1>
            <p className="text-slate-300 text-lg mt-2">Your AI-Powered Orchestrator</p>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-cyan-400 text-center">Login to FlowMeld</h2>
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-400 focus:border-sky-400 text-neutral-100"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-400 focus:border-sky-400 text-neutral-100"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-neutral-100 bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-slate-300">
            Don't have an account? <Link to="/register" className="font-medium text-sky-400 hover:text-sky-500">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;