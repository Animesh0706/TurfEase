import React from 'react';
import { useApp } from '../context/AppContext';
import { Menu, X, User, LogOut } from 'lucide-react';

const Header = () => {
  const { currentPage, setCurrentPage, user, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'Booking', page: 'booking' },
    { name: 'Features', page: 'features' }
  ];

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <h1 className="text-2xl font-bold text-emerald-700">TurfEase</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name || 'Dashboard'}</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3 py-2 text-left text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {user ? (
                <>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavClick('login')}
                  className="mx-3 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;