
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';

type TabType = '客户产品对账单' | '客户产品出入库对账单' | '客户成交信息汇总表';

export const CustomerStatementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('客户产品出入库对账单');
  const [includeUnchecked, setIncludeUnchecked] = useState(true);

  const tabs: TabType[] = ['客户产品对账单', '客户产品出入库对账单', '客户成交信息汇总表'];

  // 根据当前标签页动态生成表头
  const getTableHeaders = () => {
    if (activeTab === '客户成交信息汇总表') {
      return [
        "合同负责人", "客户原创建人", "签订日期", "客户名称", "商品编号", "产品名称",
        "数量", "单位", "售价(元)", "销售金额(元)", "成本价(元)", "总成本(元)",
        "利润(元)", "备注"
      ];
    }
    // 默认表头（对账单类）
    return [
      "客户名称", "合同编号", "合同名称", "负责人", "签约时间", "合同金额(元)",
      "总折扣(%)", "成交价(元)", "已回款金额(元)", "产品名称", "产品规格",
      "单价(元)", "折扣(%)", "销售单价(元)", "数量", "总价", "出库人",
      "出库时间", "出库数量"
    ];
  };

  const tableHeaders = getTableHeaders();
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
        {/* 筛选操作区域 - 横向行内布局 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap items-center gap-4">
          
          {/* 仅在“客户成交信息汇总表”显示“客户创建人”下拉框 */}
          {activeTab === '客户成交信息汇总表' && (
            <div className="w-full md:w-40 relative">
              <select className={`${inputClass} appearance-none pr-10`}>
                <option value="">客户创建人</option>
                <option value="1">张三</option>
                <option value="2">李四</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDownIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          )}

          <div className="w-full md:w-64 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              className={`${inputClass} pl-10`} 
              placeholder="客户名称、合同名称、合同编号" 
            />
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

          <div className="flex items-center space-x-3 px-2">
            <span className="text-xs font-bold text-slate-500">是否包含未审核</span>
            <button 
              onClick={() => setIncludeUnchecked(!includeUnchecked)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${includeUnchecked ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${includeUnchecked ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex-1"></div>

          <button className="flex items-center px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 transition-all shadow-md active:scale-95">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            导出
          </button>
        </div>

        {/* 表格区域 - 横向扩展表格 */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col flex-1">
          <div className="overflow-x-auto custom-scrollbar flex-1">
            <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  {tableHeaders.map((header, idx) => (
                    <th 
                      key={idx} 
                      className={`
                        px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50
                        ${idx === 0 ? 'sticky left-0 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.05)]' : ''}
                      `}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-50">
                <tr>
                  <td colSpan={tableHeaders.length} className="px-6 py-32 text-center text-slate-400 italic bg-white">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                        <SearchIcon className="h-8 w-8 text-slate-200" />
                      </div>
                      <p className="text-sm font-medium tracking-widest uppercase">暂无数据</p>
                      <p className="text-[10px] text-slate-300 font-normal">请尝试调整筛选条件进行检索</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* 底部汇总占位 */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div>汇总统计: ——</div>
            <div className="flex space-x-8">
              {activeTab === '客户成交信息汇总表' ? (
                <>
                  <span>销售总额: 0.00</span>
                  <span>总成本: 0.00</span>
                  <span>总利润: 0.00</span>
                </>
              ) : (
                <>
                  <span>合同总额: 0.00</span>
                  <span>成交总价: 0.00</span>
                  <span>总出库量: 0</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
