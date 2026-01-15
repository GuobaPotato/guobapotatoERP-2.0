
import React, { useState } from 'react';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { PrinterIcon } from '../icons/PrinterIcon';
import { PaperClipIcon } from '../icons/PaperClipIcon';
import { CheckIcon } from '../icons/CheckIcon';
import { XMarkIcon } from '../icons/XMarkIcon';

interface ApprovalDetailViewProps {
  approvalId: string;
  onBack: () => void;
}

const MOCK_DETAIL = {
  "pageConfig": {
    "pageTitle": "SP-2026-0001",
    "moduleCode": "APPROVAL_DETAIL",
    "showBackBtn": true,
    "showPrintBtn": true
  },
  "detailContent": {
    "basicInfo": {
      "approvalNo": "SP-2026-0001",
      "approvalType": "采购审批",
      "applicant": "张三-采购部",
      "applyTime": "2026-01-13 14:30:00",
      "approvalStatus": "审批中",
      "urgencyLevel": "普通"
    },
    "businessInfo": {
      "supplierName": "XX电子配件有限公司",
      "materialList": [
        {
          "materialCode": "IR-001",
          "materialName": "红外线感应探头",
          "model": "IR-PRO-2026",
          "quantity": 5000,
          "unitPrice": 15.5,
          "totalPrice": 77500,
          "currency": "CNY"
        }
      ],
      "deliveryCycle": "30天",
      "paymentMethod": "月结30天",
      "materialPurpose": "出口订单备货"
    },
    "approvalFlow": {
      "currentNode": "财务主管审批",
      "approvedNodes": [
        {
          "approver": "李四-采购经理",
          "approveTime": "2026-01-13 15:00:00",
          "approveOpinion": "同意采购，确认供应商资质齐全"
        }
      ],
      "pendingNodes": [
        {
          "approver": "王五-财务主管",
          "deadline": "2026-01-14 18:00:00"
        }
      ]
    },
    "attachments": [
      {
        "fileName": "采购合同-IR-001.pdf",
        "uploadTime": "2026-01-13 14:25:00",
        "fileSize": "2.5MB",
        "fileUrl": "#",
        "previewable": true
      }
    ],
    "otherInfo": {
      "remark": "该批探头需符合欧盟CE认证标准",
      "relatedOrderNo": "PO-2026-0001"
    }
  },
  "operationConfig": {
    "showOperationBtn": true, 
    "buttons": [
      {
        "btnType": "approve",
        "btnText": "同意",
        "btnStyle": "primary"
      },
      {
        "btnType": "reject",
        "btnText": "驳回",
        "btnStyle": "danger"
      }
    ]
  }
};

