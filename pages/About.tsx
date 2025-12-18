import React from 'react';
import { Section } from '../components/Section';
import { STATS } from '../constants';
import { SEO } from '../components/SEO';
import { Reveal } from '../components/Reveal';

export const About: React.FC = () => {
  return (
    <div>
      <SEO 
        title="About JP Design Studio - Creative Vision & Mission" 
        description="Learn about JP Design Studio's mission to help businesses communicate with clarity through innovative and strategic graphic design."
        keywords="About Graphic Designer, Design Studio Mission, Brand Strategy, Creative Vision"
      />
      {/* SECTION 1 — HERO */}
      <div className="bg-jp-dark pt-28 pb-8 md:pt-36 md:pb-12 text-center px-6">
        <Reveal>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Design That Makes Brands <span className="text-jp-yellow">Unforgettable</span></h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            With a passion for creativity and attention to detail, I help businesses build strong visual identities.
          </p>
        </Reveal>
      </div>

      {/* SECTION 2 — STORY / INTRO */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <Reveal>
            <img 
              src="https://picsum.photos/seed/designerjp/800/1000" 
              alt="JP Designer" 
              className="rounded-xl shadow-xl border border-white/10 w-full object-cover h-64 md:h-[400px] hover:scale-[1.02] transition-transform duration-500"
            />
          </Reveal>
          
          <Reveal delay={200}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">My Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed text-base md:text-lg">
                <p>
                  I’m JP, a graphic designer with <span className="font-bold text-jp-yellow">4+ years of experience</span> creating modern and impactful designs for businesses across multiple industries.
                </p>
                <p>
                  My focus is on delivering clean, clear, and meaningful visuals that connect brands with their audiences. Whether it's a startup looking for an identity or an established brand needing a refresh, I bring strategic thinking to every pixel.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 3 — MISSION & VISION */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <Reveal>
            <div className="bg-jp-card p-6 md:p-10 rounded-xl shadow-sm border border-white/5 border-l-4 border-l-jp-yellow hover:-translate-y-2 transition-transform duration-300 h-full">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Mission</h3>
              <p className="text-gray-300 text-base md:text-lg">
                To create designs that are meaningful, visually engaging, and results-driven. I believe in design that not only looks good but solves problems.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="bg-jp-card p-6 md:p-10 rounded-xl shadow-sm border border-white/5 border-l-4 border-l-gray-600 hover:-translate-y-2 transition-transform duration-300 h-full">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Vision</h3>
              <p className="text-gray-300 text-base md:text-lg">
                To be a top creative studio known for quality, innovation, and trust. Building long-term relationships with clients through exceptional work.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 4 — STATS */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          {STATS.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="p-4 border border-white/10 rounded-lg bg-jp-card/30 hover:bg-jp-card transition-colors duration-300">
                <div className="text-3xl md:text-5xl font-bold text-jp-yellow mb-2">{stat.value}</div>
                <div className="text-gray-300 font-medium text-sm md:text-base">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
};