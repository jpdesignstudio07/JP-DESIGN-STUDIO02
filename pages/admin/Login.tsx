import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Login is now async
    const success = await login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-jp-dark flex flex-col items-center justify-center px-4 relative">
       {/* Background styling matches main site */}
       <div className="absolute top-0 right-0 w-[45%] h-full bg-[#3B4D80] rounded-l-[80px] hidden lg:block z-0 opacity-10 pointer-events-none blur-3xl transform translate-x-20"></div>

       <div className="w-full max-w-md bg-jp-card border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
          <div className="text-center mb-8">
             <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
             <p className="text-gray-400 text-sm">Access the secure management panel</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <Mail size={18} />
                   </div>
                   <input 
                     type="email" 
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full pl-10 pr-4 py-3 bg-jp-dark/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-jp-yellow focus:ring-1 focus:ring-jp-yellow outline-none transition-all"
                     placeholder="admin@jpdesign.com"
                   />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <Lock size={18} />
                   </div>
                   <input 
                     type="password" 
                     required
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full pl-10 pr-4 py-3 bg-jp-dark/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-jp-yellow focus:ring-1 focus:ring-jp-yellow outline-none transition-all"
                     placeholder="password"
                   />
                </div>
             </div>

             <button 
               type="submit"
               className="w-full py-3 bg-jp-yellow text-jp-dark font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-yellow-500/20"
             >
               Sign In
             </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
             <Link to="/" className="text-gray-400 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors">
                <ArrowLeft size={16} />
                Back to Website
             </Link>
          </div>
       </div>
    </div>
  );
};