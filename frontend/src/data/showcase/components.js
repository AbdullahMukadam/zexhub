// Showcase Components Data Structure
// This file contains showcase items for cool UI components, dashboards, hero sections, etc.
// Each item can have:
// - media: { type: 'video' | 'image', url: string } - for showcasing the component
// - creator: { name: string, twitter: string } - attribution
// - sourceUrl: (optional) link to original source if available

export const showcaseComponents = [
  // === INTERACTIVE COMPONENTS (with code) ===

  {
    id: 'handlebars',
    title: 'Handlebars Reveal',
    description: 'Draggable handles that reveal hidden content with a smooth mask animation. Interactive GSAP-powered component.',
    category: 'animations',
    tags: ['gsap', 'draggable', 'mask', 'interactive', 'animation'],
    media: null,
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    hasLivePreview: true,
    sourceUrl: null,
    dependencies: ['gsap', 'react'],
    code: {
      jsx: `import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const Handlebars = ({ children }) => {
  const containerRef = useRef(null);
  const leftHandleRef = useRef(null);
  const rightHandleRef = useRef(null);
  const contentRef = useRef(null);
  const leftDraggableRef = useRef(null);
  const rightDraggableRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!leftHandleRef.current || !rightHandleRef.current || !contentRef.current || width === 0) return;

    if (leftDraggableRef.current) leftDraggableRef.current[0].kill();
    if (rightDraggableRef.current) rightDraggableRef.current[0].kill();

    gsap.set(leftHandleRef.current, { x: 0 });
    gsap.set(rightHandleRef.current, { x: width - 28 });

    const updateMask = () => {
      const leftX = leftDraggableRef.current[0].x;
      const rightX = rightDraggableRef.current[0].x + 28;
      const leftPercent = Math.max(0, Math.min(100, (leftX / width) * 100));
      const rightPercent = Math.max(0, Math.min(100, (rightX / width) * 100));
      const maskValue = \`linear-gradient(90deg, transparent 0%, transparent \${leftPercent}%, black \${leftPercent}%, black \${rightPercent}%, transparent \${rightPercent}%, transparent 100%)\`;
      gsap.set(contentRef.current, { mask: maskValue, webkitMask: maskValue });
    };

    leftDraggableRef.current = Draggable.create(leftHandleRef.current, {
      type: "x",
      bounds: { minX: 0, maxX: width - 28 },
      onDrag: function () {
        updateMask();
        if (rightDraggableRef.current) {
          rightDraggableRef.current[0].applyBounds({ minX: this.x + 28, maxX: width - 28 });
        }
      }
    });

    rightDraggableRef.current = Draggable.create(rightHandleRef.current, {
      type: "x",
      bounds: { minX: 28, maxX: width - 28 },
      onDrag: function () {
        updateMask();
        if (leftDraggableRef.current) {
          leftDraggableRef.current[0].applyBounds({ minX: 0, maxX: this.x - 28 });
        }
      }
    });

    updateMask();

    return () => {
      leftDraggableRef.current?.[0].kill();
      rightDraggableRef.current?.[0].kill();
    };
  }, [width]);

  return (
    <div className="flex justify-center gap-4 py-10 w-full">
      <div ref={containerRef} className="relative -rotate-[2.76deg] mt-0.5 w-64 md:w-80 h-16">
        <div className="absolute inset-0 w-full h-full rounded-full border border-yellow-500/50 flex justify-between z-10 pointer-events-none">
          <div ref={leftHandleRef} className="absolute z-20 h-full border border-yellow-500 w-7 rounded-full bg-[#1a1a1a] flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto">
            <div className="w-1.5 h-6 rounded-full bg-yellow-500" />
          </div>
          <div ref={rightHandleRef} className="absolute z-20 h-full border border-yellow-500 w-7 rounded-full bg-[#1a1a1a] flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto">
            <div className="w-1.5 h-6 rounded-full bg-yellow-500" />
          </div>
        </div>
        <span ref={contentRef} className="absolute inset-0 flex items-center justify-center w-full h-full px-9 bg-[#1a1a1a] rounded-full border border-white/10 text-white font-bold text-lg whitespace-nowrap overflow-hidden">
          {children}
        </span>
      </div>
    </div>
  );
};

export default Handlebars;`,
    }
  },
  {
    id: 'neumorphic-music-ui',
    title: 'Neumorphic Music UI',
    description: 'A soft UI music player concept with 3D buttons and smooth GSAP animations.',
    category: 'cards',
    tags: ['react', 'tailwind', 'gsap', 'neumorphism', 'ui'],
    media: null,
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    hasLivePreview: true,
    sourceUrl: null,
    dependencies: ['gsap', 'react'],
    code: {
      'NeumorphicMusicCard.jsx': `import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const allData = [
    // Page 1
    [
        { title: "Deep Focus", desc: "Ambient works", date: "2h ago", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop" },
        { title: "Lofi Beats", desc: "Chill vibes only", date: "5h ago", img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=200&h=200&fit=crop" },
        { title: "Synthwave", desc: "Neon nights playlist", date: "1d ago", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200&h=200&fit=crop" }
    ],
    // Page 2
    [
        { title: "Jazz Club", desc: "Saxophone & rain", date: "2d ago", img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200&h=200&fit=crop" },
        { title: "Classical", desc: "Mozart for the mind", date: "3d ago", img: "https://images.unsplash.com/photo-1768663319852-d2a2648f3950?w=200&h=200&fit=crop" },
        { title: "Workout", desc: "High BPM energy", date: "4d ago", img: "https://images.unsplash.com/photo-1768677675301-627aae4d9427?w=200&h=200&fit=crop" }
    ],
    // Page 3
    [
        { title: "Podcast", desc: "Tech news daily", date: "1w ago", img: "https://images.unsplash.com/photo-1581547848545-a75a2634ba23?w=200&h=200&fit=crop" },
        { title: "Audiobook", desc: "Sci-fi adventures", date: "1w ago", img: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=200&h=200&fit=crop" },
        { title: "Nature", desc: "Forest sounds", date: "2w ago", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=200&fit=crop" }
    ]
];

const NeumorphicMusicCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Nav animation
      gsap.from(navRef.current, {
        duration: 0.8,
        y: 100,
        opacity: 0,
        ease: "back.out(1.7)",
        delay: 0.2
      });

      // Cards animation
      const cards = containerRef.current.querySelectorAll('.neu-card');
      gsap.fromTo(cards, 
        { 
          y: 50, 
          opacity: 0 
        },
        {
          duration: 0.5,
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all"
        }
      );
    }, mainRef); // Scope to main container

    return () => ctx.revert();
  }, [currentPage]);

  const changePage = (pageNum) => {
    if (pageNum < 1 || pageNum > 3) return;
    setCurrentPage(pageNum);
  };

  const currentData = allData[currentPage - 1];

  return (
    <div ref={mainRef} className="w-full flex items-center justify-center bg-[#EFEEEE] p-8 rounded-3xl min-h-[600px] font-sans">
      {/* Main Container */}
      <main className="relative w-full max-w-[380px] h-[640px] shadow-[22px_5px_35px_0px_rgba(189,189,189,1)] bg-neu-base rounded-[40px] p-6 flex flex-col overflow-hidden border border-white/50 text-neu-text">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-6 shrink-0 gap-4">
            <div className="relative flex-1 h-12 rounded-2xl shadow-neu-in flex items-center px-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" className="w-full bg-transparent outline-none text-sm font-medium text-gray-600 placeholder-transparent" />
            </div>

            <button className="h-10 px-3 bg-[#EFEEEE] rounded-xl shadow-neu-out flex items-center justify-center font-bold text-gray-700 hover:text-gray-900 border-b-4 border-black/15 active:translate-y-1 active:border-b-0 active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)] transition-all duration-100 ease-[cubic-bezier(0.4,0,0.2,1)]">
                Search
            </button>
            
            <button className="h-10 px-3 bg-[#EFEEEE] rounded-xl shadow-neu-out flex items-center justify-center font-bold text-gray-700 hover:text-gray-900 border-b-4 border-black/15 active:translate-y-1 active:border-b-0 active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)] transition-all duration-100 ease-[cubic-bezier(0.4,0,0.2,1)]">
                Filter
            </button>
        </header>

        {/* Card Container */}
        <div ref={containerRef} className="flex-1 pb-32 space-y-6 px-4 pt-2 overflow-y-auto no-scrollbar scrollbar-hide">
          {currentData.map((item, index) => (
            <article key={\`\${currentPage}-\${index}\`} className="neu-card -mx-2 bg-neu-base rounded-[24px] shadow-[3px_3px_8px_rgba(163,145,145,0.2),-3px_-3px_8px_rgba(255,255,255,0.8)] p-4 flex items-center gap-4 relative group cursor-pointer border border-white/20">
                <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden shadow-neu-in-sm shrink-0 relative">
                    <img src={item.img} alt="Album" className="w-full h-full object-cover opacity-90" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-gray-800 leading-tight">{item.title}</h3>
                    <p className="text-sm font-medium text-gray-500 leading-tight mt-1">{item.desc}</p>
                    <span className="text-neu-accent text-xs font-bold mt-2 uppercase tracking-wider">Play Now</span>
                </div>

                <div className="flex flex-col justify-between items-end h-[72px] py-1">
                    <span className="text-[12px] font-semibold text-gray-400 tracking-wide">{item.date}</span>
                    <button className="w-8 h-8 rounded-full shadow-neu-out flex items-center justify-center text-gray-400 active:shadow-neu-in transition-all hover:text-neu-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </article>
          ))}
        </div>

        {/* Navigation */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center px-4 z-20">
            <nav ref={navRef} className="bg-neu-base/90 backdrop-blur-md rounded-full shadow-neu-card p-2 pr-3 flex items-center gap-4 border border-white/40">
                
                <button 
                  onClick={() => changePage(currentPage - 1)}
                  className="px-4 py-3 bg-[#EFEEEE] rounded-full shadow-neu-out flex items-center gap-2 text-gray-700 font-bold hover:text-gray-900 border-b-4 border-black/15 active:translate-y-1 active:border-b-0 active:shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)] transition-all duration-100 ease-[cubic-bezier(0.4,0,0.2,1)]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span className="text-sm">Prev</span>
                </button>

                <div className="flex items-center gap-3">
                  {[1, 2, 3].map(pageNum => (
                    <button 
                      key={pageNum}
                      onClick={() => changePage(pageNum)}
                      className={\`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all \${
                        currentPage === pageNum 
                          ? 'bg-neu-black text-white shadow-neu-dark active:scale-95' 
                          : 'shadow-neu-out text-gray-500 hover:text-gray-800 active:shadow-neu-in bg-[#EFEEEE]'
                      }\`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => changePage(currentPage + 1)}
                  className="px-6 py-3 rounded-full bg-neu-black shadow-neu-dark text-white font-bold text-sm flex items-center justify-center border-b-4 border-[#1a202c] active:border-b-0 active:translate-y-1 active:scale-98 transition-all duration-100 ease-[cubic-bezier(0.4,0,0.2,1)]"
                >
                    Next
                </button>

            </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#EFEEEE] to-transparent pointer-events-none z-10"></div>

      </main>
      
      <style>{\`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      \`}</style>
    </div>
  );
};

export default NeumorphicMusicCard;`,
      'tailwind.config.js': `// Add these extensions to your tailwind.config.js theme.extend
colors: {
  neu: {
    base: '#EFEEEE', 
    text: '#4A5568',
    accent: '#FF7F50',
    black: '#2D3748'
  }
},
boxShadow: {
  'neu-out': '6px 6px 12px rgba(163, 145, 145, 0.4), -6px -6px 12px rgba(255, 255, 255, 0.9)',
  'neu-card': '6px 6px 12px rgba(163, 145, 145, 0.2), -6px -6px 12px rgba(255, 255, 255, 0.8)',
  'neu-in': 'inset 5px 5px 10px rgba(163, 145, 145, 0.3), inset -5px -5px 10px rgba(255, 255, 255, 0.9)',
  'neu-in-sm': 'inset 3px 3px 6px rgba(163, 145, 145, 0.4), inset -3px -3px 6px rgba(255, 255, 255, 0.9)',
  'neu-dark': '6px 6px 12px rgba(45, 55, 72, 0.4), -6px -6px 12px rgba(255, 255, 255, 0.1)',
}`
    }
  },
  {
    id: 'wood-toggle',
    title: 'Wood Toggle',
    description: 'Interactive 3d style wood toggle.',
    category: 'animations',
    tags: ['framermotion', 'mask', 'interactive', 'animation'],
    media: null,
    creator: {
      name: 'Abdullah Mukadam',
      twitter: '@abd_mukadam',
    },
    hasLivePreview: true,
    sourceUrl: null,
    dependencies: ['framer motion', 'react'],
    code: {
      jsx: `
import { motion } from 'framer-motion';
import { useState } from 'react';


export const SkeuomorphicToggle = ({ isOn, onToggle }) => {

    const springConfig = {
        type: "spring",
        stiffness: 130,
        damping: 20,
        mass: 1.2
    };

    const travelDistance = 216;

    return (
        <div className="flex items-center justify-center p-12">
            <div
                className="relative select-none cursor-pointer group rounded-full"
                onClick={onToggle}
                role="switch"
                aria-checked={isOn}
            >
                <div
                    className="
            w-[447px] h-[102px]
            rounded-full 
            bg-[#B0B5BE]
            relative 
            overflow-hidden
            border-[2px] border-gray-800/10
            shadow-[inset_10px_10px_10px_rgba(0,0,0,0.8),inset_15px_15px_40px_rgba(0,0,0,0.73),inset_-2px_-2px_2px_-1px_rgba(255,255,255,0.7),1.5px_1.5px_0px_1px_rgba(255,255,255,0.6),inset_-10px_-10px_50px_rgba(255,255,255,1)]
          "
                >


                    {/* background labels */}
                    <div className="absolute inset-0 flex items-center justify-between px-16 pointer-events-none z-0">
                        <span className={"
              text-[22px] tracking-widest uppercase
              text-[#7a828e]
              transition-opacity duration-300
              translate-y-1
            "}>
                            Public
                        </span>

                        <span className={"
              text-[22px] font-semibold tracking-widest uppercase
              text-[#7a828e]
              transition-opacity duration-300
              translate-y-1
            "}>
                            Private
                        </span>
                    </div>

                    {/* container */}
                    <motion.div
                        layout
                        initial={false}
                        animate={{ x: isOn ? 0 : travelDistance }}
                        transition={springConfig}
                        className="absolute top-[4px] left-[4px] h-[90px] w-[216px] rounded-full z-10"
                    >
                        {/*knop drop shadow */}
                        <div className="w-full h-full relative rounded-full shadow-[13px_15px_20px_rgba(0,0,0,0.9)]">

                            {/* wood texture */}
                            <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-black">
                                <img
                                    src="https://cdn.pixabay.com/photo/2016/12/18/09/07/trees-1915249_1280.jpg"
                                    alt="Wood Texture"
                                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.1] contrast-125"
                                />

                                {/* 3d cynlinder gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/60" />

                                {/* rim light */}
                                <div className="absolute inset-0 rounded-full shadow-[inset_1px_1px_1px_rgba(255,255,255,0.6),inset_-2px_-2px_4px_rgba(0,0,0,0.9)]" />
                            </div>

                            {/* active text */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="relative w-full h-full flex items-center justify-center">

                                    <motion.span
                                        animate={{ opacity: isOn ? 0.7 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute text-[22px] font-semibold tracking-widest text-[#EBE5CE] uppercase"
                                    >
                                        Public
                                    </motion.span>

                                    <motion.span
                                        animate={{ opacity: isOn ? 0 : 0.7 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute text-[22px] font-semibold tracking-widest text-[#EBE5CE] uppercase"
                                    >
                                        Private
                                    </motion.span>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default function WoodToggle() {
    const [isPublic, setIsPublic] = useState(true);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#BDC1C6] text-slate-500">
            <SkeuomorphicToggle
                isOn={isPublic}
                onToggle={() => setIsPublic(!isPublic)}
            />
        </div>
    )
}`,
    }
  },
];

// Categories for filtering
export const categories = [
  { id: 'all', label: 'All', count: showcaseComponents.length },
  { id: 'dashboards', label: 'Dashboards', count: showcaseComponents.filter(c => c.category === 'dashboards').length },
  { id: 'hero-sections', label: 'Hero Sections', count: showcaseComponents.filter(c => c.category === 'hero-sections').length },
  { id: 'landing-pages', label: 'Landing Pages', count: showcaseComponents.filter(c => c.category === 'landing-pages').length },
  { id: 'cards', label: 'Cards', count: showcaseComponents.filter(c => c.category === 'cards').length },
  { id: 'mobile-ui', label: 'Mobile UI', count: showcaseComponents.filter(c => c.category === 'mobile-ui').length },
  { id: 'animations', label: 'Animations', count: showcaseComponents.filter(c => c.category === 'animations').length },
];
