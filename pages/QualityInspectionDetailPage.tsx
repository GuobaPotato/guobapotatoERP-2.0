
import React, { useState } from 'react';
import { Page } from '../App';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';

interface QualityInspectionDetailPageProps {
  setCurrentPage: (page: Page) => void;
}

const PAGE_CONFIG = {
  qcCode: "QC-20241020-01",
  qcType: "来料质检",
  status: "INSPECTING", // INSPECTING, WAIT_APPROVAL, APPROVED, REJECTED
  relatedOrderCode: "PO-20240925008",
  applyDept: "采购部",
  applyTime: "2024-10-20 10:00:00",
  managerName: "赵质检",
  materialList: [
    { materialCode: "MAT-INF-001", materialName: "红外传感器探头", spec: "HC-SR501", inspectQty: 1000, locationCode: "W-A01", sampleQty: 50 }
  ],
  qcResults: [
    { id: 1, qcItem: "外观检查", qcStandard: "表面无划痕、无氧化", detectValue: "", judgeResult: "PASS", unqualifiedDesc: "" },
    { id: 2, qcItem: "感应灵敏度", qcStandard: "感应距离 3-7m 可调", detectValue: "", judgeResult: "PASS", unqualifiedDesc: "" }
  ]
};

export const QualityInspectionDetailPage: React.FC<QualityInspectionDetailPageProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('BASE_INFO');

  const tabs = [
    { tabCode: "BASE_INFO", tabName: "基础信息" },
    { tabCode: "MATERIAL_LIST", tabName: "待检物料" },
    { tabCode: "QC_RESULT", tabName: "质检结果" },
    { tabCode: "PROCESS_OPINION", tabName: "处理意见" },
    { tabCode: "WAREHOUSE_IN", tabName: "入库信息" }
  ];

  const statusLabelMap: Record<string, string> = {
    INSPECTING: "质检中",
    WAIT_APPROVAL: "待审批",
    APPROVED: "审批通过",
    REJECTED: "驳回"
  };

  const statusColorMap: Record<string, string> = {
    INSPECTING: "bg-blue-50 text-blue-700 border-blue-100",
    WAIT_APPROVAL: "bg-amber-50 text-amber-700 border-amber-100",
    APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    REJECTED: "bg-rose-50 text-rose-700 border-rose-100"
  };

  const isEditable = ["INSPECTING"].includes(PAGE_CONFIG.status);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 顶部操作区 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentPage('qualityControl')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-slate-800">质检单详情 - {PAGE_CONFIG.qcCode}</h1>
            <div className="flex items-center space-x-2 mt-0.5">
               <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${statusColorMap[PAGE_CONFIG.status]}`}>
                  {statusLabelMap[PAGE_CONFIG.status]}
               </span>
               <span className="text-[10px] text-slate-400 font-medium">最后更新: 2024-10-20 16:30</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {PAGE_CONFIG.status === 'INSPECTING' && (
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">提交质检结果</button>
          )}
          {PAGE_CONFIG.status === 'WAIT_APPROVAL' && (
            <>
              <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all shadow-md active:scale-95">审批通过</button>
              <button className="px-6 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 transition-all shadow-md active:scale-95">驳回</button>
            </>
          )}
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center">
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            导出质检单
          </button>
        </div>
      </div>

      {/* 标签导航 */}
      <div className="bg-white border-b border-slate-200 px-6 pt-4 sticky top-[68px] z-30 shadow-sm">
        <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.tabCode}
              onClick={() => setActiveTab(tab.tabCode)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-black text-xs uppercase tracking-widest transition-all
                ${activeTab === tab.tabCode
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}
              `}
            >
              {tab.tabName}
            </button>
          ))}
        </nav>
      </div>

      {/* 内容区域 */}
      <div className="p-8 space-y-6 flex-1 max-w-7xl mx-auto w-full">
        
        {activeTab === 'BASE_INFO' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
              {[
                { label: "质检单编号", value: PAGE_CONFIG.qcCode, type: 'TEXT' },
                { label: "质检类型", value: PAGE_CONFIG.qcType, type: 'TEXT' },
                { label: "单据状态", value: statusLabelMap[PAGE_CONFIG.status], type: 'TAG' },
                { label: "关联单据号", value: PAGE_CONFIG.relatedOrderCode, type: 'LINK' },
                { label: "申请部门", value: PAGE_CONFIG.applyDept, type: 'TEXT' },
                { label: "申请时间", value: PAGE_CONFIG.applyTime, type: 'DATETIME' },
                { label: "质检负责人", value: PAGE_CONFIG.managerName, type: 'TEXT' }
              ].map(f => (
                <div key={f.label} className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{f.label}</span>
                  <div className="text-sm font-bold text-slate-800">
                    {f.type === 'LINK' ? <span className="text-blue-600 underline cursor-pointer">{f.value}</span> : f.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'MATERIAL_LIST' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-500">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50">
                <tr>
                  {["物料编码", "物料名称", "规格型号", "待检数量", "待检库位", "抽样数量"].map(h => (
                    <th key={h} className="px-6 py-4 text-left font-black text-slate-500 uppercase tracking-widest border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 font-medium">
                {PAGE_CONFIG.materialList.map((m, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-400">{m.materialCode}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{m.materialName}</td>
                    <td className="px-6 py-4 text-slate-600">{m.spec}</td>
                    <td className="px-6 py-4 text-right font-mono pr-12">{m.inspectQty}</td>
                    <td className="px-6 py-4 text-slate-500">{m.locationCode}</td>
                    <td className="px-6 py-4 text-right font-mono pr-12">{m.sampleQty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'QC_RESULT' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-500">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50">
                <tr>
                  {["质检项目", "质检标准", "检测值", "判定结果", "不合格说明"].map(h => (
                    <th key={h} className="px-6 py-4 text-left font-black text-slate-500 uppercase tracking-widest border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 font-medium">
                {PAGE_CONFIG.qcResults.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{r.qcItem}</td>
                    <td className="px-6 py-4 text-slate-500 max-w-xs">{r.qcStandard}</td>
                    <td className="px-6 py-2">
                      <input 
                        type="text" 
                        disabled={!isEditable}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-slate-50"
                        placeholder="请输入检测数据"
                      />
                    </td>
                    <td className="px-6 py-2">
                      <select 
                        disabled={!isEditable}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-slate-50"
                      >
                        <option value="PASS">合格</option>
                        <option value="FAIL">不合格</option>
                        <option value="CONCESSION">让步接收</option>
                      </select>
                    </td>
                    <td className="px-6 py-2">
                      <textarea 
                        disabled={!isEditable}
                        rows={1}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-slate-50 resize-none"
                        placeholder="请输入说明"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'PROCESS_OPINION' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in fade-in duration-500 max-w-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">整体判定</label>
                <select 
                  disabled={!isEditable && PAGE_CONFIG.status !== 'REJECTED'}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-bold focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-slate-50"
                >
                  <option value="ALL_PASS">全部合格</option>
                  <option value="PART_FAIL">部分不合格</option>
                  <option value="ALL_FAIL">全部不合格</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">处理方式</label>
                <select 
                  disabled={!isEditable && PAGE_CONFIG.status !== 'REJECTED'}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-bold focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-slate-50"
                >
                  <option value="WAREHOUSE_IN">合格入库</option>
                  <option value="RETURN">退货</option>
                  <option value="REWORK">返工</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">审批意见</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  placeholder="请输入审批或处理意见内容..."
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'WAREHOUSE_IN' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in fade-in duration-500 max-w-2xl">
             <div className="space-y-6">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start space-x-3 mb-4">
                  <div className="text-blue-600 mt-0.5">ℹ️</div>
                  <p className="text-xs text-blue-700 font-medium leading-relaxed">
                    质检完成后，系统将根据入库信息生成相应的入库单据。请确保库位与数量填写真实准确。
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">库位类别 <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <select className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-bold focus:ring-1 focus:ring-blue-500 outline-none bg-white appearance-none pr-10">
                        <option value="">请选择库位类别</option>
                        <option value="INCOMING_AREA">来料区</option>
                        <option value="FINISHED_AREA">成品区</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <ChevronDownIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">库位编号 <span className="text-rose-500">*</span></label>
                    <div className="relative">
                      <select className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-bold focus:ring-1 focus:ring-blue-500 outline-none bg-white appearance-none pr-10">
                        <option value="">请选择库位编号</option>
                        {["A01", "A02", "A03", "A04", "B01", "B02", "B03"].map(v => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                        <ChevronDownIcon className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">入库数量 <span className="text-rose-500">*</span></label>
                    <input 
                      type="number" 
                      min={1}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm font-bold focus:ring-1 focus:ring-blue-500 outline-none"
                      placeholder="请输入入库数量"
                    />
                    <p className="text-[10px] text-slate-400 mt-2 italic">* 入库数量必须为大于0的整数</p>
                  </div>
                </div>
             </div>
          </div>
        )}

      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
