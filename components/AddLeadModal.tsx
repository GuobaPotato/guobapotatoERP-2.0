
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    leadName: '',
    contactPerson: '',
    leadSource: '',
    phone: '',
    landline: '',
    email: '',
    honorific: '先生',
    region: '',
    owner: '',
    customerLevel: '',
    addressDetail: '',
    remarks: ''
  });

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => {
        setShow(false);
        setFormData({
          leadName: '',
          contactPerson: '',
          leadSource: '',
          phone: '',
          landline: '',
          email: '',
          honorific: '先生',
          region: '',
          owner: '',
          customerLevel: '',
          addressDetail: '',
          remarks: ''
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClass = "mt-1 block w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all";
  const labelClass = "block text-xs font-black text-slate-500 uppercase tracking-widest mb-1 ml-1";

  const sourceOptions = ["行业展会", "电话销售", "广告", "客户介绍", "自己开发"];
  const levelOptions = ["A级潜在客户", "B级潜在客户", "C级潜在客户"];
  const ownerOptions = ["李销售", "王销售", "张助理", "赵经理"];

  return (
    <div className={`fixed inset-0 z-[60] flex justify-center items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} role="dialog" aria-modal="true" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">添加线索</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5 italic">Entry New Sales Lead</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors hover:bg-slate-50"><XMarkIcon className="h-6 w-6" /></button>
        </div>

        <div className="p-8 overflow-y-auto no-scrollbar flex-1">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className={labelClass}>线索名称</label>
              <input type="text" name="leadName" value={formData.leadName} onChange={handleInputChange} className={inputClass} placeholder="请输入线索名称" />
            </div>
            <div>
              <label className={labelClass}>联系人</label>
              <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className={inputClass} placeholder="请输入联系人姓名" />
            </div>
            <div className="relative">
              <label className={labelClass}>线索来源</label>
              <select name="leadSource" value={formData.leadSource} onChange={handleInputChange} className={`${inputClass} appearance-none pr-10`}><option value="">无</option>{sourceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
              <ChevronDownIcon className="absolute right-4 top-10 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            <div>
              <label className={labelClass}>联系电话</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="请输入联系电话" />
            </div>
            <div>
              <label className={labelClass}>邮箱</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="请输入电子邮箱" />
            </div>
            <div className="relative">
              <label className={labelClass}>客户级别</label>
              <select name="customerLevel" value={formData.customerLevel} onChange={handleInputChange} className={`${inputClass} appearance-none pr-10`}><option value="">无</option>{levelOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
              <ChevronDownIcon className="absolute right-4 top-10 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            <div>
              <label className={labelClass}>尊称</label>
              <div className="mt-3 flex items-center space-x-8 px-1">
                <label className="inline-flex items-center cursor-pointer group"><input type="radio" name="honorific" value="先生" className="form-radio h-5 w-5 text-blue-600 border-slate-300" checked={formData.honorific === '先生'} onChange={handleInputChange} /><span className="ml-3 text-sm font-bold text-slate-700">先生</span></label>
                <label className="inline-flex items-center cursor-pointer group"><input type="radio" name="honorific" value="女士" className="form-radio h-5 w-5 text-blue-600 border-slate-300" checked={formData.honorific === '女士'} onChange={handleInputChange} /><span className="ml-3 text-sm font-bold text-slate-700">女士</span></label>
              </div>
            </div>
            <div className="relative">
              <label className={labelClass}>负责人</label>
              <select name="owner" value={formData.owner} onChange={handleInputChange} className={`${inputClass} appearance-none pr-10`}><option value="">请选择</option>{ownerOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>
              <ChevronDownIcon className="absolute right-4 top-10 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>地址</label>
              <div className="flex rounded-xl shadow-sm overflow-hidden border border-slate-300 bg-white"><input type="text" name="addressDetail" value={formData.addressDetail} onChange={handleInputChange} className="flex-1 block w-full px-4 py-2.5 text-sm outline-none bg-white" placeholder="填写详细地址" /></div>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>备注</label>
              <textarea name="remarks" value={formData.remarks} onChange={handleInputChange} rows={4} className={`${inputClass} resize-none`} placeholder="补充说明信息"></textarea>
            </div>
          </form>
        </div>

        <div className="flex justify-end items-center gap-3 px-8 py-6 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl">
          <button onClick={onClose} className="px-8 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest">取消</button>
          <button onClick={onClose} className="px-12 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">确定</button>
        </div>
      </div>
    </div>
  );
};
