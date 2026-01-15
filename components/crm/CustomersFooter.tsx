
import React from 'react';
import { CircleStackIcon } from '../icons/CircleStackIcon';
import { ClipboardListIcon } from '../icons/ClipboardListIcon';

interface CustomersFooterProps {
  totalCount: number;
  selectedCount: number;
}

export const CustomersFooter: React.FC<CustomersFooterProps> = ({ totalCount, selectedCount }) => {
  return (
    <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 z-40">
      
      {/* 底部批量操作按钮 */}
      <div className="flex items-center space-x-3">
        {selectedCount > 0 && (
          <>
            <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm">
              <ClipboardListIcon className="mr-2 h-4 w-4" />
              放回线索池 ({selectedCount})
            </button>
            <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
              <CircleStackIcon className="mr-2 h-4 w-4" />
              放回到客户池 ({selectedCount})
            </button>
          </>
        )}
        <div className="text-xs text-slate-400 font-medium">
          共 <span className="font-bold text-slate-700">{totalCount}</span> 条客户记录
        </div>
      </div>

      {/* 分页组件 */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">每页条数:</span>
          <select className="bg-white border border-slate-300 rounded px-1.5 py-1 text-xs font-bold focus:ring-1 focus:ring-blue-500 outline-none">
            <option>20条/页</option>
            <option>50条/页</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-1">
          <button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed">上一页</button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-black shadow-md shadow-blue-100">1</span>
          <button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed">下一页</button>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">前往</span>
          <input type="text" className="w-10 h-7 border border-slate-300 rounded text-center text-xs font-bold focus:ring-1 focus:ring-blue-500 outline-none" defaultValue="1" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">页</span>
        </div>
      </div>
    </div>
  );
};
