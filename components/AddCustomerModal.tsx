
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './icons/XMarkIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    primaryContact: '',
    website: '',
    source: '',
    phone: '',
    landline: '',
    email: '',
    honorific: '先生',
    region: '',
    owner: '',
    level: '',
    addressProvince: '',
    addressDetail: '',
    remark: ''
  });

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => {
        setShow(false);
        setFormData({
          customerName: '',
          primaryContact: '',
          website: '',
          source: '',
          phone: '',
          landline: '',
          email: '',
          honorific: '先生',
          region: '',
          owner: '',
          level: '',
          addressProvince: '',
          addressDetail: '',
          remark: ''
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

  const sourceOptions = ["无", "行业展会", "电话销售", "广告", "客户介绍", "自己开发"];
  const regionOptions = ["无", "美国", "东南亚", "英国", "德国", "日本", "中东地区"];
  const levelOptions = ["无", "A级潜在客户", "B级潜在客户", "C级潜在客户", "优质客户", "黑名单"];

  return (
    <div 
      className={`fixed inset-0 z-[60] flex justify-center items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog" 
      aria-modal="true" 
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">添加客户</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5 italic">Add New CRM Customer</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 rounded-full p-2 transition-colors hover:bg-slate-50"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto no-scrollbar flex-1">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className={labelClass}>客户名称</label>
              <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} className={inputClass} placeholder="请输入客户名称" />
            </div>
            <div>
              <label className={labelClass}>首要联系人</label>
              <input type="text" name="primaryContact" value={formData.primaryContact} onChange={handleInputChange} className={inputClass} placeholder="请输入首要联系人姓名" />
            </div>
            <div>
              <label className={labelClass}>客户官网</label>
              <input type="text" name="website" value={formData.website} onChange={handleInputChange} className={inputClass} placeholder="请输入客户官网地址" />
            </div>
            <div className="relative">
              <label className={labelClass}>客户来源</label>
              <select name="source" value={formData.source} onChange={handleInputChange} className={`${inputClass} appearance-none pr-10`}>
                {sourceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDownIcon className="absolute right-4 top-10 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            <div>
              <label className={labelClass}>联系电话</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="请输入联系电话" />
            </div>
            <div>
              <label className={labelClass}>座机</label>
              <input type="text" name="landline" value={formData.landline} onChange={handleInputChange} className={inputClass} placeholder="请输入座机号码" />
            </div>
            <div>
              <label className={labelClass}>邮箱</label>
              <input type="text" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="请输入电子邮箱" />
            </div>
            <div>
              <label className={labelClass}>尊称</label>
              <div className="mt-3 flex items-center space-x-8 px-1">
                <label className="inline-flex items-center cursor-pointer group">
                  <input type="radio" name="honorific" value="先生" className="form-radio h-5 w-5 text-blue-600 border-slate-300" checked={formData.honorific === '先生'} onChange={handleInputChange} />
                  <span className={`ml-3 text-sm font-bold ${formData.honorific === '先生' ? 'text-slate-900' : 'text-slate-400'}`}>先生</span>
                </label>
                <label className="inline-flex items-center cursor-pointer group">
                  <input type="radio" name="honorific" value="女士" className="form-radio h-5 w-5 text-blue-600 border-slate-300" checked={formData.honorific === '女士'} onChange={handleInputChange} />
                  <span className={`ml-3 text-sm font-bold ${formData.honorific === '女士' ? 'text-slate-900' : 'text-slate-400'}`}>女士</span>
                </label>
              </div>
            </div>
            <div className="relative">
              <label className={labelClass}>所在地区</label>
              <select name="region" value={formData.region} onChange={handleInputChange} className={`${inputClass} appearance-none pr-10`}>
                {regionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDownIcon className="absolute right-4 top-10 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <label className={labelClass}>负责人</label>
              <select name="owner" value={formData.owner} onChange={handleInputChange} className={`${inputClass} appearance-none pr-10`}>
                <option value="">请选择负责人</option>
                <option value="李销售">李销售</option>
                <option value="王技术">王技术</option>
              </select>
              <ChevronDownIcon className="absolute right-4 top-10 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <label className={labelClass}>客户级别</label>
              <select name="level" value={formData.level} onChange={handleInputChange} className={`${inputClass} appearance-none pr-10`}>
                {levelOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDownIcon className="absolute right-4 top-10 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>地址</label>
              <div className="flex rounded-xl overflow-hidden border border-slate-300 bg-white">
                <input type="text" name="addressDetail" value={formData.addressDetail} onChange={handleInputChange} className="flex-1 block w-full px-4 py-2.5 text-sm outline-none" placeholder="填写详细地址" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>备注</label>
              <textarea name="remark" value={formData.remark} onChange={handleInputChange} rows={3} className={`${inputClass} resize-none`} placeholder="补充说明信息"></textarea>
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
