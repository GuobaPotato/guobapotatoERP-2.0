
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { Cog6ToothIcon } from '../icons/Cog6ToothIcon';
import { PencilSquareIcon } from '../icons/PencilSquareIcon';

interface CustomerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string | null;
}

type TabType = '详细信息' | '沟通记录' | '企业信息' | '联系人' | '合同';

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({ isOpen, onClose, customerId }) => {
  const [activeTab, setActiveTab] = useState<TabType>('详细信息');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const labelClass = "text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block";
  const valueClass = "text-sm font-bold text-slate-700";

  return (
    <div className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative w-full max-w-[1100px] bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <header className="bg-slate-900 text-white px-8 py-5 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-2xl font-black tracking-tight">客户详情</h2>
            <div className="flex items-center space-x-4 mt-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>创建: 2026-01-09</span><span className="w-1 h-1 bg-slate-700 rounded-full"></span><span>最近跟进: 2026-01-09</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-rose-600 rounded-xl transition-all"><XMarkIcon className="h-6 w-6" /></button>
        </header>

        <nav className="bg-white border-b border-slate-100 px-8 flex-shrink-0">
          <div className="flex space-x-10">
            {['详细信息', '沟通记录', '联系人', '合同'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab as TabType)} className={`relative py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>{tab}<div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transition-transform ${activeTab === tab ? 'scale-x-100' : 'scale-x-0'}`}></div></button>
            ))}
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-8 custom-scrollbar">
          {activeTab === '详细信息' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6 border-l-4 border-blue-600 pl-3">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">基本信息</h3>
                  <button className="p-1.5 text-slate-300 hover:text-blue-500"><PencilSquareIcon className="h-4 w-4" /></button>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { label: "客户名称", value: "众林卫浴有限公司", highlight: true },
                    { label: "客户电话", value: "13727328733" },
                    { label: "座机", value: "--" },
                    { label: "客户来源", value: "老客户介绍" },
                    { label: "客户官网", value: "--" },
                    { label: "客户级别", value: "中型客户" },
                    { label: "地址", value: "浙江省杭州市XX区" },
                    { label: "邮箱", value: "info@zhonglin.com" },
                    { label: "负责人", value: "林瑞敏" },
                  ].map((f, i) => (
                    <div key={i}><span className={labelClass}>{f.label}</span><span className={`${valueClass} ${f.highlight ? 'text-blue-600' : ''}`}>{f.value}</span></div>
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
