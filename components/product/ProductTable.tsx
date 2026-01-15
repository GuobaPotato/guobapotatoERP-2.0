
import React, { useState, useMemo } from 'react';
import { Product } from '../../types';
import { PRODUCT_MANAGEMENT_HEADERS } from '../../constants';

interface ProductTableProps {
  data: Product[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(data.map(p => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const isAllSelected = data.length > 0 && selectedIds.size === data.length;
  const isIndeterminate = selectedIds.size > 0 && selectedIds.size < data.length;

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 overflow-auto no-scrollbar">
        <table className="min-w-full divide-y divide-slate-200 text-sm border-separate border-spacing-0">
          <thead className="bg-slate-50 sticky top-0 z-30">
            <tr>
              <th scope="col" className="sticky left-0 z-40 bg-slate-50 px-4 py-3 border-b border-slate-200">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  checked={isAllSelected}
                  ref={el => { if (el) el.indeterminate = isIndeterminate; }}
                  onChange={handleSelectAll}
                />
              </th>
              {PRODUCT_MANAGEMENT_HEADERS.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={`
                    py-3.5 px-4 text-left font-semibold text-slate-600 whitespace-nowrap border-b border-slate-200
                    ${index === 0 ? 'sticky left-[48px] z-40 bg-slate-50 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-r border-slate-200' : ''}
                  `}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {data.map((product, pIndex) => {
              const isSelected = selectedIds.has(product.id);
              return (
                <tr 
                  key={product.id} 
                  className={`transition-colors duration-150 group ${isSelected ? 'bg-blue-50' : 'hover:bg-slate-50/80'}`}
                >
                  <td className={`
                    sticky left-0 z-20 px-4 py-4 whitespace-nowrap border-b border-slate-100
                    ${isSelected ? 'bg-blue-50' : 'bg-white group-hover:bg-slate-50'}
                  `}>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      checked={isSelected}
                      onChange={() => handleSelectOne(product.id)}
                    />
                  </td>

                  {/* 产品编码 - 作为唯一标识吸附在复选框旁 */}
                  <td className={`
                    sticky left-[48px] z-20 px-4 py-4 font-mono font-bold text-blue-600 whitespace-nowrap 
                    border-b border-slate-100 border-r border-slate-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]
                    ${isSelected ? 'bg-blue-50' : 'bg-white group-hover:bg-slate-50'}
                  `}>
                    {product.id}
                  </td>

                  <td className="px-4 py-4 text-slate-600 whitespace-nowrap border-b border-slate-100">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-100 text-[9px] uppercase">
                       {product.产品类型 || product.属性}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600 whitespace-nowrap border-b border-slate-100 font-bold">{product.产品分类}</td>
                  <td className="px-4 py-4 text-slate-500 whitespace-nowrap border-b border-slate-100">{product.规格型号}</td>
                  <td className="px-4 py-4 text-slate-600 whitespace-nowrap text-center border-b border-slate-100">{product.单位}</td>
                  <td className="px-4 py-4 text-slate-800 font-medium whitespace-nowrap border-b border-slate-100">¥{product.标准价格}</td>
                  <td className="px-4 py-4 text-slate-500 whitespace-nowrap border-b border-slate-100">¥{product.采购价}</td>
                  <td className="px-4 py-4 whitespace-nowrap border-b border-slate-100">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${product.SN码启用 === '是' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                      {product.SN码启用}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap border-b border-slate-100">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${product.多规格启用 === '是' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                      {product.多规格启用}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600 whitespace-nowrap border-b border-slate-100">{product.负责人}</td>
                  <td className="px-4 py-4 text-slate-500 whitespace-nowrap border-b border-slate-100">{product.创建人}</td>
                  <td className="px-4 py-4 text-slate-400 whitespace-nowrap text-xs border-b border-slate-100">{product.创建时间}</td>
                  <td className="px-4 py-4 text-slate-400 whitespace-nowrap text-xs border-b border-slate-100">{product.更新时间}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
