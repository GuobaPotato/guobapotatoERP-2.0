
import React from 'react';
import { StockOutOrder } from '../../types';
import { STOCK_OUT_ORDER_HEADERS } from '../../constants';

interface StockOutTableProps {
  data: StockOutOrder[];
}

export const StockOutTable: React.FC<StockOutTableProps> = ({ data }) => {
  return (
    <div className="min-w-full inline-block align-middle overflow-x-auto no-scrollbar">
      <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
        <thead className="bg-slate-50 sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-4 py-3 text-left">
               <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            </th>
            {STOCK_OUT_ORDER_HEADERS.map((header) => (
              <th
                key={header}
                scope="col"
                className="py-3.5 px-4 text-left font-semibold text-slate-600 whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={STOCK_OUT_ORDER_HEADERS.length + 1} className="px-4 py-12 text-center text-slate-500 bg-white">
                暂无数据
              </td>
            </tr>
          ) : (
            data.map((order, index) => (
              <tr 
                key={order.orderCode} 
                className={`transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50/50`}
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                </td>
                <td className="px-4 py-4 font-medium text-blue-600 whitespace-nowrap hover:underline cursor-pointer">
                  {order.orderCode}
                </td>
                <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                  {order.所属位置}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    order.source === '销售出库' ? 'bg-orange-50 text-orange-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {order.source}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-700 font-medium whitespace-nowrap">
                  {order.sourceName}
                </td>
                <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                  {order.handler}
                </td>
                <td className="px-4 py-4 text-slate-500 whitespace-nowrap">
                  {order.stockOutTime}
                </td>
                <td className="px-4 py-4 text-slate-500 truncate max-w-xs" title={order.remark}>
                  {order.remark}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
