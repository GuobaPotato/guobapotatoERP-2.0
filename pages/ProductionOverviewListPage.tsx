
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { FilterIcon } from '../components/icons/FilterIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { Cog6ToothIcon } from '../components/icons/Cog6ToothIcon';
import { PRODUCTION_OVERVIEW_DATA } from '../constants';
import { ProductionOverviewItem } from '../types';

export const ProductionOverviewListPage: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState('全部');
  const [warningFilter, setWarningFilter] = useState('全部');
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(new Set(PRODUCTION_OVERVIEW_DATA.map(i => i.productionWorkOrderNo)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectOne = (no: string) => {
    const next = new Set(selectedItems);
    if (next.has(no)) next.delete(no);
    else next.add(no);
    setSelectedItems(next);
  };

  const warningCounts = {
    "全部": 3,
    "工单逾期": 1,
    "质检异常": 0,
    "入库缺口": 2
  };

  const statusColors: Record<string, string> = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    gray: 'bg-slate-50 text-slate-500 border-slate-200',
    yellow: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none pr-8";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 顶部标题与remark */}
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex-shrink-0 z-40 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">生产列表</h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">生产全流程总览中枢，联动生产计划、工单、入库、质检全环节数据</p>
          </div>
          <div className="flex items-center space-x-3">
             <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all" title="刷新数据">
               <ArrowPathIcon className="h-5 w-5" />
             </button>
             <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
                <Cog6ToothIcon className="h-4 w-4 mr-2" />
                自定义视图
             </button>
          </div>
        </div>
      </header>

      {/* 功能条 */}
      <div className="p-6 lg:p-8 space-y-6 flex flex-col flex-1 min-h-0">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-wrap items-center gap-6">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">角色视角筛选</label>
            <div className="relative">
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className={`${inputClass} min-w-[160px] font-bold text-slate-700`}
              >
                <option value="全部">全部角色</option>
                <option value="班组长视角">班组长视角</option>
                <option value="仓库视角">仓库视角</option>
                <option value="生产主管视角">生产主管视角</option>
              </select>
              <ChevronDownIcon className="absolute right-2.5 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">异常预警过滤</label>
            <div className="flex space-x-2">
              {Object.entries(warningCounts).map(([label, count]) => (
                <button
                  key={label}
                  onClick={() => setWarningFilter(label)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                    warningFilter === label 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {label}
                  {count > 0 && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${warningFilter === label ? 'bg-white text-blue-600' : 'bg-rose-500 text-white'}`}>
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
             <div className="relative">
               <button 
                onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                className="flex items-center px-6 py-2 bg-slate-800 text-white rounded-xl text-sm font-black hover:bg-black transition-all active:scale-95 shadow-md uppercase tracking-widest"
               >
                 批量操作
                 <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform ${isActionMenuOpen ? 'rotate-180' : ''}`} />
               </button>
               {isActionMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl z-[60] overflow-hidden ring-1 ring-black ring-opacity-5 py-2">
                    {[
                      { name: "批量开工", style: "text-slate-700" },
                      { name: "批量完结", style: "text-slate-700" },
                      { name: "批量导出异常报告", style: "text-rose-600" },
                      { name: "批量触发入库提醒", style: "text-indigo-600 font-bold" }
                    ].map(opt => (
                      <button key={opt.name} className={`w-full text-left px-4 py-2.5 text-xs hover:bg-slate-50 transition-colors font-medium ${opt.style}`}>
                        {opt.name}
                      </button>
                    ))}
                  </div>
               )}
             </div>
             <button className="flex items-center px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 shadow-sm transition-all">
                <ArrowDownTrayIcon className="h-4 w-4 mr-2 text-slate-500" />
                导出Excel
             </button>
          </div>
        </div>

        {/* 生产数据看板表格 */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-1">
          <div className="overflow-x-auto flex-1 custom-scrollbar">
            <table className="min-w-[2200px] divide-y divide-slate-100 text-[11px] border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-30">
                <tr>
                  <th className="sticky left-0 z-40 bg-slate-50 px-4 py-4 border-b border-slate-200 w-12 text-center shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      checked={PRODUCTION_OVERVIEW_DATA.length > 0 && selectedItems.size === PRODUCTION_OVERVIEW_DATA.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {[
                    "生产计划编号", "生产工单编号", "生产入库单编号", "产品名称", "产品批次号", "生产班组", "班组长", "工单状态", "计划产量", "已派工数量", "已入库数量", "生产进度条", "入库进度条", "预警状态", "整体进度", "操作"
                  ].map((header, idx) => {
                    const isHidden = (roleFilter === '班组长视角' && ["生产入库单编号", "入库进度条", "入库仓库"].includes(header)) ||
                                    (roleFilter === '仓库视角' && ["已派工数量", "生产进度条", "班组长"].includes(header));
                    if (isHidden) return null;
                    return (
                      <th
                        key={header}
                        scope="col"
                        className={`
                          py-4 px-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50
                          ${idx === 0 ? 'sticky left-12 z-40 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100' : ''}
                          ${header === '操作' ? 'sticky right-0 z-40 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] text-center border-l' : ''}
                        `}
                      >
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-50">
                {PRODUCTION_OVERVIEW_DATA.map((row) => {
                  const isSelected = selectedItems.has(row.productionWorkOrderNo);
                  return (
                    <tr key={row.productionWorkOrderNo} className={`hover:bg-blue-50/40 transition-colors group ${isSelected ? 'bg-blue-50/60' : ''}`}>
                      <td className="sticky left-0 z-20 px-4 py-4 text-center border-b border-slate-50 bg-inherit transition-colors shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer" 
                          checked={isSelected}
                          onChange={() => handleSelectOne(row.productionWorkOrderNo)}
                        />
                      </td>

                      {/* 渲染数据列逻辑 */}
                      {(Object.keys(row) as (keyof ProductionOverviewItem)[]).map((key, idx) => {
                        const header = [
                          "生产计划编号", "生产工单编号", "生产入库单编号", "产品名称", "产品批次号", "生产班组", "班组长", "工单状态", "计划产量", "已派工数量", "已入库数量", "生产进度条", "入库进度条", "预警状态", "整体进度", "操作"
                        ][idx];
                        
                        const isHidden = (roleFilter === '班组长视角' && ["生产入库单编号", "入库进度条", "入库仓库"].includes(header)) ||
                                        (roleFilter === '仓库视角' && ["已派工数量", "生产进度条", "班组长"].includes(header));
                        if (isHidden) return null;

                        const val = row[key];
                        const isStickyFirst = idx === 0;

                        if (key === 'workOrderStatus') {
                          const status = val as ProductionOverviewItem['workOrderStatus'];
                          return (
                            <td key={key} className="px-4 py-4 border-b border-slate-50">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase ${statusColors[status.tagStyle]}`} title={status.hoverTips}>
                                {status.text}
                              </span>
                            </td>
                          );
                        }

                        if (key === 'productionProgressBar' || key === 'warehousingProgressBar') {
                          const progress = val as ProductionOverviewItem['productionProgressBar'];
                          return (
                            <td key={key} className="px-4 py-4 border-b border-slate-50">
                              <div className="w-24">
                                <div className="flex justify-between items-center mb-1 text-[9px] font-black text-slate-400">
                                   <span>{progress.text}</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div className={`h-full ${statusColors[progress.style].replace('text-', 'bg-').split(' ')[0]}`} style={{ width: `${progress.value}%` }} />
                                </div>
                              </div>
                            </td>
                          );
                        }

                        if (key === 'warningStatus') {
                          const warning = val as ProductionOverviewItem['warningStatus'];
                          return (
                            <td key={key} className="px-4 py-4 border-b border-slate-50">
                              {warning.text !== '-' ? (
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border uppercase shadow-sm ${statusColors[warning.tagStyle]}`} title={warning.hoverTips}>
                                  {warning.text}
                                </span>
                              ) : <span className="text-slate-300">-</span>}
                            </td>
                          );
                        }

                        if (key === 'operations') {
                          return (
                            <td key={key} className="sticky right-0 z-20 px-4 py-4 border-b border-slate-50 bg-inherit shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] border-l text-center">
                               <div className="flex justify-center space-x-2">
                                  {/* 删除了查看按钮 */}
                                  {row.workOrderStatus.text === '生产中' && <button className="text-emerald-600 hover:text-emerald-800 font-bold transition-colors">报工</button>}
                               </div>
                            </td>
                          );
                        }

                        return (
                          <td 
                            key={key} 
                            className={`px-4 py-4 border-b border-slate-50 whitespace-nowrap ${isStickyFirst ? 'sticky left-12 z-20 bg-inherit shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-r font-bold text-blue-600' : 'text-slate-600 font-medium'} ${typeof val === 'number' ? 'font-mono text-right pr-8' : ''}`}
                          >
                            {val.toString()}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <footer className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest flex-shrink-0">
             <div className="flex items-center space-x-6">
                <span>Total: {PRODUCTION_OVERVIEW_DATA.length} Entries</span>
                <div className="flex items-center space-x-2">
                   <span>PageSize:</span>
                   <select className="bg-transparent border-b border-slate-300 focus:outline-none">
                      <option>20/page</option>
                      <option>50/page</option>
                   </select>
                </div>
             </div>
             <div className="flex items-center space-x-2">
                <button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed uppercase">Prev</button>
                <span className="px-3 py-1 bg-blue-600 text-white rounded font-bold shadow-sm">1</span>
                <button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed uppercase">Next</button>
             </div>
          </footer>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 2px solid #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};
