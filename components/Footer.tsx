import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useContent } from '../contexts/ContentContext';
import { useServices } from '../contexts/ServiceContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { footerLogo } = useContent();
  const { services } = useServices();

  // Custom links list as requested
  const footerLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer id="footer" className="bg-[#1A1929] text-white pt-20 pb-10 border-t border-white/5 overflow-hidden relative">
      {/* Decorative Background Element: Top Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-jp-yellow/50 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Identity */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-bold tracking-tight flex items-center gap-1 group">
              {footerLogo ? (
                <img src={footerLogo} alt="JP Design Studio" className="h-10 w-auto object-contain" />
              ) : (
                <>
                  <span className="text-jp-yellow group-hover:animate-pulse">JP</span>
                  <span>Design</span>
                </>
              )}
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Elevating brands through strategic design and creative storytelling. We turn complex ideas into simple, powerful visuals.
            </p>
            <div className="flex gap-3">
              {[Instagram, Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-jp-yellow hover:text-jp-dark hover:-translate-y-1 transition-all duration-300"
                  aria-label="Social Link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="text-gray-400 hover:text-jp-yellow text-sm transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-jp-yellow/50 mr-2 group-hover:bg-jp-yellow transition-colors"></span>
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-jp-yellow text-sm font-medium hover:underline mt-2 inline-block">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-jp-yellow text-sm transition-colors hover:translate-x-1 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li>
                <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</div>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-white hover:text-jp-yellow transition-colors font-medium flex items-center gap-2 break-all">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Phone</div>
                <div className="text-gray-300">{CONTACT_INFO.phone}</div>
              </li>
              <li>
                <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Location</div>
                <div className="text-gray-300">{CONTACT_INFO.location}</div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {currentYear} JP Design Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-jp-yellow transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-jp-yellow transition-colors">Terms of Service</Link>
            <Link to="/login" className="hover:text-jp-yellow transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};