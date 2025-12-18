import React, { useState, useEffect } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { Save, Upload, Monitor, Layout, Type, Trash2, FileText, AlignLeft } from 'lucide-react';

export const Settings: React.FC = () => {
  const { 
    heroImage, headerLogo, footerLogo, 
    heroTitleLine1, heroHighlightWord, heroTitleLine2, heroDescription,
    updateSettings 
  } = useContent();
  
  const [formData, setFormData] = useState({
    heroImage: '',
    headerLogo: '',
    footerLogo: '',
    heroTitleLine1: '',
    heroHighlightWord: '',
    heroTitleLine2: '',
    heroDescription: ''
  });
  
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData({
      heroImage: heroImage,
      headerLogo: headerLogo,
      footerLogo: footerLogo,
      heroTitleLine1: heroTitleLine1,
      heroHighlightWord: heroHighlightWord,
      heroTitleLine2: heroTitleLine2,
      heroDescription: heroDescription
    });
  }, [heroImage, headerLogo, footerLogo, heroTitleLine1, heroHighlightWord, heroTitleLine2, heroDescription]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageChange = async (key: keyof typeof formData, file: File | undefined) => {
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setFormData(prev => ({ ...prev, [key]: base64 }));
      } catch (error) {
        console.error("Error converting file to base64", error);
        alert("Failed to process image file.");
      }
    }
  };

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const ImageUploader = ({ 
    label, 
    value, 
    fieldKey, 
    description,
    placeholderText = "Default Text Logo"
  }: { 
    label: string, 
    value: string, 
    fieldKey: keyof typeof formData,
    description?: string,
    placeholderText?: string
  }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden mb-6">
      <div className="p-6 border-b border-gray-700 flex items-center gap-3">
         <Layout className="text-jp-yellow" size={20} />
         <h3 className="text-lg font-bold text-white">{label}</h3>
      </div>
      
      <div className="p-6 space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Preview */}
            <div className="space-y-2">
               <label className="text-sm font-medium text-gray-300">Preview</label>
               <div className="aspect-[3/1] w-full rounded-lg border-2 border-dashed border-gray-600 bg-gray-900 flex items-center justify-center overflow-hidden relative group">
                  {value ? (
                    <img src={value} alt="Preview" className="h-full w-auto max-w-full object-contain p-2" />
                  ) : (
                    <div className="text-gray-500 text-sm flex flex-col items-center">
                       <Type size={24} className="mb-2 opacity-50"/>
                       <span>{placeholderText}</span>
                    </div>
                  )}
               </div>
               {description && <p className="text-xs text-gray-500">{description}</p>}
            </div>

            {/* Controls */}
            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Image URL</label>
                  <input 
                    type="text" 
                    value={value}
                    onChange={(e) => handleChange(fieldKey, e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-jp-yellow outline-none text-sm"
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Upload File (SVG supported)</label>
                  <label className="flex items-center justify-center w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer transition-colors border border-gray-600">
                     <Upload size={18} className="mr-2" />
                     <span className="text-sm">Choose File</span>
                     <input 
                       type="file" 
                       className="hidden" 
                       accept="image/png, image/jpeg, image/svg+xml, .svg" 
                       onChange={(e) => handleImageChange(fieldKey, e.target.files?.[0])} 
                     />
                  </label>
               </div>
               
               {value && (
                  <button 
                    type="button"
                    onClick={() => handleChange(fieldKey, '')}
                    className="flex items-center justify-center w-full px-4 py-2 mt-2 text-sm font-medium text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg hover:bg-red-400/20 transition-colors"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Remove Image
                  </button>
               )}
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl pb-10">
       <div className="flex justify-between items-center">
         <div>
           <h1 className="text-2xl font-bold text-white mb-2">Site Settings</h1>
           <p className="text-gray-400">Manage global website assets and content.</p>
         </div>
         <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-jp-yellow text-jp-dark font-bold rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg shadow-yellow-500/20"
          >
            <Save size={18} />
            Save Changes
          </button>
       </div>

       {isSaved && (
         <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg animate-fade-in">
           Settings saved successfully!
         </div>
       )}

       <form onSubmit={handleSave} className="space-y-8">
          
          {/* Hero Content Section */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
             <div className="p-6 border-b border-gray-700 flex items-center gap-3">
                <FileText className="text-jp-yellow" size={20} />
                <h3 className="text-lg font-bold text-white">Hero Section Content</h3>
             </div>
             <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Headline Line 1</label>
                        <input 
                            type="text" 
                            value={formData.heroTitleLine1}
                            onChange={(e) => handleChange('heroTitleLine1', e.target.value)}
                            placeholder="e.g. Creative Graphic Design That"
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-jp-yellow outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Highlighted Word (Yellow)</label>
                        <input 
                            type="text" 
                            value={formData.heroHighlightWord}
                            onChange={(e) => handleChange('heroHighlightWord', e.target.value)}
                            placeholder="e.g. Elevates"
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-jp-yellow font-bold focus:border-jp-yellow outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Headline Line 2</label>
                    <input 
                        type="text" 
                        value={formData.heroTitleLine2}
                        onChange={(e) => handleChange('heroTitleLine2', e.target.value)}
                        placeholder="e.g. Your Brand"
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-jp-yellow outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <AlignLeft size={16} /> Description
                    </label>
                    <textarea 
                        rows={3}
                        value={formData.heroDescription}
                        onChange={(e) => handleChange('heroDescription', e.target.value)}
                        placeholder="e.g. Craft modern, strategic, and visually powerful designs..."
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-jp-yellow outline-none resize-none"
                    />
                </div>
             </div>
          </div>

          <ImageUploader 
             label="Hero Section Image"
             value={formData.heroImage}
             fieldKey="heroImage"
             description="Main image displayed on the Home page. Recommended: Transparent PNG."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImageUploader 
               label="Header Logo"
               value={formData.headerLogo}
               fieldKey="headerLogo"
               placeholderText="Using Default Text"
               description="Displayed in the top navigation bar. SVG Format Recommended."
            />
            
            <ImageUploader 
               label="Footer Logo"
               value={formData.footerLogo}
               fieldKey="footerLogo"
               placeholderText="Using Default Text"
               description="Displayed in the website footer. SVG Format Recommended."
            />
          </div>
       </form>
    </div>
  );
};