import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  linkToHome = true,
}) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 40 : 32;
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const taglineSize = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[11px]' : 'text-[9px]';

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Custom RecyConnect SVG Logo: Leaf + Circular Recycling Nodes Motif */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:rotate-12"
        >
          {/* Circular recycling orbit */}
          <path
            d="M24 4C35.0457 4 44 12.9543 44 24C44 28.5284 42.4938 32.705 39.9602 36.0575"
            stroke="#6845A0"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M24 44C12.9543 44 4 35.0457 4 24C4 19.4716 5.50616 15.295 8.03978 11.9425"
            stroke="#2E7775"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Arrow / Connecting Node Elements */}
          <circle cx="24" cy="4" r="3" fill="#6845A0" />
          <circle cx="24" cy="44" r="3" fill="#2E7775" />
          {/* Central Stylized Leaf with Network Veins */}
          <path
            d="M24 14C24 14 34 16 34 26C34 31 29 35 24 35C19 35 14 31 14 26C14 16 24 14 24 14Z"
            fill="url(#leaf-gradient)"
          />
          <path
            d="M24 18V32"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M24 23L29 20"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M24 27L19 24"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="34" cy="26" r="2.5" fill="#E1EFEB" />
          <circle cx="14" cy="26" r="2.5" fill="#DCD4EC" />
          <defs>
            <linearGradient id="leaf-gradient" x1="14" y1="14" x2="34" y2="35" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2E7775" />
              <stop offset="0.6" stopColor="#3BA19E" />
              <stop offset="1" stopColor="#6845A0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className={`font-bold tracking-tight text-charcoal leading-none ${titleSize}`}>
          <span>Recy</span>
          <span className="text-brand-primary">Connect</span>
        </div>
        {showTagline && (
          <span className={`font-semibold tracking-[0.2em] text-teal uppercase leading-tight mt-0.5 ${taglineSize}`}>
            CONNECT · RECYCLE · IMPACT
          </span>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-block hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};
