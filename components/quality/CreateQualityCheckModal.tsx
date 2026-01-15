
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { PaperClipIcon } from '../icons/PaperClipIcon';

interface CreateQualityCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateQualityCheckModal: React.FC<CreateQualityCheckModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [isRemarkCollapsed, setIsRemarkCollapsed] = useState(true);
  const [formData, setFormData] = useState({
    check_order_no: 'QC-20240520-008', // 模拟自动生成
    check_type: '',
    source_order_no: '',
    material_name: '',
    material_spec: '',
    batch_no: '',
    warehouse_location: '',
    warehouse_position: '',
    plan_check_quantity: '',
    check_remark: ''
  });

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen && !show) return null;

  const inputClass = "mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-500";
  const labelClass = "block text-sm font-semibold text-slate-700";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;
  const helpTextClass = "mt-1 text-[10px] text-slate-400 leading-tight";

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog" 
      aria-modal="true" 
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-[900px] max-h-[90vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">创建质检单</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1.5 transition-colors hover:bg-slate-100">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar bg-slate-50/20">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* 基础信息 Group */}
            <section>
              <div className="flex items-center space-x-2 mb-6 border-l-4 border-blue-600 pl-3">
                <h3 className="text-lg font-bold text-slate-800">基础信息</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                <div>
                  <label className={requiredLabelClass}>质检单号</label>
                  <input type="text" disabled className={inputClass} value={formData.check_order_no} />
                  <p className={helpTextClass}>格式：QC-YYYYMMDD-序列号，创建时自动生成</p>
                </div>

                <div>
                  <label className={requiredLabelClass}>质检类型</label>
                  <div className="relative">
                    <select 
                      className={`${inputClass} !bg-white appearance-none pr-10`}
                      value={formData.check_type}
                      onChange={(e) => handleInputChange('check_type', e.target.value)}
                    >
                      <option value="">请选择质检类型</option>
                      <option value="incoming_material">来料质检</option>
                      <option value="finished_product">成品质检</option>
                      <option value="delivery">出货质检</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDownIcon className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={requiredLabelClass}>来料单号</label>
                  <div className="relative">
                    <select 
                      className={`${inputClass} !bg-white appearance-none pr-10`}
                      value={formData.source_order_no}
                      onChange={(e) => handleInputChange('source_order_no', e.target.value)}
                    >
                      <option value="">请选择来料单号</option>
                      <option value="PO2024052001">PO2024052001</option>
                      <option value="PO2024052002">PO2024052002</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDownIcon className="h-4 w-4" />
                    </div>
                  </div>
                  <p className={helpTextClass}>关联采购订单的来料单号，支持远程搜索</p>
                </div>

                <div>
                  <label className={requiredLabelClass}>物料名称</label>
                  <input 
                    type="text" 
                    className={`${inputClass} !bg-white`} 
                    placeholder="请输入物料名称"
                    maxLength={100}
                    value={formData.material_name}
                    onChange={(e) => handleInputChange('material_name', e.target.value)}
                  />
                  <p className={helpTextClass}>外壳、管道、小线圈等原材料名称</p>
                </div>

                <div>
                  <label className={requiredLabelClass}>物料规格</label>
                  <input 
                    type="text" 
                    className={`${inputClass} !bg-white`} 
                    placeholder="请输入物料规格"
                    maxLength={200}
                    value={formData.material_spec}
                    onChange={(e) => handleInputChange('material_spec', e.target.value)}
                  />
                  <p className={helpTextClass}>原材料的型号、尺寸等规格信息</p>
                </div>

                {formData.source_order_no && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className={requiredLabelClass}>批次号</label>
                    <div className="relative">
                      <select 
                        className={`${inputClass} !bg-white appearance-none pr-10`}
                        value={formData.batch_no}
                        onChange={(e) => handleInputChange('batch_no', e.target.value)}
                      >
                        <option value="">请选择批次号</option>
                        <option value="B240520-01">B240520-01</option>
                        <option value="B240520-02">B240520-02</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <ChevronDownIcon className="h-4 w-4" />
                      </div>
                    </div>
                    <p className={helpTextClass}>关联所选来料单号的批次号</p>
                  </div>
                )}

                <div>
                  <label className={requiredLabelClass}>仓位选择</label>
                  <div className="relative">
                    <select 
                      className={`${inputClass} !bg-white appearance-none pr-10`}
                      value={formData.warehouse_location}
                      onChange={(e) => handleInputChange('warehouse_location', e.target.value)}
                    >
                      <option value="">请选择仓位</option>
                      <option value="semi_finished_location">半成品仓位</option>
                      <option value="finished_product_location">成品仓位</option>
                      <option value="pending_inspection_location">待检区仓位</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDownIcon className="h-4 w-4" />
                    </div>
                  </div>
                  <p className={helpTextClass}>选择物料对应的存储仓位</p>
                </div>

                <div>
                  <label className={requiredLabelClass}>库位</label>
                  <input 
                    type="text" 
                    className={`${inputClass} !bg-white`} 
                    placeholder="请输入库位"
                    maxLength={50}
                    value={formData.warehouse_position}
                    onChange={(e) => handleInputChange('warehouse_position', e.target.value)}
                  />
                  <p className={helpTextClass}>具体的库位编号，如A-01-02、B区-05等</p>
                </div>

                <div>
                  <label className={requiredLabelClass}>计划质检数量</label>
                  <input 
                    type="number" 
                    className={`${inputClass} !bg-white`} 
                    placeholder="请输入计划质检数量"
                    min={1}
                    max={999999}
                    value={formData.plan_check_quantity}
                    onChange={(e) => handleInputChange('plan_check_quantity', e.target.value)}
                  />
                  <p className={helpTextClass}>计划质检数量不能超过999999</p>
                </div>
              </div>
            </section>

            {/* 备注信息 Group */}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <button 
                type="button"
                onClick={() => setIsRemarkCollapsed(!isRemarkCollapsed)}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-4 bg-slate-400 rounded-full"></div>
                  <h3 className="text-md font-bold text-slate-800">备注信息</h3>
                </div>
                <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isRemarkCollapsed ? '' : 'rotate-180'}`} />
              </button>
              
              <div className={`px-6 transition-all duration-300 overflow-hidden ${isRemarkCollapsed ? 'max-h-0' : 'max-h-[600px] py-6'}`}>
                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>质检备注</label>
                    <textarea 
                      rows={3} 
                      className={`${inputClass} !bg-white resize-none`}
                      placeholder="请输入质检相关备注信息（选填）"
                      maxLength={1000}
                      value={formData.check_remark}
                      onChange={(e) => handleInputChange('check_remark', e.target.value)}
                    />
                    <div className="flex justify-end mt-1">
                      <span className="text-[10px] text-slate-400">{formData.check_remark.length}/1000</span>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>附件上传（质检报告/不良品照片）</label>
                    <div className="mt-2 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                      <PaperClipIcon className="h-10 w-10 text-slate-300 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                      <p className="text-sm text-slate-600 font-medium">点击上传文件 或 拖拽至此处</p>
                      <p className={helpTextClass + " text-center"}>支持PDF、图片、Word格式，单个文件最大50MB，最多上传10个</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="px-10 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-black hover:bg-emerald-700 transition-all shadow-lg active:scale-95 uppercase tracking-widest"
          >
            提交结果
          </button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};
