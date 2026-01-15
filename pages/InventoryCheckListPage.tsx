
import React, { useState } from 'react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { INVENTORY_CHECK_LIST_DATA } from '../constants';
import { Pagination } from '../components/Pagination';
import { AddInventoryCheckModal } from '../components/inventory-check/AddInventoryCheckModal';

const statusColorMap: Record<string, string> = {
  "未发起": "bg-slate-100 text-slate-600 border-slate-200",
  "已发起": "bg-blue-100 text-blue-700 border-blue-200",
  "盘点中": "bg-amber-100 text-amber-700 border-amber-200",
  "待审核": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "已完成": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "已审核": "bg-green-100 text-green-700 border-green-200",
};

export const InventoryCheckListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-sm";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full">
      {/* 顶部标题栏 */}
      <div className="bg-white border-b border-slate-200 px-6 pt-4 flex flex-col shadow-sm sticky top-0 z-20">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">库存盘点</h1>
            <div className="flex items-center space-x-3">
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg font-bold text-sm active:scale-95"
                >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    添加盘点
                </button>
                <button className="flex items-center justify-center bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 focus:outline-none transition-colors duration-200 shadow-sm text-sm font-medium">
                    操作
                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                </button>
            </div>
        </div>
        
        {/* 标签页 */}
        <div className="border-b border-slate-100">
            <nav className="-mb-px flex space-x-8">
                {["全部", "我发起的", "待我审核", "已审核"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            whitespace-nowrap pb-3 px-1 border-b-2 font-bold text-sm transition-all
                            ${activeTab === tab 
                                ? 'border-blue-600 text-blue-600' 
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
      </div>

      <div className="p-6 lg:p-8 flex-1 flex flex-col min-h-0">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-full">
          
          {/* 筛选区域 */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/30">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">盘点负责人</label>
                <select className={inputClass} defaultValue="">
                  <option value="">请选择负责人</option>
                  <option value="王经理">王经理</option>
                  <option value="李仓管">李仓管</option>
                  <option value="张库管">张库管</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">状态</label>
                <select className={inputClass} defaultValue="">
                  <option value="">全部状态</option>
                  <option value="未发起">未发起</option>
                  <option value="盘点中">盘点中</option>
                  <option value="待审核">待审核</option>
                  <option value="已审核">已审核</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">快捷搜索</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-slate-300" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="输入标题搜索..."
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 表格区域 */}
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="min-w-full divide-y divide-slate-100 text-sm border-separate border-spacing-0">
              <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  <th className="px-4 py-4 pl-6 text-left border-b border-slate-200">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  </th>
                  <th className="px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap">标题</th>
                  <th className="px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap">所在位置</th>
                  <th className="px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap">审核状态</th>
                  <th className="px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap">盘点时间</th>
                  <th className="px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap">盘点负责人</th>
                  <th className="px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap">创建时间</th>
                  <th className="px-4 py-4 pr-6 text-center font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {INVENTORY_CHECK_LIST_DATA.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 pl-6 border-b border-slate-50">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-800 border-b border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-blue-600 cursor-pointer hover:underline">{item.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">No. CK-2026-{idx + 100}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600 font-mono text-xs border-b border-slate-50">{item.location}</td>
                    <td className="px-4 py-4 whitespace-nowrap border-b border-slate-50">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase ${statusColorMap[item.auditStatus]}`}>
                        {item.auditStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 text-xs border-b border-slate-50 font-medium">{item.checkTime}</td>
                    <td className="px-4 py-4 text-slate-700 font-semibold border-b border-slate-50">
                       <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500 mr-2 border border-white shadow-sm">{item.checkResponsible.charAt(0)}</div>
                          {item.checkResponsible}
                       </div>
                    </td>
                    <td className="px-4 py-4 text-slate-400 text-[10px] border-b border-slate-50 italic">{item.createTime}</td>
                    <td className="px-4 py-4 pr-6 border-b border-slate-50">
                      <div className="flex justify-center space-x-2">
                        <button className="text-[10px] font-black text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors uppercase">详情</button>
                        <button className="text-[10px] font-black text-slate-400 hover:text-red-500 px-2 py-1 rounded transition-colors uppercase">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页区域 */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
             <Pagination dataSource={INVENTORY_CHECK_LIST_DATA} />
          </div>
        </div>
      </div>

      {/* 添加盘点弹窗 */}
      <AddInventoryCheckModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
};
