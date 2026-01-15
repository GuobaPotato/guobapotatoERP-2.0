
import React from 'react';
import { PRODUCT_CATEGORIES_LIST } from '../../constants';
import { Cog6ToothIcon } from '../icons/Cog6ToothIcon';

interface ProductCategorySidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const ProductCategorySidebar: React.FC<ProductCategorySidebarProps> = ({ activeCategory, setActiveCategory }) => {
  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col flex-shrink-0">
      <div className="p-4 flex justify-between items-center border-b border-slate-200 bg-white">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight">产品分类</h2>
        <button className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center">
            <Cog6ToothIcon className="h-3.5 w-3.5 mr-1" />
            设置分类
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {PRODUCT_CATEGORIES_LIST.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150
              ${activeCategory === category 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
            `}
          >
            {category}
          </button>
        ))}
      </nav>
    </aside>
  );
};
