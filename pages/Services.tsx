import React from 'react';
import { Section } from '../components/Section';
import { CONTACT_INFO } from '../constants';
import { Button } from '../components/Button';
import { MessageCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useServices } from '../contexts/ServiceContext';
import { DynamicIcon } from '../utils/iconHelper';
import { Reveal } from '../components/Reveal';

export const Services: React.FC = () => {
  const { services } = useServices();
  const whatsappNumber = CONTACT_INFO.phone.replace(/\s+/g, '');
  const whatsappUrl = `https://wa.me/91${whatsappNumber}`;

  return (
    <div>
      <SEO 
        title="Graphic Design Services - Logo, UI/UX, Social Media" 
        description="Explore our full range of design services: Custom Logos, Brand Identity, Social Media Posts, Packaging, and Web Design tailored for your growth."
        keywords="Logo Design, Social Media Marketing, Flyer Design, Packaging Design, YouTube Thumbnails, UI/UX Design Services"
      />
      {/* SECTION 1 — HERO */}
      <div className="bg-jp-dark pt-28 pb-8 md:pt-36 md:pb-12 text-center px-6">
        <Reveal>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Creative Design Services for <span className="text-jp-yellow">Every Brand</span></h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            From logos to social media to print design — everything you need under one roof.
          </p>
        </Reveal>
      </div>

      {/* SECTION 2 — SERVICES GRID */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <Reveal key={service.id} delay={idx * 100}>
              <div className="group bg-jp-card p-6 md:p-8 rounded-xl shadow-lg border border-white/5 hover:border-jp-yellow transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:-translate-y-2">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-jp-dark rounded-full flex items-center justify-center mb-6 text-jp-yellow border border-white/5 group-hover:bg-jp-yellow group-hover:text-jp-dark transition-colors duration-300">
                  <DynamicIcon name={service.icon} size={28} className="md:w-8 md:h-8 group-hover:animate-bounce-subtle" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 flex-grow mb-6 text-sm md:text-base">{service.description}</p>
                <Button 
                  to="/contact" 
                  variant="primary" 
                  className="w-full rounded-full font-bold shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30"
                >
                  Get Quote
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      
      {/* Call to Action */}
      <Section className="bg-jp-card border-t border-b border-white/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-jp-yellow to-transparent opacity-30"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-jp-yellow/5 rounded-full blur-3xl pointer-events-none"></div>

        <Reveal>
          <div className="text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">Need a Custom Package?</h2>
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              I offer tailored design packages for startups and businesses needing ongoing support. Let's discuss your specific needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button to="/contact" variant="primary">
                  Contact for Custom Quote
              </Button>
              
              <Button 
                  onClick={() => window.open(whatsappUrl, '_blank')}
                  variant="secondary"
                  className="flex items-center gap-2 border-green-500/20 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 group"
              >
                  <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                  <span>Chat on WhatsApp</span>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
};