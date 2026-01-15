
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { PaperClipIcon } from '../components/icons/PaperClipIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { PhotoIcon } from '../components/icons/PhotoIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
import { PencilSquareIcon } from '../components/icons/PencilSquareIcon';
import { Page } from '../App';

type TabType = '产品列表' | '产品BOM' | '产品工艺流线';

interface ProductManagementPageProps {
  setCurrentPage: (page: Page) => void;
}

export const ProductManagementPage: React.FC<ProductManagementPageProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState<TabType>('产品列表');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['全部']);
  
  const tabs: TabType[] = ['产品列表', '产品BOM', '产品工艺流线'];
  const typeOptions = ['全部', '成品', '半成品'];
  const categoryOptions = ['全部', '卫浴传感器', '车用传感器', '温湿度检测传感器'];

  // 1. 产品列表数据
  const productListData = [
    {
      code: "SN-IR-2026-A1",
      type: "成品",
      category: "卫浴传感器",
      spec: "BH-GW-R8 (防菌型)",
      prodUnit: "套",
      stockUnit: "套",
      diameter: "8.0",
      length: "100.00",
      color: "象牙白",
      weight: "0.040",
      costPrice: "306.00",
      salePrice: "379.00",
      hasImage: true,
      hasAttachment: true,
      method: "自产"
    },
    {
      code: "SN-TH-2026-B2",
      type: "半成品",
      category: "温湿度检测传感器",
      spec: "TH-MOD-V1.2",
      prodUnit: "个",
      stockUnit: "个",
      diameter: "5.0",
      length: "20.00",
      color: "金属色",
      weight: "0.012",
      costPrice: "45.00",
      salePrice: "0.00",
      hasImage: false,
      hasAttachment: true,
      method: "自产"
    }
  ];

  // 2. BOM数据
  const bomListData = [
    {
      bomNo: "BOM-20260110-001",
      productCode: "SN-IR-2026-A1",
      type: "成品",
      category: "卫浴传感器",
      spec: "BH-GW-R8",
      componentCount: 12,
      status: "已生效",
      updateTime: "2026-01-09 17:10"
    }
  ];

  // 3. 工艺流线数据
  const processFlowData = [
    {
      flowNo: "FLOW-IR-V1",
      productCode: "SN-IR-2026-A1",
      type: "成品",
      category: "卫浴传感器",
      stepCount: 5,
      mainWorkcenter: "组装一车间",
      manager: "李工艺",
      status: "启用中"
    }
  ];

  const handleTypeToggle = (opt: string) => {
    if (opt === '全部') {
      setSelectedTypes(['全部']);
    } else {
      const next = selectedTypes.includes(opt) 
        ? selectedTypes.filter(a => a !== opt)
        : [...selectedTypes.filter(a => a !== '全部'), opt];
      if (next.length === 0) setSelectedTypes(['全部']);
      else setSelectedTypes(next);
    }
  };

  const inputClass = "w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all";
  const labelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block";

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 font-sans overflow-hidden">
      {/* 顶部标题栏 */}
      <div className="bg-white border-b border-slate-200 px-6 pt-4 flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">产品管理中心</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentPage('addProduct')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md active:scale-95 transition-all"
            >
              <PlusIcon className="h-4 w-4 mr-1.5" />
              新增产品
            </button>
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 border-b-2 font-bold text-sm transition-all ${
                activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* 筛选区域 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0 flex flex-wrap items-end gap-4 shadow-sm z-10">
        <div className="w-48">
          <label className={labelClass}>编码查询</label>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <input type="text" className={`${inputClass} pl-8`} placeholder="输入编号" />
          </div>
        </div>
        <div className="flex flex-col">
          <label className={labelClass}>产品类型</label>
          <div className="flex items-center space-x-3 h-[30px] px-2 bg-slate-50 rounded-lg border border-slate-200">
            {typeOptions.map(opt => (
              <label key={opt} className="flex items-center group cursor-pointer">
                <input type="checkbox" checked={selectedTypes.includes(opt)} onChange={() => handleTypeToggle(opt)} className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                <span className={`ml-1.5 text-[11px] font-medium transition-colors ${selectedTypes.includes(opt) ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>{opt}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="w-48">
          <label className={labelClass}>产品分类</label>
          <div className="relative">
            <select className={`${inputClass} appearance-none pr-8 font-bold text-blue-600`}>
              {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDownIcon className="absolute right-2.5 top-2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">重置</button>
          <button className="px-4 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-black transition-colors shadow-sm">查询</button>
        </div>
      </div>

      <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
        <div className="flex-1 overflow-auto custom-scrollbar no-scrollbar">
          {/* 产品列表页 */}
          {activeTab === '产品列表' && (
            <table className="min-w-full divide-y divide-slate-100 text-[11px] border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  {["产品编码", "产品类型", "产品分类", "规格型号", "生产单位", "仓储单位", "重量/kg", "成本单价", "销售单价", "技术附件", "获取方式"].map((header, i) => (
                    <th key={header} className={`px-4 py-3 text-left font-black text-slate-500 uppercase tracking-tighter border-b border-slate-200 whitespace-nowrap bg-slate-50 ${i === 0 ? 'sticky left-0 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.05)]' : ''}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-50">
                {productListData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 font-mono font-bold text-blue-600 sticky left-0 bg-white group-hover:bg-[#f8faff] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)] border-b border-slate-50">{row.code}</td>
                    <td className="px-4 py-4"><span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 uppercase text-[9px]">{row.type}</span></td>
                    <td className="px-4 py-4 font-bold text-slate-800 whitespace-nowrap">{row.category}</td>
                    <td className="px-4 py-4 text-slate-500 font-medium whitespace-nowrap">{row.spec}</td>
                    <td className="px-4 py-4 text-center">{row.prodUnit}</td>
                    <td className="px-4 py-4 text-center">{row.stockUnit}</td>
                    <td className="px-4 py-4 text-right font-mono">{row.weight}</td>
                    <td className="px-4 py-4 text-right font-mono font-bold text-slate-700">¥{row.costPrice}</td>
                    <td className="px-4 py-4 text-right font-mono font-black text-blue-600">¥{row.salePrice}</td>
                    <td className="px-4 py-4 text-center">{row.hasAttachment ? <PaperClipIcon className="w-4 h-4 text-blue-500 inline" /> : <span className="text-slate-300">-</span>}</td>
                    <td className="px-4 py-4"><span className="font-bold text-slate-600">{row.method}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 产品BOM页 */}
          {activeTab === '产品BOM' && (
            <table className="min-w-full divide-y divide-slate-100 text-[11px] border-separate border-spacing-0 animate-in fade-in duration-300">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  {["BOM编号", "关联产品编码", "产品类型", "产品分类", "规格型号", "组件数量", "状态", "更新时间", "操作"].map((header, i) => (
                    <th key={header} className={`px-4 py-3 text-left font-black text-slate-500 uppercase tracking-tighter border-b border-slate-200 whitespace-nowrap bg-slate-50 ${i === 0 ? 'sticky left-0 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.05)]' : ''}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-50">
                {bomListData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 font-mono font-bold text-slate-800 sticky left-0 bg-white group-hover:bg-[#f8faff] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)] border-b border-slate-50">{row.bomNo}</td>
                    <td className="px-4 py-4 font-mono font-bold text-blue-600">{row.productCode}</td>
                    <td className="px-4 py-4"><span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 uppercase text-[9px]">{row.type}</span></td>
                    <td className="px-4 py-4 font-bold text-slate-800">{row.category}</td>
                    <td className="px-4 py-4 text-slate-500">{row.spec}</td>
                    <td className="px-4 py-4 text-right font-mono font-black">{row.componentCount}</td>
                    <td className="px-4 py-4"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold">{row.status}</span></td>
                    <td className="px-4 py-4 text-slate-400">{row.updateTime}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                         <button onClick={() => setCurrentPage('editBOM')} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><PencilSquareIcon className="w-4 h-4" /></button>
                         <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded"><EyeIcon className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 产品工艺流线页 */}
          {activeTab === '产品工艺流线' && (
            <table className="min-w-full divide-y divide-slate-100 text-[11px] border-separate border-spacing-0 animate-in fade-in duration-300">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  {["工艺流线编号", "关联产品编码", "产品类型", "产品分类", "工序总数", "主生产车间", "工艺负责人", "状态", "操作"].map((header, i) => (
                    <th key={header} className={`px-4 py-3 text-left font-black text-slate-500 uppercase tracking-tighter border-b border-slate-200 whitespace-nowrap bg-slate-50 ${i === 0 ? 'sticky left-0 z-30 shadow-[2px_0_5px_rgba(0,0,0,0.05)]' : ''}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-50">
                {processFlowData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-4 py-4 font-mono font-bold text-slate-800 sticky left-0 bg-white group-hover:bg-[#f8faff] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)] border-b border-slate-50">{row.flowNo}</td>
                    <td className="px-4 py-4 font-mono font-bold text-blue-600">{row.productCode}</td>
                    <td className="px-4 py-4"><span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 uppercase text-[9px]">{row.type}</span></td>
                    <td className="px-4 py-4 font-bold text-slate-800">{row.category}</td>
                    <td className="px-4 py-4 text-center font-mono font-black">{row.stepCount}</td>
                    <td className="px-4 py-4 text-slate-600 font-medium">{row.mainWorkcenter}</td>
                    <td className="px-4 py-4 font-bold text-slate-700">{row.manager}</td>
                    <td className="px-4 py-4"><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-bold">{row.status}</span></td>
                    <td className="px-4 py-4">
                       <button className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md font-bold hover:bg-slate-200 transition-all">设计路径</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Footer total={activeTab === '产品列表' ? productListData.length : 1} />
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

const Footer: React.FC<{ total: number; pageSize?: number }> = ({ total, pageSize = 100 }) => (
  <footer className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest flex-shrink-0">
    <div className="flex items-center space-x-6">
      <span>共 <span className="text-slate-800">{total}</span> 条</span>
      <div className="flex items-center space-x-2">
        <span>每页条数:</span>
        <select className="bg-transparent border-b border-slate-300 focus:outline-none focus:border-blue-500 py-0.5 cursor-pointer">
          <option>{pageSize}条/页</option>
          <option>50条/页</option>
        </select>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <span>当前页: <span className="text-blue-600 font-black">1/1</span></span>
      <div className="flex space-x-1">
        <button disabled className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-300 cursor-not-allowed">上一页</button>
        <button disabled className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-300 cursor-not-allowed">下一页</button>
      </div>
    </div>
  </footer>
);
