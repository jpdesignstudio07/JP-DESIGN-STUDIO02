import { Project, Category, Service, SiteSettings, ClientLogo, User } from '../types';

// --- INITIAL DATA SEEDS (For first-time load) ---
// Using Pexels images to replace Unsplash, ensuring high-quality and vertical aesthetic
const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Lumina Brand Identity',
    category: 'Branding',
    image: 'https://images.pexels.com/photos/3585047/pexels-photo-3585047.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Complete visual identity system including stationery, business cards, and digital assets for a modern architectural firm.',
    date: '2023-11-15',
    client: 'Lumina Arch'
  },
  {
    id: 2,
    title: 'Aura Skin Packaging',
    category: 'Packaging',
    image: 'https://images.pexels.com/photos/6612885/pexels-photo-6612885.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Minimalist sustainable packaging design for a luxury organic skincare line, featuring embossed textures and earth tones.',
    date: '2023-10-02',
    client: 'Aura Skin'
  },
  {
    id: 3,
    title: 'Neon Waves Poster',
    category: 'Print Design',
    image: 'https://images.pexels.com/photos/3050943/pexels-photo-3050943.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Typography-focused poster series for an electronic music festival, utilizing bold colors and experimental layouts.',
    date: '2023-12-10',
    client: 'Nightwave Fest'
  },
  {
    id: 4,
    title: 'Fintech Mobile App',
    category: 'Web & UI',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'User interface design for a modern mobile banking application with focus on dark mode and data visualization.',
    date: '2024-01-05',
    client: 'Novus Bank'
  },
  {
    id: 5,
    title: 'Botanical Logo Mark',
    category: 'Logo',
    image: 'https://images.pexels.com/photos/7268571/pexels-photo-7268571.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Elegant serif logo mark and embossed business card design for a high-end boutique florist.',
    date: '2023-09-18',
    client: 'Flora & Fern'
  },
  {
    id: 6,
    title: 'Editorial Fashion Story',
    category: 'Social Media',
    image: 'https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Instagram story and post series for the Spring collection launch, focusing on editorial typography.',
    date: '2023-08-30',
    client: 'Vogue Mode'
  },
  {
    id: 7,
    title: 'Artisan Coffee Bags',
    category: 'Packaging',
    image: 'https://images.pexels.com/photos/3913284/pexels-photo-3913284.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Illustrated coffee packaging series for single-origin roasts, using vibrant patterns and matte finishes.',
    date: '2023-11-22',
    client: 'Roast Co.'
  },
  {
    id: 8,
    title: 'Minimal Portfolio Book',
    category: 'Print Design',
    image: 'https://images.pexels.com/photos/6001385/pexels-photo-6001385.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Clean layout design for a photography portfolio book, emphasizing negative space and typography.',
    date: '2023-07-14',
    client: 'Studio Lens'
  },
  {
     id: 9,
     title: 'Urban Streetwear Brand',
     category: 'Branding',
     image: 'https://images.pexels.com/photos/3771081/pexels-photo-3771081.jpeg?auto=compress&cs=tinysrgb&w=800',
     description: 'Bold, gritty brand identity for an urban streetwear clothing line.',
     date: '2023-06-20',
     client: 'Concrete Culture'
  }
];

const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat_1', name: 'Branding' },
  { id: 'cat_2', name: 'Logo' },
  { id: 'cat_3', name: 'Packaging' },
  { id: 'cat_4', name: 'Web & UI' },
  { id: 'cat_5', name: 'Social Media' },
  { id: 'cat_6', name: 'Print Design' }
];

const INITIAL_SERVICES: Service[] = [
  {
    id: 1,
    title: 'Logo & Brand Identity',
    description: 'Clean, memorable logos and full branding systems.',
    icon: 'Palette'
  },
  {
    id: 2,
    title: 'Social Media Creatives',
    description: 'High-quality posts, ads, and banners for online growth.',
    icon: 'Image'
  },
  {
    id: 3,
    title: 'Flyers, Posters & Brochures',
    description: 'Engaging marketing materials that deliver clear messages.',
    icon: 'Layout'
  },
  {
    id: 4,
    title: 'Packaging Design',
    description: 'Attractive and modern packaging that improves shelf appeal.',
    icon: 'Box'
  },
  {
    id: 5,
    title: 'Thumbnails & YouTube Graphics',
    description: 'Eye-catching visuals that boost clicks and engagement.',
    icon: 'Youtube'
  },
  {
    id: 6,
    title: 'Website & UI Graphics',
    description: 'Modern web visuals, layouts, and user interface design.',
    icon: 'Monitor'
  }
];

const INITIAL_CLIENTS: ClientLogo[] = [
    { id: 1, name: 'TechCorp', logo: '' },
    { id: 2, name: 'CreativeCo', logo: '' },
    { id: 3, name: 'BizGrowth', logo: '' }
];

