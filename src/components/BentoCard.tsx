import React from 'react';
import { motion } from 'framer-motion';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ElementType;
  onClick?: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = "", title, icon: Icon, onClick }) => (
  <motion.div 
    onClick={onClick}
    whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
    whileTap={{ scale: 0.98 }}
    drag
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    dragElastic={0.2}
    className={`
      relative overflow-hidden flex flex-col
      bg-[#0f0f11]/60 backdrop-blur-xl 
      border border-white/5
      shadow-[0_8px_30px_rgb(0,0,0,0.12)]
      hover:bg-[#1a1a1d]/70 hover:border-white/10 hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)]
      transition-colors duration-500 ease-out group
      rounded-[24px] cursor-grab active:cursor-grabbing
      ${className}
    `}
    style={{ perspective: 1000 }}
  >
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-noise mix-blend-overlay z-0" />
    
    {(title || Icon) && (
      <div className="flex items-center gap-2 px-5 pt-5 z-10">
        {Icon && <Icon size={12} className="text-white/40" />}
        {title && <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{title}</span>}
      </div>
    )}

    <div className="relative z-10 flex-1 px-5 pb-5 flex flex-col">
      {children}
    </div>
  </motion.div>
);

export default BentoCard;
