import React, { useState } from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { Plus, Trash2, Tag, AlertCircle, CheckCircle, Edit2, Save, X } from 'lucide-react';
import { Category } from '../../types';

export const Categories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useProjects();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  // Editing State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
        await addCategory(newCategoryName.trim());
        setNewCategoryName('');
        showNotification('Category added successfully');
    } catch (error) {
        showNotification('Category already exists or failed to add', 'error');
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleUpdate = async () => {
    if (!editingId || !editName.trim()) return;
    try {
        await updateCategory(editingId, editName.trim());
        setEditingId(null);
        setEditName('');
        showNotification('Category updated successfully');
    } catch (error) {
        showNotification('Failed to update category', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category? Projects using this category will remain but might need updating.')) {
        await deleteCategory(id);
        showNotification('Category removed');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative max-w-4xl">
        {/* Notification Toast */}
       {notification && (
         <div className={`fixed top-4 right-4 z-[110] px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-fade-in-up ${
           notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
         }`}>
            {notification.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
            <p className="font-bold">{notification.message}</p>
         </div>
       )}

       <div>
         <h1 className="text-2xl font-bold text-white mb-1">Manage Categories</h1>
         <p className="text-gray-400 text-sm">Organize your portfolio by adding, editing or removing project categories.</p>
       </div>

       {/* Add Category Form */}
       <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Plus size={20} className="text-jp-yellow" />
            Add New Category
          </h3>
          <form onSubmit={handleAdd} className="flex gap-4">
             <div className="flex-1 relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. 3D Design, Motion Graphics..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-jp-yellow outline-none"
                />
             </div>
             <button 
               type="submit"
               disabled={!newCategoryName.trim()}
               className="px-6 py-3 bg-jp-yellow text-jp-dark font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
             >
               Add Category
             </button>
          </form>
       </div>

       {/* Category List */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
             <div key={cat.id} className={`bg-gray-800 border p-4 rounded-lg flex justify-between items-center group transition-colors ${editingId === cat.id ? 'border-jp-yellow bg-gray-800/80 ring-1 ring-jp-yellow' : 'border-gray-700 hover:border-gray-500'}`}>
                
                {editingId === cat.id ? (
                  // Edit Mode
                  <div className="flex items-center gap-3 w-full">
                     <div className="w-10 h-10 rounded-full bg-jp-yellow/20 flex items-center justify-center text-jp-yellow shrink-0">
                        <Tag size={18} />
                     </div>
                     <input 
                       type="text" 
                       value={editName}
                       onChange={(e) => setEditName(e.target.value)}
                       autoFocus
                       className="flex-1 bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-jp-yellow outline-none"
                     />
                     <div className="flex items-center gap-1">
                        <button 
                          onClick={handleUpdate}
                          className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-colors"
                          title="Save"
                        >
                           <Save size={18} />
                        </button>
                        <button 
                          onClick={cancelEdit}
                          className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
                          title="Cancel"
                        >
                           <X size={18} />
                        </button>
                     </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 group-hover:bg-jp-yellow group-hover:text-jp-dark transition-colors">
                          <Tag size={18} />
                       </div>
                       <span className="font-medium text-white text-lg">{cat.name}</span>
                    </div>
                    <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => startEdit(cat)}
                        className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                        title="Edit Category"
                      >
                         <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete Category"
                      >
                         <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
             </div>
          ))}

          {categories.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed">
                No categories found. Add one to get started.
            </div>
          )}
       </div>
    </div>
  );
};