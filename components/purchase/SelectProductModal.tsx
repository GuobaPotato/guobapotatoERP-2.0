
import React, { useState, useEffect, useMemo } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { PRODUCT_CATEGORIES, PRODUCT_SELECTION_DATA, PRODUCT_SELECTION_TABLE_HEADERS } from '../../constants';
import { Product } from '../../types';

interface SelectProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProducts: (products: Product[]) => void;
}

export const SelectProductModal: React.FC<SelectProductModalProps> = ({ isOpen, onClose, onAddProducts }) => {
  const [show, setShow] = useState(false);
  const [activeCategory, setActiveCategory] = useState("全部分类");
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => {
        setShow(false);
        setSelectedProductIds(new Set()); // Reset selection on close
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
        setSelectedProductIds(new Set(PRODUCT_SELECTION_DATA.map(p => p.id)));
    } else {
        setSelectedProductIds(new Set());
    }
  };

  const handleSelectOne = (productId: string) => {
    const newSelection = new Set(selectedProductIds);
    if (newSelection.has(productId)) {
        newSelection.delete(productId);
    } else {
        newSelection.add(productId);
    }
    setSelectedProductIds(newSelection);
  };
  
  const handleConfirm = () => {
    const selected = PRODUCT_SELECTION_DATA.filter(p => selectedProductIds.has(p.id));
    onAddProducts(selected);
  };
  
  const isAllSelected = useMemo(() => {
    return PRODUCT_SELECTION_DATA.length > 0 && selectedProductIds.size === PRODUCT_SELECTION_DATA.length;
  }, [selectedProductIds]);

  if (!isOpen && !show) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      aria-labelledby="select-product-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-50 rounded-xl shadow-xl w-full max-w-6xl h-[90vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 flex-shrink-0 bg-white rounded-t-xl">
          <h2 id="select-product-modal-title" className="text-lg font-semibold text-slate-800">选择产品</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex flex-grow min-h-0">
          <aside className="w-48 bg-white border-r border-slate-200 p-2 flex-shrink-0">
            <nav>
              <ul>
                {PRODUCT_CATEGORIES.map(category => (
                    <li key={category}>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory(category); }}
                           className={`block px-3 py-2 text-sm rounded-md transition-colors ${activeCategory === category ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
                            {category}
                        </a>
                    </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main className="flex-1 flex flex-col bg-white p-4">
            <div className="flex gap-4 mb-4">
                <div className="relative flex-grow">
                    <input type="text" placeholder="搜索产品名称" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                </div>
                 <div className="relative flex-grow">
                    <input type="text" placeholder="搜索产品编码" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                </div>
            </div>
            <div className="overflow-auto flex-grow border border-slate-200 rounded-lg">
                <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
                     <thead className="bg-slate-100 sticky top-0">
                        <tr>
                            <th className="p-3">
                                <input type="checkbox" onChange={handleSelectAll} checked={isAllSelected} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                            </th>
                            {PRODUCT_SELECTION_TABLE_HEADERS.map(header => (
                                <th key={header} className="py-2.5 px-3 text-left font-medium text-slate-500 whitespace-nowrap">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {PRODUCT_SELECTION_DATA.map((p, index) => (
                             <tr key={p.id} className={`transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50`}>
                                <td className="p-3">
                                    <input type="checkbox" checked={selectedProductIds.has(p.id)} onChange={() => handleSelectOne(p.id)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"/>
                                </td>
                                {/* Fixed: Use optional chaining or defaults for optional properties to avoid TS errors */}
                                <td className="px-3 py-3 whitespace-nowrap text-slate-700">{p["产品名称(规格)"] || p.产品名称}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{p.属性 || '--'}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{p["采购价格 (元)"]?.toFixed(2) || '0.00'}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{p.商品编码 || '--'}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{p.条形码 || '--'}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{p.单位}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{p.状态}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{p.负责人}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{p.创建人}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </main>
        </div>

        <div className="flex justify-between items-center p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl flex-shrink-0">
            <div className="text-sm text-slate-600">
                已选 <span className="font-semibold text-blue-600">{selectedProductIds.size}</span> 个产品
            </div>
          <div>
            <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm">
              取消
            </button>
            <button 
              onClick={handleConfirm}
              className="ml-3 px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm hover:shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
