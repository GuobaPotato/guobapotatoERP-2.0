
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { Cog6ToothIcon } from '../icons/Cog6ToothIcon';
import { PaperClipIcon } from '../icons/PaperClipIcon';
import { PhotoIcon } from '../icons/PhotoIcon';
import { PencilSquareIcon } from '../icons/PencilSquareIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { Lead } from '../../types';

interface LeadManagementDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
}

type TabType = '沟通记录' | '详细信息' | '企业信息' | '附件' | '操作记录';

export const LeadManagementDetailModal: React.FC<LeadManagementDetailModalProps> = ({ isOpen, onClose, lead }) => {
  const [activeTab, setActiveTab] = useState<TabType>('沟通记录');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const tabs: TabType[] = ["沟通记录", "详细信息", "企业信息", "附件", "操作记录"];
  const labelClass = "text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block";
  const valueClass = "text-sm font-bold text-slate-700";

  return (
    <div className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative w-full max-w-[1150px] bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <header className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center flex-shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center space-x-3 mb-1.5">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{lead?.线索名称 || "线索详情"}</h2>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] uppercase font-black border border-blue-100">正式线索</span>
            </div>
            <div className="flex items-center space-x-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>创建: {lead?.创建时间 || "--"}</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              <span>负责人: <span className="text-blue-600">{lead?.负责人}</span></span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">转为客户</button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><XMarkIcon className="h-6 w-6" /></button>
          </div>
        </header>
        <nav className="bg-white border-b border-slate-100 px-8 flex-shrink-0">
          <div className="flex space-x-12">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`relative py-4 text-xs font-black uppercase tracking-widest ${activeTab === tab ? 'text-blue-600' : 'text-slate-400'}`}>
                {tab}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transition-transform ${activeTab === tab ? 'scale-x-100' : 'scale-x-0'}`}></div>
              </button>
            ))}
          </div>
        </nav>
        <main className="flex-1 overflow-y-auto bg-slate-50/30 p-8 custom-scrollbar">
          {activeTab === '详细信息' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-8 border-l-4 border-blue-600 pl-4">基本信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                  {[
                    { label: "线索名称", value: lead?.线索名称, highlight: true },
                    { label: "联系人", value: lead?.联系人 },
                    { label: "线索来源", value: lead?.线索来源 },
                    { label: "联系电话", value: lead?.联系电话 },
                    { label: "座机", value: lead?.座机 },
                    { label: "邮箱", value: lead?.邮箱 },
                    { label: "尊称", value: lead?.尊称 },
                    { label: "客户级别", value: lead?.客户级别 },
                    { label: "负责人", value: lead?.负责人 },
                    { label: "地址", value: lead?.地址 },
                    { label: "备注", value: lead?.备注 },
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col border-b border-slate-50 pb-4 last:border-0">
                      <span className={labelClass}>{f.label}</span>
                      <span className={`${valueClass} ${f.highlight ? 'text-blue-600' : ''}`}>{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-8 border-l-4 border-slate-400 pl-4">系统审计</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
                  {[
                    { label: "创建人", value: lead?.创建人 },
                    { label: "创建时间", value: lead?.创建时间 },
                    { label: "更新时间", value: lead?.更新时间 },
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col">
                      <span className={labelClass}>{f.label}</span>
                      <span className="text-xs font-bold text-slate-500 font-mono">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
