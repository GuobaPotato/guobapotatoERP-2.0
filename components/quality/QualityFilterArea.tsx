
import React, { useState } from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

export const QualityFilterArea: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white border-b border-slate-200">
      {/* 快速搜索栏 */}
      <div className="px-6 py-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-slate-400" />
            </div>
            <input 
                type="text" 
                placeholder="请输入质检单号/产品型号/客户名称/批次号"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-500 transition shadow-inner"
            />
        </div>
        <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors"
        >
            {isCollapsed ? '展开筛选' : '收起筛选'}
            <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* 高级过滤面板 */}
      <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'max-h-0' : 'max-h-[500px] pb-6'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">质检类型</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500">
                    <option value="">全部类型</option>
                    <option value="incoming_material">来料质检</option>
                    <option value="process">生产品控</option>
                    <option value="finished_product">成品质检</option>
                    <option value="delivery">出货质检</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">质检状态</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500">
                    <option value="">全部状态</option>
                    <option value="pending">待质检</option>
                    <option value="checking">质检中</option>
                    <option value="approved">已通过</option>
                    <option value="rejected">已驳回</option>
                    <option value="invalid">已作废</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">产品类别</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500">
                    <option value="">全部类别</option>
                    <option value="infrared_switch">红外线感应开关</option>
                    <option value="infrared_module">红外线感应模块</option>
                    <option value="infrared_sensor">红外线感应传感器</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">时间跨度</label>
                <div className="flex items-center gap-2">
                    <input type="date" className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                    <span className="text-slate-300">-</span>
                    <input type="date" className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-sm" />
                </div>
            </div>
        </div>
        <div className="flex justify-end mt-4 pt-4 border-t border-slate-100">
             <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800">重置</button>
             <button className="ml-2 px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 transition shadow-md">查询</button>
        </div>
      </div>
    </div>
  );
};
