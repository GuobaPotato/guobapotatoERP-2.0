
import React, { useState, useMemo } from 'react';
import { PurchaseOrder } from '../../types';

interface PurchaseTableProps {
  data: PurchaseOrder[];
  headers: string[];
  onGoToOrder?: (item: PurchaseOrder) => void;
  onNameClick?: (purchaseNo: string) => void;
}

const statusColorMap: Record<string, string> = {
  "审批中": "bg-blue-100 text-blue-800",
  "通过": "bg-green-100 text-green-800",
  "未发起": "bg-slate-100 text-slate-800",
  "已拒绝": "bg-red-100 text-red-800",
};

export const PurchaseTable: React.FC<PurchaseTableProps> = ({ data, headers, onGoToOrder, onNameClick }) => {
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
        const allIds = new Set(data.map(d => d.采购单编号));
        setSelected(allIds);
        } else {
        setSelected(new Set());
        }
    };

    const handleSelectOne = (id: string) => {
        const newSelection = new Set(selected);
        if (newSelection.has(id)) {
        newSelection.delete(id);
        } else {
        newSelection.add(id);
        }
        setSelected(newSelection);
    };

    const isAllSelected = useMemo(() => {
        return data.length > 0 && selected.size === data.length;
    }, [selected, data]);
    
    const isIndeterminate = useMemo(() => {
        return selected.size > 0 && selected.size < data.length;
    }, [selected, data]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th scope="col" className="sticky left-0 z-20 bg-slate-100 px-4 py-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                checked={isAllSelected}
                ref={input => {
                    if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={handleSelectAll}
              />
            </th>
            {headers.map((header, index) => (
              <th
                key={header}
                scope="col"
                className={`
                  py-3.5 px-4 text-left font-semibold text-slate-600 whitespace-nowrap
                  ${index === 0 ? 'sticky left-12 z-20 bg-slate-100 min-w-[200px] border-r border-slate-200' : ''}
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
              key={item.采购单编号} 
              className={`transition-colors duration-150 ${itemIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}
            >
              <td className={`sticky left-0 z-10 px-4 py-4 whitespace-nowrap transition-colors duration-150 ${itemIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  checked={selected.has(item.采购单编号)}
                  onChange={() => handleSelectOne(item.采购单编号)}
                />
              </td>
              <td 
                className={`sticky left-12 z-10 px-4 py-4 font-medium text-blue-700 hover:text-blue-800 hover:underline whitespace-nowrap min-w-[200px] border-r border-slate-200 transition-colors duration-150 cursor-pointer ${itemIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}
                onClick={() => onNameClick?.(item.采购单编号)}
              >
                {item.采购名称}
              </td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
                  item.来源 === '生产工单' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                }`}>
                  {item.来源}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {item.订单状态 === '去下单' ? (
                  <button 
                    onClick={() => onGoToOrder?.(item)}
                    className="px-3 py-1 bg-blue-600 text-white text-[11px] font-bold rounded shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    去下单
                  </button>
                ) : (
                  <div className="flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-slate-600 font-medium">已下单</span>
                  </div>
                )}
              </td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{item.供应商}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{item.采购时间}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{item["采购金额(元)"].toFixed(2)}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{item["产品总金额(元)"].toFixed(2)}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{item["其他金额(元)"].toFixed(2)}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{item.采购单编号}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{item.付款状态}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{item.入库状态}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColorMap[item.审核状态] || 'bg-slate-100 text-slate-800'}`}>
                  {item.审核状态}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
