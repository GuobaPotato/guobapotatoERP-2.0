
import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { CameraIcon } from '../components/icons/CameraIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { SelectWorkOrderModal } from '../components/production/SelectWorkOrderModal';

export const ProductionRequisitionPage: React.FC = () => {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [selectedWorkOrderData, setSelectedWorkOrderData] = useState<any>(null);
  const [confirmStatus, setConfirmStatus] = useState<string | null>(null);

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed";
  const readonlyInputClass = "mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed";
  const labelClass = "block text-sm font-semibold text-slate-700";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;
  const sectionTitleClass = "flex items-center space-x-2 mb-6 border-l-4 border-blue-600 pl-3";

  const handleSelectWorkOrder = (data: any) => {
    setSelectedWorkOrderData(data);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">生产领料</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">取消</button>
          <button className={`px-8 py-2 rounded-lg text-sm font-bold transition-all shadow-md ${selectedWorkOrderData ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'}`}>提交</button>
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-8 flex-1 min-h-0">
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
          
          {/* Section 1: 生产工单信息 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">生产工单信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              <div className="md:col-span-1">
                <label className={requiredLabelClass}>选择生产工单</label>
                <div 
                  className="relative mt-1 cursor-pointer group"
                  onClick={() => setIsSelectModalOpen(true)}
                >
                  <div className={`${inputClass} pr-10 min-h-[38px] flex items-center justify-between group-hover:border-blue-400 transition-colors`}>
                    <span className={selectedWorkOrderData ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                      {selectedWorkOrderData ? selectedWorkOrderData.productionWorkOrderName : '选择数据'}
                    </span>
                    <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className={labelClass}>生产工单名称</label>
                <input type="text" disabled className={readonlyInputClass} value={selectedWorkOrderData?.productionWorkOrderName || "暂无内容"} />
              </div>
              <div>
                <label className={labelClass}>生产计划名称</label>
                <input type="text" disabled className={readonlyInputClass} value={selectedWorkOrderData?.productionPlanName || "暂无内容"} />
              </div>
              <div>
                <label className={labelClass}>班组长</label>
                <input type="text" disabled className={readonlyInputClass} value={selectedWorkOrderData?.teamLeader || "暂无内容"} />
              </div>
              <div>
                <label className={labelClass}>生产班组</label>
                <input type="text" disabled className={readonlyInputClass} value={selectedWorkOrderData?.productionTeam || "暂无内容"} />
              </div>
              <div>
                <label className={labelClass}>产成品批次号</label>
                <input type="text" disabled className={readonlyInputClass} value={selectedWorkOrderData?.finishedProductBatchNo || "暂无内容"} />
              </div>
              <div>
                <label className={labelClass}>领料人</label>
                <input type="text" disabled className={readonlyInputClass} value={selectedWorkOrderData ? "当前用户" : "暂无内容"} />
              </div>
              <div>
                <label className={labelClass}>领料出库单编号</label>
                <div className="relative">
                  <input type="text" disabled className={readonlyInputClass} value={selectedWorkOrderData ? "RE-20260109-001" : "暂无内容"} />
                  <p className="absolute -bottom-5 left-0 text-[10px] text-slate-400 font-medium italic">自动生成无需填写</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 出库产品明细 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex justify-between items-center mb-6">
              <div className={sectionTitleClass + " mb-0"}>
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">出库产品明细</h3>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors border border-slate-200">
                  <PlusIcon className="h-4 w-4 mr-1.5" /> 添加
                </button>
                <button className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors border border-slate-200">
                  <ArrowPathIcon className="h-4 w-4 mr-1.5" /> 快速填报
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl custom-scrollbar">
              <table className="min-w-full divide-y divide-slate-200 text-xs border-separate border-spacing-0">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    {["行号", "生产产品名称", "产品批次号", "*本次出库数量", "生产单位", "当前可用库存数量/t", "本次出库数量(仓储单位)", "仓储单位", "出库仓位", "操作"].map((h, i) => (
                      <th key={h} className={`px-4 py-4 text-left font-black text-slate-500 uppercase whitespace-nowrap border-b border-slate-200 ${i === 0 ? 'sticky left-0 bg-slate-50 z-10' : ''}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {selectedWorkOrderData ? (
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-4 sticky left-0 bg-white group-hover:bg-slate-50 z-10 font-mono text-slate-400">1</td>
                      <td className="px-4 py-4 text-slate-800 font-bold">{selectedWorkOrderData.productName}</td>
                      <td className="px-4 py-4 text-indigo-600 font-mono font-bold">{selectedWorkOrderData.finishedProductBatchNo}</td>
                      <td className="px-4 py-2">
                        <input type="number" className="w-32 px-3 py-1.5 border border-blue-200 rounded focus:ring-1 focus:ring-blue-500 outline-none font-bold text-blue-600 bg-blue-50/20" defaultValue={selectedWorkOrderData.currentDispatchedQty} />
                      </td>
                      <td className="px-4 py-4 text-slate-600">{selectedWorkOrderData.unit}</td>
                      <td className="px-4 py-4 text-slate-500 font-mono">1.200</td>
                      <td className="px-4 py-4 text-slate-600">{selectedWorkOrderData.currentDispatchedQty}</td>
                      <td className="px-4 py-4 text-slate-600">{selectedWorkOrderData.unit}</td>
                      <td className="px-4 py-2">
                        <select className="w-32 px-2 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                          <option value="A-01">A区-01-01</option>
                          <option value="A-02">A区-01-02</option>
                        </select>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-rose-500 hover:text-rose-700">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={10} className="px-4 py-16 text-center text-slate-400 italic bg-white">
                        请先选择生产工单以载入待领料明细
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">出库产品总数量</label>
              <span className="text-lg font-black text-blue-600">{selectedWorkOrderData ? selectedWorkOrderData.currentDispatchedQty : '暂无内容'}</span>
            </div>
          </section>

          {/* Section 3: 出库确认 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">出库确认</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
              <div>
                <label className={requiredLabelClass}>领料出库确认</label>
                <div className="mt-4 flex items-center space-x-8">
                  <label className="inline-flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="pick_confirm" 
                      className="form-radio h-5 w-5 text-emerald-600 border-slate-300 focus:ring-emerald-500" 
                      onChange={() => setConfirmStatus('confirm')}
                    />
                    <span className="ml-2.5 text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">确认</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="pick_confirm" 
                      className="form-radio h-5 w-5 text-rose-600 border-slate-300 focus:ring-rose-500" 
                      onChange={() => setConfirmStatus('cancel')}
                    />
                    <span className="ml-2.5 text-sm font-bold text-slate-700 group-hover:text-rose-600 transition-colors">取消</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className={requiredLabelClass}>领料出库时间</label>
                <input type="datetime-local" className={inputClass} />
              </div>

              <div>
                <label className={requiredLabelClass}>出库员</label>
                <button className="mt-1 flex items-center justify-center w-full px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all border-dashed">
                  <PlusIcon className="h-4 w-4 mr-1.5" /> 选择成员
                </button>
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className={requiredLabelClass}>出库凭证拍照</label>
                <div className="mt-3 flex justify-center px-6 pt-10 pb-12 border-2 border-slate-200 border-dashed rounded-2xl hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer group">
                  <div className="space-y-3 text-center">
                    <CameraIcon className="mx-auto h-12 w-12 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    <div className="flex flex-col text-sm text-slate-600">
                      <p className="font-bold">选择/拖拽或单击后粘贴图片</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-1">支持格式: JPG/PNG/JPEG | 单张 50MB 以内</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end pt-8 border-t border-slate-100">
               <button 
                disabled={!selectedWorkOrderData}
                className="px-16 py-3 bg-emerald-600 text-white rounded-xl text-sm font-black shadow-xl shadow-emerald-100 transform transition-all hover:bg-emerald-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale uppercase tracking-widest"
               >
                提交领料单
               </button>
            </div>
          </section>

        </div>
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
