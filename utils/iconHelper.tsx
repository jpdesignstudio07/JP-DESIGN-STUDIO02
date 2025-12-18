import React from 'react';
import { 
  Palette, PenTool, Layout, Box, Image, Monitor, Youtube, 
  Smartphone, Code, Megaphone, Video, Globe, Layers, 
  Feather, Crop, Camera, Aperture, Briefcase, Star
} from 'lucide-react';

// Map of icon names to components
export const ICON_MAP: Record<string, React.ElementType> = {
  Palette,
  PenTool,
  Layout,
  Box,
  Image,
  Monitor,
  Youtube,
  Smartphone,
  Code,
  Megaphone,
  Video,
  Globe,
  Layers,
  Feather,
  Crop,
  Camera,
  Aperture,
  Briefcase,
  Star
};

// Helper component to render icon dynamically
export const DynamicIcon = ({ name, size = 24, className = "" }: { name: string, size?: number, className?: string }) => {
  const IconComponent = ICON_MAP[name] || Palette; // Default to Palette if not found
  return <IconComponent size={size} className={className} />;
};

// List for the Admin Icon Picker
export const AVAILABLE_ICONS = Object.keys(ICON_MAP);