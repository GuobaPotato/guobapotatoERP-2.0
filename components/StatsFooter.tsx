
import React from 'react';

interface StatsFooterProps {
  stats: string[];
}

export const StatsFooter: React.FC<StatsFooterProps> = ({ stats }) => {
  return (
    <div className="px-4 py-3 md:px-6 flex flex-wrap items-center text-sm text-slate-600 border-t border-slate-200 bg-slate-50/50">
      {stats.map((stat, index) => (
        <div key={index} className="mr-6 my-1">
          <span>{stat.split('：')[0]}：</span>
          <span className="font-semibold text-slate-800">{stat.split('：')[1]}</span>
        </div>
      ))}
    </div>
  );
};
