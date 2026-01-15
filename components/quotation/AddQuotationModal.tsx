
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { TrashIcon } from '../icons/TrashIcon';

interface AddQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddQuotationModal: React.FC<AddQuotationModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // 模拟明细数据
  const [items, setItems] = useState([
    {
      id: "1",
      name: "智能小便器A001",
      code: "A001",
      attr: "成品",
      spec: "BH-GW-R8",
      stock: 97,
      qty: 100.00,
      unit: "套",
      priceWithTax: 379.00,
      taxRate: 13,
      costPrice: 306.00, // 用于毛利计算
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  // 内部计算逻辑
  const calcItemPriceNoTax = (withTax: number, rate: number) => withTax / (1 + rate / 100);
  
  const totalOriginalAmount = items.reduce((sum, item) => sum + (item.priceWithTax * item.qty), 0);
  const totalOrderAmount = totalOriginalAmount - discountAmount;
  const discountRate = totalOriginalAmount > 0 ? (totalOrderAmount / totalOriginalAmount) * 100 : 100;
  const totalNoTaxAmount = items.reduce((sum, item) => sum + (calcItemPriceNoTax(item.priceWithTax, item.taxRate) * item.qty), 0) - (discountAmount / 1.13); // 简化处理
  const totalCost = items.reduce((sum, item) => sum + (item.costPrice * item.qty), 0);
  const grossMargin = totalOrderAmount > 0 ? ((totalOrderAmount - totalCost) / totalOrderAmount) * 100 : 0;

  const inputClass = "mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-500";
  const labelClass = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-1";
  const sectionTitleClass = "flex items-center space-x-2 mb-6 border-l-4 border-blue-600 pl-3";

  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`} role="dialog" aria-modal="true" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-white rounded-t-2xl z-10">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-slate-800">添加报价单</h2>
            <p className="text-[10px] text-blue-500 font-bold mt-0.5">报价单仅作为销售订单的源数据，如有需求，可通过关联数据配置</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-all">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10 bg-slate-50/30">
          
          {/* Section 1: 客户基本信息 */}
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className={sectionTitleClass}>
              <h3 className="text-md font-bold text-slate-800 uppercase tracking-widest">客户基本信息</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className={labelClass}>选择客户</label>
                <div className="relative mt-1 group">
                  <button className="w-full flex items-center justify-between px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-400 bg-white hover:bg-slate-50 transition-colors group-hover:border-blue-400">
                    <span>（待选择数据）</span>
                    <SearchIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClass}>客户名称</label>
                <input type="text" className={inputClass} defaultValue="杭州***" />
              </div>
              <div>
                <label className={labelClass}>客户编码</label>
                <input type="text" className={inputClass} defaultValue="KH230420-03" />
              </div>
              <div>
                <label className={labelClass}>客户联系人姓名</label>
                <input type="text" className={inputClass} defaultValue="高启盛" />
              </div>
              <div>
                <label className={labelClass}>客户联系人手机</label>
                <input type="text" className={inputClass} defaultValue="18888888885" />
              </div>
              <div>
                <label className={labelClass}>报价日期</label>
                <input type="date" className={inputClass} defaultValue="2026-01-12" />
              </div>
              <div>
                <label className={labelClass}>销售负责人</label>
                <input type="text" className={inputClass} defaultValue="王×" />
              </div>
              <div>
                <label className={labelClass}>报价单编号</label>
                <input type="text" disabled className={`${inputClass} italic text-slate-400`} value="自动生成无需填写" />
              </div>
            </div>
          </section>

          {/* Section 2: 报价单明细 */}
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col border-l-4 border-blue-600 pl-3">
                <h3 className="text-md font-bold text-slate-800 uppercase tracking-widest">报价单明细</h3>
                <p className="text-[10px] text-rose-500 font-bold mt-1">请选择需要报价的产品，并在选择完毕后填写销售数量！毛利须低于14%，不允以通过！</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 mr-6">
                  <span className="text-[11px] font-black text-slate-400 uppercase">出库仓库:</span>
                  <select className="border-b border-slate-300 text-xs font-bold text-slate-700 bg-transparent focus:outline-none focus:border-blue-600 py-1">
                    <option>成品仓</option>
                    <option>原材料仓</option>
                  </select>
                </div>
                <button className="flex items-center px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95">
                  <PlusIcon className="h-3.5 w-3.5 mr-1" /> 添加
                </button>
                <button className="flex items-center px-4 py-1.5 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all shadow-sm">
                   快递填设
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl custom-scrollbar shadow-inner">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    {["序号", "选择产品", "产品名称", "产品编码", "产品属性", "规格型号", "可用库存", "销售数量", "单位", "销售单价(含税)", "税率", "不含税单价", "报价合计(含税)", "实际售价(含税)", "操作"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-tighter border-b border-slate-100 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors font-medium">
                      <td className="px-4 py-4 font-mono text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-4"><span className="text-emerald-500 font-black">（已选）</span></td>
                      <td className="px-4 py-4 font-bold text-slate-800">{item.name}</td>
                      <td className="px-4 py-4 font-mono text-slate-400">{item.code}</td>
                      <td className="px-4 py-4"><span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-black border border-blue-100">{item.attr}</span></td>
                      <td className="px-4 py-4 text-slate-500">{item.spec}</td>
                      <td className="px-4 py-4 text-right font-mono font-bold text-slate-400">{item.stock}</td>
                      <td className="px-4 py-2">
                        <input type="number" className="w-24 px-2 py-1 border border-blue-200 rounded text-center font-black text-blue-600 bg-blue-50/20" defaultValue={item.qty.toFixed(2)} />
                      </td>
                      <td className="px-4 py-4 text-center">{item.unit}</td>
                      <td className="px-4 py-4 text-right font-mono">¥{item.priceWithTax.toFixed(2)}</td>
                      <td className="px-4 py-4 text-center">{item.taxRate}%</td>
                      <td className="px-4 py-4 text-right font-mono text-slate-400">¥{calcItemPriceNoTax(item.priceWithTax, item.taxRate).toFixed(2)}</td>
                      <td className="px-4 py-4 text-right font-mono font-black text-slate-800">¥{(item.priceWithTax * item.qty).toLocaleString()}</td>
                      <td className="px-4 py-2">
                        <input type="number" className="w-24 px-2 py-1 border border-indigo-200 rounded text-center font-black text-indigo-600 bg-indigo-50/20" defaultValue={item.priceWithTax.toFixed(2)} />
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button onClick={() => {}} className="text-rose-500 hover:text-rose-700 transition-colors">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: 报价汇总 */}
          <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className={sectionTitleClass}>
              <h3 className="text-md font-bold text-slate-800 uppercase tracking-widest">报价汇总</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                <label className={labelClass}>销售原价总额 (含税) / 元</label>
                <span className="text-xl font-black text-slate-800 font-mono">¥ {totalOriginalAmount.toLocaleString()}</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-blue-200 shadow-inner flex flex-col justify-between">
                <label className={`${labelClass} text-blue-600`}>优惠金额 / 元</label>
                <input 
                  type="number" 
                  value={discountAmount} 
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                  className="w-full bg-transparent font-black text-xl text-blue-600 outline-none placeholder-blue-300"
                  placeholder="待填写..." 
                />
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                <label className={labelClass}>整单折扣率 %</label>
                <span className="text-xl font-black text-slate-800 font-mono">{discountRate.toFixed(2)}%</span>
              </div>
              <div className="p-4 bg-blue-600 rounded-xl shadow-lg shadow-blue-100 flex flex-col justify-between">
                <label className="text-[10px] font-black text-blue-200 uppercase tracking-widest">销售订单金额 (含税) / 元</label>
                <span className="text-2xl font-black text-white font-mono">¥ {totalOrderAmount.toLocaleString()}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                <label className={labelClass}>金额大写</label>
                <span className="text-sm font-black text-slate-700 tracking-tight">叁万柒仟玖佰元</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                <label className={labelClass}>报价毛利率 %</label>
                <div className="flex items-center space-x-2">
                  <span className={`text-xl font-black font-mono ${grossMargin > 14 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {grossMargin.toFixed(2)}%
                  </span>
                  {grossMargin < 14 && <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[8px] font-black">低于阈值</span>}
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="flex justify-end items-center gap-3 p-6 border-t border-slate-200 bg-white rounded-b-2xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)] z-10">
          <button 
            onClick={onClose} 
            className="px-10 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            保存草稿
          </button>
          <button 
            onClick={() => { alert('报价单已提交'); onClose(); }}
            className="px-16 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 transform active:scale-95 uppercase tracking-widest"
          >
            确认提交
          </button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};
