
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';

interface AddPurchaseReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPurchaseReturnModal: React.FC<AddPurchaseReturnModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [returnType, setReturnType] = useState<'refund' | 'exchange'>('refund');

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const inputClass = "mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-500";
  const labelClass = "block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;
  const sectionTitleClass = "text-sm font-black text-slate-800 border-l-4 border-blue-600 pl-3 mb-4 flex items-center justify-between";

  return (
    <div className={`fixed inset-0 z-[100] flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-[850px] max-h-[90vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-white rounded-t-2xl">
          <h2 className="text-xl font-bold text-slate-800">编辑采购退货单</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* Section 1: Basic Info */}
          <section>
            <div className={sectionTitleClass}>板块1：基本信息</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-xl border border-slate-100">
              <div>
                <label className={requiredLabelClass}>标题</label>
                <input type="text" className={inputClass} defaultValue="红外感应器瑕疵退货" />
              </div>
              <div>
                <label className={requiredLabelClass}>采购单</label>
                <div className="relative">
                  <input type="text" className={inputClass} defaultValue="25121000红外感应器采购" />
                </div>
              </div>
              <div>
                <label className={labelClass}>供应商</label>
                <input type="text" className={inputClass} defaultValue="众林感应洁具配件厂" disabled />
              </div>
              <div>
                <label className={requiredLabelClass}>退货时间</label>
                <input type="date" className={inputClass} defaultValue="2026-01-09" />
              </div>
              <div>
                <label className={requiredLabelClass}>退货金额</label>
                <div className="relative">
                  <input type="number" className={inputClass} defaultValue="1880.00" />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">元</span>
                </div>
              </div>
              <div>
                <label className={requiredLabelClass}>负责人</label>
                <input type="text" className={inputClass} defaultValue="王朔" />
              </div>
              <div>
                <label className={labelClass}>退换货</label>
                <div className="mt-3 flex items-center space-x-6">
                  <label className="inline-flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      className="form-radio h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                      name="return_type"
                      checked={returnType === 'refund'}
                      onChange={() => setReturnType('refund')}
                    />
                    <span className={`ml-2 text-sm font-medium ${returnType === 'refund' ? 'text-blue-600' : 'text-slate-600'}`}>退款退货</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      className="form-radio h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                      name="return_type"
                      checked={returnType === 'exchange'}
                      onChange={() => setReturnType('exchange')}
                    />
                    <span className={`ml-2 text-sm font-medium ${returnType === 'exchange' ? 'text-blue-600' : 'text-slate-600'}`}>换货</span>
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>备注</label>
                <input type="text" className={inputClass} defaultValue="--" />
              </div>
            </div>
          </section>

          {/* Section 2: Product Info */}
          <section>
            <div className={sectionTitleClass}>板块2：产品信息</div>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="min-w-full text-xs">
                <thead className="bg-slate-50">
                  <tr>
                    {["产品名称", "规格", "采购数量", "可退货数量", "退货单价", "退货数量", "备注"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-4 font-bold text-slate-800">2512100红外感应器</td>
                    <td className="px-4 py-4 text-slate-400 italic">--</td>
                    <td className="px-4 py-4 text-slate-600">120</td>
                    <td className="px-4 py-4 text-slate-600 font-mono">120</td>
                    <td className="px-4 py-4 font-mono text-slate-700">15.66</td>
                    <td className="px-4 py-2">
                      <input type="number" className="w-24 px-2 py-1 border border-blue-200 rounded font-black text-center text-blue-600" defaultValue="120" />
                    </td>
                    <td className="px-4 py-4 text-slate-400 italic">--</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">合计 (元):</span>
                <span className="text-xl font-black text-blue-600 font-mono">1880.00</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose} 
            className="px-8 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="px-10 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black transition-all shadow-lg hover:bg-blue-700 active:scale-95 uppercase tracking-widest"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
};
