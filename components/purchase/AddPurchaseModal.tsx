
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { SelectSupplierModal } from './SelectSupplierModal';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { SelectProductModal } from './SelectProductModal';
import { PurchaseProduct, Product } from '../../types';
import { TrashIcon } from '../icons/TrashIcon';

interface AddPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const productTableHeaders = ["产品名称", "规格", "价格（元）", "折扣", "成交单价", "单位", "数量", "小计", "操作"];

export const AddPurchaseModal: React.FC<AddPurchaseModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<PurchaseProduct[]>([]);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) {
    return null;
  }

  const handleSelectSupplier = (supplierName: string) => {
    setSelectedSupplier(supplierName);
    setIsSupplierModalOpen(false);
  };
  
  const handleAddProducts = (newProducts: Product[]) => {
    const productsToAdd: PurchaseProduct[] = newProducts
      .filter(p => !selectedProducts.some(sp => sp.id === p.id)) // Prevent duplicates
      .map(p => ({ ...p, quantity: 1, discount: 100 }));
    setSelectedProducts(prev => [...prev, ...productsToAdd]);
    setIsProductModalOpen(false);
  };

  const handleProductChange = (productId: string, field: 'quantity' | 'discount', value: number) => {
    setSelectedProducts(products => products.map(p => {
        if (p.id === productId) {
            return { ...p, [field]: value };
        }
        return p;
    }));
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(products => products.filter(p => p.id !== productId));
  };


  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed";
  const labelClass = "block text-sm font-medium text-slate-700";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;
  
  const InputWithUnit: React.FC<{ id: string; label: string; unit: string; required?: boolean, defaultValue?: string, disabled?: boolean }> = ({ id, label, unit, required, defaultValue, disabled }) => (
    <div>
        <label htmlFor={id} className={required ? requiredLabelClass : labelClass}>{label}</label>
        <div className="relative mt-1">
            <input type="text" id={id} className={`${inputClass} pr-12`} defaultValue={defaultValue} disabled={disabled} />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-slate-500 sm:text-sm">{unit}</span>
            </div>
        </div>
    </div>
  );


  return (
    <>
      <div 
        className={`fixed inset-0 z-40 flex justify-center items-start pt-10 md:pt-20 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-60"></div>
        <div 
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
          <div className="flex justify-between items-center p-4 border-b border-slate-200 flex-shrink-0">
            <h2 id="modal-title" className="text-lg font-semibold text-slate-800">添加采购</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1 transition-colors">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              <div>
                <label htmlFor="purchase-name" className={requiredLabelClass}>采购名称</label>
                <input type="text" id="purchase-name" className={inputClass} />
              </div>
              <div>
                <label htmlFor="supplier" className={requiredLabelClass}>供应商</label>
                <button type="button" onClick={() => setIsSupplierModalOpen(true)} className={`${inputClass} text-left flex justify-between items-center`}>
                    <span className={selectedSupplier ? 'text-slate-900' : 'text-slate-400'}>{selectedSupplier || '请选择供应商'}</span>
                    <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                </button>
              </div>
              <InputWithUnit id="product-total" label="产品总金额" unit="元" disabled />
              <InputWithUnit id="other-amount" label="其他金额" unit="元" />
              <div>
                <label htmlFor="purchase-date" className={requiredLabelClass}>采购时间</label>
                <input type="date" id="purchase-date" className={inputClass} />
              </div>
              <InputWithUnit id="purchase-amount" label="采购金额" unit="元" required defaultValue="0" />
            </form>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                  <h3 className="text-md font-semibold text-slate-800">添加产品</h3>
                  <button type="button" onClick={() => setIsProductModalOpen(true)} className="flex items-center justify-center bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm text-sm">
                      <PlusIcon className="mr-1.5 h-4 w-4" />
                      添加
                  </button>
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
                      <thead className="bg-slate-50">
                          <tr>
                              {productTableHeaders.map(header => (
                                  <th key={header} className="py-2.5 px-3 text-left font-medium text-slate-500 whitespace-nowrap">{header}</th>
                              ))}
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                          {selectedProducts.length === 0 ? (
                            <tr>
                                <td colSpan={productTableHeaders.length} className="text-center py-10 text-slate-500">
                                    暂无数据
                                </td>
                            </tr>
                          ) : (
                            selectedProducts.map(p => {
                                const price = p["采购价格 (元)"];
                                const finalPrice = price * (p.discount / 100);
                                const subtotal = finalPrice * p.quantity;
                                return (
                                    <tr key={p.id}>
                                        <td className="px-3 py-2 whitespace-nowrap text-slate-700">{p["产品名称(规格)"]}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-slate-600">{p.属性 || '--'}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-slate-600">{price.toFixed(2)}</td>
                                        <td className="px-3 py-2 whitespace-nowrap"><input type="number" value={p.discount} onChange={e => handleProductChange(p.id, 'discount', parseFloat(e.target.value))} className="w-20 text-center border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" /></td>
                                        <td className="px-3 py-2 whitespace-nowrap text-slate-600">{finalPrice.toFixed(2)}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-slate-600">{p.单位}</td>
                                        <td className="px-3 py-2 whitespace-nowrap"><input type="number" value={p.quantity} onChange={e => handleProductChange(p.id, 'quantity', parseInt(e.target.value, 10))} className="w-20 text-center border-slate-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" /></td>
                                        <td className="px-3 py-2 whitespace-nowrap text-slate-800 font-medium">{subtotal.toFixed(2)}</td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                            <button type="button" onClick={() => removeProduct(p.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors">
                                                <TrashIcon />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                          )}
                      </tbody>
                  </table>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl flex-shrink-0">
            <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm">
              取消
            </button>
            <button 
              onClick={onClose}
              className="ml-3 px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm hover:shadow-md"
            >
              保存
            </button>
          </div>
        </div>
      </div>
      <SelectSupplierModal 
        isOpen={isSupplierModalOpen} 
        onClose={() => setIsSupplierModalOpen(false)}
        onSelectSupplier={handleSelectSupplier}
      />
      <SelectProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddProducts={handleAddProducts}
      />
    </>
  );
};
