
import React from 'react';
import { StockInHeader } from '../components/stock-in/StockInHeader';
import { StockInFilterBar } from '../components/stock-in/StockInFilterBar';
import { StockInTable } from '../components/stock-in/StockInTable';
import { Pagination } from '../components/Pagination';
import { STOCK_IN_ORDER_DATA } from '../constants';

export const StockInOrderPage: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-screen-xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col min-h-[600px]">
          <StockInHeader />
          <StockInFilterBar />
          <div className="flex-1 overflow-auto">
            <StockInTable data={STOCK_IN_ORDER_DATA} />
          </div>
          <Pagination 
            dataSource={STOCK_IN_ORDER_DATA} 
          />
        </div>
      </div>
    </div>
  );
};
