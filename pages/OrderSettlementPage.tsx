
import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ORDER_SETTLEMENT_DATA, ORDER_SETTLEMENT_HEADERS } from '../constants';
import { OrderSettlementItem } from '../types';

export const OrderSettlementPage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(new Set(ORDER_SETTLEMENT_DATA.map(d => d.id)));
    else setSelectedIds(new Set());
  };

  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const inputClass = "block w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 筛选区域 */}
      <div className="bg-white border-b border-slate-200 px-6 py-6 sticky top-0 z-30 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          <div>
            <label className={labelClass}>外销合同</label>
            <input type="text" className={inputClass} placeholder="搜索外销合同..." />
          </div>
          <div>
            <label className={labelClass}>客户名称</label>
            <input type="text" className={inputClass} placeholder="搜索客户名称..." />
          </div>
          <div className="lg:col-span-2 flex items-end space-x-3">
             <button className="px-8 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-all shadow-md active:scale-95 uppercase tracking-widest">查找</button>
             <button className="px-8 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all uppercase tracking-widest">重置</button>
          </div>
        </div>
      </div>

      {/* 功能操作栏 */}
      <div className="bg-slate-50 px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 z-20">
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-all shadow-sm active:scale-95 uppercase tracking-widest">
            <PlusIcon className="h-4 w-4 mr-1.5" />
            新增结算
          </button>
          <button className="flex items-center px-4 py-1.5 bg-white border border-slate-300 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm uppercase tracking-widest">
            <ArrowPathIcon className="h-4 w-4 mr-1.5" />
            刷新
          </button>
          <button className="flex items-center px-4 py-1.5 bg-white border border-slate-300 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm uppercase tracking-widest">
            批量提交
          </button>
          <button className="flex items-center px-4 py-1.5 bg-white border border-slate-300 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm uppercase tracking-widest">
            <ArrowDownTrayIcon className="h-4 w-4 mr-1.5" />
            批量下载
          </button>
          
          <div className="relative" ref={moreRef}>
            <button 
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded hover:bg-slate-50 shadow-sm text-xs font-bold uppercase tracking-widest"
            >
              更多
              <ChevronDownIcon className={`ml-1 h-3 w-3 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMoreOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden py-1 ring-1 ring-black ring-opacity-5">
                <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 transition-colors">修改负责人</button>
                <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 transition-colors">批量结案</button>
                <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 transition-colors border-t border-slate-50">删除草稿</button>
              </div>
            )}
          </div>
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Order Settlement Management</div>
      </div>

      {/* 数据表格 */}
      <div className="p-6 flex-1 flex flex-col min-h-0 bg-white">
        <div className="flex-1 rounded-2xl border border-slate-200 overflow-hidden flex flex-col bg-white shadow-sm">
          <div className="flex-1 overflow-x-auto custom-scrollbar relative">
            <table className="min-w-[4000px] divide-y divide-slate-100 text-[11px] border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20 font-black text-slate-500 uppercase tracking-tighter">
                <tr>
                  <th className="px-4 py-4 text-center border-b border-slate-200 bg-slate-50 sticky left-0 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                      checked={ORDER_SETTLEMENT_DATA.length > 0 && selectedIds.size === ORDER_SETTLEMENT_DATA.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {ORDER_SETTLEMENT_HEADERS.map((h, i) => (
                    <th 
                      key={h} 
                      className={`
                        px-4 py-4 text-left border-b border-slate-200 whitespace-nowrap bg-slate-50
                        ${i === 1 ? 'sticky left-[50px] z-30 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100' : ''}
                        ${h === '操作' ? 'sticky right-0 z-30 bg-slate-50 shadow-[-2px_0_5px_rgba(0,0,0,0.03)] text-center border-l border-slate-100' : ''}
                        ${['出运金额', '收款金额', '收款CNY金额', '未收款金额', '付款总金额', '费用总金额'].includes(h) ? 'text-right pr-8' : ''}
                      `}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                {ORDER_SETTLEMENT_DATA.map((item) => {
                  const isSelected = selectedIds.has(item.id);
                  return (
                    <tr key={item.id} className={`hover:bg-blue-50/20 transition-colors group ${isSelected ? 'bg-blue-50/40' : ''}`}>
                      <td className="px-4 py-5 text-center bg-inherit sticky left-0 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer" 
                          checked={isSelected}
                          onChange={() => handleSelectOne(item.id)}
                        />
                      </td>
                      <td className="px-4 py-5 text-slate-400 font-mono">{item.rowNo}</td>
                      <td className="px-4 py-5 font-mono font-black text-blue-600 sticky left-[50px] bg-inherit z-10 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100 cursor-pointer hover:underline">
                        {item.settlementNo}
                      </td>
                      <td className="px-4 py-5 text-slate-500 font-mono">{item.settlementDate}</td>
                      <td className="px-4 py-5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase ${item.isClosed === '是' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                          {item.isClosed}
                        </span>
                      </td>
                      <td className="px-4 py-5 font-mono text-slate-500 uppercase">{item.customerCode}</td>
                      <td className="px-4 py-5 text-slate-800 font-black">{item.customerName}</td>
                      <td className="px-4 py-5 text-slate-500">{item.loadPort}</td>
                      <td className="px-4 py-5 text-slate-700 font-bold">{item.destPort}</td>
                      <td className="px-4 py-5 text-center"><span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-bold">{item.paymentMode}</span></td>
                      <td className="px-4 py-5 text-center"><span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded font-black border border-blue-100">{item.tradeMode}</span></td>
                      <td className="px-4 py-5 text-slate-900 font-black">{item.currency}</td>
                      <td className="px-4 py-5 text-slate-400 font-mono">{item.exchangeRate}</td>
                      <td className="px-4 py-5 text-slate-600">{item.transportMode}</td>
                      <td className="px-4 py-5 text-slate-400 font-mono italic">{item.deliveryDate}</td>
                      <td className="px-4 py-5 text-right pr-8 font-black font-mono text-slate-900">¥{item.shippingAmount}</td>
                      <td className="px-4 py-5 text-right pr-8 font-mono text-emerald-600 font-bold">{item.receivedAmount || '0.00'}</td>
                      <td className="px-4 py-5 text-right pr-8 font-mono text-emerald-700 font-black">{item.receivedCNY || '0.00'}</td>
                      <td className="px-4 py-5 text-right pr-8 font-mono text-rose-500">{item.unreceivedAmount || '0.00'}</td>
                      <td className="px-4 py-5 text-right pr-8 font-mono text-slate-800 font-bold">{item.totalPayment || '0.00'}</td>
                      <td className="px-4 py-5 text-right pr-8 font-mono text-slate-400">{item.foreignFee || '0.00'}</td>
                      <td className="px-4 py-5 text-right pr-8 font-mono text-slate-400">{item.cnyFee || '0.00'}</td>
                      <td className="px-4 py-5 text-right pr-8 font-black font-mono text-indigo-600">{item.totalFee || '0.00'}</td>
                      <td className="px-4 py-5 text-slate-400 italic">--</td>
                      <td className="px-4 py-5 text-slate-400 italic">--</td>
                      <td className="px-4 py-5 text-slate-400 italic">--</td>
                      <td className="px-4 py-5 text-slate-400 italic">--</td>
                      <td className="px-4 py-5 text-slate-400 italic">--</td>
                      <td className="px-4 py-5 text-slate-400 italic">--</td>
                      <td className="px-4 py-5 text-slate-400 italic">--</td>
                      <td className="px-4 py-5 text-slate-400 italic">--</td>
                      <td className={`px-4 py-5 pr-6 bg-inherit sticky right-0 z-10 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] border-l border-slate-100 text-center`}>
                        <div className="flex justify-center items-center space-x-3">
                          <button className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">编辑</button>
                          <span className="text-slate-200">|</span>
                          <button className="text-[10px] font-black text-rose-600 hover:underline uppercase tracking-widest">删除</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 底部总计栏 */}
          <div className="bg-slate-900 text-white px-8 py-4 flex flex-wrap items-center justify-end gap-12 text-[10px] font-black uppercase tracking-widest shadow-2xl z-30">
            <div className="flex flex-col items-end">
              <span className="text-slate-400 mb-1 tracking-tighter">出运金额总计</span>
              <span className="text-lg font-mono tracking-tight text-white">¥ 2,946,300.23</span>
            </div>
            <div className="flex flex-col items-end border-l border-slate-700 pl-12">
              <span className="text-slate-400 mb-1 tracking-tighter">收款金额总计</span>
              <span className="text-lg font-mono tracking-tight text-emerald-400">¥ 5,760.00</span>
            </div>
            <div className="flex flex-col items-end border-l border-slate-700 pl-12">
              <span className="text-slate-400 mb-1 tracking-tighter">付款金额总计</span>
              <span className="text-lg font-mono tracking-tight text-indigo-400">¥ 2,880.00</span>
            </div>
            <div className="flex flex-col items-end border-l border-slate-700 pl-12">
              <span className="text-slate-400 mb-1 tracking-tighter">费用总金额总计</span>
              <span className="text-lg font-mono tracking-tight text-rose-400">¥ 3,360.00</span>
            </div>
          </div>
        </div>

        {/* 分页 */}
        <footer className="mt-4 px-2 py-4 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
           <div className="flex items-center space-x-6">
              <span>共 <span className="text-slate-800">38</span> 条记录</span>
              <span>每页 <span className="text-slate-800">20</span> 条</span>
           </div>
           <div className="flex items-center space-x-1.5">
              <button disabled className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-300 uppercase">上一页</button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-black shadow-md">1</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50 uppercase">2</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50 uppercase">下一页</button>
           </div>
        </footer>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 2px solid #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};
