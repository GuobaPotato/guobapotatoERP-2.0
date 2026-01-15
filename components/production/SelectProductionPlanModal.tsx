
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { FilterIcon } from '../icons/FilterIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface ProductionProductDetail {
  productName: string;
  productCode: string;
  plannedProductionQty: string;
  productionUnit: string;
}

interface ProductionPlan {
  productionPlanName: string;
  planStartDate: string;
  planStatus: string;
  productionProductDetails: ProductionProductDetail[];
}

interface SelectProductionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (plan: ProductionPlan) => void;
}

const PRODUCTION_PLAN_LIST: ProductionPlan[] = [
  {
    productionPlanName: "感应龙头外壳生产计划202601",
    planStartDate: "2026-01-05",
    planStatus: "已计划",
    productionProductDetails: [
      { productName: "感应龙头外壳（ABS）", productCode: "SP-001", plannedProductionQty: "500", productionUnit: "件" }
    ]
  },
  {
    productionPlanName: "医用感应线圈生产计划202601",
    planStartDate: "2026-01-04",
    planStatus: "已计划",
    productionProductDetails: [
      { productName: "感应线圈（医用级）", productCode: "SP-002", plannedProductionQty: "300", productionUnit: "个" }
    ]
  },
  {
    productionPlanName: "防菌感应元件生产计划202601",
    planStartDate: "2026-01-03",
    planStatus: "已计划",
    productionProductDetails: [
      { productName: "感应元件（防菌）", productCode: "SP-003", plannedProductionQty: "200", productionUnit: "个" }
    ]
  }
];

export const SelectProductionPlanModal: React.FC<SelectProductionPlanModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [show, setShow] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const handleConfirm = () => {
    const selected = PRODUCTION_PLAN_LIST.find(p => p.productionPlanName === selectedPlanName);
    if (selected) onSelect(selected);
    onClose();
  };

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all";

  return (
    <div className={`fixed inset-0 z-[60] flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800">生产入库--选择生产计划</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/30 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                <PlusIcon className="h-4 w-4 mr-1.5" />
                添加
              </button>
              <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-slate-400" />
                </div>
                <input type="text" className={`${inputClass} pl-10`} placeholder="输入生产计划名称/产品名称搜索" />
              </div>
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center px-4 py-2 border rounded-lg text-sm font-bold transition-all ${isFilterOpen ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
            >
              <FilterIcon className="h-4 w-4 mr-1.5" />
              筛选
            </button>
          </div>

          {/* Filter Popup Content */}
          {isFilterOpen && (
            <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-inner grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-200">
              <select className={inputClass} defaultValue="生产计划名称">
                <option value="生产计划名称">生产计划名称</option>
                <option value="计划开始日期">计划开始日期</option>
                <option value="产品名称">产品名称</option>
                <option value="计划状态">计划状态</option>
              </select>
              <select className={inputClass} defaultValue="等于">
                <option value="等于">等于</option>
                <option value="包含">包含</option>
                <option value="大于">大于</option>
                <option value="小于">小于</option>
              </select>
              <div className="flex items-center space-x-2">
                <input type="text" className={inputClass} placeholder="输入筛选值" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm whitespace-nowrap">确定</button>
                <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold whitespace-nowrap">清空</button>
              </div>
            </div>
          )}
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto p-5">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-widest w-16">选择</th>
                  <th className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-widest">生产计划名称</th>
                  <th className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-widest">计划开始日期</th>
                  <th className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-widest">计划状态</th>
                  <th className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-widest">生产产品明细</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {PRODUCTION_PLAN_LIST.map((plan) => (
                  <tr 
                    key={plan.productionPlanName} 
                    className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${selectedPlanName === plan.productionPlanName ? 'bg-blue-50/60' : ''}`}
                    onClick={() => setSelectedPlanName(plan.productionPlanName)}
                  >
                    <td className="px-4 py-4 text-center">
                      <input 
                        type="radio" 
                        name="plan_select" 
                        className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        checked={selectedPlanName === plan.productionPlanName}
                        onChange={() => setSelectedPlanName(plan.productionPlanName)}
                      />
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-800">{plan.productionPlanName}</td>
                    <td className="px-4 py-4 text-slate-600 font-mono">{plan.planStartDate}</td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-bold">
                        {plan.planStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        {plan.productionProductDetails.map((pd, idx) => (
                          <div key={idx} className="flex items-center text-xs text-slate-500">
                            <span className="font-bold text-slate-700 mr-2">{pd.productName}</span>
                            <span className="bg-slate-100 px-1 rounded mr-2 font-mono">{pd.productCode}</span>
                            <span className="text-blue-600 font-black">{pd.plannedProductionQty}</span>
                            <span className="ml-0.5">{pd.productionUnit}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer with Pagination */}
        <div className="border-t border-slate-200 p-4 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4 flex-shrink-0">
          <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium uppercase tracking-widest">
            <span>共 <span className="font-bold text-slate-800">3</span> 条计划</span>
            <span>每页 20 条</span>
          </div>
          
          <div className="flex items-center space-x-3">
             <div className="flex space-x-1">
                <button disabled className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-300 cursor-not-allowed bg-white">上一页</button>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold shadow-md">1</button>
                <button disabled className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-300 cursor-not-allowed bg-white">下一页</button>
             </div>
             <div className="h-4 w-px bg-slate-200 mx-2"></div>
             <button 
                onClick={onClose}
                className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all"
             >
              取消
             </button>
             <button 
                onClick={handleConfirm}
                disabled={!selectedPlanName}
                className="px-8 py-2 bg-slate-900 text-white rounded-lg text-sm font-black hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
             >
              确定选择
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
