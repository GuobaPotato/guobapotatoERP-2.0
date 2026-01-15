
import React, { useState } from 'react';
import { BuildingOfficeIcon } from './icons/BuildingOfficeIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { CircleStackIcon } from './icons/CircleStackIcon';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { ArchiveBoxIcon } from './icons/ArchiveBoxIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { ClipboardDocumentCheckIcon } from './icons/ClipboardDocumentCheckIcon';
import { CubeIcon } from './icons/CubeIcon';
import { ArrowDownOnSquareIcon } from './icons/ArrowDownOnSquareIcon';
import { ArrowUpOnSquareIcon } from './icons/ArrowUpOnSquareIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { Cog6ToothIcon } from './icons/Cog6ToothIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { DocumentCheckIcon } from './icons/DocumentCheckIcon';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { ChartBarSquareIcon } from './icons/ChartBarSquareIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';
import { Page } from '../App';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

// CRM 分组
const crmSubNav = [
  { name: '线索管理', page: 'leadsManagement' as Page, icon: ClipboardListIcon },
  { name: '线索池', page: 'leadsPool' as Page, icon: CircleStackIcon },
  { name: '客户', page: 'customers' as Page, icon: UserGroupIcon },
  { name: '客户池', page: 'customersPool' as Page, icon: CircleStackIcon },
  { name: '报价单', page: 'quotationManagement' as Page, icon: DocumentTextIcon },
  { name: '沟通记录', page: 'communicationRecords' as Page, icon: ChatBubbleLeftRightIcon },
];

// 设置 分组
const settingsSubNav = [
  { name: '基础配置', page: 'basicConfiguration' as Page },
  { name: '线索管理设置', page: 'leadsSetting' as Page },
  { name: '客户管理设置', page: 'customerSetting' as Page },
];

// 生产 分组
const productionSubNav = [
  { name: '生产总列表', page: 'productionOverview' as Page },
  { name: '生产计划', page: 'productionPlan' as Page },
  { name: '生产工单', page: 'productionWorkOrder' as Page },
  { name: '生产领料', page: 'productionRequisition' as Page },
  { name: '生产退料', page: 'productionReturn' as Page },
  { name: '生产报工', page: 'productionReporting' as Page },
  { name: '生产入库', page: 'productionInbound' as Page },
];

// 采购 分组
const purchaseSubNav = [
  { name: '采购订单', page: 'purchaseManagement' as Page },
  { name: '采购退货', page: 'purchaseReturn' as Page },
  { name: '供应商管理', page: 'supplierManagement' as Page },
];

// 库存 分组
const inventorySubNav = [
  { name: '入库单', page: 'stockInOrder' as Page, icon: ArrowDownOnSquareIcon },
  { name: '出库单', page: 'stockOutOrder' as Page, icon: ArrowUpOnSquareIcon },
  { name: '库存管理', page: 'inventoryManagement' as Page, icon: ArchiveBoxIcon },
  { name: '库存盘点', page: 'inventoryCheck' as Page, icon: ClipboardDocumentCheckIcon },
  { name: '库位管理', page: 'warehouseLocation' as Page },
];

// 销售出口 分组
const exportSubNav = [
  { name: '外销合同', page: 'exportContract' as Page },
  { name: '出运计划', page: 'shippingPlan' as Page },
  { name: '出运单', page: 'shippingOrder' as Page },
  { name: '订单结算', page: 'orderSettlement' as Page },
  { name: '海运查询', page: 'shippingQuery' as Page },
  { name: '订单跟踪', page: 'orderTracking' as Page },
  { name: '承运商管理', page: 'carrierManagement' as Page },
];

// 数据 分组
const dataSubNav = [
  { name: '客户对账单', page: 'customerStatement' as Page },
  { name: '账龄统计', page: 'agingAnalysis' as Page },
  { name: '产品销量', page: 'productSales' as Page },
  { name: '业绩统计', page: 'performanceStats' as Page },
  { name: '客户数据分析', page: 'customerAnalysis' as Page },
  { name: '采购数据统计', page: 'purchaseDataStats' as Page },
  { name: '销售数据统计', page: 'salesDataStats' as Page },
  { name: '生产数据统计', page: 'productionDataStats' as Page },
];

// 其他独立顶级菜单
const topLevelNavigation = [
  { name: '产品管理', page: 'productManagement' as Page, icon: CubeIcon },
  { name: '质检管理', page: 'qualityControl' as Page, icon: ShieldCheckIcon },
];

