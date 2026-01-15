
import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { SearchIcon } from '../components/icons/SearchIcon';

type PerformanceTab = '成交客户分析' | '业绩目标完成情况统计' | '人员效能' | '跟进客户与成交的更进客户分析' | '销售分析';

export const PerformanceStatsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PerformanceTab>('成交客户分析');

  const tabs: PerformanceTab[] = [
    '成交客户分析', 
    '业绩目标完成情况统计', 
    '人员效能', 
    '跟进客户与成交的更进客户分析', 
    '销售分析'
  ];

  // 成交客户分析的数据
  const customerAnalysisHeaders = [
    "员工姓名", "线索数", "线索转化率", "客户数", "成交客户数", "客户成交率", 
    "商机数", "赢单商机数", "商机赢单率", "合同总金额", "回款总金额", 
    "未回款金额", "回款比例", "开票总金额", "首次成交客户数", "再次成交客户数"
  ];

  const customerAnalysisData = [
    {
      "员工姓名": "王晓明",
      "线索数": "0",
      "线索转化率": "",
      "客户数": "1",
      "成交客户数": "0",
      "客户成交率": "0%",
      "商机数": "1",
      "赢单商机数": "0",
      "商机赢单率": "0%",
      "合同总金额": "0",
      "回款总金额": "0",
      "未回款金额": "0",
      "回款比例": "",
      "开票总金额": "0",
      "首次成交客户数": "0",
      "再次成交客户数": "0"
    }
  ];

  // 业绩目标统计的表头
  const targetStatsHeaders = [
    "名称", "职务", "考核目标",
    "年度目标（目标/完成/完成率）",
    "第一季度（目标/完成/完成率）",
    "第二季度（目标/完成/完成率）",
    "第三季度（目标/完成/完成率）",
    "第四季度（目标/完成）"
  ];

  // 人员效能的数据
  const personnelEfficiencyHeaders = [
    "员工姓名", "合同数量", "最大金额", "最小金额", "平均金额", "最长周期", "最短周期", "平均周期"
  ];

  const personnelEfficiencyData = [
    {
      "员工姓名": "王朔",
      "合同数量": "0",
      "最大金额": "",
      "最小金额": "",
      "平均金额": "0",
      "最长周期": "",
      "最短周期": "",
      "平均周期": ""
    }
  ];

  // 跟进客户分析数据
  const followUpHeaders = [
    "名称",
    "1月份（跟进客户数/跟进成交客户数/成交跟进比）",
    "2月份（跟进客户数/跟进成交客户数/成交跟进比）",
    "3月份（跟进客户数/跟进成交客户数/成交跟进比）",
    "4月份（跟进客户数/跟进成交客户数/成交跟进比）",
    "5月份（跟进客户数/跟进成交客户数/成交跟进比）",
    "6月份（跟进客户数/跟进成交客户数/成交跟进比）",
    "7月份（跟进客户数/跟进成交客户数/成交跟进比）",
    "8月份（跟进客户数/跟进成交客户数/成交跟进比）",
    "9月份（跟进客户数/跟进成交客户数/成交跟进比）",
    "10月份（跟进客户数/跟进成交客户数/成交跟进比）",
    "11月份（跟进客户数/跟进成交客户数/成交跟进比）",
    "12月份（跟进客户数/跟进成交客户数/成交跟进比）"
  ];

  const followUpData = [
    {
      "名称": "王晓明",
      "months": [
        "15/2/13.33%", "18/3/16.67%", "22/4/18.18%", "20/3/15.00%", "25/5/20.00%", "28/6/21.43%",
        "30/7/23.33%", "26/5/19.23%", "32/8/25.00%", "35/9/25.71%", "40/10/25.00%", "38/11/28.95%"
      ]
    },
    {
      "名称": "李小贸",
      "months": [
        "10/1/10.00%", "12/1/8.33%", "16/2/12.50%", "14/2/14.29%", "18/3/16.67%", "20/3/15.00%",
        "22/4/18.18%", "24/4/16.67%", "26/5/19.23%", "28/6/21.43%", "30/7/23.33%", "32/8/25.00%"
      ]
    }
  ];

  const followUpTotals = [
    "15/2/13.33%", "18/3/16.67%", "22/4/18.18%", "34/5/14.71%", "43/8/18.60%", "48/9/18.75%",
    "52/11/21.15%", "50/9/18.00%", "58/13/22.41%", "63/15/23.81%", "70/17/24.29%", "70/19/27.14%"
  ];

  // 销售分析数据
  const salesAnalysisHeaders = ["员工姓名", "总数", "跟进中", "赢单数", "输单数", "无效数", "赢单总金额"];
  const salesAnalysisData = [
    { "员工姓名": "王晓明", "总数": "28", "跟进中": "12", "赢单数": "8", "输单数": "5", "无效数": "3", "赢单总金额": "458000.00" },
    { "员工姓名": "李小贸", "总数": "22", "跟进中": "9", "赢单数": "6", "输单数": "4", "无效数": "3", "赢单总金额": "325000.00" },
    { "员工姓名": "王外贸", "总数": "18", "跟进中": "7", "赢单数": "5", "输单数": "3", "无效数": "3", "赢单总金额": "286000.00" },
    { "员工姓名": "张跨境", "总数": "15", "跟进中": "8", "赢单数": "3", "输单数": "2", "无效数": "2", "赢单总金额": "198000.00" }
  ];
  const salesAnalysisTotal = { "总数": "83", "跟进中": "36", "赢单数": "22", "输单数": "14", "无效数": "11", "赢单总金额": "1267000.00" };

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 顶部标签栏 */}
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
        {/* 筛选与操作区域 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-wrap items-center gap-4">
          {activeTab === '销售分析' ? (
            <>
              <div className="w-full md:w-56 relative">
                <select className={`${inputClass} appearance-none pr-10`}>
                  <option value="">选择部门或下属</option>
                  <option value="1">全公司</option>
                  <option value="2">销售一部</option>
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
            </>
          ) : activeTab === '跟进客户与成交的更进客户分析' ? (
            <>
              <div className="w-full md:w-56 relative">
                <select className={`${inputClass} appearance-none pr-10`}>
                  <option value="">选择部门或下属</option>
                  <option value="1">全公司</option>
                  <option value="2">销售一部</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                </div>
              </div>
              <div className="w-full md:w-32 relative">
                <select className={`${inputClass} appearance-none pr-10`} defaultValue="2026">
                  <option value="2026">2026年</option>
                  <option value="2025">2025年</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </>
          ) : activeTab === '人员效能' ? (
            <>
              <div className="w-full md:w-56 relative">
                <select className={`${inputClass} appearance-none pr-10`}>
                  <option value="">请选择部门</option>
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
            </>
          ) : activeTab === '业绩目标完成情况统计' ? (
            <>
              <div className="w-full md:w-32 relative">
                <select className={`${inputClass} appearance-none pr-10`} defaultValue="2026">
                  <option value="2026">2026年</option>
                  <option value="2025">2025年</option>
                  <option value="2024">2024年</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="w-full md:w-40 relative">
                <select className={`${inputClass} appearance-none pr-10`} defaultValue="dept">
                  <option value="dept">按部门</option>
                  <option value="user">按员工</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                </div>
              </div>

              <div className="w-full md:w-48 relative">
                <select className={`${inputClass} appearance-none pr-10`}>
                  <option value="">请选择部门</option>
                  <option value="1">销售一部</option>
                  <option value="2">销售二部</option>
                  <option value="3">技术支持部</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full md:w-56 relative">
                <select className={`${inputClass} appearance-none pr-10`}>
                  <option value="">选择部门或下属</option>
                  <option value="1">全公司</option>
                  <option value="2">销售一部</option>
                  <option value="3">销售二部</option>
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
            </>
          )}

          <div className="flex-1"></div>

          <button className="flex items-center px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 transition-all shadow-md active:scale-95">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            导出
          </button>
        </div>

        {/* 数据表格区域 */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col flex-1">
          <div className="overflow-x-auto custom-scrollbar flex-1">
            {activeTab === '销售分析' ? (
              <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
                <thead className="bg-slate-50 sticky top-0 z-20">
                  <tr>
                    {salesAnalysisHeaders.map((header, idx) => (
                      <th 
                        key={header} 
                        className={`
                          px-6 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50
                          ${idx === 0 ? 'sticky left-0 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.05)]' : ''}
                          ${header === '赢单总金额' ? 'text-right' : ''}
                        `}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-50">
                  {salesAnalysisData.map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800 sticky left-0 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-10">{row.员工姓名}</td>
                      <td className="px-6 py-4 text-slate-600 font-mono">{row.总数}</td>
                      <td className="px-6 py-4 text-slate-600 font-mono">{row.跟进中}</td>
                      <td className="px-6 py-4 text-emerald-600 font-bold font-mono">{row.赢单数}</td>
                      <td className="px-6 py-4 text-rose-600 font-bold font-mono">{row.输单数}</td>
                      <td className="px-6 py-4 text-slate-400 font-mono">{row.无效数}</td>
                      <td className="px-6 py-4 text-right font-black text-slate-900 font-mono">¥{row.赢单总金额}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50/80 font-black text-slate-700 sticky bottom-0 z-10 backdrop-blur-sm">
                  <tr>
                    <td className="px-6 py-4 border-t border-slate-200 sticky left-0 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-20 uppercase tracking-widest text-[10px]">总计</td>
                    <td className="px-6 py-4 border-t border-slate-200 font-mono">{salesAnalysisTotal.总数}</td>
                    <td className="px-6 py-4 border-t border-slate-200 font-mono">{salesAnalysisTotal.跟进中}</td>
                    <td className="px-6 py-4 border-t border-slate-200 font-mono text-emerald-700">{salesAnalysisTotal.赢单数}</td>
                    <td className="px-6 py-4 border-t border-slate-200 font-mono text-rose-700">{salesAnalysisTotal.输单数}</td>
                    <td className="px-6 py-4 border-t border-slate-200 font-mono">{salesAnalysisTotal.无效数}</td>
                    <td className="px-6 py-4 border-t border-slate-200 text-right font-black font-mono text-blue-700 text-sm">¥{salesAnalysisTotal.赢单总金额}</td>
                  </tr>
                </tfoot>
              </table>
            ) : activeTab === '跟进客户与成交的更进客户分析' ? (
              <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
                <thead className="bg-slate-50 sticky top-0 z-20">
                  <tr>
                    {followUpHeaders.map((header, idx) => (
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
                  {followUpData.map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-4 py-4 font-bold text-slate-800 sticky left-0 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-10">{row.名称}</td>
                      {row.months.map((m, mIdx) => (
                        <td key={mIdx} className="px-4 py-4 text-slate-600 font-mono text-center">{m}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50/80 font-black text-slate-700 sticky bottom-0 z-10 backdrop-blur-sm">
                  <tr>
                    <td className="px-4 py-4 border-t border-slate-200 sticky left-0 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-20 uppercase tracking-widest text-[10px]">总计</td>
                    {followUpTotals.map((t, idx) => (
                      <td key={idx} className="px-4 py-4 border-t border-slate-200 text-center font-mono">{t}</td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            ) : activeTab === '人员效能' ? (
              <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
                <thead className="bg-slate-50 sticky top-0 z-20">
                  <tr>
                    {personnelEfficiencyHeaders.map((header, idx) => (
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
                  {personnelEfficiencyData.map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-4 py-4 font-bold text-slate-800 sticky left-0 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-10">{row.员工姓名}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.合同数量}</td>
                      <td className="px-4 py-4 text-slate-400 text-right italic">{row.最大金额 || '--'}</td>
                      <td className="px-4 py-4 text-slate-400 text-right italic">{row.最小金额 || '--'}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.平均金额}</td>
                      <td className="px-4 py-4 text-slate-400 text-right italic">{row.最长周期 || '--'}</td>
                      <td className="px-4 py-4 text-slate-400 text-right italic">{row.最短周期 || '--'}</td>
                      <td className="px-4 py-4 text-slate-400 text-right italic">{row.平均周期 || '--'}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50/80 font-black text-slate-700 sticky bottom-0 z-10 backdrop-blur-sm">
                  <tr>
                    <td className="px-4 py-4 border-t border-slate-200 sticky left-0 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-20 uppercase tracking-widest text-[10px]">总计</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right">--</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right">--</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right">--</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right">--</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right">--</td>
                  </tr>
                </tfoot>
              </table>
            ) : activeTab === '业绩目标完成情况统计' ? (
              <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
                <thead className="bg-slate-50 sticky top-0 z-20">
                  <tr>
                    {targetStatsHeaders.map((header, idx) => (
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
                <tbody className="bg-white">
                  <tr>
                    <td colSpan={targetStatsHeaders.length} className="px-6 py-32 text-center text-slate-400 italic bg-white">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                          <SearchIcon className="h-8 w-8 text-slate-200" />
                        </div>
                        <p className="text-sm font-medium tracking-widest uppercase">暂无数据</p>
                        <p className="text-[10px] text-slate-300 font-normal">当前筛选条件下暂无目标完成统计记录</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : activeTab === '成交客户分析' ? (
              <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
                <thead className="bg-slate-50 sticky top-0 z-20">
                  <tr>
                    {customerAnalysisHeaders.map((header, idx) => (
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
                <tbody className="bg-white divide-y divide-slate-100">
                  {customerAnalysisData.map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-4 py-4 font-bold text-slate-800 sticky left-0 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-10">{row.员工姓名}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.线索数}</td>
                      <td className="px-4 py-4 text-slate-400 text-center italic">{row.线索转化率 || '--'}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.客户数}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.成交客户数}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.客户成交率}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.商机数}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.赢单商机数}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.商机赢单率}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.合同总金额}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.回款总金额}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.未回款金额}</td>
                      <td className="px-4 py-4 text-slate-400 text-center italic">{row.回款比例 || '--'}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.开票总金额}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.首次成交客户数}</td>
                      <td className="px-4 py-4 text-slate-600 text-right font-mono">{row.再次成交客户数}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50/80 font-black text-slate-700 sticky bottom-0 z-10 backdrop-blur-sm">
                  <tr>
                    <td className="px-4 py-4 border-t border-slate-200 sticky left-0 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-20 uppercase tracking-widest text-[10px]">总计</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-center">--</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">1</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0%</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">1</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0%</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-center">--</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0</td>
                    <td className="px-4 py-4 border-t border-slate-200 text-right font-mono">0</td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center py-40">
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs italic">Analytics Module Loading...</p>
              </div>
            )}
          </div>
          
          {/* 底部信息区域 (分页) */}
          <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <div className="flex items-center space-x-6">
              <span>共 <span className="font-bold text-slate-800">
                {activeTab === '销售分析' ? salesAnalysisData.length : 
                 activeTab === '跟进客户与成交的更进客户分析' ? followUpData.length : 
                 (activeTab === '成交客户分析' || activeTab === '人员效能' ? 1 : 0)}
              </span> 条</span>
              <div className="flex items-center space-x-2">
                <select className="border border-slate-200 rounded px-2 py-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>20条/页</option>
                  <option>50条/页</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
               <span>页码：<span className="font-bold text-blue-600">1</span></span>
               <div className="flex space-x-1 ml-4">
                  <button disabled className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-300 cursor-not-allowed">上一页</button>
                  <button disabled className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-300 cursor-not-allowed">下一页</button>
               </div>
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