const DEFAULT_SETTINGS: SiteSettings = {
  heroImage: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200',
  headerLogo: '',
  footerLogo: '',
  heroTitleLine1: 'Creative Graphic Design That',
  heroHighlightWord: 'Elevates',
  heroTitleLine2: 'Your Brand',
  heroDescription: 'Craft modern, strategic, and visually powerful designs for businesses worldwide. From logo design to social media marketing, let\'s turn your ideas into a visual reality.'
};

const STORAGE_KEYS = {
  PROJECTS: 'jp_projects_v3', // Incremented version to force refresh of initial data
  CATEGORIES: 'jp_categories_v3', // Incremented version
  SERVICES: 'jp_services_v1',
  SETTINGS: 'jp_settings_v1',
  AUTH: 'jp_auth_v1',
  CLIENTS: 'jp_clients_v1'
};

// ==========================================
// LOCAL STORAGE DATA SERVICE
// ==========================================
export const db = {
  // --- Projects ---
  getProjects: async (): Promise<Project[]> => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
        return INITIAL_PROJECTS;
      }
      return JSON.parse(data);
    } catch (e) {
      return INITIAL_PROJECTS;
    }
  },
  addProject: async (project: Omit<Project, 'id'>): Promise<Project> => {
    const projects = await db.getProjects();
    const newProject = { ...project, id: Date.now() }; // Generate numeric ID based on timestamp
    const updated = [newProject, ...projects];
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    return newProject;
  },
  updateProject: async (id: string | number, updates: Partial<Project>): Promise<Project | null> => {
    const projects = await db.getProjects();
    const index = projects.findIndex(p => p.id == id);
    if (index === -1) return null;
    const updatedProject = { ...projects[index], ...updates };
    projects[index] = updatedProject;
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return updatedProject;
  },
  deleteProject: async (id: string | number): Promise<void> => {
    const projects = await db.getProjects();
    const filtered = projects.filter(p => p.id != id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));
  },

  // --- Categories ---
  getCategories: async (): Promise<Category[]> => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        return INITIAL_CATEGORIES;
      }
      return JSON.parse(data);
    } catch (e) {
      return INITIAL_CATEGORIES;
    }
  },
  addCategory: async (name: string): Promise<Category> => {
    const categories = await db.getCategories();
    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        throw new Error('Category already exists');
    }
    const newCategory = { id: `cat_${Date.now()}`, name };
    const updated = [...categories, newCategory];
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
    return newCategory;
  },
  updateCategory: async (id: string, name: string): Promise<Category | null> => {
    const categories = await db.getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    // Check for duplicates (excluding self)
    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== id)) {
      throw new Error('Category name already exists');
    }

    const oldName = categories[index].name;
    const updatedCategory = { ...categories[index], name };
    categories[index] = updatedCategory;
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));

    // Cascade update: Rename category in all projects
    if (oldName !== name) {
        const projects = await db.getProjects();
        let projectsChanged = false;
        const updatedProjects = projects.map(p => {
            if (p.category === oldName) {
                projectsChanged = true;
                return { ...p, category: name };
            }
            return p;
        });
        if (projectsChanged) {
            localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedProjects));
        }
    }

    return updatedCategory;
  },
  deleteCategory: async (id: string): Promise<void> => {
    const categories = await db.getCategories();
    const filtered = categories.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filtered));
  },

  // --- Services ---
  getServices: async (): Promise<Service[]> => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (!data) {
          localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
          return INITIAL_SERVICES;
      }
      return JSON.parse(data);
    } catch (e) {
      return INITIAL_SERVICES;
    }
  },
  addService: async (service: Omit<Service, 'id'>): Promise<Service> => {
    const services = await db.getServices();
    const newService = { ...service, id: Date.now() };
    const updated = [...services, newService];
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
    return newService;
  },
  updateService: async (id: string | number, updates: Partial<Service>): Promise<Service | null> => {
    const services = await db.getServices();
    const index = services.findIndex(s => s.id == id);
    if (index === -1) return null;
    const updatedService = { ...services[index], ...updates };
    services[index] = updatedService;
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    return updatedService;
  },
  deleteService: async (id: string | number): Promise<void> => {
    const services = await db.getServices();
    const filtered = services.filter(s => s.id != id);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(filtered));
  },

  // --- Settings & Clients (Local) ---
  getSettings: async (): Promise<SiteSettings> => {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  },
  updateSettings: async (newSettings: Partial<SiteSettings>): Promise<SiteSettings> => {
    const current = await db.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  },
  
  getClients: async (): Promise<ClientLogo[]> => {
    const data = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (!data) {
        return INITIAL_CLIENTS;
    }
    return JSON.parse(data);
  },

  // --- Auth ---
  login: async (email: string, pass: string): Promise<User | null> => {
    // Simple mock auth for client-side demo
    if (email === 'admin@jpdesign.com' && pass === 'password') {
      const user: User = { email, role: 'admin', name: 'JP Admin' };
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
      return user;
    }
    return null;
  },
  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },
  getUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.AUTH);
    return data ? JSON.parse(data) : null;
  }
};