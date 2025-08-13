import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Briefcase, Settings } from 'lucide-react';
import { getUser, removeUser, getUserRole } from '../utils/auth';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const userRole = getUserRole();

  const handleLogout = () => {
    removeUser();
    navigate('/login');
  };

  const getNavItems = () => {
    if (userRole === 'student') {
      return [
        { path: '/student/dashboard', label: 'Dashboard', icon: User },
        { path: '/student/jobs', label: 'Find Jobs', icon: Briefcase },
        { path: '/student/applications', label: 'My Applications', icon: Settings },
      ];
    } else if (userRole === 'recruiter') {
      return [
        { path: '/recruiter/dashboard', label: 'Dashboard', icon: User },
        { path: '/recruiter/jobs', label: 'Manage Jobs', icon: Briefcase },
        { path: '/recruiter/post-job', label: 'Post New Job', icon: Settings },
      ];
    }
    return [];
  };

  if (!user) return children;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  JobPortal
                </span>
              </Link>
              
              <nav className="hidden md:flex space-x-6">
                {getNavItems().map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all ${
                        isActive
                          ? 'text-purple-600 bg-purple-100'
                          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-medium transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;