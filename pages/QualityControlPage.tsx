
import React, { useState } from 'react';
import { QualityHeader } from '../components/quality/QualityHeader';
import { QualityFilterArea } from '../components/quality/QualityFilterArea';
import { QualityTable } from '../components/quality/QualityTable';
import { Pagination } from '../components/Pagination';
import { QUALITY_CHECK_DATA } from '../constants';
import { QualityCheckResultInputModal } from '../components/quality/QualityCheckResultInputModal';
import { CreateQualityCheckModal } from '../components/quality/CreateQualityCheckModal';
import { QualityCheckRecord } from '../types';
import { Page } from '../App';

interface QualityControlPageProps {
  setCurrentPage: (page: Page) => void;
}

export const QualityControlPage: React.FC<QualityControlPageProps> = ({ setCurrentPage }) => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<QualityCheckRecord | null>(null);

  const handleResultInput = (record: QualityCheckRecord) => {
    setSelectedRecord(record);
    setIsResultModalOpen(true);
  };

  const handleQCIDClick = (qcCode: string) => {
    setCurrentPage('qualityInspectionDetail');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-screen-xl">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col min-h-[700px] overflow-hidden">
          <QualityHeader onCreateClick={() => setIsCreateModalOpen(true)} />
          <QualityFilterArea />
          
          <div className="flex-1 overflow-auto no-scrollbar bg-white">
            <QualityTable 
              data={QUALITY_CHECK_DATA} 
              onResultInputClick={handleResultInput}
              onQCIDClick={handleQCIDClick}
            />
          </div>

          <div className="mt-auto border-t border-slate-100 bg-white">
             <div className="px-6 py-3 bg-slate-50/30 flex justify-between items-center text-xs text-slate-500">
                <div className="flex space-x-6">
                    <span>总记录数：<span className="font-semibold text-slate-800">{QUALITY_CHECK_DATA.length}</span></span>
                    <span>待质检：<span className="text-gray-600 font-semibold">1</span></span>
                    <span>已通过：<span className="text-green-600 font-semibold">3</span></span>
                    <span>已驳回：<span className="text-red-600 font-semibold">1</span></span>
                </div>
             </div>
             <Pagination dataSource={QUALITY_CHECK_DATA} />
          </div>
        </div>
      </div>

      {/* 结果录入弹窗 */}
      <QualityCheckResultInputModal 
        isOpen={isResultModalOpen} 
        onClose={() => setIsResultModalOpen(false)} 
        initialData={selectedRecord}
      />

      {/* 创建质检单弹窗 */}
      <CreateQualityCheckModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
