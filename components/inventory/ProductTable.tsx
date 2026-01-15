
import React from 'react';
import { ProductStock } from '../../types';
import { ExclamationTriangleIcon } from '../icons/ExclamationTriangleIcon';

interface ProductTableProps {
  data: ProductStock[];
  headers: string[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ data, headers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
        <thead className="bg-slate-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                scope="col"
                className={`
                  py-3.5 px-4 text-left font-semibold text-slate-600 whitespace-nowrap
                  ${index === 0 ? 'sticky left-0 z-10 bg-slate-100 min-w-[200px] border-r border-slate-200' : ''}
                `}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.map((item, itemIndex) => {
            const actualStock = parseInt(item.实际库存);
            const isLowStock = actualStock < 200;
            const rowBgClass = isLowStock ? 'bg-red-50' : (itemIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50');
            const hoverClass = isLowStock ? 'hover:bg-red-100/50' : 'hover:bg-blue-50';

            return (
              <tr 
                key={item.产品名称 + itemIndex} 
                className={`transition-colors duration-150 ${rowBgClass} ${hoverClass}`}
              >
                <td className={`sticky left-0 z-10 px-4 py-4 font-medium whitespace-nowrap min-w-[200px] border-r border-slate-200 transition-colors duration-150 ${rowBgClass} ${hoverClass} ${isLowStock ? 'text-red-700' : 'text-slate-800'}`}>
                  <div className="flex items-center">
                    {item.产品名称}
                    {isLowStock && (
                      <div className="relative group ml-2 inline-flex items-center">
                        <ExclamationTriangleIcon className="h-4 w-4 text-red-500 animate-pulse cursor-help" />
                        {/* 气泡提示 (Tooltip Bubble) */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-xl transform translate-y-1 group-hover:translate-y-0">
                          库存低
                          {/* 气泡箭头 (Tooltip Arrow) */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                {/* 遍历其余属性 */}
                {Object.values(item).slice(1).map((value, valueIndex) => {
                   const isStockCol = headers[valueIndex + 1] === '实际库存';
                   return (
                    <td key={valueIndex} className={`px-4 py-4 whitespace-nowrap ${isStockCol && isLowStock ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                      {value}
                    </td>
                   );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
