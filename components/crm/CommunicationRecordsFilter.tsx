
import React from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { CalendarIcon } from '../icons/CalendarIcon';

export const CommunicationRecordsFilter: React.FC = () => {
  const inputClass = "block w-full px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm";

  return (
    <div className="p-4 px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-slate-50/30 border-b border-slate-200">
      {/* 客户选择 */}
      <div className="relative">
        <select className={`${inputClass} appearance-none pr-10`}>
          <option value="">客户</option>
          <option value="1">科勒</option>
          <option value="2">摩恩</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>

      {/* 沟通类型 */}
      <div className="relative">
        <select className={`${inputClass} appearance-none pr-10`}>
          <option value="">请选择沟通类型</option>
          <option value="call">电话</option>
          <option value="email">邮件</option>
          <option value="visit">拜访</option>
          <option value="chat">即时通讯</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>

      {/* 部门或下属 */}
      <div className="relative">
        <select className={`${inputClass} appearance-none pr-10`}>
          <option value="">选择部门或下属</option>
          <option value="sales1">销售一部</option>
          <option value="sales2">销售二部</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>

      {/* 搜索框 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="搜索关键词"
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white text-sm placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
        />
      </div>

      {/* 日期选择 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <CalendarIcon className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          readOnly
          placeholder="开始日期 - 结束日期"
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white text-sm text-slate-500 focus:ring-1 focus:ring-blue-500 shadow-sm cursor-pointer"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
