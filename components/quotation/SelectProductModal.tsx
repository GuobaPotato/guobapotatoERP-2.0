
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { PlusIcon } from '../icons/PlusIcon';

interface SelectProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (products: any[]) => void;
}

const CATEGORIES = ["全部分类", "感应洁具出水器", "花洒喷头"];

const MOCK_PRODUCTS = [
  { "id": "P001", "产品名称(规格)": "科勒红外感应出水传感器", "属性": "", "建议售价(元)": "133.00", "商品编码": "", "条形码": "", "单位": "个", "状态": "上架", "负责人": "王晓明", "创建人": "王晓明" },
  { "id": "P002", "产品名称(规格)": "医用洗手器", "属性": "", "建议售价(元)": "88.00", "商品编码": "", "条形码": "", "单位": "个", "状态": "上架", "负责人": "王晓明", "创建人": "王晓明" },
  { "id": "P003", "产品名称(规格)": "红外感应烘干机", "属性": "", "建议售价(元)": "124.00", "商品编码": "", "条形码": "", "单位": "个", "状态": "上架", "负责人": "王晓明", "创建人": "王晓明" },
  { "id": "P004", "产品名称(规格)": "大便器冲水", "属性": "", "建议售价(元)": "12.00", "商品编码": "C011", "条形码": "", "单位": "个", "状态": "上架", "负责人": "王晓明", "创建人": "王晓明" },
];

export const SelectProductModal: React.FC<SelectProductModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [show, setShow] = useState(false);
  const [activeCategory, setActiveCategory] = useState('全部分类');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timer = setTimeout(() => {
        setShow(false);
        setSelectedIds(new Set());
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleConfirm = () => {
    const selectedList = MOCK_PRODUCTS.filter(p => selectedIds.has(p.id));
    onSelect(selectedList);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog" 
      aria-modal="true"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">选择产品</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-full p-1.5 transition-colors hover:bg-slate-100">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* 左侧分类 */}
          <aside className="w-48 border-r border-slate-200 bg-slate-50/50 flex flex-col">
            <div className="p-4 border-b border-slate-200 bg-white">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">产品分类</h3>
            </div>
            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${activeCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </aside>

          {/* 右侧主区 */}
          <main className="flex-1 flex flex-col min-w-0">
            {/* 搜索栏 */}
            <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-4">
              <div className="relative flex-1 max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="搜索产品名称" 
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 shadow-sm"
                />
              </div>
              <div className="relative flex-1 max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="搜索产品编码" 
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg bg-white text-xs placeholder-slate-400 focus:ring-1 focus:ring-blue-500 shadow-sm"
                />
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-sm active:scale-95">
                <PlusIcon className="h-3.5 w-3.5 mr-1.5" />
                添加
              </button>
            </div>

            {/* 表格区 */}
            <div className="flex-1 overflow-auto p-4 custom-scrollbar bg-slate-50/20">
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                <table className="min-w-full divide-y divide-slate-200 text-xs">
                  <thead className="bg-slate-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-left w-10">
                        <input type="checkbox" className="h-3.5 w-3.5 rounded border-slate-300" />
                      </th>
                      {[
                        "产品名称(规格)", "属性", "建议售价(元)", "商品编码", 
                        "条形码", "单位", "状态", "负责人", "创建人"
                      ].map(h => (
                        <th key={h} className="px-4 py-3 text-left font-black text-slate-500 uppercase tracking-widest text-[10px] whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_PRODUCTS.map((p) => (
                      <tr 
                        key={p.id} 
                        className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${selectedIds.has(p.id) ? 'bg-blue-50/60' : ''}`}
                        onClick={() => toggleSelect(p.id)}
                      >
                        <td className="px-4 py-3 text-center">
                          <input 
                            type="checkbox" 
                            className="h-3.5 w-3.5 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                            checked={selectedIds.has(p.id)}
                            onChange={() => toggleSelect(p.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap">{p["产品名称(规格)"]}</td>
                        <td className="px-4 py-3 text-slate-400 italic">{p.属性 || "--"}</td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-800">¥{p["建议售价(元)"]}</td>
                        <td className="px-4 py-3 text-slate-500 font-mono">{p.商品编码 || "--"}</td>
                        <td className="px-4 py-3 text-slate-500 font-mono">{p.条形码 || "--"}</td>
                        <td className="px-4 py-3 text-slate-600">
                          <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-500">{p.单位}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-black uppercase tracking-tighter border border-emerald-100">{p.状态}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 font-medium">{p.负责人}</td>
                        <td className="px-4 py-3 text-slate-400 italic">{p.创建人}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 已选统计 & 分页 */}
            <div className="px-6 py-3 border-t border-slate-200 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-xs font-black text-slate-700 uppercase tracking-widest">
                已选产品 <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">({selectedIds.size})</span>：
              </div>
              
              <div className="flex items-center space-x-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center space-x-3">
                  <span>共 <span className="text-slate-800">9</span> 条</span>
                  <select className="bg-transparent border-b border-slate-200 focus:outline-none py-0.5">
                    <option>20条/页</option>
                  </select>
                </div>
                <div className="flex items-center space-x-1.5">
                  <button disabled className="px-1.5 py-0.5 border border-slate-200 rounded bg-slate-50 text-slate-300">上一页</button>
                  <span className="px-2 py-0.5 bg-blue-600 text-white rounded shadow-sm">1</span>
                  <button disabled className="px-1.5 py-0.5 border border-slate-200 rounded bg-slate-50 text-slate-300">下一页</button>
                  <div className="flex items-center space-x-1 ml-2">
                    <span>前往</span>
                    <input type="text" className="w-7 h-5 border border-slate-200 rounded text-center focus:ring-1 focus:ring-blue-500 outline-none text-[9px]" defaultValue="1" />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* 操作按钮区 */}
        <div className="flex justify-end items-center gap-3 p-5 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose} 
            className="px-8 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            取消
          </button>
          <button 
            onClick={handleConfirm}
            disabled={selectedIds.size === 0}
            className={`px-10 py-2 rounded-xl text-xs font-black transition-all shadow-lg active:scale-95 uppercase tracking-widest ${selectedIds.size > 0 ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            确定选择
          </button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};
