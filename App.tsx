
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { LeadsManagementPage } from './pages/LeadsManagementPage';
import { LeadsPoolPage } from './pages/LeadsPoolPage';
import { CustomersPage } from './pages/CustomersPage';
import { CustomersPoolPage } from './pages/CustomersPoolPage';
import { CommunicationRecordsPage } from './pages/CommunicationRecordsPage';
import { QuotationManagementPage } from './pages/QuotationManagementPage';
import { InventoryManagementPage } from './pages/InventoryManagementPage';
import { PurchaseManagementPage } from './pages/PurchaseManagementPage';
import { PurchaseReturnPage } from './pages/PurchaseReturnPage';
import { SupplierManagementPage } from './pages/SupplierManagementPage';
import { ProductManagementPage } from './pages/ProductManagementPage';
import { AddProductPage } from './pages/AddProductPage';
import { EditBOMPage } from './pages/EditBOMPage';
import { StockInOrderPage } from './pages/StockInOrderPage';
import { StockOutOrderPage } from './pages/StockOutOrderPage';
import { QualityControlPage } from './pages/QualityControlPage';
import { QualityInspectionDetailPage } from './pages/QualityInspectionDetailPage';
import { LeadsSettingPage } from './pages/LeadsSettingPage';
import { CustomerSettingPage } from './pages/CustomerSettingPage';
import { BasicConfigurationPage } from './pages/BasicConfigurationPage';
import { ApprovalFlowManagementPage } from './pages/ApprovalFlowManagementPage';
import { MyApprovalsPage } from './pages/MyApprovalsPage';
import { ApprovalRecordsPage } from './pages/ApprovalRecordsPage';
import { InventoryCheckListPage } from './pages/InventoryCheckListPage';
import { ExportContractPage } from './pages/ExportContractPage';
import { ShippingPlanPage } from './pages/ShippingPlanPage';
import { ShippingOrderListPage } from './pages/ShippingOrderListPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ShippingQueryPage } from './pages/ShippingQueryPage';
import { CarrierManagementPage } from './pages/CarrierManagementPage';
import { CustomerStatementPage } from './pages/CustomerStatementPage';
import { ProductSalesPage } from './pages/ProductSalesPage';
import { AgingAnalysisPage } from './pages/AgingAnalysisPage';
import { PerformanceStatsPage } from './pages/PerformanceStatsPage';
import { CustomerAnalysisPage } from './pages/CustomerAnalysisPage';
import { WarehouseLocationPage } from './pages/WarehouseLocationPage';
import { AddWarehouseLocationPage } from './pages/AddWarehouseLocationPage';
import { ProductionMaterialReturnPage } from './pages/ProductionMaterialReturnPage';
import { ProductionRequisitionPage } from './pages/ProductionRequisitionPage';
import { ProductionInboundPage } from './pages/ProductionInboundPage';
import { ProductionWorkOrderPage } from './pages/ProductionWorkOrderPage';
import { ProductionPlanPage } from './pages/ProductionPlanPage';
import { ProductionReportingPage } from './pages/ProductionReportingPage';
import { PurchaseDataStatisticsPage } from './pages/PurchaseDataStatisticsPage';
import { SalesDataStatisticsPage } from './pages/SalesDataStatisticsPage';
import { ProductionDataStatisticsPage } from './pages/ProductionDataStatisticsPage';
import { ProductionOverviewListPage } from './pages/ProductionOverviewListPage';
import { OrderSettlementPage } from './pages/OrderSettlementPage';

