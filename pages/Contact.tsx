import React from 'react';
import { Mail, Phone, Calendar, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { SEO } from '../components/SEO';
import { Reveal } from '../components/Reveal';

export const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your strategy call request has been sent.');
  };

  return (
    <div className="min-h-screen bg-jp-dark pt-28 pb-12 md:pt-36 md:pb-20 px-6 flex justify-center">
      <SEO 
        title="Contact Us - Hire a Professional Graphic Designer" 
        description="Book a strategy call or contact JP Design Studio for your next design project. Let's discuss your brand's growth today."
        keywords="Hire Graphic Designer, Design Strategy Call, Contact Design Agency, Graphic Design Quote"
      />
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Call to Action & Info */}
        <div className="space-y-8 md:space-y-10">
           
           <Reveal>
             {/* Badge */}
             <div className="inline-block px-4 py-1.5 rounded-full border border-jp-yellow/30 bg-jp-yellow/10 backdrop-blur-sm">
                <span className="text-jp-yellow font-bold text-xs tracking-widest uppercase">Get Started</span>
             </div>
             
             {/* Headline */}
             <div className="space-y-4 md:space-y-6 mt-6">
               <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1]">
                 Let's Grow Your <br/> 
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Business</span>
               </h1>
               
               <p className="text-base md:text-lg text-gray-300 max-w-md leading-relaxed">
                 Ready to take your brand to the next level? Fill out the form to book your free strategy call and discuss your vision.
               </p>
             </div>
           </Reveal>

           {/* Contact Details */}
           <div className="space-y-6 pt-2">
              <Reveal delay={200}>
                <div className="flex items-center gap-5 group">
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-jp-yellow shrink-0 group-hover:bg-jp-yellow group-hover:text-jp-dark transition-all duration-300">
                      <Mail size={22} className="md:w-6 md:h-6" />
                   </div>
                   <div>
                      <div className="text-xs md:text-sm text-gray-400 mb-1 font-medium tracking-wide uppercase">Email Us</div>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="text-white font-bold text-lg md:text-xl hover:text-jp-yellow transition-colors break-all">{CONTACT_INFO.email}</a>
                   </div>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex items-center gap-5 group">
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-jp-yellow shrink-0 group-hover:bg-jp-yellow group-hover:text-jp-dark transition-all duration-300">
                      <Phone size={22} className="md:w-6 md:h-6" />
                   </div>
                   <div>
                      <div className="text-xs md:text-sm text-gray-400 mb-1 font-medium tracking-wide uppercase">Call / WhatsApp</div>
                      <div className="text-white font-bold text-lg md:text-xl">{CONTACT_INFO.phone}</div>
                   </div>
                </div>
              </Reveal>
           </div>
        </div>

        {/* Right Column: White Form Card */}
        <Reveal delay={400}>
          <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
             {/* Decorative corner blur */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-jp-yellow/20 rounded-full blur-3xl pointer-events-none"></div>

             <h2 className="text-2xl md:text-3xl font-bold text-jp-dark mb-6 md:mb-8 relative z-10">Book Your Free Strategy Call</h2>
             
             <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 relative z-10">
                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                   <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Full Name</label>
                      <input type="text" placeholder="John Doe" required className="w-full px-4 py-3 md:py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-jp-dark focus:ring-1 focus:ring-jp-dark outline-none transition-all text-gray-800 placeholder-gray-400 font-medium text-sm md:text-base" />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Business Name</label>
                      <input type="text" placeholder="Your Company Ltd." className="w-full px-4 py-3 md:py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-jp-dark focus:ring-1 focus:ring-jp-dark outline-none transition-all text-gray-800 placeholder-gray-400 font-medium text-sm md:text-base" />
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                   <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Email Address</label>
                      <input type="email" placeholder="john@example.com" required className="w-full px-4 py-3 md:py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-jp-dark focus:ring-1 focus:ring-jp-dark outline-none transition-all text-gray-800 placeholder-gray-400 font-medium text-sm md:text-base" />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Phone Number</label>
                      <input type="tel" placeholder="+91 00000 00000" className="w-full px-4 py-3 md:py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-jp-dark focus:ring-1 focus:ring-jp-dark outline-none transition-all text-gray-800 placeholder-gray-400 font-medium text-sm md:text-base" />
                   </div>
                </div>

                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Service Required</label>
                   <div className="relative">
                      <select className="w-full px-4 py-3 md:py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-jp-dark focus:ring-1 focus:ring-jp-dark outline-none transition-all text-gray-800 font-medium appearance-none cursor-pointer text-sm md:text-base">
                          <option value="" disabled selected>Select a service...</option>
                          <option value="branding">Logo & Branding</option>
                          <option value="social">Social Media Design</option>
                          <option value="web">Website & UI</option>
                          <option value="packaging">Packaging Design</option>
                          <option value="other">Other Inquiry</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                   </div>
                </div>

                <div className="space-y-1.5">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Message / Project Goals</label>
                   <textarea rows={4} placeholder="Tell us about your project goals or what you'd like to discuss..." required className="w-full px-4 py-3 md:py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-jp-dark focus:ring-1 focus:ring-jp-dark outline-none transition-all text-gray-800 placeholder-gray-400 font-medium resize-none text-sm md:text-base"></textarea>
                </div>

                <button type="submit" className="w-full py-3.5 md:py-4 mt-2 bg-jp-dark hover:bg-[#3B3A5A] text-white rounded-xl font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]">
                   Book Strategy Call
                   <Calendar size={20} className="text-jp-yellow" />
                </button>
             </form>
          </div>
        </Reveal>

      </div>
    </div>
  );
};