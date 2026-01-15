
import React, { useState } from 'react';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { ArrowDownTrayIcon } from '../components/icons/ArrowDownTrayIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { Page } from '../App';

// 页面配置与模拟数据
const PAGE_CONFIG = {
  title: "库位管理",
  description: "单仓库库位监控与管理（来料区/成品区/待检区）",
  zones: [
    {
      zoneName: "来料区",
      zoneDesc: "存放待入库检验的原材料、零部件",
      zoneColor: "#E8F4FD", // 浅蓝
      locationList: [
        {
          locationCode: "A01",
          manager: "张三",
          containedProducts: [{ name: "MEMS压力传感器芯片" }],
        },
        {
          locationCode: "A02",
          manager: "张三",
          containedProducts: [
            { name: "温湿度传感器外壳" },
            { name: "防水密封胶圈" }
          ],
        },
        {
          locationCode: "A03",
          manager: "李四",
          containedProducts: [
            { name: "电机振动传感器线圈" },
            { name: "微型继电器" },
            { name: "接线端子" }
          ],
        },
        {
          locationCode: "A04",
          manager: "李四",
          containedProducts: [],
        }
      ]
    },
    {
      zoneName: "成品区",
      zoneDesc: "存放检验合格的成品传感器，待外销出库",
      zoneColor: "#F0F9F0", // 浅绿
      locationList: [
        {
          locationCode: "B01",
          manager: "王五",
          containedProducts: [{ name: "MEMS压力传感器23型（成品）" }],
        },
        {
          locationCode: "B02",
          manager: "王五",
          containedProducts: [
            { name: "新能源车用电流传感器（成品）" },
            { name: "双路电机振动传感器（成品）" }
          ],
        },
        {
          locationCode: "B03",
          manager: "赵六",
          containedProducts: [],
        }
      ]
    },
    {
      zoneName: "待检区",
      zoneDesc: "存放待质量检验的半成品/成品，禁止直接出库",
      zoneColor: "#FFF8E1", // 浅黄
      locationList: [
        {
          locationCode: "C01",
          manager: "钱七",
          containedProducts: [{ name: "HX-001工业测试传感器（半成品）" }],
        },
        {
          locationCode: "C02",
          manager: "钱七",
          containedProducts: [
            { name: "钻具压力传感器（成品）" },
            { name: "SH-001系列温湿度传感器（成品）" }
          ],
        },
        {
          locationCode: "C03",
          manager: "孙八",
          containedProducts: [],
        }
      ]
    }
  ]
};

interface WarehouseLocationPageProps {
  setCurrentPage: (page: Page) => void;
}

export const WarehouseLocationPage: React.FC<WarehouseLocationPageProps> = ({ setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 1. Header & Operation Area */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-40 shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{PAGE_CONFIG.title}</h1>
            <p className="text-sm text-slate-400 mt-1 font-medium italic">{PAGE_CONFIG.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all shadow-sm">
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              刷新库位数据
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all shadow-sm">
              批量更新库存
            </button>
            <button className="flex items-center px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all shadow-sm">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              导出库位报表
            </button>
            <button 
              onClick={() => setCurrentPage('warehouseLocationAdd')}
              className="flex items-center px-6 py-2 text-sm font-black text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 uppercase tracking-widest"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              新增库位
            </button>
          </div>
        </div>

        {/* 快速查询 */}
        <div className="mt-6 flex items-center gap-4">
          <div className="max-w-md w-full relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
              placeholder="输入库位编号/物料名称/负责人查询"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Quick Search Engine</span>
        </div>
      </div>

      {/* 2. Warehouse Location Map (Zone List) */}
      <div className="p-8 space-y-12 pb-32">
        {PAGE_CONFIG.zones.map((zone) => (
          <div key={zone.zoneName} className="space-y-6 animate-in fade-in duration-700">
            {/* Zone Header */}
            <div className="flex items-start justify-between border-l-4 border-slate-800 pl-4">
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h2 className="text-xl font-black text-slate-800 tracking-wider uppercase">{zone.zoneName}</h2>
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px] font-black font-mono">
                    {zone.locationList.length} LOCS
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium italic">{zone.zoneDesc}</p>
              </div>
              <div 
                className="w-32 h-1 rounded-full opacity-30" 
                style={{ backgroundColor: zone.zoneColor }}
              ></div>
            </div>

            {/* Location Grid */}
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 rounded-3xl"
              style={{ backgroundColor: zone.zoneColor + '4D' }} // 30% Opacity
            >
              {zone.locationList.map((loc) => (
                <div 
                  key={loc.locationCode} 
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group flex flex-col"
                >
                  <div className="p-5 flex-1">
                    {/* Location Info Header */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Code</span>
                        <span className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">{loc.locationCode}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter leading-none mb-1">Manager</span>
                        <span className="text-xs font-bold text-slate-600">{loc.manager}</span>
                      </div>
                    </div>

                    {/* Products Tags Area */}
                    <div className="min-h-[80px]">
                      <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-2">Stored Items</label>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.containedProducts.length > 0 ? (
                          loc.containedProducts.map((p, pIdx) => (
                            <span 
                              key={pIdx} 
                              className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-100 transition-colors hover:bg-blue-100"
                            >
                              {p.name}
                            </span>
                          ))
                        ) : (
                          <div className="flex items-center space-x-1.5 py-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                             <span className="text-xs text-slate-300 font-medium italic">空库位待命</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end items-center gap-2 rounded-b-2xl">
                    <button className="px-3 py-1.5 text-[10px] font-black text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all uppercase tracking-widest border border-blue-100 hover:border-blue-600">
                      编辑
                    </button>
                    <button className="px-3 py-1.5 text-[10px] font-black text-rose-500 hover:bg-rose-500 hover:text-white rounded-lg transition-all uppercase tracking-widest border border-rose-50 hover:border-rose-500">
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
