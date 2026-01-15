
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { FilterIcon } from '../components/icons/FilterIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { DocumentCheckIcon } from '../components/icons/DocumentCheckIcon';
import { Cog6ToothIcon } from '../components/icons/Cog6ToothIcon';
import { APPROVAL_RECORDS_DATA } from '../constants';
import { Pagination } from '../components/Pagination';

export const ApprovalRecordsPage: React.FC = () => {
  const [activeFilterGroup, setActiveFilterGroup] = useState<string | null>('基础信息筛选');

  const stats = [
    { name: "本月审批总量", value: 128, unit: "条", trend: "环比上月+12%", color: "text-slate-800", bg: "bg-slate-50" },
    { name: "已通过审批", value: 96, unit: "条", passRate: "75%", color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "已驳回审批", value: 18, unit: "条", rejectRate: "14.1%", color: "text-rose-600", bg: "bg-rose-50" },
    { name: "已撤销审批", value: 14, unit: "条", revokeRate: "10.9%", color: "text-amber-600", bg: "bg-amber-50" },
    { name: "审批归档率", value: 68, unit: "%", trend: "环比上月+5%", color: "text-blue-600", bg: "bg-blue-50" },
  ];

  const inputClass = "block w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 顶部标题栏 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight flex items-center">
            <DocumentCheckIcon className="h-5 w-5 mr-2 text-blue-600" />
            审批记录查询总览
          </h1>
          <p className="text-xs text-slate-400 mt-1">全局审批数据管理中心，支持全维度筛选、统计与归档</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95">
            <ChartBarIcon className="h-4 w-4 mr-2" />
            数据统计报表
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            批量导出
          </button>
          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all" title="刷新数据">
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* 数据概览区 */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.bg} rounded-xl p-5 border border-white shadow-sm flex flex-col justify-between transition-transform hover:-translate-y-1`}>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.name}</span>
              <div className="mt-3 flex items-baseline space-x-1">
                <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                <span className="text-xs text-slate-400 font-bold">{stat.unit}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] font-bold">
                {stat.trend && <span className="text-slate-400">{stat.trend}</span>}
                {stat.passRate && <span className="text-emerald-600">通过率: {stat.passRate}</span>}
                {stat.rejectRate && <span className="text-rose-600">驳回率: {stat.rejectRate}</span>}
                {stat.revokeRate && <span className="text-amber-600">撤销率: {stat.revokeRate}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* 多维度筛选区 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {['基础信息筛选', '组织架构筛选', '状态与时间筛选'].map((group) => (
              <button
                key={group}
                onClick={() => setActiveFilterGroup(activeFilterGroup === group ? null : group)}
                className={`px-6 py-3 text-xs font-black uppercase tracking-widest flex items-center transition-colors border-r border-slate-100 last:border-0 ${activeFilterGroup === group ? 'bg-white text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                {group}
                <ChevronDownIcon className={`ml-2 h-3 w-3 transition-transform ${activeFilterGroup === group ? 'rotate-180' : ''}`} />
              </button>
            ))}
          </div>

          <div className={`px-6 overflow-hidden transition-all duration-300 ${activeFilterGroup ? 'max-h-[300px] py-6' : 'max-h-0'}`}>
            {activeFilterGroup === '基础信息筛选' && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">审批ID</label>
                  <input type="text" className={inputClass} placeholder="输入SPID..." />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">审批名称</label>
                  <input type="text" className={inputClass} placeholder="模糊搜索..." />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">审批单号</label>
                  <input type="text" className={inputClass} placeholder="采购/入库单号..." />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">审批类型</label>
                  <select className={inputClass}>
                    <option>全部</option>
                    <option>采购审批</option>
                    <option>入库单审批</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">关联业务</label>
                  <select className={inputClass}>
                    <option>全部</option>
                    <option>采购订单</option>
                    <option>入库单</option>
                  </select>
                </div>
              </div>
            )}

            {activeFilterGroup === '组织架构筛选' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">发起部门</label>
                  <select className={inputClass}>
                    <option>全部</option>
                    <option>采购部</option>
                    <option>销售部</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">发起人</label>
                  <input type="text" className={inputClass} placeholder="选择人员..." />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">最终审批人</label>
                  <input type="text" className={inputClass} placeholder="选择人员..." />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">审批参与人</label>
                  <input type="text" className={inputClass} placeholder="选择人员..." />
                </div>
              </div>
            )}

            {activeFilterGroup === '状态与时间筛选' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">最终结果</label>
                  <select className={inputClass}>
                    <option>全部</option>
                    <option>已通过</option>
                    <option>已驳回</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">归档状态</label>
                  <select className={inputClass}>
                    <option>全部</option>
                    <option>已归档</option>
                    <option>未归档</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase">发起时间</label>
                  <div className="flex items-center space-x-2">
                    <input type="date" className={inputClass} />
                    <span className="text-slate-300">-</span>
                    <input type="date" className={inputClass} />
                  </div>
                </div>
                <div className="flex items-end space-x-2">
                   <button className="flex-1 bg-slate-800 text-white text-[10px] font-black uppercase py-2 rounded-lg hover:bg-slate-900 transition-colors">检索记录</button>
                   <button className="flex-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase py-2 rounded-lg hover:bg-slate-200 transition-colors">重置</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 功能操作区 */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all flex items-center shadow-sm">
             批量归档
          </button>
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all flex items-center shadow-sm">
             解除归档
          </button>
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all flex items-center shadow-sm">
             审批日志导出
          </button>
          <div className="flex-1"></div>
          <button className="px-3 py-2 bg-white border border-slate-300 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all flex items-center shadow-sm">
             <Cog6ToothIcon className="h-4 w-4 mr-1.5 text-slate-400" />
             自定义列
          </button>
        </div>

        {/* 审批记录列表区 */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full">
          <div className="overflow-x-auto no-scrollbar">
            <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-4 pl-6 text-left border-b border-slate-200 bg-slate-50">
                    <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600" />
                  </th>
                  {[
                    "序号", "审批ID", "审批名称", "审批类型", "审批单号", 
                    "发起部门", "发起人", "审批金额(元)", 
                    "最终审批人", "最终结果", "发起时间", "归档状态", "操作"
                  ].map((h, i) => (
                    <th key={h} className={`px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50 ${i === 1 ? 'sticky left-0 shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-20' : ''}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {APPROVAL_RECORDS_DATA.map((record) => (
                  <tr key={record.approvalId} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 pl-6 border-b border-slate-50">
                      <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600" />
                    </td>
                    <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50">{record.serialNo}</td>
                    <td className="px-4 py-4 font-mono font-bold text-blue-600 hover:underline cursor-pointer whitespace-nowrap sticky left-0 bg-white group-hover:bg-blue-50/0 border-b border-slate-50 shadow-[2px_0_5px_rgba(0,0,0,0.05)] z-10">
                      {record.approvalId}
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-800 whitespace-nowrap border-b border-slate-50">{record.approvalName}</td>
                    <td className="px-4 py-4 whitespace-nowrap border-b border-slate-50">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">{record.approvalType}</span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 font-mono whitespace-nowrap border-b border-slate-50">{record.approvalNo}</td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap border-b border-slate-50">{record.initiateDept}</td>
                    <td className="px-4 py-4 font-semibold text-slate-700 whitespace-nowrap border-b border-slate-50">{record.initiator}</td>
                    <td className="px-4 py-4 font-mono text-slate-800 font-black border-b border-slate-50">
                      {/* Fixed: Comparison logic to avoid number/string mismatch error */}
                      {typeof record.approvalAmount === 'number' ? `¥${record.approvalAmount.toLocaleString()}` : '——'}
                    </td>
                    <td className="px-4 py-4 text-slate-600 whitespace-nowrap border-b border-slate-50">{record.finalApprover}</td>
                    <td className="px-4 py-4 whitespace-nowrap border-b border-slate-50">
                      <span className={`px-2.5 py-1 rounded-full font-black text-[10px] border ${
                        record.finalResult === '已通过' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        record.finalResult === '已驳回' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                        'bg-slate-50 text-slate-500 border-slate-200'
                      }`}>
                        {record.finalResult}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 whitespace-nowrap border-b border-slate-50">{record.initiateTime}</td>
                    <td className="px-4 py-4 whitespace-nowrap border-b border-slate-50">
                      <div className="flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${record.archiveStatus === '已归档' ? 'bg-slate-400' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'}`}></div>
                        <span className={`font-bold ${record.archiveStatus === '已归档' ? 'text-slate-400' : 'text-blue-600'}`}>{record.archiveStatus}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 pr-6 border-b border-slate-50 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="详情">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded" title="日志">
                          <DocumentCheckIcon className="h-4 w-4" />
                        </button>
                        <button className={`text-[10px] font-black uppercase px-2 py-0.5 rounded transition-colors ${
                          record.archiveStatus === '已归档' ? 'text-indigo-600 hover:bg-indigo-50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                        }`}>
                          {record.archiveStatus === '已归档' ? '解除' : '归档'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
             <Pagination dataSource={APPROVAL_RECORDS_DATA} />
          </div>
        </div>

        {/* 额外按钮区 */}
        <div className="flex space-x-3 justify-end">
           <button className="px-6 py-2 bg-slate-200 text-slate-600 text-[10px] font-black uppercase rounded-lg hover:bg-slate-300 transition-all">导出当前页</button>
           <button className="px-6 py-2 bg-slate-200 text-slate-600 text-[10px] font-black uppercase rounded-lg hover:bg-slate-300 transition-all">打印当前页</button>
        </div>
      </div>
    </div>
  );
};

// 缺少的内部图标组件
const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);
