
import React from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import { FilterIcon } from '../icons/FilterIcon';

export const ProductFilterBar: React.FC = () => {
  return (
    <div className="p-4 px-6 flex flex-col md:flex-row items-center gap-4 bg-slate-50/30 border-b border-slate-200">
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="搜索产品名称"
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white text-sm placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
        />
      </div>
      <button className="w-full md:w-auto flex items-center justify-center bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-sm font-medium transition-colors shadow-sm">
        <FilterIcon className="mr-2 h-4 w-4 text-slate-500" />
        高级筛选
      </button>
    </div>
  );
};
