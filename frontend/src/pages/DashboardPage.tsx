// frontend/src/pages/DashboardPage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// You might want to use react-icons for icons later (e.g., FaHome, FaTasks)
// import { FaHome, FaTasks, FaUser, FaRobot, FaSignOutAlt } from 'react-icons/fa'; // Example icons

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real application, you would:
    // 1. Send a POST request to your backend's logout endpoint (e.g., /api/auth/logout/)
    // 2. Clear any local storage tokens (if using Token Auth) or client-side session state
    // For session auth, Django handles clearing the session on backend.
    console.log("User logged out (client-side simulation)");
    navigate('/login'); // Redirect to login page
  };

  // Placeholder for user info (will fetch from API later)
  const currentUser = { username: 'larriemoses', avatar: 'https://via.placeholder.com/40/334155/E2E8F0?text=LM' }; // Placeholder avatar

  return (
    <div className="min-h-screen flex bg-slate-950 text-neutral-100"> {/* Overall dark theme background */}

      {/* Left Sidebar Navigation */}
      <div className="w-64 flex-shrink-0 bg-slate-900 flex flex-col justify-between border-r border-slate-700">
        {/* Top Section - Logo & Main Nav */}
        <div className="p-6">
          <div className="text-4xl font-extrabold text-cyan-400 mb-8">FlowMeld</div>
          <nav className="space-y-3">
            <Link to="/dashboard" className="flex items-center p-3 rounded-lg text-neutral-200 hover:bg-slate-800 hover:text-cyan-400 transition-colors duration-200 bg-slate-800 text-cyan-400"> {/* Active link */}
              {/* <FaHome className="mr-3" /> */}
              Dashboard
            </Link>
            <Link to="/tasks" className="flex items-center p-3 rounded-lg text-neutral-200 hover:bg-slate-800 hover:text-cyan-400 transition-colors duration-200">
              {/* <FaTasks className="mr-3" /> */}
              My Tasks
            </Link>
            <Link to="/persona" className="flex items-center p-3 rounded-lg text-neutral-200 hover:bg-slate-800 hover:text-cyan-400 transition-colors duration-200">
              {/* <FaUser className="mr-3" /> */}
              My Persona
            </Link>
            <Link to="/daily-planner" className="flex items-center p-3 rounded-lg text-neutral-200 hover:bg-slate-800 hover:text-cyan-400 transition-colors duration-200">
              {/* <FaRobot className="mr-3" /> */}
              Daily Planner AI
            </Link>
            {/* Future links: Team, Content Studio, Settings */}
          </nav>
        </div>

        {/* Bottom Section - User Profile & Logout */}
        <div className="p-6 border-t border-slate-700">
          <div className="flex items-center mb-4">
            <img src={currentUser.avatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-3 border-2 border-sky-400" />
            <span className="text-neutral-100 font-semibold">{currentUser.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-red-400 w-full text-left transition-colors duration-200"
          >
            {/* <FaSignOutAlt className="mr-3" /> */}
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-4xl font-bold text-neutral-100">Good morning, {currentUser.username}!</h2>
          <div className="flex items-center space-x-4">
            {/* Search Bar Placeholder */}
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-400 text-neutral-100 placeholder-slate-400"
            />
            {/* Notification Icon Placeholder */}
            <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 focus:outline-none focus:ring-1 focus:ring-sky-400">
              {/* Notification Icon */} {/* E.g., <FaBell /> */}
              🔔
            </button>
          </div>
        </header>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 1. Daily Focus / AI Suggestions Card (Prominent) */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-cyan-500 col-span-1 md:col-span-2"> {/* Takes 2 columns on medium screens */}
            <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Your Daily Focus</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              "A highly ambitious individual seeking efficiency to balance demanding work and personal growth.
              Focus on high-priority tasks, allocate distraction-free blocks, and review progress."
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start text-neutral-100">
                <span className="text-cyan-500 mr-2 mt-1">✓</span>
                <div>
                  <span className="font-medium">Deep work on Q2 report:</span> Allocate 2 hours of uninterrupted time. <span className="text-slate-400 text-sm">(Priority: Critical, Est: 2h)</span>
                </div>
              </li>
              <li className="flex items-start text-neutral-100">
                <span className="text-cyan-500 mr-2 mt-1">✓</span>
                <div>
                  <span className="font-medium">Clear email inbox:</span> Process urgent emails and archive others. <span className="text-slate-400 text-sm">(Priority: Medium, Est: 30m)</span>
                </div>
              </li>
              <li className="flex items-start text-neutral-100">
                <span className="text-cyan-500 mr-2 mt-1">✓</span>
                <div>
                  <span className="font-medium">Review project roadmap:</span> Check progress against Q2 goals and adjust if necessary. <span className="text-slate-400 text-sm">(Priority: High, Est: 1h)</span>
                </div>
              </li>
            </ul>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-neutral-100 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300 transition-colors duration-200">
              Generate New Plan
            </button>
          </div>

          {/* 2. My Tasks Overview Card */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-sky-400">
            <h3 className="text-xl font-semibold mb-4 text-sky-400">Tasks at a Glance</h3>
            <div className="grid grid-cols-2 gap-4 text-center mb-4">
              <div>
                <p className="text-4xl font-bold text-cyan-400">3</p>
                <p className="text-slate-300 text-sm">High Priority</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-cyan-400">5</p>
                <p className="text-slate-300 text-sm">Due Today</p>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-neutral-100">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                <span className="font-medium">Finish Frontend UI</span>
                <span className="ml-auto text-slate-400 text-sm">Today</span>
              </li>
              <li className="flex items-center text-neutral-100">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                <span className="font-medium">Deploy Backend</span>
                <span className="ml-auto text-slate-400 text-sm">Tomorrow</span>
              </li>
            </ul>
            <button className="bg-sky-500 hover:bg-sky-600 text-neutral-100 font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 transition-colors duration-200">
              Add New Task
            </button>
          </div>

          {/* 3. My Persona Snapshot Card */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-emerald-400"> {/* Using emerald for a green accent */}
            <h3 className="text-xl font-semibold mb-4 text-emerald-400">Your Persona</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              "A highly ambitious individual seeking efficiency to balance demanding work and personal growth."
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-slate-700 text-sky-400 text-sm px-3 py-1 rounded-full">Organized</span>
              <span className="bg-slate-700 text-sky-400 text-sm px-3 py-1 rounded-full">Goal-oriented</span>
              <span className="bg-slate-700 text-sky-400 text-sm px-3 py-1 rounded-full">Proactive</span>
            </div>
            <button className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-medium py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 transition-colors duration-200">
              Update Persona
            </button>
          </div>

          {/* Optional: Add more cards like Progress/Insights, Calendar Quick View, etc. */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;