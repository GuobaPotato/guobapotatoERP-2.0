
import React, { useState } from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const TABS = [
  "全部", "我负责的", "下属负责的", "今日待跟进", "今日已联系客户",
  "联合跟进客户", "从未跟进的", "从未添加沟通记录"
];

interface CustomersHeaderProps {
  onAddCustomerClick: () => void;
}

export const CustomersHeader: React.FC<CustomersHeaderProps> = ({ onAddCustomerClick }) => {
  const [activeTab, setActiveTab] = useState('全部');

  return (
    <div className="px-4 md:px-6 pt-4 border-b border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <h1 className="text-xl font-bold text-slate-800">客户管理</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onAddCustomerClick}
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <PlusIcon className="mr-2" />
            添加客户
          </button>
          <button className="flex items-center justify-center bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm">
            操作
            <ChevronDownIcon className="ml-2" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                  ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }
                  focus:outline-none focus:text-blue-600
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
