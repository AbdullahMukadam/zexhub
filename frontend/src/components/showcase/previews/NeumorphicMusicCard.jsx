import React, { useState, useEffect, useRef } from 'react';
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
            <article key={`${currentPage}-${index}`} className="neu-card -mx-2 bg-neu-base rounded-[24px] shadow-[3px_3px_8px_rgba(163,145,145,0.2),-3px_-3px_8px_rgba(255,255,255,0.8)] p-4 flex items-center gap-4 relative group cursor-pointer border border-white/20">
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
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        currentPage === pageNum 
                          ? 'bg-neu-black text-white shadow-neu-dark active:scale-95' 
                          : 'shadow-neu-out text-gray-500 hover:text-gray-800 active:shadow-neu-in bg-[#EFEEEE]'
                      }`}
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
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default NeumorphicMusicCard;