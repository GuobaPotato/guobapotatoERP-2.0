
import React, { useState, useEffect, useMemo } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ExclamationTriangleIcon } from '../icons/ExclamationTriangleIcon';
import { TrashIcon } from '../icons/TrashIcon';

interface PurchaseRequestToOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalRequired?: number;
}

interface SupplierRow {
  id: string;
  checked: boolean;
  supplierName: string;
  supplierCode: string;
  supplierLevel: string;
  availableQuantity: number;
  purchaseQuantity: string;
  price: string;
  deliveryCycle: string;
  contact: string;
}

export const PurchaseRequestToOrderModal: React.FC<PurchaseRequestToOrderModalProps> = ({ 
  isOpen, 
  onClose,
  totalRequired = 20000 
}) => {
  const [show, setShow] = useState(false);
  
  // 模拟供应商候选列表
  const [suppliers, setSuppliers] = useState<SupplierRow[]>([
    {
      id: 's1',
      checked: false,
      supplierName: "深圳芯片科技有限公司",
      supplierCode: "SUP-0012",
      supplierLevel: "A级（优先）",
      availableQuantity: 50000,
      purchaseQuantity: "",
      price: "¥8.5",
      deliveryCycle: "7天",
      contact: "王经理 138XXXX1234"
    }
  ]);

  const [remarks, setRemarks] = useState("");
  const [expectedDate, setExpectedDate] = useState("2026-01-25");

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // 计算当前分配总量
  const currentTotal = useMemo(() => {
    return suppliers
      .filter(s => s.checked)
      .reduce((sum, s) => sum + (parseInt(s.purchaseQuantity) || 0), 0);
  }, [suppliers]);

  const isMatched = currentTotal === totalRequired;

  const handleSupplierToggle = (id: string) => {
    setSuppliers(prev => prev.map(s => 
      s.id === id ? { ...s, checked: !s.checked, purchaseQuantity: !s.checked ? s.purchaseQuantity : "" } : s
    ));
  };

  const handleQtyChange = (id: string, val: string) => {
    setSuppliers(prev => prev.map(s => 
      s.id === id ? { ...s, purchaseQuantity: val } : s
    ));
  };

  const removeSupplier = (id: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  if (!isOpen && !show) return null;

  // 样式定义
  const sectionTitleClass = "flex items-center justify-between mb-4 border-l-4 border-blue-600 pl-3";
  const titleTextClass = "text-sm font-black text-slate-800 uppercase tracking-widest";
  const readOnlyBadge = "px-2 py-0.5 bg-slate-100 text-slate-400 text-[10px] font-black rounded border border-slate-200";
  const tableHeaderClass = "px-4 py-3 text-left text-[11px] font-black text-slate-500 uppercase tracking-tighter border-b border-slate-200 whitespace-nowrap bg-slate-50/50";
  const cellClass = "px-4 py-4 text-xs text-slate-600 border-b border-slate-50";

  return (
    <div className={`fixed inset-0 z-[100] flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-[1000px] max-h-[95vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 flex-shrink-0 bg-white rounded-t-3xl">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">采购申请转正式订单</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-full transition-all">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Modules Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          {/* Module 1: 固定需求信息 (Read Only) */}
          <section className="animate-in fade-in slide-in-from-top-2 duration-300">
            <div className={sectionTitleClass}>
              <span className={titleTextClass}>固定需求信息</span>
              <span className={readOnlyBadge}>READ ONLY</span>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="min-w-full text-center border-separate border-spacing-0">
                <thead>
                  <tr className="bg-slate-100/50">
                    {["关联生产计划编号", "计划需求交货日期", "采购申请编号", "需求总数量（合计）"].map(h => (
                      <th key={h} className="px-6 py-3 text-[11px] font-black text-slate-400 uppercase border-b border-slate-200">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-5 text-sm font-mono font-bold text-slate-600 border-r border-slate-200/50">PP-20260111-001</td>
                    <td className="px-6 py-5 text-sm font-mono font-bold text-slate-600 border-r border-slate-200/50">2026-01-25</td>
                    <td className="px-6 py-5 text-sm font-mono font-bold text-slate-600 border-r border-slate-200/50">PR-20260111-0001</td>
                    <td className="px-6 py-5 text-lg font-black text-blue-600">{totalRequired}个</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Module 2: 物料需求列表 (Read Only) */}
          <section className="animate-in fade-in slide-in-from-top-2 duration-400">
            <div className={sectionTitleClass}>
              <span className={titleTextClass}>物料需求列表</span>
              <span className={readOnlyBadge}>READ ONLY</span>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="bg-slate-100/50">
                    {["物料编码", "物料名称", "规格型号", "单位", "需求总数量"].map(h => (
                      <th key={h} className="px-6 py-3 text-[11px] font-black text-slate-400 uppercase border-b border-slate-200">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-5 text-sm font-mono text-slate-500">MAT-0023</td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-800">MEMS压力传感器芯片</td>
                    <td className="px-6 py-5 text-xs text-slate-500 italic">MX-23型（精度±0.5%）</td>
                    <td className="px-6 py-5 text-sm text-slate-600">个</td>
                    <td className="px-6 py-5 text-base font-black text-slate-900">{totalRequired}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Module 3: 供应商及采购数量分配 (Active) */}
          <section className="animate-in fade-in slide-in-from-top-2 duration-500">
            <div className={sectionTitleClass}>
              <span className={titleTextClass}>供应商及采购数量分配</span>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase hover:bg-blue-700 shadow-md">选择供应商</button>
                <button className="px-4 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-lg text-[10px] font-black uppercase hover:bg-slate-50">删除</button>
              </div>
            </div>
            
            <div className="mb-4 bg-amber-50 border border-amber-200/50 p-3 rounded-xl flex items-start space-x-3">
               <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mt-0.5" />
               <p className="text-xs text-amber-800 font-bold leading-relaxed">需选择该物料的合格供应商，且各供应商采购数量之和需等于需求总数量（{totalRequired}个）</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50">
                  <tr>
                    <th className={tableHeaderClass}>勾选</th>
                    <th className={tableHeaderClass}>供应商名称</th>
                    <th className={tableHeaderClass}>供应商编码</th>
                    <th className={tableHeaderClass}>等级</th>
                    <th className={tableHeaderClass}>可供数</th>
                    <th className={tableHeaderClass}>本次采购数量</th>
                    <th className={tableHeaderClass}>报价</th>
                    <th className={tableHeaderClass}>周期</th>
                    <th className={tableHeaderClass}>联系人/电话</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-50">
                  {suppliers.map((s, idx) => (
                    <tr key={s.id} className={`transition-colors ${s.checked ? 'bg-blue-50/30' : 'hover:bg-slate-50'}`}>
                      <td className="px-4 py-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={s.checked} 
                          onChange={() => handleSupplierToggle(s.id)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                        />
                      </td>
                      <td className="px-4 py-4 text-xs font-bold text-slate-800">{s.supplierName}</td>
                      <td className="px-4 py-4 text-xs font-mono text-slate-400">{s.supplierCode}</td>
                      <td className="px-4 py-4">
                         <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black border border-emerald-100 uppercase">
                           {s.supplierLevel}
                         </span>
                      </td>
                      <td className="px-4 py-4 text-xs font-mono text-slate-500">{s.availableQuantity}</td>
                      <td className="px-4 py-3">
                        <input 
                          type="number"
                          disabled={!s.checked}
                          value={s.purchaseQuantity}
                          onChange={(e) => handleQtyChange(s.id, e.target.value)}
                          className={`w-24 px-3 py-1.5 border rounded-lg text-center font-black focus:ring-1 focus:ring-blue-500 outline-none transition-all ${s.checked ? 'bg-white border-blue-200 text-blue-600' : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'}`}
                          placeholder="0"
                        />
                      </td>
                      <td className="px-4 py-4 text-xs font-bold text-slate-700">{s.price}</td>
                      <td className="px-4 py-4 text-xs text-slate-600">{s.deliveryCycle}</td>
                      <td className="px-4 py-4 text-xs text-slate-500 whitespace-nowrap">{s.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* 分配规则提示区 */}
              <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">不超可供数</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">合计等于 {totalRequired}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-black text-slate-400 uppercase">当前分配:</span>
                  <span className={`text-lg font-black tabular-nums ${isMatched ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {currentTotal} / {totalRequired}
                  </span>
                  {isMatched && (
                    <div className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[9px] font-black uppercase">Complete</div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Module 4: 订单补充信息 (Writable) */}
          <section className="animate-in fade-in slide-in-from-top-2 duration-600">
            <div className={sectionTitleClass}>
              <span className={titleTextClass}>订单补充信息</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">期望交货日期</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" 
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-medium italic mt-1.5 ml-1">* 默认同步生产计划需求日期</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">采购订单备注</label>
                <textarea 
                  rows={4} 
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
                  placeholder="填写订单特殊要求（如包装要求、物流方式等）"
                ></textarea>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end items-center gap-3 rounded-b-3xl">
          <button 
            onClick={onClose} 
            className="px-8 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm active:scale-95"
          >
            取消
          </button>
          <button 
            className="px-8 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm"
          >
            保存为草稿
          </button>
          <button 
            disabled={!isMatched}
            className={`
              px-10 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg
              ${isMatched 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 active:scale-95' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
            `}
          >
            生成采购订单并审批
          </button>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
