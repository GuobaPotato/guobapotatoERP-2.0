
import React, { useState } from 'react';
import { Page } from '../App';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';

interface AddWarehouseLocationPageProps {
  setCurrentPage: (page: Page) => void;
}

export const AddWarehouseLocationPage: React.FC<AddWarehouseLocationPageProps> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    locationCode: '',
    locationName: '',
    locationType: '',
    locationStatus: 'ENABLE',
    managerId: '',
    remark: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      locationCode: '',
      locationName: '',
      locationType: '',
      locationStatus: 'ENABLE',
      managerId: '',
      remark: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.locationCode || !formData.locationName || !formData.locationType) {
      alert('请填写所有必填字段');
      return;
    }
    // Simulate API call
    console.log('Saving warehouse location:', formData);
    alert('保存成功！');
    setCurrentPage('warehouseLocation');
  };

  const labelWidth = "w-[120px]";
  const inputContainerClass = "flex-1";
  const rowClass = "flex items-start mb-6";
  const labelClass = `${labelWidth} text-sm font-bold text-slate-700 pt-2 flex-shrink-0`;
  const inputClass = "w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm outline-none";
  const requiredMark = <span className="text-red-500 mr-1">*</span>;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* Breadcrumbs & Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-30 shadow-sm">
        <nav className="flex mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>首页</li>
            <li><span className="mx-2 text-slate-300">/</span>库存管理</li>
            <li><span className="mx-2 text-slate-300">/</span>库位管理</li>
            <li className="text-blue-600"><span className="mx-2 text-slate-300">/</span>新增库位</li>
          </ol>
        </nav>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">新增库位</h1>
      </div>

      <div className="p-8 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-10">
            <div className="space-y-2">
              
              {/* 库位编码 */}
              <div className={rowClass}>
                <label className={labelClass}>{requiredMark}库位编码</label>
                <div className={inputContainerClass}>
                  <input 
                    type="text" 
                    name="locationCode"
                    value={formData.locationCode}
                    onChange={handleInputChange}
                    placeholder="请输入库位编码，如WH01-KQ02-005"
                    maxLength={20}
                    className={inputClass}
                  />
                  <p className="text-[10px] text-slate-400 mt-1.5 ml-1 italic font-medium">
                    仅支持字母、数字和连字符 (-)
                  </p>
                </div>
              </div>

              {/* 库位名称 */}
              <div className={rowClass}>
                <label className={labelClass}>{requiredMark}库位名称</label>
                <div className={inputContainerClass}>
                  <input 
                    type="text" 
                    name="locationName"
                    value={formData.locationName}
                    onChange={handleInputChange}
                    placeholder="请输入库位名称"
                    maxLength={50}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* 库位类别 */}
              <div className={rowClass}>
                <label className={labelClass}>{requiredMark}库位类别</label>
                <div className={`${inputContainerClass} relative`}>
                  <select 
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleInputChange}
                    className={`${inputClass} appearance-none pr-10 bg-white`}
                  >
                    <option value="">请选择库位类别</option>
                    <option value="INCOMING_AREA">来料区</option>
                    <option value="FINISHED_AREA">成品区</option>
                    <option value="PENDING_AREA">待检区</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <ChevronDownIcon className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* 库位状态 */}
              <div className={rowClass}>
                <label className={labelClass}>{requiredMark}库位状态</label>
                <div className={`${inputContainerClass} flex items-center h-10 space-x-8`}>
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="locationStatus"
                      value="ENABLE"
                      checked={formData.locationStatus === 'ENABLE'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">启用</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="radio" 
                      name="locationStatus"
                      value="DISABLE"
                      checked={formData.locationStatus === 'DISABLE'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">禁用</span>
                  </label>
                </div>
              </div>

              {/* 负责人 */}
              <div className={rowClass}>
                <label className={labelClass}>负责人</label>
                <div className={inputContainerClass}>
                  <input 
                    type="text" 
                    name="managerId"
                    value={formData.managerId}
                    onChange={handleInputChange}
                    placeholder="请输入负责人姓名"
                    maxLength={50}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* 备注信息 */}
              <div className={rowClass}>
                <label className={labelClass}>备注信息</label>
                <div className={inputContainerClass}>
                  <textarea 
                    name="remark"
                    value={formData.remark}
                    onChange={handleInputChange}
                    placeholder="请输入备注信息"
                    maxLength={200}
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                  <div className="flex justify-end mt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {formData.remark.length} / 200
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Form Footer Actions */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-end space-x-4">
              <button 
                type="button"
                onClick={() => setCurrentPage('warehouseLocation')}
                className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                返回
              </button>
              <button 
                type="button"
                onClick={handleReset}
                className="px-6 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                重置
              </button>
              <button 
                type="submit"
                className="px-10 py-2 bg-blue-600 text-white rounded-lg text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95 uppercase tracking-widest"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
