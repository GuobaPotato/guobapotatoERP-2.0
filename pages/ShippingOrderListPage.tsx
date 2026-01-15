
import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { PrinterIcon } from '../components/icons/PrinterIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { Pagination } from '../components/Pagination';
import { AddShippingOrderModal } from '../components/shipping/AddShippingOrderModal';

interface ShippingOrder {
  serialNo: number;
  shippingOrderNo: string;
  shippingDate: string;
  customerName: string;
  exportContract: string;
  shippingOrderStatus: '已完成' | '执行中';
  billOfLadingNo: string;
  freightForwarderName: string;
  productName: string;
  quantity: string;
  ourCompanyName: string;
}

const SHIPPING_ORDERS: ShippingOrder[] = [
  {
    serialNo: 1,
    shippingOrderNo: "SP-20260106",
    shippingDate: "2026-01-06",
    customerName: "泰华贸易",
    exportContract: "感应龙头外壳采购-123456",
    shippingOrderStatus: "已完成",
    billOfLadingNo: "BL-QD-BK20260107",
    freightForwarderName: "汉王船舶",
    productName: "感应龙头外壳（ABS）",
    quantity: "500",
    ourCompanyName: "众成贸易有限公司"
  },
  {
    serialNo: 2,
    shippingOrderNo: "SP-20260105",
    shippingDate: "2026-01-05",
    customerName: "BAZtube LLC",
    exportContract: "医用感应线圈订单-1102025po",
    shippingOrderStatus: "已完成",
    billOfLadingNo: "BL-QD-BK20260106",
    freightForwarderName: "华翰",
    productName: "感应线圈（医用级）",
    quantity: "300",
    ourCompanyName: "众成贸易有限公司"
  },
  {
    serialNo: 3,
    shippingOrderNo: "SP-20260104",
    shippingDate: "2026-01-04",
    customerName: "TATA",
    exportContract: "防菌感应元件测试单-12345677",
    shippingOrderStatus: "执行中",
    billOfLadingNo: "BL-QD-BK20260105",
    freightForwarderName: "青岛裕海",
    productName: "感应元件（防菌）",
    quantity: "200",
    ourCompanyName: "众成贸易有限公司"
  },
  {
    serialNo: 4,
    shippingOrderNo: "SP-20260103",
    shippingDate: "2026-01-03",
    customerName: "汇信美地",
    exportContract: "密封硅胶组件采购-gz001001",
    shippingOrderStatus: "已完成",
    billOfLadingNo: "BL-QD-BK20260104",
    freightForwarderName: "青岛嘉里大通",
    productName: "密封硅胶组件",
    quantity: "400",
    ourCompanyName: "众成贸易有限公司"
  },
  {
    serialNo: 5,
    shippingOrderNo: "SP-20260102",
    shippingDate: "2026-01-02",
    customerName: "Top Game",
    exportContract: "感应龙头底座订单-0492025po",
    shippingOrderStatus: "执行中",
    billOfLadingNo: "BL-QD-BK20260103",
    freightForwarderName: "上海爽通国际",
    productName: "感应龙头底座",
    quantity: "350",
    ourCompanyName: "众成贸易有限公司"
  }
];

