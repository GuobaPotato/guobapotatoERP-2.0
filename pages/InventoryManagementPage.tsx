
import React, { useState } from 'react';
import { InventoryHeader } from '../components/inventory/InventoryHeader';
import { Pagination } from '../components/Pagination';
import { StatsFooter } from '../components/StatsFooter';

import { 
    PRODUCT_STOCK_DATA, PRODUCT_STOCK_HEADERS,
    IN_OUT_RECORDS_DATA, IN_OUT_RECORDS_HEADERS,
    STOCK_CHANGE_DATA, STOCK_CHANGE_HEADERS,
    PURCHASE_SALE_DATA, PURCHASE_SALE_HEADERS
} from '../constants';

import { ProductFilterBar } from '../components/inventory/ProductFilterBar';
import { ProductTable } from '../components/inventory/ProductTable';
import { InOutRecordsFilterBar } from '../components/inventory/InOutRecordsFilterBar';
import { InOutRecordsTable } from '../components/inventory/InOutRecordsTable';
import { ChangeStatsFilterBar } from '../components/inventory/ChangeStatsFilterBar';
import { ChangeStatsTable } from '../components/inventory/ChangeStatsTable';
import { PurchaseSaleFilterBar } from '../components/inventory/PurchaseSaleFilterBar';
import { PurchaseSaleTable } from '../components/inventory/PurchaseSaleTable';

export type InventoryTab = '产品库存' | '出入库记录' | '库存变更统计' | '采销数量对比';

const PRODUCT_STATS = ["待入库总数：10.00", "待出库总数：3.00", "实际库存总数：208.00"];
const IN_OUT_STATS = ["出库总数：10", "入库总数：185"];
const CHANGE_STATS = ["采购入库总数：170", "销售退货总数：0", "调拨入库总数：0", "销售出库总数：10", "采购退货总数：0", "调拨出库总数：0"];
const PURCHASE_SALE_STATS = ["需交付总数：10", "现存库存总数：208", "可用库存总数：198", "已采购未入库总数：10", "需采购总数：0"];

export const InventoryManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<InventoryTab>('产品库存');

    const renderContent = () => {
        switch (activeTab) {
            case '产品库存':
                return {
                    filterBar: <ProductFilterBar />,
                    table: <ProductTable data={PRODUCT_STOCK_DATA} headers={PRODUCT_STOCK_HEADERS} />,
                    stats: <StatsFooter stats={PRODUCT_STATS} />,
                    pagination: <Pagination dataSource={PRODUCT_STOCK_DATA} />
                };
            case '出入库记录':
                return {
                    filterBar: <InOutRecordsFilterBar />,
                    table: <InOutRecordsTable data={IN_OUT_RECORDS_DATA} headers={IN_OUT_RECORDS_HEADERS} />,
                    stats: <StatsFooter stats={IN_OUT_STATS} />,
                    pagination: <Pagination dataSource={IN_OUT_RECORDS_DATA} />
                };
            case '库存变更统计':
                 return {
                    filterBar: <ChangeStatsFilterBar />,
                    table: <ChangeStatsTable data={STOCK_CHANGE_DATA} headers={STOCK_CHANGE_HEADERS} />,
                    stats: <StatsFooter stats={CHANGE_STATS} />,
                    pagination: <Pagination dataSource={STOCK_CHANGE_DATA} />
                };
            case '采销数量对比':
                 return {
                    filterBar: <PurchaseSaleFilterBar />,
                    table: <PurchaseSaleTable data={PURCHASE_SALE_DATA} headers={PURCHASE_SALE_HEADERS} />,
                    stats: <StatsFooter stats={PURCHASE_SALE_STATS} />,
                    pagination: <Pagination dataSource={PURCHASE_SALE_DATA} />
                };
            default:
                return {
                    filterBar: null,
                    table: null,
                    stats: null,
                    pagination: null
                };
        }
    };

    const { filterBar, table, stats, pagination } = renderContent();

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-screen-xl">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col min-h-[600px]">
                    <InventoryHeader activeTab={activeTab} setActiveTab={setActiveTab} />
                    {filterBar}
                    <div className="flex-1 overflow-auto">
                        {table}
                    </div>
                    {stats}
                    {pagination}
                </div>
            </div>
        </div>
    );
};
