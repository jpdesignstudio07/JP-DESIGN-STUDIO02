import { Palette, PenTool, Layout, Box, Image, Monitor, Youtube } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'FAQ', path: '/faq' },
  ];

export const CONTACT_INFO = {
  phone: '90233 26054',
  email: 'jpdesignstudio@gmail.com',
  location: 'India — Serving Worldwide'
};

export const SERVICES_LIST = [
  {
    id: 1,
    title: 'Logo & Brand Identity',
    description: 'Clean, memorable logos and full branding systems.',
    icon: Palette
  },
  {
    id: 2,
    title: 'Social Media Creatives',
    description: 'High-quality posts, ads, and banners for online growth.',
    icon: Image
  },
  {
    id: 3,
    title: 'Flyers, Posters & Brochures',
    description: 'Engaging marketing materials that deliver clear messages.',
    icon: Layout
  },
  {
    id: 4,
    title: 'Packaging Design',
    description: 'Attractive and modern packaging that improves shelf appeal.',
    icon: Box
  },
  {
    id: 5,
    title: 'Thumbnails & YouTube Graphics',
    description: 'Eye-catching visuals that boost clicks and engagement.',
    icon: Youtube
  },
  {
    id: 6,
    title: 'Website & UI Graphics',
    description: 'Modern web visuals, layouts, and user interface design.',
    icon: Monitor
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'CMO, BRIGHTSTART',
    text: 'The branding package completely transformed our business image. Their strategic approach doubled our engagement in just 4 months.',
    rating: 5,
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'FOUNDER, TECHFLOW',
    text: 'Professional, transparent, and incredibly skilled. The team explained every step of the process and the results speak for themselves.',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'DIRECTOR, URBAN STYLE',
    text: 'The best agency investment we have made. Their creative team nailed our brand voice, and the ad performance is through the roof.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 4,
    name: 'Marcus Johnson',
    role: 'VP OF SALES, GROWTHX',
    text: 'We were skeptical about another agency, but JP Design delivered. The detailed reporting and constant communication put us at ease.',
    rating: 5,
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const FAQS = [
  {
    question: 'How long do projects take?',
    answer: 'Usually 24–48 hours for standard deliverables like logos or social media posts. Larger projects depend on complexity.'
  },
  {
    question: 'Do you offer revisions?',
    answer: 'Yes, I offer revisions until you are completely satisfied with the result.'
  },
  {
    question: 'Do you provide source files?',
    answer: 'Yes, you will receive editable source files (AI/PSD) along with high-quality PNG/JPEG exports.'
  },
  {
    question: 'How do I start a project?',
    answer: 'Contact me via WhatsApp or email with your requirements to get started.'
  },
  {
    question: 'Do you offer monthly design packages?',
    answer: 'Yes, I offer custom retainer packages for businesses needing ongoing design support.'
  }
];

export const STATS = [
  { label: 'Years of Experience', value: '4+' },
  { label: 'Projects Completed', value: '200+' },
  { label: 'Happy Clients', value: '150+' },
  { label: 'Industries Served', value: '10+' }
];