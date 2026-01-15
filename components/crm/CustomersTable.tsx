
import React from 'react';
import { Customer } from '../../types';
import { CUSTOMERS_TABLE_HEADERS } from '../../constants';

interface CustomersTableProps {
  data: Customer[];
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  onNameClick?: (id: string) => void;
}

export const CustomersTable: React.FC<CustomersTableProps> = ({ data, selectedIds, onSelectionChange, onNameClick }) => {
  
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onSelectionChange(new Set(data.map(d => d.id)));
    } else {
      onSelectionChange(new Set());
    }
  };

  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(next);
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 overflow-auto custom-scrollbar no-scrollbar">
        <table className="min-w-full divide-y divide-slate-100 text-[11px] border-separate border-spacing-0">
          <thead className="bg-slate-50 sticky top-0 z-30">
            <tr>
              <th scope="col" className="sticky left-0 z-40 bg-slate-50 px-4 py-4 border-b border-slate-200 w-[50px] shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  checked={data.length > 0 && selectedIds.size === data.length}
                  onChange={handleSelectAll}
                />
              </th>
              {CUSTOMERS_TABLE_HEADERS.map((header, idx) => (
                <th
                  key={header}
                  scope="col"
                  className={`
                    py-4 px-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50
                    ${idx === 0 ? 'sticky left-[50px] z-40 bg-slate-50 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100' : ''}
                  `}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-50">
            {data.map((row) => {
              const isSelected = selectedIds.has(row.id);
              return (
                <tr key={row.id} className={`hover:bg-blue-50/40 transition-colors group ${isSelected ? 'bg-blue-50/60' : ''}`}>
                  <td className={`sticky left-0 z-20 px-4 py-4 whitespace-nowrap border-b border-slate-50 transition-colors ${isSelected ? 'bg-[#f5f8ff]' : 'bg-white group-hover:bg-slate-50'} shadow-[2px_0_5px_rgba(0,0,0,0.02)]`}>
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer" 
                      checked={isSelected}
                      onChange={() => handleSelectOne(row.id)}
                    />
                  </td>
                  
                  <td className={`sticky left-[50px] z-20 px-4 py-4 font-bold text-blue-600 hover:underline cursor-pointer border-b border-slate-50 border-r border-slate-100 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] whitespace-nowrap transition-colors ${isSelected ? 'bg-[#f5f8ff]' : 'bg-white group-hover:bg-slate-50'}`}
                      onClick={() => onNameClick?.(row.id)}>
                    {row.客户名称}
                  </td>

                  <td className="px-4 py-4 text-slate-600 whitespace-nowrap border-b border-slate-50 font-mono">{row.客户电话}</td>
                  <td className="px-4 py-4 text-slate-500 font-mono border-b border-slate-50">{row.座机}</td>
                  <td className="px-4 py-4 text-slate-600 border-b border-slate-50">{row.客户来源}</td>
                  <td className="px-4 py-4 text-blue-500 hover:underline cursor-pointer border-b border-slate-50 max-w-[200px] truncate" title={row.客户官网}>{row.客户官网}</td>
                  <td className="px-4 py-4 text-slate-500 max-w-xs truncate border-b border-slate-50" title={row.地址}>{row.地址}</td>
                  <td className="px-4 py-4 text-slate-400 italic border-b border-slate-50 max-w-xs truncate" title={row.备注}>{row.备注}</td>
                  <td className="px-4 py-4 text-slate-600 border-b border-slate-50">{row.邮箱地址}</td>
                  <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50 uppercase tracking-tighter">{row.客户编号}</td>
                  <td className="px-4 py-4 text-slate-600 font-medium border-b border-slate-50">{row.团队成员}</td>
                  <td className="px-4 py-4 text-slate-400 border-b border-slate-50 font-mono">{row.最近跟进时间}</td>
                  <td className="px-4 py-4 text-slate-800 font-bold border-b border-slate-50 font-mono">{row.下次联系时间}</td>
                  <td className="px-4 py-4 text-slate-700 border-b border-slate-50">{row.首要联系人}</td>
                  <td className="px-4 py-4 border-b border-slate-50">
                     <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-200 font-black uppercase text-[9px]">{row.是否有跟进记录}</span>
                  </td>
                  <td className="px-4 py-4 text-slate-500 border-b border-slate-50">{row.客户成交状态}</td>
                  <td className="px-4 py-4 text-slate-400 border-b border-slate-50 italic">{row.最近回收时间}</td>
                  <td className="px-4 py-4 font-bold text-slate-700 border-b border-slate-50">{row.负责人}</td>
                  <td className="px-4 py-4 text-slate-400 border-b border-slate-50 uppercase tracking-widest">{row.创建人}</td>
                  <td className="px-4 py-4 text-slate-400 border-b border-slate-50 font-mono text-[10px]">{row.创建时间}</td>
                  <td className="px-4 py-4 text-slate-400 border-b border-slate-50 font-mono text-[10px]">{row.更新时间}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
