
import React, { useState, useEffect, useMemo } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { FilterIcon } from '../icons/FilterIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface ProcessDetail {
  processName: string;
  processCode: string;
  productName: string;
  productCode: string;
  productAttribute: string;
  specModel: string;
  plannedProductionQty: string;
  dispatchedQty: string;
  currentDispatchedQty: string;
  unit: string;
  startTime: string;
  endTime: string;
  bomCode: string;
}

interface WorkOrder {
  productionPlanNo: string;
  productionPlanName: string;
  materialWarehouse: string;
  productionTeam: string;
  teamLeader: string;
  workOrderStartDate: string;
  workOrderEndDate: string;
  workOrderStatus: string;
  productionWorkOrderName: string;
  productionWorkOrderNo: string;
  finishedProductBatchNo: string;
  processDetails: ProcessDetail[];
}

interface SelectWorkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedData: any) => void;
}

const WORK_ORDER_LIST: WorkOrder[] = [
  {
    productionPlanNo: "SC-JH-202601",
    productionPlanName: "感应龙头外壳生产计划202601",
    materialWarehouse: "原料仓",
    productionTeam: "组装一班",
    teamLeader: "李班组",
    workOrderStartDate: "2026-01-05",
    workOrderEndDate: "2026-01-09",
    workOrderStatus: "已派工",
    productionWorkOrderName: "感应龙头外壳（ABS）组装+检测工单",
    productionWorkOrderNo: "SG-GD-20260109",
    finishedProductBatchNo: "QC-20260109",
    processDetails: [
      { processName: "外壳注塑", processCode: "GX-001", productName: "感应龙头外壳（ABS）", productCode: "SP-001", productAttribute: "医用级防菌", specModel: "12*45*123", plannedProductionQty: "500", dispatchedQty: "500", currentDispatchedQty: "500", unit: "件", startTime: "2026-01-05", endTime: "2026-01-09", bomCode: "BOM-001" },
      { processName: "精密组装", processCode: "GX-002", productName: "感应龙头外壳（ABS）", productCode: "SP-001", productAttribute: "医用级防菌", specModel: "12*45*123", plannedProductionQty: "500", dispatchedQty: "500", currentDispatchedQty: "500", unit: "件", startTime: "2026-01-05", endTime: "2026-01-09", bomCode: "BOM-001" },
      { processName: "防菌检测", processCode: "GX-003", productName: "感应龙头外壳（ABS）", productCode: "SP-001", productAttribute: "医用级防菌", specModel: "12*45*123", plannedProductionQty: "500", dispatchedQty: "500", currentDispatchedQty: "500", unit: "件", startTime: "2026-01-05", endTime: "2026-01-09", bomCode: "BOM-001" }
    ]
  },
  {
    productionPlanNo: "SC-JH-202602",
    productionPlanName: "医用感应线圈生产计划202602",
    materialWarehouse: "原料仓",
    productionTeam: "组装二班",
    teamLeader: "张班组",
    workOrderStartDate: "2026-01-06",
    workOrderEndDate: "2026-01-10",
    workOrderStatus: "待派工",
    productionWorkOrderName: "医用感应线圈组装工单",
    productionWorkOrderNo: "SG-GD-20260110",
    finishedProductBatchNo: "QC-20260110",
    processDetails: [
      { processName: "线圈绕制", processCode: "GX-004", productName: "感应线圈（医用级）", productCode: "SP-002", productAttribute: "医用级绝缘", specModel: "Φ8*20", plannedProductionQty: "300", dispatchedQty: "0", currentDispatchedQty: "300", unit: "个", startTime: "2026-01-06", endTime: "2026-01-10", bomCode: "BOM-002" },
      { processName: "线圈检测", processCode: "GX-005", productName: "感应线圈（医用级）", productCode: "SP-002", productAttribute: "医用级绝缘", specModel: "Φ8*20", plannedProductionQty: "300", dispatchedQty: "0", currentDispatchedQty: "300", unit: "个", startTime: "2026-01-06", endTime: "2026-01-10", bomCode: "BOM-002" }
    ]
  }
];

