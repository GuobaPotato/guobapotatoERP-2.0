
import React, { useState } from 'react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { FREIGHT_FORWARDER_DATA, FREIGHT_FORWARDER_HEADERS } from '../constants';
import { Pagination } from '../components/Pagination';
import { AddCarrierModal } from '../components/carrier/AddCarrierModal';

export const CarrierManagementPage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(FREIGHT_FORWARDER_DATA.map(d => d.id)));
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

  const inputClass = "block w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full">
      {/* 顶部标题与操作区 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between shadow-sm sticky top-0 z-30">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">承运商管理</h1>
          <p className="text-xs text-slate-400 mt-0.5">维护与管理企业合作的承运商、物流公司及国际货运代理商档案</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4 lg:mt-0">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            <PlusIcon className="h-4 w-4 mr-1.5" />
            新增
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowPathIcon className="h-4 w-4 mr-1.5" />
            刷新
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            批量提交
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            ArrowDownTrayIcon
            <ArrowDownTrayIcon className="h-4 w-4 mr-1.5" />
            批量下载
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            更多
            <ChevronDownIcon className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-8 flex-1 flex flex-col min-h-0 space-y-6">
        {/* 快捷搜索 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
           <div className="max-w-md relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-slate-300" />
              </div>
              <input type="text" className={`${inputClass} pl-10 h-10`} placeholder="搜索承运商名称、简称或编号..." />
           </div>
        </div>

        {/* 数据表格区 */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full">
          <div className="overflow-x-auto no-scrollbar">
            <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  <th className="px-4 py-4 pl-6 text-left border-b border-slate-200 bg-slate-50 sticky left-0 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                    <input 
                      type="checkbox" 
                      className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600"
                      checked={FREIGHT_FORWARDER_DATA.length > 0 && selectedIds.size === FREIGHT_FORWARDER_DATA.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {FREIGHT_FORWARDER_HEADERS.slice(1).map((h) => (
                    <th 
                      key={h} 
                      className={`
                        px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50
                        ${h === '操作' ? 'sticky right-0 z-30 bg-slate-50 shadow-[-2px_0_5px_rgba(0,0,0,0.03)] text-center' : ''}
                      `}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {FREIGHT_FORWARDER_DATA.map((item) => {
                  const isSelected = selectedIds.has(item.id);
                  return (
                    <tr key={item.id} className={`hover:bg-blue-50/30 transition-colors group ${isSelected ? 'bg-blue-50/50' : ''}`}>
                      <td className="px-4 py-4 pl-6 border-b border-slate-50 sticky left-0 z-10 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                        <input 
                          type="checkbox" 
                          className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600" 
                          checked={isSelected}
                          onChange={() => handleSelectOne(item.id)}
                        />
                      </td>
                      <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50">{item.rowNo}</td>
                      <td className="px-4 py-4 font-bold text-blue-600 border-b border-slate-50 font-mono tracking-tight">{item.code}</td>
                      <td className="px-4 py-4 text-slate-800 font-semibold border-b border-slate-50">{item.shortName}</td>
                      <td className="px-4 py-4 text-slate-700 font-medium border-b border-slate-50 whitespace-nowrap">{item.fullName}</td>
                      <td className="px-4 py-4 text-slate-500 border-b border-slate-50 max-w-xs truncate" title={item.address}>{item.address || '--'}</td>
                      <td className="px-4 py-4 text-slate-600 font-mono border-b border-slate-50">{item.phone || '--'}</td>
                      <td className="px-4 py-4 border-b border-slate-50 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 mr-2 border border-white shadow-sm font-bold uppercase">{item.creator.charAt(0)}</div>
                          {item.creator}
                        </div>
                      </td>
                      <td className={`px-4 py-4 pr-6 border-b border-slate-50 whitespace-nowrap text-center sticky right-0 z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.03)] ${isSelected ? 'bg-[#f5f8ff]' : 'bg-white group-hover:bg-slate-50'}`}>
                        <div className="flex items-center justify-center space-x-3">
                          <button className="text-[10px] font-black text-blue-600 hover:text-blue-800 transition-colors uppercase">编辑</button>
                          <span className="text-slate-200">|</span>
                          <button className="text-[10px] font-black text-rose-600 hover:text-rose-800 transition-colors uppercase">删除</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
             <Pagination dataSource={FREIGHT_FORWARDER_DATA} />
          </div>
        </div>
      </div>

      <AddCarrierModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
