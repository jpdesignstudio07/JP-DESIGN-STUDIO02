import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { useContent } from '../contexts/ContentContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { headerLogo } = useContent();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Initialize theme state from localStorage or default to dark
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as 'light' | 'dark';
    }
    return 'dark';
  });

  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Theme Toggle Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Handle scroll effect for transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isOpen 
          ? 'bg-transparent py-3' 
          : isScrolled 
            ? 'bg-jp-dark/90 backdrop-blur-md py-3 shadow-lg' 
            : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center relative z-50">
          
          {/* Logo (Left) */}
          <a href="/" className="text-2xl font-bold text-white tracking-wide flex items-center gap-0.5" onClick={handleLogoClick}>
            {headerLogo ? (
              <img src={headerLogo} alt="JP Design Studio" className="h-10 w-auto object-contain" />
            ) : (
              <>
                <span className="text-[#FFD80E]">JP</span>
                <span>Design</span>
              </>
            )}
          </a>

          {/* Right Side Container (Links + Theme Btn + Call Btn) */}
          <div className="hidden lg:flex items-center gap-8">
            
            {/* Navigation Links */}
            <div className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-bold tracking-wide transition-colors duration-300 relative group py-1 ${
                      isActive ? 'text-[#FFD80E]' : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#FFD80E] transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors duration-300 border border-white/10"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Book a Call Button (Animated) */}
              <Link 
                to="/contact" 
                className="relative px-7 py-3 rounded-full bg-[#FFD80E] overflow-hidden group shadow-[0_0_20px_rgba(255,216,14,0.3)] hover:shadow-[0_0_30px_rgba(255,216,14,0.5)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></div>
                {/* Use explicit dark color for button text so it's readable in light mode */}
                <span className="relative z-10 font-bold text-[#24233A]">Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Mobile Actions (Theme Toggle + Menu Button) */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors duration-300"
                aria-label="Toggle theme"
              >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            
            <button
              className="text-white focus:outline-none p-2 transition-transform duration-300 active:scale-95"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} className="text-[#FFD80E]" /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Liquid Glass Effect */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-y-auto overflow-x-hidden ${
          isOpen ? 'opacity-100 visible backdrop-blur-3xl bg-jp-dark/20' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Decorative elements for liquid feel */}
        <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-jp-yellow/10 rounded-full blur-[120px] pointer-events-none animate-float"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-float-delayed"></div>

        <div className="flex flex-col items-center justify-start min-h-screen pt-32 pb-10 px-6 space-y-8 w-full relative z-10">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `text-3xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  isActive ? 'text-[#FFD80E] drop-shadow-[0_0_15px_rgba(255,216,14,0.3)]' : 'text-white/90 hover:text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-8">
             <Link 
               to="/contact" 
               className="relative px-12 py-5 rounded-full bg-[#FFD80E] overflow-hidden group shadow-[0_0_30px_rgba(255,216,14,0.3)] text-xl font-bold text-[#24233A] inline-block hover:scale-105 transition-transform duration-300"
               onClick={closeMenu}
             >
               Contact Us
             </Link>
          </div>
        </div>
      </div>

      {/* Gradient Line below navigation */}
      <div 
        className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-jp-yellow/50 to-transparent transition-opacity duration-500 ${
          isScrolled && !isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </nav>
  );
};