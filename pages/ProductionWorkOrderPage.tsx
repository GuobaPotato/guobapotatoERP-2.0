
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { ExclamationTriangleIcon } from '../components/icons/ExclamationTriangleIcon';
import { EyeIcon } from '../components/icons/EyeIcon';

type WorkOrderStatus = '待开工' | '生产中' | '已派工' | '已完成' | '已暂停';
type DetailTab = '工单明细' | '领料/退料' | '生产报工' | '生产工单执行跟踪';

export const ProductionWorkOrderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DetailTab>('工单明细');
  const [activeFilter, setActiveFilter] = useState('全部');

  const workOrderList = [
    { no: "GD-2026011001", leader: "李班组", name: "卫浴组装一组1月配件生产工单", start: "2026/01/10", end: "2026/01/20", status: "已派工" as WorkOrderStatus, progress: 0, ops: ["查看", "编辑", "派工"] },
    { no: "GD-2026011002", leader: "王班组", name: "卫浴组装二组龙头焊接工单", start: "2026/01/10", end: "2026/01/18", status: "生产中" as WorkOrderStatus, progress: 60, ops: ["查看", "报工", "暂停"] },
    { no: "GD-2026011003", leader: "赵班组", name: "组装三组底座组装加急工单", start: "2026/01/12", end: "2026/01/15", status: "待开工" as WorkOrderStatus, progress: 0, ops: ["查看", "开工", "删除"] },
    { no: "GD-2026010901", leader: "李班组", name: "1月9日智能水龙头试产工单", start: "2026/01/09", end: "2026/01/09", status: "已完成" as WorkOrderStatus, progress: 100, ops: ["查看", "归档"] },
  ];

  const statusColors: Record<WorkOrderStatus, string> = {
    '待开工': 'bg-amber-50 text-amber-600 border-amber-100',
    '生产中': 'bg-purple-50 text-purple-600 border-purple-100',
    '已派工': 'bg-blue-50 text-blue-600 border-blue-100',
    '已完成': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    '已暂停': 'bg-rose-50 text-rose-600 border-rose-100',
  };

  const inputClass = "w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all";
  const labelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block";

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 font-sans overflow-hidden">
      {/* 顶部标题与说明 */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex-shrink-0 z-40">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">生产工单</h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">默认以为班组、车间/厂颗粒度生产派工工单；使用说明：生产工单通过该页面，可以一站式完成生产工单业务流程</p>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-lg px-4 py-2 flex items-center">
            <ExclamationTriangleIcon className="h-4 w-4 text-rose-500 mr-2" />
            <span className="text-xs text-rose-600 font-bold">生产工单列表仅班组长及以上权限可见</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar pb-32">
        {/* 快捷入口与列表 */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* 我的待处理 */}
          <div className="xl:col-span-1">
             <button className="w-full bg-blue-600 rounded-2xl p-6 text-white text-left shadow-lg shadow-blue-200 group transition-all hover:scale-[1.02] active:scale-95">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Quick Entry</p>
                <h3 className="text-lg font-bold mt-1">我的待处理工单</h3>
                <div className="mt-6 flex items-baseline justify-between">
                  <span className="text-5xl font-black tabular-nums">3</span>
                  <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                     <ArrowPathIcon className="h-5 w-5" />
                  </div>
                </div>
             </button>
          </div>

          {/* 工单列表表格 */}
          <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
               <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">生产工单列表（班组长专属）</h3>
               <div className="flex items-center space-x-2">
                 <div className="flex bg-white p-1 rounded-lg border border-slate-200 shadow-inner mr-2">
                   {["全部", "待开工", "生产中", "已完成"].map(opt => (
                     <button key={opt} onClick={() => setActiveFilter(opt)} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${activeFilter === opt ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>{opt}</button>
                   ))}
                 </div>
                 <button className="p-2 text-slate-400 hover:bg-white hover:text-blue-600 rounded-lg border border-transparent hover:border-slate-200 transition-all"><ArrowPathIcon className="h-4 w-4" /></button>
                 <button className="p-2 text-slate-400 hover:bg-white hover:text-blue-600 rounded-lg border border-transparent hover:border-slate-200 transition-all"><ArrowDownTrayIcon className="h-4 w-4" /></button>
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-[11px] border-separate border-spacing-0">
                <thead className="bg-white">
                  <tr>
                    {["编号", "负责人", "工单名称", "起止日期", "状态", "进度", "操作"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-black text-slate-400 uppercase border-b border-slate-100">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {workOrderList.map((wo) => (
                    <tr key={wo.no} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-4 py-3 font-mono font-bold text-blue-600">{wo.no}</td>
                      <td className="px-4 py-3 font-bold text-slate-700">{wo.leader}</td>
                      <td className="px-4 py-3 text-slate-800 font-medium truncate max-w-[180px]">{wo.name}</td>
                      <td className="px-4 py-3 text-slate-400 font-mono whitespace-nowrap">{wo.start}-{wo.end}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${statusColors[wo.status]}`}>{wo.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-16 flex flex-col gap-1">
                           <div className="flex justify-between items-center text-[9px] font-black text-slate-400">
                             <span>{wo.progress}%</span>
                           </div>
                           <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${wo.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${wo.progress}%` }} />
                           </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                           {wo.ops.map(op => (
                             <button key={op} className="text-blue-600 hover:underline font-bold">{op}</button>
                           ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 生产工单编辑区 */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-700">
          <div className="px-8 py-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
             <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight">生产工单编辑区</h2>
             </div>
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Editor Mode</span>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="lg:col-span-1">
                  <label className={labelClass}>选择生产计划</label>
                  <div className="relative group">
                    <input type="text" className={`${inputClass} pr-10 bg-white border-blue-200 shadow-sm`} placeholder="选择数据" />
                    <SearchIcon className="absolute right-3 top-2.5 h-3.5 w-3.5 text-blue-500" />
                    <p className="mt-1 text-[9px] text-blue-400 italic leading-tight">选择后自动填充生产计划名称、领料仓库、日期等</p>
                  </div>
               </div>
               <div className="lg:col-span-2">
                  <label className={labelClass}>生产计划名称</label>
                  <input type="text" className={inputClass} readOnly value="智能水龙头2026年1月生产计划" />
               </div>
               <div>
                  <label className={labelClass}>领料仓库</label>
                  <input type="text" className={inputClass} readOnly value="原料仓-卫浴区" />
               </div>

               <div>
                  <label className={labelClass}>生产班组</label>
                  <div className="relative">
                    <select className={`${inputClass} appearance-none pr-10 font-bold text-slate-700`}>
                      <option>组装一组</option>
                      <option>组装二组</option>
                      <option>组装三组</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-3 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                  </div>
               </div>
               <div>
                  <label className={labelClass}>班组长</label>
                  <div className="relative">
                    <input type="text" className={inputClass} readOnly value="李班组" />
                    <p className="mt-1 text-[9px] text-slate-300 italic">根据生产班组自动匹配</p>
                  </div>
               </div>
               <div>
                  <label className={labelClass}>工单开始日期</label>
                  <input type="date" className={inputClass} defaultValue="2026-01-10" />
               </div>
               <div>
                  <label className={labelClass}>工单完工日期</label>
                  <input type="date" className={inputClass} defaultValue="2026-01-20" />
               </div>

               <div>
                  <label className={labelClass}>工单状态</label>
                  <div className="relative">
                    <select className={`${inputClass} appearance-none pr-10 font-bold text-blue-600`}>
                      <option>待开工</option>
                      <option>生产中</option>
                      <option selected>已派工</option>
                      <option>已完成</option>
                      <option>已暂停</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-3 h-3.5 w-3.5 text-blue-400 pointer-events-none" />
                  </div>
               </div>
               <div className="lg:col-span-2">
                  <label className={labelClass}>生产工单名称</label>
                  <input type="text" className={inputClass} defaultValue="组装一组-智能水龙头-20260110" />
               </div>
               <div>
                  <label className={labelClass}>生产工单编号</label>
                  <input type="text" className={`${inputClass} bg-slate-100 text-slate-400 font-mono`} readOnly value="GD-2026011001" />
               </div>
               <div>
                  <label className={labelClass}>产成品批次号</label>
                  <input type="text" className={inputClass} defaultValue="CP20260109001" />
               </div>
            </div>
          </div>

          {/* 明细页签区 */}
          <div className="border-t border-slate-200">
            <div className="bg-slate-50/50 px-8 flex justify-between items-center border-b border-slate-100">
              <nav className="flex space-x-10">
                {["工单明细", "领料/退料", "生产报工", "生产工单执行跟踪"].map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab as DetailTab)}
                    className={`py-4 px-1 border-b-2 font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">执行进度</span>
                  <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[0%]" />
                  </div>
                  <span className="text-[10px] font-black text-blue-600 font-mono">0%</span>
                </div>
                <button className="bg-slate-800 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-black transition-all active:scale-95">快捷报工</button>
              </div>
            </div>

            <div className="p-8 space-y-12 min-h-[400px]">
              {activeTab === '工单明细' && (
                <>
                  <p className="text-xs text-blue-500 font-bold bg-blue-50 p-3 rounded-xl border border-blue-100 inline-block">
                    *选择生产任务后，请选择生产任务所需物料及数量，数据源于《生产领料池》，已做条件过滤
                  </p>

                  {/* 生产工序明细 */}
                  <div className="animate-in slide-in-from-left-4 duration-500">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2 border-l-4 border-slate-800 pl-3">
                         <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">生产工序明细</h4>
                         <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-600 text-[9px] font-black border border-rose-100 animate-pulse">
                           <ExclamationTriangleIcon className="h-3 w-3 inline mr-1" />
                           库存预警：PCB-2026A库存仅50，需领料450
                         </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase hover:bg-blue-700">+ 添加</button>
                        <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-lg text-[10px] font-black uppercase hover:bg-slate-50">快速填报</button>
                        <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-lg text-[10px] font-black uppercase hover:bg-slate-50">复制上一行</button>
                        <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase hover:bg-indigo-700 shadow-md">批量派工</button>
                      </div>
                    </div>
                    <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-inner">
                      <table className="min-w-full divide-y divide-slate-200 text-[10px] border-separate border-spacing-0">
                        <thead className="bg-slate-50">
                          <tr>
                            {["序号", "任务池", "工序名称", "工序编码", "产品名称", "产品编码", "产品属性", "规格型号", "计划生产", "已派工", "*本次派工", "单位", "开工时间", "完工时间", "BOM", "操作员", "本日完成", "累计完成"].map(h => (
                              <th key={h} className="px-3 py-4 text-left font-black text-slate-500 border-b border-slate-200 whitespace-nowrap uppercase tracking-tighter">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-3 py-4 text-slate-400 font-mono">1</td>
                            <td className="px-3 py-4 text-blue-600 font-black cursor-pointer hover:underline">选择数据</td>
                            <td className="px-3 py-4 font-bold text-slate-800">智能水龙头产品焊接</td>
                            <td className="px-3 py-4 font-mono">G001</td>
                            <td className="px-3 py-4 font-medium">001智能水龙头</td>
                            <td className="px-3 py-4 font-mono text-slate-400">P001</td>
                            <td className="px-3 py-4">智能卫浴</td>
                            <td className="px-3 py-4">PCB-2026A</td>
                            <td className="px-3 py-4 font-mono font-black text-slate-800">500</td>
                            <td className="px-3 py-4 font-mono text-slate-400">0</td>
                            <td className="px-3 py-2">
                               <input type="number" className="w-16 px-2 py-1 border border-blue-200 rounded font-black text-blue-600 bg-blue-50/30" defaultValue="500" />
                            </td>
                            <td className="px-3 py-4">个</td>
                            <td className="px-3 py-4 font-mono text-slate-400">2026-01-10</td>
                            <td className="px-3 py-4 font-mono text-slate-400">2026-01-15</td>
                            <td className="px-3 py-4 font-mono text-slate-300">BOM-P001</td>
                            <td className="px-3 py-4 font-bold text-slate-700">张工</td>
                            <td className="px-3 py-4 font-mono text-slate-400">0</td>
                            <td className="px-3 py-4 font-mono text-slate-400">0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 领料产品明细 */}
                  <div className="animate-in slide-in-from-left-4 duration-500 delay-150">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2 border-l-4 border-indigo-600 pl-3">
                         <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">领料产品明细</h4>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase hover:bg-blue-700">+ 添加</button>
                        <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-lg text-[10px] font-black uppercase hover:bg-slate-50">快速填报</button>
                        <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase hover:bg-emerald-700 shadow-md">一键领料</button>
                        <button className="px-3 py-1.5 bg-white border border-slate-300 text-rose-600 rounded-lg text-[10px] font-black uppercase hover:bg-rose-50">退料</button>
                      </div>
                    </div>
                    <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-inner">
                      <table className="min-w-full divide-y divide-slate-200 text-[10px] border-separate border-spacing-0">
                        <thead className="bg-slate-50">
                          <tr>
                            {["序号", "领料池", "生产产品", "编码", "工序", "编码", "物料名称", "编码", "属性", "规格", "需求量", "已领料", "*本次需求", "单位", "领料状态", "领料人"].map(h => (
                              <th key={h} className="px-3 py-4 text-left font-black text-slate-500 border-b border-slate-200 whitespace-nowrap uppercase tracking-tighter">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr className="hover:bg-indigo-50/30 transition-colors">
                            <td className="px-3 py-4 text-slate-400 font-mono">1</td>
                            <td className="px-3 py-4 text-blue-600 font-black cursor-pointer">选择数据</td>
                            <td className="px-3 py-4 font-bold text-slate-700">主控电路板</td>
                            <td className="px-3 py-4 font-mono text-slate-400">P001</td>
                            <td className="px-3 py-4">电路板焊接</td>
                            <td className="px-3 py-4 font-mono">G001</td>
                            <td className="px-3 py-4 font-bold text-slate-900">电阻</td>
                            <td className="px-3 py-4 font-mono text-slate-400">M001</td>
                            <td className="px-3 py-4 text-slate-500">电子元器件</td>
                            <td className="px-3 py-4">R-100Ω</td>
                            <td className="px-3 py-4 font-mono font-black text-slate-800">2000</td>
                            <td className="px-3 py-4 font-mono text-slate-400">0</td>
                            <td className="px-3 py-2">
                               <input type="number" className="w-20 px-2 py-1 border border-indigo-200 rounded font-black text-indigo-600 bg-indigo-50/30" defaultValue="2000" />
                            </td>
                            <td className="px-3 py-4">个</td>
                            <td className="px-3 py-4">
                               <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-bold border border-slate-200">待领料</span>
                            </td>
                            <td className="px-3 py-4 font-bold text-slate-600">李工</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {activeTab !== '工单明细' && (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                   <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                      <Cog6ToothIcon className="h-8 w-8 text-slate-300 animate-spin-slow" />
                   </div>
                   <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">模块交互开发中...</p>
                   <p className="text-[10px] text-slate-300 mt-2 font-bold">MODULE {activeTab.toUpperCase()} PENDING</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* 底部固定操作栏 */}
      <div className="fixed bottom-0 right-0 left-64 bg-white/80 backdrop-blur-md border-t border-slate-200 px-8 py-5 flex items-center justify-between z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center space-x-4">
           <button className="px-6 py-2 text-slate-500 font-black text-xs uppercase tracking-widest hover:text-blue-600 transition-colors">预览工单</button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-10 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95">保存草稿</button>
          <button className="px-16 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 transform active:scale-95 uppercase tracking-widest">确认提交</button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const Cog6ToothIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.797.935.391.162.821.125 1.183-.095l.765-.465c.47-.284 1.083-.19 1.447.224l.773.882c.364.414.4 1.026.084 1.482l-.517.744a1.207 1.207 0 0 0-.102 1.22c.17.391.51.704.94.773l.894.149c.542.09.94.56.94 1.11v1.093c0 .55-.398 1.02-.94 1.11l-.894.149c-.43.07-.77.384-.94.797a1.207 1.207 0 0 0 .102 1.222l.517.744c.316.456.28 1.068-.084 1.482l-.773.882c-.364.414-.977.508-1.447.224l-.765-.465a1.207 1.207 0 0 0-1.183-.095c-.413.17-.727.51-.797.94l-.149.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.43-.384-.77-.797-.94a1.207 1.207 0 0 0-1.183.095l-.765.465c-.47.284-1.083.19-1.447-.224l-.773-.882c-.364-.414-.4-1.026-.084-1.482l.517-.744a1.207 1.207 0 0 0 .102-1.222c-.17-.413-.51-.727-.94-.797l-.894-.149c-.542-.09-.94-.56-.94-1.11v-1.093c0-.55.398-1.02.94-1.11l.894-.149c.43-.07.77-.384.94-.797a1.207 1.207 0 0 0-.102-1.22l-.517-.744c-.316-.456-.28-1.068.084-1.482l.773-.882c.364-.414.977-.508 1.447-.224l.765.465a1.207 1.207 0 0 0 1.183.095c.413-.17.727-.51.797-.94l.149-.894Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);
