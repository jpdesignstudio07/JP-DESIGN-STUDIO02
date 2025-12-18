import React from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { Image, Eye, Clock, FolderKanban } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { projects, categories } = useProjects();

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderKanban, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Categories', value: categories.length, icon: Image, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Views (Mock)', value: '1.2k', icon: Eye, color: 'text-jp-yellow', bg: 'bg-jp-yellow/10' },
    { label: 'Last Updated', value: 'Just now', icon: Clock, color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
       <div>
         <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
         <p className="text-gray-400">Overview of your portfolio performance.</p>
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
             <div key={idx} className="bg-gray-800 border border-gray-700 p-6 rounded-xl flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color}`}>
                   <stat.icon size={24} />
                </div>
                <div>
                   <div className="text-2xl font-bold text-white">{stat.value}</div>
                   <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
             </div>
          ))}
       </div>

       {/* Recent Projects Table Preview */}
       <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
             <h3 className="text-lg font-bold text-white">Recent Projects</h3>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-gray-700/50 text-gray-400 text-xs uppercase">
                   <tr>
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Category</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                   {projects.slice(0, 5).map((project) => (
                      <tr key={project.id} className="hover:bg-gray-700/30 transition-colors">
                         <td className="px-6 py-4">
                            <img src={project.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-700" />
                         </td>
                         <td className="px-6 py-4 font-medium text-white">{project.title}</td>
                         <td className="px-6 py-4 text-sm text-gray-400">
                           <span className="px-2 py-1 rounded-full bg-gray-700 text-xs">
                              {project.category}
                           </span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};