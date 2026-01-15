
import React from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import { FilterIcon } from '../icons/FilterIcon';

export const StockOutFilterBar: React.FC = () => {
  return (
    <div className="p-4 md:px-6 md:py-4 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 bg-slate-50/50 border-b border-slate-200">
      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="搜索出库单编号"
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition shadow-sm"
        />
      </div>
      
      <div className="relative w-full md:w-80">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <input
          type="text"
          readOnly
          value="2026-01-01 至 2026-01-07"
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white text-slate-600 sm:text-sm shadow-sm cursor-default"
        />
      </div>

      <div className="w-full md:w-auto">
         <button className="w-full md:w-auto flex items-center justify-center bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors duration-200 shadow-sm text-sm font-medium">
            <FilterIcon className="mr-2 h-4 w-4 text-slate-500"/>
            高级筛选
          </button>
      </div>
    </div>
  );
};
