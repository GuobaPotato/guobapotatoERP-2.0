
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { CUSTOMER_POOL_DATA, CUSTOMER_POOL_HEADERS } from '../constants';
import { CustomerPoolDetailModal } from '../components/crm/CustomerPoolDetailModal';

const TABS = ["全部", "我负责的", "下属负责的", "今日待跟进", "今日已联系客户", "联合跟进客户", "从未跟进的", "从未添加沟通记录"];

export const CustomersPoolPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');
  const [isSceneMenuOpen, setIsSceneMenuOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sceneRef.current && !sceneRef.current.contains(event.target as Node)) {
        setIsSceneMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(new Set(CUSTOMER_POOL_DATA.map(d => d.id)));
    else setSelectedIds(new Set());
  };

  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleNameClick = (id: string) => {
    setSelectedCustomerId(id);
    setIsDetailModalOpen(true);
  };

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1";

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 font-sans overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-6 pt-4 flex-shrink-0 z-50 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">客户池</h1>
            <div className="relative" ref={sceneRef}>
              <button onClick={() => setIsSceneMenuOpen(!isSceneMenuOpen)} className="flex items-center px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
                <span>{activeTab}</span>
                <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform ${isSceneMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSceneMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl z-[60] overflow-hidden ring-1 ring-black ring-opacity-5 py-1">
                    {TABS.map((opt) => (
                      <button key={opt} onClick={() => { setActiveTab(opt); setIsSceneMenuOpen(false); }} className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${opt === activeTab ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'}`}>{opt}</button>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center justify-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-bold text-sm transition-all shadow-md active:scale-95"><PlusIcon className="mr-2 h-4 w-4" />添加客户</button>
            <button className="flex items-center justify-center bg-white text-slate-700 px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-bold text-sm transition-all shadow-sm active:scale-95"><ArrowDownTrayIcon className="mr-2 h-4 w-4 text-slate-500" />导出</button>
          </div>
        </div>
        <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar border-t border-slate-50 pt-2">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap pb-3 px-1 border-b-2 font-bold text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>{tab}</button>
          ))}
        </nav>
      </div>

      <div className="px-6 py-4 bg-white border-b border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end flex-shrink-0 z-40">
        <div className="space-y-1">
          <label className={labelClass}>地区筛选</label>
          <div className="relative"><select className={`${inputClass} appearance-none pr-8 cursor-pointer`}><option value="">全部地区</option><option value="china">中国</option><option value="overseas">海外</option></select><ChevronDownIcon className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" /></div>
        </div>
        <div className="space-y-1 lg:col-span-1">
          <label className={labelClass}>时间筛选</label>
          <div className="flex items-center space-x-2"><div className="relative flex-1"><CalendarIcon className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-300" /><input type="date" className={`${inputClass} pl-8`} /></div><span className="text-slate-300 font-bold">-</span><div className="relative flex-1"><CalendarIcon className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-300" /><input type="date" className={`${inputClass} pl-8`} /></div></div>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>负责人筛选</label>
          <div className="relative"><select className={`${inputClass} appearance-none pr-8 cursor-pointer`}><option value="">选择负责人</option><option value="1">李销售</option></select><ChevronDownIcon className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400 pointer-events-none" /></div>
        </div>
        <div className="space-y-1">
          <label className={labelClass}>搜索框</label>
          <div className="relative group"><SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-300" /><input type="text" placeholder="搜客户名/手机号" className={`${inputClass} pl-10 h-9`} /></div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white relative no-scrollbar">
        <table className="min-w-full divide-y divide-slate-100 text-[11px] border-separate border-spacing-0">
          <thead className="bg-slate-50 sticky top-0 z-30">
            <tr>
              <th className="sticky left-0 z-40 bg-slate-50 px-4 py-4 border-b border-slate-200 w-12 text-center shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" checked={CUSTOMER_POOL_DATA.length > 0 && selectedIds.size === CUSTOMER_POOL_DATA.length} onChange={handleSelectAll} />
              </th>
              {CUSTOMER_POOL_HEADERS.map((header, idx) => (
                <th key={header} scope="col" className={`py-4 px-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50 ${idx === 0 ? 'sticky left-12 z-40 bg-slate-50 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] border-r border-slate-100' : ''}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-50">
            {CUSTOMER_POOL_DATA.map((row) => {
              const isSelected = selectedIds.has(row.id);
              return (
                <tr key={row.id} className={`hover:bg-blue-50/40 transition-colors group ${isSelected ? 'bg-blue-50/60' : ''}`}>
                  <td className="sticky left-0 z-20 px-4 py-4 text-center border-b border-slate-50 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.02)]"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" checked={isSelected} onChange={() => handleSelectOne(row.id)} /></td>
                  <td className="sticky left-12 z-20 px-4 py-4 font-bold text-blue-600 hover:underline cursor-pointer border-b border-slate-50 border-r border-slate-100 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)] bg-inherit" onClick={() => handleNameClick(row.id)}>{row.客户名称}</td>
                  <td className="px-4 py-4 text-slate-700 whitespace-nowrap border-b border-slate-50">{row.所在地区}</td>
                  <td className="px-4 py-4 text-slate-600 font-mono border-b border-slate-50">{row.客户电话}</td>
                  <td className="px-4 py-4 text-center border-b border-slate-50 font-black text-slate-700">{row.总跟进次数}</td>
                  <td className="px-4 py-4 text-slate-700 whitespace-nowrap border-b border-slate-50"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-100">{row.意向产品}</span></td>
                  <td className="px-4 py-4 text-slate-500 font-mono border-b border-slate-50">{row.座机}</td>
                  <td className="px-4 py-4 text-slate-600 border-b border-slate-50">{row.客户来源}</td>
                  <td className="px-4 py-4 text-blue-500 hover:underline cursor-pointer border-b border-slate-50 max-w-[200px] truncate">{row.客户官网}</td>
                  <td className="px-4 py-4 text-slate-500 max-w-xs truncate border-b border-slate-50" title={row.地址}>{row.地址}</td>
                  <td className="px-4 py-4 text-slate-400 italic border-b border-slate-50 max-w-xs truncate" title={row.备注}>{row.备注}</td>
                  <td className="px-4 py-4 text-slate-600 border-b border-slate-50">{row.邮箱地址}</td>
                  <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50 uppercase tracking-tighter">{row.客户编号}</td>
                  <td className="px-4 py-4 text-slate-400 border-b border-slate-50 font-mono">{row.最近跟进时间}</td>
                  <td className="px-4 py-4 text-800 font-bold border-b border-slate-50 font-mono">{row.下次联系时间}</td>
                  <td className="px-4 py-4 text-700 border-b border-slate-50">{row.首要联系人}</td>
                  <td className="px-4 py-4 border-b border-slate-50 text-center"><span className="px-2 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-200 font-black text-[9px]">{row.是否有跟进记录}</span></td>
                  <td className="px-4 py-4 border-b border-slate-50 text-center text-slate-400">{row.客户成交状态}</td>
                  <td className="px-4 py-4 border-b border-slate-50 font-mono text-slate-400">{row.最近回收时间}</td>
                  <td className="px-4 py-4 text-slate-400 border-b border-slate-50 uppercase tracking-widest">{row.创建人}</td>
                  <td className="px-4 py-4 text-slate-400 border-b border-slate-50 font-mono text-[10px]">{row.创建时间}</td>
                  <td className="px-4 py-4 text-slate-400 border-b border-slate-50 font-mono text-[10px]">{row.更新时间}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 z-50">
        <div className="flex items-center space-x-3"><button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-black hover:bg-blue-700 transition-all shadow-md active:scale-95 uppercase tracking-widest shadow-blue-100">领取到客户</button><button className="flex items-center px-6 py-2 bg-slate-800 text-white rounded-lg text-xs font-black hover:bg-slate-900 transition-all shadow-md active:scale-95 uppercase tracking-widest">分配到客户</button><div className="h-4 w-px bg-slate-200 mx-2"></div><div className="text-xs text-slate-400 font-bold">共 <span className="text-slate-800">1</span> 条数据</div></div>
        <div className="flex items-center space-x-4"><div className="flex items-center space-x-1"><button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed text-[10px] font-black">上一页</button><span className="px-3 py-1 bg-blue-600 text-white rounded text-[11px] font-black shadow-md shadow-blue-100">1</span><button disabled className="px-2 py-1 bg-white border border-slate-300 rounded text-slate-300 cursor-not-allowed text-[10px] font-black">下一页</button></div></div>
      </footer>
      <CustomerPoolDetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} customerId={selectedCustomerId} />
    </div>
  );
};
