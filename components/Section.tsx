import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section 
      id={id} 
      className={`py-10 md:py-20 bg-jp-dark text-white ${className}`}
    >
      <div className="container mx-auto px-6">
        {children}
      </div>
    </section>
  );
};