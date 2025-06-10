// frontend/src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, type ReactNode, useCallback } from 'react'; // <--- Added 'type' keyword for ReactNode here!
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the list of available accent colors
export const ACCENT_COLORS = [
  'cyan', 'blue', 'indigo', 'purple', 'fuchsia', 'rose', 'orange', 'lime', 'emerald', 'teal'
] as const;

// Make the AccentColor type a standalone export for clarity
export type AccentColor = typeof ACCENT_COLORS[number];

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: { username: string; email: string } | null;
  theme: 'light' | 'dark'; // Theme state
  accentColor: AccentColor; // Accent color state
  login: (access: string, refresh: string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
  setTheme: (theme: 'light' | 'dark') => void; // Function to set theme
  setAccentColor: (color: AccentColor) => void; // Function to set accent color
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refresh_token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  // Initialize theme and accent color from localStorage or defaults
  const [theme, setThemeState] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );
  const [accentColor, setAccentColorState] = useState<AccentColor>(
    (localStorage.getItem('accent_color') as AccentColor) || 'cyan'
  );
  const navigate = useNavigate();

  // Function to fetch user details (e.g., username, email)
  const fetchUser = useCallback(async () => { // Wrapped with useCallback
    if (!accessToken) {
      setUser(null);
      setIsAuthenticated(false);
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}user/me/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      logout(); // Logout if token is invalid/expired
    }
  }, [accessToken, navigate]); // Dependencies for useCallback

  // Effect to fetch user data when component mounts or token changes
  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Depend on fetchUser (memoized)

  const login = (access: string, refresh: string) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
    setIsAuthenticated(true);
    // fetchUser will be triggered by accessToken change
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('theme'); // Clear theme preference on logout
    localStorage.removeItem('accent_color'); // Clear accent color preference on logout
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setThemeState('light'); // Reset to default theme on logout
    setAccentColorState('cyan'); // Reset to default accent color on logout
    navigate('/login');
  };

  // Functions to update theme and accent color, and persist to localStorage
  const setTheme = (newTheme: 'light' | 'dark') => {
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  const setAccentColor = (newColor: AccentColor) => {
    localStorage.setItem('accent_color', newColor);
    setAccentColorState(newColor);
  };

  // Axios interceptor for refreshing tokens automatically
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
          originalRequest._retry = true;
          try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}token/refresh/`, {
              refresh: refreshToken
            }, { withCredentials: false });

            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;
            login(newAccessToken, newRefreshToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            logout();
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [refreshToken, navigate, login]); // Added 'login' to dependencies for clarity

  const contextValue = {
    accessToken,
    refreshToken,
    isAuthenticated,
    user,
    theme,
    accentColor,
    login,
    logout,
    fetchUser,
    setTheme,
    setAccentColor,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};