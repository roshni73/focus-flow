import { NavLink, useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Users,
  BarChart3,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'viewer'] },
    { to: '/admin/users', icon: Users, label: 'Users', roles: ['admin'] },
    { to: '/admin/charts', icon: BarChart3, label: 'Charts', roles: ['admin', 'viewer'] },
    { to: '/admin/profile', icon: UserCircle, label: 'Profile', roles: ['admin', 'viewer'] },
  ];

  const filteredNavItems = navItems.filter(item =>
    user?.role && item.roles.includes(user.role)
  );

  // Simple conditional class names without cn
  const overlayClass = collapsed
    ? "opacity-0 pointer-events-none"
    : "opacity-100";

  const sidebarClass = collapsed
    ? "-translate-x-full lg:translate-x-0 w-0 lg:w-20"
    : "w-64";

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 lg:hidden z-40 transition-opacity ${overlayClass}`}
        onClick={onToggle}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${sidebarClass}`}
      >
        {/* Logo & Toggle */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-semibold">F</span>
              </div>
              <span className="font-semibold">FocusFlow</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => {
                const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";
                const activeClasses = isActive
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900";
                const collapsedClass = collapsed ? "justify-center" : "";

                return `${baseClasses} ${activeClasses} ${collapsedClass}`;
              }}
            >
              <item.icon size={20} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {!collapsed && user && (
            <div className="px-4 py-2 mb-2">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">{user.name}</p>
                  <p className="text-gray-500 text-xs capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50 w-full ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={20} />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}