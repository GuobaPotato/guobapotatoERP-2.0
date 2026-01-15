
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { UserPlusIcon } from '../icons/UserPlusIcon';
import { Pagination } from '../Pagination';
import { SUPPLIER_LIST_DATA, SUPPLIER_LIST_TABLE_HEADERS } from '../../constants';
import { Supplier } from '../../types';

interface SelectSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSupplier: (supplierName: string) => void;
}

export const SelectSupplierModal: React.FC<SelectSupplierModalProps> = ({ isOpen, onClose, onSelectSupplier }) => {
  const [show, setShow] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const selected = SUPPLIER_LIST_DATA.find(s => s.id === selectedSupplierId);
    if (selected) {
        onSelectSupplier(selected.供应商名称);
    }
    onClose();
  };

  if (!isOpen && !show) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      aria-labelledby="select-supplier-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 flex-shrink-0">
          <h2 id="select-supplier-modal-title" className="text-lg font-semibold text-slate-800">选择供应商</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                 <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="text-slate-400" />
                    </div>
                    <input
                    type="text"
                    placeholder="搜索供应商名称"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition shadow-sm"
                    />
                </div>
                <button className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md">
                    <UserPlusIcon className="mr-2" />
                    新建
                </button>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-2.5 px-3"></th>
                            {SUPPLIER_LIST_TABLE_HEADERS.map(header => (
                                <th key={header} className="py-2.5 px-3 text-left font-medium text-slate-500 whitespace-nowrap">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {SUPPLIER_LIST_DATA.map((supplier, index) => (
                             <tr key={supplier.id} className={`transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50`}>
                                <td className="px-3 py-3">
                                    <input 
                                        type="radio" 
                                        name="supplier-selection" 
                                        value={supplier.id}
                                        checked={selectedSupplierId === supplier.id}
                                        onChange={(e) => setSelectedSupplierId(e.target.value)}
                                        className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                    />
                                </td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-700">{supplier.供应商名称}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{supplier.供应商分类}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{supplier.联系人}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{supplier.手机号}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{supplier.固定电话}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="flex-shrink-0">
             <Pagination dataSource={SUPPLIER_LIST_DATA} />
        </div>
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl flex-shrink-0">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm">
            取消
          </button>
          <button 
            onClick={handleConfirm}
            className="ml-3 px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm hover:shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
            disabled={!selectedSupplierId}
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
};
