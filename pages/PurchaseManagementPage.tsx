
import React, { useState } from 'react';
import { PurchaseHeader } from '../components/purchase/PurchaseHeader';
import { PurchaseFilterBar } from '../components/purchase/PurchaseFilterBar';
import { PurchaseTable } from '../components/purchase/PurchaseTable';
import { StatsFooter } from '../components/StatsFooter';
import { Pagination } from '../components/Pagination';
import { PURCHASE_DATA, PURCHASE_TABLE_HEADERS } from '../constants';
import { AddPurchaseModal } from '../components/purchase/AddPurchaseModal';
import { PurchaseRequestToOrderModal } from '../components/purchase/PurchaseRequestToOrderModal';
import { PurchaseDetailView } from '../components/purchase/PurchaseDetailView';

const PURCHASE_STATS = ["采购金额(元)：150.00", "付款(元)：0.00", "未付款(元)：150.00"];

export const PurchaseManagementPage: React.FC = () => {
    const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
    const [selectedPurchaseNo, setSelectedPurchaseNo] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isToOrderModalOpen, setIsToOrderModalOpen] = useState(false);
    const [activeRequest, setActiveRequest] = useState<any>(null);

    const handleGoToOrder = (item: any) => {
        setActiveRequest(item);
        setIsToOrderModalOpen(true);
    };

    const handleNameClick = (purchaseNo: string) => {
        setSelectedPurchaseNo(purchaseNo);
        setViewMode('detail');
    };

    const handleBack = () => {
        setViewMode('list');
        setSelectedPurchaseNo(null);
    };

    if (viewMode === 'detail' && selectedPurchaseNo) {
        return <PurchaseDetailView purchaseNo={selectedPurchaseNo} onBack={handleBack} />;
    }

    return (
        <>
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-screen-xl">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <PurchaseHeader onAddPurchaseClick={() => setIsAddModalOpen(true)} />
                        <PurchaseFilterBar />
                        <PurchaseTable 
                          data={PURCHASE_DATA} 
                          headers={PURCHASE_TABLE_HEADERS} 
                          onGoToOrder={handleGoToOrder}
                          onNameClick={handleNameClick}
                        />
                        <StatsFooter stats={PURCHASE_STATS} />
                        <Pagination dataSource={PURCHASE_DATA} />
                    </div>
                </div>
            </div>
            
            {/* 常规添加采购弹窗 */}
            <AddPurchaseModal 
              isOpen={isAddModalOpen} 
              onClose={() => setIsAddModalOpen(false)} 
            />

            {/* 采购申请转正式订单弹窗 */}
            <PurchaseRequestToOrderModal 
              isOpen={isToOrderModalOpen} 
              onClose={() => setIsToOrderModalOpen(false)} 
              totalRequired={20000}
            />
        </>
    );
};
