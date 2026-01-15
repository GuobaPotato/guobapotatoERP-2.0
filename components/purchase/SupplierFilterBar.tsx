
import React from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

export const SupplierFilterBar: React.FC = () => {
  const inputClass = "block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm appearance-none pr-8";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block";

  return (
    <div className="p-4 px-6 bg-slate-50/50 border-b border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
        
        {/* 部门筛选 */}
        <div className="space-y-1">
          <label className={labelClass}>选择部门或下属</label>
          <div className="relative">
            <select className={inputClass}>
              <option value="">选择部门或下属</option>
              <option value="warehouse">仓储部</option>
              <option value="purchase">采购部</option>
            </select>
            <ChevronDownIcon className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* 分类筛选 */}
        <div className="space-y-1">
          <label className={labelClass}>供应商分类</label>
          <div className="relative">
            <select className={inputClass}>
              <option value="">全部分类</option>
              <option value="1">大便器配件</option>
              <option value="2">小便器配件</option>
              <option value="3">智能水龙头配件</option>
            </select>
            <ChevronDownIcon className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* 负责人筛选 */}
        <div className="space-y-1">
          <label className={labelClass}>负责人筛选</label>
          <div className="relative">
            <select className={inputClass}>
              <option value="">全部负责人</option>
              <option value="zhao">赵采购</option>
              <option value="zhang">张采购</option>
              <option value="li">李采购</option>
            </select>
            <ChevronDownIcon className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* 评级筛选 */}
        <div className="space-y-1">
          <label className={labelClass}>供应商评级</label>
          <div className="relative">
            <select className={inputClass}>
              <option value="">全部评级</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            <ChevronDownIcon className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* 名称搜索 */}
        <div className="space-y-1">
          <label className={labelClass}>搜索供应商</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="搜索供应商名称"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
