
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface AddLeadsPoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLeadsPoolModal: React.FC<AddLeadsPoolModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;

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
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">添加线索池</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1.5 transition-colors hover:bg-slate-100">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          <div>
            <label className={requiredLabelClass}>线索池名称</label>
            <input 
              type="text" 
              className={inputClass} 
              placeholder="填写线索池名称" 
            />
          </div>

          <div>
            <label className={requiredLabelClass}>适用部门</label>
            <div className="relative">
              <select className={`${inputClass} appearance-none pr-10`}>
                <option value="">请选择部门</option>
                <option value="1">全公司</option>
                <option value="2">销售一部</option>
                <option value="3">销售二部</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDownIcon className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>说明</label>
            <textarea 
              rows={4} 
              className={`${inputClass} resize-none`} 
              placeholder="请输入线索池相关说明信息"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="px-8 py-2 bg-blue-600 text-white rounded-lg text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
};
