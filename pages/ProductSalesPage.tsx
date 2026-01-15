
import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';

type TabType = '产品销售统计' | '单产品销量、销售额统计';

export const ProductSalesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('产品销售统计');

  const tabs: TabType[] = ['产品销售统计', '单产品销量、销售额统计'];

  const tableData = [
    {
      名称: "智能水龙头",
      单位: "个",
      价格: "100.00",
      数量: "0",
      销售额: "0"
    },
    {
      名称: "智能小便器",
      单位: "个",
      价格: "800.00",
      数量: "0",
      销售额: "0"
    }
  ];

  const tableHeaders = ["名称", "单位", "价格", "数量", "销售额"];

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full">
      {/* 界面标题栏 - 横向并列标签 */}
      <div className="bg-white border-b border-slate-200 px-6 pt-4 sticky top-0 z-30 shadow-sm">
        <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-sm transition-all duration-200
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

      <div className="p-6 lg:p-8 space-y-6 flex flex-col flex-1 min-h-0">
        {/* 筛选操作区域 - 横向行内依次布局 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap items-center gap-4">
          
          <div className="w-full md:w-48 relative">
            <select className={`${inputClass} appearance-none pr-10`}>
              <option value="">请选择分类</option>
              <option value="1">红外传感器</option>
              <option value="2">菲涅尔透镜</option>
              <option value="3">智能终端</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div className="w-full md:w-48 relative">
            <select className={`${inputClass} appearance-none pr-10`}>
              <option value="">选择部门或下属</option>
              <option value="1">销售一部</option>
              <option value="2">销售二部</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDownIcon className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div className="w-full md:w-64 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              readOnly 
              className={`${inputClass} pl-10 bg-slate-50 cursor-default`} 
              value="2026-01-01 - 2026-01-09" 
            />
          </div>

          <div className="flex-1"></div>

          <button className="flex items-center px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 transition-all shadow-md active:scale-95">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            导出
          </button>
        </div>

        {/* 表格区域 - 横向表格 */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col">
          <div className="overflow-x-auto no-scrollbar">
            <table className="min-w-full divide-y divide-slate-100 text-xs">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  {tableHeaders.map((header) => (
                    <th 
                      key={header} 
                      className="px-6 py-4 text-left font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{row.名称}</td>
                    <td className="px-6 py-4 text-slate-600">{row.单位}</td>
                    <td className="px-6 py-4 text-slate-700 font-mono">¥{row.价格}</td>
                    <td className="px-6 py-4 font-black text-slate-400">{row.数量}</td>
                    <td className="px-6 py-4 font-black text-slate-400">¥{row.销售额}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 汇总栏 */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end items-center space-x-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center space-x-2">
              <span>总销售数量:</span>
              <span className="text-sm font-bold text-slate-800">0</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>总销售金额:</span>
              <span className="text-sm font-bold text-blue-600">¥0.00</span>
            </div>
          </div>
        </div>

        {/* 补充：空状态示意（如果没数据时） */}
        {tableData.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">暂无销售统计数据</p>
          </div>
        )}
      </div>
    </div>
  );
};
