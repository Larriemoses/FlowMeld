// frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'; // <--- Import PrivateRoute

// Ensure axios global config is loaded (it sets up interceptors etc.)
import './utils/axiosConfig';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Protect the Dashboard route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute> {/* <--- Wrap DashboardPage with PrivateRoute */}
                <DashboardPage />
              </PrivateRoute>
            }
          />
          {/* Add more routes here as we build them */}
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);