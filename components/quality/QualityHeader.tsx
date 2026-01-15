
import React from 'react';
import { CheckIcon } from '../icons/CheckIcon';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ArrowDownTrayIcon } from '../icons/ArrowDownTrayIcon';
import { PrinterIcon } from '../icons/PrinterIcon';
import { PlusIcon } from '../icons/PlusIcon';

interface QualityHeaderProps {
  onCreateClick: () => void;
}

export const QualityHeader: React.FC<QualityHeaderProps> = ({ onCreateClick }) => {
  return (
    <div className="px-6 pt-5 pb-4 border-b border-slate-200 bg-white">
      {/* 面包屑 */}
      <nav className="flex mb-4 text-xs font-medium text-slate-400" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>首页</li>
          <li className="flex items-center space-x-2">
            <span className="mx-1">/</span>
            <span>质检管理</span>
          </li>
          <li className="flex items-center space-x-2 text-slate-600">
            <span className="mx-1">/</span>
            <span>质检列表</span>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">质检列表</h1>
          <p className="text-sm text-slate-500 mt-1">管理并监控红外传感器全生产链路的质检流程</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* 批量操作区 */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button title="批量通过" className="p-2 text-green-600 hover:bg-white rounded-md transition-all">
                <CheckIcon className="h-5 w-5" />
            </button>
            <button title="批量驳回" className="p-2 text-red-600 hover:bg-white rounded-md transition-all">
                <XMarkIcon className="h-5 w-5" />
            </button>
            <button title="导出Excel" className="p-2 text-blue-600 hover:bg-white rounded-md transition-all">
                <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
            <button title="批量打印报告" className="p-2 text-slate-600 hover:bg-white rounded-md transition-all">
                <PrinterIcon className="h-5 w-5" />
            </button>
          </div>

          <button 
            onClick={onCreateClick}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-bold text-sm transition-all shadow-md active:scale-95"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            创建质检单
          </button>
        </div>
      </div>
    </div>
  );
};
