
import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiDisc } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#020202] text-sm font-sans z-10 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight mb-6">
               Zix
            </div>
            <p className="text-util-gray/60 leading-relaxed mb-8 max-w-sm">
              The all-in-one developer ecosystem. <br/>
              Build portfolios, generate CSS, and ship faster.
            </p>
            <div className="flex gap-4">
               <a href="https://github.com/AbdullahMukadam" target="_blank" rel="noopener noreferrer" className="text-util-gray hover:text-white transition-colors">
                 <FiGithub className="w-5 h-5" />
               </a>
               <a href="https://x./abd_mukadam" className="text-util-gray hover:text-white transition-colors">
                 <FiTwitter className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Links Column 1 - Main Navigation */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-util-gray/60">
               <li><Link to="/templates" className="hover:text-white transition-colors">Templates</Link></li>
               <li><Link to="/showcase" className="hover:text-white transition-colors">Showcase</Link></li>
               <li><Link to="/tools" className="hover:text-white transition-colors">Tools</Link></li>
               <li><Link to="/components" className="hover:text-white transition-colors">UI Components</Link></li>
               <li><Link to="/productivity" className="hover:text-white transition-colors">Productivity</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-util-gray/60">
               <li><a href="https://github.com/AbdullahMukadam" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
               <li><a href="#" className="hover:text-white transition-colors">License</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-util-gray/60">
               <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-util-gray/40 font-mono">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
          <div>
            © {new Date().getFullYear()} Zix. OPEN SOURCE. MIT LICENSE.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
