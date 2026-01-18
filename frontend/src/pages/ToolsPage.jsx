import { useState } from 'react';
import { FiLayout, FiBox, FiActivity, FiGrid, FiMenu, FiX, FiChevronRight } from 'react-icons/fi';
import GradientGenerator from '../components/tools/GradientGenerator.jsx';
import BoxShadowGenerator from '../components/tools/BoxShadowGenerator.jsx';
import BoxLayoutGenerator from '../components/tools/BoxLayoutGenerator.jsx';
import VisualLayoutBuilder from '../components/tools/VisualLayoutBuilder.jsx';
import SEO from '../components/common/SEO.jsx';

const ToolsPage = () => {
  const [activeTab, setActiveTab] = useState('visual');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tools = [
    { 
      category: 'Design',
      items: [
        { id: 'gradient', name: 'Gradient Generator', icon: <FiActivity className="w-4 h-4" />, description: 'Create CSS gradients' },
        { id: 'shadow', name: 'Box Shadow', icon: <FiBox className="w-4 h-4" />, description: 'Generate shadow effects' },
      ]
    },
    {
      category: 'Layout',
      items: [
        { id: 'visual', name: 'Visual Builder', icon: <FiGrid className="w-4 h-4" />, description: 'Drag & drop layout creator', featured: true },
        { id: 'layout', name: 'Flex/Grid Gen', icon: <FiLayout className="w-4 h-4" />, description: 'CSS layout code' },
      ]
    }
  ];

  const activeTool = tools.flatMap(g => g.items).find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-16 relative font-sans flex flex-col md:flex-row">
      <SEO 
        title="CSS Tools & Generators"
        description="Free CSS tools for developers. Generate gradients, box shadows, and layouts visually."
      />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#020202]">
        <div className="flex items-center gap-2">
           <span className="text-util-gray">{activeTool?.icon}</span>
           <span className="font-bold">{activeTool?.name}</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white">
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#050505] border-r border-white/10 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-[calc(100vh-64px)]
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        pt-20 md:pt-0
      `}>
        <div className="p-4">
          <h2 className="text-xs font-bold text-util-gray uppercase tracking-widest mb-6 px-2">Development Tools</h2>
          
          <div className="space-y-6">
            {tools.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-[10px] font-bold text-util-gray/50 uppercase tracking-wider mb-2 px-2">{group.category}</h3>
                <div className="space-y-1">
                  {group.items.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setActiveTab(tool.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group relative ${
                        activeTab === tool.id
                          ? 'bg-white text-black font-bold shadow-md shadow-white/5'
                          : 'text-util-gray hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className={activeTab === tool.id ? 'text-black' : 'text-util-gray group-hover:text-white'}>
                        {tool.icon}
                      </span>
                      <span>{tool.name}</span>
                      
                      {tool.featured && activeTab !== tool.id && (
                        <span className="absolute right-2 w-1.5 h-1.5 bg-util-accent rounded-full"></span>
                      )}
                      
                      {activeTab === tool.id && (
                        <FiChevronRight className="ml-auto w-3 h-3 opacity-50" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] bg-[#020202] relative">
         {/* Tool Header */}
         <div className="absolute top-0 left-0 right-0 z-10 bg-[#020202]/80 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-4 flex items-center justify-between">
            <div>
               <h1 className="text-xl font-bold text-white flex items-center gap-3">
                 {activeTool?.name}
                 {activeTool?.featured && (
                   <span className="text-[10px] bg-util-accent/10 text-util-accent border border-util-accent/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                     Beta
                   </span>
                 )}
               </h1>
               <p className="text-xs text-util-gray mt-1">{activeTool?.description}</p>
            </div>
         </div>

         {/* Tool Content - Scrollable */}
         <div className="h-full pt-20 overflow-y-auto custom-scrollbar">
           <div className="h-full">
             {activeTab === 'gradient' && <GradientGenerator />}
             {activeTab === 'shadow' && <BoxShadowGenerator />}
             {activeTab === 'layout' && <BoxLayoutGenerator />}
             {activeTab === 'visual' && <VisualLayoutBuilder />}
           </div>
         </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ToolsPage;
