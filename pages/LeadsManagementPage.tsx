
import React, { useState } from 'react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { LEADS_DATA, TABLE_HEADERS } from '../constants';
import { AddLeadModal } from '../components/AddLeadModal';
import { LeadManagementDetailModal } from '../components/crm/LeadManagementDetailModal';
import { Lead } from '../types';

const TABS = ["全部", "我负责的", "下属负责的", "今日待跟进", "今日已联系", "从未跟进"];

export const LeadsManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  
  // 详情弹窗状态
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(LEADS_DATA.map(d => d.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const openDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailModalOpen(true);
  };

  const filterInputClass = "block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1";

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 font-sans overflow-hidden">
      {/* 1. 顶部区域 */}
      <header className="bg-white border-b border-slate-200 px-6 pt-4 flex-shrink-0 z-50 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">线索管理</h1>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-bold text-sm transition-all shadow-md active:scale-95"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              添加线索
            </button>
            <button className="flex items-center justify-center bg-white text-slate-700 px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-bold text-sm transition-all shadow-sm active:scale-95">
              <ArrowDownTrayIcon className="mr-2 h-4 w-4 text-slate-500" />
              导出
            </button>
          </div>
        </div>
        
        {/* 左侧标签栏 */}
        <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap pb-3 px-1 border-b-2 font-bold text-xs uppercase tracking-widest transition-all
                ${activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* 2. 搜索筛选区域 */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end flex-shrink-0 z-40">
        <div className="space-y-1">
          <label className={labelClass}>地区筛选</label>
          <div className="relative group">
            <select className={`${filterInputClass} appearance-none pr-8 cursor-pointer`}>
              <option value="">全部地区</option>
              <option value="china">中国</option>
              <option value="overseas">海外</option>
            </select>
            <ChevronDownIcon className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1 lg:col-span-1">
          <label className={labelClass}>时间筛选</label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-300" />
              <input type="date" className={`${filterInputClass} pl-8`} />
            </div>
            <span className="text-slate-300 font-bold">-</span>
            <div className="relative flex-1">
               <CalendarIcon className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-300" />
              <input type="date" className={`${filterInputClass} pl-8`} />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>负责人筛选</label>
          <div className="relative group">
            <select className={`${filterInputClass} appearance-none pr-8 cursor-pointer`}>
              <option value="">选择负责人</option>
              <option value="li">李销售</option>
              <option value="wang">王销售</option>
            </select>
            <ChevronDownIcon className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>搜索框</label>
          <div className="relative group">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="搜索线索名称或手机号" 
              className={`${filterInputClass} pl-10 h-9`}
            />
          </div>
        </div>
      </div>

      {/* 3. 线索数据表格 */}
      <div className="flex-1 overflow-auto bg-white relative no-scrollbar">
        <table className="min-w-full divide-y divide-slate-100 text-[11px] border-separate border-spacing-0">
          <thead className="bg-slate-50 sticky top-0 z-30">
            <tr>
              <th scope="col" className="sticky left-0 z-40 bg-slate-50 px-4 py-4 border-b border-slate-200 w-[50px] shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  checked={LEADS_DATA.length > 0 && selectedIds.size === LEADS_DATA.length}
                  onChange={handleSelectAll}
                />
              </th>
              {TABLE_HEADERS.map((header, idx) => (
                <th
                  key={header}
                  scope="col"
                  className={`
                    py-4 px-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50
                    ${idx === 0 ? 'sticky left-[50px] z-40 bg-slate-50 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100' : ''}
                  `}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-50">
            {LEADS_DATA.map((row) => {
              const isSelected = selectedIds.has(row.id);
              return (
                <tr key={row.id} className={`hover:bg-blue-50/40 transition-colors group ${isSelected ? 'bg-blue-50/60' : ''}`}>
                  <td className={`sticky left-0 z-20 px-4 py-4 whitespace-nowrap border-b border-slate-50 transition-colors ${isSelected ? 'bg-[#f5f8ff]' : 'bg-white group-hover:bg-slate-50'} shadow-[2px_0_5px_rgba(0,0,0,0.02)]`}>
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer" 
                      checked={isSelected}
                      onChange={() => handleSelectOne(row.id)}
                    />
                  </td>
                  
                  <td 
                    onClick={() => openDetail(row)}
                    className={`sticky left-[50px] z-20 px-4 py-4 font-bold text-blue-600 hover:underline cursor-pointer border-b border-slate-50 border-r border-slate-100 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] whitespace-nowrap transition-colors ${isSelected ? 'bg-[#f5f8ff]' : 'bg-white group-hover:bg-slate-50'}`}
                  >
                    {row.线索名称}
                  </td>

                  <td className="px-4 py-4 text-slate-700 whitespace-nowrap border-b border-slate-50">{row.联系人}</td>
                  <td className="px-4 py-4 text-slate-500 border-b border-slate-50">{row.尊称}</td>
                  <td className="px-4 py-4 border-b border-slate-50">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">{row.线索来源}</span>
                  </td>
                  <td className="px-4 py-4 text-slate-700 font-mono font-bold border-b border-slate-50">{row.联系电话}</td>
                  <td className="px-4 py-4 text-slate-500 font-mono border-b border-slate-50">{row.座机}</td>
                  <td className="px-4 py-4 text-blue-500 hover:underline cursor-pointer border-b border-slate-50">{row.邮箱}</td>
                  <td className="px-4 py-4 font-bold text-slate-700 border-b border-slate-50">{row.负责人}</td>
                  <td className="px-4 py-4 text-slate-500 max-w-xs truncate border-b border-slate-50" title={row.地址}>{row.地址}</td>
                  <td className="px-4 py-4 text-slate-400 italic border-b border-slate-50 max-w-[150px] truncate" title={row.备注}>{row.备注}</td>
                  <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50 whitespace-nowrap">{row.最近更新时间}</td>
                  <td className="px-4 py-4 text-slate-800 font-bold border-b border-slate-50 font-mono whitespace-nowrap">{row.下次跟进时间}</td>
                  <td className="px-4 py-4 text-slate-400 border-b border-slate-50">{row.创建人}</td>
                  <td className="px-4 py-4 text-slate-300 font-mono border-b border-slate-50 text-[10px]">{row.创建时间}</td>
                  <td className="px-4 py-4 text-slate-300 font-mono border-b border-slate-50 text-[10px]">{row.更新时间}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 4. 底部区域 */}
      <footer className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-black hover:bg-blue-700 transition-all shadow-md active:scale-95 uppercase tracking-widest shadow-blue-100">
            领取到客户
          </button>
          <button className="flex items-center px-6 py-2 bg-white border border-slate-300 text-slate-500 rounded-lg text-xs font-black hover:bg-slate-50 transition-all shadow-sm active:scale-95 uppercase tracking-widest">
            放回线索池
          </button>
          <div className="h-4 w-px bg-slate-200 mx-2"></div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            共 <span className="text-slate-800">{LEADS_DATA.length}</span> 条数据
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">每页条数:</span>
            <select className="bg-white border border-slate-300 rounded px-1.5 py-1 text-[11px] font-bold focus:ring-1 focus:ring-blue-500 outline-none">
              <option>20条/页</option>
              <option>50条/页</option>
              <option>100条/页</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-1">
            <button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed text-[10px] font-black">上一页</button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded text-[11px] font-black shadow-md shadow-blue-100">1</span>
            <button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed text-[10px] font-black">下一页</button>
          </div>

          <div className="flex items-center space-x-2 ml-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">前往</span>
            <input type="text" className="w-10 h-7 border border-slate-300 rounded text-center text-xs font-bold focus:ring-1 focus:ring-blue-500 outline-none" defaultValue="1" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">页</span>
          </div>
        </div>
      </footer>

      <AddLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <LeadManagementDetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} lead={selectedLead} />
    </div>
  );
};
