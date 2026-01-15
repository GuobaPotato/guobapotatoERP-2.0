
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { UserIcon } from '../icons/UserIcon';
import { PaperClipIcon } from '../icons/PaperClipIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { Cog6ToothIcon } from '../icons/Cog6ToothIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { PencilSquareIcon } from '../icons/PencilSquareIcon';
import { PhotoIcon } from '../icons/PhotoIcon';

interface CustomerPoolDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string | null;
}

type TabType = 
  | '沟通记录' | '详细信息' | '企业信息' | '联系人' 
  | '报价单' | '合同' | '附件' | '操作记录';

export const CustomerPoolDetailModal: React.FC<CustomerPoolDetailModalProps> = ({ isOpen, onClose, customerId }) => {
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

  const tabs: { name: TabType; badge?: boolean }[] = [
    { name: '沟通记录' },
    { name: '详细信息' },
    { name: '企业信息' },
    { name: '联系人', badge: true },
    { name: '报价单' },
    { name: '合同' },
    { name: '附件' },
    { name: '操作记录', badge: true },
  ];

  const labelClass = "text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block";
  const valueClass = "text-sm font-bold text-slate-700";
  const inputClass = "block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all";

  const SectionHeader = ({ title, action }: { title: string; action?: React.ReactNode }) => (
    <div className="flex justify-between items-center mb-6 border-l-4 border-blue-600 pl-3">
      <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{title}</h3>
      {action}
    </div>
  );

  return (
    <div className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative w-full max-w-[1100px] bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <header className="bg-slate-900 text-white px-8 py-5 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black tracking-tight flex items-center">
                王丽
                <span className="ml-3 px-2 py-0.5 bg-blue-600 rounded text-[10px] uppercase font-black tracking-tighter">公海客户</span>
              </h2>
              <div className="flex items-center space-x-4 mt-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>创建: 2026-01-09 17:10</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span className="flex items-center">负责人: <span className="text-blue-400 ml-1">林瑞敏</span></span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-rose-600 rounded-xl transition-all">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>

        <nav className="bg-white border-b border-slate-100 px-8 flex-shrink-0 overflow-x-auto no-scrollbar">
          <div className="flex space-x-10">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`relative py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.name ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab.name}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transition-transform ${activeTab === tab.name ? 'scale-x-100' : 'scale-x-0'}`}></div>
              </button>
            ))}
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-8 custom-scrollbar">
          {activeTab === '详细信息' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <SectionHeader title="基本信息" />
                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { label: "客户名称", value: "众林卫浴有限公司", highlight: true },
                    { label: "客户电话", value: "13727328733" },
                    { label: "座机", value: "--" },
                    { label: "客户来源", value: "老客户介绍" },
                    { label: "客户官网", value: "--" },
                    { label: "客户级别", value: "中型客户" },
                    { label: "地址", value: "--" },
                    { label: "备注", value: "--" },
                    { label: "负责人", value: "林瑞敏" },
                  ].map((f, i) => (
                    <div key={i}>
                      <span className={labelClass}>{f.label}</span>
                      <span className={`${valueClass} ${f.highlight ? 'text-blue-600 underline' : ''}`}>{f.value}</span>
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
