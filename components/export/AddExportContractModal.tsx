
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ArrowPathIcon } from '../icons/ArrowPathIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { PaperClipIcon } from '../icons/PaperClipIcon';

interface AddExportContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = '外箱合同' | '成本预估' | '操作记录' | '外箱条款' | '上传附件' | '外箱合同明细' | '外箱费用明细';

export const AddExportContractModal: React.FC<AddExportContractModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('外箱合同');
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

  const TABS: TabType[] = ["外箱合同", "成本预估", "操作记录", "外箱条款", "上传附件", "外箱合同明细", "外箱费用明细"];

  const inputClass = "mt-1 block w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const labelClass = "block text-[11px] font-bold text-slate-500 mb-0.5";

  const renderContractTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 animate-in fade-in duration-300">
      {[
        { label: "外箱合同号", value: "请输入内容" },
        { label: "合同日期", value: "2025-01-09", type: "date" },
        { label: "报价单号", value: "请输入内容" },
        { label: "订单类型", value: "请选择", isSelect: true },
        { label: "我方名称", value: "请输入内容" },
        { label: "客户编号", value: "请输入内容" },
        { label: "客户名称", value: "请输入内容" },
        { label: "客户联系人", value: "请输入内容" },
        { label: "联系人邮箱", value: "请输入内容" },
        { label: "币别", value: "请输入内容" },
        { label: "汇率", value: "0.0000" },
        { label: "成交方式", value: "请选择", isSelect: true },
        { label: "结汇方式", value: "请选择", isSelect: true },
        { label: "装运港", value: "请选择", isSelect: true },
        { label: "目的港", value: "请选择", isSelect: true },
        { label: "运输方式", value: "请选择", isSelect: true },
        { label: "运输条款", value: "请输入内容" },
        { label: "交货日期", value: "", type: "date" },
        { label: "箱型", value: "请选择", isSelect: true },
        { label: "退税装", value: "请输入内容" },
        { label: "业务员编号", value: "请输入内容" },
        { label: "业务员名称", value: "请输入内容" },
        { label: "采购人员", value: "请输入内容" },
        { label: "客户订单号", value: "请输入内容" },
        { label: "外箱备注", value: "请输入内容", isFull: true },
        { label: "海外公司", value: "请选择", isSelect: true }
      ].map((field, idx) => (
        <div key={idx} className={field.isFull ? "md:col-span-2 lg:col-span-4" : ""}>
          <label className={labelClass}>{field.label}</label>
          {field.isSelect ? (
            <select className={inputClass}>
              <option>{field.value}</option>
            </select>
          ) : (
            <input type={field.type || "text"} className={inputClass} placeholder={field.value} />
          )}
        </div>
      ))}
    </div>
  );

  const renderCostTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
      {[
        "销售收入", "销售收入CNY", "采购成本CNY", "费用合计CNY", "退税金额CNY", 
        "折扣比例", "折扣金额", "明佣比例", "明佣金额", "暗佣比例", 
        "暗佣金额", "预估利润率%", "预估利润"
      ].map((item, idx) => (
        <div key={idx}>
          <label className={labelClass}>{item}</label>
          <div className="relative">
            <input type="text" className={`${inputClass} text-right font-mono bg-white`} defaultValue="0.00" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTermsTab = () => (
    <div className="animate-in fade-in duration-300 space-y-4">
      <div className="max-w-md">
        <label className={labelClass}>收款模板</label>
        <select className={inputClass}>
          <option>请选择收款模板</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>条款详情内容</label>
        <textarea rows={10} className={`${inputClass} resize-none`} placeholder="请输入内容"></textarea>
      </div>
    </div>
  );

  const renderAttachmentsTab = () => (
    <div className="animate-in fade-in duration-300">
      <div className="border-2 border-dashed border-slate-200 rounded-lg p-10 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer mb-6">
        <PaperClipIcon className="mx-auto h-8 w-8 text-slate-300 mb-2" />
        <p className="text-sm text-slate-500">将文件拖到此处，或 <span className="text-blue-600 font-bold">点击上传</span></p>
      </div>
      <table className="min-w-full divide-y divide-slate-200 text-xs border border-slate-200 rounded-lg overflow-hidden">
        <thead className="bg-slate-50">
          <tr>
            {["序号", "附件名称", "缩略图", "创建人", "创建时间", "操作"].map(h => (
              <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6} className="px-4 py-12 text-center text-slate-400 italic">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderDetailsTab = () => (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 shadow-sm"><PlusIcon className="h-3 w-3 mr-1"/> 新增</button>
          <button className="flex items-center px-3 py-1.5 bg-white border border-slate-300 text-rose-600 rounded text-xs font-bold hover:bg-rose-50 shadow-sm"><TrashIcon className="h-3 w-3 mr-1"/> 批量删除</button>
        </div>
        <button className="text-xs text-slate-400 hover:text-slate-600">取消筛选 √</button>
      </div>
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="min-w-full divide-y divide-slate-200 text-xs">
          <thead className="bg-slate-50">
            <tr>
              {["顺序号", "商品编号 ↑↓", "客户型号 ↑↓", "工厂货号 ↑↓", "中文品名 ↑↓", "中文描述 ↑↓", "英文货名 ↑↓", "操作"].map(h => (
                <th key={h} className="px-4 py-2 text-left font-bold text-slate-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={8} className="px-4 py-16 text-center text-slate-400 italic">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPlaceholder = (title: string) => (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400 italic animate-in fade-in">
       暂无 {title} 数据
    </div>
  );

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog" aria-modal="true" onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-2xl w-full max-w-[1200px] h-[90vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50/50 rounded-t-xl">
          <div className="flex items-center space-x-4">
             <h2 className="text-lg font-black text-slate-800 tracking-tight">新增外销合同</h2>
             <div className="flex space-x-1">
                <button className="flex items-center px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 shadow-sm"><ArrowPathIcon className="h-3 w-3 mr-1"/> 刷新</button>
                <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 shadow-md">保存</button>
                <button className="flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded text-xs font-bold hover:bg-indigo-100 shadow-sm">OCR识别</button>
             </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1.5 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-white border-b border-slate-100 sticky top-0 z-10">
          <nav className="flex space-x-6 overflow-x-auto no-scrollbar" aria-label="Modal Tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap pt-4 pb-3 px-1 border-b-2 font-bold text-xs transition-all
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
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 custom-scrollbar">
          {activeTab === '外箱合同' && renderContractTab()}
          {activeTab === '成本预估' && renderCostTab()}
          {activeTab === '操作记录' && renderPlaceholder('操作记录')}
          {activeTab === '外箱条款' && renderTermsTab()}
          {activeTab === '上传附件' && renderAttachmentsTab()}
          {activeTab === '外箱合同明细' && renderDetailsTab()}
          {activeTab === '外箱费用明细' && renderPlaceholder('费用明细')}
          
          {/* 底部附件/库存信息板块 (如果业务需要在此处展示) */}
          <div className="mt-12 border-t border-slate-200 pt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-slate-800">外箱子配件 / 库存信息</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-white border border-slate-300 rounded text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">新增配件</button>
                <button className="px-3 py-1 bg-white border border-slate-300 rounded text-[10px] font-bold text-rose-600 hover:bg-rose-50 transition-colors">批量删除</button>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
               <table className="min-w-full divide-y divide-slate-100 text-[11px]">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-slate-400 font-bold">#</th>
                      {["单价 ↑↓", "损耗率", "单位", "金额", "采购数量", "供应商编号 ↑↓", "供应商名称 ↑↓", "操作"].map(h => (
                        <th key={h} className="px-4 py-2 text-left text-slate-500 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td colSpan={9} className="px-4 py-12 text-center text-slate-400 italic">暂无数据</td></tr>
                  </tbody>
                  <tfoot className="bg-slate-50/50 border-t border-slate-100">
                    <tr className="font-bold text-slate-700">
                      <td colSpan={4} className="px-4 py-2 text-right uppercase tracking-wider">总计:</td>
                      <td className="px-4 py-2 text-blue-600 font-mono">0.00</td>
                      <td colSpan={4}></td>
                    </tr>
                  </tfoot>
               </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-4 border-t border-slate-200 bg-white rounded-b-xl">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            取消
          </button>
          <button 
            onClick={onClose}
            className="px-8 py-2 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95"
          >
            确认并提交
          </button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
