
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { Cog6ToothIcon } from '../components/icons/Cog6ToothIcon';
import { MY_APPROVALS_DATA } from '../constants';
import { ApprovalStatus } from '../types';
import { ApprovalDetailView } from '../components/approval/ApprovalDetailView';

export const MyApprovalsPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const statusColorMap: Record<ApprovalStatus, string> = {
    '待我审批': 'bg-blue-50 text-blue-700 border-blue-100',
    '已驳回': 'bg-red-50 text-red-700 border-red-100',
    '已撤销': 'bg-slate-50 text-slate-500 border-slate-200',
    '已完成': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    '审批中': 'bg-yellow-50 text-yellow-700 border-yellow-100',
    '全部': 'bg-slate-50 text-slate-600 border-slate-200'
  };

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition";

  if (selectedId) {
    return (
      <ApprovalDetailView 
        approvalId={selectedId} 
        onBack={() => setSelectedId(null)} 
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full animate-in fade-in duration-300">
      {/* 顶部标题栏 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">我的审批</h1>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            批量操作
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Cog6ToothIcon className="h-4 w-4 mr-2" />
            自定义列
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-8 flex-1 flex flex-col min-h-0">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-full">
          
          {/* 筛选区域 */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">审批类型</label>
                <select className={inputClass}>
                  <option value="全部">全部类型</option>
                  <option value="采购审批">采购审批</option>
                  <option value="入库单审批">入库单审批</option>
                  <option value="库存盘点审批">库存盘点审批</option>
                  <option value="合同审批">合同审批</option>
                  <option value="报价单审批">报价单审批</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">审批状态</label>
                <select className={inputClass}>
                  <option value="全部">全部状态</option>
                  <option value="待我审批">待我审批</option>
                  <option value="审批中">审批中</option>
                  <option value="已完成">已完成</option>
                  <option value="已驳回">已驳回</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">时间范围</label>
                <select className={inputClass} defaultValue="近30天">
                  <option value="今日">今日</option>
                  <option value="近7天">近7天</option>
                  <option value="近30天">近30天</option>
                  <option value="本季">本季</option>
                  <option value="自定义">自定义</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">搜索</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-slate-300" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="审批名称/发起人"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 表格区域 */}
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="min-w-full divide-y divide-slate-100 text-sm border-separate border-spacing-0">
              <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  <th className="px-4 py-4 pl-6 text-left font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200">序号</th>
                  <th className="px-4 py-4 text-left font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200">审批ID</th>
                  <th className="px-4 py-4 text-left font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200">审批类型</th>
                  <th className="px-4 py-4 text-left font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200">审批名称</th>
                  <th className="px-4 py-4 text-left font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200">发起时间</th>
                  <th className="px-4 py-4 text-left font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200">发起人</th>
                  <th className="px-4 py-4 text-left font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200">部门</th>
                  <th className="px-4 py-4 text-left font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200">当前节点</th>
                  <th className="px-4 py-4 text-left font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200">状态</th>
                  <th className="px-4 py-4 text-left font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200">截止时间</th>
                  <th className="px-4 py-4 pr-6 text-center font-bold text-slate-500 uppercase tracking-tight border-b border-slate-200">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {MY_APPROVALS_DATA.map((item) => (
                  <tr key={item.approvalId} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 pl-6 text-slate-400 font-mono">{item.serialNo}</td>
                    <td className="px-4 py-4 font-medium text-blue-600 cursor-pointer hover:underline" onClick={() => setSelectedId(item.approvalId)}>{item.approvalId}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-xs font-medium text-slate-600 px-2 py-0.5 bg-slate-100 rounded">
                        {item.approvalType}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-800">{item.approvalName}</td>
                    <td className="px-4 py-4 text-slate-500 text-xs">{item.initiateTime}</td>
                    <td className="px-4 py-4 text-slate-700">{item.initiator}</td>
                    <td className="px-4 py-4 text-slate-600">{item.department}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center text-slate-600">
                        <div className="w-1 h-3 bg-indigo-400 mr-2 rounded-full"></div>
                        {item.currentNode}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusColorMap[item.approvalStatus]}`}>
                        {item.approvalStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 font-mono text-xs">{item.estimatedFinishTime}</td>
                    <td className="px-4 py-4 pr-6 text-center">
                      <div className="flex justify-center space-x-2">
                        {item.approvalStatus === '待我审批' ? (
                          <button 
                            onClick={() => setSelectedId(item.approvalId)}
                            className="px-5 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95 shadow-blue-100"
                          >
                            审批
                          </button>
                        ) : item.approvalStatus === '已驳回' ? (
                          <button className="px-5 py-1 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition-all shadow-md active:scale-95 shadow-amber-100">
                            重发
                          </button>
                        ) : (
                          <button 
                            onClick={() => setSelectedId(item.approvalId)}
                            className="px-5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-all active:scale-95"
                          >
                            查看
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页区域 */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
             <div>
               显示 1 到 7 条，共 <span className="font-bold text-slate-700">7</span> 条记录
             </div>
             <div className="flex items-center space-x-2">
                <button disabled className="p-2 bg-white border border-slate-200 rounded text-slate-300">上一页</button>
                <span className="px-3 py-1.5 bg-blue-600 text-white rounded font-bold shadow-sm">1</span>
                <button disabled className="p-2 bg-white border border-slate-200 rounded text-slate-300">下一页</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
