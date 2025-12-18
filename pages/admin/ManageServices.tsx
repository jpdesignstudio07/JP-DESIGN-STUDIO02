import React, { useState } from 'react';
import { useServices } from '../../contexts/ServiceContext';
import { Service } from '../../types';
import { Plus, Edit2, Trash2, X, Save, Search, CheckCircle, AlertCircle, Briefcase } from 'lucide-react';
import { AVAILABLE_ICONS, DynamicIcon } from '../../utils/iconHelper';

export const ManageServices: React.FC = () => {
  const { services, addService, updateService, deleteService } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    icon: 'Palette'
  });

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        icon: 'Palette'
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number | string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await deleteService(id);
      showNotification('Service deleted successfully');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showNotification('Please fill in Title and Description', 'error');
      return;
    }

    if (editingService) {
      await updateService(editingService.id, formData);
      showNotification('Service updated successfully');
    } else {
      await addService(formData as Omit<Service, 'id'>);
      showNotification('Service added successfully');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
        {/* Notification Toast */}
       {notification && (
         <div className={`fixed top-4 right-4 z-[110] px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in-up ${
           notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
         }`}>
            {notification.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
            <p className="font-bold">{notification.message}</p>
         </div>
       )}

       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Manage Services</h1>
            <p className="text-gray-400 text-sm">Update the services listed on your website.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-jp-yellow text-jp-dark font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg shadow-yellow-500/20"
          >
            <Plus size={18} />
            Add Service
          </button>
       </div>

       {/* Services Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
             <div key={service.id} className="bg-gray-800 border border-gray-700 p-6 rounded-xl flex flex-col group hover:border-jp-yellow/50 transition-colors">
                 <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center text-jp-yellow">
                       <DynamicIcon name={service.icon} size={24} />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => handleOpenModal(service)} className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition-colors">
                          <Edit2 size={16} />
                       </button>
                       <button onClick={() => handleDelete(service.id)} className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500 hover:text-white transition-colors">
                          <Trash2 size={16} />
                       </button>
                    </div>
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                 <p className="text-gray-400 text-sm">{service.description}</p>
             </div>
          ))}
       </div>

       {/* Modal */}
       {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
             <div className="bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl border border-gray-700 overflow-hidden animate-fade-in-up">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800">
                   <h2 className="text-xl font-bold text-white">{editingService ? 'Edit Service' : 'New Service'}</h2>
                   <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Service Title</label>
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-jp-yellow outline-none"
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Description</label>
                      <textarea 
                        rows={3}
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-jp-yellow outline-none resize-none"
                      />
                   </div>

                   <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">Choose Icon</label>
                      <div className="grid grid-cols-6 gap-2 bg-gray-900 p-4 rounded-lg border border-gray-600 max-h-40 overflow-y-auto custom-scrollbar">
                         {AVAILABLE_ICONS.map(iconName => (
                            <button
                               type="button"
                               key={iconName}
                               onClick={() => setFormData({...formData, icon: iconName})}
                               className={`p-2 rounded-lg flex items-center justify-center transition-all ${
                                  formData.icon === iconName 
                                  ? 'bg-jp-yellow text-jp-dark shadow-lg scale-110' 
                                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                               }`}
                               title={iconName}
                            >
                               <DynamicIcon name={iconName} size={20} />
                            </button>
                         ))}
                      </div>
                      <p className="text-xs text-gray-500">Selected: {formData.icon}</p>
                   </div>
                   
                   <div className="pt-2 flex gap-3">
                      <button 
                        type="button" 
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
                      >
                         Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-3 bg-jp-yellow text-jp-dark font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
                      >
                         <Save size={18} />
                         Save Service
                      </button>
                   </div>
                </form>
             </div>
          </div>
       )}
    </div>
  );
};