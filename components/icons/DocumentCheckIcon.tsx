
import React from 'react';

export const DocumentCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-1.125 0-2.063.938-2.063 2.063v15.375c0 1.125.938 2.063 2.063 2.063h12.75c1.125 0 2.063-.938 2.063-2.063V12.375" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 2.25 2.25L15 12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 2.25 18.75 6m0 0-3.75 3.75M18.75 6H12" />
  </svg>
);
