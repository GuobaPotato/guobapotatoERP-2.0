
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface CreateApprovalFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ApprovalLevel {
  id: string;
  name: string;
  position: string;
  department: string;
}

interface Condition {
  id: string;
  field: string;
}

export const CreateApprovalFlowModal: React.FC<CreateApprovalFlowModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [isApproverGroupExpanded, setIsApproverGroupExpanded] = useState(true);
  
  // 表单数据状态
  const [flowName, setFlowName] = useState("红外项目20000元以下采购审批流");
  const [scope, setScope] = useState("采购审批");
  const [description, setDescription] = useState("红外感应配件采购类单据的审批流程，适用于采购金额≥5000元，小于20000元的申请，需采购专员初审、采购经理复审、运营总监终审");
  const [ccPersons, setCcPersons] = useState(["李仓管", "周仓管"]);
  
  // 动态审批人列表
  const [levels, setLevels] = useState<ApprovalLevel[]>([
    { id: '1', name: '赵采购', position: '采购专员', department: '采购部' },
    { id: '2', name: '钱经理', position: '采购经理', department: '采购部' }
  ]);

  // 动态条件列表
  const [conditions, setConditions] = useState<Condition[]>([
    { id: 'c1', field: '总采购金额(元)' }
  ]);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const addLevel = () => {
    if (levels.length >= 5) return;
    const newId = (levels.length + 1).toString();
    setLevels([...levels, { id: newId, name: '', position: '', department: '' }]);
  };

  const removeLevel = (id: string) => {
    if (levels.length <= 1) return;
    setLevels(levels.filter(l => l.id !== id));
  };

  const addCondition = () => {
    setConditions([...conditions, { id: Date.now().toString(), field: '' }]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const inputClass = "block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:bg-slate-100 disabled:text-slate-500";
  const labelClass = "block text-sm font-semibold text-slate-700";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;

  const approverOptions = ["赵采购", "李仓管", "钱销售", "孙生产", "周仓管", "钱经理", "孙总监", "周主管", "吴总"];
  const departmentOptions = ["采购部", "仓储部", "销售部", "生产部", "技术部"];
  const conditionOptions = ["总采购金额(元)", "入库数量(个)", "盘点差异率(%)", "合同金额(元)"];

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-2xl w-full max-w-[950px] max-h-[92vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-white rounded-t-xl sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-slate-800">新建审批流</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1.5 transition-colors hover:bg-slate-100">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto no-scrollbar bg-slate-50/30">
          <div className="space-y-10">
            
            {/* 基础设置 Section */}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-800">基础设置</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <label className={requiredLabelClass}>审批流名称</label>
                  <input 
                    type="text" 
                    className={`${inputClass} !bg-white mt-1`} 
                    value={flowName}
                    onChange={(e) => setFlowName(e.target.value)}
                    placeholder="请输入审批流名称"
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className={requiredLabelClass}>适用范围</label>
                  <select 
                    className={`${inputClass} !bg-white mt-1`}
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                  >
                    <option value="采购审批">采购审批</option>
                    <option value="入库单审批">入库单审批</option>
                    <option value="库存盘点审批">库存盘点审批</option>
                    <option value="合同审批">合同审批</option>
                    <option value="报价单审批">报价单审批</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>抄送人</label>
                  <div className="mt-1 flex flex-wrap gap-2 p-2 border border-slate-300 rounded-lg bg-white min-h-[38px]">
                    {ccPersons.map(person => (
                      <span key={person} className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                        {person}
                        <button 
                          onClick={() => setCcPersons(ccPersons.filter(p => p !== person))}
                          className="ml-1 hover:text-blue-900"
                        >
                          <XMarkIcon className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    <button className="text-blue-600 text-xs font-bold hover:underline ml-1">+添加</button>
                  </div>
                </div>

                {/* 审批人配置 Group */}
                <div className="md:col-span-2 border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between mb-4">
                     <label className={requiredLabelClass}>审批人层级配置</label>
                     <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">最多支持 5 级</span>
                  </div>
                  
                  <div className="space-y-4">
                    {levels.map((level, index) => (
                      <div key={level.id} className="relative group bg-slate-50 p-4 rounded-lg border border-slate-200 animate-in fade-in slide-in-from-left-2">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded">第 {index + 1} 级审批</span>
                          {levels.length > 1 && (
                            <button 
                              onClick={() => removeLevel(level.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 mb-1 block">审批人</label>
                            <select className={inputClass} value={level.name} onChange={(e) => {
                              const newLevels = [...levels];
                              newLevels[index].name = e.target.value;
                              setLevels(newLevels);
                            }}>
                              <option value="">请选择</option>
                              {approverOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 mb-1 block">职位</label>
                            <input 
                              type="text" 
                              className={inputClass} 
                              value={level.position} 
                              placeholder="请输入职位"
                              onChange={(e) => {
                                const newLevels = [...levels];
                                newLevels[index].position = e.target.value;
                                setLevels(newLevels);
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-slate-400 mb-1 block">所属部门</label>
                            <select className={inputClass} value={level.department} onChange={(e) => {
                              const newLevels = [...levels];
                              newLevels[index].department = e.target.value;
                              setLevels(newLevels);
                            }}>
                              <option value="">请选择</option>
                              {departmentOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}

                    {levels.length < 5 && (
                      <button 
                        onClick={addLevel}
                        className="w-full py-3 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center font-bold text-sm"
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        添加审批人层级
                      </button>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>审批描述</label>
                  <textarea 
                    className={`${inputClass} !bg-white mt-1 resize-none`}
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="请输入审批描述内容..."
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] text-slate-400 font-medium">{description.length}/200</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 条件设置 Section */}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-1 h-5 bg-emerald-500 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-800">条件设置</h3>
              </div>

              <div className="space-y-4">
                {conditions.map((condition, idx) => (
                  <div key={condition.id} className="flex items-center space-x-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 w-16">条件 {idx + 1}</span>
                    <div className="flex-1">
                      <select 
                        className={inputClass}
                        value={condition.field}
                        onChange={(e) => {
                           const next = [...conditions];
                           next[idx].field = e.target.value;
                           setConditions(next);
                        }}
                      >
                        <option value="">请选择触发条件字段</option>
                        {conditionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="w-48">
                      <div className="flex items-center space-x-2">
                         <span className="text-xs font-bold text-slate-400">≥</span>
                         <input type="number" className={inputClass} placeholder="阈值" />
                      </div>
                    </div>
                    <button 
                      onClick={() => removeCondition(condition.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                <button 
                  onClick={addCondition}
                  className="flex items-center text-blue-600 text-sm font-bold hover:text-blue-700 hover:underline transition-all"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  添加审批条件
                </button>
              </div>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-5 border-t border-slate-200 bg-slate-50 rounded-b-xl sticky bottom-0 z-10">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all shadow-sm"
          >
            取消
          </button>
          <button 
            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            保存并发布
          </button>
        </div>
      </div>
    </div>
  );
};
