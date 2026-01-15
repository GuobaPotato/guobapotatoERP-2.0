
import React, { useState } from 'react';
import { CommunicationRecordsHeader } from '../components/crm/CommunicationRecordsHeader';
import { CommunicationRecordsFilter } from '../components/crm/CommunicationRecordsFilter';
import { CommunicationRecordsTable } from '../components/crm/CommunicationRecordsTable';
import { Pagination } from '../components/Pagination';

export const CommunicationRecordsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-screen-xl h-full flex flex-col">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col min-h-[600px] flex-1">
          <CommunicationRecordsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
          <CommunicationRecordsFilter />
          <div className="flex-1 overflow-auto no-scrollbar bg-white">
            <CommunicationRecordsTable />
          </div>
          <Pagination dataSource={[]} />
        </div>
      </div>
    </div>
  );
};
