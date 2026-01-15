
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSupplierModal: React.FC<AddSupplierModalProps> = ({ isOpen, onClose }) => {
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
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">添加供应商</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1.5 transition-colors hover:bg-slate-100">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              
              {/* 供应商分类 */}
              <div>
                <label className={requiredLabelClass}>供应商分类</label>
                <div className="relative">
                  <select className={`${inputClass} appearance-none pr-10`} defaultValue="原材料供应商">
                    <option value="">请选择分类</option>
                    <option value="原材料供应商">原材料供应商</option>
                    <option value="电子配件供应商">电子配件供应商</option>
                    <option value="辅料供应商">辅料供应商</option>
                    <option value="外协加工厂">外协加工厂</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDownIcon className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* 供应商名称 */}
              <div>
                <label className={requiredLabelClass}>供应商名称</label>
                <input type="text" className={inputClass} placeholder="请输入供应商名称" defaultValue="XX塑料配件有限公司" />
              </div>

              {/* 联系人 */}
              <div>
                <label className={requiredLabelClass}>联系人</label>
                <input type="text" className={inputClass} placeholder="请输入联系人" defaultValue="张经理" />
              </div>

              {/* 手机号 */}
              <div>
                <label className={requiredLabelClass}>手机号</label>
                <input type="tel" className={inputClass} placeholder="请输入手机号" defaultValue="138XXXX1234" />
              </div>

              {/* 固定电话 */}
              <div>
                <label className={labelClass}>固定电话</label>
                <input type="text" className={inputClass} placeholder="请输入固定电话" defaultValue="0574-XXXX8888" />
              </div>

              {/* 地址组 */}
              <div className="md:col-span-2">
                <label className={labelClass}>地址</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1">
                  <div className="relative">
                    <select className={`${inputClass} appearance-none pr-10`} defaultValue="浙江省宁波市">
                      <option value="">请选择地区</option>
                      <option value="浙江省宁波市">浙江省宁波市</option>
                      <option value="广东省深圳市">广东省深圳市</option>
                      <option value="上海市">上海市</option>
                      <option value="江苏省苏州市">江苏省苏州市</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDownIcon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <input type="text" className={inputClass} placeholder="请输入详细地址" defaultValue="XX工业园区A栋" />
                  </div>
                </div>
              </div>

              {/* 备注 */}
              <div className="md:col-span-2">
                <label className={labelClass}>备注</label>
                <textarea 
                  rows={3} 
                  className={`${inputClass} resize-none`} 
                  placeholder="请输入备注信息"
                  defaultValue="供应酒店/医院感应龙头外壳，ABS材质为主"
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose} 
            className="px-8 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="px-10 py-2 bg-blue-600 text-white rounded-lg text-sm font-black hover:bg-blue-700 transition-all shadow-lg active:scale-95 uppercase tracking-widest"
          >
            提交
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
