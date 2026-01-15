
import React from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';

export const CustomerAnalysisPage: React.FC = () => {
  const tableHeaders = [
    "客户名称", "创建时间", "客户来源", "类型", "联系电话", "创建人", "负责人", 
    "最近跟进情况", "是否掉入线索池", "是否已转客户", "是否掉入客户池", 
    "签约合同数", "已回款金额", "待回款金额"
  ];

  const tableData = [
    {
      "客户名称": "王策",
      "创建时间": "2026-01-09 17:10",
      "客户来源": "老客户介绍",
      "类型": "客户",
      "联系电话": "13727328733",
      "创建人": "王朔",
      "负责人": "王朔",
      "最近跟进情况": "初步接触",
      "是否掉入线索池": "否",
      "是否已转客户": "否",
      "是否掉入客户池": "否",
      "签约合同数": "3",
      "已回款金额": "56390",
      "待回款金额": "2680"
    }
  ];

  const totalRow = {
    "签约合同数": "3",
    "已回款金额": "56390",
    "待回款金额": "2680"
  };

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 顶部标签栏 */}
      <div className="bg-white border-b border-slate-200 px-6 pt-4 sticky top-0 z-30 shadow-sm">
        <nav className="-mb-px flex space-x-8">
          <button className="whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-sm border-blue-600 text-blue-600">
            客户数据分析
          </button>
        </nav>
      </div>

      <div className="p-6 lg:p-8 space-y-6 flex flex-col flex-1 min-h-0">
        {/* 筛选区域 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap items-center gap-4">
          <div className="w-full md:w-56 relative">
            <select className={`${inputClass} appearance-none pr-10`}>
              <option value="">选择部门或下属</option>
              <option value="1">销售一部</option>
              <option value="2">销售二部</option>
              <option value="3">技术部</option>
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
        </div>

        {/* 数据表格区域 */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col flex-1">
          <div className="overflow-x-auto custom-scrollbar flex-1">
            <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  {tableHeaders.map((header, idx) => (
                    <th 
                      key={header} 
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
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-4 font-bold text-slate-800 sticky left-0 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-10">{row.客户名称}</td>
                    <td className="px-4 py-4 text-slate-500 whitespace-nowrap">{row.创建时间}</td>
                    <td className="px-4 py-4 text-slate-600">{row.客户来源}</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">{row.类型}</span>
                    </td>
                    <td className="px-4 py-4 text-slate-600 font-mono">{row.联系电话}</td>
                    <td className="px-4 py-4 text-slate-600">{row.创建人}</td>
                    <td className="px-4 py-4 text-slate-600">{row.负责人}</td>
                    <td className="px-4 py-4 text-slate-600">{row.最近跟进情况}</td>
                    <td className="px-4 py-4 text-slate-400">{row.是否掉入线索池}</td>
                    <td className="px-4 py-4 text-slate-400">{row.是否已转客户}</td>
                    <td className="px-4 py-4 text-slate-400">{row.是否掉入客户池}</td>
                    <td className="px-4 py-4 text-right font-bold text-slate-700">{row.签约合同数}</td>
                    <td className="px-4 py-4 text-right font-mono text-emerald-600 font-bold">¥{row.已回款金额}</td>
                    <td className="px-4 py-4 text-right font-mono text-rose-500 font-bold">¥{row.待回款金额}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-black text-slate-700 sticky bottom-0 z-10 backdrop-blur-sm">
                <tr>
                  <td colSpan={11} className="px-4 py-4 border-t border-slate-200 text-right uppercase tracking-widest text-[10px]">合计</td>
                  <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">{totalRow.签约合同数}</td>
                  <td className="px-4 py-4 border-t border-slate-200 text-right font-mono text-emerald-700">¥{totalRow.已回款金额}</td>
                  <td className="px-4 py-4 border-t border-slate-200 text-right font-mono text-rose-700">¥{totalRow.待回款金额}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          {/* 底部信息区域 */}
          <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <div>共 <span className="font-bold text-slate-800">1</span> 条记录</div>
            <div className="flex items-center space-x-2">
               <span>页码：<span className="font-bold text-blue-600">1</span></span>
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
