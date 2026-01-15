
import React from 'react';
import { Page } from '../App';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PhotoIcon } from '../components/icons/PhotoIcon';
import { PaperClipIcon } from '../components/icons/PaperClipIcon';

interface AddProductPageProps {
  setCurrentPage: (page: Page) => void;
}

export const AddProductPage: React.FC<AddProductPageProps> = ({ setCurrentPage }) => {
  const inputClass = "w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all";
  const labelClass = "block text-sm font-bold text-slate-700 mb-1.5";
  const groupTitleClass = "text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 after:content-[''] after:h-[1px] after:flex-1 after:bg-slate-100";
  const requiredMark = <span className="text-rose-500 mr-1">*</span>;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col h-full font-sans">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentPage('productManagement')}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">新增产品</h1>
        </div>
      </div>

      <div className="flex-1 p-8 space-y-8 max-w-7xl mx-auto w-full pb-32">
        {/* 顶部说明区 */}
        <section className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <PhotoIcon className="w-32 h-32" />
          </div>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="p-1.5 bg-white/20 rounded-lg">ℹ️</span>
            产品信息说明
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-2 opacity-90 text-sm font-medium">
              <li>1. 生产单位：生产计算时取用的单位</li>
              <li>2. 存储单位：销售、采购、库存计算时取用的单位（销售单位=采购单位=仓储单位）</li>
              <li>3. 生产单位与仓储单位的转换，可按需自定义</li>
            </ul>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
              <span className="text-xs font-black uppercase tracking-tighter block mb-1 opacity-60">注意事项</span>
              <p className="text-xs leading-relaxed">
                如果采用非预设的产品属性，需要更新本表单隐藏字段「产品编码标识号」字段的公式，否则将会影响后续功能
              </p>
            </div>
          </div>
        </section>

        {/* 表单区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* 左侧表单区 */}
          <div className="space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            
            {/* 产品编码 */}
            <div>
              <h3 className={groupTitleClass}>产品编码</h3>
              <div className="relative">
                <input type="text" disabled className={`${inputClass} bg-slate-100 text-slate-400 italic font-medium`} placeholder="自动生成无需填写" />
              </div>
            </div>

            {/* 必填字段组1 */}
            <div>
              <h3 className={groupTitleClass}>基础信息 - 1</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>{requiredMark}产品属性</label>
                  <div className="relative">
                    <select className={`${inputClass} appearance-none pr-10 font-bold text-blue-600`}>
                      <option>成品</option>
                      <option>半成品</option>
                      <option>组装件</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{requiredMark}规格型号</label>
                  <input type="text" className={inputClass} defaultValue="A006" />
                </div>
                <div>
                  <label className={labelClass}>{requiredMark}生产单位</label>
                  <div className="relative">
                    <select className={`${inputClass} appearance-none pr-10`}>
                      <option>套</option>
                      <option>件</option>
                      <option>只</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>成本单价/元</label>
                  <input type="text" className={`${inputClass} font-mono`} defaultValue="500.00" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>增值税税率%</label>
                  <div className="relative">
                    <input type="text" className={`${inputClass} font-mono`} defaultValue="13" />
                    <span className="absolute right-3 top-2.5 text-slate-400 font-bold">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 附件区1 */}
            <div>
              <h3 className={groupTitleClass}>产品图片</h3>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all group cursor-pointer">
                <PhotoIcon className="h-12 w-12 text-slate-300 mx-auto mb-3 group-hover:text-blue-500 transition-colors" />
                <p className="text-sm font-bold text-slate-600">选择、拖拽或单击后粘贴图片</p>
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-black">单张 20MB 以内</p>
              </div>
            </div>

            {/* 权限与获取方式 */}
            <div>
              <h3 className={groupTitleClass}>权限与获取方式</h3>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>产品权限</label>
                  <div className="flex items-center gap-6 mt-2">
                    {["销售", "仅内部", "技术研发"].map(opt => (
                      <label key={opt} className="flex items-center group cursor-pointer">
                        <input type="radio" name="perm" defaultChecked={opt === '销售'} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm font-medium text-slate-600 group-hover:text-slate-900">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-[10px] text-blue-500 mt-1.5 italic">* 用于销售订单选择 可销售产品</p>
                </div>
                <div>
                  <label className={labelClass}>获取方式</label>
                  <div className="flex items-center gap-6 mt-2">
                    {["生产", "采购"].map(opt => (
                      <label key={opt} className="flex items-center group cursor-pointer">
                        <input type="radio" name="method" defaultChecked={opt === '采购'} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm font-medium text-slate-600 group-hover:text-slate-900">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 规格参数（左侧） */}
            <div>
              <h3 className={groupTitleClass}>物理参数 - L</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>直径/mm</label>
                  <input type="text" className={inputClass} placeholder="输入直径数值" />
                </div>
                <div>
                  <label className={labelClass}>颜色</label>
                  <input type="text" className={inputClass} placeholder="输入颜色描述" />
                </div>
              </div>
            </div>
          </div>

          {/* 右侧表单区 */}
          <div className="space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            
            {/* 必填字段组2 */}
            <div>
              <h3 className={groupTitleClass}>基础信息 - 2</h3>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>{requiredMark}产品类型</label>
                  <div className="relative">
                    <select className={`${inputClass} appearance-none pr-10`}>
                      <option>智能水龙头</option>
                      <option>红外感应器</option>
                      <option>温控阀门</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{requiredMark}产品名称</label>
                  <input type="text" className={`${inputClass} font-bold`} defaultValue="智能水龙头A006" />
                </div>
                <div>
                  <label className={labelClass}>{requiredMark}仓储单位</label>
                  <div className="relative">
                    <select className={`${inputClass} appearance-none pr-10 font-medium`}>
                      <option>套</option>
                      <option>件</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>销售单价(含税)/元</label>
                    <input type="text" className={`${inputClass} font-mono font-bold text-blue-600`} defaultValue="900.00" />
                  </div>
                  <div>
                    <label className={labelClass}>销售单价(不含税)/元</label>
                    <input type="text" className={`${inputClass} font-mono text-slate-500`} defaultValue="796.46" />
                  </div>
                </div>
              </div>
            </div>

            {/* 附件区2 */}
            <div>
              <h3 className={groupTitleClass}>技术资料</h3>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-blue-50/50 transition-all group cursor-pointer">
                <PaperClipIcon className="h-12 w-12 text-slate-300 mx-auto mb-3 group-hover:text-indigo-500 transition-colors" />
                <p className="text-sm font-bold text-slate-600">产品技术附件上传</p>
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-black">支持 PDF, ZIP, DOCX | 20MB 以内</p>
              </div>
            </div>

            {/* 规格参数（右侧） */}
            <div>
              <h3 className={groupTitleClass}>物理参数 - R</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>长度规格/m</label>
                  <input type="text" className={inputClass} placeholder="输入长度数值" />
                </div>
                <div>
                  <label className={labelClass}>重量/kg</label>
                  <input type="text" className={inputClass} placeholder="输入重量数值" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 底部操作区 */}
      <div className="fixed bottom-0 right-0 left-64 bg-white/80 backdrop-blur-md border-t border-slate-200 px-8 py-4 flex justify-end gap-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setCurrentPage('productManagement')}
          className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all active:scale-95"
        >
          保存草稿
        </button>
        <button 
          onClick={() => {
            alert('产品已提交保存');
            setCurrentPage('productManagement');
          }}
          className="px-12 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 uppercase tracking-widest"
        >
          提交产品
        </button>
      </div>
    </div>
  );
};
