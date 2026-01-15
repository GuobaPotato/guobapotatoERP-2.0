
import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { PrinterIcon } from '../components/icons/PrinterIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { SHIPPING_PLAN_DATA, SHIPPING_PLAN_HEADERS } from '../constants';
import { ShippingPlanItem } from '../types';
import { AddShippingPlanModal } from '../components/export/AddShippingPlanModal';

export const ShippingPlanPage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(
    SHIPPING_PLAN_DATA.filter(item => item.checked).map(item => item.id)
  ));
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(new Set(SHIPPING_PLAN_DATA.map(d => d.id)));
    else setSelectedIds(new Set());
  };

  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const inputClass = "block w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 筛选区域 */}
      <div className="bg-white border-b border-slate-200 px-6 py-6 sticky top-0 z-30 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className={labelClass}>外销合同</label>
            <input type="text" className={inputClass} placeholder="输入外销合同..." />
          </div>
          <div>
            <label className={labelClass}>出运日期范围</label>
            <div className="flex items-center space-x-2">
              <input type="date" className={inputClass} />
              <span className="text-slate-300">至</span>
              <input type="date" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>我方名称</label>
            <input type="text" className={inputClass} placeholder="输入我方名称..." />
          </div>
          <div>
            <label className={labelClass}>客户名称</label>
            <input type="text" className={inputClass} placeholder="输入客户名称..." />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button className="px-6 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">查找</button>
          <button className="px-6 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all">重置</button>
        </div>
      </div>

      {/* 功能操作栏 */}
      <div className="bg-slate-50 px-6 py-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-all shadow-sm active:scale-95"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            新增
          </button>
          <button className="flex items-center px-4 py-1.5 bg-white border border-slate-300 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowPathIcon className="h-4 w-4 mr-1" />
            刷新
          </button>
          <button className="flex items-center px-4 py-1.5 bg-white border border-slate-300 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
            批量提交
          </button>
          <button className="flex items-center px-4 py-1.5 bg-white border border-slate-300 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
            <PrinterIcon className="h-4 w-4 mr-1" />
            批量打印
          </button>
          <button className="flex items-center px-4 py-1.5 bg-white border border-slate-300 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
            批量下载
          </button>
          
          <div className="relative" ref={moreRef}>
            <button 
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded hover:bg-slate-50 shadow-sm text-xs font-bold"
            >
              更多
              <ChevronDownIcon className={`ml-1 h-3 w-3 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMoreOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-slate-200 rounded shadow-xl z-50 py-1">
                <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 transition-colors">修改负责人</button>
                <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 transition-colors">归档</button>
              </div>
            )}
          </div>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">出运管理模块</div>
      </div>

      <div className="p-6 flex-1 flex flex-col min-h-0">
        {/* 数据表格 */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full">
          <div className="overflow-x-auto no-scrollbar flex-1">
            <table className="min-w-full divide-y divide-slate-100 text-[11px] border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  <th className="px-4 py-3 text-center border-b border-slate-200 bg-slate-50 sticky left-0 z-30">
                    <input 
                      type="checkbox" 
                      className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                      checked={SHIPPING_PLAN_DATA.length > 0 && selectedIds.size === SHIPPING_PLAN_DATA.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {SHIPPING_PLAN_HEADERS.map((h, i) => (
                    <th 
                      key={h} 
                      className={`
                        px-4 py-3 text-left font-black text-slate-600 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50
                        ${i === 1 ? 'sticky left-[50px] z-30 shadow-[2px_0_5px_rgba(0,0,0,0.03)]' : ''}
                        ${h === '操作' ? 'sticky right-0 z-30 bg-slate-50 shadow-[-2px_0_5px_rgba(0,0,0,0.03)] text-center' : ''}
                      `}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {SHIPPING_PLAN_DATA.map((item) => {
                  const isSelected = selectedIds.has(item.id);
                  return (
                    <tr key={item.id} className={`hover:bg-blue-50/20 transition-colors ${isSelected ? 'bg-blue-50/40' : ''}`}>
                      <td className="px-4 py-4 text-center border-b border-slate-50 sticky left-0 z-10 bg-inherit">
                        <input 
                          type="checkbox" 
                          className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                          checked={isSelected}
                          onChange={() => handleSelectOne(item.id)}
                        />
                      </td>
                      <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50">{item.rowNo}</td>
                      <td className="px-4 py-4 font-bold text-blue-600 hover:underline cursor-pointer whitespace-nowrap border-b border-slate-50 sticky left-[50px] z-10 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                        {item.exportContract}
                      </td>
                      <td className="px-4 py-4 font-mono text-slate-700 whitespace-nowrap border-b border-slate-50 leading-relaxed">
                        {item.shippingOrderNo.split(', ').map((no, idx) => (
                          <div key={idx}>{no}</div>
                        ))}
                      </td>
                      <td className="px-4 py-4 text-slate-600 whitespace-nowrap border-b border-slate-50">{item.shippingDate}</td>
                      <td className="px-4 py-4 text-slate-700 font-medium whitespace-nowrap border-b border-slate-50">{item.ourCompanyName}</td>
                      <td className="px-4 py-4 text-slate-700 whitespace-nowrap border-b border-slate-50">{item.customerName}</td>
                      <td className="px-4 py-4 text-center border-b border-slate-50">
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-black">{item.transactionMode || '--'}</span>
                      </td>
                      <td className="px-4 py-4 text-slate-800 font-black border-b border-slate-50">{item.currency}</td>
                      <td className="px-4 py-4 text-slate-500 italic border-b border-slate-50 whitespace-nowrap">{item.freightForwarder || '--'}</td>
                      <td className="px-4 py-4 text-slate-500 whitespace-nowrap border-b border-slate-50 font-mono">{item.deliveryDate}</td>
                      <td className={`px-4 py-4 whitespace-nowrap border-b border-slate-50 font-mono ${item.estimatedETD ? 'text-indigo-600 font-bold' : 'text-slate-300'}`}>{item.estimatedETD || '--'}</td>
                      <td className={`px-4 py-4 whitespace-nowrap border-b border-slate-50 font-mono ${item.estimatedETA ? 'text-emerald-600 font-bold' : 'text-slate-300'}`}>{item.estimatedETA || '--'}</td>
                      <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50">{item.creatorCode}</td>
                      <td className="px-4 py-4 text-slate-600 border-b border-slate-50">{item.creatorName}</td>
                      <td className="px-4 py-4 text-slate-500 truncate max-w-[150px] border-b border-slate-50" title={item.goodsDescription}>{item.goodsDescription}</td>
                      <td className={`px-4 py-4 pr-6 border-b border-slate-50 whitespace-nowrap text-center sticky right-0 z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.03)] ${isSelected ? 'bg-[#f5f8ff]' : 'bg-white'}`}>
                        <div className="flex items-center justify-center space-x-2">
                          <button className="text-[10px] font-black text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors uppercase">编辑</button>
                          <span className="text-slate-200">|</span>
                          <button className="text-[10px] font-black text-rose-600 hover:bg-rose-50 px-2 py-1 rounded transition-colors uppercase">删除</button>
                          <span className="text-slate-200">|</span>
                          <button className="text-[10px] font-black text-slate-500 hover:bg-slate-100 px-2 py-1 rounded transition-colors uppercase">导出</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* 分页信息 */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest gap-4">
             <div className="flex items-center space-x-4">
                <span>共 <span className="text-slate-800 font-black">601</span> 条</span>
                <div className="flex items-center space-x-1">
                   <span>每页:</span>
                   <select className="bg-transparent border-b border-slate-300 focus:outline-none">
                      <option>20条/页</option>
                      <option>50条/页</option>
                   </select>
                </div>
             </div>
             <div className="flex items-center space-x-1">
                <button disabled className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-300">上一页</button>
                {[1, 2, 3, 4, 5, 6].map(p => (
                   <button key={p} className={`px-3 py-1 rounded transition-all ${p === 1 ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-white border border-transparent hover:border-slate-200'}`}>{p}</button>
                ))}
                <span>...</span>
                <button className="px-3 py-1 rounded hover:bg-white border border-transparent hover:border-slate-200 transition-all">31</button>
                <button className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-600 hover:bg-slate-50">下一页</button>
             </div>
          </div>
        </div>
      </div>

      <AddShippingPlanModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};
