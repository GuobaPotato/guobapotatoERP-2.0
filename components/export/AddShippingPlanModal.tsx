
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { PaperClipIcon } from '../icons/PaperClipIcon';
import { ArrowPathIcon } from '../icons/ArrowPathIcon';
import { SelectExportContractModal } from './SelectExportContractModal';

interface AddShippingPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = '出运计划' | '提单信息' | '唛头信息' | '操作记录' | '上传附件' | '出运明细';

export const AddShippingPlanModal: React.FC<AddShippingPlanModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('出运计划');
  const [show, setShow] = useState(false);
  const [isSelectContractOpen, setIsSelectContractOpen] = useState(false);
  const [selectedContractNo, setSelectedContractNo] = useState('');

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const TABS: TabType[] = ["出运计划", "提单信息", "唛头信息", "操作记录", "上传附件", "出运明细"];

  const inputClass = "mt-1 block w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all";
  const disabledInputClass = "mt-1 block w-full px-3 py-1.5 bg-slate-200 border border-slate-300 rounded text-xs shadow-sm text-slate-500 cursor-not-allowed";
  const labelClass = "block text-[11px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider";

  const renderShippingPlanTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 animate-in fade-in duration-300">
      {[
        { label: "出运单号", placeholder: "请输入内容" },
        { label: "出运日期", placeholder: "选择日期", type: "date" },
        { label: "外销合同", placeholder: "点击选择已生效合同", isSelectTrigger: true, value: selectedContractNo },
        { label: "我方编号", placeholder: "请输入内容" },
        { label: "我方名称", placeholder: "请输入内容", defaultValue: "众成贸易有限公司" },
        { label: "客户编号", placeholder: "请输入内容" },
        { label: "客户名称", placeholder: "请输入内容" },
        { label: "币别", placeholder: "请输入内容" },
        { label: "汇率", placeholder: "请输入数值", defaultValue: "0.0000" },
        { label: "成交方式", placeholder: "下拉选择：FOB/CIF等", isSelect: true },
        { label: "结汇方式", placeholder: "下拉选择：电汇/信用证等", isSelect: true },
        { label: "装船港", placeholder: "请输入内容" },
        { label: "目的港", placeholder: "请输入内容" },
        { label: "运输方式", placeholder: "下拉选择：海运/空运等", isSelect: true },
        { label: "交货日期", placeholder: "选择日期", type: "date" },
        { label: "货代编号", placeholder: "请输入内容" },
        { label: "货代名称", placeholder: "请输入内容" },
        { label: "预计ETD", placeholder: "选择日期", type: "date" },
        { label: "预计ETA", placeholder: "选择日期", type: "date" },
        { label: "报关行编号", placeholder: "请输入内容" },
        { label: "报关公司", placeholder: "请输入内容" },
        { label: "船公司", placeholder: "请输入内容" }
      ].map((field, idx) => (
        <div key={idx}>
          <label className={labelClass}>{field.label}</label>
          {field.isSelectTrigger ? (
             <div 
              onClick={() => setIsSelectContractOpen(true)}
              className={`${inputClass} !bg-white border-blue-300 cursor-pointer flex justify-between items-center group hover:border-blue-500`}
             >
                <span className={field.value ? 'text-blue-600 font-bold' : 'text-slate-400'}>{field.value || field.placeholder}</span>
                <ChevronDownIcon className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-500" />
             </div>
          ) : field.isSelect ? (
            <div className="relative">
              <select className={`${inputClass} appearance-none pr-8`}>
                <option value="">{field.placeholder}</option>
                {field.label === '成交方式' && ['FOB', 'CIF', 'EXW', 'DDP'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                 <ChevronDownIcon className="h-3 w-3 text-slate-400" />
              </div>
            </div>
          ) : (
            <input 
                type={field.type || "text"} 
                className={inputClass} 
                placeholder={field.placeholder} 
                defaultValue={field.defaultValue}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderBillOfLadingTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-in fade-in duration-300">
      {[
        { label: "提单收货人", placeholder: "请输入内容" },
        { label: "提单通知人", placeholder: "请输入内容" },
        { label: "运费价格", placeholder: "请输入数值", defaultValue: "0.00" },
        { label: "提单加注", placeholder: "请输入内容（如：感应配件需轻装轻卸）" }
      ].map((field, idx) => (
        <div key={idx}>
          <label className={labelClass}>{field.label}</label>
          <input type="text" className={inputClass} placeholder={field.placeholder} defaultValue={field.defaultValue} />
        </div>
      ))}
    </div>
  );

  const renderMarkInfoTab = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <label className={labelClass}>唛头信息</label>
        <textarea rows={4} className={`${inputClass} resize-none`} placeholder="请输入内容（如：企业编码/货名/标识）"></textarea>
      </div>
      <div>
        <label className={labelClass}>货物描述</label>
        <textarea rows={4} className={`${inputClass} resize-none`} placeholder="请输入内容（如：感应XX配件/材质/等级）"></textarea>
      </div>
    </div>
  );

  const renderOperationRecordTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
      {["更新时间", "更新人员代码", "更新人员名称", "创建时间", "创建人员代码", "创建人员名称"].map(h => (
        <div key={h}>
          <label className={labelClass}>{h}</label>
          <input type="text" disabled className={disabledInputClass} value="自动填充" />
        </div>
      ))}
    </div>
  );

  const renderAttachmentsTab = () => (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded text-xs font-bold hover:bg-indigo-700 shadow-md transition-all active:scale-95">
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
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer mb-8">
        <PaperClipIcon className="mx-auto h-10 w-10 text-slate-300 mb-3" />
        <p className="text-sm text-slate-500 font-medium">将文件拖到此处，或 <span className="text-indigo-600 font-bold underline">点击上传</span></p>
      </div>
      <div className="overflow-hidden border border-slate-200 rounded-lg">
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

  const renderShippingDetailsTab = () => (
    <div className="animate-in fade-in duration-300 h-full flex flex-col">
       <div className="flex-1 overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50 sticky top-0">
              <tr>
                {["#", "外销合同", "商品编号", "客户货号", "工厂货号", "中文货名", "单位", "出运数量", "销售单价", "销售金额"].map(h => (
                  <th key={h} className="px-4 py-4 text-left font-black text-slate-500 whitespace-nowrap uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              <tr>
                <td colSpan={10} className="px-6 py-20 text-center text-slate-400 italic">暂无数据</td>
              </tr>
            </tbody>
          </table>
       </div>
       <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200 flex justify-end space-x-12 items-center">
          <div className="flex items-center space-x-2">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">出运总量:</span>
             <span className="text-sm font-bold text-slate-800">0.00</span>
          </div>
          <div className="flex items-center space-x-2">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">销售总额:</span>
             <span className="text-sm font-black text-indigo-600">0.00</span>
          </div>
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
             <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase">出运计划-新增</h2>
             <div className="flex space-x-2">
                <div className="relative group">
                  <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                    调取 <ChevronDownIcon className="ml-1.5 h-3 w-3" />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-xl hidden group-hover:block z-50">
                     <div className="py-1">
                        <button className="block w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50">调取历史出运计划模板</button>
                     </div>
                  </div>
                </div>
                <button className="flex items-center px-8 py-2 bg-indigo-600 text-white rounded text-xs font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">保存</button>
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
                    ? 'border-indigo-600 text-indigo-600'
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
          {activeTab === '出运计划' && renderShippingPlanTab()}
          {activeTab === '提单信息' && renderBillOfLadingTab()}
          {activeTab === '唛头信息' && renderMarkInfoTab()}
          {activeTab === '操作记录' && renderOperationRecordTab()}
          {activeTab === '上传附件' && renderAttachmentsTab()}
          {activeTab === '出运明细' && renderShippingDetailsTab()}
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
            className="px-10 py-2.5 bg-slate-900 text-white rounded text-xs font-black hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95 uppercase tracking-widest"
          >
            保存并创建
          </button>
        </div>
      </div>

      {/* Select Export Contract Modal */}
      <SelectExportContractModal 
        isOpen={isSelectContractOpen}
        onClose={() => setIsSelectContractOpen(false)}
        onSelect={(no) => {
          setSelectedContractNo(no);
          setIsSelectContractOpen(false);
        }}
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
