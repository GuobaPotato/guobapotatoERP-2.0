
import React from 'react';
import { PlusIcon } from '../icons/PlusIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { ArrowDownTrayIcon } from '../icons/ArrowDownTrayIcon';

interface SupplierHeaderProps {
  onAddClick: () => void;
  selectedCount: number;
}

export const SupplierHeader: React.FC<SupplierHeaderProps> = ({ onAddClick, selectedCount }) => {
  return (
    <div className="px-6 py-5 border-b border-slate-200 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">全部</h1>
          <div className="h-4 w-px bg-slate-200 mx-2"></div>
          <span className="text-xs text-slate-400 font-medium italic">供应商管理中心</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
          <button 
            onClick={onAddClick}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-bold text-sm transition-all shadow-md active:scale-95"
          >
            <PlusIcon className="mr-1.5 h-4 w-4" />
            添加供应商
          </button>

          <button 
            disabled={selectedCount === 0}
            className="inline-flex items-center justify-center bg-white text-rose-600 px-4 py-2 rounded-lg border border-slate-300 hover:bg-rose-50 hover:border-rose-200 font-bold text-sm transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            <TrashIcon className="mr-1.5 h-4 w-4" />
            批量删除
          </button>

          <button className="inline-flex items-center justify-center bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-bold text-sm transition-all shadow-sm">
            导入
          </button>

          <button className="inline-flex items-center justify-center bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-black font-bold text-sm transition-all shadow-md active:scale-95">
            <ArrowDownTrayIcon className="mr-1.5 h-4 w-4" />
            导出
          </button>
        </div>
      </div>
    </div>
  );
};
