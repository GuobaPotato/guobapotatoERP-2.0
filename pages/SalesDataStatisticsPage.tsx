
import React, { useState, useMemo } from 'react';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';

// 定义业务流数据维度
type Dimension = 'area' | 'country' | 'product';

interface PieItem {
  label: string;
  value: number;
  color: string;
}

// 模拟多维度数据
const FLOW_DIMENSION_DATA: Record<string, Record<Dimension, PieItem[]>> = {
  salesOutbound: {
    area: [
      { label: "非洲", value: 60, color: "#3b82f6" },
      { label: "东南亚", value: 40, color: "#6366f1" }
    ],
    country: [
      { label: "尼日利亚", value: 30, color: "#3b82f6" },
      { label: "南非", value: 20, color: "#60a5fa" },
      { label: "印尼", value: 50, color: "#6366f1" }
    ],
    product: [
      { label: "卫浴传感器", value: 70, color: "#0ea5e9" },
      { label: "温湿度传感器", value: 30, color: "#94a3b8" }
    ]
  },
  salesReturn: {
    area: [
      { label: "非洲", value: 45, color: "#f43f5e" },
      { label: "东南亚", value: 55, color: "#fb7185" }
    ],
    country: [
      { label: "肯尼亚", value: 40, color: "#f43f5e" },
      { label: "越南", value: 60, color: "#fb7185" }
    ],
    product: [
      { label: "卫浴传感器", value: 80, color: "#e11d48" },
      { label: "温湿度传感器", value: 20, color: "#fda4af" }
    ]
  },
  salesExchange: {
    area: [
      { label: "非洲", value: 100, color: "#f59e0b" }
    ],
    country: [
      { label: "泰国", value: 100, color: "#f59e0b" }
    ],
    product: [
      { label: "温湿度传感器", value: 100, color: "#f59e0b" }
    ]
  }
};

