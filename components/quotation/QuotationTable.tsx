
import React from 'react';
import { Quotation } from '../../types';
import { QUOTATION_HEADERS } from '../../constants';

interface QuotationTableProps {
  data: Quotation[];
}

export const QuotationTable: React.FC<QuotationTableProps> = ({ data }) => {
  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 overflow-auto no-scrollbar">
        <table className="min-w-full divide-y divide-slate-200 text-sm border-separate border-spacing-0">
          <thead className="bg-slate-50 sticky top-0 z-30">
            <tr>
              {QUOTATION_HEADERS.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={`
                    py-4 px-4 text-left font-black text-slate-600 whitespace-nowrap border-b border-slate-200
                    ${index === 0 ? 'sticky left-0 z-40 bg-slate-50 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-r border-slate-200' : ''}
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
                <td colSpan={QUOTATION_HEADERS.length} className="px-6 py-20 text-center text-slate-400 italic">
                  暂无数据
                </td>
              </tr>
            ) : (
              data.map((item, pIndex) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-blue-50/40 transition-colors group"
                >
                  {/* 报价名称 - 吸附在最左侧 */}
                  <td className="sticky left-0 z-20 px-4 py-4 font-bold text-blue-600 whitespace-nowrap bg-white group-hover:bg-[#f5f8ff] border-b border-slate-100 border-r border-slate-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] cursor-pointer hover:underline">
                    {item.报价名称}
                  </td>
                  <td className="px-4 py-4 text-slate-500 font-mono border-b border-slate-100">{item.报价单编号}</td>
                  <td className="px-4 py-4 text-slate-700 font-semibold border-b border-slate-100">{item.来源客户}</td>
                  <td className="px-4 py-4 text-slate-900 font-black font-mono border-b border-slate-100">¥{item["报价金额(元)"].toFixed(2)}</td>
                  <td className="px-4 py-4 text-slate-600 font-mono border-b border-slate-100">¥{item["产品总金额(元)"].toFixed(2)}</td>
                  <td className="px-4 py-4 text-slate-700 border-b border-slate-100">{item.联系人}</td>
                  <td className="px-4 py-4 text-slate-600 font-mono border-b border-slate-100">{item.联系人手机}</td>
                  <td className="px-4 py-4 text-blue-500 italic border-b border-slate-100">{item.联系人邮箱}</td>
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200">
                      {item.状态}
                    </span>
                  </td>
                  <td className="px-4 py-4 border-b border-slate-100">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.审核状态 === '未发起' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                      {item.审核状态}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-bold text-slate-700 border-b border-slate-100">{item.负责人}</td>
                  <td className="px-4 py-4 text-slate-500 border-b border-slate-100">{item.负责人部门}</td>
                  <td className="px-4 py-4 text-slate-500 border-b border-slate-100">{item.创建人}</td>
                  <td className="px-4 py-4 text-slate-400 text-xs border-b border-slate-100">{item.创建时间}</td>
                  <td className="px-4 py-4 text-slate-400 text-xs border-b border-slate-100">{item.更新时间}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
