import React, { useState } from 'react';

interface MrcLogoProps {
  className?: string;
  variant?: 'full' | 'badge' | 'compact' | 'horizontal';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MrcLogo: React.FC<MrcLogoProps> = ({
  className = '',
  variant = 'badge',
  showSubtitle = false,
  size = 'lg',
}) => {
  const [imageError, setImageError] = useState(false);

  // Height sizing mapping for the official graphic logo
  const sizeClasses = {
    sm: 'h-10 sm:h-12',
    md: 'h-16 sm:h-20',
    lg: 'h-28 sm:h-36',
    xl: 'h-36 sm:h-44',
  }[size];

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src="/mosta.png"
          alt="Mosta Run Club"
          className="w-10 h-10 object-contain shrink-0"
          onError={() => setImageError(true)}
        />
        <div className="flex flex-col text-left">
          <span className="font-condensed font-black tracking-wider text-base leading-none text-[#0047AB] uppercase">
            MOSTA RUN CLUB
          </span>
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase leading-tight">
            LES MARINS ⚓
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <img
          src="/mosta.png"
          alt="Mosta Run Club"
          className="h-14 sm:h-16 w-auto object-contain shrink-0 drop-shadow-xs"
          onError={() => setImageError(true)}
        />
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="font-condensed font-black tracking-tight text-2xl sm:text-3xl text-[#0047AB] uppercase leading-none">
              MOSTA RUN CLUB
            </span>
          </div>
          {showSubtitle && (
            <span className="text-xs font-semibold text-slate-600 tracking-wider uppercase mt-1">
              LES MARINS · MOSTAGANEM
            </span>
          )}
        </div>
      </div>
    );
  }

  // Official Form & Center Emblem with the user's official mosta.png
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="relative inline-block transition-transform duration-200 hover:scale-[1.02]">
        <img
          src="/mosta.png"
          alt="Mosta Run Club Official Logo"
          className={`${sizeClasses} w-auto object-contain mx-auto drop-shadow-sm`}
          onError={() => setImageError(true)}
        />
      </div>

      {showSubtitle && (
        <div className="flex items-center justify-center gap-2 mt-2 text-xs text-slate-600 font-semibold uppercase tracking-widest font-mono">
          <span>ATHLÉTISME</span>
          <span className="text-[#0047AB]">·</span>
          <span>LES MARINS ⚓</span>
          <span className="text-[#0047AB]">·</span>
          <span>MOSTAGANEM</span>
        </div>
      )}
    </div>
  );
};
