
import React from 'react';
import { WarehouseStock } from '../../types';

interface WarehouseTableProps {
  data: WarehouseStock[];
  headers: string[];
}

export const WarehouseTable: React.FC<WarehouseTableProps> = ({ data, headers }) => {
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
          {data.map((item, itemIndex) => (
            <tr 
              key={item.产品名称 + itemIndex} 
              className={`transition-colors duration-150 ${itemIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}
            >
              <td className={`sticky left-0 z-10 px-4 py-4 font-medium text-slate-800 whitespace-nowrap min-w-[200px] border-r border-slate-200 transition-colors duration-150 ${itemIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}>
                {item.产品名称}
              </td>
              {Object.values(item).slice(1).map((value, valueIndex) => (
                 <td key={valueIndex} className="px-4 py-4 text-slate-600 whitespace-nowrap">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
