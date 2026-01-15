
import React, { useState } from 'react';
import { CustomersHeader } from '../components/crm/CustomersHeader';
import { CustomersFilterBar } from '../components/crm/CustomersFilterBar';
import { CustomersTable } from '../components/crm/CustomersTable';
import { CustomersFooter } from '../components/crm/CustomersFooter';
import { CUSTOMERS_DATA } from '../constants';
import { AddCustomerModal } from '../components/AddCustomerModal';
import { CustomerDetailModal } from '../components/crm/CustomerDetailModal';

export const CustomersPage: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('全部');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSelectionChange = (ids: Set<string>) => {
    setSelectedIds(ids);
  };

  const handleRowClick = (id: string) => {
    setSelectedCustomerId(id);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 font-sans overflow-hidden">
      <CustomersHeader 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onAddCustomerClick={() => setIsAddModalOpen(true)} 
      />
      
      <div className="p-4 md:p-6 lg:p-8 flex-1 flex flex-col min-h-0 space-y-4">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 flex-1 flex flex-col overflow-hidden">
          <CustomersFilterBar />
          
          <div className="flex-1 min-h-0">
            <CustomersTable 
              data={CUSTOMERS_DATA} 
              selectedIds={selectedIds}
              onSelectionChange={handleSelectionChange}
              onNameClick={handleRowClick}
            />
          </div>

          <CustomersFooter 
            totalCount={CUSTOMERS_DATA.length} 
            selectedCount={selectedIds.size}
          />
        </div>
      </div>

      <AddCustomerModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      
      <CustomerDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        customerId={selectedCustomerId}
      />
    </div>
  );
};
