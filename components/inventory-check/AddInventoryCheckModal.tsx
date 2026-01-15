
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { InventoryCheckProduct, InventoryCheckProductSelection } from '../../types';
import { SelectInventoryProductModal } from './SelectInventoryProductModal';

interface AddInventoryCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddInventoryCheckModal: React.FC<AddInventoryCheckModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState<InventoryCheckProduct[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const handleAddProducts = (newProducts: InventoryCheckProductSelection[]) => {
    const productsToAdd: InventoryCheckProduct[] = newProducts
      .filter(p => !products.some(sp => sp.id === p.id))
      .map(p => ({
        id: p.id,
        productName: p.productName,
        spec: p.spec,
        unit: p.unit,
        originalStock: p.availableStock,
        actualStock: p.availableStock,
        status: '待盘点',
      }));
    setProducts(prev => [...prev, ...productsToAdd]);
    setIsProductModalOpen(false);
  };

  const handleProductChange = (productId: string, field: 'actualStock' | 'snCode' | 'remarks', value: string | number) => {
    setProducts(current =>
      current.map(p => {
        if (p.id === productId) {
          const updated = { ...p, [field]: value };
          if (field === 'actualStock') updated.status = '已盘点';
          return updated;
        }
        return p;
      })
    );
  };

  const removeProduct = (productId: string) => {
    setProducts(current => current.filter(p => p.id !== productId));
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const labelClass = "block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;

  return (
    <>
      <div 
        className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        role="dialog" aria-modal="true" onClick={onClose}
      >
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div 
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50/50 rounded-t-2xl">
            <h2 className="text-xl font-bold text-slate-800">添加</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1.5 transition-colors hover:bg-white shadow-sm border border-transparent hover:border-slate-100">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-8 overflow-y-auto custom-scrollbar">
            <form className="space-y-8" onSubmit={e => e.preventDefault()}>
              {/* 基本信息 Section */}
              <section>
                <div className="flex items-center space-x-2 mb-6 border-l-4 border-blue-600 pl-3">
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">基本信息</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <label className={requiredLabelClass}>标题</label>
                    <input type="text" className={inputClass} placeholder="请输入盘点计划标题" />
                  </div>
                  <div>
                    <label className={requiredLabelClass}>盘点时间</label>
                    <input type="date" className={inputClass} defaultValue="2025-10-07" />
                  </div>
                  <div>
                    <label className={requiredLabelClass}>盘点负责人</label>
                    <input type="text" className={inputClass} defaultValue="李总监(全公司)" />
                  </div>
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className={labelClass}>备注</label>
                    <textarea rows={3} className={`${inputClass} resize-none`} placeholder="请输入备注信息"></textarea>
                  </div>
                </div>
              </section>

              {/* 产品信息 Section */}
              <section>
                <div className="flex justify-between items-center mb-6 border-l-4 border-blue-600 pl-3">
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">产品信息</h3>
                  <button 
                    type="button"
                    onClick={() => setIsProductModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    添加
                  </button>
                </div>

                <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        {["产品名称", "应有库存", "实际库存", "盘点状态", "SN码", "备注", "操作"].map(h => (
                          <th key={h} className="px-4 py-4 text-left font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-20 text-center text-slate-400 italic">暂无数据</td>
                        </tr>
                      ) : (
                        products.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-4 font-bold text-slate-800">{p.productName} ({p.spec})</td>
                            <td className="px-4 py-4 font-mono text-slate-600">{p.originalStock}</td>
                            <td className="px-4 py-2">
                              <input 
                                type="number" 
                                value={p.actualStock}
                                onChange={e => handleProductChange(p.id, 'actualStock', parseInt(e.target.value) || 0)}
                                className="w-24 px-2 py-1 border border-slate-200 rounded text-center focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-4 py-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                                p.actualStock !== p.originalStock 
                                ? 'bg-amber-50 text-amber-600 border-amber-100' 
                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                              }`}>
                                {p.actualStock === p.originalStock ? '正常' : '异常'}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              <input 
                                type="text" 
                                placeholder="输入SN码"
                                onChange={e => handleProductChange(p.id, 'snCode', e.target.value)}
                                className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input 
                                type="text" 
                                placeholder="备注"
                                onChange={e => handleProductChange(p.id, 'remarks', e.target.value)}
                                className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-4 py-4">
                              <button onClick={() => removeProduct(p.id)} className="text-rose-500 hover:text-rose-700 transition-colors p-1">
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </form>
          </div>

          {/* Footer */}
          <div className="flex justify-end items-center gap-3 p-5 border-t border-slate-200 bg-white rounded-b-2xl">
            <button 
              onClick={onClose} 
              className="px-8 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest"
            >
              取消
            </button>
            <button 
              onClick={onClose}
              className="px-10 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95 uppercase tracking-widest"
            >
              确定
            </button>
          </div>
        </div>
      </div>

      <SelectInventoryProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} onAddProducts={handleAddProducts} selectedWarehouse={null} />
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </>
  );
};
