
import React, { useState } from 'react';
import { QualityCheckRecord, CheckStatus, CheckType } from '../../types';
import { EyeIcon } from '../icons/EyeIcon';
import { PencilSquareIcon } from '../icons/PencilSquareIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { PrinterIcon } from '../icons/PrinterIcon';

interface QualityTableProps {
  data: QualityCheckRecord[];
  onResultInputClick?: (record: QualityCheckRecord) => void;
  onQCIDClick?: (qcCode: string) => void;
}

const statusTagMap: Record<CheckStatus, { label: string; color: string }> = {
  pending: { label: '待质检', color: 'bg-slate-100 text-slate-600 border-slate-200' },
  checking: { label: '质检中', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  approved: { label: '已通过', color: 'bg-green-100 text-green-700 border-green-200' },
  rejected: { label: '已驳回', color: 'bg-red-100 text-red-700 border-red-200' },
  invalid: { label: '已作废', color: 'bg-black text-white border-black' },
};

const typeTagMap: Record<CheckType, { label: string; color: string }> = {
  incoming_material: { label: '来料', color: 'text-blue-600 bg-blue-50 border-blue-100' },
  process: { label: '制程', color: 'text-purple-600 bg-purple-50 border-purple-100' },
  finished_product: { label: '成品', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  delivery: { label: '出货', color: 'text-orange-600 bg-orange-50 border-orange-100' },
};

export const QualityTable: React.FC<QualityTableProps> = ({ data, onResultInputClick, onQCIDClick }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(new Set(data.map(d => d.id)));
    else setSelectedIds(new Set());
  };

  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="relative">
      <table className="min-w-full divide-y divide-slate-200 text-sm border-separate border-spacing-0">
        <thead className="bg-slate-50 sticky top-0 z-30">
          <tr>
            <th className="sticky left-0 z-40 bg-slate-50 px-4 py-4 border-b border-slate-200 w-[60px] min-w-[60px] max-w-[60px] whitespace-nowrap">
              <input 
                type="checkbox" 
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                checked={data.length > 0 && selectedIds.size === data.length}
                onChange={handleSelectAll}
              />
            </th>
            <th className="sticky left-[60px] z-40 bg-slate-50 px-4 py-4 text-left font-bold text-slate-700 border-b border-slate-200 border-r border-slate-100 w-[200px] min-w-[200px] shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] whitespace-nowrap">
              质检单号
            </th>
            <th className="px-6 py-4 text-left font-bold text-slate-700 border-b border-slate-200 min-w-[120px] whitespace-nowrap">
              类型
            </th>
            <th className="px-4 py-4 text-left font-bold text-slate-700 border-b border-slate-200 min-w-[400px] whitespace-nowrap">产品信息</th>
            <th className="px-4 py-4 text-right font-bold text-slate-700 border-b border-slate-200 min-w-[120px] whitespace-nowrap">检验数量</th>
            <th className="px-4 py-4 text-right font-bold text-slate-700 border-b border-slate-200 min-w-[120px] whitespace-nowrap">不合格数</th>
            <th className="px-4 py-4 text-left font-bold text-slate-700 border-b border-slate-200 min-w-[120px] whitespace-nowrap">状态</th>
            <th className="px-4 py-4 text-left font-bold text-slate-700 border-b border-slate-200 min-w-[120px] whitespace-nowrap">质检员</th>
            <th className="px-4 py-4 text-left font-bold text-slate-700 border-b border-slate-200 min-w-[200px] whitespace-nowrap">质检时间</th>
            <th className="px-4 py-4 text-left font-bold text-slate-700 border-b border-slate-200 min-w-[200px] whitespace-nowrap">关联单据</th>
            <th className="sticky right-0 z-30 bg-slate-50 px-4 py-4 text-center font-bold text-slate-700 border-b border-slate-200 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] min-w-[240px] whitespace-nowrap">
              操作
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100">
          {data.map((row, idx) => {
            const status = statusTagMap[row.check_status];
            const type = typeTagMap[row.check_type];
            const isSelected = selectedIds.has(row.id);
            const canSubmit = row.check_status === 'pending' || row.check_status === 'checking';

            return (
              <tr key={row.id} className={`group hover:bg-blue-50/40 transition-colors ${isSelected ? 'bg-blue-50/60' : ''}`}>
                <td className={`sticky left-0 z-10 px-4 py-4 border-b border-slate-100 w-[60px] min-w-[60px] max-w-[60px] whitespace-nowrap ${isSelected ? 'bg-blue-50/0' : 'bg-white group-hover:bg-transparent'}`}>
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    checked={isSelected}
                    onChange={() => handleSelectOne(row.id)}
                  />
                </td>
                <td 
                  onClick={() => onQCIDClick?.(row.check_order_no)}
                  className={`sticky left-[60px] z-10 px-4 py-4 border-b border-slate-100 border-r border-slate-100 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] font-medium text-blue-600 cursor-pointer hover:underline w-[200px] min-w-[200px] whitespace-nowrap ${isSelected ? 'bg-blue-50/0' : 'bg-white group-hover:bg-transparent'}`}
                >
                  {row.check_order_no}
                </td>
                <td className="px-6 py-4 border-b border-slate-100 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded border text-xs font-medium ${type.color}`}>
                    {type.label}
                  </span>
                </td>
                <td className="px-4 py-4 border-b border-slate-100 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-800">{row.product_model}</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-600">{row.product_name}</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-xs text-slate-500">批次: {row.batch_no}</span>
                  </div>
                </td>
                <td className="px-4 py-4 border-b border-slate-100 text-right text-slate-700 font-mono whitespace-nowrap">
                  {row.check_quantity}
                </td>
                <td className={`px-4 py-4 border-b border-slate-100 text-right font-mono whitespace-nowrap ${row.unqualified_quantity > 0 ? 'text-red-600 font-bold' : 'text-slate-500'}`}>
                  {row.unqualified_quantity}
                </td>
                <td className="px-4 py-4 border-b border-slate-100 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase ${status.color}`}>
                    {status.label}
                  </span>
                </td>
                <td className="px-4 py-4 border-b border-slate-100 text-slate-600 whitespace-nowrap">{row.checker_name}</td>
                <td className="px-4 py-4 border-b border-slate-100 text-slate-400 text-xs whitespace-nowrap">{row.check_time}</td>
                <td className="px-4 py-4 border-b border-slate-100 text-slate-500 text-xs underline cursor-pointer hover:text-blue-600 whitespace-nowrap">{row.related_order_no}</td>
                <td className={`sticky right-0 z-10 px-4 py-4 border-b border-slate-100 text-center shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] whitespace-nowrap ${isSelected ? 'bg-blue-50/0' : 'bg-white group-hover:bg-transparent'}`}>
                  <div className="flex justify-center items-center space-x-3">
                    <button title="详情" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    
                    {canSubmit && (
                      <button 
                        onClick={() => onResultInputClick?.(row)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-md hover:bg-blue-700 shadow-sm transition-all flex items-center"
                      >
                        <PencilSquareIcon className="h-3.5 w-3.5 mr-1" />
                        提交质检
                      </button>
                    )}

                    {row.check_status !== 'invalid' && (
                      <button title="作废" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    )}
                    
                    <button title="打印报告" className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors">
                      <PrinterIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
