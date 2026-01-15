
import React, { useState } from 'react';
import { XMarkIcon } from '../components/icons/XMarkIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { PencilSquareIcon } from '../components/icons/PencilSquareIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { APPROVAL_FLOW_DATA } from '../constants';
import { FlowCategory, FlowStatus } from '../types';
import { CreateApprovalFlowModal } from '../components/approval/CreateApprovalFlowModal';

export const ApprovalFlowManagementPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // 列表筛选状态
  const [filters, setFilters] = useState({
    code: '',
    name: '',
    category: '全部' as FlowCategory,
    status: '全部' as FlowStatus | '全部'
  });

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full">
      {/* 顶部标题栏 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <h1 className="text-xl font-bold text-slate-800">审批流管理</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            导出配置
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            新建审批流
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-8 flex-1 flex flex-col min-h-0">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-full">
          {/* 筛选条 */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">流程编码</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-4 w-4 text-slate-300" />
                   </div>
                   <input 
                    type="text" 
                    placeholder="精确查询"
                    className={`${inputClass} pl-10`}
                    value={filters.code}
                    onChange={(e) => setFilters({...filters, code: e.target.value})}
                   />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">流程名称</label>
                <input 
                  type="text" 
                  placeholder="模糊查询"
                  className={inputClass}
                  value={filters.name}
                  onChange={(e) => setFilters({...filters, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">流程分类</label>
                <select 
                  className={inputClass}
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value as FlowCategory})}
                >
                  <option value="全部">全部</option>
                  <option value="采购类">采购类</option>
                  <option value="仓储类">仓储类</option>
                  <option value="销售类">销售类</option>
                  <option value="人事类">人事类</option>
                  <option value="财务类">财务类</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">状态</label>
                <select 
                  className={inputClass}
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value as any})}
                >
                  <option value="全部">全部</option>
                  <option value="启用">启用</option>
                  <option value="停用">停用</option>
                </select>
              </div>
            </div>
          </div>

          {/* 表格 */}
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="min-w-full divide-y divide-slate-100 text-sm border-separate border-spacing-0">
              <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  {[
                    "流程编码", "流程名称", "流程分类", "审批类型", "限定条件", 
                    "层级", "节点", "最后修改人", "状态", "操作"
                  ].map((header, idx) => (
                    <th 
                      key={header} 
                      className={`px-4 py-4 text-left font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200 ${idx === 0 ? 'pl-6' : ''}`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {APPROVAL_FLOW_DATA.map((flow) => (
                  <tr key={flow.flowCode} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 pl-6 font-mono text-xs font-bold text-slate-800">{flow.flowCode}</td>
                    <td className="px-4 py-4 font-semibold text-slate-800">{flow.flowName}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        flow.flowCategory === '采购类' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        flow.flowCategory === '仓储类' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        'bg-purple-50 text-purple-600 border border-purple-100'
                      }`}>
                        {flow.flowCategory}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{flow.approvalType}</td>
                    <td className="px-4 py-4">
                      <div className="max-w-[150px] truncate text-xs text-slate-500 italic" title={flow.limitCondition}>
                        {flow.limitCondition}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-700 font-medium">{flow.approvalLevel}</td>
                    <td className="px-4 py-4 text-center">
                       <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs">
                          {flow.approvalNodeCount}
                       </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{flow.lastModifier}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${flow.status === '启用' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`}></div>
                        <span className={`text-xs font-bold ${flow.status === '启用' ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {flow.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 pr-6">
                      <div className="flex items-center space-x-2">
                        <button title="查看详情" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-md shadow-sm border border-transparent hover:border-blue-100 transition-all">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button title="编辑" className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-white rounded-md shadow-sm border border-transparent hover:border-amber-100 transition-all">
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                        <button title="复制" className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-md shadow-sm border border-transparent hover:border-indigo-100 transition-all">
                          <DocumentDuplicateIcon className="h-4 w-4" />
                        </button>
                        <div className="w-px h-4 bg-slate-100 mx-1"></div>
                        <button 
                          className={`text-xs font-bold transition-colors ${flow.status === '启用' ? 'text-red-500 hover:text-red-700' : 'text-emerald-500 hover:text-emerald-700'}`}
                        >
                          {flow.status === '启用' ? '停用' : '启用'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
             <div>共 <span className="font-bold text-slate-700">6</span> 条流程</div>
             <div className="flex items-center space-x-2">
                <button disabled className="p-2 bg-white border border-slate-200 rounded text-slate-300">上一页</button>
                <span className="px-3 py-1.5 bg-blue-600 text-white rounded font-bold shadow-sm shadow-blue-200">1</span>
                <button disabled className="p-2 bg-white border border-slate-200 rounded text-slate-300">下一页</button>
             </div>
          </div>
        </div>
      </div>

      {/* 新建审批流弹窗 */}
      <CreateApprovalFlowModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

// 缺少的图标
const DocumentDuplicateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
  </svg>
);
