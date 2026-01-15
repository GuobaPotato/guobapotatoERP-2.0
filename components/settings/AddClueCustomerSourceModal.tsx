
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';

interface AddClueCustomerSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddClueCustomerSourceModal: React.FC<AddClueCustomerSourceModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    sourceName: '',
    sourceType: 'clueSource',
    sourceDesc: '',
    status: 'enable'
  });

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => {
        setShow(false);
        // Reset form on close
        setFormData({ 
          sourceName: '', 
          sourceType: 'clueSource', 
          sourceDesc: '', 
          status: 'enable' 
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClass = "mt-1 block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all";
  const labelClass = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1";
  const requiredMark = <span className="text-rose-500 mr-1">*</span>;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog" 
      aria-modal="true" 
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-[500px] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">新增线索及客户来源</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5 italic">Add New Clue/Customer Source</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors hover:bg-slate-50">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          <div className="space-y-5">
            <div>
              <label className={labelClass}>{requiredMark}来源名称</label>
              <input 
                type="text" 
                name="sourceName"
                value={formData.sourceName}
                onChange={handleInputChange}
                className={inputClass} 
                placeholder="请输入线索/客户来源名称" 
              />
            </div>

            <div>
              <label className={labelClass}>{requiredMark}来源类型</label>
              <div className="mt-3 flex items-center space-x-8 px-1">
                <label className="inline-flex items-center cursor-pointer group">
                  <input 
                    type="radio" 
                    name="sourceType"
                    className="form-radio h-5 w-5 text-blue-600 border-slate-300 focus:ring-blue-500" 
                    checked={formData.sourceType === 'clueSource'}
                    onChange={() => handleRadioChange('sourceType', 'clueSource')}
                  />
                  <span className={`ml-3 text-sm font-bold transition-colors ${formData.sourceType === 'clueSource' ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>线索来源</span>
                </label>
                <label className="inline-flex items-center cursor-pointer group">
                  <input 
                    type="radio" 
                    name="sourceType"
                    className="form-radio h-5 w-5 text-blue-600 border-slate-300 focus:ring-blue-500" 
                    checked={formData.sourceType === 'customerSource'}
                    onChange={() => handleRadioChange('sourceType', 'customerSource')}
                  />
                  <span className={`ml-3 text-sm font-bold transition-colors ${formData.sourceType === 'customerSource' ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>客户来源</span>
                </label>
              </div>
            </div>

            <div>
              <label className={labelClass}>来源描述</label>
              <textarea 
                name="sourceDesc"
                rows={3} 
                value={formData.sourceDesc}
                onChange={handleInputChange}
                className={`${inputClass} resize-none`} 
                placeholder="请输入来源详细描述（可选）"
              ></textarea>
            </div>

            <div>
              <label className={labelClass}>{requiredMark}启用状态</label>
              <div className="mt-3 flex items-center space-x-8 px-1">
                <label className="inline-flex items-center cursor-pointer group">
                  <input 
                    type="radio" 
                    name="status"
                    className="form-radio h-5 w-5 text-blue-600 border-slate-300 focus:ring-blue-500" 
                    checked={formData.status === 'enable'}
                    onChange={() => handleRadioChange('status', 'enable')}
                  />
                  <span className={`ml-3 text-sm font-bold transition-colors ${formData.status === 'enable' ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>启用</span>
                </label>
                <label className="inline-flex items-center cursor-pointer group">
                  <input 
                    type="radio" 
                    name="status"
                    className="form-radio h-5 w-5 text-blue-600 border-slate-300 focus:ring-blue-500" 
                    checked={formData.status === 'disable'}
                    onChange={() => handleRadioChange('status', 'disable')}
                  />
                  <span className={`ml-3 text-sm font-bold transition-colors ${formData.status === 'disable' ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>禁用</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 px-8 py-6 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest shadow-sm active:scale-95"
          >
            取消
          </button>
          <button 
            onClick={() => {
                if(!formData.sourceName) return alert('请填写来源名称');
                console.log('Adding clue/customer source:', formData);
                onClose();
            }}
            className="px-10 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-widest"
          >
            确认新增
          </button>
        </div>
      </div>
    </div>
  );
};
