
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { PaperClipIcon } from '../icons/PaperClipIcon';

interface AddQualityCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddQualityCheckModal: React.FC<AddQualityCheckModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [isRemarkCollapsed, setIsRemarkCollapsed] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const inputClass = "mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed";
  const labelClass = "block text-sm font-semibold text-slate-700";
  const helpTextClass = "mt-1 text-xs text-slate-400";
  const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;

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
        className={`bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">创建质检单</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1.5 transition-colors hover:bg-slate-100">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto">
          <form className="space-y-8">
            {/* Group 1: Base Info */}
            <section>
              <div className="flex items-center space-x-2 mb-5">
                <div className="w-1.5 h-5 bg-blue-600 rounded-full"></div>
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">基础信息</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <label className={labelClass}>质检单号</label>
                  <input type="text" disabled className={inputClass} placeholder="系统自动带入" />
                  <p className={helpTextClass}>关联创建的质检单编号</p>
                </div>
                
                <div>
                  <label className={requiredLabelClass}>质检类型</label>
                  <select disabled className={inputClass} defaultValue="incoming_material">
                    <option value="incoming_material">来料质检</option>
                    <option value="finished_product">成品质检</option>
                    <option value="delivery">出货质检</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>来料单号</label>
                  <input type="text" disabled className={inputClass} placeholder="系统自动带入" />
                  <p className={helpTextClass}>关联的采购来料单号</p>
                </div>

                <div>
                  <label className={labelClass}>物料名称</label>
                  <input type="text" disabled className={inputClass} placeholder="系统自动带入" />
                  <p className={helpTextClass}>外壳、管道、小线圈等原材料名称</p>
                </div>

                <div>
                  <label className={labelClass}>物料规格</label>
                  <input type="text" disabled className={inputClass} placeholder="系统自动带入" />
                  <p className={helpTextClass}>原材料的型号、尺寸等规格信息</p>
                </div>

                <div>
                  <label className={labelClass}>批次号</label>
                  <input type="text" disabled className={inputClass} placeholder="系统自动带入" />
                </div>

                <div>
                  <label className={labelClass}>计划质检数量</label>
                  <input type="number" disabled className={inputClass} placeholder="系统自动带入" />
                </div>
              </div>
            </section>

            {/* Group 2: Remark (Collapsible) */}
            <section className="border-t border-slate-100 pt-6">
              <button 
                type="button"
                onClick={() => setIsRemarkCollapsed(!isRemarkCollapsed)}
                className="w-full flex items-center justify-between mb-5 group"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-5 bg-slate-400 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight">备注信息</h3>
                </div>
                <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isRemarkCollapsed ? '' : 'rotate-180'}`} />
              </button>
              
              {!isRemarkCollapsed && (
                <div className="space-y-6 animate-in slide-in-from-top-2 duration-200">
                  <div>
                    <label className={labelClass}>质检备注</label>
                    <textarea 
                      rows={3} 
                      maxLength={1000}
                      className={`${inputClass} !bg-white resize-none`} 
                      placeholder="请输入质检相关备注信息（选填）"
                    />
                    <p className="text-right text-[10px] text-slate-400 mt-1">最多输入 1000 个字符</p>
                  </div>

                  <div>
                    <label className={labelClass}>附件上传（质检报告/不良品照片）</label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer">
                      <div className="space-y-1 text-center">
                        <PaperClipIcon className="mx-auto h-12 w-12 text-slate-400" />
                        <div className="flex text-sm text-slate-600">
                          <span className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-1">
                            点击上传文件
                          </span>
                          <p className="pl-1">或拖拽至此处</p>
                        </div>
                        <p className="text-xs text-slate-500">
                          支持 PDF, JPG, PNG, DOCX (最大 50MB)
                        </p>
                      </div>
                    </div>
                    <p className={helpTextClass}>支持PDF、图片、Word格式，单个文件最大50MB，最多上传10个</p>
                  </div>
                </div>
              )}
            </section>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-5 border-t border-slate-200 bg-slate-50 rounded-b-xl">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-all shadow-sm"
          >
            取消
          </button>
          <button 
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            保存草稿
          </button>
          <button 
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
          >
            提交
          </button>
        </div>
      </div>
    </div>
  );
};
