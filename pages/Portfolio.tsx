import React, { useState, useEffect } from 'react';
import { Section } from '../components/Section';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useProjects } from '../contexts/ProjectContext';
import { Reveal } from '../components/Reveal';

export const Portfolio: React.FC = () => {
  const { projects, categories } = useProjects();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <div>
      <SEO 
        title="Design Portfolio - Logos, Branding & Creatives" 
        description="Browse our extensive portfolio of graphic design projects including logo design, packaging, social media graphics, and web UI."
        keywords="Design Portfolio, Logo Examples, Branding Case Studies, Creative Work, Graphic Design Portfolio"
      />
      <div className="bg-jp-dark pt-28 pb-8 md:pt-36 md:pb-12 text-center px-6">
        <Reveal>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">My Work</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my creative projects across different design categories.
          </p>
        </Reveal>
      </div>

      <Section>
        {/* Category Tabs */}
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
            <button
                onClick={() => setActiveCategory('All')}
                className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border ${
                  activeCategory === 'All'
                    ? 'bg-jp-yellow text-jp-dark border-jp-yellow shadow-lg transform scale-105'
                    : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white hover:bg-jp-card'
                }`}
              >
                All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat.name
                    ? 'bg-jp-yellow text-jp-dark border-jp-yellow shadow-lg transform scale-105'
                    : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white hover:bg-jp-card'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 4) * 50}>
              <div 
                className="group relative rounded-xl overflow-hidden shadow-md bg-jp-card border border-white/10 cursor-pointer hover:shadow-xl hover:border-jp-yellow/50 transition-all duration-300"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-800 flex items-center justify-center">
                  {project.image && project.image.trim() !== '' ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="text-gray-600 flex flex-col items-center">
                        <ImageIcon size={48} className="opacity-50" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-jp-dark via-jp-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  
                  {/* Zoom Icon Hint */}
                  {project.image && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm p-3 rounded-full border border-white/20">
                        <ZoomIn className="text-white" size={24} />
                    </div>
                  )}

                  <span className="text-jp-yellow text-xs font-bold uppercase tracking-wider mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.category}</span>
                  <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{project.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Reveal>
            <div className="text-center py-16 text-gray-500 border border-gray-700/50 rounded-xl bg-gray-800/30">
              No projects found in this category.
            </div>
          </Reveal>
        )}
      </Section>

      {/* Image Popup Modal */}
      {selectedProject && selectedProject.image && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-5 right-5 md:top-8 md:right-8 text-gray-400 hover:text-jp-yellow hover:scale-110 transition-all duration-300 z-50 bg-black/50 p-2 rounded-full border border-white/10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(null);
            }}
          >
            <X size={32} />
          </button>

          {/* Modal Content */}
          <div 
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-jp-dark">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="max-w-full max-h-[80vh] object-contain mx-auto"
                />
                
                {/* Caption Bar */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 pt-12 flex justify-between items-end">
                   <div>
                       <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{selectedProject.title}</h3>
                       <span className="text-jp-yellow font-medium uppercase tracking-wider text-sm">{selectedProject.category}</span>
                   </div>
                   {selectedProject.description && (
                     <div className="hidden md:block max-w-lg text-sm text-gray-300">
                        {selectedProject.description}
                     </div>
                   )}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};