
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { LEADS_POOL_HEADERS, LEADS_POOL_MOCK_DATA } from '../constants';
import { AddLeadModal } from '../components/AddLeadModal';
import { LeadManagementDetailModal } from '../components/crm/LeadManagementDetailModal';
import { Lead } from '../types';

export const LeadsPoolPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('公共线索池');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(new Set(LEADS_POOL_MOCK_DATA.map(d => d.id)));
    else setSelectedIds(new Set());
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
      <header className="bg-white border-b border-slate-200 px-6 pt-4 flex-shrink-0 z-50 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">线索池</h1>
            <nav className="flex space-x-8">
              {["公共线索池", "部门线索池"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    whitespace-nowrap pb-3 px-1 border-b-2 font-black text-sm uppercase tracking-widest transition-all
                    ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center justify-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-bold text-sm transition-all shadow-md active:scale-95">
              <PlusIcon className="mr-2 h-4 w-4" />添加线索
            </button>
            <button className="flex items-center justify-center bg-white text-slate-700 px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-bold text-sm transition-all shadow-sm active:scale-95">导入</button>
            <button className="flex items-center justify-center bg-white text-slate-700 px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-bold text-sm transition-all shadow-sm active:scale-95">
              <ArrowDownTrayIcon className="mr-2 h-4 w-4 text-slate-500" />导出
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 py-4 bg-white border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end flex-shrink-0 z-40">
        <div className="space-y-1">
          <label className={labelClass}>地区筛选</label>
          <div className="relative"><select className={`${filterInputClass} appearance-none pr-8 cursor-pointer`}><option value="">全部地区</option><option value="china">中国</option><option value="overseas">海外</option></select><ChevronDownIcon className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" /></div>
        </div>

        <div className="space-y-1 lg:col-span-1">
          <label className={labelClass}>时间筛选</label>
          <div className="flex items-center space-x-2"><div className="relative flex-1"><CalendarIcon className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-300" /><input type="date" className={`${filterInputClass} pl-8`} /></div><span className="text-slate-300 font-bold">-</span><div className="relative flex-1"><CalendarIcon className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-300" /><input type="date" className={`${filterInputClass} pl-8`} /></div></div>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>负责人筛选</label>
          <div className="relative"><select className={`${filterInputClass} appearance-none pr-8 cursor-pointer`}><option value="">全部负责人</option><option value="sys">系统导入</option><option value="un">未分配</option></select><ChevronDownIcon className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" /></div>
        </div>

        <div className="space-y-1">
          <label className={labelClass}>搜索框</label>
          <div className="relative group"><SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-300" /><input type="text" placeholder="搜索线索名称或手机号" className={`${filterInputClass} pl-10 h-9`} /></div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white relative no-scrollbar">
        <table className="min-w-full divide-y divide-slate-100 text-[11px] border-separate border-spacing-0">
          <thead className="bg-slate-50 sticky top-0 z-30">
            <tr>
              <th scope="col" className="sticky left-0 z-40 bg-slate-50 px-4 py-4 border-b border-slate-200 w-12 text-center shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" checked={LEADS_POOL_MOCK_DATA.length > 0 && selectedIds.size === LEADS_POOL_MOCK_DATA.length} onChange={handleSelectAll} />
              </th>
              {LEADS_POOL_HEADERS.map((header, idx) => (
                <th key={header} scope="col" className={`py-4 px-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap ${idx === 0 ? 'sticky left-12 z-40 bg-slate-50 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100' : ''}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-50">
            {LEADS_POOL_MOCK_DATA.map((row) => {
              const isSelected = selectedIds.has(row.id);
              return (
                <tr key={row.id} className={`hover:bg-blue-50/40 transition-colors group ${isSelected ? 'bg-blue-50/60' : ''}`}>
                  <td className="sticky left-0 z-20 px-4 py-4 text-center border-b border-slate-50 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.02)]"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" checked={isSelected} onChange={() => handleSelectOne(row.id)} /></td>
                  <td onClick={() => openDetail(row)} className="sticky left-12 z-20 px-4 py-4 font-bold text-blue-600 hover:underline cursor-pointer border-b border-slate-50 border-r border-slate-100 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] bg-inherit transition-colors">{row.线索名称}</td>
                  <td className="px-4 py-4 text-slate-700 whitespace-nowrap border-b border-slate-50">{row.联系人}</td>
                  <td className="px-4 py-4 text-slate-600 whitespace-nowrap border-b border-slate-50">{row.所在地区}</td>
                  <td className="px-4 py-4 text-slate-500 border-b border-slate-50">{row.尊称}</td>
                  <td className="px-4 py-4 border-b border-slate-50"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">{row.线索来源}</span></td>
                  <td className="px-4 py-4 text-slate-700 font-mono font-bold border-b border-slate-50">{row.联系电话}</td>
                  <td className="px-4 py-4 border-b border-slate-50 text-center"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-black border border-blue-100 text-[9px]">{row.意向产品}</span></td>
                  <td className="px-4 py-4 text-slate-500 font-mono border-b border-slate-50">{row.座机}</td>
                  <td className="px-4 py-4 text-blue-500 hover:underline cursor-pointer border-b border-slate-50">{row.邮箱}</td>
                  <td className="px-4 py-4 font-bold text-slate-400 italic border-b border-slate-50">{row.负责人}</td>
                  <td className="px-4 py-4 text-slate-500 max-w-xs truncate border-b border-slate-50" title={row.地址}>{row.地址}</td>
                  <td className="px-4 py-4 text-slate-400 italic border-b border-slate-50 max-w-[150px] truncate" title={row.备注}>{row.备注}</td>
                  <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50 whitespace-nowrap">{row.最近更新时间}</td>
                  <td className="px-4 py-4 text-slate-800 font-bold border-b border-slate-50 font-mono whitespace-nowrap">{row.下次跟进时间}</td>
                  <td className="px-4 py-4 text-slate-400 border-b border-slate-50">{row.创建人}</td>
                  <td className="px-4 py-4 text-slate-300 font-mono border-b border-slate-50 text-[10px]">{row.创建时间}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 z-50">
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-6 py-2 bg-emerald-600 text-white rounded-lg text-xs font-black hover:bg-emerald-700 transition-all uppercase shadow-md shadow-emerald-100">领取到线索</button>
          <button className="flex items-center px-6 py-2 bg-slate-800 text-white rounded-lg text-xs font-black hover:bg-black transition-all uppercase shadow-md active:scale-95">分配到线索</button>
          <div className="h-4 w-px bg-slate-200 mx-2"></div>
          <div className="text-xs text-slate-400 font-bold">共 <span className="text-slate-800 font-black">1</span> 条线索</div>
        </div>
        <div className="flex items-center space-x-4"><div className="flex items-center space-x-1"><button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed text-[10px] font-black uppercase">上一页</button><span className="px-3 py-1 bg-blue-600 text-white rounded text-[11px] font-black shadow-md">1</span><button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed text-[10px] font-black uppercase">下一页</button></div></div>
      </footer>

      <AddLeadModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <LeadManagementDetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} lead={selectedLead} />
    </div>
  );
};