export const SalesDataStatisticsPage: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [trendDimension, setTrendDimension] = useState<'year' | 'quarter' | 'month'>('month');

  // 1. 全局统计数值联动
  const stats = useMemo(() => {
    const base = { amount: 2017150.0, orderCount: 13, outCount: 11, prodCount: 1685 };
    const modifiers: any = { today: 0.04, yesterday: 0.05, thisWeek: 0.15, thisMonth: 0.4, thisYear: 0.8, all: 1 };
    const mod = modifiers[timeFilter] || 1;
    return {
      amount: (base.amount * mod).toLocaleString(undefined, { minimumFractionDigits: 2 }),
      orderCount: Math.floor(base.orderCount * mod),
      outCount: Math.floor(base.outCount * mod),
      prodCount: Math.floor(base.prodCount * mod)
    };
  }, [timeFilter]);

  // 2. 趋势图数据联动
  const trendData = useMemo(() => {
    const mod = (timeFilter === 'all' ? 1 : 0.6);
    if (trendDimension === 'year') {
      return [
        { label: "2022年", amount: 1450000 * mod },
        { label: "2023年", amount: 2017150 * mod },
        { label: "2024年(预)", amount: 2300000 * mod }
      ];
    }
    if (trendDimension === 'quarter') {
      return [
        { label: "23-Q1", amount: 458000 * mod },
        { label: "23-Q2", amount: 612000 * mod },
        { label: "23-Q3", amount: 745000 * mod },
        { label: "23-Q4", amount: 202150 * mod }
      ];
    }
    return [
      { label: "23-01", amount: 89600 * mod },
      { label: "23-05", amount: 381000 * mod },
      { label: "23-08", amount: 636000 * mod },
      { label: "23-12", amount: 56800 * mod },
      { label: "24-01", amount: 9150 * mod }
    ];
  }, [trendDimension, timeFilter]);

  // 趋势图路径计算
  const maxTrendAmount = Math.max(...trendData.map(d => d.amount)) * 1.2;
  const chartWidth = 1000;
  const chartHeight = 200;
  const points = trendData.map((d, i) => {
    const x = (i / (trendData.length - 1)) * chartWidth;
    const y = chartHeight - (d.amount / maxTrendAmount) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex-1 overflow-y-auto bg-white flex flex-col h-full font-sans text-[#333333]">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">销售数据统计</h1>
          <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Global Sales Analysis Board</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
            <CalendarIcon className="h-4 w-4 text-slate-400 mr-2" />
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-transparent text-xs font-bold outline-none appearance-none cursor-pointer pr-4"
            >
              <option value="today">今天</option>
              <option value="yesterday">昨天</option>
              <option value="thisWeek">本周</option>
              <option value="thisMonth">本月</option>
              <option value="thisYear">今年</option>
              <option value="all">全部时间</option>
            </select>
          </div>
          <button className="p-2 hover:bg-slate-50 rounded-full border border-slate-100 text-slate-400">
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* 指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <StatCard label="销售订单金额" value={stats.amount} unit="元" />
          <StatCard label="销售订单签订数" value={stats.orderCount.toString()} unit="份" />
          <StatCard label="销售出库单数" value={stats.outCount.toString()} unit="单" />
          <StatCard label="销售出库产品数" value={stats.prodCount.toString()} unit="件" />
        </div>

        {/* 业务分析看板（集成饼图交互） */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <InteractiveFlowCard 
            id="salesOutbound" 
            title="销售出库" 
            count={stats.outCount} 
            variant="blue" 
          />
          <InteractiveFlowCard 
            id="salesReturn" 
            title="销售退货" 
            count={Math.floor(stats.outCount * 0.4)} 
            variant="rose" 
          />
          <InteractiveFlowCard 
            id="salesExchange" 
            title="销售换货" 
            count={Math.floor(stats.outCount * 0.2)} 
            variant="amber" 
          />
        </div>

        {/* 趋势分析 (Full Width) */}
        <section className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="text-lg font-bold">销售订单趋势分析</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-wider">Dimension: {trendDimension}</p>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
              {(['year', 'quarter', 'month'] as const).map(opt => (
                <button 
                  key={opt}
                  onClick={() => setTrendDimension(opt)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${trendDimension === opt ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {opt === 'year' ? '每年' : opt === 'quarter' ? '每季度' : '每月'}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-64 w-full">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
              {[0, 0.25, 0.5, 0.75, 1].map(r => (
                <line key={r} x1="0" y1={chartHeight * r} x2={chartWidth} y2={chartHeight * r} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4" />
              ))}
              <defs>
                <linearGradient id="salesTrendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`M 0,${chartHeight} L ${points} L ${chartWidth},${chartHeight} Z`} fill="url(#salesTrendGradient)" className="transition-all duration-700" />
              <polyline fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} className="transition-all duration-700" />
              {trendData.map((d, i) => {
                const x = (i / (trendData.length - 1)) * chartWidth;
                const y = chartHeight - (d.amount / maxTrendAmount) * chartHeight;
                return (
                  <g key={i} className="group cursor-help transition-all">
                    <circle cx={x} cy={y} r="4" fill="white" stroke="#3b82f6" strokeWidth="2" className="transition-all duration-700" />
                    <foreignObject x={x - 40} y={y - 35} width="80" height="30" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-slate-900 text-white text-[9px] py-1 px-2 rounded-lg text-center font-bold shadow-xl">
                        ¥{d.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
            <div className="flex justify-between mt-8 px-1">
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

// 交互式业务流卡片组件
const InteractiveFlowCard: React.FC<{ 
  id: string; 
  title: string; 
  count: number; 
  variant: 'blue' | 'rose' | 'amber' 
}> = ({ id, title, count, variant }) => {
  const [activeDimension, setActiveDimension] = useState<Dimension>('area');
  
  const currentData = FLOW_DIMENSION_DATA[id][activeDimension];
  const colorMap = {
    blue: 'bg-blue-50 text-blue-500',
    rose: 'bg-rose-50 text-rose-500',
    amber: 'bg-amber-50 text-amber-500'
  };

  return (
    <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-6 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-lg ${colorMap[variant]}`}>
            {count}
          </div>
          <h3 className="text-sm font-bold text-slate-800">{title}分析</h3>
        </div>
        <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-200">
          {(['area', 'country', 'product'] as const).map(d => (
            <button 
              key={d}
              onClick={() => setActiveDimension(d)}
              className={`px-2 py-1 text-[9px] font-black uppercase rounded transition-all ${activeDimension === d ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
            >
              {d === 'area' ? '地区' : d === 'country' ? '国家' : '产品'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        {/* SVG Pie Chart */}
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 100 100" className="transform -rotate-90">
            <circle cx="50" cy="50" r="42" fill="#f8fafc" />
            {currentData.reduce((acc, item, i) => {
              const total = currentData.reduce((s, d) => s + d.value, 0);
              const percent = (item.value / total) * 100;
              const prevTotal = currentData.slice(0, i).reduce((s, d) => s + d.value, 0);
              const prevPercent = (prevTotal / total) * 100;
              
              acc.push(
                <circle
                  key={item.label}
                  cx="50" cy="50" r="38"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="12"
                  strokeDasharray={`${percent} ${100 - percent}`}
                  strokeDashoffset={-prevPercent}
                  pathLength="100"
                  className="transition-all duration-700 ease-out"
                />
              );
              return acc;
            }, [] as any)}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-black text-slate-400 uppercase">Ratio</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-2">
          {currentData.map(item => (
            <div key={item.label} className="flex items-center justify-between text-[10px] font-bold">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-500">{item.label}</span>
              </div>
              <span className="text-slate-400 tabular-nums">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-sm">
        查看明细
      </button>
    </div>
  );
};

// 基础统计卡片
const StatCard: React.FC<{ label: string; value: string; unit: string }> = ({ label, value, unit }) => (
  <div className="bg-white border border-slate-100 p-6 rounded-2xl hover:border-blue-100 transition-all group shadow-sm">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{label}</p>
    <div className="flex items-baseline space-x-1">
      <span className="text-2xl font-black text-[#333333] tracking-tighter tabular-nums group-hover:text-blue-600 transition-colors">{value}</span>
      <span className="text-xs font-bold text-slate-300 uppercase">{unit}</span>
    </div>
  </div>
);
