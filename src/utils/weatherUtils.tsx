import React from 'react';
import { Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';

export const getWeatherIcon = (code: number, isDay: number = 1, size: number = 24, className: string = "") => {
  const props = { size, className, strokeWidth: 1.5 };
  if (code === 0) return isDay ? <Sun {...props} className={`text-amber-300 ${className}`} /> : <Moon {...props} className={`text-blue-200 ${className}`} />;
  if (code >= 1 && code <= 3) return <Cloud {...props} className={`text-gray-400 ${className}`} />;
  if (code >= 51 && code <= 67) return <CloudRain {...props} className={`text-blue-400 ${className}`} />;
  if (code >= 71 && code <= 77) return <CloudSnow {...props} className={`text-white ${className}`} />;
  if (code >= 95) return <CloudLightning {...props} className={`text-purple-400 ${className}`} />;
  return <Sun {...props} className={`text-amber-300 ${className}`} />;
};

export const formatTime = (iso: string) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const getBgGradient = (code: number, isDay: number) => {
  if (!isDay) return "from-[#0f172a] via-[#1e1b4b] to-[#312e81]"; // Deep Indigo Night
  
  // Day Gradients - Lighter and more natural
  if (code === 0) return "from-[#60a5fa] via-[#3b82f6] to-[#2563eb]"; // Bright Sky Blue (Sunny)
  if (code >= 1 && code <= 3) return "from-[#94a3b8] via-[#64748b] to-[#475569]"; // Cloudy Gray/Blue
  if (code >= 51 && code <= 67) return "from-[#3b82f6] via-[#1d4ed8] to-[#1e3a8a]"; // Rainy Blue (Lighter than before)
  if (code >= 71 && code <= 77) return "from-[#cbd5e1] via-[#94a3b8] to-[#64748b]"; // Snowy White/Gray
  if (code >= 95) return "from-[#5b21b6] via-[#4c1d95] to-[#1e1b4b]"; // Stormy Purple (Keep dark for contrast)
  
  return "from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]"; // Default Day
};

export const getWeatherDescription = (code: number) => {
    if ([0, 1].includes(code)) return "Cielo Despejado";
    if ([2].includes(code)) return "Parcialmente Nublado";
    if ([3].includes(code)) return "Nublado";
    if (code >= 51 && code <= 67) return "Lluvia";
    if (code >= 71 && code <= 77) return "Nieve";
    if (code >= 95) return "Tormenta Eléctrica";
    return "Condiciones Varias";
};
