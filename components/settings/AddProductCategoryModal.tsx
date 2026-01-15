
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface AddProductCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProductCategoryModal: React.FC<AddProductCategoryModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: '',
    belongType: '',
    categoryDesc: '',
    status: 'enable'
  });

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => {
        setShow(false);
        // Reset form on close
        setFormData({ categoryName: '', belongType: '', categoryDesc: '', status: 'enable' });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  const inputClass = "mt-1 block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all appearance-none";
  const labelClass = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1";
  const requiredMark = <span className="text-rose-500 mr-1">*</span>;

  const belongTypeOptions = [
    { label: "成品", value: "finishedProduct" },
    { label: "半成品", value: "semiFinishedProduct" },
    { label: "外协件", value: "outsourcingPart" },
    { label: "备品备件", value: "spareParts" }
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
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-[500px] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">新增产品分类</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5 italic">Add New Product Category</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors hover:bg-slate-50">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          <div className="space-y-5">
            <div>
              <label className={labelClass}>{requiredMark}产品分类名称</label>
              <input 
                type="text" 
                name="categoryName"
                value={formData.categoryName}
                onChange={handleInputChange}
                className={inputClass} 
                placeholder="请输入产品分类名称" 
              />
            </div>

            <div>
              <label className={labelClass}>{requiredMark}所属产品类型</label>
              <div className="relative">
                <select 
                  name="belongType"
                  value={formData.belongType}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="">请选择</option>
                  {belongTypeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-4 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className={labelClass}>产品分类描述</label>
              <textarea 
                name="categoryDesc"
                rows={3} 
                value={formData.categoryDesc}
                onChange={handleInputChange}
                className={`${inputClass} resize-none appearance-auto`} 
                placeholder="请输入产品分类详细描述（可选）"
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
                if(!formData.categoryName) return alert('请填写产品分类名称');
                if(!formData.belongType) return alert('请选择所属产品类型');
                console.log('Adding product category:', formData);
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
