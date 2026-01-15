
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { PlusIcon } from '../icons/PlusIcon';

interface SelectCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (customer: { name: string }) => void;
}

const TABS = ["全部", "我负责的", "下属负责的", "今日待跟进", "今日已联系客户", "联合跟进客户"];

const MOCK_CUSTOMERS = [
  { name: "Kohler", phone: "--", landline: "--", industry: "卫浴", source: "其它" },
  { name: "Kohler", phone: "--", landline: "--", industry: "卫浴", source: "其它" },
  { name: "Hansgrohe", phone: "--", landline: "--", industry: "卫浴", source: "其它" },
  { name: "Grohe", phone: "+44 34132523", landline: "--", industry: "零售", source: "电话销售" },
];

export const SelectCustomerModal: React.FC<SelectCustomerModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('全部');
  const [selectedName, setSelectedName] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const handleConfirm = () => {
    if (selectedName) {
      onSelect({ name: selectedName });
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog" 
      aria-modal="true"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">选择客户</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1.5 transition-colors hover:bg-slate-100">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* 搜索与操作区 */}
        <div className="p-4 px-6 flex items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="搜索客户名称" 
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white text-sm placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm active:scale-95">
            <PlusIcon className="h-4 w-4 mr-1.5" />
            新建
          </button>
        </div>

        {/* 标签筛选区 */}
        <div className="px-6 border-b border-slate-100 bg-white">
          <nav className="-mb-px flex space-x-6 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap pt-4 pb-3 px-1 border-b-2 font-bold text-xs uppercase tracking-wider transition-all
                  ${activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200'}
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* 客户表格区 */}
        <div className="flex-1 overflow-auto p-4 px-6 custom-scrollbar">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left w-10"></th>
                  {["客户名称", "客户电话", "座机", "客户行业", "客户来源"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-widest text-[11px] whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {MOCK_CUSTOMERS.map((customer, idx) => (
                  <tr 
                    key={idx} 
                    className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${selectedName === customer.name ? 'bg-blue-50/60' : ''}`}
                    onClick={() => setSelectedName(customer.name)}
                  >
                    <td className="px-4 py-3 text-center">
                      <input 
                        type="radio" 
                        name="customer_select" 
                        className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                        checked={selectedName === customer.name}
                        onChange={() => setSelectedName(customer.name)}
                      />
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-700">{customer.name}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono">{customer.phone}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono">{customer.landline}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase">{customer.industry}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{customer.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 分页区 */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-widest">
          <div className="flex items-center space-x-4">
            <span>共 <span className="text-slate-800">7</span> 条</span>
            <span>20条/页</span>
          </div>
          <div className="flex items-center space-x-2">
            <button disabled className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-300">上一页</button>
            <span className="px-2.5 py-1 bg-blue-600 text-white rounded">1</span>
            <button disabled className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-300">下一页</button>
            <div className="flex items-center space-x-1 ml-2">
              <span>前往</span>
              <input type="text" className="w-8 h-6 border border-slate-200 rounded text-center focus:ring-1 focus:ring-blue-500 outline-none" defaultValue="1" />
            </div>
          </div>
        </div>

        {/* 操作按钮区 */}
        <div className="flex justify-end items-center gap-3 p-5 border-t border-slate-200 bg-white rounded-b-2xl">
          <button 
            onClick={onClose} 
            className="px-8 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            取消
          </button>
          <button 
            onClick={handleConfirm}
            disabled={!selectedName}
            className={`px-10 py-2 rounded-lg text-sm font-black transition-all shadow-lg active:scale-95 uppercase tracking-widest ${selectedName ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            确定
          </button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
