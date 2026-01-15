
import React, { useState } from 'react';
import { SupplierHeader } from '../components/purchase/SupplierHeader';
import { SupplierFilterBar } from '../components/purchase/SupplierFilterBar';
import { SupplierTable } from '../components/purchase/SupplierTable';
import { SUPPLIER_MANAGEMENT_DATA } from '../constants';
import { AddSupplierModal } from '../components/purchase/AddSupplierModal';

export const SupplierManagementPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelectionChange = (ids: Set<string>) => {
    setSelectedIds(ids);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      <SupplierHeader 
        onAddClick={() => setIsAddModalOpen(true)} 
        selectedCount={selectedIds.size}
      />
      
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <SupplierFilterBar />
        
        <div className="flex-1 overflow-hidden relative">
          <SupplierTable 
            data={SUPPLIER_MANAGEMENT_DATA} 
            selectedIds={selectedIds}
            onSelectionChange={handleSelectionChange}
          />
        </div>

        {/* 底部信息与分页区 */}
        <footer className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 z-40">
          <div className="flex items-center space-x-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <div>
              共 <span className="text-slate-800">5</span> 条供应商记录
            </div>
            <div className="h-3 w-px bg-slate-200"></div>
            <div>
              已选 <span className="text-blue-600">{selectedIds.size}</span> 项
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">每页条数:</span>
              <select className="bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-xs font-bold focus:ring-1 focus:ring-blue-500 outline-none">
                <option>20条/页</option>
                <option>50条/页</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-1">
              <button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed text-[10px] font-black uppercase">上一页</button>
              <span className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-black shadow-md shadow-blue-100">1</span>
              <button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed text-[10px] font-black uppercase">下一页</button>
            </div>

            <div className="flex items-center space-x-2 ml-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">前往</span>
              <input type="text" className="w-10 h-7 border border-slate-300 rounded text-center text-xs font-bold focus:ring-1 focus:ring-blue-500 outline-none" defaultValue="1" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">页</span>
              <button className="px-3 py-1 bg-slate-800 text-white rounded text-[10px] font-black uppercase hover:bg-black transition-all">跳转</button>
            </div>
          </div>
        </footer>
      </div>

      <AddSupplierModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}`}</style>
    </div>
  );
};
