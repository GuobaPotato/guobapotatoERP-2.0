
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { PRODUCT_CATEGORIES_LIST } from '../../constants';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UNITS = ["个", "件", "套", "组", "只", "卷", "米"];

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [isMultiSpec, setIsMultiSpec] = useState(false);
  const [snEnabled, setSnEnabled] = useState("否");

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
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      aria-labelledby="add-product-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* 标题区 */}
        <div className="flex justify-between items-center p-4 px-6 border-b border-slate-200 bg-slate-50/50 rounded-t-xl">
          <h2 id="add-product-modal-title" className="text-lg font-bold text-slate-800">添加产品</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* 表单内容区 */}
        <div className="p-6 overflow-y-auto">
          <form className="space-y-8">
            
            {/* 基础信息区 */}
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                <h3 className="text-md font-bold text-slate-800">基础信息</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label htmlFor="p-category" className={requiredLabelClass}>产品分类</label>
                  <select id="p-category" className={inputClass} defaultValue="">
                    <option value="" disabled>请选择分类</option>
                    {PRODUCT_CATEGORIES_LIST.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="p-name" className={requiredLabelClass}>产品名称</label>
                  <input type="text" id="p-name" className={inputClass} placeholder="请输入产品名称" />
                </div>
                <div>
                  <label htmlFor="p-unit" className={requiredLabelClass}>单位</label>
                  <select id="p-unit" className={inputClass} defaultValue="个">
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="p-price" className={requiredLabelClass}>标准价格</label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 sm:text-sm">¥</span>
                    </div>
                    <input type="number" id="p-price" className={`${inputClass} pl-7`} placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>SN码启用</label>
                  <div className="mt-3 flex items-center space-x-6">
                    {["是", "否"].map(opt => (
                      <label key={opt} className="inline-flex items-center cursor-pointer group">
                        <input 
                          type="radio" 
                          name="sn-enabled" 
                          value={opt} 
                          checked={snEnabled === opt}
                          onChange={(e) => setSnEnabled(e.target.value)}
                          className="form-radio h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                        />
                        <span className="ml-2 text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="p-cost" className={labelClass}>采购价</label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-400 sm:text-sm">¥</span>
                    </div>
                    <input type="number" id="p-cost" className={`${inputClass} pl-7`} placeholder="0.00" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-800">启用多规格</span>
                      <span className="text-xs text-slate-500">开启后可为不同规格设置价格和库存</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsMultiSpec(!isMultiSpec)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${isMultiSpec ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isMultiSpec ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 扩展信息区 */}
            <section>
              <div className="flex items-center space-x-2 mb-4 pt-4 border-t border-slate-100">
                <div className="w-1 h-4 bg-slate-400 rounded-full"></div>
                <h3 className="text-md font-bold text-slate-800">扩展信息</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label htmlFor="p-barcode" className={labelClass}>条形码</label>
                  <input type="text" id="p-barcode" className={inputClass} placeholder="扫描或输入条形码" />
                </div>
                <div>
                  <label htmlFor="p-code" className={labelClass}>商品编码</label>
                  <input type="text" id="p-code" className={inputClass} placeholder="系统内部编码" />
                </div>
                <div>
                  <label htmlFor="p-min" className={labelClass}>预警下限</label>
                  <input type="number" id="p-min" className={inputClass} placeholder="库存低于此值将提醒" />
                </div>
                <div>
                  <label htmlFor="p-max" className={labelClass}>预警上限</label>
                  <input type="number" id="p-max" className={inputClass} placeholder="库存高于此值将提醒" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="p-desc" className={labelClass}>描述</label>
                  <textarea id="p-desc" rows={3} className={inputClass} placeholder="产品的详细描述信息..."></textarea>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* 操作按钮区 */}
        <div className="flex justify-end items-center p-4 px-6 border-t border-slate-200 bg-slate-50/80 rounded-b-xl flex-shrink-0">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="ml-3 px-8 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg hover:shadow-blue-200"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
};