export const ApprovalDetailView: React.FC<ApprovalDetailViewProps> = ({ approvalId, onBack }) => {
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const sectionClass = "bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-6";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 block";
  const valueClass = "text-sm font-bold text-slate-700";

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden animate-in slide-in-from-right duration-300">
      {/* Sticky Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center z-50">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">审批详情: {MOCK_DETAIL.pageConfig.pageTitle}</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
              Module: {MOCK_DETAIL.detailContent.basicInfo.approvalType}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all">
            <PrinterIcon className="h-4 w-4 mr-2" />
            打印单据
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Information */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Basic Info Card */}
              <div className={sectionClass}>
                <div className="flex items-center space-x-2 mb-6 border-l-4 border-blue-600 pl-3">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">基础申请信息</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
                  <div>
                    <label className={labelClass}>审批单号</label>
                    <span className="font-mono text-sm font-bold text-blue-600">{MOCK_DETAIL.detailContent.basicInfo.approvalNo}</span>
                  </div>
                  <div>
                    <label className={labelClass}>申请人</label>
                    <span className={valueClass}>{MOCK_DETAIL.detailContent.basicInfo.applicant}</span>
                  </div>
                  <div>
                    <label className={labelClass}>申请时间</label>
                    <span className="text-sm font-mono text-slate-500">{MOCK_DETAIL.detailContent.basicInfo.applyTime}</span>
                  </div>
                  <div>
                    <label className={labelClass}>流程状态</label>
                    <span className="flex items-center">
                       <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse"></div>
                       <span className="text-sm font-bold text-blue-600">{MOCK_DETAIL.detailContent.basicInfo.approvalStatus}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Info Card */}
              <div className={sectionClass}>
                <div className="flex items-center space-x-2 mb-6 border-l-4 border-indigo-600 pl-3">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">业务详细数据</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className={labelClass}>供应厂商</label>
                    <span className="text-sm font-black text-slate-900">{MOCK_DETAIL.detailContent.businessInfo.supplierName}</span>
                  </div>
                  <div>
                    <label className={labelClass}>结算方式 / 交付周期</label>
                    <span className={valueClass}>
                      {MOCK_DETAIL.detailContent.businessInfo.paymentMethod} / {MOCK_DETAIL.detailContent.businessInfo.deliveryCycle}
                    </span>
                  </div>
                </div>

                <div className="overflow-hidden border border-slate-200 rounded-xl shadow-inner mb-6">
                  <table className="min-w-full divide-y divide-slate-100 text-[11px]">
                    <thead className="bg-slate-50">
                      <tr>
                        {["物料编码", "物料名称", "规格型号", "数量", "单价", "总价"].map(h => (
                          <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-50">
                      {MOCK_DETAIL.detailContent.businessInfo.materialList.map((m, i) => (
                        <tr key={i}>
                          <td className="px-4 py-4 font-mono text-slate-400">{m.materialCode}</td>
                          <td className="px-4 py-4 font-bold text-slate-800">{m.materialName}</td>
                          <td className="px-4 py-4 text-slate-500">{m.model}</td>
                          <td className="px-4 py-4 font-black text-slate-800">{m.quantity.toLocaleString()}</td>
                          <td className="px-4 py-4 font-mono text-slate-600">¥{m.unitPrice.toFixed(2)}</td>
                          <td className="px-4 py-4 font-mono font-black text-blue-600">¥{m.totalPrice.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <label className={labelClass}>用途说明</label>
                  <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {MOCK_DETAIL.detailContent.businessInfo.materialPurpose}
                  </p>
                </div>
              </div>

              {/* Attachments Card */}
              <div className={sectionClass}>
                 <div className="flex items-center space-x-2 mb-4 border-l-4 border-slate-400 pl-3">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">相关附件</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_DETAIL.detailContent.attachments.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-blue-50/50 hover:border-blue-200 transition-all group cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
                            <PaperClipIcon className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-700">{file.fileName}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{file.fileSize} • {file.uploadTime}</p>
                          </div>
                        </div>
                        <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">预览</button>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Other Info Card */}
              <div className={sectionClass}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>补充备注</label>
                    <p className="text-xs text-slate-500 italic">{MOCK_DETAIL.detailContent.otherInfo.remark}</p>
                  </div>
                  <div>
                    <label className={labelClass}>关联单据</label>
                    <span className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">{MOCK_DETAIL.detailContent.otherInfo.relatedOrderNo}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Approval Flow Timeline */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">审批进程控制</h3>
                  <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded uppercase">{MOCK_DETAIL.detailContent.approvalFlow.currentNode}</span>
                </div>

                <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                  
                  {/* Approved Nodes */}
                  {MOCK_DETAIL.detailContent.approvalFlow.approvedNodes.map((node, i) => (
                    <div key={i} className="relative pl-10 animate-in fade-in slide-in-from-top-2 duration-500">
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center border-4 border-white shadow-lg z-10">
                        <CheckIcon className="h-3 w-3 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-black text-slate-800">{node.approver}</span>
                          <span className="text-[10px] font-mono text-slate-400">{node.approveTime}</span>
                        </div>
                        <p className="text-[11px] text-emerald-600 mt-1 font-bold">【已同意】</p>
                        <p className="text-xs text-slate-500 mt-2 p-2 bg-slate-50 rounded-lg border border-slate-100 italic">“ {node.approveOpinion} ”</p>
                      </div>
                    </div>
                  ))}

                  {/* Current/Pending Node */}
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center border-4 border-white shadow-lg shadow-blue-100 z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-black text-slate-800">{MOCK_DETAIL.detailContent.approvalFlow.pendingNodes[0].approver}</span>
                        <span className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter">待处理</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold">截止日期: {MOCK_DETAIL.detailContent.approvalFlow.pendingNodes[0].deadline}</p>
                      <div className="mt-4 p-4 border-2 border-dashed border-blue-200 bg-blue-50/20 rounded-xl">
                        <p className="text-[11px] text-blue-600 font-bold leading-relaxed">系统提示：您是当前审批节点的负责人，请根据业务明细进行审核决策。</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Sticky Operation Footer */}
      <footer className="bg-white border-t border-slate-200 p-4 md:p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50">
        <div className="max-w-6xl mx-auto flex flex-col space-y-4">
          
          {rejectMode && (
             <div className="animate-in slide-in-from-bottom-4 duration-300">
               <label className="text-xs font-black text-rose-600 uppercase tracking-widest mb-2 block">驳回原因（必填）</label>
               <textarea 
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                placeholder="请输入详细的驳回理由，告知申请人需要修改的内容..."
                className="w-full p-4 border-2 border-rose-100 rounded-2xl bg-rose-50/30 text-sm focus:outline-none focus:border-rose-400 transition-all outline-none resize-none"
               />
             </div>
          )}

          <div className="flex justify-end items-center space-x-4">
            {rejectMode ? (
              <>
                <button 
                  onClick={() => setRejectMode(false)}
                  className="px-8 py-3 bg-white border border-slate-300 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm"
                >
                  放弃驳回
                </button>
                <button 
                  disabled={!rejectReason.trim()}
                  onClick={() => { alert('已驳回审批'); onBack(); }}
                  className="px-12 py-3 bg-rose-600 text-white rounded-2xl text-xs font-black hover:bg-rose-700 transition-all shadow-xl shadow-rose-200 disabled:opacity-50 disabled:grayscale uppercase tracking-widest active:scale-95"
                >
                  确认驳回
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setRejectMode(true)}
                  className="px-8 py-3 bg-white border border-rose-200 text-rose-600 rounded-2xl text-xs font-black hover:bg-rose-50 transition-all uppercase tracking-widest shadow-sm active:scale-95"
                >
                  驳回申请
                </button>
                <button 
                  onClick={() => { alert('已批准审批'); onBack(); }}
                  className="px-20 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 uppercase tracking-widest active:scale-95"
                >
                  同意申请
                </button>
              </>
            )}
          </div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};
