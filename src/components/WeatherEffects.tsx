import React from 'react';

interface WeatherEffectsProps {
  code: number;
  isDay: number;
}

const WeatherEffects: React.FC<WeatherEffectsProps> = ({ code, isDay }) => {
  const renderParticles = (type: 'rain' | 'snow', count: number, speedMultiplier: number = 1, sizeMultiplier: number = 1) => (
    [...Array(count)].map((_, i) => {
      const size = (type === 'rain' ? (Math.random() * 2 + 1) : (Math.random() * 4 + 2)) * sizeMultiplier;
      const opacity = type === 'rain' ? (Math.random() * 0.4 + 0.3) : (Math.random() * 0.5 + 0.3);
      const baseDuration = type === 'rain' ? 1 : 5;
      const animationDuration = `${(Math.random() * baseDuration + baseDuration * 0.5) / speedMultiplier}s`;
      const animationDelay = `${Math.random() * 5}s`;
      const horizontalMovement = type === 'rain' ? (Math.random() * 20 - 10) : (Math.random() * 40 - 20);
      const blur = type === 'snow' ? `blur(${Math.random() * 1.5}px)` : 'none';
      
      const skewTransform = type === 'rain' ? `skewX(${Math.random() * 15 - 5}deg)` : '';

      return (
        <div 
          key={i}
          className="absolute top-[-50px]"
          style={{
            left: `${Math.random() * 100}%`,
            opacity: opacity,
            transform: skewTransform,
            filter: blur,
            zIndex: 0
          }}
        >
            <div 
                className={`${type === 'rain' ? 'bg-blue-200' : 'bg-white rounded-full'} animate-fall-${type}`}
                style={{
                    width: `${size}px`,
                    height: type === 'rain' ? `${size * 15}px` : `${size}px`,
                    animationDuration,
                    animationDelay,
                    '--wind-x': `${horizontalMovement}px`
                } as React.CSSProperties}
            />
        </div>
      );
    })
  );

  // Clear Sky (Sun/Moon)
  if (code === 0 || code === 1) {
    return isDay ? (
      <>
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-amber-300/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse-slow" />
        <div className="absolute top-[-20%] right-[-20%] w-[70vw] h-[70vw] bg-orange-400/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        <div className="absolute top-[10%] right-[10%] w-[20vw] h-[20vw] bg-yellow-200/10 rounded-full blur-[80px] pointer-events-none mix-blend-overlay" />
      </>
    ) : (
      <>
        <div className="absolute top-[5%] right-[15%] w-[25vw] h-[25vw] bg-blue-100/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
        <div className="absolute top-[-10%] right-[5%] w-[50vw] h-[50vw] bg-indigo-800/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      </>
    );
  }

  // Cloudy / Partly Cloudy
  if (code >= 2 && code <= 3) {
    return (
      <>
        <div className="absolute top-[10%] left-[-10%] w-[60vw] h-[40vh] bg-white/5 rounded-full blur-[100px] animate-cloud-move-1 opacity-60" />
        <div className="absolute top-[40%] right-[-20%] w-[70vw] h-[50vh] bg-gray-400/10 rounded-full blur-[120px] animate-cloud-move-2 opacity-50" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[30vh] bg-white/5 rounded-full blur-[80px] animate-cloud-move-1 opacity-40" />
      </>
    );
  }

  // Rain
  if (code >= 51 && code <= 67) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Far Background Layer - Very Slow, Tiny, Blurred */}
        <div className="opacity-20 scale-50 blur-[1px]">{renderParticles('rain', 80, 0.5, 0.6)}</div>
        {/* Background Layer - Slow, Small */}
        <div className="opacity-40 scale-75 blur-[0.5px]">{renderParticles('rain', 120, 0.7, 0.8)}</div>
        {/* Middle Layer - Normal */}
        <div className="opacity-70">{renderParticles('rain', 150, 1, 1)}</div>
        {/* Foreground Layer - Fast, Large */}
        <div className="opacity-90 scale-110">{renderParticles('rain', 80, 1.4, 1.3)}</div>
        {/* Very Close Layer - Ultra Fast, Very Large */}
        <div className="opacity-95 scale-125 blur-[0.5px]">{renderParticles('rain', 40, 1.8, 1.5)}</div>
      </div>
    );
  }

  // Snow
  if (code >= 71 && code <= 77) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Far Background - Small, Slow, Very Blurred */}
        <div className="opacity-30 scale-50 blur-[2px]">{renderParticles('snow', 60, 0.4, 0.6)}</div>
        {/* Background Layer - Small, Slow, Blurred */}
        <div className="opacity-50 scale-75 blur-[1.5px]">{renderParticles('snow', 70, 0.6, 0.8)}</div>
        {/* Middle Layer - Normal Size and Speed */}
        <div className="opacity-75 blur-[0.5px]">{renderParticles('snow', 80, 1, 1)}</div>
        {/* Foreground Layer - Larger, Faster */}
        <div className="opacity-90 scale-110">{renderParticles('snow', 50, 1.3, 1.4)}</div>
        {/* Very Close Layer - Very Large, Fast, Sharp */}
        <div className="opacity-95 scale-125">{renderParticles('snow', 30, 1.5, 1.8)}</div>
      </div>
    );
  }

  // Thunderstorm
  if (code >= 95) {
    return (
      <>
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-slate-900/30">
           {renderParticles('rain', 150, 1.5, 1.2)}
        </div>
        <div className="absolute inset-0 bg-indigo-500/0 animate-flash pointer-events-none mix-blend-overlay z-10"></div>
        <div className="absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none" />
      </>
    );
  }

  return null;
};

export default WeatherEffects;
