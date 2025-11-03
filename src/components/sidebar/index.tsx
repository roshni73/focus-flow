import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  User
} from 'lucide-react';
import clsx from 'clsx';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  roles: string[];
}

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      path: '/admin/dashboard',
      roles: ['admin', 'viewer']
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 size={20} />,
      path: '/admin/analytics',
      roles: ['admin', 'viewer']
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: <User size={20} />,
      path: '/admin/profile',
      roles: ['admin', 'viewer']
    },
    {
      id: 'users',
      label: 'User Management',
      icon: <Users size={20} />,
      path: '/admin/users',
      roles: ['admin']
    },
    {
      id: 'content',
      label: 'Content Management',
      icon: <FileText size={20} />,
      path: '/admin/content',
      roles: ['admin']
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: <Settings size={20} />,
      path: '/admin/settings',
      roles: ['admin']
    },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(user?.role || 'viewer')
  );

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={clsx(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-200",
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;