export const ShippingOrderListPage: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(new Set(SHIPPING_ORDERS.map(d => d.serialNo)));
    else setSelectedIds(new Set());
  };

  const handleSelectOne = (no: number) => {
    const next = new Set(selectedIds);
    if (next.has(no)) next.delete(no);
    else next.add(no);
    setSelectedIds(next);
  };

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5";

  const getStatusStyle = (status: string) => {
    switch (status) {
      case '已完成': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case '执行中': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between shadow-sm sticky top-0 z-30">
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">出运单列表</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">已生成的实际出运单管理中心，聚焦已执行/执行中的出运任务结果</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-4 lg:mt-0">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-95"
          >
            <PlusIcon className="h-4 w-4 mr-1.5" />
            新增
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowPathIcon className="h-4 w-4 mr-1.5" />
            刷新
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <PrinterIcon className="h-4 w-4 mr-1.5" />
            批量打印
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowDownTrayIcon className="h-4 w-4 mr-1.5" />
            批量下载
          </button>
          <div className="relative" ref={moreRef}>
            <button 
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex items-center px-3 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 shadow-sm text-sm font-medium"
            >
              更多
              <ChevronDownIcon className={`ml-1.5 h-4 w-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">导出列表</button>
                  <button className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">批量更新状态</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8 flex-1 flex flex-col min-h-0 space-y-6">
        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className={labelClass}>出运单号</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-slate-300" />
                </div>
                <input type="text" className={`${inputClass} pl-10`} placeholder="输入出运单号模糊查询" />
              </div>
            </div>
            <div>
              <label className={labelClass}>出运日期范围</label>
              <div className="flex items-center space-x-2">
                <input type="date" className={inputClass} placeholder="出运日期起" />
                <span className="text-slate-300">-</span>
                <input type="date" className={inputClass} placeholder="出运日期终" />
              </div>
            </div>
            <div>
              <label className={labelClass}>客户名称</label>
              <input type="text" className={inputClass} placeholder="输入客户名称模糊查询" />
            </div>
            <div>
              <label className={labelClass}>外销合同</label>
              <input type="text" className={inputClass} placeholder="输入合同名或编号模糊查询" />
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-3">
             <button className="px-8 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">查找</button>
             <button className="px-8 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all">重置</button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col h-full">
          <div className="overflow-x-auto no-scrollbar">
            <table className="min-w-full divide-y divide-slate-100 text-xs border-separate border-spacing-0">
              <thead className="bg-slate-50 sticky top-0 z-20">
                <tr>
                  <th className="px-4 py-4 pl-6 text-left border-b border-slate-200 bg-slate-50 sticky left-0 z-30">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                      checked={SHIPPING_ORDERS.length > 0 && selectedIds.size === SHIPPING_ORDERS.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {[
                    "行号", "出运单号", "出运日期", "客户名称", "外销合同", "出运单状态", 
                    "提单号", "货代名称", "商品名称", "数量", "我方名称", "操作"
                  ].map((h, i) => (
                    <th 
                      key={h} 
                      className={`
                        px-4 py-4 text-left font-black text-slate-500 uppercase tracking-tight border-b border-slate-200 whitespace-nowrap bg-slate-50
                        ${i === 1 ? 'sticky left-[48px] z-30 shadow-[2px_0_5px_rgba(0,0,0,0.03)]' : ''}
                        ${h === '操作' ? 'sticky right-0 z-30 bg-slate-50 shadow-[-2px_0_5px_rgba(0,0,0,0.03)] text-center' : ''}
                      `}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {SHIPPING_ORDERS.map((item) => {
                  const isSelected = selectedIds.has(item.serialNo);
                  return (
                    <tr key={item.serialNo} className={`hover:bg-blue-50/20 transition-colors group ${isSelected ? 'bg-blue-50/40' : ''}`}>
                      <td className="px-4 py-4 pl-6 border-b border-slate-50 sticky left-0 z-10 bg-inherit">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                          checked={isSelected}
                          onChange={() => handleSelectOne(item.serialNo)}
                        />
                      </td>
                      <td className="px-4 py-4 text-slate-400 font-mono border-b border-slate-50">{item.serialNo}</td>
                      <td className="px-4 py-4 font-bold text-blue-600 hover:underline cursor-pointer whitespace-nowrap border-b border-slate-50 sticky left-[48px] z-10 bg-inherit shadow-[2px_0_5px_rgba(0,0,0,0.03)]">
                        {item.shippingOrderNo}
                      </td>
                      <td className="px-4 py-4 text-slate-500 whitespace-nowrap border-b border-slate-50">{item.shippingDate}</td>
                      <td className="px-4 py-4 text-slate-700 font-semibold whitespace-nowrap border-b border-slate-50">{item.customerName}</td>
                      <td className="px-4 py-4 text-slate-500 whitespace-nowrap border-b border-slate-50">{item.exportContract}</td>
                      <td className="px-4 py-4 whitespace-nowrap border-b border-slate-50">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border uppercase ${getStatusStyle(item.shippingOrderStatus)}`}>
                          {item.shippingOrderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-600 font-mono border-b border-slate-50">{item.billOfLadingNo}</td>
                      <td className="px-4 py-4 text-slate-600 border-b border-slate-50">{item.freightForwarderName}</td>
                      <td className="px-4 py-4 text-slate-800 font-medium border-b border-slate-50">{item.productName}</td>
                      <td className="px-4 py-4 text-slate-900 font-black border-b border-slate-50 text-right pr-8">{item.quantity}</td>
                      <td className="px-4 py-4 text-slate-500 whitespace-nowrap border-b border-slate-50">{item.ourCompanyName}</td>
                      <td className={`px-4 py-4 pr-6 border-b border-slate-50 whitespace-nowrap text-center sticky right-0 z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.03)] ${isSelected ? 'bg-[#f5f8ff]' : 'bg-white group-hover:bg-slate-50'}`}>
                        <div className="flex items-center justify-center space-x-2">
                          <button className="text-[10px] font-black text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors uppercase">查看</button>
                          <span className="text-slate-200">|</span>
                          <button className="text-[10px] font-black text-slate-600 hover:bg-slate-100 px-2 py-1 rounded transition-colors uppercase">打印</button>
                          <span className="text-slate-200">|</span>
                          <button className="text-[10px] font-black text-slate-600 hover:bg-slate-100 px-2 py-1 rounded transition-colors uppercase">下载</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
             <div className="flex items-center space-x-4">
                <span>共 <span className="font-black text-slate-800">{SHIPPING_ORDERS.length}</span> 条记录</span>
                <span>每页 <span className="font-bold text-slate-700">20</span> 条数据</span>
             </div>
             <div className="flex items-center space-x-1">
                <button className="px-3 py-1.5 border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-30" disabled>上一页</button>
                <button className="px-3 py-1.5 rounded font-bold bg-blue-600 text-white shadow-sm">1</button>
                <button className="px-3 py-1.5 border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-30" disabled>下一页</button>
                <div className="flex items-center ml-4 space-x-2">
                   <span>前往</span>
                   <input type="text" className="w-10 h-8 border border-slate-300 rounded text-center focus:ring-1 focus:ring-blue-500 outline-none" defaultValue="1" />
                   <span>页</span>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <AddShippingOrderModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
