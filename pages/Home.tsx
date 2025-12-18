import React from 'react';
import { Star, Quote, Image as ImageIcon, ShieldCheck, Clock, Users, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { SectionHeader } from '../components/SectionHeader';
import { SEO } from '../components/SEO';
import { STATS, TESTIMONIALS, CONTACT_INFO } from '../constants';
import { useProjects } from '../contexts/ProjectContext';
import { useContent } from '../contexts/ContentContext';
import { useServices } from '../contexts/ServiceContext';
import { DynamicIcon } from '../utils/iconHelper';
import { Reveal } from '../components/Reveal';

export const Home: React.FC = () => {
  const { projects } = useProjects();
  const { services } = useServices();
  const { 
    heroImage, 
    heroTitleLine1, 
    heroHighlightWord, 
    heroTitleLine2, 
    heroDescription,
    clientLogos 
  } = useContent();
  
  // Duplicate testimonials multiple times to create a seamless loop regardless of screen width
  const SLIDER_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  // Duplicate logos multiple times (6x) for seamless slider if we have enough, otherwise just show them
  // This ensures that even with a small number of logos, the row is wide enough to scroll smoothly without gaps
  const baseLogos = clientLogos.length > 0 ? clientLogos : [];
  const SLIDER_LOGOS = baseLogos.length > 0 
    ? [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos] 
    : [];

  // Filter projects that actually have images for the featured section
  const featuredProjects = projects.filter(p => p.image && p.image.trim() !== '').slice(0, 6);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <SEO 
        title="Best Graphic Design Agency & Brand Identity Experts" 
        description={heroDescription || "JP Design Studio offers top-tier graphic design, logo branding, social media creatives, and UI/UX solutions. Transform your business with professional design."}
        keywords="Graphic Design, Logo Design, Brand Identity, UI/UX, Social Media Creatives, Web Design, Creative Agency"
      />

      {/* SECTION 1 — HERO SECTION */}
      <div className="relative bg-jp-dark min-h-screen flex items-center pt-44 md:pt-52 lg:pt-40 pb-20">
        
        {/* Background Shapes */}
        <div className="absolute top-0 right-0 w-[45%] h-full bg-[#3B4D80] rounded-l-[80px] hidden lg:block z-0 opacity-20 pointer-events-none blur-3xl transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-jp-yellow/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            
            {/* Left Column: Typography */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <Reveal>
                {/* Badge */}
                <div className="inline-block mb-6">
                  <div className="px-4 py-1.5 rounded-full border border-white/10 bg-jp-card/80 backdrop-blur-sm">
                    <span className="text-jp-yellow font-semibold text-xs md:text-sm tracking-wide">Professional Graphic Designer & Visual Creator</span>
                  </div>
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-white tracking-tight mb-6">
                  {heroTitleLine1 || 'Creative Graphic Design That'} <br/>
                  <span className="relative inline-block mt-1 md:mt-2">
                    <span className="relative z-10">{heroHighlightWord || 'Elevates'}</span>
                    {/* Yellow Underline Graphic */}
                    <svg className="absolute w-full h-3 md:h-4 -bottom-1 left-0 z-0 text-jp-yellow" viewBox="0 0 200 20" preserveAspectRatio="none" fill="currentColor">
                       <path d="M5,15 Q50,5 100,15 T195,15" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                    </svg>
                  </span> <br/>
                  {heroTitleLine2 || 'Your Brand'}
                </h1>
                
                <p className="text-base md:text-lg text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light mb-8">
                  {heroDescription || 'Craft modern, strategic, and visually powerful designs for businesses worldwide. From logo design to social media marketing, let\'s turn your ideas into a visual reality.'}
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                  <Button to="/contact" variant="primary" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-full shadow-[0_0_20px_rgba(255,216,14,0.3)] hover:shadow-[0_0_35px_rgba(255,216,14,0.6)] transition-shadow duration-300">
                    Start Your Project →
                  </Button>
                  <Button to="/portfolio" variant="secondary" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-full border-white/10 bg-jp-card/50 hover:bg-jp-card">
                    View Portfolio
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Visual Composition */}
            <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
                <Reveal delay={200}>
                  {/* Main Card Container */}
                  <div className="relative w-full max-w-xl lg:max-w-2xl aspect-[4/3] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-jp-card group">
                      
                      {heroImage ? (
                        <img 
                          src={heroImage} 
                          alt="JP Design Studio Hero" 
                          className="w-full h-full object-cover p-[50px] group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-gray-900/50">
                            <ImageIcon size={64} className="mb-4 opacity-50" />
                            <span className="text-sm font-medium">No Hero Image Set</span>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-jp-dark/90 via-transparent to-transparent pointer-events-none"></div>

                      {/* Floating Element 1 */}
                      <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-white w-12 h-12 md:w-16 md:h-16 rounded-2xl shadow-xl flex items-center justify-center animate-float z-20">
                         <span className="text-2xl md:text-3xl font-bold font-serif text-jp-yellow">Aa</span>
                      </div>

                      {/* Floating Element 2 */}
                      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-[#1E1E1E] border border-gray-700 p-3 md:p-4 rounded-xl shadow-2xl animate-float-delayed z-20 w-36 md:w-44">
                         <div className="flex gap-1.5 mb-3">
                           <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-red-500"></div>
                           <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-yellow-500"></div>
                           <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500"></div>
                         </div>
                         <div className="space-y-2">
                           <div className="h-2 bg-gray-600 rounded-full w-full"></div>
                           <div className="h-2 bg-gray-600 rounded-full w-3/4"></div>
                           <div className="flex gap-2 mt-2">
                              <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-jp-yellow"></div>
                              <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-blue-500"></div>
                              <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-purple-500"></div>
                           </div>
                         </div>
                      </div>

                  </div>
                </Reveal>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 2 — SERVICES OVERVIEW */}
      <Section>
        <Reveal>
          <SectionHeader 
            title="What I Do" 
            subtitle="Creative solutions crafted to meet your brand’s needs." 
          />
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 100}>
              <div className="bg-jp-card p-6 md:p-8 rounded-xl shadow-lg border border-white/5 hover:border-jp-yellow hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-jp-dark rounded-lg flex items-center justify-center mb-5 group-hover:bg-jp-yellow transition-colors duration-300 border border-white/5">
                  <DynamicIcon name={service.icon} className="text-jp-yellow group-hover:text-jp-dark group-hover:animate-bounce-subtle" size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={300}>
          <div className="text-center mt-10">
            <Button to="/services" variant="secondary">View All Services</Button>
          </div>
        </Reveal>
      </Section>

      {/* SECTION 3 — ABOUT / MISSION VISION + NUMBERS */}
      <Section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <Reveal>
              <SectionHeader 
                title="About JP Design Studio" 
                subtitle="Creativity powered by strategy and experience."
                center={false}
              />
              <div className="space-y-6 text-gray-300">
                 <div>
                   <h4 className="text-jp-yellow font-bold text-lg md:text-xl mb-1">Mission</h4>
                   <p className="text-sm md:text-base">To deliver innovative and impactful design solutions that help brands communicate with clarity.</p>
                 </div>
                 <div>
                   <h4 className="text-jp-yellow font-bold text-lg md:text-xl mb-1">Vision</h4>
                   <p className="text-sm md:text-base">To be a trusted creative partner for businesses worldwide.</p>
                 </div>
              </div>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {STATS.map((stat, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-jp-card/50 p-4 md:p-6 rounded-lg text-center border border-white/10 hover:border-jp-yellow transition-colors hover:bg-jp-card cursor-default">
                  <div className="text-3xl md:text-4xl font-bold text-jp-yellow mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-gray-300 text-xs md:text-sm uppercase tracking-wide">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION — TRUSTED BY INDUSTRY LEADERS (AUTO SLIDER) */}
      {SLIDER_LOGOS.length > 0 && (
        <Section className="relative overflow-hidden !py-8 md:!py-12">
          
          <Reveal>
            <div className="text-center mb-8 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Trusted by Industry <br className="hidden md:block"/>
                  <span className="text-jp-yellow">
                    Leaders & Innovators
                  </span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                  We're proud to partner with visionary companies that trust us to deliver exceptional results and drive their digital transformation.
                </p>
            </div>
          </Reveal>

          {/* Auto Slider Container */}
          <Reveal delay={200}>
            <div className="relative w-full overflow-hidden mask-fade py-4">
                <div className="flex animate-scroll gap-12 md:gap-16 items-center w-max px-4 hover:pause-on-hover">
                    {SLIDER_LOGOS.map((client, index) => (
                      <div key={`${client.id}-${index}`} className="flex-shrink-0">
                         <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center p-2 shadow-lg hover:scale-110 transition-transform duration-300 border-[3px] border-white/10 overflow-hidden">
                            {client.logo ? (
                              <img 
                                src={client.logo} 
                                alt={client.name} 
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span className="text-gray-500 font-bold text-xs">{client.name}</span>
                            )}
                         </div>
                      </div>
                    ))}
                </div>
            </div>
          </Reveal>
        </Section>
      )}

      {/* SECTION 4 — PORTFOLIO PREVIEW */}
      {featuredProjects.length > 0 && (
        <Section>
          <Reveal>
            <SectionHeader 
              title="Featured Projects" 
              subtitle="A curated selection of my best work." 
            />
          </Reveal>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-10">
            {featuredProjects.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 100}>
                <div className="group relative overflow-hidden rounded-xl aspect-square shadow-md cursor-pointer border border-white/10">
                  <img 
                    src={project.image} 
                    alt="Project Thumbnail" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-jp-dark/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                    <h4 className="font-bold text-base md:text-lg mb-1">{project.title}</h4>
                    <span className="text-jp-yellow text-xs md:text-sm">{project.category}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          
          <Reveal>
            <div className="text-center">
              <Button to="/portfolio" variant="primary">View Full Portfolio</Button>
            </div>
          </Reveal>
        </Section>
      )}

      {/* SECTION 5 — TESTIMONIALS SLIDER */}
      <div className="py-10 md:py-20 bg-jp-dark overflow-hidden">
         <div className="container mx-auto px-6 mb-10">
           <Reveal>
             <SectionHeader 
               title="What Clients Say" 
               subtitle="Trusted by brands, appreciated by professionals." 
             />
           </Reveal>
         </div>
         
         {/* Slider Container */}
         <Reveal delay={200}>
           <div className="relative w-full overflow-hidden mask-fade">
              <div className="flex animate-scroll hover:pause-on-hover gap-6 w-max px-6">
                {SLIDER_TESTIMONIALS.map((testimonial, index) => (
                  <div 
                    key={`${testimonial.id}-${index}`} 
                    className="w-[350px] md:w-[450px] bg-jp-card p-8 rounded-2xl shadow-xl border border-white/5 hover:border-jp-yellow/30 transition-all duration-300 relative flex flex-col justify-between shrink-0"
                  >
                    {/* Large background quote icon */}
                    <Quote className="absolute top-6 right-6 text-white/5 rotate-180" size={80} fill="currentColor" />
                    
                    {/* Stars */}
                    <div className="flex text-jp-yellow mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                    </div>
                    
                    {/* Text */}
                    <p className="text-lg text-gray-200 leading-relaxed mb-8 relative z-10 font-medium">
                      "{testimonial.text}"
                    </p>
                    
                    {/* User Profile */}
                    <div className="flex items-center gap-4 mt-auto">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-14 h-14 rounded-full object-cover border-2 border-jp-yellow"
                      />
                      <div>
                        <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                        <p className="text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wider">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>
         </Reveal>
      </div>

      {/* SECTION 6 — INFO / HOURS (NEW) */}
      <Section className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          
          {/* Why Choose Us */}
          <Reveal>
            <div className="bg-jp-card p-8 md:p-10 rounded-2xl border border-white/5 shadow-xl h-full relative overflow-hidden group hover:border-jp-yellow/20 transition-all duration-300">
              {/* Decorative background blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-jp-yellow/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-jp-yellow/10 transition-colors duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-jp-dark flex items-center justify-center text-jp-yellow border border-white/10 shadow-inner">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Why Choose Our Agency?</h3>
                </div>

                <div className="space-y-8">
                  {/* Item 1 */}
                  <div className="flex gap-5">
                    <div className="mt-1 shrink-0">
                       <div className="w-10 h-10 rounded-full bg-jp-yellow/10 flex items-center justify-center text-jp-yellow">
                         <Clock size={20} />
                       </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">Fast Response</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">We respond to all inquiries within 1 hour. Your time is our priority.</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex gap-5">
                    <div className="mt-1 shrink-0">
                       <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                         <Users size={20} />
                       </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">Expert Team</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">4+ years of combined experience delivering measurable digital growth.</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex gap-5">
                    <div className="mt-1 shrink-0">
                       <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                         <MessageSquare size={20} />
                       </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">Clear Communication</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">Regular updates throughout your project. No jargon, just clarity.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Business Hours */}
          <Reveal delay={200}>
            <div className="bg-jp-card p-8 md:p-10 rounded-2xl border border-white/5 shadow-xl h-full relative overflow-hidden group hover:border-jp-yellow/20 transition-all duration-300 flex flex-col">
              {/* Decorative background blob */}
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500"></div>

              <div className="relative z-10 flex-grow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-jp-dark flex items-center justify-center text-blue-400 border border-white/10 shadow-inner">
                    <Clock size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Business Hours</h3>
                </div>

                <div className="space-y-6">
                  {/* Row 1 */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-gray-300 font-medium">Monday - Friday</span>
                    <span className="text-cyan-400 font-bold bg-cyan-400/10 px-3 py-1 rounded-full text-sm">10:00 AM - 7:00 PM</span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-gray-300 font-medium">Saturday</span>
                    <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-full text-sm">10:00 AM - 4:00 PM</span>
                  </div>

                  {/* Row 3 */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-medium">Sunday</span>
                    <span className="text-red-400 font-bold bg-red-400/10 px-3 py-1 rounded-full text-sm border border-red-400/20">CLOSED</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 relative z-10 text-center md:text-left">
                <p className="text-gray-400 text-sm mb-1">Need support outside these hours?</p>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-jp-yellow hover:text-white font-bold transition-colors inline-flex items-center gap-2">
                  Email our 24/7 Support Team →
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </Section>
      
      {/* SECTION 7 — CONTACT BLOCK */}
      <Section className="text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">Let’s Work Together</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto">
            Have a project in mind? I’d love to help you bring it to life.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8 md:mb-10 text-lg font-medium">
            <Button to="/contact" variant="primary">Contact Now</Button>
          </div>
        </Reveal>
      </Section>
    </div>
  );
};