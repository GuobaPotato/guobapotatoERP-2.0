
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon } from '../icons/PlusIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

const TABS = ["全部", "我负责的", "下属负责的"];

interface QuotationHeaderProps {
  onAddClick?: () => void;
}

export const QuotationHeader: React.FC<QuotationHeaderProps> = ({ onAddClick }) => {
  const [activeTab, setActiveTab] = useState('全部');
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsActionMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="px-6 pt-4 border-b border-slate-200 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-xl font-bold text-slate-800">报价单管理</h1>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button 
            onClick={onAddClick}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-bold text-sm transition-all shadow-md active:scale-95"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            添加报价单
          </button>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
              className="inline-flex items-center justify-center bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-bold text-sm transition-all shadow-sm"
            >
              操作
              <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform ${isActionMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isActionMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 transition-colors font-medium">导出</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-sm transition-all
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
    </div>
  );
};
