
import React from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import { FilterIcon } from '../icons/FilterIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

export const QuotationFilterBar: React.FC = () => {
  const inputClass = "block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm";

  return (
    <div className="p-4 px-6 flex flex-col md:flex-row items-center gap-4 bg-slate-50/30 border-b border-slate-200">
      <div className="w-full md:w-48 relative">
        <select className={`${inputClass} appearance-none pr-10`}>
          <option value="">选择部门或下属</option>
          <option value="1">销售一部</option>
          <option value="2">销售二部</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>

      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="搜报价名称或编号"
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white text-sm placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
        />
      </div>

      <button className="w-full md:w-auto flex items-center justify-center bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-sm font-bold transition-colors shadow-sm">
        <FilterIcon className="mr-2 h-4 w-4 text-slate-500" />
        高级筛选
      </button>
    </div>
  );
};
