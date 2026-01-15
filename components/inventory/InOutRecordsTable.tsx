
import React from 'react';
import { InOutRecord } from '../../types';

interface InOutRecordsTableProps {
  data: InOutRecord[];
  headers: string[];
}

export const InOutRecordsTable: React.FC<InOutRecordsTableProps> = ({ data, headers }) => {
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
              {/* 映射 headers 来确保数据列对齐，避开所属仓库字段 */}
              {headers.slice(1).map((header) => {
                let value: string | number = "";
                switch(header) {
                    case "规格": value = item.规格; break;
                    case "单位": value = item.单位; break;
                    case "所在位置": value = item.所在位置; break;
                    case "类别": value = item.类别; break;
                    case "状态": value = item.状态; break;
                    case "数量": value = item.数量; break;
                    case "出入库类别": value = item.出入库类别; break;
                    case "出入库订单": value = item.出入库订单; break;
                    case "操作时间": value = item.操作时间; break;
                    case "备注": value = item.备注; break;
                }

                if (header === '数量') {
                  const isPositive = (value as string).startsWith('+');
                  return (
                    <td key={header} className={`px-4 py-4 whitespace-nowrap ${isPositive ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                        {value}
                    </td>
                  );
                }
                return <td key={header} className="px-4 py-4 text-slate-600 whitespace-nowrap">{value}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
