
import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '../icons/XMarkIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { SELECT_CONTRACT_DATA, SELECT_CONTRACT_HEADERS } from '../../constants';

interface SelectExportContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (contractNo: string) => void;
}

export const SelectExportContractModal: React.FC<SelectExportContractModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [show, setShow] = useState(false);
  const [includeCalled, setIncludeCalled] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !show) return null;

  const handleConfirm = () => {
    const selected = SELECT_CONTRACT_DATA.find(d => d.id === selectedId);
    if (selected) {
      onSelect(selected.contractNo);
    }
    onClose();
  };

  const inputClass = "block w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs focus:outline-none focus:border-blue-500 transition-all";
  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1";

  return (
    <div className={`fixed inset-0 z-[110] flex justify-center items-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-2xl w-full max-w-6xl flex flex-col transition-all duration-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{ height: '80vh' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50/50 rounded-t-xl">
          <h2 className="text-lg font-black text-slate-800 tracking-tight">选择外销合同</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Filter Area */}
        <div className="p-4 bg-white border-b border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className={labelClass}>外销合同号</label>
            <input type="text" className={inputClass} placeholder="输入合同号..." />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>合同日期起 至 合同日期终</label>
            <div className="flex items-center space-x-2">
              <input type="date" className={inputClass} />
              <span className="text-slate-300">-</span>
              <input type="date" className={inputClass} />
            </div>
          </div>
          <div className="flex items-center space-x-3 pb-0.5">
            <button className="px-6 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition-all shadow-sm">查找</button>
            <div className="flex items-center space-x-2 ml-4">
               <span className="text-[10px] font-bold text-slate-500">含已调取</span>
               <button 
                onClick={() => setIncludeCalled(!includeCalled)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${includeCalled ? 'bg-blue-600' : 'bg-slate-200'}`}
               >
                 <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${includeCalled ? 'translate-x-5' : 'translate-x-1'}`} />
               </button>
               <span className="text-[10px] text-slate-400">({includeCalled ? '当前开启' : '当前关闭'})</span>
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
          <div className="border border-slate-200 rounded-lg overflow-hidden h-full flex flex-col bg-white shadow-sm">
            <div className="overflow-x-auto flex-1">
              <table className="min-w-full divide-y divide-slate-100 text-[11px]">
                <thead className="bg-slate-50 sticky top-0 z-10 font-black text-slate-500 uppercase tracking-tighter">
                  <tr>
                    {SELECT_CONTRACT_HEADERS.map((h, i) => (
                      <th key={i} className="px-3 py-3 text-left border-b border-slate-200 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SELECT_CONTRACT_DATA.map((row) => (
                    <tr 
                      key={row.id} 
                      className={`hover:bg-blue-50/40 transition-colors cursor-pointer ${selectedId === row.id ? 'bg-blue-50/60' : ''}`}
                      onClick={() => setSelectedId(row.id)}
                    >
                      <td className="px-3 py-4 text-slate-400 font-mono">{row.no}</td>
                      <td className="px-3 py-4 text-center">
                        <input 
                          type="radio" 
                          name="contract-select" 
                          className="h-3.5 w-3.5 text-blue-600 rounded-full border-slate-300 focus:ring-blue-500" 
                          checked={selectedId === row.id}
                          onChange={() => setSelectedId(row.id)}
                        />
                      </td>
                      <td className="px-3 py-4 font-bold text-slate-900 whitespace-nowrap">{row.contractNo}</td>
                      <td className="px-3 py-4 text-slate-500 font-mono whitespace-nowrap">{row.date}</td>
                      <td className="px-3 py-4 text-slate-700 whitespace-nowrap">{row.ourName || '--'}</td>
                      <td className="px-3 py-4 text-slate-700 whitespace-nowrap">{row.customerName}</td>
                      <td className="px-3 py-4 text-center">
                        <span className="px-1.5 py-0.5 bg-slate-100 rounded font-bold text-slate-600">{row.tradeMode || '--'}</span>
                      </td>
                      <td className="px-3 py-4 text-slate-800 font-bold">{row.currency}</td>
                      <td className="px-3 py-4 text-slate-400 font-mono">{row.creatorCode}</td>
                      <td className="px-3 py-4 text-slate-600">{row.creatorName}</td>
                      <td className="px-3 py-4 text-slate-400 italic truncate max-w-[100px]">{row.customsReq || '--'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Info */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center space-x-4">
                <span>共 <span className="text-slate-800">334</span> 条</span>
                <span>50条/页</span>
              </div>
              <div className="flex items-center space-x-1">
                <button disabled className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-300">{'<'}</button>
                {[1, 2, 3, 4, 5, 6, 7].map(p => (
                  <button key={p} className={`px-2.5 py-1 rounded transition-all ${p === 1 ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-white hover:border-slate-200'}`}>{p}</button>
                ))}
                <button className="px-2 py-1 border border-slate-200 rounded bg-white text-slate-600 hover:bg-slate-50">{'>'}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-3 p-4 border-t border-slate-200 bg-white rounded-b-xl">
          <button onClick={onClose} className="px-8 py-2 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all">
            取消
          </button>
          <button 
            disabled={!selectedId}
            onClick={handleConfirm}
            className={`px-10 py-2 rounded text-xs font-black transition-all shadow-lg active:scale-95 uppercase tracking-widest ${selectedId ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            确定
          </button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};