// 审批 分组
const approvalSubNav = [
  { name: '审批流管理', page: 'approvalFlow' as Page },
  { name: '我的审批', page: 'myApprovals' as Page },
  { name: '审批记录', page: 'approvalRecords' as Page },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const WrenchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.423 20.25l2.25-2.25m-2.25 2.25l-2.25-2.25m2.25 2.25V18M6.75 20.25l2.25-2.25m-2.25 2.25l-2.25-2.25m2.25 2.25V18m10.5 2.25l-2.25-2.25m2.25 2.25l2.25-2.25m-2.25 2.25V18M13.5 15h.008v.008H13.5V15zm0-4.5h.008v.008H13.5v-.008zm0-4.5h.008v.008H13.5V6zm-4.5 9h.008v.008H9V15zm0-4.5h.008v.008H9v-.008zm0-4.5h.008v.008H9V6zm-4.5 9h.008v.008H4.5V15zm0-4.5h.008v.008H4.5v-.008zm0-4.5h.008v.008H4.5V6zm15 9h.008v.008H19.5V15zm0-4.5h.008v.008H19.5v-.008zm0-4.5h.008v.008H19.5V6z" />
  </svg>
);

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const [isCRMOpen, setIsCRMOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProductionOpen, setIsProductionOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isDataOpen, setIsDataOpen] = useState(false);

  const isAnyCRMPage = crmSubNav.some(nav => nav.page === currentPage);
  const isAnySettingsPage = settingsSubNav.some(nav => nav.page === currentPage);
  const isAnyProductionPage = productionSubNav.some(nav => nav.page === currentPage);
  const isAnyPurchasePage = purchaseSubNav.some(nav => nav.page === currentPage);
  const isAnyInventoryPage = inventorySubNav.some(nav => nav.page === currentPage);
  const isAnyExportPage = exportSubNav.some(nav => nav.page === currentPage);
  const isAnyApprovalPage = approvalSubNav.some(nav => nav.page === currentPage);
  const isAnyDataPage = dataSubNav.some(nav => nav.page === currentPage);

  const GroupButton = ({ name, icon: Icon, isOpen, onToggle, isActive }: { name: string, icon: any, isOpen: boolean, onToggle: () => void, isActive: boolean }) => (
    <button onClick={onToggle} className={classNames(isActive ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white', 'group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md w-full text-left transition-all duration-200')}>
      <div className="flex items-center">
        <Icon className={classNames(isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-300', 'mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200')} />
        {name}
      </div>
      <ChevronDownIcon className={classNames(isOpen ? 'rotate-180' : '', 'h-4 w-4 text-slate-400 transition-transform duration-200')} />
    </button>
  );

  return (
    <aside className="flex flex-col w-64 bg-slate-800 text-white flex-shrink-0 shadow-2xl z-50">
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-slate-900 shadow-md">
          <BuildingOfficeIcon className="h-8 w-8 text-sky-400" />
          <span className="ml-3 text-lg font-bold tracking-wider">传感器ERP</span>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto custom-scrollbar">
        <nav className="flex-1 px-2 py-4 space-y-1">
          <div>
            <GroupButton name="CRM" icon={UserGroupIcon} isOpen={isCRMOpen} onToggle={() => setIsCRMOpen(!isCRMOpen)} isActive={isAnyCRMPage} />
            <div className={classNames(isCRMOpen ? 'max-h-[300px] opacity-100 mt-1' : 'max-h-0 opacity-0 pointer-events-none', 'overflow-hidden transition-all duration-300 space-y-1')}>
              {crmSubNav.map((sub) => (
                <button key={sub.name} onClick={() => setCurrentPage(sub.page)} className={classNames(currentPage === sub.page ? 'text-sky-400 bg-slate-700/50' : 'text-slate-400 hover:text-white hover:bg-slate-700', 'flex items-center w-full text-left pl-11 pr-3 py-2 text-xs font-medium rounded-md transition-colors')}>
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          {topLevelNavigation.slice(0, 1).map((item) => (
            <button key={item.name} onClick={() => setCurrentPage(item.page)} className={classNames(currentPage === item.page ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white', 'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full text-left transition-all duration-200')}>
              <item.icon className={classNames(currentPage === item.page ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-300', 'mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200')} aria-hidden="true" />
              {item.name}
            </button>
          ))}

          <div>
            <GroupButton name="生产" icon={WrenchIcon} isOpen={isProductionOpen} onToggle={() => setIsProductionOpen(!isProductionOpen)} isActive={isAnyProductionPage} />
            <div className={classNames(isProductionOpen ? 'max-h-80 opacity-100 mt-1' : 'max-h-0 opacity-0 pointer-events-none', 'overflow-hidden transition-all duration-300 space-y-1')}>
              {productionSubNav.map((sub) => (
                <button key={sub.name} onClick={() => setCurrentPage(sub.page)} className={classNames(currentPage === sub.page ? 'text-sky-400 bg-slate-700/50' : 'text-slate-400 hover:text-white hover:bg-slate-700', 'flex items-center w-full text-left pl-11 pr-3 py-2 text-xs font-medium rounded-md transition-colors')}>
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <GroupButton name="采购" icon={ShoppingCartIcon} isOpen={isPurchaseOpen} onToggle={() => setIsPurchaseOpen(!isPurchaseOpen)} isActive={isAnyPurchasePage} />
            <div className={classNames(isPurchaseOpen ? 'max-h-60 opacity-100 mt-1' : 'max-h-0 opacity-0 pointer-events-none', 'overflow-hidden transition-all duration-300 space-y-1')}>
              {purchaseSubNav.map((sub) => (
                <button key={sub.name} onClick={() => setCurrentPage(sub.page)} className={classNames(currentPage === sub.page ? 'text-sky-400 bg-slate-700/50' : 'text-slate-400 hover:text-white hover:bg-slate-700', 'flex items-center w-full text-left pl-11 pr-3 py-2 text-xs font-medium rounded-md transition-colors')}>
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <GroupButton name="库存" icon={ArchiveBoxIcon} isOpen={isInventoryOpen} onToggle={() => setIsInventoryOpen(!isInventoryOpen)} isActive={isAnyInventoryPage} />
            <div className={classNames(isInventoryOpen ? 'max-h-80 opacity-100 mt-1' : 'max-h-0 opacity-0 pointer-events-none', 'overflow-hidden transition-all duration-300 space-y-1')}>
              {inventorySubNav.map((sub) => (
                <button key={sub.name} onClick={() => setCurrentPage(sub.page)} className={classNames(currentPage === sub.page ? 'text-sky-400 bg-slate-700/50' : 'text-slate-400 hover:text-white hover:bg-slate-700', 'flex items-center w-full text-left pl-11 pr-3 py-2 text-xs font-medium rounded-md transition-colors')}>
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <GroupButton name="销售出口" icon={GlobeAltIcon} isOpen={isExportOpen} onToggle={() => setIsExportOpen(!isExportOpen)} isActive={isAnyExportPage} />
            <div className={classNames(isExportOpen ? 'max-h-80 opacity-100 mt-1' : 'max-h-0 opacity-0 pointer-events-none', 'overflow-hidden transition-all duration-300 space-y-1')}>
              {exportSubNav.map((sub) => (
                <button key={sub.name} onClick={() => setCurrentPage(sub.page)} className={classNames(currentPage === sub.page ? 'text-sky-400 bg-slate-700/50' : 'text-slate-400 hover:text-white hover:bg-slate-700', 'flex items-center w-full text-left pl-11 pr-3 py-2 text-xs font-medium rounded-md transition-colors')}>
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <GroupButton name="数据" icon={ChartBarSquareIcon} isOpen={isDataOpen} onToggle={() => setIsDataOpen(!isDataOpen)} isActive={isAnyDataPage} />
            <div className={classNames(isDataOpen ? 'max-h-80 opacity-100 mt-1' : 'max-h-0 opacity-0 pointer-events-none', 'overflow-hidden transition-all duration-300 space-y-1')}>
              {dataSubNav.map((sub) => (
                <button key={sub.name} onClick={() => setCurrentPage(sub.page)} className={classNames(currentPage === sub.page ? 'text-sky-400 bg-slate-700/50' : 'text-slate-400 hover:text-white hover:bg-slate-700', 'flex items-center w-full text-left pl-11 pr-3 py-2 text-xs font-medium rounded-md transition-colors')}>
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          {topLevelNavigation.slice(1).map((item) => (
            <button key={item.name} onClick={() => setCurrentPage(item.page)} className={classNames(currentPage === item.page ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white', 'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md w-full text-left transition-all duration-200')}>
              <item.icon className={classNames(currentPage === item.page ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-300', 'mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200')} aria-hidden="true" />
              {item.name}
            </button>
          ))}

          <div>
            <button onClick={() => setIsApprovalOpen(!isApprovalOpen)} className={classNames(isAnyApprovalPage ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white', 'group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md w-full text-left transition-all duration-200')}>
              <div className="flex items-center">
                <DocumentCheckIcon className={classNames(isAnyApprovalPage ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-300', 'mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200')} />
                审批管理
              </div>
              <ChevronDownIcon className={classNames(isApprovalOpen ? 'rotate-180' : '', 'h-4 w-4 text-slate-400 transition-transform duration-200')} />
            </button>
            <div className={classNames(isApprovalOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0 pointer-events-none', 'overflow-hidden transition-all duration-300 space-y-1')}>
              {approvalSubNav.map((sub) => (
                <button key={sub.name} onClick={() => setCurrentPage(sub.page)} className={classNames(currentPage === sub.page ? 'text-sky-400 bg-slate-700/50' : 'text-slate-400 hover:text-white hover:bg-slate-700', 'block w-full text-left pl-11 pr-3 py-2 text-xs font-medium rounded-md transition-colors')}>
                  {sub.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/50 mt-4">
            <GroupButton name="设置" icon={Cog6ToothIcon} isOpen={isSettingsOpen} onToggle={() => setIsSettingsOpen(!isSettingsOpen)} isActive={isAnySettingsPage} />
            <div className={classNames(isSettingsOpen || isAnySettingsPage ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0 pointer-events-none', 'overflow-hidden transition-all duration-300 space-y-1')}>
              {settingsSubNav.map((sub) => (
                <button key={sub.name} onClick={() => setCurrentPage(sub.page)} className={classNames(currentPage === sub.page ? 'text-sky-400 bg-slate-700/50' : 'text-slate-400 hover:text-white hover:bg-slate-700', 'flex items-center w-full text-left pl-11 pr-3 py-2 text-xs font-medium rounded-md transition-colors')}>
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};
