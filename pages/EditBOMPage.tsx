
import React from 'react';
import { Page } from '../App';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';

interface EditBOMPageProps {
  setCurrentPage: (page: Page) => void;
}

export const EditBOMPage: React.FC<EditBOMPageProps> = ({ setCurrentPage }) => {
  const inputClass = "w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all";
  const readonlyInputClass = "w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed italic font-medium";
  const labelClass = "block text-sm font-bold text-slate-700 mb-1.5";
  const groupTitleClass = "text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 after:content-[''] after:h-[1px] after:flex-1 after:bg-slate-100";
  const tableHeaderClass = "px-6 py-4 text-left font-black text-slate-500 uppercase tracking-widest border-b border-slate-100";

  const processData = [
    { id: "1", name: "焊接", code: "GX001", qty: "1.00", team: "A组", leader: "王", count: "6", qc: "刘" },
    { id: "2", name: "组装", code: "GX003", qty: "1.00", team: "C组", leader: "王", count: "5", qc: "刘" }
  ];

  const bomDetailData = [
    { id: "1", name: "电路主板", code: "B007", attr: "主料", spec: "4140", usage: "500.00", unit: "件", method: "采购", procName: "焊接", procCode: "GX001" },
    { id: "2", name: "组装外壳", code: "C008", attr: "辅料", spec: "7050", usage: "500.00", unit: "件", method: "采购", procName: "组装", procCode: "GX002" }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentPage('productManagement')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">编辑BOM</h1>
        </div>
      </div>

      <div className="flex-1 p-8 space-y-8 max-w-7xl mx-auto w-full pb-32">
        
        {/* 主产品信息 */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className={groupTitleClass}>主产品信息</h3>
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-md hover:bg-blue-700 active:scale-95 transition-all">选择产品</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className={labelClass}>产品名称</label>
              <input type="text" className={inputClass} defaultValue="智能水龙头A006" />
            </div>
            <div>
              <label className={labelClass}>产品编码</label>
              <input type="text" className={inputClass} defaultValue="A006" />
            </div>
            <div>
              <label className={labelClass}>产品属性</label>
              <input type="text" className={inputClass} defaultValue="组装" />
            </div>
            <div>
              <label className={labelClass}>产品类型</label>
              <input type="text" className={inputClass} defaultValue="智能水龙头" />
            </div>
            <div>
              <label className={labelClass}>规格型号</label>
              <input type="text" className={inputClass} defaultValue="BH-GR161500" />
            </div>
            <div>
              <label className={labelClass}>获取方式</label>
              <input type="text" className={inputClass} defaultValue="组装" />
            </div>
            <div>
              <label className={labelClass}>生产单位</label>
              <input type="text" className={inputClass} defaultValue="套" />
            </div>
            <div>
              <label className={labelClass}>BOM编码</label>
              <input type="text" disabled className={readonlyInputClass} value="自动生成无需填写" />
            </div>
          </div>
        </section>

        {/* 工序明细 */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">工序明细</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-[11px]">
              <thead className="bg-white">
                <tr>
                  {["工序序号", "工序名称", "工序编码", "单位生产量", "生产班组", "班组长", "班组人数", "质检员"].map(h => (
                    <th key={h} className={tableHeaderClass}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {processData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-400 text-center w-24">{row.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{row.name}</td>
                    <td className="px-6 py-4 font-mono text-blue-600">{row.code}</td>
                    <td className="px-6 py-4 text-right font-mono pr-12">{row.qty}</td>
                    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 font-bold">{row.team}</span></td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{row.leader}</td>
                    <td className="px-6 py-4 font-black text-slate-400">{row.count}人</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{row.qc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-3 bg-slate-50/50 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            20 条/页 共1条
          </div>
        </section>

        {/* 产品BOM明细 */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">产品BOM明细</h4>
            <div className="flex gap-2">
              <button className="flex items-center px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-md">
                <PlusIcon className="h-3 w-3 mr-1" /> 添加
              </button>
              <button className="flex items-center px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                <ArrowPathIcon className="h-3 w-3 mr-1" /> 快速填报
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-[11px] border-separate border-spacing-0">
              <thead className="bg-white sticky top-0">
                <tr>
                  {["BOM明细", "选择产品", "产品名称", "产品编码", "产品属性", "规格型号", "*标准用量", "生产单位", "获取方式", "工序名称", "工序编码"].map((h, i) => (
                    <th key={h} className={`${tableHeaderClass} ${i === 0 ? 'sticky left-0 bg-white z-10' : ''}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bomDetailData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-black text-slate-400 text-center sticky left-0 bg-white group-hover:bg-slate-50 z-10">{row.id}</td>
                    <td className="px-6 py-4">
                       <div className="relative">
                          <select className="w-24 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-blue-600 focus:ring-1 focus:ring-blue-500 outline-none appearance-none pr-6">
                            <option>请选择</option>
                            <option selected>{row.name}</option>
                          </select>
                          <ChevronDownIcon className="absolute right-1 top-1.5 h-3 w-3 text-slate-300 pointer-events-none" />
                       </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800 whitespace-nowrap">{row.name}</td>
                    <td className="px-6 py-4 font-mono text-blue-600">{row.code}</td>
                    <td className="px-6 py-4"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-black border border-blue-100 text-[9px]">{row.attr}</span></td>
                    <td className="px-6 py-4 text-slate-500">{row.spec}</td>
                    <td className="px-6 py-4"><input type="text" className="w-20 border border-blue-200 rounded px-2 py-1 font-black text-blue-600 bg-blue-50/20 text-center" defaultValue={row.usage} /></td>
                    <td className="px-6 py-4 text-center">{row.unit}</td>
                    <td className="px-6 py-4 font-bold text-slate-600">{row.method}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">{row.procName}</td>
                    <td className="px-6 py-4 font-mono text-slate-400 uppercase">{row.procCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 规格参数 */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h3 className={groupTitleClass}>规格参数</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "直径/mm", value: "16.0" },
              { label: "长度规格/m", value: "15.00" },
              { label: "镀层厚度/mm", value: "0.254" },
              { label: "重量/kg", value: "17.500" }
            ].map(param => (
              <div key={param.label} className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{param.label}</span>
                <span className="text-sm font-bold text-slate-700">{param.value}</span>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 底部悬浮操作栏 */}
      <div className="fixed bottom-0 right-0 left-64 bg-white/80 backdrop-blur-md border-t border-slate-200 px-8 py-5 flex justify-end items-center space-x-4 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] z-50">
        <button 
          onClick={() => setCurrentPage('productManagement')}
          className="px-10 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          保存草稿
        </button>
        <button 
          onClick={() => {
            alert('BOM修改已提交');
            setCurrentPage('productManagement');
          }}
          className="px-16 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 transform active:scale-95 uppercase tracking-widest"
        >
          提交
        </button>
      </div>
    </div>
  );
};
