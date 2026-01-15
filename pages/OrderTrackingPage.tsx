
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ORDER_TRACKING_DATA, ORDER_TRACKING_HEADERS } from '../constants';
import { Pagination } from '../components/Pagination';

export const OrderTrackingPage: React.FC = () => {
  const [activeSearch, setActiveSearch] = useState(true);

  const inputClass = "block w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full">
      {/* 顶部操作区 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-30">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center">
          订单跟踪
        </h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowPathIcon className="h-4 w-4 mr-1.5" />
            刷新
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            批量提交
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            更多
            <ChevronDownIcon className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-8 flex-1 flex flex-col min-h-0 space-y-6">
        {/* 搜索面板 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            <div>
              <label className={labelClass}>外销合同</label>
              <input type="text" className={inputClass} placeholder="输入合同..." />
            </div>
            <div>
              <label className={labelClass}>客户名称</label>
              <input type="text" className={inputClass} placeholder="输入客户..." />
            </div>
            <div>
              <label className={labelClass}>交货日期起</label>
              <input type="date" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>交货日期终</label>
              <input type="date" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>目的港</label>
              <input type="text" className={inputClass} placeholder="港口名称..." />
            </div>
            <div>
              <label className={labelClass}>商品编号</label>
              <input type="text" className={inputClass} placeholder="编号..." />
            </div>
            <div>
              <label className={labelClass}>中文货名</label>
              <input type="text" className={inputClass} placeholder="货名..." />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-3">
             <button className="px-6 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 transition-all shadow-md">查找</button>
             <button className="px-6 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all">重置</button>
          </div>
        </div>

        {/* 数据表格区 */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full">
          <div className="overflow-x-auto no-scrollbar">
            <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  {ORDER_TRACKING_HEADERS.map((h, i) => (
                    <th 
                      key={h} 
                      className={`
                        px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50
                        ${i === 0 ? 'sticky left-0 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.05)]' : ''}
                        ${h.includes('数量') ? 'text-right' : ''}
                      `}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {ORDER_TRACKING_DATA.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 font-bold text-slate-800 border-b border-slate-50 sticky left-0 z-10 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)] whitespace-nowrap">
                      {item.中文货名}
                    </td>
                    <td className="px-4 py-4 text-right font-mono font-bold text-slate-700 border-b border-slate-50">
                      {item.合同数量.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-right font-mono font-bold text-amber-600 border-b border-slate-50">
                      {item.备货数量.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-right font-mono font-bold text-blue-600 border-b border-slate-50">
                      {item.计划数量.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-right font-mono font-bold text-emerald-600 border-b border-slate-50">
                      {item.出运数量.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-blue-600 font-bold hover:underline cursor-pointer border-b border-slate-50 whitespace-nowrap">
                      {item.外销合同}
                    </td>
                    <td className="px-4 py-4 text-slate-700 font-mono font-bold border-b border-slate-50 whitespace-nowrap">
                      {item.国际货运单号}
                    </td>
                    <td className="px-4 py-4 text-slate-500 border-b border-slate-50 whitespace-nowrap">
                      {item.我方名称}
                    </td>
                    <td className="px-4 py-4 text-slate-700 font-medium border-b border-slate-50 whitespace-nowrap">
                      {item.客户名称}
                    </td>
                    <td className="px-4 py-4 text-slate-500 font-mono border-b border-slate-50 whitespace-nowrap">
                      {item.交货日期}
                    </td>
                    <td className="px-4 py-4 text-slate-500 border-b border-slate-50 whitespace-nowrap">
                      {item.起运港}
                    </td>
                    <td className="px-4 py-4 text-slate-800 font-bold border-b border-slate-50 whitespace-nowrap">
                      {item.目的港}
                    </td>
                    <td className="px-4 py-4 border-b border-slate-50 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.运输方式.includes('Sea') ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-sky-50 text-sky-700 border border-sky-100'}`}>
                        {item.运输方式}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
             <Pagination dataSource={ORDER_TRACKING_DATA} />
          </div>
        </div>
      </div>
    </div>
  );
};
