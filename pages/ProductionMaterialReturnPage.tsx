
import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { CameraIcon } from '../components/icons/CameraIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';

export const ProductionMaterialReturnPage: React.FC = () => {
  const [selectedRequisition, setSelectedRequisition] = useState('');
  const [inboundConfirmation, setInboundConfirmation] = useState('');

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed";
  const labelClass = "block text-sm font-semibold text-slate-700";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;
  const sectionTitleClass = "flex items-center space-x-2 mb-6 border-l-4 border-blue-600 pl-3";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">生产退料</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">取消</button>
          <button className="px-8 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">提交</button>
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-8 flex-1 min-h-0">
        <div className="max-w-7xl mx-auto space-y-8 pb-20">
          
          {/* Section 1: 生产领料单信息 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">生产领料单信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              <div className="relative">
                <label className={requiredLabelClass}>选择生产领料单</label>
                <div className="relative mt-1">
                  <select 
                    className={`${inputClass} appearance-none pr-10`}
                    value={selectedRequisition}
                    onChange={(e) => setSelectedRequisition(e.target.value)}
                  >
                    <option value="">选择数据</option>
                    <option value="1">RE-20260109-001 (传感器外壳领料)</option>
                    <option value="2">RE-20260109-002 (PCB组件领料)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className={labelClass}>生产工单名称</label>
                <input type="text" disabled className={inputClass} placeholder="暂无内容" />
              </div>
              <div>
                <label className={labelClass}>生产计划名称</label>
                <input type="text" disabled className={inputClass} placeholder="暂无内容" />
              </div>
              <div>
                <label className={labelClass}>领料出库单编号</label>
                <input type="text" disabled className={inputClass} placeholder="暂无内容" />
              </div>
              <div>
                <label className={labelClass}>生产班组</label>
                <input type="text" disabled className={inputClass} placeholder="暂无内容" />
              </div>
              <div>
                <label className={labelClass}>班组长</label>
                <input type="text" disabled className={inputClass} placeholder="暂无内容" />
              </div>
              <div>
                <label className={labelClass}>退料人</label>
                <input type="text" disabled className={inputClass} placeholder="暂无内容" />
              </div>
              <div>
                <label className={labelClass}>退料入库单编号</label>
                <input type="text" disabled className={inputClass} placeholder="自动生成无需填写" />
              </div>
            </div>
          </section>

          {/* Section 2: 入库产品明细 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">入库产品明细</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-8">
              <div className="relative">
                <label className={requiredLabelClass}>入库仓位</label>
                <div className="relative mt-1">
                  <select className={`${inputClass} appearance-none pr-10`}>
                    <option value="">请选择仓位</option>
                    <option value="A-01">A区-01-01</option>
                    <option value="A-02">A区-01-02</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
              <div className="relative">
                <label className={requiredLabelClass}>退料原因</label>
                <div className="relative mt-1">
                  <select className={`${inputClass} appearance-none pr-10`} defaultValue="剩料">
                    <option value="剩料">剩料</option>
                    <option value="质量问题">质量问题</option>
                    <option value="计划变更">计划变更</option>
                    <option value="其他">其他</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-start space-x-3 mb-4">
              <button className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors border border-slate-200">
                <PlusIcon className="h-4 w-4 mr-1.5" /> 添加
              </button>
              <button className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors border border-slate-200">
                <ArrowPathIcon className="h-4 w-4 mr-1.5" /> 快速填报
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl custom-scrollbar">
              <table className="min-w-full divide-y divide-slate-200 text-xs border-separate border-spacing-0">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    {["序号", "生产产品名称", "生产产品编码", "产品名称", "产品编码", "规格型号", "产品批次号", "*本次入库数量", "生产单位", "本次入库数量(仓储单位)", "仓储单位", "入库仓位", "操作"].map((h, i) => (
                      <th key={h} className={`px-4 py-4 text-left font-black text-slate-500 uppercase whitespace-nowrap border-b border-slate-200 ${i === 0 ? 'sticky left-0 bg-slate-50 z-10' : ''}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-4 sticky left-0 bg-white group-hover:bg-slate-50 z-10 font-mono text-slate-400">1</td>
                    <td className="px-4 py-4 text-slate-400 italic">暂无内容</td>
                    <td className="px-4 py-4 text-slate-400 italic">暂无内容</td>
                    <td className="px-4 py-4 text-slate-400 italic">暂无内容</td>
                    <td className="px-4 py-4 text-slate-400 italic">暂无内容</td>
                    <td className="px-4 py-4 text-slate-400 italic">暂无内容</td>
                    <td className="px-4 py-4 text-slate-400 italic">暂无内容</td>
                    <td className="px-4 py-2">
                      <input type="number" className="w-24 px-2 py-1 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none text-center font-bold" placeholder="0" />
                    </td>
                    <td className="px-4 py-4 text-slate-400 italic">暂无内容</td>
                    <td className="px-4 py-4 text-slate-400 italic">暂无内容</td>
                    <td className="px-4 py-4 text-slate-400 italic">暂无内容</td>
                    <td className="px-4 py-4 text-slate-400 italic">暂无内容</td>
                    <td className="px-4 py-4 text-center">
                      <button className="text-rose-500 hover:text-rose-700">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: 入库产品总数量/t */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">入库产品总数量/t</h3>
            </div>
            <div className="max-w-xs">
              <input type="text" disabled className={`${inputClass} font-black text-blue-600 bg-blue-50/30 text-lg py-3`} placeholder="暂无内容" />
            </div>
          </section>

          {/* Section 4: 入库确认 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className={sectionTitleClass}>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">入库确认</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              <div>
                <label className={requiredLabelClass}>产品入库确认</label>
                <div className="mt-3 flex items-center space-x-8">
                  <label className="inline-flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="confirmation" 
                      className="form-radio h-5 w-5 text-blue-600 border-slate-300 focus:ring-blue-500"
                      value="confirm"
                      checked={inboundConfirmation === 'confirm'}
                      onChange={() => setInboundConfirmation('confirm')}
                    />
                    <span className="ml-2.5 text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">确认入库</span>
                  </label>
                </div>
              </div>
              <div>
                <label className={requiredLabelClass}>退料入库时间</label>
                <input type="date" className={inputClass} />
              </div>
              <div className="lg:col-span-1">
                <label className={labelClass}>入库员</label>
                <div className="relative mt-1">
                  <select className={`${inputClass} appearance-none pr-10`}>
                    <option value="">选择成员</option>
                    <option value="1">张三 (仓库主管)</option>
                    <option value="2">李四 (质检员)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className={labelClass}>退料现场拍照</label>
                <div className="mt-3 flex justify-center px-6 pt-10 pb-12 border-2 border-slate-200 border-dashed rounded-2xl hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                  <div className="space-y-3 text-center">
                    <CameraIcon className="mx-auto h-12 w-12 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    <div className="flex text-sm text-slate-600">
                      <span className="relative cursor-pointer bg-white rounded-md font-bold text-blue-600 hover:text-blue-500 px-1">点击选择</span>
                      <p className="pl-1">或 拖拽/单击后粘贴图片</p>
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">单张 20MB 以内</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end pt-8 border-t border-slate-100">
               <button className="px-12 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 transform active:scale-95 uppercase tracking-widest">提交生产退料单</button>
            </div>
          </section>

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
