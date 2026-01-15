
import React, { useState, useEffect, useMemo } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { PaperClipIcon } from '../icons/PaperClipIcon';
import { QualityCheckRecord } from '../../types';

interface QualityCheckResultInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: QualityCheckRecord | null;
}

export const QualityCheckResultInputModal: React.FC<QualityCheckResultInputModalProps> = ({ isOpen, onClose, initialData }) => {
  const [show, setShow] = useState(false);
  const [isRemarkCollapsed, setIsRemarkCollapsed] = useState(true);
  
  const [formData, setFormData] = useState({
    actual_check_quantity: 0,
    qualified_quantity: 0,
    unqualified_quantity: 0,
    check_conclusion: '',
    check_status: 'pending_review',
    defect_reasons: [] as string[],
    defect_reason_desc: '',
    unqualified_process_type: '',
    process_result: '',
    process_person: 'admin-001', // Mocking current user ID
    process_complete_time: '',
    check_remark: ''
  });

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      if (initialData) {
        setFormData(prev => ({
          ...prev,
          actual_check_quantity: initialData.check_quantity || 0,
          qualified_quantity: initialData.check_quantity - (initialData.unqualified_quantity || 0),
          unqualified_quantity: initialData.unqualified_quantity || 0,
        }));
      }
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialData]);

  const qualifiedRate = useMemo(() => {
    if (!formData.actual_check_quantity || formData.actual_check_quantity <= 0) return 0;
    return ((formData.qualified_quantity / formData.actual_check_quantity) * 100).toFixed(2);
  }, [formData.qualified_quantity, formData.actual_check_quantity]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      
      // Auto-balancing quantities
      if (field === 'actual_check_quantity') {
        next.qualified_quantity = Math.max(0, value - next.unqualified_quantity);
      } else if (field === 'qualified_quantity') {
        const val = Number(value);
        next.unqualified_quantity = Math.max(0, next.actual_check_quantity - val);
      } else if (field === 'unqualified_quantity') {
        const val = Number(value);
        next.qualified_quantity = Math.max(0, next.actual_check_quantity - val);
      }

      return next;
    });
  };

  const handleReasonToggle = (reason: string) => {
    setFormData(prev => {
      const current = prev.defect_reasons;
      if (current.includes(reason)) {
        return { ...prev, defect_reasons: current.filter(r => r !== reason) };
      } else {
        return { ...prev, defect_reasons: [...current, reason] };
      }
    });
  };

  if (!isOpen && !show) return null;

  const inputClass = "mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed";
  const labelClass = "block text-sm font-semibold text-slate-700";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;
  const helpTextClass = "mt-1 text-xs text-slate-400";

  const defectReasons = [
    { label: "感应距离不达标", value: "induction_distance_unqualified" },
    { label: "响应速度过慢", value: "response_speed_slow" },
    { label: "稳定性测试失败", value: "stability_test_failed" },
    { label: "抗干扰能力差", value: "anti_interference_poor" },
    { label: "功耗超标", value: "power_consumption_exceed" },
    { label: "耐温测试不通过", value: "temperature_resistance_failed" },
    { label: "外观破损", value: "appearance_damaged" },
    { label: "批次混料", value: "batch_mixing" },
    { label: "其他原因", value: "other_reason" }
  ];

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog" aria-modal="true" onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-2xl w-full max-w-[900px] max-h-[90vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-white rounded-t-xl sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800">质检结果录入</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1.5 transition-colors hover:bg-slate-100">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <form className="space-y-10">
            {/* Group 1: Base Info */}
            <section>
              <div className="flex items-center space-x-2 mb-6 border-l-4 border-blue-600 pl-3">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">基础信息（不可修改）</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                <div>
                  <label className={labelClass}>质检单号</label>
                  <input type="text" disabled className={inputClass} value={initialData?.check_order_no || ''} />
                </div>
                <div>
                  <label className={labelClass}>质检类型</label>
                  <select disabled className={inputClass} value={initialData?.check_type || ''}>
                    <option value="incoming_material">来料质检</option>
                    <option value="finished_product">成品质检</option>
                    <option value="delivery">出货质检</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>关联单据号</label>
                  <input type="text" disabled className={inputClass} value={initialData?.related_order_no || ''} />
                </div>
                <div>
                  <label className={labelClass}>物料/产品名称</label>
                  <input type="text" disabled className={inputClass} value={`${initialData?.product_name || ''} (${initialData?.product_model || ''})`} />
                </div>
                <div>
                  <label className={labelClass}>批次号</label>
                  <input type="text" disabled className={inputClass} value={initialData?.batch_no || ''} />
                </div>
                <div>
                  <label className={labelClass}>计划质检数量</label>
                  <input type="number" disabled className={inputClass} value={initialData?.check_quantity || 0} />
                </div>
                <div>
                  <label className={requiredLabelClass}>实际质检数量</label>
                  <input 
                    type="number" 
                    className={`${inputClass} !bg-white`} 
                    value={formData.actual_check_quantity}
                    onChange={(e) => handleInputChange('actual_check_quantity', parseInt(e.target.value) || 0)}
                  />
                  <p className={helpTextClass}>不能超过计划质检数量</p>
                </div>
              </div>
            </section>

            {/* Group 2: Result Input */}
            <section className="border-t border-slate-100 pt-8">
              <div className="flex items-center space-x-2 mb-6 border-l-4 border-emerald-500 pl-3">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">质检结果录入</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
                <div>
                  <label className={requiredLabelClass}>合格数量</label>
                  <input 
                    type="number" 
                    className={`${inputClass} !bg-white`} 
                    value={formData.qualified_quantity}
                    onChange={(e) => handleInputChange('qualified_quantity', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className={requiredLabelClass}>不合格数量</label>
                  <input 
                    type="number" 
                    className={`${inputClass} !bg-white`} 
                    value={formData.unqualified_quantity}
                    onChange={(e) => handleInputChange('unqualified_quantity', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className={labelClass}>合格率</label>
                  <div className="relative mt-1">
                    <input type="text" disabled className={`${inputClass} pr-8 font-mono`} value={qualifiedRate} />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 text-sm">%</span>
                  </div>
                </div>
                <div>
                  <label className={requiredLabelClass}>质检结论</label>
                  <select 
                    className={`${inputClass} !bg-white`}
                    value={formData.check_conclusion}
                    onChange={(e) => handleInputChange('check_conclusion', e.target.value)}
                  >
                    <option value="">请选择质检结论</option>
                    <option value="qualified">合格</option>
                    <option value="unqualified">不合格</option>
                    <option value="concession_accept">让步接收</option>
                    <option value="rework_recheck">返工后重检</option>
                  </select>
                </div>
                <div>
                  <label className={requiredLabelClass}>质检状态</label>
                  <select 
                    className={`${inputClass} !bg-white`}
                    value={formData.check_status}
                    onChange={(e) => handleInputChange('check_status', e.target.value)}
                  >
                    <option value="pending_review">待审核</option>
                    <option value="review_passed">审核通过</option>
                    <option value="review_rejected">审核驳回</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Group 3: Unqualified Process (Show if unqualified_quantity > 0) */}
            {formData.unqualified_quantity > 0 && (
              <section className="border-t border-slate-100 pt-8 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center space-x-2 mb-6 border-l-4 border-red-500 pl-3">
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">不合格品处理</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className={requiredLabelClass}>不良原因（可多选）</label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {defectReasons.map(reason => (
                        <button
                          key={reason.value}
                          type="button"
                          onClick={() => handleReasonToggle(reason.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            formData.defect_reasons.includes(reason.value)
                            ? 'bg-red-50 text-red-700 border-red-200 ring-2 ring-red-100'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-500'
                          }`}
                        >
                          {reason.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={
                      formData.defect_reasons.includes('other_reason') 
                      ? requiredLabelClass 
                      : labelClass
                    }>不良原因说明</label>
                    <textarea 
                      rows={3} 
                      className={`${inputClass} !bg-white mt-2 resize-none`}
                      value={formData.defect_reason_desc}
                      onChange={(e) => handleInputChange('defect_reason_desc', e.target.value)}
                      placeholder="请详细描述不良原因（选填，选择其他原因时必填）"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <div>
                      <label className={requiredLabelClass}>处理方式</label>
                      <select 
                        className={`${inputClass} !bg-white`}
                        value={formData.unqualified_process_type}
                        onChange={(e) => handleInputChange('unqualified_process_type', e.target.value)}
                      >
                        <option value="">请选择处理方式</option>
                        <option value="return">退货</option>
                        <option value="rework">返工</option>
                        <option value="scrap">报废</option>
                        <option value="selective_use">挑选使用</option>
                        <option value="concession_accept">让步接收</option>
                      </select>
                    </div>
                    <div>
                      <label className={requiredLabelClass}>处理人</label>
                      <select className={`${inputClass}`} disabled value={formData.process_person}>
                        <option value="admin-001">张经理 (当前登录用户)</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>处理完成时间</label>
                      <input 
                        type="datetime-local" 
                        className={`${inputClass} !bg-white`}
                        value={formData.process_complete_time}
                        onChange={(e) => handleInputChange('process_complete_time', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>处理结果</label>
                    <textarea 
                      rows={2} 
                      className={`${inputClass} !bg-white mt-2 resize-none`}
                      value={formData.process_result}
                      onChange={(e) => handleInputChange('process_result', e.target.value)}
                      placeholder="请输入处理结果（选填）"
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Group 4: Remark (Collapsible) */}
            <section className="border-t border-slate-100 pt-8">
              <button 
                type="button"
                onClick={() => setIsRemarkCollapsed(!isRemarkCollapsed)}
                className="w-full flex items-center justify-between group py-2"
              >
                <div className="flex items-center space-x-2 border-l-4 border-slate-400 group-hover:border-blue-500 pl-3 transition-colors">
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">备注与附件</h3>
                </div>
                <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isRemarkCollapsed ? '' : 'rotate-180'}`} />
              </button>
              
              {!isRemarkCollapsed && (
                <div className="mt-6 space-y-8 animate-in slide-in-from-top-2 duration-300">
                  <div>
                    <label className={labelClass}>质检备注</label>
                    <textarea 
                      rows={3} 
                      maxLength={1000}
                      className={`${inputClass} !bg-white resize-none mt-2`} 
                      placeholder="请输入质检相关备注信息（选填）"
                      value={formData.check_remark}
                      onChange={(e) => handleInputChange('check_remark', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>附件上传（质检报告/不良品照片）</label>
                    <div className="mt-3 flex justify-center px-6 pt-8 pb-10 border-2 border-slate-300 border-dashed rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                      <div className="space-y-2 text-center">
                        <PaperClipIcon className="mx-auto h-12 w-12 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <div className="flex text-sm text-slate-600">
                          <span className="relative cursor-pointer bg-white rounded-md font-bold text-blue-600 hover:text-blue-500 px-1">点击上传文件</span>
                          <p className="pl-1">或拖拽至此处</p>
                        </div>
                        <p className="text-[11px] text-slate-400">支持 PDF, JPG, PNG, DOCX (最大 50MB, 最多10个)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-5 border-t border-slate-200 bg-slate-50 rounded-b-xl sticky bottom-0 z-10">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all shadow-sm"
          >
            取消
          </button>
          <button 
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            保存草稿
          </button>
          <button 
            className="px-8 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
          >
            提交结果
          </button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};
