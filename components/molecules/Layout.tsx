import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../molecules/Navbar';
import useAuthStore from '../../store/useAuthStore';
import useThemeStore from '../../store/useThemeStore';

const Layout = () => {
  const { logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Navbar onLogout={handleLogout} onToggleTheme={toggleTheme} />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
