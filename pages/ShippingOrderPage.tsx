
import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { PaperClipIcon } from '../components/icons/PaperClipIcon';
import { SearchIcon } from '../components/icons/SearchIcon';

type TabType = '单证' | '提单信息' | '报关' | '上传附件' | '单证明细' | '报关明细';

export const ShippingOrderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('单证');
  const [isRelateMenuOpen, setIsRelateMenuOpen] = useState(false);

  const tabs: TabType[] = ['单证', '提单信息', '报关', '上传附件', '单证明细', '报关明细'];

  const inputClass = "block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed";
  const labelClass = "block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider";
  const sectionTitleClass = "flex items-center space-x-2 mb-6 border-l-4 border-blue-600 pl-3";

  // 渲染表单字段组件
  const FormField = ({ label, value, type = 'text', disabled = false, remark = '' }: any) => (
    <div className="flex flex-col">
      <label className={labelClass}>{label}</label>
      {type === 'switch' ? (
        <div className="flex items-center h-10">
          <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${value ? 'bg-blue-600' : 'bg-slate-200'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      ) : type === 'textarea' ? (
        <textarea className={`${inputClass} min-h-[80px] resize-none`} defaultValue={value} disabled={disabled} />
      ) : (
        <input type={type === 'datePicker' ? 'date' : type === 'numberInput' ? 'number' : 'text'} 
               className={inputClass} defaultValue={value} disabled={disabled} />
      )}
      {remark && <span className="text-[10px] text-blue-500 mt-1 font-medium italic">*{remark}</span>}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 顶部操作区 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">出运单</h1>
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100 uppercase">编辑中</span>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* 关联数据下拉按钮 */}
          <div className="relative">
            <button 
              onClick={() => setIsRelateMenuOpen(!isRelateMenuOpen)}
              className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              关联数据
              <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform ${isRelateMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {isRelateMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {['关联外销合同', '关联出运计划', '关联商品库'].map((opt) => (
                    <button key={opt} className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 transition-colors font-medium">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">保存</button>
          <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 transition-all shadow-md active:scale-95">一键生成报关单</button>
        </div>
      </div>

      {/* 标签导航 */}
      <div className="bg-white border-b border-slate-200 px-6 pt-4 sticky top-[68px] z-30 shadow-sm">
        <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-black text-xs uppercase tracking-widest transition-all
                ${activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 lg:p-8 space-y-6 flex-1 min-h-0">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          
          {activeTab === '单证' && (
            <div className="animate-in fade-in duration-500">
              <div className={sectionTitleClass}>
                <h3 className="text-lg font-bold text-slate-800">基本单证信息</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField label="出口发票号" value="ZC-FP-20260106" />
                <FormField label="发票日期" value="2026-01-06" type="datePicker" />
                <FormField label="出运计划单号" value="CY2510008" />
                <FormField label="外销合同" value="感应龙头外壳采购-123456" remark="已关联" disabled />
                <FormField label="我方编号" value="ZC-DD-20260106" />
                <FormField label="我方名称" value="众成贸易有限公司" disabled />
                <FormField label="客户编号" value="KH-TH001" remark="已关联" disabled />
                <FormField label="客户名称" value="泰华贸易" remark="已关联" disabled />
                <FormField label="目的港" value="曼谷港" remark="已关联" disabled />
                <FormField label="起运港" value="青岛港" remark="已关联" disabled />
                <FormField label="船期" value="2026-01-07" type="datePicker" />
                <FormField label="运输方式" value="By Sea" />
                <FormField label="结汇方式" value="T/T-B/L" />
                <FormField label="成交方式" value="FOB" />
                <FormField label="币别" value="人民币" />
                <FormField label="汇率" value="7.2000" type="numberInput" />
                <FormField label="货代编号" value="HD-HW001" remark="已关联" disabled />
                <FormField label="货代名称" value="汉王船舶" remark="已关联" disabled />
                <FormField label="提单号" value="BL-QD-BK20260107" />
                <FormField label="船名" value="中远海运XX号" />
                <FormField label="航次" value="HY202601" />
                <FormField label="装柜日期" value="2026-01-06" type="datePicker" />
                <FormField label="发票金额" value="85000.00" disabled remark="明细自动计算" />
                <FormField label="投保日期" value="2026-01-05" type="datePicker" />
                <FormField label="交货日期" value="2026-01-05" type="datePicker" />
                <FormField label="预计收汇日期" value="2026-01-20" type="datePicker" />
                <FormField label="溢短装" value="±2%" />
                <FormField label="是否清关" value={true} type="switch" />
              </div>
            </div>
          )}

          {activeTab === '提单信息' && (
            <div className="animate-in fade-in duration-500">
              <div className={sectionTitleClass}>
                <h3 className="text-lg font-bold text-slate-800">提单详情配置</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="提单通知人" value="泰华贸易采购部" />
                <FormField label="提单收货人" value="泰华贸易（曼谷）" />
                <FormField label="唛头" value="ZC-SP-20260106 / 感应龙头外壳 / 防摔" />
                <FormField label="备注" value="感应配件需轻装轻卸" />
                <FormField label="约定运价" value="3200.00" type="numberInput" />
                <FormField label="提单加注" value="易碎品，禁止堆叠" />
              </div>
            </div>
          )}

          {activeTab === '报关' && (
            <div className="animate-in fade-in duration-500">
              <div className={sectionTitleClass}>
                <h3 className="text-lg font-bold text-slate-800">出口报关信息</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField label="报关单号" value="BG-QD-20260106" />
                <FormField label="报关日期" value="2026-01-06" type="datePicker" />
                <FormField label="出口日期" value="2026-01-07" type="datePicker" />
                <FormField label="报关抬头编号" value="TH-001" />
                <FormField label="报关抬头" value="众成贸易有限公司" disabled />
                <FormField label="生产销售单位代码" value="SC-ZC001" />
                <FormField label="生产销售单位" value="众成贸易有限公司" />
                <FormField label="海关编码" value="8536500000" />
                <FormField label="境内货源地" value="山东青岛" />
                <FormField label="备案号" value="BA-20260106" />
                <FormField label="运抵国" value="泰国" />
                <FormField label="贸易国" value="泰国" />
                <FormField label="报关数量" value="500.00" disabled remark="自动同步明细" />
                <FormField label="征免性质" value="一般征税" />
                <FormField label="报关件数" value="100.00" disabled remark="自动同步明细" />
                <FormField label="件数单位" value="箱" />
                <FormField label="报关总体积" value="6.64" disabled remark="自动同步明细" />
                <FormField label="报关总净重" value="4500.00" disabled remark="自动同步明细" />
                <FormField label="报关总毛重" value="4700.00" disabled remark="自动同步明细" />
                <FormField label="报关总金额" value="85000.00" disabled remark="自动同步发票" />
                <FormField label="运费" value="3200.00" type="numberInput" />
                <FormField label="保费" value="0.00" type="numberInput" />
                <FormField label="杂费" value="0.00" type="numberInput" />
                <FormField label="随附单据" value="外销合同、质检报告" />
                <div className="lg:col-span-4">
                  <FormField label="报关唛头" value="ZC-SP-20260106 / 感应龙头外壳 / 防摔" type="textarea" />
                </div>
              </div>
            </div>
          )}

          {activeTab === '上传附件' && (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-6">
                <div className={sectionTitleClass + " mb-0"}>
                  <h3 className="text-lg font-bold text-slate-800">附件管理</h3>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 shadow-sm">+ 新增</button>
                  <button className="px-3 py-1.5 bg-white border border-slate-300 text-rose-600 rounded text-xs font-bold hover:bg-rose-50 shadow-sm">批量删除</button>
                  <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-500 rounded text-xs font-bold hover:bg-slate-50 shadow-sm font-mono">√ 取消筛选</button>
                </div>
              </div>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer mb-8 group">
                <PaperClipIcon className="mx-auto h-12 w-12 text-slate-300 group-hover:text-blue-500 transition-colors mb-3" />
                <p className="text-sm text-slate-500 font-medium">将文件拖到此处，或 <span className="text-blue-600 font-bold underline">点击上传</span></p>
              </div>
              <div className="overflow-hidden border border-slate-200 rounded-xl">
                <table className="min-w-full divide-y divide-slate-200 text-xs">
                  <thead className="bg-slate-50">
                    <tr>
                      {["序号", "附件名称", "缩略图", "创建人", "创建时间", "操作"].map(h => (
                        <th key={h} className="px-6 py-3 text-left font-black text-slate-500 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {[
                      { no: 1, name: '外销合同扫描件.pdf', thumb: '——', user: '王外贸', time: '2026-01-06' },
                      { no: 2, name: '货物质检报告.pdf', thumb: '——', user: '王外贸', time: '2026-01-06' }
                    ].map(att => (
                      <tr key={att.no} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-mono text-slate-400">{att.no}</td>
                        <td className="px-6 py-4 font-bold text-blue-600 cursor-pointer hover:underline">{att.name}</td>
                        <td className="px-6 py-4 text-slate-300 italic">{att.thumb}</td>
                        <td className="px-6 py-4 text-slate-600">{att.user}</td>
                        <td className="px-6 py-4 text-slate-500">{att.time}</td>
                        <td className="px-6 py-4">
                          <button className="text-rose-500 font-bold hover:text-rose-700">删除</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === '单证明细' && (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-6">
                <div className={sectionTitleClass + " mb-0"}>
                  <h3 className="text-lg font-bold text-slate-800">出运单证明细</h3>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 shadow-sm">+ 新增</button>
                  <button className="px-3 py-1.5 bg-white border border-slate-300 text-rose-600 rounded text-xs font-bold hover:bg-rose-50 shadow-sm">批量删除</button>
                </div>
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-xl custom-scrollbar">
                <table className="min-w-full divide-y divide-slate-200 text-[11px] border-separate border-spacing-0">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>
                      {[
                        "#", "图片", "外销合同", "商品编号", "客户货号", "工厂货号", 
                        "中文货名", "中文描述", "质检批次", "条码", "单位", 
                        "订单数量", "销售单价", "销售金额", "采购单价", 
                        "每箱装量", "单箱净重", "单箱毛重", "长", "宽", "高", "单箱体积"
                      ].map((h, i) => (
                        <th key={h} className={`px-4 py-3 text-left font-black text-slate-500 uppercase whitespace-nowrap border-b border-slate-200 ${i === 0 ? 'sticky left-0 bg-slate-50 z-10' : ''}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100 font-medium">
                    <tr className="hover:bg-blue-50/50">
                      <td className="px-4 py-4 sticky left-0 bg-white group-hover:bg-blue-50/50 z-10 font-mono text-slate-400">1</td>
                      <td className="px-4 py-4 text-slate-300 italic">[图]</td>
                      <td className="px-4 py-4 text-blue-600 font-bold whitespace-nowrap">感应龙头外壳采购-123456</td>
                      <td className="px-4 py-4 text-slate-700 font-mono">SP-001</td>
                      <td className="px-4 py-4 text-slate-500 font-mono">TH-SP001</td>
                      <td className="px-4 py-4 text-slate-500 font-mono">GC-SP001</td>
                      <td className="px-4 py-4 text-slate-800 font-bold whitespace-nowrap">感应龙头外壳（ABS）</td>
                      <td className="px-4 py-4 text-slate-500 whitespace-nowrap">医用级防菌ABS材质</td>
                      <td className="px-4 py-4 text-indigo-600 font-bold">QC-202601</td>
                      <td className="px-4 py-4 text-slate-400 font-mono">324352123</td>
                      <td className="px-4 py-4 text-slate-600">件</td>
                      <td className="px-4 py-4 text-right font-black text-slate-900">500</td>
                      <td className="px-4 py-4 text-right font-mono">170.00</td>
                      <td className="px-4 py-4 text-right font-black text-blue-600">85,000.00</td>
                      <td className="px-4 py-4 text-right font-mono text-slate-400">120.00</td>
                      <td className="px-4 py-4 text-center">50</td>
                      <td className="px-4 py-4 text-right">45.00</td>
                      <td className="px-4 py-4 text-right">47.00</td>
                      <td className="px-4 py-4 text-center">12</td>
                      <td className="px-4 py-4 text-center">45</td>
                      <td className="px-4 py-4 text-center">123</td>
                      <td className="px-4 py-4 text-right font-mono font-bold text-amber-600">0.07</td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 font-black text-slate-800">
                    <tr>
                      <td colSpan={11} className="px-4 py-3 text-right uppercase tracking-widest text-[10px]">合计:</td>
                      <td className="px-4 py-3 text-right">500</td>
                      <td className="px-4 py-3"></td>
                      <td className="px-4 py-3 text-right text-blue-700">85,000.00</td>
                      <td colSpan={8}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {activeTab === '报关明细' && (
            <div className="animate-in fade-in duration-500">
              <div className={sectionTitleClass}>
                <h3 className="text-lg font-bold text-slate-800">出口报关商品明细</h3>
              </div>
              <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-xs">
                  <thead className="bg-slate-50">
                    <tr>
                      {["#", "供应商编号", "供应商名称", "海关编码", "海关中文货名", "报关英文货名", "退税率", "进项税率", "是否商检"].map(h => (
                        <th key={h} className="px-6 py-4 text-left font-black text-slate-500 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100 font-medium">
                    <tr className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono text-slate-400">1</td>
                      <td className="px-6 py-4 font-mono text-slate-500 uppercase">GY001</td>
                      <td className="px-6 py-4 text-slate-700">迪星公司</td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-800">8536500000</td>
                      <td className="px-6 py-4 text-slate-800 font-bold">感应龙头外壳</td>
                      <td className="px-6 py-4 text-slate-500 italic uppercase">Thermostat</td>
                      <td className="px-6 py-4 font-black text-emerald-600">13%</td>
                      <td className="px-6 py-4 font-black text-blue-600">13%</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-black">否</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
