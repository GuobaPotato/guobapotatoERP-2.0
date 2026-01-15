
import React, { useState, useEffect, useMemo } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { INVENTORY_CHECK_PRODUCTS_DATA } from '../../constants';
import { InventoryCheckProductSelection, Warehouse } from '../../types';
import { Pagination } from '../Pagination';

interface SelectInventoryProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProducts: (products: InventoryCheckProductSelection[]) => void;
  selectedWarehouse: Warehouse | null;
}

const TABLE_HEADERS = ["产品名称", "规格", "单位", "可用库存", "所属仓库"];

export const SelectInventoryProductModal: React.FC<SelectInventoryProductModalProps> = ({ isOpen, onClose, onAddProducts, selectedWarehouse }) => {
  const [show, setShow] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set());
  
  const filteredProducts = useMemo(() => {
    if (!selectedWarehouse) return INVENTORY_CHECK_PRODUCTS_DATA;
    return INVENTORY_CHECK_PRODUCTS_DATA.filter(p => p.warehouse === selectedWarehouse.warehouseName);
  }, [selectedWarehouse]);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => {
        setShow(false);
        setSelectedProductIds(new Set());
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
        setSelectedProductIds(new Set(filteredProducts.map(p => p.id)));
    } else {
        setSelectedProductIds(new Set());
    }
  };

  const handleSelectOne = (productId: string) => {
    const newSelection = new Set(selectedProductIds);
    if (newSelection.has(productId)) newSelection.delete(productId);
    else newSelection.add(productId);
    setSelectedProductIds(newSelection);
  };
  
  const handleConfirm = () => {
    const selected = filteredProducts.filter(p => selectedProductIds.has(p.id));
    onAddProducts(selected);
  };
  
  const isAllSelected = useMemo(() => {
    return filteredProducts.length > 0 && selectedProductIds.size === filteredProducts.length;
  }, [selectedProductIds, filteredProducts]);

  if (!isOpen && !show) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-slate-800">选择产品</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1"><XMarkIcon className="h-6 w-6" /></button>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="p-3"><input type="checkbox" onChange={handleSelectAll} checked={isAllSelected} className="h-4 w-4 rounded border-slate-300" /></th>
                            {TABLE_HEADERS.map(h => <th key={h} className="p-3 text-left font-medium text-slate-500">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {filteredProducts.map(p => (
                             <tr key={p.id} className="hover:bg-blue-50">
                                <td className="p-3"><input type="checkbox" checked={selectedProductIds.has(p.id)} onChange={() => handleSelectOne(p.id)} className="h-4 w-4 rounded border-slate-300"/></td>
                                <td className="p-3 text-slate-700">{p.productName}</td>
                                <td className="p-3 text-slate-600">{p.spec}</td>
                                <td className="p-3 text-slate-600">{p.unit}</td>
                                <td className="p-3 text-slate-600">{p.availableStock}</td>
                                <td className="p-3 text-slate-500 text-xs">{p.warehouse}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="flex-shrink-0"><Pagination dataSource={filteredProducts} /></div>
        <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
            <div className="text-sm text-slate-600">已选 <span className="font-semibold text-blue-600">{selectedProductIds.size}</span> 个产品</div>
            <div>
                <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">取消</button>
                <button onClick={handleConfirm} className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">确定</button>
            </div>
        </div>
      </div>
    </div>
  );
};
