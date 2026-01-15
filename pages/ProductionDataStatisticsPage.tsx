
import React, { useState, useMemo } from 'react';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { FilterIcon } from '../components/icons/FilterIcon';
import { Cog6ToothIcon } from '../components/icons/Cog6ToothIcon';

// 定义数据接口
interface ProductCategoryData {
  category: string;
  plannedQty: number;
  actualQty: number;
  achievementRate: number;
}

const DATA_JSON = {
  pageConfig: {
    pageTitle: "生产数据统计",
    supportFilter: true
  },
  moduleTabs: [
    { name: "生产计划达成率报表", code: "planAchievement" },
    { name: "车间日报", code: "workshopDaily" },
    { name: "产品质检合格率报表", code: "qualityRate" },
    { name: "物料齐套率报表", code: "materialAvailability" }
  ],
  // 计划达成率数据
  planAchievement: {
    summaryCards: [
      { cardName: "totalPlannedQty", cardLabel: "计划生产数量", cardValue: "30500", unit: "件" },
      { cardName: "totalActualQty", cardLabel: "实际完成数量", cardValue: "29300", unit: "件" },
      { cardName: "totalAchievementRate", cardLabel: "整体达成率", cardValue: "96.1", unit: "%" },
      { cardName: "delayedOrderCount", cardLabel: "延期订单数", cardValue: "3", unit: "单" }
    ],
    multiProductData: [
      { date: "2025-01", totalPlannedQty: 5000, totalActualQty: 4650, totalAchievementRate: 93.0 },
      { date: "2025-02", totalPlannedQty: 6200, totalActualQty: 6200, totalAchievementRate: 100.0 },
      { date: "2025-03", totalPlannedQty: 5800, totalActualQty: 5100, totalAchievementRate: 87.9 },
      { date: "2025-04", totalPlannedQty: 7000, totalActualQty: 7350, totalAchievementRate: 105.0 },
      { date: "2025-05", totalPlannedQty: 6500, totalActualQty: 6000, totalAchievementRate: 92.3 }
    ],
    detailTable: {
      columns: [
        { colName: "planOrderNo", colLabel: "生产计划单号", isLink: true },
        { colName: "productCategory", colLabel: "产品分类" },
        { colName: "plannedQty", colLabel: "计划数量" },
        { colName: "actualQty", colLabel: "实际数量" },
        { colName: "achievementRate", colLabel: "达成率(%)" }
      ],
      data: [
        { planOrderNo: "PP202501001", productCategory: "卫浴传感器", plannedQty: 2000, actualQty: 1850, achievementRate: 92.5 },
        { planOrderNo: "PP202501002", productCategory: "温湿度传感器", plannedQty: 1500, actualQty: 1400, achievementRate: 93.3 },
        { planOrderNo: "PP202501003", productCategory: "工业传感器", plannedQty: 1000, actualQty: 900, achievementRate: 90.0 },
        { planOrderNo: "PP202501004", productCategory: "汽车电子传感器", plannedQty: 500, actualQty: 500, achievementRate: 100.0 },
        { planOrderNo: "PP202503001", productCategory: "卫浴传感器", plannedQty: 2900, actualQty: 2500, achievementRate: 86.2 },
        { planOrderNo: "PP202503002", productCategory: "温湿度传感器", plannedQty: 1800, actualQty: 1600, achievementRate: 89.7 }
      ]
    }
  },
  // 车间日报数据
  workshopDaily: {
    summaryCards: [
      { cardName: "totalOutput", cardLabel: "当日总产量", cardValue: "1250", unit: "件" },
      { cardName: "averageYield", cardLabel: "当日平均良率", cardValue: "97.2", unit: "%" }
    ],
    chartArea: {
      data: [
        { date: "12-12", total: 500 },
        { date: "12-13", total: 550 },
        { date: "12-14", total: 530 },
        { date: "12-15", total: 580 },
        { date: "12-16", total: 600 },
        { date: "12-17", total: 560 },
        { date: "12-18", total: 630 }
      ]
    },
    dailyReportTable: {
      columns: [
        { colName: "productCategory", colLabel: "产品分类" },
        { colName: "plannedOutput", colLabel: "计划产量" },
        { colName: "actualOutput", colLabel: "实际产量" },
        { colName: "achievementRate", colLabel: "达成率(%)" },
        { colName: "qualifiedQty", colLabel: "合格数量" },
        { colName: "unqualifiedQty", colLabel: "不合格数量" },
        { colName: "yieldRate", colLabel: "良率(%)" },
        { colName: "responsiblePerson", colLabel: "负责人" }
      ],
      data: [
        { productCategory: "卫浴传感器", plannedOutput: 240, actualOutput: 250, achievementRate: 104.2, qualifiedQty: 244, unqualifiedQty: 6, yieldRate: 97.6, responsiblePerson: "张三" },
        { productCategory: "温湿度传感器", plannedOutput: 180, actualOutput: 190, achievementRate: 105.6, qualifiedQty: 185, unqualifiedQty: 5, yieldRate: 97.4, responsiblePerson: "李四" },
        { productCategory: "工业传感器", plannedOutput: 120, actualOutput: 130, achievementRate: 108.3, qualifiedQty: 128, unqualifiedQty: 2, yieldRate: 98.5, responsiblePerson: "王五" },
        { productCategory: "汽车电子传感器", plannedOutput: 50, actualOutput: 60, achievementRate: 120.0, qualifiedQty: 60, unqualifiedQty: 0, yieldRate: 100.0, responsiblePerson: "赵六" }
      ]
    }
  },
  // 质检合格率数据
  qualityRate: {
    summaryCards: [
      { cardName: "totalInspected", cardLabel: "当日质检总数", cardValue: "1250", unit: "件" },
      { cardName: "totalQualified", cardLabel: "当日合格数量", cardValue: "1215", unit: "件" },
      { cardName: "totalUnqualified", cardLabel: "当日不合格数量", cardValue: "35", unit: "件" },
      { cardName: "passRate", cardLabel: "当日质检合格率", cardValue: "97.2", unit: "%" }
    ],
    chartArea: {
      data: [
        { date: "12-12", passRate: 96.8 },
        { date: "12-13", passRate: 97.1 },
        { date: "12-14", passRate: 96.9 },
        { date: "12-15", passRate: 97.3 },
        { date: "12-16", passRate: 97.4 },
        { date: "12-17", passRate: 97.0 },
        { date: "12-18", passRate: 97.2 }
      ]
    },
    qualityTable: {
      columns: [
        { colName: "productCategory", colLabel: "产品分类" },
        { colName: "inspectedQty", colLabel: "质检数量" },
        { colName: "qualifiedQty", colLabel: "合格数量" },
        { colName: "unqualifiedQty", colLabel: "不合格数量" },
        { colName: "passRate", colLabel: "合格率(%)" },
        { colName: "responsiblePerson", colLabel: "质检负责人" }
      ],
      data: [
        { productCategory: "卫浴传感器", inspectedQty: 250, qualifiedQty: 244, unqualifiedQty: 6, passRate: 97.6, responsiblePerson: "张三" },
        { productCategory: "温湿度传感器", inspectedQty: 190, qualifiedQty: 185, unqualifiedQty: 5, passRate: 97.4, responsiblePerson: "李四" },
        { productCategory: "工业传感器", inspectedQty: 130, qualifiedQty: 128, unqualifiedQty: 2, passRate: 98.5, responsiblePerson: "王五" },
        { productCategory: "汽车电子传感器", inspectedQty: 60, qualifiedQty: 60, unqualifiedQty: 0, passRate: 100.0, responsiblePerson: "赵六" }
      ]
    }
  },
  // 物料齐套率报表数据
  materialAvailability: {
    summaryCards: [
      { cardName: "totalPlannedOrders", cardLabel: "当日计划生产订单数", cardValue: "12", unit: "单" },
      { cardName: "totalKittingReadyOrders", cardLabel: "当日齐套订单数", cardValue: "10", unit: "单" },
      { cardName: "overallKittingRate", cardLabel: "当日物料齐套率", cardValue: "83.3", unit: "%" },
      { cardName: "shortageItemCount", cardLabel: "缺料物料种类", cardValue: "3", unit: "种" }
    ],
    chartArea: {
      data: [
        { date: "12-12", kittingRate: 91.7 },
        { date: "12-13", kittingRate: 83.3 },
        { date: "12-14", kittingRate: 91.7 },
        { date: "12-15", kittingRate: 100.0 },
        { date: "12-16", kittingRate: 91.7 },
        { date: "12-17", kittingRate: 83.3 },
        { date: "12-18", kittingRate: 83.3 }
      ]
    },
    kittingDetailTable: {
      columns: [
        { colName: "productCategory", colLabel: "产品分类" },
        { colName: "planOrderNo", colLabel: "生产计划单号", isLink: true },
        { colName: "requiredItems", colLabel: "需用物料种类" },
        { colName: "readyItems", colLabel: "齐套物料种类" },
        { colName: "shortageItems", colLabel: "缺料物料种类" },
        { colName: "kittingRate", colLabel: "齐套率(%)" },
        { colName: "status", colLabel: "齐套状态" }
      ],
      data: [
        { productCategory: "卫浴传感器", planOrderNo: "PP20251218001", requiredItems: 5, readyItems: 5, shortageItems: 0, kittingRate: 100.0, status: "已齐套" },
        { productCategory: "卫浴传感器", planOrderNo: "PP20251218002", requiredItems: 5, readyItems: 5, shortageItems: 0, kittingRate: 100.0, status: "已齐套" },
        { productCategory: "温湿度传感器", planOrderNo: "PP20251218003", requiredItems: 4, readyItems: 3, shortageItems: 1, kittingRate: 75.0, status: "缺料" },
        { productCategory: "工业传感器", planOrderNo: "PP20251218004", requiredItems: 6, readyItems: 6, shortageItems: 0, kittingRate: 100.0, status: "已齐套" },
        { productCategory: "汽车电子传感器", planOrderNo: "PP20251218005", requiredItems: 7, readyItems: 6, shortageItems: 1, kittingRate: 85.7, status: "缺料" }
      ]
    },
    shortageDetailTable: {
      columns: [
        { colName: "productCategory", colLabel: "产品分类" },
        { colName: "planOrderNo", colLabel: "生产计划单号", isLink: true },
        { colName: "materialName", colLabel: "缺料物料名称" },
        { colName: "spec", colLabel: "规格型号" },
        { colName: "unit", colLabel: "单位" },
        { colName: "requiredQty", colLabel: "需求数量" },
        { colName: "availableQty", colLabel: "可用库存" },
        { colName: "shortageQty", colLabel: "缺料数量" },
        { colName: "purchaseOrderNo", colLabel: "采购单号", isLink: true }
      ],
      data: [
        { productCategory: "温湿度传感器", planOrderNo: "PP20251218003", materialName: "温湿度探头", spec: "PROBE-002", unit: "PCS", requiredQty: 100, availableQty: 50, shortageQty: 50, purchaseOrderNo: "PO20251218001" },
        { productCategory: "汽车电子传感器", planOrderNo: "PP20251218005", materialName: "专用芯片", spec: "IC-004", unit: "PCS", requiredQty: 50, availableQty: 30, shortageQty: 20, purchaseOrderNo: "PO20251218002" }
      ]
    }
  }
};

