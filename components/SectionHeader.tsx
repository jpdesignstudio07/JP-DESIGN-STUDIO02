import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, center = true }) => {
  return (
    <div className={`mb-10 md:mb-14 ${center ? 'text-center' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
        {title}
      </h2>
      {subtitle && (
        <div className={`h-1 w-16 bg-jp-yellow mb-4 ${center ? 'mx-auto' : ''}`}></div>
      )}
      {subtitle && (
        <p className={`text-lg max-w-2xl text-gray-300 ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};