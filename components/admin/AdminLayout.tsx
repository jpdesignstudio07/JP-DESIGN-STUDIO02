import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, Image, Settings as SettingsIcon, LogOut, Menu, X, PlusCircle, User, Tags, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Projects', path: '/admin/projects', icon: Image },
    { name: 'Services', path: '/admin/services', icon: Briefcase },
    { name: 'Categories', path: '/admin/categories', icon: Tags },
    { name: 'Add New Project', path: '/admin/projects/new', icon: PlusCircle },
    { name: 'Site Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex font-sans">
      
      {/* Sidebar - Desktop */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-16 flex items-center justify-center border-b border-gray-700 px-6">
             <div className="text-xl font-bold tracking-wide">
                <span className="text-jp-yellow">JP</span> Admin
             </div>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-700 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-jp-yellow/20 flex items-center justify-center text-jp-yellow">
                <User size={20} />
             </div>
             <div>
                <div className="text-sm font-bold text-white">{user?.name}</div>
                <div className="text-xs text-gray-400 capitalize">{user?.role}</div>
             </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 group ${
                    isActive 
                      ? 'bg-jp-yellow/10 text-jp-yellow' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon 
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-jp-yellow' : 'text-gray-400 group-hover:text-white'}`} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-700">
             <button 
               onClick={handleLogout}
               className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"
             >
               <LogOut className="mr-3 h-5 w-5" />
               Logout
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
           <div className="text-lg font-bold">JP Admin</div>
           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-400 hover:text-white">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-900 p-4 md:p-8">
           <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

    </div>
  );
};