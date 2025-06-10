// frontend/src/pages/RegisterPage.tsx
import React, { useState, useEffect } from 'react'; // useEffect is still needed for clarity even if removed from the core
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Remove the getCookie helper function from here
// function getCookie(name: string) { ... }

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  // Remove the useEffect for CSRF token fetching
  useEffect(() => {
    // const fetchAndLogCsrfToken = async () => { ... };
    // fetchAndLogCsrfToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Remove console.logs for cookies and getCookie call
    // console.log('Cookies before POST request (in handleSubmit):', document.cookie);
    // const csrfToken = getCookie('csrftoken');

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.post(`${API_BASE_URL}register/`, {
        username,
        email,
        password,
      }, {
        // withCredentials: false because JWT does NOT rely on cookies
        withCredentials: false,
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRFToken': csrfToken || '', // <--- REMOVE THIS HEADER!
        },
      });

      if (response.status === 201) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        let errorMessage = 'Registration failed. Please try again.';
        if (err.response.data.username) {
            errorMessage = `Username: ${Array.isArray(err.response.data.username) ? err.response.data.username.join(', ') : err.response.data.username}`;
        } else if (err.response.data.email) {
            errorMessage = `Email: ${Array.isArray(err.response.data.email) ? err.response.data.email.join(', ') : err.response.data.email}`;
        } else if (err.response.data.password) {
            errorMessage = `Password: ${Array.isArray(err.response.data.password) ? err.response.data.password.join(', ') : err.response.data.password}`;
        } else if (err.response.data.detail) {
            errorMessage = err.response.data.detail;
        }

        setError(errorMessage);
        console.error('Registration error details:', err.response.data);
      } else {
        setError('An unexpected error occurred. Please try again later.');
        console.error('Unexpected error:', err);
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

        {/* Branding/Marketing Text (positioned above overlay) */}
        <div className="relative z-10 text-center p-8">
          <h1 className="text-6xl font-extrabold text-cyan-400 mb-4">FlowMeld</h1>
          <p className="text-neutral-100 text-2xl max-w-md mx-auto leading-relaxed">
            Unlock unparalleled productivity and seamless organization with AI.
          </p>
          {/* Optional: Add more compelling marketing points or a small illustration here */}
        </div>
      </div>

      {/* Right Column - Form Card (Full width on mobile, 50% on desktop) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        {/* Form Card */}
        <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md text-neutral-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-cyan-400">FlowMeld</h1>
            <p className="text-slate-300 text-lg mt-2">Your AI-Powered Orchestrator</p>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-cyan-400 text-center">Register for FlowMeld</h2>
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          {success && <p className="text-green-400 text-center mb-4">{success}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-400 focus:border-sky-400 text-neutral-100"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-400 focus:border-sky-400 text-neutral-100"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 text-neutral-100"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-neutral-100 bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300"
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-slate-300">
            Already have an account? <Link to="/login" className="font-medium text-sky-400 hover:text-sky-500">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;