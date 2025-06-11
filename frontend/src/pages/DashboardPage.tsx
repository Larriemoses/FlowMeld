
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, ACCENT_COLORS } from '../context/AuthContext';
import type { AccentColor } from '../context/AuthContext';
import { getBaseColorClass, getHoverColorClass, getThemeClasses, getLightAccentButtonTextColor } from '../utils/colors';
// Import icons from react-icons
import { FiHome, FiClipboard, FiUser, FiCpu, FiLogOut, FiSearch, FiBell, FiMenu, FiX, FiCheckCircle, FiBook, FiActivity, FiSettings, FiSun, FiMoon } from 'react-icons/fi';

const DashboardPage: React.FC = () => {
  const { user, logout, fetchUser, theme, setTheme, accentColor, setAccentColor } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const handleLogout = () => {
    logout();
  };

  const displayUsername = user ? user.username : 'Loading...';
  const displayAvatar = user && user.username
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=334155&color=E2E8F0`
    : 'https://via.placeholder.com/40/334155/E2E8F0?text=FL';

  
  const themeClasses = getThemeClasses(theme);

  return (
    <div className={`min-h-screen flex ${themeClasses.bgPrimary} ${themeClasses.textPrimary}`}> {/* Overall dynamic background */}

      {/* Sidebar Overlay for Mobile (Clickable to close sidebar) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Left Sidebar Navigation (Responsive) */}
      <div className={`
        fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 transition-transform duration-200 ease-in-out
        w-64 flex-shrink-0 bg-slate-900 flex flex-col justify-between border-r ${themeClasses.borderCard} z-50 {/* Sidebar always dark */}
        md:flex
      `}>
        {/* Sidebar Content */}
        <div className="flex flex-col justify-between h-full">
          {/* Top Section - Logo & Main Nav */}
          <div className="p-6">
            <div className={`text-4xl font-extrabold ${getBaseColorClass(accentColor, 'text', 700)} mb-8`}>FlowMeld</div> {/* Dynamic logo color */}
            <nav className="space-y-3">
              {/* Active link style - Dashboard */}
              <Link to="/dashboard" className={`flex items-center p-3 rounded-lg text-neutral-100 bg-slate-800 ${getHoverColorClass(accentColor, 'text')} transition-colors duration-200`}>
                <FiHome className="mr-3 text-lg" /> Dashboard
              </Link>
              {/* Inactive link style */}
              <Link to="/tasks" className={`flex items-center p-3 rounded-lg text-neutral-200 hover:bg-slate-800 ${getHoverColorClass(accentColor, 'text')} transition-colors duration-200`}>
                <FiClipboard className="mr-3 text-lg" /> My Tasks
              </Link>
              <Link to="/persona" className={`flex items-center p-3 rounded-lg text-neutral-200 hover:bg-slate-800 ${getHoverColorClass(accentColor, 'text')} transition-colors duration-200`}>
                <FiUser className="mr-3 text-lg" /> My Persona
              </Link>
              <Link to="/daily-planner" className={`flex items-center p-3 rounded-lg text-neutral-200 hover:bg-slate-800 ${getHoverColorClass(accentColor, 'text')} transition-colors duration-200`}>
                <FiCpu className="mr-3 text-lg" /> Daily Planner AI
              </Link>
            </nav>
          </div>

          {/* Bottom Section - User Profile & Logout */}
          <div className={`p-6 border-t ${themeClasses.borderCard}`}>
            <div className="flex items-center mb-4">
              <img src={displayAvatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-3 border-2 border-sky-400" />
              <span className="text-neutral-100 font-semibold">{displayUsername}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-red-400 w-full text-left transition-colors duration-200"
            >
              <FiLogOut className="mr-3 text-lg" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Header Bar (Responsive) */}
        <header className={`p-4 md:p-8 flex justify-between items-center ${themeClasses.bgHeader} shadow-sm border-b ${themeClasses.borderHeader}`}>
          {/* Mobile Menu Toggle (Hamburger) */}
          <button
            className={`md:hidden p-2 rounded-md focus:outline-none focus:ring-2 ${getBaseColorClass(accentColor, 'ring', 400)} ${themeClasses.textCardContent} ${getHoverColorClass(accentColor, 'bg')} mr-4`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>

          <h2 className={`text-2xl md:text-4xl font-bold flex-grow ${themeClasses.textCardHeader}`}>Good morning, {displayUsername}!</h2>
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Bar Placeholder (Hidden on mobile) */}
            <input
              type="text"
              placeholder="Search..."
              className={`hidden md:block px-4 py-2 ${themeClasses.bgInput} border ${themeClasses.borderInput} rounded-md focus:outline-none ${getBaseColorClass(accentColor, 'ring', 400)} ${getBaseColorClass(accentColor, 'border', 400)} ${themeClasses.textInput} ${themeClasses.placeholderInput}`}
            />
            {/* Search Icon (Visible on mobile if search bar is hidden) */}
            <button className={`md:hidden p-2 rounded-full ${themeClasses.bgInput} ${getHoverColorClass(accentColor, 'bg')} ${themeClasses.textCardContent} focus:outline-none ${getBaseColorClass(accentColor, 'ring', 400)}`}>
              <FiSearch className="text-xl" />
            </button>
            {/* Notification Icon */}
            <button className={`p-2 rounded-full ${themeClasses.bgInput} ${getHoverColorClass(accentColor, 'bg')} ${themeClasses.textCardContent} focus:outline-none ${getBaseColorClass(accentColor, 'ring', 400)}`}>
              <FiBell className="text-xl" />
            </button>
            {/* Settings Icon */}
            <button
                className={`p-2 rounded-full ${themeClasses.bgInput} ${getHoverColorClass(accentColor, 'bg')} ${themeClasses.textCardContent} focus:outline-none ${getBaseColorClass(accentColor, 'ring', 400)}`}
                onClick={() => setShowSettings(!showSettings)}
            >
                <FiSettings className="text-xl" />
            </button>
          </div>
        </header>

        {/* Settings Panel */}
        {showSettings && (
            <div className={`p-4 md:p-8 ${themeClasses.bgCard} shadow-md rounded-lg mx-4 md:mx-8 mt-4 ${themeClasses.borderCard} text-sm`}>
                <h3 className={`text-xl font-semibold mb-4 ${getBaseColorClass(accentColor, 'text', 500)}`}>Dashboard Settings</h3>
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                    {/* Theme Switcher */}
                    <div>
                        <label className={`${themeClasses.textCardHeader} block mb-2`}>Theme</label>
                        <div className="flex space-x-2">
                            <button
                                className={`px-4 py-2 rounded-md flex items-center ${theme === 'light' ? getBaseColorClass(accentColor, 'bg', 500) + ' text-white' : themeClasses.bgInput + ' ' + themeClasses.textInput} ${getHoverColorClass(accentColor, 'bg')}`}
                                onClick={() => setTheme('light')}
                            >
                                <FiSun className="mr-2" /> Light
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md flex items-center ${theme === 'dark' ? getBaseColorClass(accentColor, 'bg', 500) + ' text-white' : themeClasses.bgInput + ' ' + themeClasses.textInput} ${getHoverColorClass(accentColor, 'bg')}`}
                                onClick={() => setTheme('dark')}
                            >
                                <FiMoon className="mr-2" /> Dark
                            </button>
                        </div>
                    </div>

                    {/* Accent Color Picker */}
                    <div>
                        <label className={`${themeClasses.textCardHeader} block mb-2`}>Accent Color</label>
                        <div className="flex flex-wrap gap-2">
                            {ACCENT_COLORS.map((color) => (
                                <button
                                    key={color}
                                    className={`w-8 h-8 rounded-full ${getBaseColorClass(color, 'bg', 500)} border-2 ${accentColor === color ? getBaseColorClass(color, 'border', 800) : 'border-transparent'} focus:outline-none focus:ring-2 ${getBaseColorClass(color, 'ring', 300)}`}
                                    onClick={() => setAccentColor(color)}
                                    title={color.charAt(0).toUpperCase() + color.slice(1)}
                                >
                                    {accentColor === color && <FiCheckCircle className="text-white mx-auto my-auto text-lg" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}


        {/* Main Content Grid */}
        <main className={`p-4 md:p-8 flex-1 ${theme === 'light' ? 'bg-white' : 'bg-slate-900'}`}> {/* Main content area background adapts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {/* 1. Daily Focus / AI Suggestions Card (Prominent & Enhanced) */}
            <div className={`${themeClasses.bgCard} p-6 rounded-lg shadow-md ${themeClasses.borderCard} col-span-1 md:col-span-2 lg:col-span-2`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-2xl font-semibold ${getBaseColorClass(accentColor, 'text', 500)}`}>Your Daily Focus</h3>
                <FiCpu className={`${getBaseColorClass(accentColor, 'text', 500)} text-3xl`} />
              </div>
              <p className={`${themeClasses.textCardContent} mb-4 italic leading-relaxed text-base`}>
                "As your AI-powered orchestrator, I've crafted this plan to align with your unique persona
                and current goals. Dive in to achieve seamless productivity!"
              </p>
              <div className={`border-t ${themeClasses.borderCard} pt-4 mt-4`}>
                <h4 className={`text-lg font-medium ${themeClasses.textCardHeader} mb-3`}>Suggested Tasks:</h4>
                <ul className="space-y-3">
                  <li className={`${themeClasses.bgInput} p-3 rounded-md border ${themeClasses.borderInput}`}>
                    <input type="checkbox" className={`mr-3 mt-1 w-5 h-5 ${getBaseColorClass(accentColor, 'text', 600)} ${themeClasses.bgInput} ${themeClasses.borderInput} rounded focus:ring-offset-2 ${getBaseColorClass(accentColor, 'ring', 500)}`} />
                    <div className="flex-1">
                      <p className={`font-medium ${themeClasses.textCardHeader}`}>Deep work on Q2 report</p>
                      <p className={`${themeClasses.textCardContent} text-sm`}>Allocate 2 hours of uninterrupted time.</p>
                    </div>
                    <div className="flex-shrink-0 ml-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High</span>
                      <p className={`${themeClasses.textCardContent} text-xs mt-1`}>2h Est.</p>
                    </div>
                  </li>
                  <li className={`${themeClasses.bgInput} p-3 rounded-md border ${themeClasses.borderInput}`}>
                    <input type="checkbox" className={`mr-3 mt-1 w-5 h-5 ${getBaseColorClass(accentColor, 'text', 600)} ${themeClasses.bgInput} ${themeClasses.borderInput} rounded focus:ring-offset-2 ${getBaseColorClass(accentColor, 'ring', 500)}`} />
                    <div className="flex-1">
                      <p className={`font-medium ${themeClasses.textCardHeader}`}>Clear email inbox</p>
                      <p className={`${themeClasses.textCardContent} text-sm`}>Process urgent emails and archive others.</p>
                    </div>
                    <div className="flex-shrink-0 ml-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Medium</span>
                      <p className={`${themeClasses.textCardContent} text-xs mt-1`}>30m Est.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <button className={`mt-4 ${getBaseColorClass(accentColor, 'bg', 500)} ${getHoverColorClass(accentColor, 'bg')} text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${getBaseColorClass(accentColor, 'ring', 300)} transition-colors duration-200`}>
                Generate New Plan
              </button>
            </div>

            {/* 2. My Tasks Overview Card (Enhanced) */}
            <div className={`${themeClasses.bgCard} p-6 rounded-lg shadow-md ${themeClasses.borderCard} col-span-1`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-semibold ${getBaseColorClass(accentColor, 'text', 500)}`}>Tasks at a Glance</h3>
                <FiClipboard className={`${getBaseColorClass(accentColor, 'text', 500)} text-2xl`} />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`${themeClasses.bgInput} p-4 rounded-md text-center ${themeClasses.borderInput}`}>
                  <p className={`text-4xl font-bold ${getBaseColorClass(accentColor, 'text', 500)}`}>3</p>
                  <p className={`${themeClasses.textCardContent} text-sm`}>High Priority</p>
                </div>
                <div className={`${themeClasses.bgInput} p-4 rounded-md text-center ${themeClasses.borderInput}`}>
                  <p className={`text-4xl font-bold ${getBaseColorClass(accentColor, 'text', 500)}`}>5</p>
                  <p className={`${themeClasses.textCardContent} text-sm`}>Due Today</p>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                <li className={`flex items-center ${themeClasses.textCardHeader} text-sm`}>
                  <FiCheckCircle className="text-green-500 mr-2" />
                  <span className="font-medium">Finish Frontend UI</span>
                  <span className={`${themeClasses.textCardContent} ml-auto`}>Today</span>
                </li>
                <li className={`flex items-center ${themeClasses.textCardHeader} text-sm`}>
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  <span className="font-medium">Deploy Backend</span>
                  <span className={`${themeClasses.textCardContent} ml-auto`}>Tomorrow</span>
                </li>
              </ul>
              <button className={`${getBaseColorClass(accentColor, 'bg', 500)} ${getHoverColorClass(accentColor, 'bg')} text-white font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${getBaseColorClass(accentColor, 'ring', 300)} transition-colors duration-200`}>
                Add New Task
              </button>
            </div>

            {/* 3. My Persona Snapshot Card (Enhanced) */}
            <div className={`${themeClasses.bgCard} p-6 rounded-lg shadow-md ${themeClasses.borderCard} col-span-1`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-semibold ${getBaseColorClass(accentColor, 'text', 500)}`}>Your Persona</h3>
                <FiUser className={`${getBaseColorClass(accentColor, 'text', 500)} text-2xl`} />
              </div>
              <p className={`${themeClasses.textCardContent} mb-4 leading-relaxed text-sm`}>
                "Meet {user?.username || 'user'}! Your AI orchestrator sees you as a proactive and goal-oriented individual,
                driven by a desire for seamless productivity. Let's unlock your full potential together!"
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`${themeClasses.bgInput} ${getBaseColorClass(accentColor, 'text', 600)} text-sm px-3 py-1 rounded-full`}>Organized</span>
                <span className={`${themeClasses.bgInput} ${getBaseColorClass(accentColor, 'text', 600)} text-sm px-3 py-1 rounded-full`}>Goal-oriented</span>
                <span className={`${themeClasses.bgInput} ${getBaseColorClass(accentColor, 'text', 600)} text-sm px-3 py-1 rounded-full`}>Proactive</span>
              </div>
              <button className={`${getBaseColorClass(accentColor, 'bg', 300)} ${getHoverColorClass(accentColor, 'bg')} ${getLightAccentButtonTextColor(accentColor, theme)} font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${getBaseColorClass(accentColor, 'ring', 300)} transition-colors duration-200`}>
                Update Persona
              </button>
            </div>

            {/* Optional: Add more cards like Progress/Insights, Calendar Quick View, etc. */}
            <div className={`${themeClasses.bgCard} p-6 rounded-lg shadow-md ${themeClasses.borderCard} col-span-1`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-semibold ${getBaseColorClass(accentColor, 'text', 500)}`}>Quick Links</h3>
                    <FiBook className={`${getBaseColorClass(accentColor, 'text', 500)} text-2xl`} />
                </div>
                <nav className="space-y-2">
                    <a href="#" className={`flex items-center p-2 rounded-md ${getHoverColorClass(accentColor, 'bg')} ${themeClasses.textCardContent}`}>Analytics</a>
                    <a href="#" className={`flex items-center p-2 rounded-md ${getHoverColorClass(accentColor, 'bg')} ${themeClasses.textCardContent}`}>Team Collaboration</a>
                    <a href="#" className={`flex items-center p-2 rounded-md ${getHoverColorClass(accentColor, 'bg')} ${themeClasses.textCardContent}`}>Content Drafts</a>
                </nav>
            </div>
            <div className={`${themeClasses.bgCard} p-6 rounded-lg shadow-md ${themeClasses.borderCard} col-span-1`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-semibold ${getBaseColorClass(accentColor, 'text', 500)}`}>Activity Feed</h3>
                    <FiActivity className={`${getBaseColorClass(accentColor, 'text', 500)} text-2xl`} />
                </div>
                <ul className="space-y-2 text-sm">
                    <li className={`${themeClasses.textCardContent}`}>Task "<span className={`${getBaseColorClass(accentColor, 'text', 500)} font-medium`}>Q2 Report</span>" marked complete. <span className={`${themeClasses.textCardContent} text-xs ml-auto`}>5 min ago</span></li>
                    <li className={`${themeClasses.textCardContent}`}>New persona trait "<span className={`${getBaseColorClass(accentColor, 'text', 500)} font-medium`}>Insightful</span>" added. <span className={`${getBaseColorClass(accentColor, 'text', 500)} font-medium`}>1 hour ago</span></li>
                    <li className={`${themeClasses.textCardContent}`}>Daily plan generated. <span className={`${themeClasses.textCardContent} text-xs ml-auto`}>2 hours ago</span></li>
                </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;