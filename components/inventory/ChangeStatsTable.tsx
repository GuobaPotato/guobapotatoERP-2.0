
import React from 'react';
import { StockChange } from '../../types';

interface ChangeStatsTableProps {
  data: StockChange[];
  headers: string[];
}

export const ChangeStatsTable: React.FC<ChangeStatsTableProps> = ({ data, headers }) => {
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
              {/* 根据 Headers 渲染数据，排除所属仓库 */}
              {headers.slice(1).map((header) => {
                  let value: string | number = "0";
                  switch(header) {
                      case "采购入库": value = item.采购入库; break;
                      case "生产入库": value = item.生产入库; break;
                      case "销售退货": value = item.销售退货; break;
                      case "销售出库": value = item.销售出库; break;
                      case "生产出库": value = item.生产出库; break;
                      case "采购退货": value = item.采购退货; break;
                      case "盘点入库": value = item.盘点入库; break;
                      case "盘点出库": value = item.盘点出库; break;
                      case "初始库存": value = item.初始库存; break;
                      case "剩余": value = item.剩余; break;
                  }
                  return <td key={header} className="px-4 py-4 text-slate-600 whitespace-nowrap text-center">{value}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
