import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service } from '../types';
import { db } from '../services/db';

interface ServiceContextType {
  services: Service[];
  refreshServices: () => void;
  addService: (s: Omit<Service, 'id'>) => Promise<void>;
  updateService: (id: number | string, s: Partial<Service>) => Promise<void>;
  deleteService: (id: number | string) => Promise<void>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>([]);

  const refreshServices = async () => {
    const data = await db.getServices();
    setServices(data);
  };

  useEffect(() => {
    refreshServices();
  }, []);

  const addService = async (service: Omit<Service, 'id'>) => {
    await db.addService(service);
    refreshServices();
  };

  const updateService = async (id: number | string, updates: Partial<Service>) => {
    await db.updateService(id, updates);
    refreshServices();
  };

  const deleteService = async (id: number | string) => {
    await db.deleteService(id);
    refreshServices();
  };

  return (
    <ServiceContext.Provider value={{ 
        services,
        refreshServices,
        addService, 
        updateService, 
        deleteService
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};