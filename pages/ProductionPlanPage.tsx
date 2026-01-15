
import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { Cog6ToothIcon } from '../components/icons/Cog6ToothIcon';

type TabType = '计划明细' | '生产工单' | '生产进度单' | '生产派工' | '生产入库单' | '生产执行跟踪';

export const ProductionPlanPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('计划明细');

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-slate-50 disabled:text-slate-400";
  const readonlyInputClass = "mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1";
  const sectionTitleClass = "flex items-center space-x-2 mb-4 border-l-4 border-blue-600 pl-3";
  const tableHeaderClass = "px-4 py-3 text-left text-[11px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-200 whitespace-nowrap bg-slate-50";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-40">
        <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">生产计划</h1>
            <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-all">模板下载</button>
            </div>
        </div>
        <div className="bg-blue-50/50 border border-blue-100 rounded-lg px-4 py-2.5">
          <p className="text-xs text-blue-600 font-medium leading-relaxed">
            注：1. 以上为标准生产、全生产、全生产、生产加工、生产加工； 2. 系统为生产提供的标准格式，可一次性完成所有生产的管理；
          </p>
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-8 flex-1">
        {/* 基础信息区 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-6">
            <div>
              <label className={labelClass}>单号/名称</label>
              <input type="text" className={inputClass} defaultValue="生产计划单[2024M01]" />
            </div>
            <div>
              <label className={labelClass}>计划开始日期</label>
              <input type="date" className={inputClass} defaultValue="2024-01-10" />
            </div>
            <div>
              <label className={labelClass}>计划完工日期</label>
              <input type="date" className={inputClass} defaultValue="2024-01-31" />
            </div>
            <div>
              <label className={labelClass}>计划类别</label>
              <select className={inputClass} defaultValue="计划">
                <option>计划</option>
                <option>紧急</option>
                <option>打样</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>计划状态</label>
              <select className={inputClass} defaultValue="已计划">
                <option>拟稿中</option>
                <option>已计划</option>
                <option>生产中</option>
                <option>已完成</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>成品入库仓库</label>
              <input type="text" className={inputClass} defaultValue="成品仓" />
            </div>
            <div>
              <label className={labelClass}>领料仓库</label>
              <input type="text" className={inputClass} defaultValue="成品仓" />
            </div>
            <div>
              <label className={labelClass}>生产负责人</label>
              <input type="text" className={inputClass} defaultValue="生产计划员" />
            </div>
            <div>
              <label className={labelClass}>生产计划编号</label>
              <div className="relative">
                <input type="text" disabled className={readonlyInputClass} value="SC-JH-20240110001" />
                <p className="absolute -bottom-4 left-0 text-[9px] text-slate-400 italic">自动生成无需填写</p>
              </div>
            </div>
            <div>
              <label className={labelClass}>产成品批次号</label>
              <input type="text" className={inputClass} defaultValue="SC2024S_1A001" />
            </div>
          </div>
        </section>

        {/* 模块导航 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="border-b border-slate-200 px-8 bg-slate-50/50 overflow-x-auto no-scrollbar">
            <nav className="flex space-x-10">
              {['计划明细', '生产工单', '生产进度单', '生产派工', '生产入库单', '生产执行跟踪'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as TabType)}
                  className={`py-5 px-2 text-sm font-black border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === '计划明细' && (
            <div className="p-8 space-y-12 animate-in fade-in duration-500">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start space-x-3">
                 <div className="mt-0.5 text-blue-600 font-bold text-sm">💡</div>
                 <p className="text-xs text-blue-700 font-bold leading-relaxed">
                    请先选择生产，再进行生产。工作任务会直接同步到生产进度单（生产任务），请先在（生产任务）进行派工生产。
                 </p>
              </div>

              {/* 生产任务明细 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className={sectionTitleClass + " mb-0"}>
                    <h4 className="text-md font-bold text-slate-800">生产任务明细</h4>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95">
                      <PlusIcon className="h-3 w-3 mr-1" /> 增加
                    </button>
                    <button className="flex items-center px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-lg text-xs font-bold shadow-sm hover:bg-slate-50">
                       格式调整
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
                  <table className="min-w-full divide-y divide-slate-200 text-xs">
                    <thead>
                      <tr>
                        {["选择产品", "产品名称", "产品编码", "产品类型", "物料型号", "*计划生产数量", "生产单位", "获取方式"].map(h => (
                          <th key={h} className={tableHeaderClass}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr>
                        <td className="px-4 py-4 text-blue-600 font-bold hover:underline cursor-pointer">选择</td>
                        <td className="px-4 py-4 font-bold text-slate-800">001智能水龙头</td>
                        <td className="px-4 py-4 font-mono">P001</td>
                        <td className="px-4 py-4"><span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full font-bold">成品</span></td>
                        <td className="px-4 py-4">PCB-2026A</td>
                        <td className="px-4 py-4"><input type="text" className="w-24 border border-blue-200 rounded px-2 py-1 font-black text-blue-600 bg-blue-50/20" defaultValue="500.00" /></td>
                        <td className="px-4 py-4">个</td>
                        <td className="px-4 py-4 text-slate-500 font-medium">组装</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 生产工序明细 */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className={sectionTitleClass + " mb-0 border-emerald-500"}>
                    <h4 className="text-md font-bold text-slate-800">生产工序明细</h4>
                  </div>
                  <button className="text-xs font-bold text-emerald-600 flex items-center hover:underline">
                    <ArrowPathIcon className="h-3 w-3 mr-1" /> 自动生成工序
                  </button>
                </div>
                <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm custom-scrollbar">
                  <table className="min-w-full divide-y divide-slate-200 text-[10px]">
                    <thead>
                      <tr>
                        {["操作", "产品名称", "产品编码", "物料型号", "工序名称", "工序编码", "工序计划数量", "生产单位", "计划开始日期", "计划完工日期", "生产班组", "班组长", "操作员", "EOM编码", "生产工单标题"].map(h => (
                          <th key={h} className={tableHeaderClass}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {[
                        { name: "电路板焊接", code: "P001", model: "BH-GA171-1500", proc: "焊接", procCode: "G001", qty: "500.00", unit: "个", group: "A组", eom: "EOM006", title: "生产：电路板焊接" },
                        { name: "外壳组装", code: "G002", model: "BH-GA171-1501", proc: "组装", procCode: "G002", qty: "500.00", unit: "支", group: "C组", eom: "EOM005", title: "组装：外壳组装" }
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-4 text-blue-600 font-bold cursor-pointer">操作</td>
                          <td className="px-4 py-4 text-slate-800 font-bold whitespace-nowrap">{row.name}</td>
                          <td className="px-4 py-4 font-mono">{row.code}</td>
                          <td className="px-4 py-4 text-slate-500">{row.model}</td>
                          <td className="px-4 py-4 font-bold text-indigo-600">{row.proc}</td>
                          <td className="px-4 py-4 font-mono">{row.procCode}</td>
                          <td className="px-4 py-4 text-right font-black text-slate-800">{row.qty}</td>
                          <td className="px-4 py-4 text-center">{row.unit}</td>
                          <td className="px-4 py-4 font-mono text-slate-400 whitespace-nowrap">2024-01-10</td>
                          <td className="px-4 py-4 font-mono text-slate-400 whitespace-nowrap">2024-01-31</td>
                          <td className="px-4 py-4"><span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200 font-bold">{row.group}</span></td>
                          <td className="px-4 py-4 text-emerald-600 font-black">是</td>
                          <td className="px-4 py-4 text-emerald-600 font-black">是</td>
                          <td className="px-4 py-4 font-mono text-slate-400">{row.eom}</td>
                          <td className="px-4 py-4 text-slate-500 italic whitespace-nowrap">{row.title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 生产物料BOM需求 */}
              <div className="space-y-8 pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between">
                   <div className={sectionTitleClass + " mb-0 border-rose-500"}>
                    <h4 className="text-md font-bold text-slate-800 uppercase tracking-widest">生产物料BOM需求分析</h4>
                   </div>
                   <p className="text-xs text-slate-400 italic">说明：生产物料可点击选择，选择后填充相关数据</p>
                </div>

                {/* 子BOM需求表 */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm custom-scrollbar">
                  <table className="min-w-full divide-y divide-slate-200 text-[10px]">
                    <thead>
                      <tr>
                        {["生产产品名称", "生产产品编码", "工序编码", "工序名称", "产品名称", "产品编码", "产品类型", "物料型号", "必产生产所需数量", "最小产品需求量", "计划生产需求量", "生产单位", "（计划单位）", "仓库单位", "获取方式", "生产班组"].map(h => (
                          <th key={h} className={tableHeaderClass}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-50">
                      {[
                        { parent: "主控电路板", pCode: "P001", procCode: "G001", proc: "焊接", mName: "电路板焊接", mCode: "M001", type: "主料", model: "BH-GA171-1500", req: "500.00", min: "500.00", plan: "550.00", unit: "个", method: "采购", group: "A组" },
                        { parent: "设备外壳", pCode: "G002", procCode: "GX003", proc: "组装", mName: "外壳组装", mCode: "P002", type: "主料", model: "5997", req: "500.00", min: "500.00", plan: "550.00", unit: "个", method: "采购", group: "C组" }
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-4 font-bold text-slate-700">{row.parent}</td>
                          <td className="px-4 py-4 font-mono text-slate-400">{row.pCode}</td>
                          <td className="px-4 py-4 font-mono text-slate-400">{row.procCode}</td>
                          <td className="px-4 py-4">{row.proc}</td>
                          <td className="px-4 py-4 font-bold text-blue-600">{row.mName}</td>
                          <td className="px-4 py-4 font-mono">{row.mCode}</td>
                          <td className="px-4 py-4"><span className="text-rose-600 font-bold">{row.type}</span></td>
                          <td className="px-4 py-4 text-slate-400">{row.model}</td>
                          <td className="px-4 py-4 text-right">{row.req}</td>
                          <td className="px-4 py-4 text-right font-medium">{row.min}</td>
                          <td className="px-4 py-4 text-right font-black text-rose-500">{row.plan}</td>
                          <td className="px-4 py-4 text-center">{row.unit}</td>
                          <td className="px-4 py-4 text-right text-slate-300">500.00</td>
                          <td className="px-4 py-4 text-center">个</td>
                          <td className="px-4 py-4"><span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-black">{row.method}</span></td>
                          <td className="px-4 py-4">{row.group}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 子产品采购需求 */}
                <div>
                   <div className="flex items-center space-x-2 mb-4">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                      <h5 className="text-sm font-black text-slate-700">子产品采购需求 (采购工单预生成)</h5>
                   </div>
                   <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm custom-scrollbar">
                    <table className="min-w-full divide-y divide-slate-200 text-[10px]">
                      <thead>
                        <tr>
                          {["生产产品名称", "产品编码", "产品类型", "物料型号", "计划生产需求量", "生产单位", "（计划单位）", "仓库可购单位", "仓库单位", "获取方式", "*是否需要采购"].map(h => (
                            <th key={h} className={tableHeaderClass}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-50">
                        {[
                          { name: "主控电路板", code: "P001", type: "主料", model: "BH-GA171-1500", plan: "500.00", unit: "个", availability: "部分可用", method: "采购", need: "是" },
                          { name: "设备外壳", code: "G002", type: "主料", model: "5997", plan: "500.00", unit: "个", availability: "部分可用", method: "采购", need: "是" }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-4 py-4 font-bold text-slate-800">{row.name}</td>
                            <td className="px-4 py-4 font-mono text-slate-400">{row.code}</td>
                            <td className="px-4 py-4 text-slate-500">{row.type}</td>
                            <td className="px-4 py-4 text-slate-400">{row.model}</td>
                            <td className="px-4 py-4 text-right font-black text-slate-700">{row.plan}</td>
                            <td className="px-4 py-4 text-center">{row.unit}</td>
                            <td className="px-4 py-4 text-right font-mono text-slate-300">550.00</td>
                            <td className="px-4 py-4"><span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded font-bold">{row.availability}</span></td>
                            <td className="px-4 py-4 text-center">个</td>
                            <td className="px-4 py-4">{row.method}</td>
                            <td className="px-4 py-4 text-center font-black text-emerald-600">{row.need}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== '计划明细' && (
            <div className="flex flex-col items-center justify-center py-40 bg-white">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Cog6ToothIcon className="h-8 w-8 text-slate-200 animate-spin-slow" />
               </div>
               <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Module {activeTab} Developing...</p>
               <p className="text-[10px] text-slate-300 mt-2 italic">系统正在对该模块进行动态数据挂载</p>
            </div>
          )}
        </section>
      </div>

      {/* 底部悬浮操作区 */}
      <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-slate-200 px-8 py-5 flex justify-end items-center space-x-4 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] z-40">
        <button className="px-10 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95">保存</button>
        <button className="px-16 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 transform active:scale-95 uppercase tracking-widest">计算提交</button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};
