
import React, { useState } from 'react';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { PencilSquareIcon } from '../components/icons/PencilSquareIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
// Added missing Cog6ToothIcon and FilterIcon imports
import { Cog6ToothIcon } from '../components/icons/Cog6ToothIcon';
import { FilterIcon } from '../components/icons/FilterIcon';
import { AddProductTypeModal } from '../components/settings/AddProductTypeModal';
import { AddProductCategoryModal } from '../components/settings/AddProductCategoryModal';
import { AddProductSpecModal } from '../components/settings/AddProductSpecModal';
import { AddQualityInspectionRuleModal } from '../components/settings/AddQualityInspectionRuleModal';
import { AddClueCustomerSourceModal } from '../components/settings/AddClueCustomerSourceModal';

// 定义 JSON 数据结构
const DATA_JSON = {
  "pageConfig": {
    "pageTitle": "基础配置",
    "pageCode": "basicConfiguration",
    "style": "minimalist"
  },
  "moduleTabs": [
    { "name": "产品类型配置", "code": "productType" },
    { "name": "产品分类配置", "code": "productCategory" },
    { "name": "产品规格配置", "code": "productSpec" },
    { "name": "质检规则配置", "code": "qualityInspectionRule" },
    { "name": "线索及客户来源配置", "code": "clueCustomerSource" }
  ],
  "configModules": {
    "productType": {
      "data": [
        { "typeNo": "T001", "typeName": "成品", "typeDesc": "完成全部生产工序、检验合格，可直接入库销售或交付的最终产品", "sortNo": 1, "status": "enable", "createTime": "2025-11-28 09:30:00" },
        { "typeNo": "T002", "typeName": "半成品", "typeDesc": "完成部分生产工序，需进一步加工或组装才能成为成品的中间产品", "sortNo": 2, "status": "enable", "createTime": "2025-11-28 09:35:00" },
        { "typeNo": "T003", "typeName": "外协件", "typeDesc": "委托外部供应商加工生产，收回后可直接组装或少量加工的产品部件", "sortNo": 3, "status": "enable", "createTime": "2025-11-28 09:40:00" },
        { "typeNo": "T004", "typeName": "备品备件", "typeDesc": "用于产品维修、替换的专用配件，不参与常规成品组装", "sortNo": 4, "status": "enable", "createTime": "2025-11-28 09:45:00" }
      ]
    },
    "productCategory": {
      "data": [
        { "categoryNo": "C001", "categoryName": "卫浴传感器", "categoryDesc": "用于卫浴场景的人体感应、红外感应等成品传感器产品", "belongType": "成品", "sortNo": 1, "status": "enable", "createTime": "2025-11-28 09:00:00" },
        { "categoryNo": "C002", "categoryName": "温湿度传感器", "categoryDesc": "用于环境监测的温湿度采集成品传感器产品", "belongType": "成品", "sortNo": 2, "status": "enable", "createTime": "2025-11-28 09:05:00" },
        { "categoryNo": "C003", "categoryName": "传感器主板", "categoryDesc": "各类传感器的核心控制半成品，需组装外壳后成为成品", "belongType": "半成品", "sortNo": 3, "status": "enable", "createTime": "2025-11-28 09:10:00" },
        { "categoryNo": "C004", "categoryName": "传感器外壳", "categoryDesc": "各类传感器的防护外壳半成品，用于成品组装", "belongType": "半成品", "sortNo": 4, "status": "enable", "createTime": "2025-11-28 09:15:00" }
      ]
    },
    "productSpec": {
      "data": [
        { "specNo": "S001", "belongType": "成品", "belongCategory": "卫浴传感器", "specName": "外形尺寸", "specValue": "100mm*60mm*30mm", "isRequired": true, "isFilter": false, "sortNo": 1 },
        { "specNo": "S002", "belongType": "成品", "belongCategory": "卫浴传感器", "specName": "工作电压", "specValue": "DC12V/DC24V", "isRequired": true, "isFilter": true, "sortNo": 2 },
        { "specNo": "S003", "belongType": "半成品", "belongCategory": "传感器主板", "specName": "PCB板尺寸", "specValue": "80mm*50mm", "isRequired": true, "isFilter": false, "sortNo": 1 },
        { "specNo": "S004", "belongType": "半成品", "belongCategory": "传感器主板", "specName": "核心芯片型号", "specValue": "STM32F103C8T6", "isRequired": true, "isFilter": true, "sortNo": 2 }
      ]
    },
    "qualityInspectionRule": {
      "data": [
        { "ruleNo": "R001", "ruleName": "卫浴传感器外观检规", "applyProductType": "成品", "applyProductCategory": "卫浴传感器", "inspectionItems": "外壳划痕、接口平整度、丝印清晰度", "qualifiedStandard": "无明显划痕、接口无变形、丝印无模糊", "unqualifiedHandle": "返工", "status": "enable", "createTime": "2025-12-01 10:30:00" },
        { "ruleNo": "R002", "ruleName": "卫浴传感器功能检规", "applyProductType": "成品", "applyProductCategory": "卫浴传感器", "inspectionItems": "感应灵敏度、供电稳定性、信号传输", "qualifiedStandard": "感应距离≥5m、DC12V供电无故障、信号传输无丢包", "unqualifiedHandle": "报废", "status": "enable", "createTime": "2025-12-01 10:35:00" },
        { "ruleNo": "R003", "ruleName": "传感器主板焊接检规", "applyProductType": "半成品", "applyProductCategory": "传感器主板", "inspectionItems": "焊点光泽、无虚焊、无连锡、元件贴装平整度", "qualifiedStandard": "焊点圆润有光泽、无虚焊连锡、元件贴装偏差≤0.1mm", "unqualifiedHandle": "返工", "status": "enable", "createTime": "2025-12-02 09:15:00" }
      ]
    },
    "clueCustomerSource": {
      "data": [
        { "sourceNo": "CS001", "sourceName": "线上官网", "sourceType": "clueSource", "sourceDesc": "企业官方网站留言获取的销售线索", "sortNo": 1, "status": "enable", "createTime": "2025-11-29 10:00:00" },
        { "sourceNo": "CS002", "sourceName": "线下展会", "sourceType": "clueSource", "sourceDesc": "参加行业展会收集的潜在客户线索", "sortNo": 2, "status": "enable", "createTime": "2025-11-29 10:05:00" },
        { "sourceNo": "CS003", "sourceName": "老客户推荐", "sourceType": "customerSource", "sourceDesc": "由现有合作老客户推荐的新客户", "sortNo": 1, "status": "enable", "createTime": "2025-11-29 10:10:00" },
        { "sourceNo": "CS004", "sourceName": "电商平台", "sourceType": "customerSource", "sourceDesc": "通过主流电商平台入驻店铺获取的客户", "sortNo": 2, "status": "enable", "createTime": "2025-11-29 10:15:00" }
      ]
    }
  }
};

