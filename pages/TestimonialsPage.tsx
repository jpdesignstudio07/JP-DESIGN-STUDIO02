import React from 'react';
import { Section } from '../components/Section';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { Reveal } from '../components/Reveal';

// Extend the existing testimonials for the grid
const ALL_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS];

export const TestimonialsPage: React.FC = () => {
  return (
    <div>
      <div className="bg-jp-dark pt-28 pb-8 md:pt-36 md:pb-12 text-center px-6">
        <Reveal>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Client Testimonials</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Real feedback from clients who trust my creativity.
          </p>
        </Reveal>
      </div>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ALL_TESTIMONIALS.map((t, index) => (
            <Reveal key={`${t.id}-${index}`} delay={index * 50}>
              <div className="bg-jp-card p-6 md:p-8 rounded-xl shadow-lg border border-white/5 hover:border-jp-yellow/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative flex flex-col h-full">
                 <Quote className="absolute top-6 right-6 text-white/5 rotate-180" size={60} fill="currentColor" />
                 
                 <div className="flex text-jp-yellow mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                
                <p className="text-gray-300 mb-6 italic text-base md:text-lg leading-relaxed relative z-10 flex-grow">"{t.text}"</p>
                
                <div className="flex items-center gap-3">
                  {t.image ? (
                     <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-jp-yellow/50" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-jp-dark text-white flex items-center justify-center font-bold border border-white/10">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-xs text-gray-500 font-medium uppercase">{t.role || 'Verified Client'}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
};