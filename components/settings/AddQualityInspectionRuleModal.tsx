
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface AddQualityInspectionRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddQualityInspectionRuleModal: React.FC<AddQualityInspectionRuleModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    ruleName: '',
    applyProductType: '',
    applyProductCategory: [] as string[],
    inspectionItems: '',
    qualifiedStandard: '',
    unqualifiedHandle: '',
    remark: '',
    status: 'enable'
  });

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => {
        setShow(false);
        setFormData({
          ruleName: '',
          applyProductType: '',
          applyProductCategory: [],
          inspectionItems: '',
          qualifiedStandard: '',
          unqualifiedHandle: '',
          remark: '',
          status: 'enable'
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => {
      const current = prev.applyProductCategory;
      if (current.includes(category)) {
        return { ...prev, applyProductCategory: current.filter(c => c !== category) };
      } else {
        return { ...prev, applyProductCategory: [...current, category] };
      }
    });
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  const inputClass = "mt-1 block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all appearance-none";
  const labelClass = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1";
  const requiredMark = <span className="text-rose-500 mr-1">*</span>;

  const productTypeOptions = [
    { label: "成品", value: "finishedProduct" },
    { label: "半成品", value: "semiFinishedProduct" },
    { label: "外协件", value: "outsourcingPart" },
    { label: "备品备件", value: "spareParts" }
  ];

  const categoryOptions = ["卫浴传感器", "温湿度传感器", "工业传感器", "传感器主板", "传感器外壳"];

  const handleTypeOptions = [
    { label: "返工", value: "rework" },
    { label: "报废", value: "scrap" },
    { label: "让步接收", value: "concession" }
  ];

  return (
    <div 
      className={`fixed inset-0 z-[100] flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog" 
      aria-modal="true" 
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-[600px] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">新增质检规则</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5 italic">Add New Quality Inspection Rule</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors hover:bg-slate-50">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6 overflow-y-auto no-scrollbar max-h-[70vh]">
          <div className="space-y-5">
            <div>
              <label className={labelClass}>{requiredMark}质检规则名称</label>
              <input 
                type="text" 
                name="ruleName"
                value={formData.ruleName}
                onChange={handleInputChange}
                className={inputClass} 
                placeholder="请输入质检规则名称" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{requiredMark}适用产品类型</label>
                <div className="relative">
                  <select 
                    name="applyProductType"
                    value={formData.applyProductType}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="">请选择类型</option>
                    {productTypeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className={labelClass}>{requiredMark}不合格处理方式</label>
                <div className="relative">
                  <select 
                    name="unqualifiedHandle"
                    value={formData.unqualifiedHandle}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="">请选择方式</option>
                    {handleTypeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>{requiredMark}适用产品分类</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categoryOptions.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      formData.applyProductCategory.includes(cat)
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>{requiredMark}质检项目</label>
              <textarea 
                name="inspectionItems"
                rows={3} 
                value={formData.inspectionItems}
                onChange={handleInputChange}
                className={`${inputClass} resize-none`} 
                placeholder="请输入质检项目，多个项目用顿号分隔"
              ></textarea>
            </div>

            <div>
              <label className={labelClass}>{requiredMark}合格标准</label>
              <textarea 
                name="qualifiedStandard"
                rows={4} 
                value={formData.qualifiedStandard}
                onChange={handleInputChange}
                className={`${inputClass} resize-none`} 
                placeholder="请输入详细合格标准"
              ></textarea>
            </div>

            <div>
              <label className={labelClass}>备注</label>
              <textarea 
                name="remark"
                rows={2} 
                value={formData.remark}
                onChange={handleInputChange}
                className={`${inputClass} resize-none`} 
                placeholder="请输入补充说明（可选）"
              ></textarea>
            </div>

            <div>
              <label className={labelClass}>{requiredMark}启用状态</label>
              <div className="mt-3 flex items-center space-x-8 px-1">
                <label className="inline-flex items-center cursor-pointer group">
                  <input 
                    type="radio" 
                    name="status"
                    className="form-radio h-5 w-5 text-blue-600 border-slate-300 focus:ring-blue-500" 
                    checked={formData.status === 'enable'}
                    onChange={() => handleStatusChange('enable')}
                  />
                  <span className={`ml-3 text-sm font-bold transition-colors ${formData.status === 'enable' ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>启用</span>
                </label>
                <label className="inline-flex items-center cursor-pointer group">
                  <input 
                    type="radio" 
                    name="status"
                    className="form-radio h-5 w-5 text-blue-600 border-slate-300 focus:ring-blue-500" 
                    checked={formData.status === 'disable'}
                    onChange={() => handleStatusChange('disable')}
                  />
                  <span className={`ml-3 text-sm font-bold transition-colors ${formData.status === 'disable' ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>禁用</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 px-8 py-6 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm active:scale-95"
          >
            取消
          </button>
          <button 
            onClick={() => {
                if(!formData.ruleName) return alert('请填写质检规则名称');
                if(!formData.applyProductType) return alert('请选择适用产品类型');
                if(formData.applyProductCategory.length === 0) return alert('请选择至少一个适用产品分类');
                if(!formData.inspectionItems) return alert('请填写质检项目');
                if(!formData.qualifiedStandard) return alert('请填写合格标准');
                if(!formData.unqualifiedHandle) return alert('请选择不合格处理方式');
                console.log('Adding quality inspection rule:', formData);
                onClose();
            }}
            className="px-10 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-widest"
          >
            确认新增
          </button>
        </div>
      </div>
    </div>
  );
};
