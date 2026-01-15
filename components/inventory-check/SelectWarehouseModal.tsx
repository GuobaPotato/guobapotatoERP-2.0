
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { Pagination } from '../Pagination';
import { WAREHOUSE_LIST_DATA } from '../../constants';
import { Warehouse } from '../../types';
import { AddWarehouseModal } from './AddWarehouseModal';

interface SelectWarehouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (warehouse: Warehouse) => void;
}

const TABLE_HEADERS = ["仓库编号", "仓库名称", "仓库地址", "状态", "库管"];

export const SelectWarehouseModal: React.FC<SelectWarehouseModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const selected = WAREHOUSE_LIST_DATA.find(w => w.id === selectedId);
    if (selected) {
        onSelect(selected);
    }
    onClose();
  };

  if (!isOpen && !show) {
    return null;
  }

  return (
    <>
    <div 
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      aria-labelledby="select-warehouse-modal-title" role="dialog" aria-modal="true" onClick={onClose}
    >
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 flex-shrink-0">
          <h2 id="select-warehouse-modal-title" className="text-lg font-semibold text-slate-800">选择仓库</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1 transition-colors"><XMarkIcon className="h-6 w-6" /></button>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon className="text-slate-400" /></div>
                    <input type="text" placeholder="编号、仓库名称" className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm shadow-sm" />
                </div>
                <button onClick={() => setIsAddModalOpen(true)} className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    添加仓库
                </button>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-2.5 px-3"></th>
                            {TABLE_HEADERS.map(header => (<th key={header} className="py-2.5 px-3 text-left font-medium text-slate-500 whitespace-nowrap">{header}</th>))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {WAREHOUSE_LIST_DATA.map((warehouse) => (
                             <tr key={warehouse.id} className="hover:bg-blue-50">
                                <td className="px-3 py-3"><input type="radio" name="warehouse-selection" value={warehouse.id} checked={selectedId === warehouse.id} onChange={(e) => setSelectedId(e.target.value)} className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500" /></td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-700">{warehouse.warehouseCode}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{warehouse.warehouseName}</td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{warehouse.warehouseAddress}</td>
                                <td className="px-3 py-3 whitespace-nowrap"><span className={`px-2 py-0.5 rounded-full text-xs ${warehouse.status === '启用' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{warehouse.status}</span></td>
                                <td className="px-3 py-3 whitespace-nowrap text-slate-600">{warehouse.warehouseKeeper}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="flex-shrink-0">
             <Pagination dataSource={WAREHOUSE_LIST_DATA} />
        </div>
        <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl flex-shrink-0">
          <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">取消</button>
          <button onClick={handleConfirm} className="ml-3 px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 shadow-sm disabled:bg-slate-400" disabled={!selectedId}>确定</button>
        </div>
      </div>
    </div>
    <AddWarehouseModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </>
  );
};
