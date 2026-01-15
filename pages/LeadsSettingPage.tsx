
import React, { useState } from 'react';
import { PlusIcon } from '../components/icons/PlusIcon';
import { SearchIcon } from '../components/icons/SearchIcon';
import { LEADS_POOL_MANAGEMENT_DATA } from '../constants';
import { PencilSquareIcon } from '../components/icons/PencilSquareIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { AddLeadsPoolModal } from '../components/settings/AddLeadsPoolModal';

type SettingTab = '线索池管理' | '线索领取规则' | '线索回收规则' | '线索保有量上限';

interface HoldingRule {
  id: string;
  role: string;
  limit: number;
  isEditing?: boolean;
}

export const LeadsSettingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingTab>('线索池管理');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [retrievalPeriod, setRetrievalPeriod] = useState('每周');
  
  // 回收规则相关状态
  const [isAutoRecycleEnabled, setIsAutoRecycleEnabled] = useState(true);
  const [noFollowupDays, setNoFollowupDays] = useState(0);
  const [noConversionDays, setNoConversionDays] = useState(0);

  // 线索保有量上限相关状态
  const [isHoldingLimitEnabled, setIsHoldingLimitEnabled] = useState(true);
  const [holdingRules, setHoldingRules] = useState<HoldingRule[]>([
    { id: '1', role: '总经理', limit: 10 },
    { id: '2', role: '财务总监', limit: 12 },
    { id: '3', role: '销售总监', limit: 20 },
  ]);

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

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-screen-xl">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">线索管理设置</h1>
          <p className="text-sm text-slate-500 mt-1">配置线索生命周期、领取规则及公海池归属</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
          {/* 顶部标签栏 */}
          <div className="px-6 pt-4 border-b border-slate-200 bg-white">
            <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar">
              {['线索池管理', '线索领取规则', '线索回收规则', '线索保有量上限'].map((tab) => (
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

          {/* 线索池管理 Tab */}
          {activeTab === '线索池管理' && (
            <div className="flex-1 flex flex-col animate-in fade-in duration-300">
              <div className="p-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30 border-b border-slate-200">
                <div className="relative w-full md:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="请输入线索池名称"
                    className={inputClass}
                  />
                </div>
                
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full md:w-auto inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-bold text-sm transition-all shadow-lg shadow-blue-100 transform active:scale-95"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  添加线索池
                </button>
              </div>

              <div className="flex-1 overflow-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200">线索池名称</th>
                      <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200">适用部门</th>
                      <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200">说明</th>
                      <th className="px-6 py-4 text-center font-bold text-slate-700 uppercase tracking-wider border-b border-slate-200">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {LEADS_POOL_MANAGEMENT_DATA.map((pool) => (
                      <tr key={pool.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-semibold text-slate-800">{pool.name}</span>
                            {pool.isSystem && (
                              <span className="ml-2 px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded border border-slate-200 font-medium uppercase">系统默认</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-slate-600">{pool.department}</td>
                        <td className="px-6 py-5">
                          <p className="text-slate-500 line-clamp-2 max-w-md leading-relaxed">
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
            </div>
          )}

          {/* 线索领取规则 Tab */}
          {activeTab === '线索领取规则' && (
            <div className="p-8 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center space-x-2 mb-8 border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-bold text-slate-800">线索领取规则</h3>
              </div>
              
              <div className="space-y-10 bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3">选择周期</label>
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

                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3">数量限制</label>
                    <div className="relative group">
                      <input 
                        type="number" 
                        defaultValue={50}
                        className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono font-bold text-blue-600 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm" 
                      />
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span className="text-xs font-bold text-slate-400">个</span>
                      </div>
                    </div>
                    <p className="mt-2 text-[10px] text-slate-400 font-medium italic leading-relaxed">
                      * 限制每位成员在{retrievalPeriod}内最多可从公海池领取的线索上限
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200 flex justify-end">
                  <button className="px-12 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-[0.15em]">
                    保存配置
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 线索回收规则 Tab */}
          {activeTab === '线索回收规则' && (
            <div className="p-8 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center space-x-2 mb-8 border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-bold text-slate-800">线索回收规则</h3>
              </div>
              
              <div className="space-y-8 bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-sm font-bold text-slate-700">开启自动回收</label>
                    <p className="text-xs text-slate-400 mt-0.5">开启后，系统将根据下方规则自动将线索退回线索池</p>
                  </div>
                  <button 
                    onClick={() => setIsAutoRecycleEnabled(!isAutoRecycleEnabled)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${isAutoRecycleEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAutoRecycleEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3">规则一</label>
                    <div className="flex items-center space-x-3">
                      <div className="relative flex-1">
                        <input 
                          type="number" 
                          value={noFollowupDays}
                          onChange={(e) => setNoFollowupDays(parseInt(e.target.value) || 0)}
                          className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" 
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <span className="text-xs font-bold text-slate-400">天</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-600">未跟进</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3">规则二</label>
                    <div className="flex items-center space-x-3">
                      <div className="relative flex-1">
                        <input 
                          type="number" 
                          value={noConversionDays}
                          onChange={(e) => setNoConversionDays(parseInt(e.target.value) || 0)}
                          className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" 
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <span className="text-xs font-bold text-slate-400">天</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-600">未转化为客户</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200 flex justify-end">
                  <button className="px-12 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-[0.15em]">
                    保存
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 线索保有量上限 Tab */}
          {activeTab === '线索保有量上限' && (
            <div className="p-8 flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300 overflow-hidden">
              {/* 说明区域 */}
              <div className="mb-6 bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center space-x-2 text-blue-600 font-black text-xs uppercase tracking-widest mb-1">
                  <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
                  <span>使用说明</span>
                </div>
                {[
                  "1、线索保有量上限是员工可以保有的最大线索数。",
                  "2、线索限制的数量不包含被分配和转移的线索。",
                  "3、不在规则中的角色无保有量限制。"
                ].map((text, i) => (
                  <p key={i} className="text-xs text-slate-500 font-medium pl-3">{text}</p>
                ))}
              </div>

              {/* 规则配置区域 */}
              <div className="flex-1 bg-slate-50/50 p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col min-h-0 overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2 border-l-4 border-blue-600 pl-4">
                    <h3 className="text-lg font-bold text-slate-800">线索保有量限制</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-black uppercase tracking-widest ${isHoldingLimitEnabled ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {isHoldingLimitEnabled ? '已开启' : '已关闭'}
                    </span>
                    <button 
                      onClick={() => setIsHoldingLimitEnabled(!isHoldingLimitEnabled)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${isHoldingLimitEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isHoldingLimitEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

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
                      {holdingRules.map((rule) => (
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
                                <option value="财务总监">财务总监</option>
                                <option value="销售总监">销售总监</option>
                                <option value="销售经理">销售经理</option>
                                <option value="普通销售">普通销售</option>
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
                              >
                                <PencilSquareIcon className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => removeHoldingRule(rule.id)}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
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

                <div className="mt-8 flex justify-end">
                  <button className="px-16 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-[0.15em]">
                    保存
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddLeadsPoolModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
};

const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const Cog6ToothIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.797.935.391.162.821.125 1.183-.095l.765-.465c.47-.284 1.083-.19 1.447.224l.773.882c.364.414.4 1.026.084 1.482l-.517.744a1.207 1.207 0 0 0-.102 1.22c.17.391.51.704.94.773l.894.149c.542.09.94.56.94 1.11v1.093c0 .55-.398 1.02-.94 1.11l-.894.149c-.43.07-.77.384-.94.797a1.207 1.207 0 0 0 .102 1.222l.517.744c.316.456.28 1.068-.084 1.482l-.773.882c-.364.414-.977.508-1.447.224l-.765-.465a1.207 1.207 0 0 0-1.183-.095c-.413.17-.727.51-.797.94l-.149.894c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.43-.384-.77-.797-.94a1.207 1.207 0 0 0-1.183.095l-.765.465c-.47.284-1.083.19-1.447-.224l-.773-.882c-.364-.414-.4-1.026-.084-1.482l.517-.744a1.207 1.207 0 0 0 .102-1.222c-.17-.413-.51-.727-.94-.797l-.894-.149c-.542-.09-.94-.56-.94-1.11v-1.093c0-.55.398-1.02.94-1.11l.894-.149c.43-.07.77-.384.94-.797a1.207 1.207 0 0 0-.102-1.22l-.517-.744c-.316-.456-.28-1.068.084-1.482l.773-.882c.364-.414.977-.508 1.447-.224l.765.465a1.207 1.207 0 0 0 1.183.095c.413-.17.727-.51.797-.94l.149-.894Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);
