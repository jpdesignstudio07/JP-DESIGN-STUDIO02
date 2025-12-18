import { LucideIcon } from 'lucide-react';

export interface Service {
  id: number | string;
  title: string;
  description: string;
  icon: string; // Icon name string for DynamicIcon
}

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  text: string;
  rating: number;
  image?: string;
}

export interface FaqItem {
  id: number | string;
  question: string;
  answer: string;
}

export interface Project {
  id: number | string;
  title: string;
  category: string;
  image: string;
  description?: string;
  date?: string;
  client?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface ClientLogo {
  id: string | number;
  name: string;
  logo: string; // URL or Base64
}

export interface SiteSettings {
  heroImage: string;
  headerLogo: string;
  footerLogo: string;
  heroTitleLine1: string;
  heroHighlightWord: string;
  heroTitleLine2: string;
  heroDescription: string;
}

export interface User {
  email: string;
  name: string;
  role: 'admin';
}