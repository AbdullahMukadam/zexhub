
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { FiGithub, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Templates', path: '/templates' },
    { name: 'Showcase', path: '/showcase' },
    { name: 'Tools', path: '/tools' },
    { name: 'UI Components', path: '/components' },
    { name: 'Productivity', path: '/productivity' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#020202]/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center h-16 px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-white hover:opacity-80 transition-opacity z-50">
          <span className="text-sm tracking-wide font-sans">ZexHub</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className="text-sm font-medium text-util-gray hover:text-white transition-colors font-sans"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-sans text-util-gray/60 px-2 py-1 bg-white/5 rounded border border-white/5">
                {user.login}
              </span>
              <button 
                onClick={handleLogout}
                className="text-xs font-bold text-white hover:text-red-400 transition-colors uppercase tracking-wider font-sans"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={login}
              className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 border border-white/10 px-4 py-2 rounded-md hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-sans"
            >
              <FiGithub className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors z-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 top-16 z-40 bg-[#020202] border-b border-white/10 md:hidden flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {/* Mobile Links */}
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className="text-lg font-bold text-util-gray hover:text-white transition-colors font-sans py-2 border-b border-white/5"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth */}
              <div className="mt-4 pt-4 border-t border-white/10">
                {isAuthenticated && user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-util-accent/10 flex items-center justify-center border border-util-accent/20">
                        <span className="text-xs font-bold text-util-accent font-sans">{user.login.charAt(0).toUpperCase()}</span>
                      </div>
                      <span className="text-sm font-sans text-white">
                        {user.login}
                      </span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left text-sm font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider font-sans py-2"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={login}
                    className="w-full flex items-center justify-center gap-2 text-sm font-bold text-black bg-white border border-white px-4 py-3 rounded-md hover:bg-gray-200 transition-all duration-300 font-sans"
                  >
                    <FiGithub className="w-5 h-5" />
                    <span>Login with GitHub</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
