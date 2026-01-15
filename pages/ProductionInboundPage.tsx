
import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { CameraIcon } from '../components/icons/CameraIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { SelectProductionPlanModal } from '../components/production/SelectProductionPlanModal';

export const ProductionInboundPage: React.FC = () => {
  const [activePlanStatus, setActivePlanStatus] = useState(true);
  const [isActionDropdownOpen, setIsActionDropdownOpen] = useState(false);
  const [qcConfirm, setQcConfirm] = useState(true);
  const [warehouseConfirm, setWarehouseConfirm] = useState(true);
  
  // 弹窗状态
  const [isSelectPlanModalOpen, setIsSelectPlanModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState("感应龙头外壳生产计划");

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed";
  const readonlyInputClass = "mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed";
  const labelClass = "block text-sm font-semibold text-slate-700";
  const sectionTitleClass = "flex items-center space-x-2 mb-6 border-l-4 border-blue-600 pl-3";

  const handlePlanSelect = (plan: any) => {
    setSelectedPlanName(plan.productionPlanName);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 顶部 Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">生产入库</h1>
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100 uppercase tracking-wider">表单编辑模式</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button 
              onClick={() => setIsActionDropdownOpen(!isActionDropdownOpen)}
              className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              仅添加数据
              <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform ${isActionDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isActionDropdownOpen && (
               <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden ring-1 ring-black ring-opacity-5">
                 <button className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-colors">仅添加新入库数据</button>
               </div>
            )}
          </div>
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">编辑</button>
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">数据管理</button>
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-8 flex-1 min-h-0 pb-32">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Section 1: 生产计划信息 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">生产计划信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              <div className="md:col-span-1 lg:col-span-1">
                <label className={labelClass}>选择生产计划</label>
                <div 
                  className="relative mt-1 cursor-pointer group"
                  onClick={() => setIsSelectPlanModalOpen(true)}
                >
                  <input 
                    type="text" 
                    className={`${inputClass} pr-10 cursor-pointer group-hover:border-blue-400 bg-white`} 
                    value={selectedPlanName} 
                    readOnly
                    placeholder="选择数据" 
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 group-hover:text-blue-500">
                    <SearchIcon className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <label className={labelClass}>生产计划名称</label>
                <input type="text" className={inputClass} defaultValue="感应龙头外壳（ABS材质）生产计划" />
              </div>
              <div>
                <label className={labelClass}>生产计划编号</label>
                <input type="text" className={readonlyInputClass} defaultValue="SC-JH-20260106" readOnly />
              </div>
              <div>
                <label className={labelClass}>生产班组</label>
                <select className={inputClass} defaultValue="组装一班">
                  <option value="组装一班">组装一班</option>
                  <option value="组装二班">组装二班</option>
                  <option value="测试班">测试班</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>班组长</label>
                <input type="text" className={inputClass} defaultValue="李班组" placeholder="选择成员" />
              </div>
              <div>
                <label className={labelClass}>产成品批次号</label>
                <div className="relative">
                  <input type="text" className={inputClass} defaultValue="QC-20260106" />
                  <p className="absolute -bottom-5 left-0 text-[10px] text-blue-500 font-medium">* 关联质检报告</p>
                </div>
              </div>
              <div>
                <label className={labelClass}>生产入库单编号</label>
                <div className="relative">
                  <input type="text" className={readonlyInputClass} defaultValue="RK-20260106001" readOnly />
                  <p className="absolute -bottom-5 left-0 text-[10px] text-slate-400 font-medium italic">* 自动生成</p>
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-1">
                <label className={labelClass}>计划状态</label>
                <div className="mt-3 flex items-center space-x-6">
                  <label className="inline-flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="plan_status" 
                      className="form-radio h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                      checked={activePlanStatus === true}
                      onChange={() => setActivePlanStatus(true)}
                    />
                    <span className="ml-2 text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">已计划</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="plan_status" 
                      className="form-radio h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                      checked={activePlanStatus === false}
                      onChange={() => setActivePlanStatus(false)}
                    />
                    <span className="ml-2 text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">已完结</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: 入库明细 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">入库明细</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
              <div>
                <label className={labelClass}>*入库仓库</label>
                <select className={inputClass} defaultValue="成品仓">
                  <option value="成品仓">成品仓</option>
                  <option value="原料仓">原料仓</option>
                  <option value="半成品仓">半成品仓</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>入库类型</label>
                <select className={inputClass} defaultValue="生产入库">
                  <option value="生产入库">生产入库</option>
                  <option value="采购入库">采购入库</option>
                  <option value="退货入库">退货入库</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: 产品明细 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex justify-between items-center mb-6">
              <div className={sectionTitleClass + " mb-0"}>
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">产品明细</h3>
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
                    {[
                      "#", "产品名称", "产品编码", "产品属性", "规格型号", "产品批次号",
                      "计划生产数量", "待入库数量", "*本次入库数量", "生产单位",
                      "入库仓位", "成本单价/元", "总成本/元", "销售单价/元", "总售价/元"
                    ].map((h, i) => (
                      <th key={h} className={`px-4 py-4 text-left font-black text-slate-500 uppercase whitespace-nowrap border-b border-slate-200 ${i === 0 ? 'sticky left-0 bg-slate-50 z-10' : ''}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 font-medium">
                  <tr className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 sticky left-0 bg-white group-hover:bg-[#f5f8ff] z-10 font-mono text-slate-400">1</td>
                    <td className="px-4 py-4 text-slate-800 font-bold whitespace-nowrap">感应龙头外壳（ABS）</td>
                    <td className="px-4 py-4 text-slate-500 font-mono">SP-001</td>
                    <td className="px-4 py-4 text-slate-600">医用级防菌</td>
                    <td className="px-4 py-4 text-slate-500">12*45*123</td>
                    <td className="px-4 py-4 text-indigo-600 font-bold">QC-20260106</td>
                    <td className="px-4 py-4 text-right pr-6 font-mono">500</td>
                    <td className="px-4 py-4 text-right pr-6 font-mono">500</td>
                    <td className="px-4 py-2">
                      <input type="number" className="w-24 px-2 py-1.5 border border-blue-200 rounded focus:ring-1 focus:ring-blue-500 outline-none text-center font-black text-blue-600 bg-blue-50/30 shadow-inner" defaultValue="500" />
                    </td>
                    <td className="px-4 py-4 text-center">件</td>
                    <td className="px-4 py-4 text-slate-500 italic">成品仓A区</td>
                    <td className="px-4 py-4 text-right font-mono">120.00</td>
                    <td className="px-4 py-4 text-right font-black text-slate-800">60,000.00</td>
                    <td className="px-4 py-4 text-right font-mono">170.00</td>
                    <td className="px-4 py-4 text-right font-black text-emerald-600">85,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: 统计信息 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">统计信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100/50 flex flex-col items-center justify-center">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">入库产品总数量</label>
                 <span className="text-3xl font-black text-blue-600 tracking-tighter">500 <span className="text-xs font-medium ml-1">件</span></span>
              </div>
              <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-100 flex flex-col items-center justify-center">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">入库产品成本总额 / 元</label>
                 <span className="text-3xl font-black text-slate-800 tracking-tighter">¥ 60,000.00</span>
              </div>
              <div className="bg-emerald-50/50 rounded-xl p-6 border border-emerald-100/50 flex flex-col items-center justify-center">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">入库产品售价总额 / 元</label>
                 <span className="text-3xl font-black text-emerald-600 tracking-tighter">¥ 85,000.00</span>
              </div>
            </div>
          </section>

          {/* Section 5: 质检确认 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">质检确认</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              <div>
                <label className={labelClass}>质检完成确认</label>
                <div className="mt-3">
                  <label className="inline-flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      className="form-radio h-5 w-5 text-emerald-600 border-slate-300 focus:ring-emerald-500" 
                      checked={qcConfirm}
                      onChange={() => setQcConfirm(true)}
                    />
                    <span className="ml-2.5 text-sm font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors">确认</span>
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>质检类型</label>
                <select className={inputClass} defaultValue="成品全检">
                  <option value="成品全检">成品全检</option>
                  <option value="抽样检验">抽样检验</option>
                  <option value="外观检验">外观检验</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>质检时间</label>
                <input type="datetime-local" className={inputClass} defaultValue="2026-01-06T14:30" />
              </div>
              <div>
                <label className={labelClass}>质检员</label>
                <input type="text" className={inputClass} defaultValue="王茗" />
              </div>
              <div className="lg:col-span-4">
                <label className={labelClass}>质检备注</label>
                <input type="text" className={inputClass} defaultValue="符合医用级防菌标准" />
              </div>
            </div>
          </section>

          {/* Section 6: 入库确认 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">入库确认</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
              <div>
                <label className={labelClass}>合格品入库确认</label>
                <div className="mt-3">
                  <label className="inline-flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      className="form-radio h-5 w-5 text-blue-600 border-slate-300 focus:ring-blue-500" 
                      checked={warehouseConfirm}
                      onChange={() => setWarehouseConfirm(true)}
                    />
                    <span className="ml-2.5 text-sm font-bold text-blue-700 group-hover:text-blue-800 transition-colors">确认</span>
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>入库时间</label>
                <input type="datetime-local" className={inputClass} defaultValue="2026-01-06T15:00" />
              </div>
              <div>
                <label className={labelClass}>入库员</label>
                <input type="text" className={inputClass} defaultValue="王茗" />
              </div>
              <div>
                 <label className={labelClass}>入库备注</label>
                 <input type="text" className={inputClass} defaultValue="包装完好，数量核对无误" />
              </div>
              <div className="lg:col-span-4">
                <label className={labelClass}>拍照凭证</label>
                <div className="mt-3 flex justify-center px-6 pt-10 pb-12 border-2 border-slate-200 border-dashed rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                  <div className="space-y-3 text-center">
                    <CameraIcon className="mx-auto h-12 w-12 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    <div className="flex flex-col text-sm text-slate-600">
                      <p className="font-bold text-blue-600">感应龙头外壳入库照片.jpg</p>
                      <p className="text-[10px] text-emerald-500 font-black mt-1 uppercase tracking-widest">已上传</p>
                    </div>
                    <p className="text-xs text-slate-400">点击区域或拖拽以更换图片</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* 底部悬浮操作栏 */}
      <div className="fixed bottom-0 right-0 left-64 bg-white border-t border-slate-200 px-8 py-5 flex justify-end items-center space-x-4 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] z-40">
        <button className="px-10 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">保存草稿</button>
        <button className="px-16 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 transform active:scale-95 uppercase tracking-widest">提交生产入库</button>
      </div>

      {/* 选择生产计划弹窗 */}
      <SelectProductionPlanModal 
        isOpen={isSelectPlanModalOpen}
        onClose={() => setIsSelectPlanModalOpen(false)}
        onSelect={handlePlanSelect}
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
