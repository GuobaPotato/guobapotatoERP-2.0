
import React from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { PrinterIcon } from '../icons/PrinterIcon';
import { PaperClipIcon } from '../icons/PaperClipIcon';
import { CheckIcon } from '../icons/CheckIcon';

interface PurchaseDetailViewProps {
  purchaseNo: string;
  onBack: () => void;
}

const MOCK_DETAIL = {
  basic: {
    purchaseNo: "PO2024102001",
    status: "已审核",
    type: "原材料采购",
    supplier: {
      name: "某半导体制造有限公司",
      code: "SUP_IC_8892",
      contact: "张经理",
      phone: "13812345678",
      address: "广东省深圳市南山区高新科技园",
      taxNo: "91440300MA5XXXXXX"
    },
    orderDate: "2024-10-20 09:30",
    auditDate: "2024-10-21 14:20",
    buyer: "王明",
    department: "采购部"
  },
  items: [
    {
      lineNo: 1,
      code: "IR-SENS-001",
      name: "红外传感器探头",
      spec: "HC-SR501",
      materialType: "电子料",
      unit: "个",
      quantity: 5000,
      priceWithTax: 15.5,
      priceNoTax: 13.72,
      taxRate: "13%",
      amountWithTax: 77500,
      amountNoTax: 68600,
      plannedArrival: "2024-11-10",
      actualArrival: 3000,
      pendingArrival: 2000,
      remark: "要求进口品牌感应头",
      relatedWorkOrder: "WO-20241020-A1",
      qcRequirement: "全检"
    },
    {
      lineNo: 2,
      code: "PLAS-CASE-09",
      name: "ABS外壳（白色）",
      spec: "12*45*123mm",
      materialType: "塑料件",
      unit: "套",
      quantity: 2000,
      priceWithTax: 3.2,
      priceNoTax: 2.83,
      taxRate: "13%",
      amountWithTax: 6400,
      amountNoTax: 5660,
      plannedArrival: "2024-11-15",
      actualArrival: 0,
      pendingArrival: 2000,
      remark: "表面高光处理",
      relatedWorkOrder: "WO-20241020-A1",
      qcRequirement: "抽检"
    }
  ],
  settlement: {
    totalWithTax: 83900,
    totalNoTax: 74260,
    discountAmount: 1000,
    discountRate: "1.2%",
    freight: 500,
    otherFees: 0,
    finalPayable: 83400,
    method: "月结30天",
    paymentTerm: "30天",
    paymentStatus: "部分付款",
    invoice: {
      type: "增税专用发票",
      no: "FP20241020088",
      date: "2024-10-25",
      received: "是"
    }
  },
  relatedOrders: {
    receipts: [
      { no: "RK20241101001", date: "2024-11-01", warehouse: "电子件一号仓", qty: 3000 }
    ],
    qualityChecks: [
      { no: "QC20241101001", date: "2024-11-01", result: "通过", unqualifiedQty: 0, handle: "--" }
    ]
  },
  approvals: [
    { approver: "采购经理-李明", time: "2024-10-20 16:00", opinion: "项目紧急，批准采购" },
    { approver: "财务总监-钱进", time: "2024-10-21 14:20", opinion: "预算内采购，同意" }
  ],
  logs: [
    { user: "王明", time: "2024-10-20 09:30", type: "创建单据" },
    { user: "系统", time: "2024-10-21 14:20", type: "审核通过" }
  ],
  remark: "收货地址：工厂东门A库区。需配合物流提前预约。",
  attachments: [
    { name: "采购合同-2024102001.pdf", url: "#" },
    { name: "技术规格协议.docx", url: "#" }
  ]
};

