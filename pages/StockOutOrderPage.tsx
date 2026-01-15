
import React from 'react';
import { StockOutHeader } from '../components/stock-out/StockOutHeader';
import { StockOutFilterBar } from '../components/stock-out/StockOutFilterBar';
import { StockOutTable } from '../components/stock-out/StockOutTable';
import { Pagination } from '../components/Pagination';
import { STOCK_OUT_ORDER_DATA } from '../constants';

export const StockOutOrderPage: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-screen-xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col min-h-[600px]">
          <StockOutHeader />
          <StockOutFilterBar />
          <div className="flex-1 overflow-auto">
            <StockOutTable data={STOCK_OUT_ORDER_DATA} />
          </div>
          <Pagination 
            dataSource={STOCK_OUT_ORDER_DATA} 
          />
        </div>
      </div>
    </div>
  );
};
