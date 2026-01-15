
import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { SelectWorkOrderModal } from '../components/production/SelectWorkOrderModal';

export const ProductionReportingPage: React.FC = () => {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<any>(null);

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed";
  const readonlyInputClass = "mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed";
  const labelClass = "block text-sm font-semibold text-slate-700";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;
  const sectionTitleClass = "flex items-center space-x-2 mb-6 border-l-4 border-blue-600 pl-3";
  const tableHeaderClass = "px-4 py-3 text-left text-[11px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-200 whitespace-nowrap bg-slate-50";

  const handleSelectWorkOrder = (data: any) => {
    setSelectedWorkOrder(data);
  };

  const defaultDetails = [
    {
      serialNo: 1,
      processName: "外壳注塑",
      processCode: "GX-001",
      productName: "感应龙头外壳（ABS）",
      productCode: "SP-001",
      productAttribute: "医用级防菌",
      specModel: "12*45*123",
      productionDispatchQty: "500",
      reportedQty: "0",
      currentReportedQty: "500",
      productionUnit: "件",
      processCompletionRate: "100%"
    },
    {
      serialNo: 2,
      processName: "精密组装",
      processCode: "GX-002",
      productName: "感应龙头外壳（ABS）",
      productCode: "SP-001",
      productAttribute: "医用级防菌",
      specModel: "12*45*123",
      productionDispatchQty: "500",
      reportedQty: "0",
      currentReportedQty: "500",
      productionUnit: "件",
      processCompletionRate: "100%"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans pb-24">
      {/* 顶部标题区 */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-40">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight uppercase">生产报工</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-all active:scale-95">数据管理</button>
          </div>
        </div>
        <p className="text-sm text-slate-400 font-medium italic">
          默认为班组、车间做“日”颗粒度的生产报工
        </p>
      </div>

      <div className="p-6 lg:p-8 space-y-8 flex-1 min-h-0">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Section 1: 生产计划信息 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">生产计划信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
              <div>
                <label className={requiredLabelClass}>选择生产工单</label>
                <div className="relative mt-1">
                  <button 
                    onClick={() => setIsSelectModalOpen(true)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white hover:bg-slate-50 transition-colors shadow-sm group"
                  >
                    <span className={selectedWorkOrder ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                      {selectedWorkOrder ? selectedWorkOrder.productionWorkOrderName : '选择数据'}
                    </span>
                    <SearchIcon className="h-4 w-4 text-slate-400 group-hover:text-blue-500" />
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClass}>生产工单名称</label>
                <input type="text" className={inputClass} disabled value={selectedWorkOrder?.productionWorkOrderName || "感应龙头外壳（ABS）组装+检测工单"} />
              </div>
              <div>
                <label className={labelClass}>生产计划名称</label>
                <input type="text" className={inputClass} disabled value={selectedWorkOrder?.productionPlanName || "感应龙头外壳生产计划202601"} />
              </div>
              <div>
                <label className={labelClass}>班组长</label>
                <input type="text" className={inputClass} disabled value={selectedWorkOrder?.teamLeader || "李班组"} />
              </div>
              <div>
                <label className={labelClass}>生产班组</label>
                <input type="text" className={inputClass} disabled value={selectedWorkOrder?.productionTeam || "组装一班"} />
              </div>
              <div>
                <label className={requiredLabelClass}>报工时间</label>
                <input type="datetime-local" className={inputClass} defaultValue="2026-01-09T20:20" />
              </div>
              <div>
                <label className={labelClass}>产成品批次号</label>
                <div className="relative">
                  <input type="text" className={inputClass} disabled value={selectedWorkOrder?.finishedProductBatchNo || "QC-20260109"} />
                  <p className="absolute -bottom-5 left-0 text-[10px] text-blue-500 font-medium">* 关联质检</p>
                </div>
              </div>
              <div>
                <label className={labelClass}>生产报工单编号</label>
                <div className="relative">
                  <input type="text" disabled className={readonlyInputClass} value="BG-20260109001" />
                  <p className="absolute -bottom-5 left-0 text-[10px] text-slate-400 font-medium italic">* 自动生成无需填写</p>
                </div>
              </div>
              <div>
                <label className={labelClass}>工单状态</label>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold border ${selectedWorkOrder?.workOrderStatus === '待派工' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                    {selectedWorkOrder?.workOrderStatus || "已派工"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 生产报工明细 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex justify-between items-center mb-6">
              <div className={sectionTitleClass + " mb-0"}>
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">生产报工明细</h3>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                  <PlusIcon className="h-4 w-4 mr-1.5" /> 添加
                </button>
                <button className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors border border-slate-200">
                  <ArrowPathIcon className="h-4 w-4 mr-1.5" /> 快速填报
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-lg inline-block border border-slate-100">报工产品明细</h4>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm custom-scrollbar">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead>
                  <tr>
                    {["#", "工序名称", "工序编码", "产品名称", "产品编码", "产品属性", "规格型号", "生产派工数量", "已报工数量", "*本次报工数量", "生产单位", "工序完成率"].map((h) => (
                      <th key={h} className={tableHeaderClass}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {(selectedWorkOrder ? [selectedWorkOrder] : defaultDetails).map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-4 font-mono text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-4 text-slate-800 font-bold">{item.processName}</td>
                      <td className="px-4 py-4 font-mono text-slate-500">{item.processCode}</td>
                      <td className="px-4 py-4 text-slate-700 font-medium">{item.productName}</td>
                      <td className="px-4 py-4 font-mono text-slate-400">{item.productCode}</td>
                      <td className="px-4 py-4 text-slate-600">{item.productAttribute}</td>
                      <td className="px-4 py-4 text-slate-500">{item.specModel}</td>
                      <td className="px-4 py-4 text-right font-mono font-bold">{item.plannedProductionQty || item.productionDispatchQty}</td>
                      <td className="px-4 py-4 text-right font-mono text-slate-400">{item.dispatchedQty || item.reportedQty}</td>
                      <td className="px-4 py-2">
                        <input type="number" className="w-24 px-2 py-1.5 border border-blue-200 rounded focus:ring-1 focus:ring-blue-500 outline-none text-center font-black text-blue-600 bg-blue-50/30" defaultValue={item.currentDispatchedQty || item.currentReportedQty} />
                      </td>
                      <td className="px-4 py-4 text-center">{item.unit || item.productionUnit}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-full" />
                          </div>
                          <span className="font-bold text-emerald-600">100%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: 统计信息 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">统计信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">报工总数</p>
                  <p className="text-3xl font-black text-blue-600 tracking-tighter">{selectedWorkOrder ? selectedWorkOrder.currentDispatchedQty : '500'}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <PlusIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">报工工序完成率</p>
                  <p className="text-3xl font-black text-emerald-600 tracking-tighter">100%</p>
                </div>
                <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <ArrowPathIcon className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: 报工备注 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">报工备注</h3>
            </div>
            <div className="max-w-4xl">
              <textarea 
                rows={4} 
                className={`${inputClass} !bg-slate-50 resize-none p-4 text-slate-700 leading-relaxed font-medium`}
                placeholder="请输入报工相关详细备注..."
                defaultValue="当日生产进度推进正常，工序合格。"
              />
              <div className="mt-2 flex justify-end">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Max 2000 chars</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* 底部悬浮操作栏 */}
      <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-slate-200 px-8 py-5 flex justify-end items-center space-x-4 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] z-40">
        <button className="px-10 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95">保存草稿</button>
        <button className="px-16 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 transform active:scale-95 uppercase tracking-widest">提交</button>
      </div>

      <SelectWorkOrderModal 
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onSelect={handleSelectWorkOrder}
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