export const PurchaseDetailView: React.FC<PurchaseDetailViewProps> = ({ purchaseNo, onBack }) => {
  const sectionTitleClass = "text-sm font-black text-slate-800 border-l-4 border-blue-600 pl-3 mb-4 uppercase tracking-widest";
  const labelClass = "text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1";
  const valueClass = "text-sm font-bold text-slate-700";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-blue-600">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">采购详情 - {purchaseNo}</h1>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100 uppercase">
                {MOCK_DETAIL.basic.status}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">类型: {MOCK_DETAIL.basic.type}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all shadow-sm active:scale-95">
            <PrinterIcon className="h-4 w-4 mr-1.5" /> 打印
          </button>
          <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">编辑详情</button>
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full pb-32">
        {/* Basic Info */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className={sectionTitleClass}>基础信息区</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div><label className={labelClass}>采购单号</label><p className="text-sm font-mono font-bold text-blue-600">{MOCK_DETAIL.basic.purchaseNo}</p></div>
            <div><label className={labelClass}>单据日期</label><p className={valueClass}>{MOCK_DETAIL.basic.orderDate}</p></div>
            <div><label className={labelClass}>审核日期</label><p className={valueClass}>{MOCK_DETAIL.basic.auditDate}</p></div>
            <div><label className={labelClass}>采购员 / 部门</label><p className={valueClass}>{MOCK_DETAIL.basic.buyer} ({MOCK_DETAIL.basic.department})</p></div>
            <div className="lg:col-span-4 border-t border-slate-50 pt-4 mt-2">
               <label className={labelClass}>供应商详情</label>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                 <div><span className="text-xs text-slate-500">名称:</span> <span className="text-xs font-bold ml-1">{MOCK_DETAIL.basic.supplier.name}</span></div>
                 <div><span className="text-xs text-slate-500">编码:</span> <span className="text-xs font-mono font-bold ml-1">{MOCK_DETAIL.basic.supplier.code}</span></div>
                 <div><span className="text-xs text-slate-500">联系人/电话:</span> <span className="text-xs font-bold ml-1">{MOCK_DETAIL.basic.supplier.contact} ({MOCK_DETAIL.basic.supplier.phone})</span></div>
                 <div className="md:col-span-2"><span className="text-xs text-slate-500">地址:</span> <span className="text-xs font-bold ml-1">{MOCK_DETAIL.basic.supplier.address}</span></div>
                 <div><span className="text-xs text-slate-500">税号:</span> <span className="text-xs font-mono font-bold ml-1">{MOCK_DETAIL.basic.supplier.taxNo}</span></div>
               </div>
            </div>
          </div>
        </section>

        {/* Purchase Items */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest border-l-4 border-blue-600 pl-3">采购商品明细</h3>
            <span className="text-[10px] font-bold text-slate-400">共 {MOCK_DETAIL.items.length} 项商品</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-[11px]">
              <thead className="bg-slate-50 font-black text-slate-500 uppercase">
                <tr>
                  {["行号", "物料信息", "单位", "数量", "单价(含/不含)", "金额(含/不含)", "税率", "到货状态", "质检", "备注"].map(h => (
                    <th key={h} className="px-4 py-3 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_DETAIL.items.map((item) => (
                  <tr key={item.lineNo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-4 font-mono text-slate-400">{item.lineNo}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{item.name}</span>
                        <span className="text-[10px] text-slate-500">{item.spec} | {item.code} | {item.materialType}</span>
                        <span className="text-[9px] text-blue-500 mt-1">关联工单: {item.relatedWorkOrder}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">{item.unit}</td>
                    <td className="px-4 py-4 font-bold">{item.quantity}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold">¥{item.priceWithTax.toFixed(2)}</span>
                        <span className="text-slate-400">¥{item.priceNoTax.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-800">¥{item.amountWithTax.toLocaleString()}</span>
                        <span className="text-slate-400 font-mono">¥{item.amountNoTax.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-400">{item.taxRate}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-emerald-600">已到: {item.actualArrival}</span>
                        <span className="text-xs font-bold text-rose-500">未到: {item.pendingArrival}</span>
                        <span className="text-[9px] text-slate-400">计划: {item.plannedArrival}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                       <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-black border border-blue-100 uppercase text-[9px]">{item.qcRequirement}</span>
                    </td>
                    <td className="px-4 py-4 text-slate-500 italic max-w-xs truncate">{item.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section: Costs & Settlement */}
          <section className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className={sectionTitleClass}>费用与结算</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl">
                <label className={labelClass}>订单总额 (含/不含税)</label>
                <p className="text-sm font-black text-slate-800">¥{MOCK_DETAIL.settlement.totalWithTax.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 font-mono">¥{MOCK_DETAIL.settlement.totalNoTax.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <label className={labelClass}>最终应付金额</label>
                <p className="text-lg font-black text-blue-600">¥{MOCK_DETAIL.settlement.finalPayable.toLocaleString()}</p>
                <p className="text-[9px] text-slate-400 font-medium">含运费 ¥{MOCK_DETAIL.settlement.freight}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <label className={labelClass}>结算信息</label>
                <p className="text-sm font-bold">{MOCK_DETAIL.settlement.method} / {MOCK_DETAIL.settlement.paymentTerm}</p>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[9px] font-black uppercase">{MOCK_DETAIL.settlement.paymentStatus}</span>
              </div>
              <div className="md:col-span-2 lg:col-span-3 border-t border-slate-50 pt-4">
                 <label className={labelClass}>发票记录</label>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    <div><span className="text-[10px] text-slate-400 uppercase block">类型</span><span className="text-xs font-bold">{MOCK_DETAIL.settlement.invoice.type}</span></div>
                    <div><span className="text-[10px] text-slate-400 uppercase block">发票号</span><span className="text-xs font-mono font-bold">{MOCK_DETAIL.settlement.invoice.no}</span></div>
                    <div><span className="text-[10px] text-slate-400 uppercase block">开票日期</span><span className="text-xs font-bold">{MOCK_DETAIL.settlement.invoice.date}</span></div>
                    <div><span className="text-[10px] text-slate-400 uppercase block">是否收票</span><span className="text-xs font-black text-emerald-600 uppercase">{MOCK_DETAIL.settlement.invoice.received}</span></div>
                 </div>
              </div>
            </div>
          </section>

          {/* Section: Receipts & Quality */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className={sectionTitleClass}>收货与质检</div>
            <div className="flex-1 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center"><div className="w-1 h-3 bg-emerald-500 mr-2"></div> 关联质检单</label>
                {MOCK_DETAIL.relatedOrders.qualityChecks.map(q => (
                  <div key={q.no} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center group cursor-pointer hover:bg-white hover:shadow-md transition-all">
                    <div>
                      <p className="text-xs font-bold text-emerald-600 underline">{q.no}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{q.date}</p>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase mb-1">RESULT: {q.result}</span>
                       <span className="text-[10px] text-slate-400">不合格: {q.unqualifiedQty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Section: Approvals & Logs */}
           <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className={sectionTitleClass}>审批与操作日志</div>
              <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                 {MOCK_DETAIL.approvals.map((a, i) => (
                    <div key={i} className="relative pl-10">
                       <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center border-4 border-white shadow-md z-10">
                          <CheckIcon className="h-3 w-3 text-white" />
                       </div>
                       <div>
                          <div className="flex justify-between items-start">
                             <span className="text-xs font-black text-slate-800">{a.approver}</span>
                             <span className="text-[10px] font-mono text-slate-400">{a.time}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-2 p-3 bg-slate-50 rounded-xl italic border border-slate-100">“ {a.opinion} ”</p>
                       </div>
                    </div>
                 ))}
                 {MOCK_DETAIL.logs.map((l, i) => (
                    <div key={i} className="relative pl-10">
                       <div className="absolute left-1 top-1.5 w-5 h-5 rounded-full bg-slate-200 border-4 border-white z-10"></div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-medium">{l.user} {l.type}</span>
                          <span className="text-[10px] font-mono text-slate-300">{l.time}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           {/* Section: Remarks & Attachments */}
           <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-10">
              <div>
                <div className={sectionTitleClass}>单据备注</div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed min-h-[100px]">
                  {MOCK_DETAIL.remark}
                </div>
              </div>
              <div>
                <div className={sectionTitleClass}>采购附件</div>
                <div className="grid grid-cols-1 gap-3">
                  {MOCK_DETAIL.attachments.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-blue-50/50 hover:border-blue-200 transition-all group cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
                          <PaperClipIcon className="h-4 w-4 text-blue-500" />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{file.name}</span>
                      </div>
                      <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">预览</button>
                    </div>
                  ))}
                </div>
              </div>
           </section>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};
