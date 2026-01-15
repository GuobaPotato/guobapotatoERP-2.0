
import React from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

export const WarehouseFilterBar: React.FC = () => {
  return (
    <div className="p-4 md:px-6 md:py-4 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 bg-slate-50/50 border-b border-slate-200">
      <div className="relative w-full md:flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="产品名称"
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition shadow-sm"
        />
      </div>
      <div className="w-full md:w-auto md:min-w-[200px]">
        <select className="block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 sm:text-sm transition shadow-sm">
          <option value="">请选择库存状态</option>
          <option value="in_stock">在售</option>
          <option value="out_of_stock">停售</option>
        </select>
      </div>
      <div className="w-full md:w-auto">
         <button className="w-full md:w-auto flex items-center justify-center bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-200 shadow-sm">
            导出
          </button>
      </div>
    </div>
  );
};
