
import React from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { CalendarIcon } from '../icons/CalendarIcon';

export const CustomersFilterBar: React.FC = () => {
  const inputClass = "block w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-xs placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-blue-500 transition shadow-inner outline-none font-medium";

  return (
    <div className="p-4 bg-white border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
      
      {/* 地区筛选 */}
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">地区筛选</label>
        <div className="relative group">
          <select className={`${inputClass} appearance-none pr-8 cursor-pointer`}>
            <option value="">全部地区</option>
            <option value="china">中国</option>
            <option value="overseas">海外</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400 group-hover:text-blue-500">
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* 客户级别筛选 */}
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">客户级别</label>
        <div className="relative group">
          <select className={`${inputClass} appearance-none pr-8 cursor-pointer`}>
            <option value="">全部级别</option>
            <option value="A">优质客户</option>
            <option value="B">普通客户</option>
            <option value="C">潜在客户</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400 group-hover:text-blue-500">
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* 时间筛选 */}
      <div className="lg:col-span-2 space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">创建时间筛选</label>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <CalendarIcon className="h-3.5 w-3.5 text-slate-300" />
            </div>
            <input type="date" className={`${inputClass} pl-8`} />
          </div>
          <span className="text-slate-300 font-bold">-</span>
          <div className="relative flex-1">
             <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <CalendarIcon className="h-3.5 w-3.5 text-slate-300" />
            </div>
            <input type="date" className={`${inputClass} pl-8`} />
          </div>
        </div>
      </div>

      {/* 负责人筛选 */}
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">负责人筛选</label>
        <div className="relative group">
          <select className={`${inputClass} appearance-none pr-8 cursor-pointer`}>
            <option value="">全部人员</option>
            <option value="1">李销售</option>
            <option value="2">王技术</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400 group-hover:text-blue-500">
            <ChevronDownIcon className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* 搜索框 */}
      <div className="space-y-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">快捷搜索</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-300 group-focus-within:text-blue-500 transition-colors">
            <SearchIcon className="h-4 w-4" />
          </div>
          <input 
            type="text" 
            placeholder="搜客户名/手机号" 
            className={`${inputClass} pl-9`}
          />
        </div>
      </div>

    </div>
  );
};