export const SelectWorkOrderModal: React.FC<SelectWorkOrderModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [show, setShow] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // 扁平化数据供表格渲染
  const flatData = useMemo(() => {
    return WORK_ORDER_LIST.flatMap(wo => 
      wo.processDetails.map(pd => ({
        ...wo,
        ...pd,
        uniqueKey: `${wo.productionWorkOrderNo}-${pd.processCode}`
      }))
    );
  }, []);

  if (!isOpen && !show) return null;

  const handleConfirm = () => {
    const selected = flatData.find(d => d.uniqueKey === selectedKey);
    if (selected) onSelect(selected);
    onClose();
  };

  const tableHeaders = [
    "选择", "生产计划编号", "生产计划名称", "领料仓库", "生产班组", "班组长", 
    "工单开始日期", "工单完工日期", "工单状态", "生产工单名称", "生产工单编号", 
    "产成品批次号", "工序名称", "工序编码", "产品名称", "产品编码", 
    "产品属性", "规格型号", "计划生产数量", "已派工数量", "本次派工数量", 
    "单位", "开工时间", "完工时间", "BOM编码"
  ];

  return (
    <div className={`fixed inset-0 z-[70] flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-[1300px] h-[90vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-white rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-slate-800">选择生产工单数据</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4 flex-shrink-0">
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md active:scale-95 transition-all">
              <PlusIcon className="h-4 w-4 mr-1.5" />
              添加
            </button>
            <div className="relative flex-1 md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-slate-400" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm" 
                placeholder="输入生产工单名称/产品名称搜索" 
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 shadow-sm transition-all">
              <FilterIcon className="h-4 w-4 mr-1.5" />
              筛选
            </button>
          </div>
          
          <div className="text-xs text-slate-400 font-medium">
            已扁平化展示工单内的工序明细
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto p-5 no-scrollbar">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-[11px] border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  {tableHeaders.map((h, i) => (
                    <th 
                      key={h} 
                      className={`
                        px-4 py-3 text-left font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 whitespace-nowrap
                        ${i === 0 ? 'sticky left-0 bg-slate-50 z-30' : ''}
                        ${i === 10 ? 'sticky left-[50px] bg-slate-50 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.03)] border-r' : ''}
                      `}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {flatData.map((item) => (
                  <tr 
                    key={item.uniqueKey} 
                    className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${selectedKey === item.uniqueKey ? 'bg-blue-50/60' : ''}`}
                    onClick={() => setSelectedKey(item.uniqueKey)}
                  >
                    <td className="px-4 py-4 text-center sticky left-0 bg-inherit z-10 border-b border-slate-50">
                      <input 
                        type="radio" 
                        name="work_order_select" 
                        className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                        checked={selectedKey === item.uniqueKey}
                        onChange={() => setSelectedKey(item.uniqueKey)}
                      />
                    </td>
                    <td className="px-4 py-4 font-mono text-slate-500 border-b border-slate-50">{item.productionPlanNo}</td>
                    <td className="px-4 py-4 text-slate-600 border-b border-slate-50">{item.productionPlanName}</td>
                    <td className="px-4 py-4 text-slate-500 border-b border-slate-50">{item.materialWarehouse}</td>
                    <td className="px-4 py-4 border-b border-slate-50">
                      <span className="px-1.5 py-0.5 bg-slate-100 rounded font-bold text-slate-600">{item.productionTeam}</span>
                    </td>
                    <td className="px-4 py-4 text-slate-700 font-medium border-b border-slate-50">{item.teamLeader}</td>
                    <td className="px-4 py-4 font-mono text-slate-400 border-b border-slate-50">{item.workOrderStartDate}</td>
                    <td className="px-4 py-4 font-mono text-slate-400 border-b border-slate-50">{item.workOrderEndDate}</td>
                    <td className="px-4 py-4 border-b border-slate-50">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${item.workOrderStatus === '已派工' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                        {item.workOrderStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-800 whitespace-nowrap border-b border-slate-50">{item.productionWorkOrderName}</td>
                    <td className="px-4 py-4 font-mono font-bold text-blue-600 sticky left-[50px] bg-inherit z-10 shadow-[2px_0_5px_rgba(0,0,0,0.03)] border-b border-slate-50 border-r">{item.productionWorkOrderNo}</td>
                    <td className="px-4 py-4 font-mono text-indigo-600 font-bold border-b border-slate-50">{item.finishedProductBatchNo}</td>
                    <td className="px-4 py-4 font-black text-slate-800 border-b border-slate-50">{item.processName}</td>
                    <td className="px-4 py-4 font-mono text-slate-500 border-b border-slate-50">{item.processCode}</td>
                    <td className="px-4 py-4 text-slate-700 font-bold border-b border-slate-50">{item.productName}</td>
                    <td className="px-4 py-4 font-mono text-slate-400 border-b border-slate-50">{item.productCode}</td>
                    <td className="px-4 py-4 text-slate-500 border-b border-slate-50">{item.productAttribute}</td>
                    <td className="px-4 py-4 text-slate-500 border-b border-slate-50">{item.specModel}</td>
                    <td className="px-4 py-4 text-right font-mono font-bold text-slate-800 border-b border-slate-50">{item.plannedProductionQty}</td>
                    <td className="px-4 py-4 text-right font-mono text-slate-400 border-b border-slate-50">{item.dispatchedQty}</td>
                    <td className="px-4 py-4 text-right font-mono text-blue-600 font-black border-b border-slate-50">{item.currentDispatchedQty}</td>
                    <td className="px-4 py-4 text-center border-b border-slate-50">{item.unit}</td>
                    <td className="px-4 py-4 font-mono text-slate-400 border-b border-slate-50">{item.startTime}</td>
                    <td className="px-4 py-4 font-mono text-slate-400 border-b border-slate-50">{item.endTime}</td>
                    <td className="px-4 py-4 font-mono text-slate-300 italic border-b border-slate-50">{item.bomCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-5 bg-slate-50/50 rounded-b-2xl flex flex-col md:flex-row justify-between items-center gap-4 flex-shrink-0">
          <div className="flex items-center space-x-6 text-xs text-slate-500 font-bold uppercase tracking-widest">
            <div className="flex items-center space-x-2">
              <span>总数:</span>
              <span className="text-slate-800 text-sm">{flatData.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>每页显示:</span>
              <select className="bg-transparent focus:outline-none border-b border-slate-300">
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
             <div className="flex space-x-1">
                <button disabled className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-300 cursor-not-allowed bg-white shadow-sm">上一页</button>
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold shadow-md">1</button>
                <button disabled className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-300 cursor-not-allowed bg-white shadow-sm">下一页</button>
             </div>
             <div className="h-4 w-px bg-slate-200 mx-2"></div>
             <button 
                onClick={onClose}
                className="px-6 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
             >
              取消
             </button>
             <button 
                onClick={handleConfirm}
                disabled={!selectedKey}
                className="px-8 py-2 bg-slate-900 text-white rounded-lg text-sm font-black hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-100 active:scale-95 uppercase tracking-widest"
             >
              确定选择
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
