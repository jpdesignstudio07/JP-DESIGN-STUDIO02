import React, { useState } from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { Project } from '../../types';
import { Plus, Edit2, Trash2, X, Upload, Save, Search, Image as ImageIcon, Calendar, User, CheckCircle, AlertCircle, Link as LinkIcon, AlertTriangle, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
  const { projects, categories, addProject, updateProject, deleteProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Dynamic state for 2-step delete confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | number | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: '', // will default to first avail or empty
    image: '',
    description: '',
    client: '',
    date: new Date().toISOString().split('T')[0]
  });

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenModal = (project?: Project) => {
    setConfirmDeleteId(null); // Reset any pending delete confirmation
    if (project) {
      setEditingProject(project);
      setFormData({
        ...project,
        date: project.date || new Date().toISOString().split('T')[0]
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: categories.length > 0 ? categories[0].name : '',
        image: '',
        description: '',
        client: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  // Dynamic 2-Step Delete Handler
  const handleDeleteRequest = (id: number | string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (confirmDeleteId === id) {
        // Step 2: Actually Delete from Database
        deleteProject(id);
        showNotification('Project record permanently deleted');
        setConfirmDeleteId(null);
        if (isModalOpen) setIsModalOpen(false);
    } else {
        // Step 1: Request Confirmation
        setConfirmDeleteId(id);
        // Auto-reset confirmation after 3 seconds if not clicked
        setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.category) {
        showNotification('Please fill in all required fields (Title & Category)', 'error');
        return;
    }

    if (editingProject) {
      updateProject(editingProject.id, formData);
      showNotification('Project updated successfully');
    } else {
      addProject(formData as Omit<Project, 'id'>);
      showNotification('Project created successfully');
    }
    setIsModalOpen(false);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setFormData({ ...formData, image: base64 });
      } catch (error) {
        console.error("Error converting file to base64", error);
        showNotification('Failed to process image file', 'error');
      }
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Manage Projects</h1>
            <p className="text-gray-400 text-sm">Create, edit and remove portfolio items.</p>
          </div>
          <div className="flex gap-3">
             {/* View Toggles */}
             <div className="bg-gray-800 border border-gray-700 rounded-lg flex p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                  title="Grid View"
                >
                   <LayoutGrid size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded transition-colors ${viewMode === 'table' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                  title="Table View"
                >
                   <TableIcon size={20} />
                </button>
             </div>
             
             <button 
                onClick={() => handleOpenModal()}
                className="px-4 py-2 bg-jp-yellow text-jp-dark font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg shadow-yellow-500/20"
             >
                <Plus size={18} />
                Add Project
             </button>
          </div>
       </div>

       {/* Search Bar */}
       <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search projects by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-jp-yellow outline-none"
          />
       </div>

       {/* CONTENT AREA */}
       {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/50 border border-gray-700 border-dashed rounded-xl">
              <ImageIcon size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No projects found.</p>
              <button onClick={() => handleOpenModal()} className="text-jp-yellow hover:underline mt-2">Create one now</button>
          </div>
       ) : (
         <>
          {viewMode === 'grid' ? (
            /* --- GRID VIEW --- */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden group hover:border-gray-600 transition-all flex flex-col">
                        <div className="aspect-video relative overflow-hidden bg-gray-900 border-b border-gray-700">
                        {project.image ? (
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600">
                            <ImageIcon size={48} />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                            <button 
                                onClick={() => handleOpenModal(project)}
                                className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg transform hover:scale-110 duration-200"
                                title="Edit"
                            >
                                <Edit2 size={20} />
                            </button>
                            <button 
                                onClick={(e) => handleDeleteRequest(project.id, e)}
                                className={`p-3 text-white rounded-lg transition-all shadow-lg transform hover:scale-110 duration-200 ${
                                    confirmDeleteId === project.id ? 'bg-red-600 animate-pulse ring-2 ring-red-400' : 'bg-red-600 hover:bg-red-700'
                                }`}
                                title={confirmDeleteId === project.id ? "Click again to confirm delete" : "Delete Entire Record"}
                            >
                                {confirmDeleteId === project.id ? <AlertTriangle size={20} /> : <Trash2 size={20} />}
                            </button>
                        </div>
                        </div>
                        <div className="p-5 flex-grow flex flex-col">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-white truncate pr-2 text-lg" title={project.title}>{project.title}</h3>
                                <span className="text-xs px-2.5 py-1 rounded-md bg-gray-700 text-gray-300 whitespace-nowrap font-medium border border-gray-600">{project.category}</span>
                            </div>
                            <div className="space-y-2 mb-4 flex-grow">
                                {project.client && (
                                    <div className="flex items-center text-xs text-gray-400 gap-2">
                                        <User size={14} />
                                        <span>{project.client}</span>
                                    </div>
                                )}
                                {project.date && (
                                    <div className="flex items-center text-xs text-gray-400 gap-2">
                                        <Calendar size={14} />
                                        <span>{project.date}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          ) : (
            /* --- TABLE VIEW --- */
            <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-gray-700/50 text-gray-400 text-xs uppercase border-b border-gray-700">
                           <th className="px-6 py-4 font-bold">Image</th>
                           <th className="px-6 py-4 font-bold">Project Details</th>
                           <th className="px-6 py-4 font-bold">Category</th>
                           <th className="px-6 py-4 font-bold">Date</th>
                           <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-700">
                        {filteredProjects.map(project => (
                           <tr key={project.id} className="hover:bg-gray-700/30 transition-colors group">
                              <td className="px-6 py-4 w-24">
                                 <div className="w-16 h-12 rounded bg-gray-900 overflow-hidden border border-gray-700">
                                    {project.image ? (
                                       <img src={project.image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                       <div className="w-full h-full flex items-center justify-center text-gray-600">
                                          <ImageIcon size={16} />
                                       </div>
                                    )}
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <div className="font-bold text-white text-base">{project.title}</div>
                                 <div className="text-xs text-gray-400 mt-1">{project.client || 'No client listed'}</div>
                              </td>
                              <td className="px-6 py-4">
                                 <span className="px-2 py-1 rounded-md bg-gray-700 text-gray-300 text-xs border border-gray-600">
                                    {project.category}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-400">
                                 {project.date}
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <div className="flex justify-end gap-2">
                                    <button 
                                       onClick={() => handleOpenModal(project)}
                                       className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                       title="Edit"
                                    >
                                       <Edit2 size={18} />
                                    </button>
                                    <button 
                                       onClick={(e) => handleDeleteRequest(project.id, e)}
                                       className={`p-2 rounded-lg transition-colors ${
                                          confirmDeleteId === project.id 
                                          ? 'bg-red-600 text-white animate-pulse' 
                                          : 'text-red-400 hover:bg-red-400/10'
                                       }`}
                                       title="Delete"
                                    >
                                       {confirmDeleteId === project.id ? <AlertTriangle size={18} /> : <Trash2 size={18} />}
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          )}
         </>
       )}

       {/* Modal */}
       {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
             <div className="bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-700 overflow-hidden animate-fade-in-up max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800 shrink-0">
                   <div>
                       <h2 className="text-xl font-bold text-white">{editingProject ? 'Edit Project' : 'New Project'}</h2>
                       <p className="text-xs text-gray-400 mt-1">Fill in the details below.</p>
                   </div>
                   <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded-lg transition-colors">
                      <X size={24} />
                   </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                   {/* Image Upload */}
                   <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-300">Project Image</label>
                      
                      {formData.image ? (
                        <div className="space-y-3">
                           <div className="relative h-64 w-full rounded-xl overflow-hidden border border-gray-600 bg-black/50 group">
                              <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button 
                                    type="button"
                                    onClick={() => setFormData({...formData, image: ''})}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 font-medium"
                                  >
                                      <Trash2 size={16} />
                                      Remove Image Only
                                  </button>
                              </div>
                           </div>
                        </div>
                      ) : (
                        <div className="relative border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-jp-yellow hover:bg-gray-700/30 transition-all cursor-pointer group bg-gray-900/30">
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                              />
                              <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-jp-yellow transition-colors">
                                 <Upload size={32} className="mb-3" />
                                 <span className="text-sm font-medium">Click to upload from device</span>
                                 <span className="text-xs text-gray-500 mt-1">Supports JPG, PNG, WEBP, SVG</span>
                              </div>
                        </div>
                      )}

                      {/* URL Input */}
                      <div className="space-y-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                <LinkIcon size={16} />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Paste image URL (Pinterest, Unsplash, etc.)"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-jp-yellow outline-none text-sm placeholder-gray-500"
                            />
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-xs text-gray-400 flex gap-2 items-start">
                            <AlertCircle size={14} className="text-blue-400 mt-0.5 shrink-0" />
                            <p>
                                <strong>Using Pinterest?</strong> Right-click the image and select <span className="text-white font-medium">"Copy Image Address"</span> (Chrome) or "Copy Image Link". The link should usually end in .jpg or .png.
                            </p>
                        </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Title <span className="text-red-400">*</span></label>
                          <input 
                            type="text" 
                            required
                            placeholder="Project Name"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-jp-yellow outline-none transition-colors"
                          />
                       </div>

                       <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">
                             Category <span className="text-red-400">*</span>
                             {categories.length === 0 && <span className="text-xs text-red-400 ml-2">(No categories found. Add some!)</span>}
                          </label>
                          <div className="flex gap-2">
                            <select 
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-jp-yellow outline-none transition-colors appearance-none"
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                            <Link to="/admin/categories" className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-white" title="Manage Categories">
                                <Plus size={18} />
                            </Link>
                          </div>
                       </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Client Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="e.g. Acme Corp"
                                    value={formData.client}
                                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-jp-yellow outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Project Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 text-gray-500" size={18} />
                                <input 
                                    type="date" 
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-jp-yellow outline-none transition-colors [color-scheme:dark]"
                                />
                            </div>
                        </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Description</label>
                      <textarea 
                        rows={4}
                        placeholder="Describe the project..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-jp-yellow outline-none resize-none transition-colors"
                      />
                   </div>
                </form>

                <div className="p-6 border-t border-gray-700 bg-gray-800 shrink-0 flex flex-col md:flex-row gap-3">
                    {editingProject && (
                        <button 
                            type="button"
                            onClick={() => handleDeleteRequest(editingProject.id)}
                            className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                                confirmDeleteId === editingProject.id 
                                ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse ring-2 ring-red-400' 
                                : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20'
                            }`}
                            title="Permanently Delete This Project Record"
                        >
                            {confirmDeleteId === editingProject.id ? (
                                <>
                                    <AlertTriangle size={20} />
                                    <span>Are you sure? Click to Confirm</span>
                                </>
                            ) : (
                                <>
                                    <Trash2 size={20} />
                                    <span>Delete Entire Record</span>
                                </>
                            )}
                        </button>
                    )}
                    <button 
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                    onClick={handleSubmit}
                    type="button"
                    className="flex-1 py-3 bg-jp-yellow text-jp-dark font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
                    >
                    <Save size={18} />
                    {editingProject ? 'Save Changes' : 'Create Project'}
                    </button>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};