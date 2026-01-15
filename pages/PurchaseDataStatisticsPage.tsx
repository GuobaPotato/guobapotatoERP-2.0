
import React, { useState, useMemo } from 'react';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';

// 饼图数据接口
interface PieData {
  label: string;
  value: number;
  color: string;
}

export const PurchaseDataStatisticsPage: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [chartDimension, setChartDimension] = useState('month');

  // 1. 全局统计数据联动模拟
  const stats = useMemo(() => {
    const base = {
      amount: 1813360.00,
      signCount: 18,
      inboundCount: 17,
      productCount: 2839
    };
    const modifiers: Record<string, number> = {
      today: 0.05,
      yesterday: 0.08,
      thisWeek: 0.25,
      lastWeek: 0.22,
      thisMonth: 0.6,
      lastMonth: 0.55,
      thisYear: 0.9,
      all: 1
    };
    const mod = modifiers[timeFilter] || 1;
    return {
      amount: (base.amount * mod).toLocaleString(undefined, { minimumFractionDigits: 2 }),
      signCount: Math.floor(base.signCount * mod),
      inboundCount: Math.floor(base.inboundCount * mod),
      productCount: Math.floor(base.productCount * mod)
    };
  }, [timeFilter]);

  // 2. 趋势图数据联动模拟
  const getTrendData = () => {
    if (chartDimension === 'year') {
      return [
        { label: "2022年", amount: 1250000.00 },
        { label: "2023年", amount: 1813360.00 },
        { label: "2024年(预)", amount: 2100000.00 }
      ];
    }
    if (chartDimension === 'quarter') {
      return [
        { label: "23-Q1", amount: 312500.00 },
        { label: "23-Q2", amount: 684445.00 },
        { label: "23-Q3", amount: 582440.00 },
        { label: "23-Q4", amount: 189735.00 },
        { label: "24-Q1", amount: 57035.00 }
      ];
    }
    return [
      { label: "23-01", amount: 98500.00 },
      { label: "23-03", amount: 126800.00 },
      { label: "23-05", amount: 479245.00 },
      { label: "23-07", amount: 95800.00 },
      { label: "23-09", amount: 6750.00 },
      { label: "23-11", amount: 78300.00 },
      { label: "24-01", amount: 57035.00 }
    ];
  };

  const trendData = getTrendData();
  const maxAmount = Math.max(...trendData.map(d => d.amount)) * 1.2;
  const chartWidth = 1000;
  const chartHeight = 200;
  const points = trendData.map((d, i) => {
    const x = (i / (trendData.length - 1)) * chartWidth;
    const y = chartHeight - (d.amount / maxAmount) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex-1 overflow-y-auto bg-white flex flex-col h-full font-sans text-[#333333]">
      {/* 顶部标题与全局筛选 */}
      <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">采购数据统计</h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-medium">Purchase Statistics Board</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
            <div className="pl-3 pr-1">
              <CalendarIcon className="h-4 w-4 text-slate-400" />
            </div>
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-transparent text-sm font-bold py-1.5 pl-1 pr-8 outline-none appearance-none cursor-pointer"
            >
              <option value="today">今天</option>
              <option value="yesterday">昨天</option>
              <option value="thisWeek">本周</option>
              <option value="lastWeek">上周</option>
              <option value="thisMonth">本月</option>
              <option value="lastMonth">上月</option>
              <option value="thisYear">今年</option>
              <option value="all">全部时间</option>
            </select>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-8 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* 1. 顶部统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <StatCard label="采购订单金额" value={stats.amount} unit="元" />
          <StatCard label="采购订单签订数" value={stats.signCount.toString()} unit="份" />
          <StatCard label="采购入库单数" value={stats.inboundCount.toString()} unit="单" />
          <StatCard label="采购入库产品数" value={stats.productCount.toString()} unit="件" />
        </div>

        {/* 2. 业务流统计（含饼图切换） */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BusinessFlowSection 
            title="采购入库分析" 
            count={stats.inboundCount}
            variant="blue"
            buttonLabel="入库列表"
          />
          <BusinessFlowSection 
            title="采购退货分析" 
            count={Math.floor(stats.inboundCount * 0.4)} 
            variant="rose"
            buttonLabel="采购退货列表"
          />
        </div>

        {/* 3. 趋势分析图表 */}
        <section className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="text-lg font-bold">采购订单趋势图</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5 uppercase tracking-widest">Dimension: {chartDimension}</p>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
              {['year', 'quarter', 'month'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => setChartDimension(opt)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${chartDimension === opt ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {opt === 'year' ? '每年' : opt === 'quarter' ? '每季度' : '每月'}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-64 w-full">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
              {[0, 0.25, 0.5, 0.75, 1].map(r => (
                <line 
                  key={r} 
                  x1="0" y1={chartHeight * r} x2={chartWidth} y2={chartHeight * r} 
                  stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4"
                />
              ))}
              
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d={`M 0,${chartHeight} L ${points} L ${chartWidth},${chartHeight} Z`}
                fill="url(#chartGradient)"
                className="transition-all duration-700"
              />

              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                className="animate-in fade-in duration-1000 transition-all duration-700"
              />

              {trendData.map((d, i) => {
                const x = (i / (trendData.length - 1)) * chartWidth;
                const y = chartHeight - (d.amount / maxAmount) * chartHeight;
                return (
                  <g key={`${chartDimension}-${i}`} className="group cursor-help transition-all duration-700">
                    <circle 
                      cx={x} cy={y} r="5" 
                      fill="white" stroke="#3b82f6" strokeWidth="2"
                      className="transition-all group-hover:r-7"
                    />
                    <foreignObject x={x - 40} y={y - 45} width="80" height="40" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg text-center font-bold shadow-xl">
                        ¥{d.amount.toLocaleString()}
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
            
            <div className="flex justify-between mt-8 px-2">
              {trendData.map((d, i) => (
                <span key={i} className="text-[10px] font-bold text-slate-300 uppercase">{d.label}</span>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

// 基础统计卡片
const StatCard: React.FC<{ label: string; value: string; unit: string }> = ({ label, value, unit }) => (
  <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">{label}</p>
    <div className="flex items-baseline space-x-1">
      <span className="text-2xl font-black text-[#333333] tracking-tighter tabular-nums group-hover:text-blue-600 transition-colors">{value}</span>
      <span className="text-xs font-bold text-slate-400">{unit}</span>
    </div>
  </div>
);

// 业务分析模块（含饼图切换）
const BusinessFlowSection: React.FC<{ 
  title: string; 
  count: number; 
  variant: 'blue' | 'rose';
  buttonLabel: string;
}> = ({ title, count, variant, buttonLabel }) => {
  const [subFilter, setSubFilter] = useState<'supplier' | 'product'>('supplier');

  const supplierData: PieData[] = [
    { label: "凯勒光学", value: 45, color: "#3b82f6" },
    { label: "东莞众诚塑料", value: 35, color: "#6366f1" },
    { label: "杭州中新器械", value: 20, color: "#94a3b8" },
  ];

  const productData: PieData[] = [
    { label: "塑料外壳", value: 50, color: "#06b6d4" },
    { label: "阀门恒温芯片", value: 30, color: "#14b8a6" },
    { label: "电源适配器", value: 20, color: "#f59e0b" },
  ];

  const activeData = subFilter === 'supplier' ? supplierData : productData;

  return (
    <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-black text-xl ${variant === 'rose' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'}`}>
            {count}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Stats By Quantity</p>
          </div>
        </div>
        <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-200">
          <button 
            onClick={() => setSubFilter('supplier')}
            className={`px-3 py-1 text-[10px] font-black uppercase rounded ${subFilter === 'supplier' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}
          >
            按供应商
          </button>
          <button 
            onClick={() => setSubFilter('product')}
            className={`px-3 py-1 text-[10px] font-black uppercase rounded ${subFilter === 'product' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}
          >
            按产品
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 py-4">
        {/* SVG Pie Chart */}
        <div className="relative flex justify-center">
          <svg width="160" height="160" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="#f8fafc" />
            {activeData.reduce((acc, item, i) => {
              const prevTotal = activeData.slice(0, i).reduce((sum, d) => sum + d.value, 0);
              const strokeDasharray = `${item.value} ${100 - item.value}`;
              const strokeDashoffset = -prevTotal;
              
              acc.push(
                <circle
                  key={item.label}
                  cx="50" cy="50" r="40"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="12"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out hover:stroke-slate-900 cursor-pointer"
                  pathLength="100"
                />
              );
              return acc;
            }, [] as any)}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">件数统计</span>
            <span className="text-lg font-black text-slate-800">100%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {activeData.map(item => (
            <div key={item.label} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">{item.label}</span>
              </div>
              <span className="text-xs font-black text-slate-400 tabular-nums">{item.value}%</span>
            </div>
          ))}
          <div className="pt-4">
             <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg">
                {buttonLabel}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
