
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';

interface AddWarehouseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddWarehouseModal: React.FC<AddWarehouseModalProps> = ({ isOpen, onClose }) => {
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

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition";
  const labelClass = "block text-sm font-medium text-slate-700";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;

  return (
    <div 
      className={`fixed inset-0 z-[60] flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      aria-labelledby="add-warehouse-modal-title" role="dialog" aria-modal="true" onClick={onClose}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-xl w-full max-w-lg transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <h2 id="add-warehouse-modal-title" className="text-lg font-semibold text-slate-800">添加仓库</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1 transition-colors"><XMarkIcon className="h-6 w-6" /></button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="warehouse-name" className={requiredLabelClass}>仓库名称</label>
              <input type="text" id="warehouse-name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="warehouse-status" className={requiredLabelClass}>状态</label>
              <select id="warehouse-status" className={inputClass}>
                <option value="">请选择</option>
                <option value="启用">启用</option>
                <option value="禁用">禁用</option>
              </select>
            </div>
            <div>
              <label htmlFor="warehouse-keeper" className={labelClass}>库管</label>
              <input type="text" id="warehouse-keeper" className={inputClass} placeholder="请选择" />
            </div>
            <div>
              <label htmlFor="warehouse-address" className={labelClass}>地址</label>
              <input type="text" id="warehouse-address" className={inputClass} />
            </div>
            <div>
              <label htmlFor="warehouse-remarks" className={labelClass}>备注</label>
              <textarea id="warehouse-remarks" rows={3} className={inputClass}></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">取消</button>
          <button onClick={onClose} className="ml-3 px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 shadow-sm">确定</button>
        </div>
      </div>
    </div>
  );
};
