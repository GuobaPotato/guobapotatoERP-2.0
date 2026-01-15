
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon } from '../icons/PlusIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { ArrowDownTrayIcon } from '../icons/ArrowDownTrayIcon';

const TABS = [
  "全部", "我负责的", "下属负责的", "今日待跟进", "今日已联系客户",
  "联合跟进客户", "从未跟进的", "从未添加沟通记录"
];

const SCENE_OPTIONS = [
  ...TABS,
  "添加场景",
  "管理场景"
];

interface CustomersHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAddCustomerClick: () => void;
}

export const CustomersHeader: React.FC<CustomersHeaderProps> = ({ activeTab, onTabChange, onAddCustomerClick }) => {
  const [isSceneOpen, setIsSceneOpen] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sceneRef.current && !sceneRef.current.contains(event.target as Node)) {
        setIsSceneOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white border-b border-slate-200 px-6 pt-4 flex-shrink-0 z-40">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">客户管理</h1>
          
          {/* 自定义场景下拉菜单 */}
          <div className="relative" ref={sceneRef}>
            <button 
              onClick={() => setIsSceneOpen(!isSceneOpen)}
              className="flex items-center px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all"
            >
              <span>{activeTab}</span>
              <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform ${isSceneOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isSceneOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in duration-100">
                <div className="py-1">
                  {SCENE_OPTIONS.map((opt) => (
                    <button 
                      key={opt}
                      onClick={() => {
                        if (TABS.includes(opt)) onTabChange(opt);
                        setIsSceneOpen(false);
                      }}
                      className={`
                        block w-full text-left px-4 py-2 text-sm transition-colors
                        ${opt === activeTab ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'}
                        ${opt === '添加场景' || opt === '管理场景' ? 'border-t border-slate-100 mt-1 text-blue-500 font-bold' : ''}
                      `}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={onAddCustomerClick}
            className="flex items-center justify-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-bold text-sm transition-all shadow-md active:scale-95"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            添加客户
          </button>
          <button className="flex items-center justify-center bg-white text-slate-700 px-5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-bold text-sm transition-all shadow-sm active:scale-95">
            <ArrowDownTrayIcon className="mr-2 h-4 w-4 text-slate-500" />
            导出
          </button>
        </div>
      </div>

      {/* 顶部页签 */}
      <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar border-t border-slate-50 pt-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
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
    </div>
  );
};
