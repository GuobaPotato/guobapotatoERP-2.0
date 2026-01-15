
import React, { useState } from 'react';
import { Supplier } from '../../types';
import { SUPPLIER_MANAGEMENT_HEADERS } from '../../constants';

interface SupplierTableProps {
  data: Supplier[];
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
}

export const SupplierTable: React.FC<SupplierTableProps> = ({ data, selectedIds, onSelectionChange }) => {
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) onSelectionChange(new Set(data.map(d => d.id)));
    else onSelectionChange(new Set());
  };

  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(next);
  };

  const getRatingColor = (rating?: string) => {
    switch (rating) {
      case 'A': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'B': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'C': return 'bg-slate-50 text-slate-500 border-slate-200';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto no-scrollbar custom-scrollbar">
        <table className="min-w-full divide-y divide-slate-200 text-[11px] border-separate border-spacing-0">
          <thead className="bg-slate-50 sticky top-0 z-30">
            <tr>
              <th className="sticky left-0 z-40 bg-slate-50 px-4 py-4 border-b border-slate-200 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  checked={data.length > 0 && selectedIds.size === data.length}
                  onChange={handleSelectAll}
                />
              </th>
              {SUPPLIER_MANAGEMENT_HEADERS.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={`
                    py-4 px-4 text-left font-black text-slate-600 whitespace-nowrap border-b border-slate-200 uppercase tracking-tighter
                    ${index === 0 ? 'sticky left-12 z-40 bg-slate-50 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100' : ''}
                  `}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.length === 0 ? (
              <tr>
                <td colSpan={SUPPLIER_MANAGEMENT_HEADERS.length + 1} className="px-6 py-20 text-center text-slate-400 italic font-medium">
                  暂无数据记录
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const isSelected = selectedIds.has(item.id);
                return (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-blue-50/40 transition-colors group ${isSelected ? 'bg-blue-50/60' : ''}`}
                  >
                    <td className="sticky left-0 z-20 px-4 py-4 text-center border-b border-slate-50 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer" 
                        checked={isSelected}
                        onChange={() => handleSelectOne(item.id)}
                      />
                    </td>
                    <td className="sticky left-12 z-20 px-4 py-4 font-bold text-blue-600 whitespace-nowrap bg-inherit border-b border-slate-50 border-r border-slate-100 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] cursor-pointer hover:underline">
                      {item.供应商名称}
                    </td>
                    <td className="px-4 py-4 text-slate-700 font-medium border-b border-slate-50">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">
                        {item.供应商分类}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center border-b border-slate-50 font-black text-slate-800 font-mono">{item.合作次数}</td>
                    <td className="px-4 py-4 border-b border-slate-50">
                      <span className={`px-3 py-0.5 rounded-full text-[10px] font-black border uppercase ${getRatingColor(item.供应商评级)}`}>
                        {item.供应商评级} 级
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-800 font-semibold border-b border-slate-50">{item.联系人}</td>
                    <td className="px-4 py-4 text-slate-600 font-mono border-b border-slate-50">{item.手机号}</td>
                    <td className="px-4 py-4 text-slate-500 font-mono border-b border-slate-50">{item.固定电话}</td>
                    <td className="px-4 py-4 text-slate-500 max-w-xs truncate border-b border-slate-50" title={item.地址}>{item.地址}</td>
                    <td className="px-4 py-4 text-slate-400 italic border-b border-slate-50 max-w-xs truncate" title={item.备注}>{item.备注 || '--'}</td>
                    <td className="px-4 py-4 font-bold text-slate-700 border-b border-slate-50">{item.负责人}</td>
                    <td className="px-4 py-4 text-slate-500 border-b border-slate-50">{item.负责人部门}</td>
                    <td className="px-4 py-4 text-slate-500 border-b border-slate-50">{item.创建人}</td>
                    <td className="px-4 py-4 text-slate-400 font-mono text-[10px] border-b border-slate-50">{item.创建时间}</td>
                    <td className="px-4 py-4 text-slate-400 font-mono text-[10px] border-b border-slate-50">{item.更新时间}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
