
import React from 'react';
import { SearchIcon } from '../icons/SearchIcon';

const HEADERS = [
  "沟通类型",
  "内容",
  "相关模块",
  "名称",
  "创建时间",
  "创建人",
  "来源",
  "下次联系时间"
];

export const CommunicationRecordsTable: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <table className="min-w-full divide-y divide-slate-200 text-sm border-separate border-spacing-0">
        <thead className="bg-slate-50 sticky top-0 z-10">
          <tr>
            {HEADERS.map((header) => (
              <th
                key={header}
                scope="col"
                className="py-4 px-6 text-left font-black text-slate-600 whitespace-nowrap border-b border-slate-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {/* 这里目前显示暂无数据 */}
          <tr>
            <td colSpan={HEADERS.length} className="py-24">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                  <SearchIcon className="h-8 w-8 text-slate-200" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">暂无数据</p>
                  <p className="text-xs text-slate-300 mt-1">请尝试调整筛选条件或添加新的记录</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
