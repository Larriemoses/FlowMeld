// frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage.tsx';

// <--- IMPORT YOUR AXIOS GLOBAL CONFIG HERE ---
import './utils/axiosConfig'; // Just importing it makes the interceptor run
// --- END AXIOS GLOBAL CONFIG IMPORT ---

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Add more routes here as we build them */}
      </Routes>
    </Router>
  </React.StrictMode>,
);