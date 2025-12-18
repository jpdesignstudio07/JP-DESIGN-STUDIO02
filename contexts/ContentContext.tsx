import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/db';
import { ClientLogo } from '../types';

interface ContentContextType {
  heroImage: string;
  headerLogo: string;
  footerLogo: string;
  heroTitleLine1: string;
  heroHighlightWord: string;
  heroTitleLine2: string;
  heroDescription: string;
  clientLogos: ClientLogo[];
  updateSettings: (settings: Partial<ContentContextType>) => void;
  refreshContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroImage, setHeroImage] = useState<string>('/logo.png');
  const [headerLogo, setHeaderLogo] = useState<string>('');
  const [footerLogo, setFooterLogo] = useState<string>('');
  
  // Dynamic Text State
  const [heroTitleLine1, setHeroTitleLine1] = useState<string>('');
  const [heroHighlightWord, setHeroHighlightWord] = useState<string>('');
  const [heroTitleLine2, setHeroTitleLine2] = useState<string>('');
  const [heroDescription, setHeroDescription] = useState<string>('');
  
  // Client Logos State
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);

  const refreshContent = async () => {
    try {
      // 1. Fetch Settings
      const settings = await db.getSettings();
      if (settings.heroImage) setHeroImage(settings.heroImage);
      if (settings.headerLogo !== undefined) setHeaderLogo(settings.headerLogo);
      if (settings.footerLogo !== undefined) setFooterLogo(settings.footerLogo);
      
      setHeroTitleLine1(settings.heroTitleLine1 || '');
      setHeroHighlightWord(settings.heroHighlightWord || '');
      setHeroTitleLine2(settings.heroTitleLine2 || '');
      setHeroDescription(settings.heroDescription || '');

      // 2. Fetch Client Logos for Slider
      const clients = await db.getClients();
      setClientLogos(clients);
      
    } catch (error) {
      console.error("Failed to load content:", error);
    }
  };

  useEffect(() => {
    refreshContent();
  }, []);

  const updateSettings = async (settings: Partial<ContentContextType>) => {
    // Only pass simple settings fields to DB, exclude clientLogos array for now
    const { clientLogos, ...dbSettings } = settings; 
    await db.updateSettings(dbSettings);
    refreshContent();
  };

  return (
    <ContentContext.Provider value={{ 
      heroImage, 
      headerLogo, 
      footerLogo, 
      heroTitleLine1,
      heroHighlightWord,
      heroTitleLine2,
      heroDescription,
      clientLogos,
      updateSettings,
      refreshContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};