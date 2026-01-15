
import React, { useState } from 'react';
import { GlobeAltIcon } from '../components/icons/GlobeAltIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';

export const ShippingQueryPage: React.FC = () => {
  const [carrier, setCarrier] = useState('');
  const [trackingNo, setTrackingNo] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleQuery = () => {
    if (!carrier || !trackingNo) {
      alert('请选择船公司并输入提单号/集装箱号');
      return;
    }
    setIsSearching(true);
    // 模拟查询延迟
    setTimeout(() => setIsSearching(false), 1500);
  };

  const inputClass = "block w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full">
      {/* 顶部标题栏 */}
      <div className="bg-white border-b border-slate-200 px-8 py-10 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-50 rounded-full opacity-50 blur-3xl"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4 shadow-inner">
            <GlobeAltIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">全球海运查询</h1>
          <p className="text-slate-500 font-medium max-w-md mx-auto">支持多家主流船公司，一键获取集装箱实时轨迹与节点状态</p>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-12 flex flex-col items-center">
        {/* 查询卡片 */}
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 lg:p-10 transform -translate-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <label className={labelClass}>请选择船公司</label>
              <select 
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className={inputClass}
              >
                <option value="">请选择船公司</option>
                <option value="maersk">马士基 (Maersk)</option>
                <option value="zim">以星 (ZIM)</option>
                <option value="cosco">中远 (COSCO)</option>
                <option value="msc">地中海 (MSC)</option>
                <option value="one">海洋网联 (ONE)</option>
                <option value="hmm">现代商船 (HMM)</option>
              </select>
            </div>
            <div className="md:col-span-8">
              <label className={labelClass}>请输入提单号或集装箱编号</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-slate-300" />
                </div>
                <input 
                  type="text" 
                  value={trackingNo}
                  onChange={(e) => setTrackingNo(e.target.value)}
                  className={`${inputClass} pl-11`} 
                  placeholder="例如: MSCU1234567" 
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={handleQuery}
              disabled={isSearching}
              className={`
                flex items-center justify-center px-12 py-4 bg-slate-900 text-white rounded-2xl font-black tracking-widest uppercase transition-all shadow-lg active:scale-95
                ${isSearching ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600 hover:shadow-blue-200'}
              `}
            >
              {isSearching ? (
                <>
                  <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />
                  正在查询中...
                </>
              ) : (
                '立即查询轨迹'
              )}
            </button>
          </div>
        </div>

        {/* 船公司合作伙伴展示 */}
        <div className="mt-8 w-full max-w-3xl">
           <h3 className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-6">Supported Carriers</h3>
           <div className="grid grid-cols-4 md:grid-cols-6 gap-8 grayscale opacity-40">
              <div className="h-8 flex items-center justify-center font-black text-lg italic text-slate-400">MAERSK</div>
              <div className="h-8 flex items-center justify-center font-black text-lg italic text-slate-400">COSCO</div>
              <div className="h-8 flex items-center justify-center font-black text-lg italic text-slate-400">MSC</div>
              <div className="h-8 flex items-center justify-center font-black text-lg italic text-slate-400">ZIM</div>
              <div className="h-8 flex items-center justify-center font-black text-lg italic text-slate-400">ONE</div>
              <div className="h-8 flex items-center justify-center font-black text-lg italic text-slate-400">HMM</div>
           </div>
        </div>

        {/* 结果占位区域 */}
        {!isSearching && trackingNo === '' && (
          <div className="mt-20 flex flex-col items-center justify-center text-slate-300">
             <div className="w-20 h-20 border-4 border-dashed border-slate-200 rounded-full flex items-center justify-center mb-4">
                <SearchIcon className="h-8 w-8" />
             </div>
             <p className="text-sm font-bold">暂无查询数据，请输入编号开始</p>
          </div>
        )}

        {isSearching && (
          <div className="mt-12 w-full max-w-3xl animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              <div className="h-24 bg-white rounded-2xl border border-slate-100"></div>
              <div className="h-48 bg-white rounded-2xl border border-slate-100"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
