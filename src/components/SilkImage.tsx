import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SilkImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackColor?: string;
  patternType?: 'korvai' | 'zari' | 'temple' | 'brocade' | 'checks';
  label?: string;
}

export const SilkImage: React.FC<SilkImageProps> = ({
  src,
  alt = 'Ravi Textiles Silk Saree',
  className = '',
  fallbackColor = '#E11D48',
  patternType = 'korvai',
  label,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // SVG silk texture patterns for instant, beautiful fallback
  const getPatternSvg = () => {
    switch (patternType) {
      case 'temple':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="temple-motif" width="30" height="30" patternUnits="userSpaceOnUse">
                <polygon points="15,4 26,26 4,26" fill="rgba(212,175,55,0.25)" />
                <circle cx="15" cy="18" r="3" fill="rgba(255,243,176,0.35)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#temple-motif)" />
          </svg>
        );
      case 'checks':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="checks-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="24" y2="0" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
                <line x1="0" y1="0" x2="0" y2="24" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.4)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#checks-grid)" />
          </svg>
        );
      case 'zari':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="zari-floral" width="36" height="36" patternUnits="userSpaceOnUse">
                <circle cx="18" cy="18" r="6" fill="rgba(212,175,55,0.3)" />
                <path d="M18,6 C22,12 22,14 18,18 C14,14 14,12 18,6 Z" fill="rgba(251,241,201,0.3)" />
                <path d="M18,30 C22,24 22,22 18,18 C14,22 14,24 18,30 Z" fill="rgba(251,241,201,0.3)" />
                <path d="M6,18 C12,14 14,14 18,18 C14,22 12,22 6,18 Z" fill="rgba(251,241,201,0.3)" />
                <path d="M30,18 C24,14 22,14 18,18 C22,22 24,22 30,18 Z" fill="rgba(251,241,201,0.3)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#zari-floral)" />
          </svg>
        );
      default: // korvai
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="korvai-weave" width="20" height="20" patternUnits="userSpaceOnUse">
                <line x1="0" y1="10" x2="20" y2="10" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
                <polygon points="10,2 18,16 2,16" fill="rgba(212,175,55,0.2)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#korvai-weave)" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background silk luster container */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-between p-4"
        style={{
          background: `linear-gradient(145deg, ${fallbackColor} 0%, #15060A 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-40">
          {getPatternSvg()}
        </div>
        
        {/* Subtle gold border header & footer */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60 z-10" />
        
        {/* Motif insignia when image fails or is loading */}
        {(!isLoaded || hasError) && (
          <div className="my-auto text-center z-10 p-2">
            <div className="w-10 h-10 mx-auto rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-black/30 backdrop-blur-xs mb-1.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#ECC880]" />
            </div>
            {label && (
              <span className="text-[11px] font-cinzel text-white/90 font-semibold tracking-wider block drop-shadow px-2">
                {label}
              </span>
            )}
            <span className="text-[9px] font-mono text-[#ECC880]/80 tracking-widest uppercase">
              Ravi Textiles Pure Silk
            </span>
          </div>
        )}

        <div className="w-full h-2 bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] opacity-70 z-10" />
      </div>

      {/* Main Image with smooth fade-in and error handling */}
      {!hasError && src && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover relative z-10 transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
};
