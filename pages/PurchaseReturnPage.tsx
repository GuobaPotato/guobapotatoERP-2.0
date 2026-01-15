
import React, { useState, useMemo } from 'react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { DocumentCheckIcon } from '../components/icons/DocumentCheckIcon';
import { PURCHASE_RETURN_DATA, PURCHASE_RETURN_HEADERS } from '../constants';
import { AddPurchaseReturnModal } from '../components/purchase/AddPurchaseReturnModal';

export const PurchaseReturnPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(PURCHASE_RETURN_DATA.map(d => d.id)));
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

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

  const totalReturnAmount = useMemo(() => {
    return PURCHASE_RETURN_DATA.reduce((sum, item) => sum + item.退货金额, 0);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '未发起': return 'bg-slate-100 text-slate-500 border-slate-200';
      case '审批中': return 'bg-blue-50 text-blue-600 border-blue-100';
      case '已通过': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case '未回款': return 'bg-rose-50 text-rose-600 border-rose-100';
      case '未出库': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 顶部标题栏 & 标签页 */}
      <div className="bg-white border-b border-slate-200 px-6 pt-4 flex flex-col shadow-sm sticky top-0 z-40">
        <div className="flex justify-between items-center mb-4">
          <nav className="flex space-x-8">
            {["全部", "我负责的", "下属负责的"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap pb-3 px-1 border-b-2 font-black text-sm transition-all
                  ${activeTab === tab 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300'}
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3">
             <button 
                onClick={() => alert(`批量审批 ${selectedIds.size} 项项目`)}
                disabled={selectedIds.size === 0}
                className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-black transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                <DocumentCheckIcon className="h-4 w-4 mr-1.5" />
                审批
              </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
              >
                <PlusIcon className="h-4 w-4 mr-1.5" />
                添加退货
              </button>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-6 flex flex-col flex-1 min-h-0">
        {/* 筛选区域 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap items-center gap-4">
          <div className="w-full md:w-48 relative">
            <select className={`${inputClass} appearance-none pr-10 font-bold text-slate-700`}>
              <option value="">请选择负责人</option>
              <option value="1">王朔</option>
              <option value="2">李采购</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div className="w-full md:w-72 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <SearchIcon className="h-4 w-4" />
            </div>
            <input 
              type="text" 
              className={`${inputClass} pl-10`} 
              placeholder="搜索标题、编号" 
            />
          </div>

          <div className="w-full md:w-40 relative">
            <select className={`${inputClass} appearance-none pr-10 font-bold text-slate-700`}>
              <option value="">状态筛选</option>
              <option value="1">未发起</option>
              <option value="2">审批中</option>
              <option value="3">已通过</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* 表格区域 */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col flex-1">
          <div className="overflow-x-auto custom-scrollbar flex-1">
            <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  <th className="px-4 py-4 text-center border-b border-slate-200 bg-slate-50 sticky left-0 z-30 w-[50px]">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                      checked={PURCHASE_RETURN_DATA.length > 0 && selectedIds.size === PURCHASE_RETURN_DATA.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {PURCHASE_RETURN_HEADERS.slice(1).map((header, idx) => (
                    <th 
                      key={header} 
                      className={`
                        px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50
                        ${idx === 0 ? 'sticky left-[50px] z-30 shadow-[2px_0_5px_rgba(0,0,0,0.05)] border-r' : ''}
                      `}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-50">
                {PURCHASE_RETURN_DATA.map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 text-center border-b border-slate-50 sticky left-0 bg-inherit z-10">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer" 
                        checked={selectedIds.has(row.id)}
                        onChange={() => handleSelectOne(row.id)}
                      />
                    </td>
                    <td className="px-4 py-4 font-bold text-blue-600 hover:underline cursor-pointer border-b border-slate-50 sticky left-[50px] bg-inherit z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)] border-r whitespace-nowrap">
                      {row.标题}
                    </td>
                    <td className="px-4 py-4 font-mono text-slate-500 border-b border-slate-50 whitespace-nowrap">{row.编号}</td>
                    <td className="px-4 py-4 text-slate-600 border-b border-slate-50 whitespace-nowrap">{row.采购单}</td>
                    <td className="px-4 py-4 text-right font-mono font-black text-slate-800 border-b border-slate-50">
                      {row.退货金额.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 border-b border-slate-50">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase ${getStatusColor(row.审核状态)}`}>
                        {row.审核状态}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-b border-slate-50">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase ${getStatusColor(row.回款状态)}`}>
                        {row.回款状态}
                      </span>
                    </td>
                    <td className="px-4 py-4 border-b border-slate-50">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase ${getStatusColor(row.出库状态)}`}>
                        {row.出库状态}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600 border-b border-slate-50">{row.退换货}</td>
                    <td className="px-4 py-4 text-slate-500 font-mono border-b border-slate-50">{row.退货时间}</td>
                    <td className="px-4 py-4 border-b border-slate-50">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px] mr-2">
                          {row.负责人.charAt(0)}
                        </div>
                        <span className="text-slate-700 font-bold">{row.负责人}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-400 border-b border-slate-50 italic text-[11px]">{row.创建时间}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 底部信息区域 */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
              <span>共 <span className="text-slate-800">{PURCHASE_RETURN_DATA.length}</span> 条</span>
              <div className="h-3 w-px bg-slate-300"></div>
              <span>20 条/页</span>
            </div>

            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase">
              <span>页码：<span className="text-blue-600 font-black">1</span></span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[11px] font-black uppercase tracking-wider text-slate-500">
              <div className="flex items-center space-x-2">
                <span>应退款金额(元):</span>
                <span className="text-sm text-slate-800 font-mono font-black">{totalReturnAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>已退款(元):</span>
                <span className="text-sm text-emerald-600 font-mono font-black">0.00</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>未退款(元):</span>
                <span className="text-sm text-rose-600 font-mono font-black">{totalReturnAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AddPurchaseReturnModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
