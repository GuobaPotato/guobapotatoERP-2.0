
import React from 'react';
import { InventoryTab } from '../../pages/InventoryManagementPage';

const TABS: InventoryTab[] = ["产品库存", "出入库记录", "库存变更统计", "采销数量对比"];

interface InventoryHeaderProps {
    activeTab: InventoryTab;
    setActiveTab: (tab: InventoryTab) => void;
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="px-4 md:px-6 pt-4 border-b border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-xl font-bold text-slate-800 mb-4 md:mb-0">库存管理</h1>
      </div>
      <div className="mt-4">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-6 overflow-x-auto no-scrollbar" aria-label="Tabs">
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
