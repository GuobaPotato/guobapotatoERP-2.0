
import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { AddQuotationModal } from '../components/quotation/AddQuotationModal';

export const QuotationManagementPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setIsActionMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tableHeaders = [
    "客户名称", "客户编码", "客户联系人姓名", "客户联系人手机", "报价日期",
    "销售负责人", "报价单编号", "出库仓库", "产品名称", "产品编码",
    "产品属性", "规格型号", "当前可用库存数量", "销售数量", "销售单位",
    "税率%", "销售单价（含税）/元", "销售单价（不含税）元", "产品原价合计（含税）/元",
    "实际售价（含税）/元", "产品售价合计（含税）/元", "实际售价（不含税）/元",
    "产品售价合计（不含税）/元", "成品单价/元", "产品成本合计/元",
    "销售原价总额（含税）/元", "优惠金额/元", "整单折扣率%",
    "销售订单金额（含税）/元", "金额大写", "销售订单金额（不含税）/元",
    "产品成本总额/元", "报价毛利率%", "审批结果", "审批时间",
    "审批人", "不通过原因", "提交人", "提交时间", "更新时间",
    "流程状态", "当前节点", "当前负责人"
  ];

  const mockData = [
    {
      "客户名称": "Kohler采购单",
      "客户编码": "20260107-0001",
      "客户联系人姓名": "王**",
      "客户联系人手机": "18832157548",
      "报价日期": "2026-01-07 11:22",
      "销售负责人": "刘**",
      "报价单编号": "BJ20260113",
      "出库仓库": "成品库",
      "产品名称": "智能小便器",
      "产品编码": "A001",
      "产品属性": "成品",
      "规格型号": "A001",
      "当前可用库存数量": "666",
      "销售数量": "100.00",
      "销售单位": "套",
      "税率": "13%",
      "销售单价含税": "900.00",
      "销售单价不含税": "796.46",
      "产品原价合计含税": "90,000.00",
      "实际售价含税": "900.00",
      "产品售价合计含税": "90,000.00",
      "实际售价不含税": "796.46",
      "产品售价合计不含税": "79,646.00",
      "成品单价": "500.00",
      "产品成本合计": "50,000.00",
      "销售原价总额含税": "90,000.00",
      "优惠金额": "--",
      "整单折扣率": "100.00%",
      "销售订单金额含税": "90,000.00",
      "金额大写": "玖万",
      "销售订单金额不含税": "79,646.00",
      "产品成本总额": "50,000.00",
      "报价毛利率": "44.44%",
      "审批结果": "--",
      "审批时间": "--",
      "审批人": "王",
      "不通过原因": "--",
      "提交人": "刘",
      "提交时间": "2026-01-12 21:09:30",
      "更新时间": "2026-01-12 21:09:30",
      "流程状态": "进行中",
      "当前节点": "商务审批",
      "当前负责人": "王",
    }
  ];

  const inputClass = "block px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 transition shadow-sm outline-none";

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50 font-sans">
      {/* 1. 顶部标签与功能区 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center flex-shrink-0">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">报价单管理</h1>
          <nav className="flex space-x-4">
             <button className="pb-1 border-b-2 border-blue-600 text-blue-600 text-sm font-black">全部</button>
          </nav>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-bold text-sm transition-all shadow-md active:scale-95"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            添加报价单
          </button>
          
          <div className="relative" ref={actionMenuRef}>
            <button 
              onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
              className="flex items-center justify-center bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 font-bold text-sm transition-all shadow-sm"
            >
              操作
              <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform ${isActionMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {isActionMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in duration-100">
                <button className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-colors font-medium">导出</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. 筛选搜索区 */}
      <div className="p-4 px-6 bg-slate-50/50 border-b border-slate-200 flex flex-wrap items-center gap-4 flex-shrink-0">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="搜报价编号" 
            className={`${inputClass} w-full pl-10 h-9`}
          />
        </div>
        
        <div className="relative">
          <select className={`${inputClass} appearance-none pr-10 h-9 font-medium text-slate-700 min-w-[140px]`}>
            <option value="">状态筛选</option>
            <option value="processing">进行中</option>
            <option value="finished">已结束</option>
            <option value="rejected">已驳回</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDownIcon className="h-4 w-4" />
          </div>
        </div>

        <button className="px-4 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
           重置
        </button>
      </div>

      {/* 3. 报价单表格区 */}
      <div className="flex-1 overflow-auto bg-white custom-scrollbar relative">
        <table className="min-w-full divide-y divide-slate-200 text-[11px] border-separate border-spacing-0">
          <thead className="bg-slate-50 sticky top-0 z-40">
            <tr>
              {tableHeaders.map((header, idx) => (
                <th 
                  key={idx} 
                  className={`
                    px-4 py-3.5 text-left font-black text-slate-500 uppercase tracking-tighter border-b border-slate-200 whitespace-nowrap bg-slate-50
                    ${idx === 0 ? 'sticky left-0 z-50 shadow-[2px_0_5px_rgba(0,0,0,0.05)] border-r' : ''}
                  `}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100 font-medium">
            {mockData.map((row, index) => (
              <tr key={index} className="hover:bg-blue-50/40 transition-colors group">
                <td className="sticky left-0 z-20 px-4 py-4 font-bold text-blue-600 bg-white group-hover:bg-[#f8faff] border-b border-slate-100 border-r shadow-[2px_0_5px_rgba(0,0,0,0.05)] whitespace-nowrap">
                  {row["客户名称"]}
                </td>
                <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50">{row["客户编码"]}</td>
                <td className="px-4 py-4 text-slate-700 font-bold border-b border-slate-50">{row["客户联系人姓名"]}</td>
                <td className="px-4 py-4 text-slate-600 font-mono border-b border-slate-50">{row["客户联系人手机"]}</td>
                <td className="px-4 py-4 text-slate-500 border-b border-slate-50 whitespace-nowrap">{row["报价日期"]}</td>
                <td className="px-4 py-4 text-slate-700 border-b border-slate-50">{row["销售负责人"]}</td>
                <td className="px-4 py-4 font-mono font-black text-slate-900 border-b border-slate-50">{row["报价单编号"]}</td>
                <td className="px-4 py-4 text-slate-600 border-b border-slate-50">{row["出库仓库"]}</td>
                <td className="px-4 py-4 font-black text-slate-800 whitespace-nowrap border-b border-slate-50">{row["产品名称"]}</td>
                <td className="px-4 py-4 font-mono text-slate-400 border-b border-slate-50">{row["产品编码"]}</td>
                <td className="px-4 py-4 text-slate-500 border-b border-slate-50"><span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9px] font-black uppercase">{row["产品属性"]}</span></td>
                <td className="px-4 py-4 text-slate-500 font-mono border-b border-slate-50">{row["规格型号"]}</td>
                <td className="px-4 py-4 text-right font-mono font-black text-slate-400 border-b border-slate-50">{row["当前可用库存数量"]}</td>
                <td className="px-4 py-4 text-right font-mono font-black text-blue-600 border-b border-slate-50">{row["销售数量"]}</td>
                <td className="px-4 py-4 text-center border-b border-slate-50">{row["销售单位"]}</td>
                <td className="px-4 py-4 text-center font-bold text-slate-400 border-b border-slate-50">{row["税率"]}</td>
                <td className="px-4 py-4 text-right font-mono font-bold text-slate-800 border-b border-slate-50">¥{row["销售单价含税"]}</td>
                <td className="px-4 py-4 text-right font-mono text-slate-500 border-b border-slate-50">¥{row["销售单价不含税"]}</td>
                <td className="px-4 py-4 text-right font-mono border-b border-slate-50">¥{row["产品原价合计含税"]}</td>
                <td className="px-4 py-4 text-right font-mono font-bold border-b border-slate-50 text-indigo-700">¥{row["实际售价含税"]}</td>
                <td className="px-4 py-4 text-right font-mono font-black border-b border-slate-50 text-blue-700">¥{row["产品售价合计含税"]}</td>
                <td className="px-4 py-4 text-right font-mono text-slate-500 border-b border-slate-50">¥{row["实际售价不含税"]}</td>
                <td className="px-4 py-4 text-right font-mono border-b border-slate-50">¥{row["产品售价合计不含税"]}</td>
                <td className="px-4 py-4 text-right font-mono border-b border-slate-50">¥{row["成品单价"]}</td>
                <td className="px-4 py-4 text-right font-mono border-b border-slate-50 text-slate-400">¥{row["产品成本合计"]}</td>
                <td className="px-4 py-4 text-right font-mono border-b border-slate-50">¥{row["销售原价总额含税"]}</td>
                <td className="px-4 py-4 text-center text-slate-300 italic border-b border-slate-50">{row["优惠金额"]}</td>
                <td className="px-4 py-4 text-center font-bold text-slate-400 border-b border-slate-50">{row["整单折扣率"]}</td>
                <td className="px-4 py-4 text-right font-mono font-black text-blue-800 border-b border-slate-50">¥{row["销售订单金额含税"]}</td>
                <td className="px-4 py-4 text-center font-black text-slate-700 border-b border-slate-50">{row["金额大写"]}</td>
                <td className="px-4 py-4 text-right font-mono border-b border-slate-50">¥{row["销售订单金额不含税"]}</td>
                <td className="px-4 py-4 text-right font-mono border-b border-slate-50 text-slate-400">¥{row["产品成本总额"]}</td>
                <td className="px-4 py-4 text-center font-black text-emerald-600 italic border-b border-slate-50">{row["报价毛利率"]}</td>
                <td className="px-4 py-4 text-slate-300 italic border-b border-slate-50">{row["审批结果"]}</td>
                <td className="px-4 py-4 text-slate-300 italic border-b border-slate-50">{row["审批时间"]}</td>
                <td className="px-4 py-4 font-bold text-slate-700 border-b border-slate-50">{row["审批人"]}</td>
                <td className="px-4 py-4 text-slate-300 italic border-b border-slate-50">{row["不通过原因"]}</td>
                <td className="px-4 py-4 text-slate-700 border-b border-slate-50">{row["提交人"]}</td>
                <td className="px-4 py-4 text-slate-400 font-mono text-[10px] border-b border-slate-50">{row["提交时间"]}</td>
                <td className="px-4 py-4 text-slate-400 font-mono text-[10px] border-b border-slate-50">{row["更新时间"]}</td>
                <td className="px-4 py-4 border-b border-slate-50">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-black border border-blue-100 uppercase tracking-widest text-[9px]">
                    {row["流程状态"]}
                  </span>
                </td>
                <td className="px-4 py-4 font-bold text-slate-500 italic border-b border-slate-50">{row["当前节点"]}</td>
                <td className="px-4 py-4 font-black text-slate-800 border-b border-slate-50">{row["当前负责人"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. 分页区 */}
      <footer className="px-6 py-4 bg-white border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest flex-shrink-0">
        <div className="flex items-center space-x-6">
          <span>共 <span className="text-slate-800 font-black">1</span> 条</span>
          <div className="flex items-center space-x-2">
            <span>每页条数:</span>
            <select className="bg-slate-50 border border-slate-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
              <option>20条/页</option>
              <option>50条/页</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-1">
             <button disabled className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-300 cursor-not-allowed">上一页</button>
             <span className="px-3 py-1.5 bg-blue-600 text-white rounded font-black shadow-sm">1</span>
             <button disabled className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-slate-300 cursor-not-allowed">下一页</button>
          </div>
          <div className="flex items-center space-x-2">
             <span>前往</span>
             <input type="text" className="w-10 h-8 border border-slate-200 rounded text-center focus:ring-1 focus:ring-blue-500 outline-none" defaultValue="1" />
             <span>页</span>
             <button className="ml-1 px-3 py-1.5 bg-slate-100 text-slate-600 border border-slate-200 rounded hover:bg-slate-200 transition-colors">跳转</button>
          </div>
        </div>
      </footer>

      {/* 添加报价单弹窗 */}
      <AddQuotationModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};
