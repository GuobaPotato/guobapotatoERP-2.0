
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { PrinterIcon } from '../components/icons/PrinterIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { EXPORT_CONTRACT_DATA, EXPORT_CONTRACT_HEADERS } from '../constants';
import { Pagination } from '../components/Pagination';
import { AddExportContractModal } from '../components/export/AddExportContractModal';

export const ExportContractPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full">
      {/* 顶部操作区 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-30">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center">
          外销合同管理
        </h1>
        <div className="flex space-x-2">
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
            <PrinterIcon className="h-4 w-4 mr-1.5" />
            批量打印
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowDownTrayIcon className="h-4 w-4 mr-1.5" />
            批量下载
          </button>
          <button className="px-3 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 shadow-sm">
            更多
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-8 flex-1 flex flex-col min-h-0 space-y-6">
        {/* 筛选面板 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <label className={labelClass}>订单类型</label>
              <select className={inputClass}>
                <option value="">请选择订单类型</option>
                <option value="bulk">大货</option>
                <option value="sample">样品</option>
                <option value="return_exchange">退换</option>
                <option value="accessory">配件</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className={labelClass}>合同日期</label>
              <div className="flex items-center space-x-2">
                <input type="date" className={inputClass} placeholder="起始日期" />
                <span className="text-slate-300">至</span>
                <input type="date" className={inputClass} placeholder="截止日期" />
              </div>
            </div>
            <div>
              <label className={labelClass}>归档状态</label>
              <select className={inputClass}>
                <option value="all">全部</option>
                <option value="archived">已归档</option>
                <option value="unarchived">未归档</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>全局检索</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-slate-300" />
                </div>
                <input type="text" className={`${inputClass} pl-10`} placeholder="搜索合同号/客户..." />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-3">
             <button className="px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 transition-all shadow-md">查找</button>
             <button className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all">重置</button>
          </div>
        </div>

        {/* 表格面板 */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full">
          <div className="overflow-x-auto no-scrollbar">
            <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  <th className="px-4 py-4 pl-6 text-left border-b border-slate-200 bg-slate-50 sticky left-0 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                    <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600" />
                  </th>
                  {EXPORT_CONTRACT_HEADERS.map((h, i) => (
                    <th 
                      key={h} 
                      className={`
                        px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50
                        ${i === 0 ? 'sticky left-[48px] z-30 shadow-[2px_0_5px_rgba(0,0,0,0.05)]' : ''}
                        ${i === 2 ? 'sticky left-[108px] z-30 shadow-[2px_0_5px_rgba(0,0,0,0.05)]' : ''}
                      `}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {EXPORT_CONTRACT_DATA.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 pl-6 border-b border-slate-50 sticky left-0 z-10 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                      <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600" />
                    </td>
                    <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50 sticky left-[48px] z-10 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)]">{item.rowNo}</td>
                    <td className="px-4 py-4 border-b border-slate-50 font-medium">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.orderType === '大货' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                        {item.orderType}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-blue-600 hover:underline cursor-pointer whitespace-nowrap border-b border-slate-50 sticky left-[108px] z-10 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
                      {item.contractNo}
                    </td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap border-b border-slate-50">{item.contractDate}</td>
                    <td className="px-4 py-4 text-slate-400 italic border-b border-slate-50">{item.customerOrderNo || '--'}</td>
                    <td className="px-4 py-4 text-slate-700 font-medium whitespace-nowrap border-b border-slate-50">{item.ourName}</td>
                    <td className="px-4 py-4 text-slate-700 whitespace-nowrap border-b border-slate-50">{item.customerName}</td>
                    <td className="px-4 py-4 text-slate-500 whitespace-nowrap border-b border-slate-50">{item.tradingParty}</td>
                    <td className="px-4 py-4 text-slate-800 font-black border-b border-slate-50">{item.currency}</td>
                    <td className="px-4 py-4 text-slate-500 whitespace-nowrap border-b border-slate-50 font-mono">{item.deliveryDate}</td>
                    <td className="px-4 py-4 text-slate-400 border-b border-slate-50">{item.creatorCode}</td>
                    <td className="px-4 py-4 text-slate-600 border-b border-slate-50">{item.creatorName}</td>
                    <td className="px-4 py-4 text-right font-black border-b border-slate-50 text-slate-800">
                      {item.salesAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4 text-right font-bold border-b border-slate-50 text-indigo-600">
                      {item.totalQuantity}
                    </td>
                    <td className="px-4 py-4 pr-6 border-b border-slate-50 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="text-[10px] font-black text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors uppercase">编辑</button>
                        <span className="text-slate-200">|</span>
                        <button className="text-[10px] font-black text-rose-600 hover:bg-rose-50 px-2 py-1 rounded transition-colors uppercase">删除</button>
                        <span className="text-slate-200">|</span>
                        <button className="text-[10px] font-black text-slate-500 hover:bg-slate-100 px-2 py-1 rounded transition-colors uppercase">查看</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
             <Pagination dataSource={EXPORT_CONTRACT_DATA} />
          </div>
        </div>
      </div>
      
      {/* 新增合同弹窗 */}
      <AddExportContractModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
