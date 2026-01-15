
import React from 'react';

interface PaginationProps {
    dataSource: any[];
}

export const Pagination: React.FC<PaginationProps> = ({ dataSource }) => {
  return (
    <div className="px-4 py-3 md:px-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600 border-t border-slate-200">
      <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <span>共 <span className="font-semibold">{dataSource.length}</span> 条</span>
        <select className="border border-slate-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition shadow-sm">
          <option>20 条/页</option>
          <option>50 条/页</option>
          <option>100 条/页</option>
        </select>
      </div>
      <div className="flex items-center space-x-1">
        <button className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm bg-white" disabled>
          上一页
        </button>
        <span className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-lg shadow-sm">1</span>
        <button className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm bg-white" disabled>
          下一页
        </button>
        <div className="flex items-center space-x-2 pl-2">
            <span>前往</span>
            <input type="number" min="1" className="w-14 border border-slate-300 rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition shadow-sm" />
            <span>页</span>
        </div>
      </div>
    </div>
  );
};