export const BasicConfigurationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('productType');
  const [searchName, setSearchName] = useState('');
  const [isAddProductTypeModalOpen, setIsAddProductTypeModalOpen] = useState(false);
  const [isAddProductCategoryModalOpen, setIsAddProductCategoryModalOpen] = useState(false);
  const [isAddProductSpecModalOpen, setIsAddProductSpecModalOpen] = useState(false);
  const [isAddQualityInspectionRuleModalOpen, setIsAddQualityInspectionRuleModalOpen] = useState(false);
  const [isAddClueCustomerSourceModalOpen, setIsAddClueCustomerSourceModalOpen] = useState(false);

  const currentModuleData = (DATA_JSON.configModules as any)[activeTab]?.data || [];

  const inputClass = "block px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white outline-none transition-all";

  // 状态格式化
  const renderStatus = (status: string) => (
    <div className="flex items-center">
      <div className={`w-2 h-2 rounded-full mr-2 ${status === 'enable' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`}></div>
      <span className={`text-xs font-bold ${status === 'enable' ? 'text-emerald-600' : 'text-slate-400'}`}>
        {status === 'enable' ? '已启用' : '已禁用'}
      </span>
    </div>
  );

  const handleAddClick = () => {
    if (activeTab === 'productType') {
      setIsAddProductTypeModalOpen(true);
    } else if (activeTab === 'productCategory') {
      setIsAddProductCategoryModalOpen(true);
    } else if (activeTab === 'productSpec') {
      setIsAddProductSpecModalOpen(true);
    } else if (activeTab === 'qualityInspectionRule') {
      setIsAddQualityInspectionRuleModalOpen(true);
    } else if (activeTab === 'clueCustomerSource') {
      setIsAddClueCustomerSourceModalOpen(true);
    } else {
      console.log(`Open add modal for: ${activeTab}`);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 1. 顶部标题 & 模块切换页签 */}
      <div className="bg-white border-b border-slate-200 px-8 pt-6 flex-shrink-0 z-40">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">{DATA_JSON.pageConfig.pageTitle}</h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-black italic">System Base Configuration</p>
          </div>
          <div className="flex items-center space-x-2">
             <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"><ArrowPathIcon className="h-5 w-5" /></button>
             <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all"><Cog6ToothIcon className="h-5 w-5" /></button>
          </div>
        </div>

        <nav className="-mb-px flex space-x-10 overflow-x-auto no-scrollbar" aria-label="Module Tabs">
          {DATA_JSON.moduleTabs.map((tab) => (
            <button
              key={tab.code}
              onClick={() => setActiveTab(tab.code)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-black text-sm transition-all duration-200 uppercase tracking-widest
                ${activeTab === tab.code
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-8 space-y-6 flex-1 min-h-0">
        {/* 2. 操作与筛选区 */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
             <div className="relative w-full md:w-80">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-slate-300" />
                </div>
                <input 
                  type="text" 
                  className={`${inputClass} pl-11 w-full`} 
                  placeholder="搜索名称或编号..." 
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
             </div>
             <div className="relative">
                <select className={`${inputClass} appearance-none pr-10 font-bold text-slate-600`}>
                  <option value="all">全部状态</option>
                  <option value="enable">启用</option>
                  <option value="disable">禁用</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
             </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleAddClick}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              <PlusIcon className="h-4 w-4 mr-1.5" />
              新增配置
            </button>
            <div className="h-6 w-px bg-slate-100 mx-2"></div>
            <button className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition-all active:scale-95" title="批量导出">
              <ArrowDownTrayIcon className="h-4 w-4" />
            </button>
            <button className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition-all active:scale-95" title="导入数据">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
            </button>
          </div>
        </div>

        {/* 3. 表格数据展示 */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full animate-in fade-in duration-700">
          <div className="flex-1 overflow-auto no-scrollbar">
            <table className="min-w-full divide-y divide-slate-100 text-sm border-separate border-spacing-0">
              <thead className="bg-slate-50/50 sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="px-6 py-5 text-left border-b border-slate-200 w-12"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" /></th>
                  {activeTab === 'productType' && (
                    <>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">类型编号</th>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">类型名称</th>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">类型描述</th>
                    </>
                  )}
                  {activeTab === 'productCategory' && (
                    <>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">分类编号</th>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">分类名称</th>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">所属类型</th>
                    </>
                  )}
                  {activeTab === 'productSpec' && (
                    <>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">规格编号</th>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">规格名称</th>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">规格值</th>
                    </>
                  )}
                  {activeTab === 'qualityInspectionRule' && (
                    <>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">规则编号</th>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">规则名称</th>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">检验项目</th>
                    </>
                  )}
                  {activeTab === 'clueCustomerSource' && (
                    <>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">来源编号</th>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">来源名称</th>
                      <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">类型</th>
                    </>
                  )}
                  <th className="px-6 py-5 text-left font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">状态</th>
                  <th className="px-6 py-5 text-center font-black text-slate-400 uppercase tracking-widest border-b border-slate-200">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100 font-medium">
                {currentModuleData.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="px-6 py-5"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" /></td>
                    
                    {/* 产品类型渲染 */}
                    {activeTab === 'productType' && (
                      <>
                        <td className="px-6 py-5 font-mono text-slate-400 text-xs">{row.typeNo}</td>
                        <td className="px-6 py-5 font-black text-slate-800 tracking-tight">{row.typeName}</td>
                        <td className="px-6 py-5 text-slate-500 max-w-xs truncate" title={row.typeDesc}>{row.typeDesc}</td>
                      </>
                    )}

                    {/* 产品分类渲染 */}
                    {activeTab === 'productCategory' && (
                      <>
                        <td className="px-6 py-5 font-mono text-slate-400 text-xs">{row.categoryNo}</td>
                        <td className="px-6 py-5 font-black text-slate-800 tracking-tight">{row.categoryName}</td>
                        <td className="px-6 py-5"><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase border border-blue-100">{row.belongType}</span></td>
                      </>
                    )}

                    {/* 产品规格渲染 */}
                    {activeTab === 'productSpec' && (
                      <>
                        <td className="px-6 py-5 font-mono text-slate-400 text-xs">{row.specNo}</td>
                        <td className="px-6 py-5 font-black text-slate-800 tracking-tight">{row.specName}</td>
                        <td className="px-6 py-5 text-slate-600 italic">{row.specValue}</td>
                      </>
                    )}

                    {/* 质检规则渲染 */}
                    {activeTab === 'qualityInspectionRule' && (
                      <>
                        <td className="px-6 py-5 font-mono text-slate-400 text-xs">{row.ruleNo}</td>
                        <td className="px-6 py-5 font-black text-slate-800 tracking-tight">{row.ruleName}</td>
                        <td className="px-6 py-5 text-slate-500 max-w-xs truncate" title={row.inspectionItems}>{row.inspectionItems}</td>
                      </>
                    )}

                    {/* 来源配置渲染 */}
                    {activeTab === 'clueCustomerSource' && (
                      <>
                        <td className="px-6 py-5 font-mono text-slate-400 text-xs">{row.sourceNo}</td>
                        <td className="px-6 py-5 font-black text-slate-800 tracking-tight">{row.sourceName}</td>
                        <td className="px-6 py-5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${row.sourceType === 'clueSource' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                            {row.sourceType === 'clueSource' ? '线索来源' : '客户来源'}
                          </span>
                        </td>
                      </>
                    )}

                    <td className="px-6 py-5">{renderStatus(row.status)}</td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded shadow-sm border border-transparent hover:border-blue-100 transition-all"><PencilSquareIcon className="h-4 w-4" /></button>
                         <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded shadow-sm border border-transparent hover:border-rose-100 transition-all"><TrashIcon className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <span>Showing {currentModuleData.length} records</span>
            <div className="flex items-center space-x-2">
               <span>Page 1 of 1</span>
               <div className="flex space-x-1">
                  <button disabled className="w-6 h-6 flex items-center justify-center bg-white border border-slate-200 rounded text-slate-300">{'<'}</button>
                  <button disabled className="w-6 h-6 flex items-center justify-center bg-white border border-slate-200 rounded text-slate-300">{'>'}</button>
               </div>
            </div>
          </div>
        </div>
      </div>

      <AddProductTypeModal 
        isOpen={isAddProductTypeModalOpen}
        onClose={() => setIsAddProductTypeModalOpen(false)}
      />

      <AddProductCategoryModal 
        isOpen={isAddProductCategoryModalOpen}
        onClose={() => setIsAddProductCategoryModalOpen(false)}
      />

      <AddProductSpecModal 
        isOpen={isAddProductSpecModalOpen}
        onClose={() => setIsAddProductSpecModalOpen(false)}
      />

      <AddQualityInspectionRuleModal 
        isOpen={isAddQualityInspectionRuleModalOpen}
        onClose={() => setIsAddQualityInspectionRuleModalOpen(false)}
      />

      <AddClueCustomerSourceModal 
        isOpen={isAddClueCustomerSourceModalOpen}
        onClose={() => setIsAddClueCustomerSourceModalOpen(false)}
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
