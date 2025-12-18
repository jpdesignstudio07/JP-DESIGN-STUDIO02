import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Category } from '../types';
import { db } from '../services/db';

interface ProjectContextType {
  projects: Project[];
  categories: Category[];
  refreshProjects: () => void;
  refreshCategories: () => void;
  addProject: (p: Omit<Project, 'id'>) => void;
  updateProject: (id: number | string, p: Partial<Project>) => void;
  deleteProject: (id: number | string) => void;
  addCategory: (name: string) => Promise<void>;
  updateCategory: (id: string, name: string) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const refreshProjects = async () => {
    const data = await db.getProjects();
    setProjects(data);
  };

  const refreshCategories = async () => {
    const data = await db.getCategories();
    setCategories(data);
  };

  useEffect(() => {
    refreshProjects();
    refreshCategories();
  }, []);

  const addProject = async (project: Omit<Project, 'id'>) => {
    await db.addProject(project);
    refreshProjects();
  };

  const updateProject = async (id: number | string, updates: Partial<Project>) => {
    await db.updateProject(id, updates);
    refreshProjects();
  };

  const deleteProject = async (id: number | string) => {
    await db.deleteProject(id);
    refreshProjects();
  };

  const addCategory = async (name: string) => {
    await db.addCategory(name);
    refreshCategories();
  };

  const updateCategory = async (id: string, name: string) => {
    await db.updateCategory(id, name);
    refreshCategories();
  };

  const deleteCategory = async (id: string) => {
    await db.deleteCategory(id);
    refreshCategories();
  };

  return (
    <ProjectContext.Provider value={{ 
        projects, 
        categories,
        refreshProjects, 
        refreshCategories,
        addProject, 
        updateProject, 
        deleteProject,
        addCategory,
        updateCategory,
        deleteCategory
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};