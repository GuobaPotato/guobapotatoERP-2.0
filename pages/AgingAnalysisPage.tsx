
import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { Pagination } from '../components/Pagination';

export const AgingAnalysisPage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const tableHeaders = [
    "序号", "公司名称", "负责人", "账龄(元)-半年以内",
    "账龄(元)-半年至一年", "账龄(元)-一年至两年", "账龄(元)-两年以上", "合计(元)"
  ];

  const data = [
    {
      id: "1",
      no: "1",
      company: "[示例]海南利达商贸有限公司",
      owner: "王**",
      aging_6m: "0.00",
      aging_1y: "0.00",
      aging_2y: "0.00",
      aging_over2y: "20,000.00",
      total: "20,000.00"
    }
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(data.map(d => d.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full">
      {/* 页面标题 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30 shadow-sm">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">到期应收款账龄构成表</h1>
      </div>

      <div className="p-6 lg:p-8 space-y-6 flex flex-col flex-1 min-h-0">
        {/* 筛选操作区域 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap items-center gap-4">
          <div className="w-full md:w-48 relative">
            <select className={`${inputClass} appearance-none pr-10`}>
              <option value="">选择部门或下属</option>
              <option value="1">销售一部</option>
              <option value="2">销售二部</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div className="w-full md:w-48 relative">
            <input 
              type="date" 
              className={inputClass} 
              defaultValue="2026-01-09"
            />
          </div>

          <div className="w-full md:w-64 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              className={`${inputClass} pl-10`} 
              placeholder="客户名称" 
            />
          </div>

          <div className="flex-1"></div>

          <button className="flex items-center px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 transition-all shadow-md active:scale-95">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            导出
          </button>
        </div>

        {/* 表格区域 */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col flex-1">
          <div className="overflow-x-auto custom-scrollbar flex-1">
            <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  <th className="px-4 py-4 text-left border-b border-slate-200 bg-slate-50 sticky left-0 z-30">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                      checked={data.length > 0 && selectedIds.size === data.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {tableHeaders.map((header, idx) => (
                    <th 
                      key={idx} 
                      className="px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-50">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-4 border-b border-slate-50 sticky left-0 bg-inherit z-10">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-slate-300 text-blue-600" 
                        checked={selectedIds.has(row.id)}
                        onChange={() => handleSelectOne(row.id)}
                      />
                    </td>
                    <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50">{row.no}</td>
                    <td className="px-4 py-4 font-bold text-slate-800 border-b border-slate-50">{row.company}</td>
                    <td className="px-4 py-4 text-slate-600 border-b border-slate-50">{row.owner}</td>
                    <td className="px-4 py-4 text-slate-600 border-b border-slate-50 font-mono">{row.aging_6m}</td>
                    <td className="px-4 py-4 text-slate-600 border-b border-slate-50 font-mono">{row.aging_1y}</td>
                    <td className="px-4 py-4 text-slate-600 border-b border-slate-50 font-mono">{row.aging_2y}</td>
                    <td className="px-4 py-4 text-slate-800 font-bold border-b border-slate-50 font-mono">{row.aging_over2y}</td>
                    <td className="px-4 py-4 text-blue-600 font-black border-b border-slate-50 font-mono">{row.total}</td>
                  </tr>
                ))}
              </tbody>
              {/* 合计行 */}
              <tfoot className="bg-slate-50/80 font-black text-slate-700 sticky bottom-0 z-10 backdrop-blur-sm">
                <tr>
                  <td className="px-4 py-4 border-t border-slate-200"></td>
                  <td className="px-4 py-4 border-t border-slate-200"></td>
                  <td className="px-4 py-4 border-t border-slate-200 uppercase tracking-widest text-[10px]">合计</td>
                  <td className="px-4 py-4 border-t border-slate-200"></td>
                  <td className="px-4 py-4 border-t border-slate-200 font-mono">0.00</td>
                  <td className="px-4 py-4 border-t border-slate-200 font-mono">0.00</td>
                  <td className="px-4 py-4 border-t border-slate-200 font-mono">0.00</td>
                  <td className="px-4 py-4 border-t border-slate-200 font-mono text-slate-900">20,000.00</td>
                  <td className="px-4 py-4 border-t border-slate-200 font-mono text-blue-600">20,000.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          {/* 分页区域 */}
          <div className="bg-white border-t border-slate-100">
             <Pagination dataSource={data} />
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
