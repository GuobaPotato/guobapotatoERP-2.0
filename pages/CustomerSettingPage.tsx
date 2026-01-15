
import React, { useState } from 'react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { PencilSquareIcon } from '../components/icons/PencilSquareIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { Cog6ToothIcon } from '../components/icons/Cog6ToothIcon';
import { ArrowPathIcon } from '../components/icons/ArrowPathIcon';
import { AddCustomerPoolModal } from '../components/settings/AddCustomerPoolModal';

type SettingTab = '客户池管理' | '客户领取规则' | '客户回收规则' | '客户保有量上限';

interface HoldingRule {
  id: string;
  role: string;
  limit: number;
  isEditing?: boolean;
}

export const CustomerSettingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingTab>('客户池管理');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 领取规则相关状态
  const [retrievalPeriod, setRetrievalPeriod] = useState('每周');
  const [maxRetrieval, setMaxRetrieval] = useState(50);
  const [personalLimit, setPersonalLimit] = useState(0);
  const [deptLimit, setDeptLimit] = useState(0);

  // 回收规则相关状态
  const [isAutoRecycleEnabled, setIsAutoRecycleEnabled] = useState(false);
  const [lockLimit, setLockLimit] = useState(10);

  // 客户保有量上限相关状态
  const [isHoldingLimitEnabled, setIsHoldingLimitEnabled] = useState(true);
  const [includeClosedDeals, setIncludeClosedDeals] = useState(false);
  const [holdingRules, setHoldingRules] = useState<HoldingRule[]>([]);

  const customerPools = [
    {
      id: 'CP001',
      name: '全部客户池',
      department: '全公司',
      description: '系统默认分组，不可编辑和删除，展示数据范围权限范围内所有公海客户(即所有自定义分组的合集)',
      isSystem: true
    },
    {
      id: 'CP002',
      name: '公共客户池',
      department: '全公司',
      description: '系统默认无所属客户池数据分组，不可编辑和删除，全公司所有人员均可查看',
      isSystem: true
    }
  ];

  const addHoldingRule = () => {
    const newRule: HoldingRule = {
      id: Date.now().toString(),
      role: '',
      limit: 0,
      isEditing: true
    };
    setHoldingRules([...holdingRules, newRule]);
  };

  const removeHoldingRule = (id: string) => {
    setHoldingRules(holdingRules.filter(r => r.id !== id));
  };

  const updateHoldingRule = (id: string, field: keyof HoldingRule, value: any) => {
    setHoldingRules(holdingRules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-sm";
  const labelClass = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-3";

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-screen-xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">客户池管理相关设置</h1>
          <p className="text-sm text-slate-500 mt-1">管理客户池分类、规则配置及保有量限制</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
          {/* 顶部标签栏 */}
          <div className="px-6 pt-4 border-b border-slate-200 bg-white">
            <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar">
              {['客户池管理', '客户领取规则', '客户回收规则', '客户保有量上限'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as SettingTab)}
                  className={`
                    whitespace-nowrap pb-4 px-1 border-b-2 font-black text-sm transition-all
                    ${activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === '客户池管理' && (
            <div className="flex-1 flex flex-col animate-in fade-in duration-300">
              <div className="p-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30 border-b border-slate-200">
                <div className="relative w-full md:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="请输入客户池名称"
                    className={inputClass}
                  />
                </div>
                
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full md:w-auto inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-bold text-sm transition-all shadow-lg shadow-blue-100 transform active:scale-95"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  添加客户池
                </button>
              </div>

              <div className="flex-1 overflow-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 text-left font-black text-slate-700 uppercase tracking-widest border-b border-slate-200">客户池名称</th>
                      <th className="px-6 py-4 text-left font-black text-slate-700 uppercase tracking-widest border-b border-slate-200">适用部门</th>
                      <th className="px-6 py-4 text-left font-black text-slate-700 uppercase tracking-widest border-b border-slate-200">说明</th>
                      <th className="px-6 py-4 text-center font-black text-slate-700 uppercase tracking-widest border-b border-slate-200">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {customerPools.map((pool) => (
                      <tr key={pool.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-bold text-slate-800">{pool.name}</span>
                            {pool.isSystem && (
                              <span className="ml-2 px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded border border-slate-200 font-black uppercase">系统默认</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-slate-600 font-medium">{pool.department}</td>
                        <td className="px-6 py-5">
                          <p className="text-slate-500 text-xs leading-relaxed max-w-md">
                            {pool.description}
                          </p>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-center">
                          <div className="flex justify-center items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button title="转移" className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all">
                              <ArrowPathIcon className="h-4 w-4" />
                            </button>
                            <button 
                              title="编辑" 
                              disabled={pool.isSystem}
                              className={`p-1.5 rounded transition-all ${pool.isSystem ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'}`}
                            >
                              <PencilSquareIcon className="h-4 w-4" />
                            </button>
                            <button 
                              title="删除" 
                              disabled={pool.isSystem}
                              className={`p-1.5 rounded transition-all ${pool.isSystem ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end">
                  <button className="px-12 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-widest">
                    保存
                  </button>
              </div>
            </div>
          )}

          {activeTab === '客户领取规则' && (
            <div className="p-8 max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center space-x-2 mb-8 border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-bold text-slate-800">客户领取规则</h3>
              </div>
              
              <div className="space-y-10 bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {/* 周期选择 */}
                  <div>
                    <label className={labelClass}>选择周期</label>
                    <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-inner">
                      {['每天', '每周', '每月'].map((period) => (
                        <button
                          key={period}
                          onClick={() => setRetrievalPeriod(period)}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
                            retrievalPeriod === period 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 数量限制 */}
                  <div>
                    <label className={labelClass}>数量限制</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-xs text-slate-400 font-bold">最多领取</span>
                      </div>
                      <input 
                        type="number" 
                        value={maxRetrieval}
                        onChange={(e) => setMaxRetrieval(parseInt(e.target.value) || 0)}
                        className="block w-full pl-20 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono font-bold text-blue-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm" 
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-xs font-bold text-slate-400">个</span>
                      </div>
                    </div>
                  </div>

                  {/* 个人领取限制 */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>个人领取限制</label>
                    <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <span className="text-sm font-medium text-slate-600 shrink-0">自己负责客户放入客户池</span>
                      <div className="relative w-32">
                        <input 
                          type="number" 
                          value={personalLimit}
                          onChange={(e) => setPersonalLimit(parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all pr-8"
                        />
                        <span className="absolute right-3 top-2 text-[10px] font-bold text-slate-400 uppercase">D</span>
                      </div>
                      <span className="text-sm font-medium text-slate-600">天后可重新领取</span>
                    </div>
                  </div>

                  {/* 部门领取限制 */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>部门领取限制</label>
                    <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <span className="text-sm font-medium text-slate-600 shrink-0">部门成员负责的客户放入客户池</span>
                      <div className="relative w-32">
                        <input 
                          type="number" 
                          value={deptLimit}
                          onChange={(e) => setDeptLimit(parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono font-bold text-slate-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all pr-8"
                        />
                        <span className="absolute right-3 top-2 text-[10px] font-bold text-slate-400 uppercase">D</span>
                      </div>
                      <span className="text-sm font-medium text-slate-600">天后该部门任一成员可重新领取</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200 flex justify-end">
                  <button className="px-16 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-widest">
                    保存
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === '客户回收规则' && (
            <div className="p-8 max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center space-x-2 mb-4 border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-bold text-slate-800">客户回收规则</h3>
              </div>
              
              <div className="mb-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-xs text-blue-700 font-medium">
                  注：1、客户锁定是防止客户到期被收回客户池的临时措施。
                </p>
              </div>

              <div className="space-y-8 bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-sm">
                {/* 开启自动回收 */}
                <div className="flex items-center justify-between p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div>
                    <span className="text-sm font-bold text-slate-700">开启自动回收</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">开启后，系统将按规则自动将到期客户收回至公海池</p>
                  </div>
                  <button 
                    onClick={() => setIsAutoRecycleEnabled(!isAutoRecycleEnabled)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${isAutoRecycleEnabled ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAutoRecycleEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* 客户锁定量限制 */}
                <div>
                  <label className={labelClass}>客户锁定量限制</label>
                  <div className="flex items-center space-x-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-sm font-medium text-slate-600 shrink-0">每人最多锁定</span>
                    <div className="relative w-36">
                      <input 
                        type="number" 
                        value={lockLimit}
                        onChange={(e) => setLockLimit(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono font-bold text-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all pr-10"
                      />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">个</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200 flex justify-end">
                  <button className="px-16 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-widest">
                    保存
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === '客户保有量上限' && (
            <div className="p-8 flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300 overflow-hidden">
              {/* 当前页面标题 */}
              <div className="flex items-center space-x-2 mb-6 border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-bold text-slate-800">客户保有量上限</h3>
              </div>

              {/* 说明文字区域 */}
              <div className="mb-6 bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-1.5">
                <p className="text-xs text-blue-700 font-bold">注：1、客户保有量上限是员工可以保有的最大客户数。</p>
                <p className="text-xs text-blue-700 font-bold pl-5">2、客户限制的数量不包含被分配和转移的客户。</p>
                <p className="text-xs text-blue-700 font-bold pl-5">3、不在规则中的角色无保有量限制。</p>
              </div>

              {/* 规则配置区域 */}
              <div className="flex-1 bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-0 overflow-hidden">
                {/* 功能开关区域 */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/60">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-slate-700">客户保有量限制</span>
                    <button 
                      onClick={() => setIsHoldingLimitEnabled(!isHoldingLimitEnabled)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${isHoldingLimitEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isHoldingLimitEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isHoldingLimitEnabled ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {isHoldingLimitEnabled ? '开启' : '关闭'}
                    </span>
                  </div>

                  {/* 复选框选项 */}
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={includeClosedDeals}
                      onChange={(e) => setIncludeClosedDeals(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">包含已成交客户</span>
                  </label>
                </div>

                {/* 表格结构 */}
                <div className="flex-1 overflow-auto border border-slate-200 rounded-xl bg-white shadow-sm flex flex-col">
                  <table className="min-w-full divide-y divide-slate-200 text-sm border-separate border-spacing-0">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-6 py-4 text-left font-black text-slate-500 uppercase tracking-widest border-b border-slate-200">角色</th>
                        <th className="px-6 py-4 text-left font-black text-slate-500 uppercase tracking-widest border-b border-slate-200">数量上限</th>
                        <th className="px-6 py-4 text-center font-black text-slate-500 uppercase tracking-widest border-b border-slate-200 w-32">操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {holdingRules.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-20 text-center text-slate-400 italic">
                            暂无数据，请点击下方按钮添加规则
                          </td>
                        </tr>
                      ) : (
                        holdingRules.map((rule) => (
                          <tr key={rule.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4">
                              {rule.isEditing ? (
                                <select 
                                  value={rule.role}
                                  onChange={(e) => updateHoldingRule(rule.id, 'role', e.target.value)}
                                  className="block w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                                >
                                  <option value="">请选择角色</option>
                                  <option value="总经理">总经理</option>
                                  <option value="销售总监">销售总监</option>
                                  <option value="销售经理">销售经理</option>
                                  <option value="普通销售">普通销售</option>
                                  <option value="商务助理">商务助理</option>
                                </select>
                              ) : (
                                <span className="font-bold text-slate-700">{rule.role || '未选择角色'}</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {rule.isEditing ? (
                                <div className="relative max-w-[120px]">
                                  <input 
                                    type="number"
                                    value={rule.limit}
                                    onChange={(e) => updateHoldingRule(rule.id, 'limit', parseInt(e.target.value) || 0)}
                                    className="block w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-blue-600 focus:ring-1 focus:ring-blue-500 outline-none pr-8"
                                  />
                                  <span className="absolute right-3 top-1.5 text-[10px] font-bold text-slate-400">个</span>
                                </div>
                              ) : (
                                <span className="font-mono font-bold text-blue-600">{rule.limit} 个</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex justify-center items-center space-x-4">
                                <button 
                                  onClick={() => updateHoldingRule(rule.id, 'isEditing', !rule.isEditing)}
                                  className="text-slate-400 hover:text-blue-600 transition-colors"
                                  title={rule.isEditing ? "保存" : "编辑"}
                                >
                                  {rule.isEditing ? (
                                    <ArrowPathIcon className="h-4 w-4" />
                                  ) : (
                                    <PencilSquareIcon className="h-4 w-4" />
                                  )}
                                </button>
                                <button 
                                  onClick={() => removeHoldingRule(rule.id)}
                                  className="text-slate-400 hover:text-red-500 transition-colors"
                                  title="删除"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  
                  <button 
                    onClick={addHoldingRule}
                    className="w-full py-4 text-xs font-black text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border-t border-slate-100 flex items-center justify-center uppercase tracking-widest"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    添加规则
                  </button>
                </div>

                {/* 底部操作区域 */}
                <div className="mt-8 flex justify-end">
                  <button className="px-16 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-widest">
                    保存
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddCustomerPoolModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <style>{`
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};
