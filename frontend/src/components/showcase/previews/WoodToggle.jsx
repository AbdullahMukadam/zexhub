
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
                        <span className={`
              text-[22px] tracking-widest uppercase
              text-[#7a828e]
              transition-opacity duration-300
              translate-y-1
              ${isOn ? 'opacity-80' : 'opacity-100'}
            `}>
                            Public
                        </span>

                        <span className={`
              text-[22px] font-semibold tracking-widest uppercase
              text-[#7a828e]
              transition-opacity duration-300
              translate-y-1
              ${!isOn ? 'opacity-0' : 'opacity-90'}
            `}>
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
}