export const ProductionDataStatisticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('planAchievement');
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-05-31');
  const [dailyDate, setDailyDate] = useState('2025-12-18');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const activeTabName = useMemo(() => {
    return DATA_JSON.moduleTabs.find(t => t.code === activeTab)?.name || "";
  }, [activeTab]);

  // 1. 计划达成率图表计算
  const planChartData = DATA_JSON.planAchievement.multiProductData;
  const planMaxQty = useMemo(() => Math.max(...planChartData.map(d => Math.max(d.totalPlannedQty, d.totalActualQty))) * 1.2, [planChartData]);

  // 2. 车间日报图表计算
  const dailyChartData = DATA_JSON.workshopDaily.chartArea.data;
  const dailyMaxQty = useMemo(() => Math.max(...dailyChartData.map(d => d.total)) * 1.2, [dailyChartData]);

  // 3. 质检合格率图表计算 (折线图路径)
  const qualityTrendData = DATA_JSON.qualityRate.chartArea.data;
  const qualityMaxRate = 100;
  const qualityMinRate = useMemo(() => Math.floor(Math.min(...qualityTrendData.map(d => d.passRate)) - 1), [qualityTrendData]);
  
  const qualityLinePoints = useMemo(() => {
    const width = 1000;
    const height = 250;
    const step = width / (qualityTrendData.length - 1);
    return qualityTrendData.map((d, i) => {
      const x = i * step;
      const y = height - ((d.passRate - qualityMinRate) / (qualityMaxRate - qualityMinRate)) * height;
      return `${x},${y}`;
    }).join(' ');
  }, [qualityTrendData, qualityMinRate]);

  // 4. 物料齐套率图表计算
  const kittingChartData = DATA_JSON.materialAvailability.chartArea.data;
  const kittingMaxRate = 100;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans text-[#333333]">
      {/* 顶部标题 & 模块 Tab */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{DATA_JSON.pageConfig.pageTitle}</h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest italic">生产数据分析引擎</p>
          </div>
          <div className="flex items-center space-x-3">
             <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                <ArrowPathIcon className="h-5 w-5" />
             </button>
             <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all">
                <FilterIcon className="h-4 w-4 mr-2" />
                导出报表
             </button>
          </div>
        </div>

        <div className="px-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar">
            {DATA_JSON.moduleTabs.map((tab) => (
              <button
                key={tab.code}
                onClick={() => setActiveTab(tab.code)}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-bold text-sm transition-all duration-200
                  ${activeTab === tab.code
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}
                `}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* 计划达成率报表 */}
        {activeTab === 'planAchievement' && (
          <>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-end gap-6 animate-in fade-in duration-500">
              <div className="space-y-2 flex-1 min-w-[300px]">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" /> 时间筛选
                </label>
                <div className="flex items-center space-x-3">
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none" />
                  <span className="text-slate-400 font-bold">至</span>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none" />
                </div>
              </div>
              <div className="space-y-2 min-w-[200px]">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">产品分类</label>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="block w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none">
                  <option value="all">全部产品分类</option>
                  <option value="sensor_bathroom">卫浴传感器</option>
                  <option value="sensor_temp_hum">温湿度传感器</option>
                  <option value="sensor_industrial">工业传感器</option>
                  <option value="sensor_auto">汽车电子传感器</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-700">
              {DATA_JSON.planAchievement.summaryCards.map((card) => (
                <div key={card.cardName} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{card.cardLabel}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-slate-800 tracking-tighter group-hover:text-blue-600 transition-colors tabular-nums">{card.cardValue}</span>
                    <span className="text-xs font-bold text-slate-300 uppercase">{card.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">生产计划达成率趋势分析</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-wider italic">X轴: 时间线 | Y轴: 生产数量</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                    <span className="text-[10px] font-black text-slate-500">计划数量</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-3 h-3 bg-indigo-200 rounded-sm"></div>
                    <span className="text-[10px] font-black text-slate-500">实际完成</span>
                  </div>
                </div>
              </div>
              <div className="relative h-80 w-full">
                <svg viewBox={`0 0 1000 250`} className="w-full h-full overflow-visible">
                  {planChartData.map((d, i) => {
                    const step = 1000 / planChartData.length;
                    const baseX = i * step + step / 2;
                    const hPlanned = (d.totalPlannedQty / planMaxQty) * 250;
                    const hActual = (d.totalActualQty / planMaxQty) * 250;
                    return (
                      <g key={i} className="group cursor-help transition-all">
                        <rect x={baseX - 15} y={250 - hPlanned} width={30} height={hPlanned} fill="#2563eb" rx="4" />
                        <rect x={baseX + 15} y={250 - hActual} width={30} height={hActual} fill="#e0e7ff" rx="4" />
                        <text x={baseX + 15} y={280} textAnchor="middle" className="text-[10px] font-black fill-slate-300 uppercase">{d.date}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-1000">
              <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between">
                <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">计划达成明细</h4>
                <span className="text-[10px] font-bold text-slate-400 italic">记录总数: {DATA_JSON.planAchievement.detailTable.data.length}</span>
              </div>
              <table className="min-w-full divide-y divide-slate-100 text-xs">
                <thead className="bg-slate-50">
                  <tr>
                    {DATA_JSON.planAchievement.detailTable.columns.map(col => (
                      <th key={col.colName} className="px-8 py-4 text-left font-black text-slate-500 uppercase">{col.colLabel}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {DATA_JSON.planAchievement.detailTable.data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-8 py-4 font-mono font-bold text-blue-600 underline">{row.planOrderNo}</td>
                      <td className="px-8 py-4">{row.productCategory}</td>
                      <td className="px-8 py-4 font-mono">{row.plannedQty}</td>
                      <td className="px-8 py-4 font-mono">{row.actualQty}</td>
                      <td className="px-8 py-4 font-black text-blue-600">{row.achievementRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* 车间日报 */}
        {activeTab === 'workshopDaily' && (
          <>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-end gap-6 animate-in fade-in duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" /> 日期
                </label>
                <input type="date" value={dailyDate} onChange={(e) => setDailyDate(e.target.value)} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none min-w-[200px]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-700">
              {DATA_JSON.workshopDaily.summaryCards.map((card) => (
                <div key={card.cardName} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{card.cardLabel}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-slate-800 group-hover:text-blue-600 transition-colors tabular-nums">{card.cardValue}</span>
                    <span className="text-xs font-bold text-slate-300 uppercase">{card.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">近7天产量趋势</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-wider italic">X轴: 日期 | Y轴: 产量(件)</p>
                </div>
              </div>
              <div className="relative h-80 w-full overflow-hidden">
                <svg viewBox={`0 0 1000 250`} className="w-full h-full overflow-visible">
                  {dailyChartData.map((d, i) => {
                    const step = 1000 / dailyChartData.length;
                    const baseX = i * step + step / 2;
                    const h = (d.total / dailyMaxQty) * 250;
                    return (
                      <g key={i} className="group cursor-help transition-all">
                        <rect x={baseX - 25} y={250 - h} width={50} height={h} fill="#3b82f6" rx="6" className="transition-all duration-700 ease-out hover:fill-blue-600 shadow-sm" />
                        <text x={baseX} y={250 - h - 10} textAnchor="middle" className="text-[10px] font-black fill-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">{d.total}</text>
                        <text x={baseX} y={280} textAnchor="middle" className="text-[10px] font-black fill-slate-300 uppercase tracking-widest">{d.date}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-1000">
              <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between">
                <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">车间日报明细</h4>
                <span className="text-[10px] font-bold text-slate-400 italic">产品分类统计: {DATA_JSON.workshopDaily.dailyReportTable.data.length}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                  <thead className="bg-slate-50">
                    <tr>
                      {DATA_JSON.workshopDaily.dailyReportTable.columns.map(col => (
                        <th key={col.colName} className="px-8 py-4 text-left font-black text-slate-500 uppercase tracking-tight">{col.colLabel}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {DATA_JSON.workshopDaily.dailyReportTable.data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-8 py-4 font-bold text-slate-800">{row.productCategory}</td>
                        <td className="px-8 py-4 font-mono">{row.plannedOutput}</td>
                        <td className="px-8 py-4 font-mono font-bold">{row.actualOutput}</td>
                        <td className="px-8 py-4">
                          <div className="flex items-center space-x-2">
                             <span className={`font-black ${row.achievementRate >= 100 ? 'text-emerald-600' : 'text-blue-600'}`}>{row.achievementRate}%</span>
                             <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full ${row.achievementRate >= 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${Math.min(row.achievementRate, 100)}%` }} />
                             </div>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-emerald-600 font-bold">{row.qualifiedQty}</td>
                        <td className="px-8 py-4 text-rose-500 font-bold">{row.unqualifiedQty}</td>
                        <td className="px-8 py-4 font-black">{row.yieldRate}%</td>
                        <td className="px-8 py-4 font-medium text-slate-600">{row.responsiblePerson}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* 产品质检合格率报表 */}
        {activeTab === 'qualityRate' && (
          <>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-end gap-6 animate-in fade-in duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" /> 日期
                </label>
                <input type="date" value={dailyDate} onChange={(e) => setDailyDate(e.target.value)} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none min-w-[200px]" />
              </div>
              <div className="space-y-2 min-w-[200px]">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">产品分类</label>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="block w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none">
                  <option value="all">全部</option>
                  <option value="sensor_bathroom">卫浴传感器</option>
                  <option value="sensor_temp_hum">温湿度传感器</option>
                  <option value="sensor_industrial">工业传感器</option>
                  <option value="sensor_auto">汽车电子传感器</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-700">
              {DATA_JSON.qualityRate.summaryCards.map((card) => (
                <div key={card.cardName} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{card.cardLabel}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className={`text-3xl font-black ${card.cardName === 'totalUnqualified' ? 'text-rose-500' : 'text-slate-800'} group-hover:text-blue-600 transition-colors tabular-nums`}>{card.cardValue}</span>
                    <span className="text-xs font-bold text-slate-300 uppercase">{card.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">近7天质检合格率趋势</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-wider italic">X轴: 日期 | Y轴: 合格率(%)</p>
                </div>
              </div>
              <div className="relative h-80 w-full overflow-hidden">
                <svg viewBox={`0 0 1000 250`} className="w-full h-full overflow-visible">
                  {/* 参考线 */}
                  {[0, 0.25, 0.5, 0.75, 1].map(r => (
                    <line key={r} x1="0" y1={250 * r} x2="1000" y2={250 * r} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4" />
                  ))}
                  {/* 渐变填充 */}
                  <defs>
                    <linearGradient id="qualityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d={`M 0,250 L ${qualityLinePoints} L 1000,250 Z`} 
                    fill="url(#qualityGradient)" 
                    className="transition-all duration-700" 
                  />
                  {/* 折线 */}
                  <polyline 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    points={qualityLinePoints} 
                    className="animate-in fade-in duration-1000"
                  />
                  {/* 数据点 */}
                  {qualityTrendData.map((d, i) => {
                    const step = 1000 / (qualityTrendData.length - 1);
                    const x = i * step;
                    const y = 250 - ((d.passRate - qualityMinRate) / (qualityMaxRate - qualityMinRate)) * 250;
                    return (
                      <g key={i} className="group cursor-help">
                        <circle cx={x} cy={y} r="5" fill="white" stroke="#3b82f6" strokeWidth="2" className="transition-all group-hover:r-7" />
                        <foreignObject x={x - 40} y={y - 45} width="80" height="40" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg text-center font-bold shadow-xl">
                            {d.passRate}%
                          </div>
                        </foreignObject>
                        <text x={x} y={280} textAnchor="middle" className="text-[10px] font-black fill-slate-300 uppercase tracking-widest">{d.date}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-1000">
              <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between">
                <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">质检合格报表明细</h4>
                <span className="text-[10px] font-bold text-slate-400 italic">分类统计记录: {DATA_JSON.qualityRate.qualityTable.data.length}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                  <thead className="bg-slate-50">
                    <tr>
                      {DATA_JSON.qualityRate.qualityTable.columns.map(col => (
                        <th key={col.colName} className="px-8 py-4 text-left font-black text-slate-500 uppercase tracking-tight">{col.colLabel}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {DATA_JSON.qualityRate.qualityTable.data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-8 py-4 font-bold text-slate-800">{row.productCategory}</td>
                        <td className="px-8 py-4 font-mono font-bold text-slate-600">{row.inspectedQty}</td>
                        <td className="px-8 py-4 font-mono text-emerald-600 font-bold">{row.qualifiedQty}</td>
                        <td className="px-8 py-4 font-mono text-rose-500 font-bold">{row.unqualifiedQty}</td>
                        <td className="px-8 py-4">
                          <div className="flex items-center space-x-2">
                             <span className={`font-black ${row.passRate >= 98 ? 'text-emerald-600' : 'text-blue-600'}`}>{row.passRate}%</span>
                             <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full ${row.passRate >= 98 ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${row.passRate}%` }} />
                             </div>
                          </div>
                        </td>
                        <td className="px-8 py-4 font-medium text-slate-600">{row.responsiblePerson}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* 物料齐套率报表 */}
        {activeTab === 'materialAvailability' && (
          <>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-end gap-6 animate-in fade-in duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" /> 日期
                </label>
                <input type="date" value={dailyDate} onChange={(e) => setDailyDate(e.target.value)} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none min-w-[200px]" />
              </div>
              <div className="space-y-2 min-w-[200px]">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">产品分类</label>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="block w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all outline-none">
                  <option value="all">全部</option>
                  <option value="sensor_bathroom">卫浴传感器</option>
                  <option value="sensor_temp_hum">温湿度传感器</option>
                  <option value="sensor_industrial">工业传感器</option>
                  <option value="sensor_auto">汽车电子传感器</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-700">
              {DATA_JSON.materialAvailability.summaryCards.map((card) => (
                <div key={card.cardName} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{card.cardLabel}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className={`text-3xl font-black ${card.cardName === 'shortageItemCount' ? 'text-rose-500' : 'text-slate-800'} group-hover:text-blue-600 transition-colors tabular-nums`}>{card.cardValue}</span>
                    <span className="text-xs font-bold text-slate-300 uppercase">{card.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">近7天物料齐套率趋势</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-wider italic">X轴: 日期 | Y轴: 齐套率(%)</p>
                </div>
              </div>
              <div className="relative h-80 w-full overflow-hidden">
                <svg viewBox={`0 0 1000 250`} className="w-full h-full overflow-visible">
                   {kittingChartData.map((d, i) => {
                    const step = 1000 / kittingChartData.length;
                    const baseX = i * step + step / 2;
                    const h = (d.kittingRate / kittingMaxRate) * 250;
                    return (
                      <g key={i} className="group cursor-help transition-all">
                        <rect x={baseX - 25} y={250 - h} width={50} height={h} fill="#3b82f6" rx="6" className="transition-all duration-700 ease-out hover:fill-blue-600 shadow-sm opacity-80" />
                        <text x={baseX} y={250 - h - 10} textAnchor="middle" className="text-[10px] font-black fill-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">{d.kittingRate}%</text>
                        <text x={baseX} y={280} textAnchor="middle" className="text-[10px] font-black fill-slate-300 uppercase tracking-widest">{d.date}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-1000">
              <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between">
                <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">齐套明细分析</h4>
                <span className="text-[10px] font-bold text-slate-400 italic">计划订单数: {DATA_JSON.materialAvailability.kittingDetailTable.data.length}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                  <thead className="bg-slate-50">
                    <tr>
                      {DATA_JSON.materialAvailability.kittingDetailTable.columns.map(col => (
                        <th key={col.colName} className="px-8 py-4 text-left font-black text-slate-500 uppercase tracking-tight">{col.colLabel}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {DATA_JSON.materialAvailability.kittingDetailTable.data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-8 py-4 font-medium text-slate-600">{row.productCategory}</td>
                        <td className="px-8 py-4 font-mono font-bold text-blue-600 hover:underline cursor-pointer">{row.planOrderNo}</td>
                        <td className="px-8 py-4 text-slate-700 font-mono">{row.requiredItems}</td>
                        <td className="px-8 py-4 text-emerald-600 font-mono font-bold">{row.readyItems}</td>
                        <td className={`px-8 py-4 font-mono font-bold ${row.shortageItems > 0 ? 'text-rose-500' : 'text-slate-400'}`}>{row.shortageItems}</td>
                        <td className={`px-8 py-4 font-black ${row.kittingRate >= 100 ? 'text-emerald-600' : 'text-blue-600'}`}>{row.kittingRate}%</td>
                        <td className="px-8 py-4">
                           <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${row.status === '已齐套' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                             {row.status}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in duration-1000">
              <div className="px-8 py-5 border-b border-slate-100 bg-rose-50/30 flex justify-between">
                <h4 className="text-sm font-black text-rose-700 uppercase tracking-widest">缺料物料明细</h4>
                <span className="text-[10px] font-bold text-rose-400 italic">缺料条目: {DATA_JSON.materialAvailability.shortageDetailTable.data.length}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100 text-xs">
                  <thead className="bg-slate-50">
                    <tr>
                      {DATA_JSON.materialAvailability.shortageDetailTable.columns.map(col => (
                        <th key={col.colName} className="px-8 py-4 text-left font-black text-slate-500 uppercase tracking-tight">{col.colLabel}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {DATA_JSON.materialAvailability.shortageDetailTable.data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-rose-50/20 transition-colors">
                        <td className="px-8 py-4 text-slate-600">{row.productCategory}</td>
                        <td className="px-8 py-4 font-mono font-bold text-slate-800">{row.planOrderNo}</td>
                        <td className="px-8 py-4 font-bold text-rose-700">{row.materialName}</td>
                        <td className="px-8 py-4 text-slate-500 font-mono">{row.spec}</td>
                        <td className="px-8 py-4 text-slate-400">{row.unit}</td>
                        <td className="px-8 py-4 font-mono">{row.requiredQty}</td>
                        <td className="px-8 py-4 font-mono text-slate-400">{row.availableQty}</td>
                        <td className="px-8 py-4 font-mono font-black text-rose-600">{row.shortageQty}</td>
                        <td className="px-8 py-4 font-mono font-bold text-blue-600 hover:underline cursor-pointer">{row.purchaseOrderNo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* 建设中模块 (目前只有计划外的占位逻辑，如果需要可以留着) */}
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};