export type Page = 
  | 'leadsManagement' 
  | 'leadsPool' 
  | 'customers' 
  | 'customersPool'
  | 'communicationRecords'
  | 'quotationManagement'
  | 'inventoryManagement' 
  | 'purchaseManagement' 
  | 'purchaseReturn'
  | 'supplierManagement'
  | 'inventoryCheck' 
  | 'productManagement'
  | 'addProduct'
  | 'editBOM'
  | 'stockInOrder' 
  | 'stockOutOrder' 
  | 'qualityControl'
  | 'qualityInspectionDetail'
  | 'leadsSetting'
  | 'customerSetting'
  | 'basicConfiguration'
  | 'approvalFlow'
  | 'myApprovals'
  | 'approvalRecords'
  | 'exportContract'
  | 'shippingPlan'
  | 'shippingOrder'
  | 'orderSettlement'
  | 'shippingQuery'
  | 'orderTracking'
  | 'carrierManagement'
  | 'customerStatement'
  | 'agingAnalysis'
  | 'productSales'
  | 'performanceStats'
  | 'customerAnalysis'
  | 'warehouseLocation'
  | 'warehouseLocationAdd'
  | 'productionPlan'
  | 'productionWorkOrder'
  | 'productionRequisition'
  | 'productionReturn'
  | 'productionReporting'
  | 'productionInbound'
  | 'purchaseDataStats'
  | 'salesDataStats'
  | 'productionDataStats'
  | 'productionOverview';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('leadsManagement');

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {currentPage === 'leadsManagement' && <LeadsManagementPage />}
        {currentPage === 'leadsSetting' && <LeadsSettingPage />}
        {currentPage === 'customerSetting' && <CustomerSettingPage />}
        {currentPage === 'basicConfiguration' && <BasicConfigurationPage />}
        {currentPage === 'leadsPool' && <LeadsPoolPage />}
        {currentPage === 'customers' && <CustomersPage />}
        {currentPage === 'customersPool' && <CustomersPoolPage />}
        {currentPage === 'communicationRecords' && <CommunicationRecordsPage />}
        {currentPage === 'quotationManagement' && <QuotationManagementPage />}
        {currentPage === 'inventoryManagement' && <InventoryManagementPage />}
        {currentPage === 'purchaseManagement' && <PurchaseManagementPage />}
        {currentPage === 'purchaseReturn' && <PurchaseReturnPage />}
        {currentPage === 'supplierManagement' && <SupplierManagementPage />}
        {currentPage === 'inventoryCheck' && <InventoryCheckListPage />}
        {currentPage === 'productManagement' && <ProductManagementPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'addProduct' && <AddProductPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'editBOM' && <EditBOMPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'stockInOrder' && <StockInOrderPage />}
        {currentPage === 'stockOutOrder' && <StockOutOrderPage />}
        {currentPage === 'qualityControl' && <QualityControlPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'qualityInspectionDetail' && <QualityInspectionDetailPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'approvalFlow' && <ApprovalFlowManagementPage />}
        {currentPage === 'myApprovals' && <MyApprovalsPage />}
        {currentPage === 'approvalRecords' && <ApprovalRecordsPage />}
        
        {/* 销售出口相关页面 */}
        {currentPage === 'exportContract' && <ExportContractPage />}
        {currentPage === 'shippingPlan' && <ShippingPlanPage />}
        {currentPage === 'shippingOrder' && <ShippingOrderListPage />}
        {currentPage === 'orderSettlement' && <OrderSettlementPage />}
        {currentPage === 'shippingQuery' && <ShippingQueryPage />}
        {currentPage === 'orderTracking' && <OrderTrackingPage />}
        {currentPage === 'carrierManagement' && <CarrierManagementPage />}

        {/* 数据统计分析相关页面 */}
        {currentPage === 'customerStatement' && <CustomerStatementPage />}
        {currentPage === 'agingAnalysis' && <AgingAnalysisPage />}
        {currentPage === 'productSales' && <ProductSalesPage />}
        {currentPage === 'performanceStats' && <PerformanceStatsPage />}
        {currentPage === 'customerAnalysis' && <CustomerAnalysisPage />}
        {currentPage === 'purchaseDataStats' && <PurchaseDataStatisticsPage />}
        {currentPage === 'salesDataStats' && <SalesDataStatisticsPage />}
        {currentPage === 'productionDataStats' && <ProductionDataStatisticsPage />}

        {/* 库存相关子页面 */}
        {currentPage === 'warehouseLocation' && <WarehouseLocationPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'warehouseLocationAdd' && <AddWarehouseLocationPage setCurrentPage={setCurrentPage} />}

        {/* 生产相关页面 */}
        {currentPage === 'productionPlan' && <ProductionPlanPage />}
        {currentPage === 'productionWorkOrder' && <ProductionWorkOrderPage />}
        {currentPage === 'productionRequisition' && <ProductionRequisitionPage />}
        {currentPage === 'productionReturn' && <ProductionMaterialReturnPage />}
        {currentPage === 'productionReporting' && <ProductionReportingPage />}
        {currentPage === 'productionInbound' && <ProductionInboundPage />}
        {currentPage === 'productionOverview' && <ProductionOverviewListPage />}
      </main>
    </div>
  );
};

export default App;
