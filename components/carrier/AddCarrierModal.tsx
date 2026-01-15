
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { PaperClipIcon } from '../icons/PaperClipIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { TrashIcon } from '../icons/TrashIcon';

interface AddCarrierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = '承运商维护' | '操作记录' | '上传附件' | '承运商联系人表' | '承运商银行表';

export const AddCarrierModal: React.FC<AddCarrierModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('承运商维护');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const TABS: TabType[] = ["承运商维护", "操作记录", "上传附件", "承运商联系人表", "承运商银行表"];

  const inputClass = "mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const disabledInputClass = "mt-1 block w-full px-3 py-2 bg-slate-200 border border-slate-300 rounded text-xs shadow-sm text-slate-500 cursor-not-allowed";
  const labelClass = "block text-[11px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider";

  const renderMaintenanceTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 animate-in fade-in duration-300">
      {[
        { label: "承运商编号", placeholder: "请输入内容" },
        { label: "承运商简称", placeholder: "请输入内容" },
        { label: "承运商名称", placeholder: "请输入内容" },
        { label: "地址", placeholder: "请输入内容" },
        { label: "电话", placeholder: "请输入内容" },
        { label: "网址", placeholder: "请输入内容" },
        { label: "经营范围", placeholder: "请输入内容" },
        { label: "纳税人识别号", placeholder: "请输入内容" }
      ].map((field, idx) => (
        <div key={idx}>
          <label className={labelClass}>{field.label}</label>
          <input type="text" className={inputClass} placeholder={field.placeholder} />
        </div>
      ))}
    </div>
  );

  const renderOperationRecordsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 animate-in fade-in duration-300">
      <div>
        <label className={labelClass}>更新时间</label>
        <input type="date" disabled className={disabledInputClass} />
      </div>
      <div>
        <label className={labelClass}>更新人代码</label>
        <input type="text" className={inputClass} placeholder="请输入内容" />
      </div>
      <div>
        <label className={labelClass}>更新人名称</label>
        <input type="text" className={inputClass} placeholder="请输入内容" />
      </div>
      <div>
        <label className={labelClass}>创建时间</label>
        <input type="date" disabled className={disabledInputClass} />
      </div>
      <div>
        <label className={labelClass}>创建人代码</label>
        <input type="text" className={inputClass} placeholder="请输入内容" />
      </div>
      <div>
        <label className={labelClass}>创建人名称</label>
        <input type="text" className={inputClass} placeholder="请输入内容" />
      </div>
      <div>
        <label className={labelClass}>模块编号</label>
        <input type="text" disabled className={disabledInputClass} value="4" />
      </div>
    </div>
  );

  const renderAttachmentsTab = () => (
    <div className="animate-in fade-in duration-300">
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer mb-8">
        <PaperClipIcon className="mx-auto h-10 w-10 text-slate-300 mb-3" />
        <p className="text-sm text-slate-500 font-medium">将文件拖到此处，或 <span className="text-blue-600 font-bold underline">点击上传</span></p>
      </div>
      <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-xs">
          <thead className="bg-slate-50">
            <tr>
              {["序号", "附件名称", "缩略图", "创建人", "创建时间", "操作"].map(h => (
                <th key={h} className="px-6 py-3 text-left font-black text-slate-500 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td colSpan={6} className="px-6 py-16 text-center text-slate-400 italic">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContactsTab = () => (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95">
            <PlusIcon className="h-3 w-3 mr-1.5"/> 新增
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-rose-600 rounded text-xs font-bold hover:bg-rose-50 shadow-sm transition-all">
            <TrashIcon className="h-3 w-3 mr-1.5"/> 批量删除
          </button>
        </div>
        <button className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center transition-colors">
          取消筛选 <span className="ml-1 text-emerald-500 font-black">√</span>
        </button>
      </div>
      <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-xs">
          <thead className="bg-slate-50">
            <tr>
              {["#", "复选框", "联系人 ↑↓", "电话 ↑↓", "传真 ↑↓", "邮箱 ↑↓", "性别 ↑↓", "生日 ↑↓", "操作"].map((h, i) => (
                <th key={h} className="px-6 py-4 text-left font-black text-slate-500 whitespace-nowrap">
                  {i === 1 ? <input type="checkbox" className="h-3 w-3 rounded" /> : h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td colSpan={9} className="px-6 py-20 text-center text-slate-400 italic">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div 
      className={`fixed inset-0 z-[60] flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog" aria-modal="true" onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-[1100px] h-[85vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-slate-200 bg-slate-50/50 rounded-t-2xl">
          <div className="flex items-center space-x-6">
             <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase">新增承运商档案</h2>
             <div className="flex space-x-2">
                <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95">保存</button>
             </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors hover:bg-white shadow-sm border border-transparent hover:border-slate-100">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-8 bg-white border-b border-slate-100 sticky top-0 z-10">
          <nav className="flex space-x-8 overflow-x-auto no-scrollbar" aria-label="Modal Tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap pt-5 pb-4 px-1 border-b-2 font-black text-xs tracking-widest uppercase transition-all
                  ${activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200'}
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/20 custom-scrollbar">
          {activeTab === '承运商维护' && renderMaintenanceTab()}
          {activeTab === '操作记录' && renderOperationRecordsTab()}
          {activeTab === '上传附件' && renderAttachmentsTab()}
          {activeTab === '承运商联系人表' && renderContactsTab()}
          {activeTab === '承运商银行表' && (
            <div className="flex flex-col items-center justify-center py-24 text-slate-300 italic animate-pulse">
                <p className="text-sm font-black uppercase tracking-widest">银行账户关联模块开发中</p>
                <p className="text-[10px] mt-2">暂无银行账户关联信息</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 px-8 py-5 border-t border-slate-200 bg-white rounded-b-2xl">
          <button 
            onClick={onClose} 
            className="px-8 py-2.5 bg-white border border-slate-300 rounded text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="px-10 py-2.5 bg-slate-900 text-white rounded text-xs font-black hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95 uppercase tracking-widest"
          >
            确定并创建
          </button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
