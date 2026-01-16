// Showcase Components Data Structure

export const showcaseComponents = [
  // === NEW CREATIVE COMPONENTS ===
  {
    id: 'handlebars',
    title: 'Handlebars Reveal',
    description: 'Draggable handles that reveal hidden content with a smooth mask animation.',
    category: 'creative',
    framework: 'react-gsap',
    tags: ['gsap', 'draggable', 'mask', 'interactive'],
    dependencies: ['gsap', 'react'],
    code: {
      jsx: `import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

export default function Handlebars({ children }) {
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
}`,
      css: null,
      html: null
    }
  },

  {
    id: 'spotlight-card',
    title: 'Spotlight Card',
    description: 'Card with a mouse-following radial gradient glow effect.',
    category: 'cards',
    framework: 'tailwind',
    tags: ['hover', 'gradient', 'mouse-tracking', 'modern'],
    dependencies: ['react'],
    code: {
      jsx: `import { useRef, useState } from "react";

export default function SpotlightCard() {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative flex h-48 w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black px-8 py-16 shadow-2xl"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: \`radial-gradient(600px circle at \${position.x}px \${position.y}px, rgba(255,255,255,0.1), transparent 40%)\`,
        }}
      />
      <div className="relative z-10 text-center">
        <h3 className="mb-2 text-xl font-bold text-white">Spotlight Effect</h3>
        <p className="text-sm text-gray-400">Hover me!</p>
      </div>
    </div>
  );
}`,
      css: null,
      html: null
    }
  },

  {
    id: 'magnetic-button',
    title: 'Magnetic Button',
    description: 'Interactive button that follows your cursor with smooth animations.',
    category: 'buttons',
    framework: 'react-framer',
    tags: ['interactive', 'animation', 'hover', 'physics'],
    dependencies: ['framer-motion'],
    code: {
      jsx: `import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function MagneticButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
    >
      Hover Me
    </motion.button>
  );
}`,
      css: null,
      html: null
    }
  },

  {
    id: 'gradient-border-button',
    title: 'Gradient Border Button',
    description: 'Button with animated gradient border effect.',
    category: 'buttons',
    framework: 'tailwind',
    tags: ['gradient', 'border', 'animation'],
    dependencies: ['tailwindcss'],
    code: {
      jsx: `export default function GradientBorderButton() {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center">
        <span className="text-white font-bold">Click Me</span>
      </button>
    </div>
  );
}`,
      css: `@keyframes tilt {
  0%, 50%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  75% {
    transform: rotate(-1deg);
  }
}

.animate-tilt {
  animation: tilt 10s infinite linear;
}`,
      html: `<div class="relative group">
  <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
  <button class="relative px-7 py-4 bg-black rounded-lg leading-none">
    <span class="text-white font-bold">Click Me</span>
  </button>
</div>`
    }
  }
];

// Categories for filtering
export const categories = [
  { id: 'all', label: 'All Components', count: showcaseComponents.length },
  { id: 'creative', label: 'Creative', count: showcaseComponents.filter(c => c.category === 'creative').length },
  { id: 'buttons', label: 'Buttons', count: showcaseComponents.filter(c => c.category === 'buttons').length },
  { id: 'cards', label: 'Cards', count: showcaseComponents.filter(c => c.category === 'cards').length },
];

// Frameworks for filtering
export const frameworks = [
  { id: 'all', label: 'All Frameworks', icon: '🎨' },
  { id: 'react', label: 'React', icon: '⚛️' },
  { id: 'react-framer', label: 'React + Framer', icon: '🎭' },
  { id: 'react-gsap', label: 'React + GSAP', icon: '💚' },
  { id: 'tailwind', label: 'Tailwind', icon: '🎨' },
];
