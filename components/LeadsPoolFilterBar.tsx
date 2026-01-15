
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { SearchIcon } from './icons/SearchIcon';
import { FilterIcon } from './icons/FilterIcon';

export const LeadsPoolFilterBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('公共线索池');
  const options = ['公共线索池', '部门线索池'];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 md:px-6 md:py-4 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 bg-slate-50/50 border-b border-slate-200">
      <div ref={dropdownRef} className="relative w-full md:w-auto">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full md:w-56 flex items-center justify-between text-left bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selectedOption}</span>
          <ChevronDownIcon className={`ml-2 text-slate-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div
            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-slate-200"
            role="listbox"
          >
            <ul className="py-1">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="text-slate-900 cursor-pointer select-none relative py-2 pl-4 pr-4 hover:bg-blue-50"
                  role="option"
                  aria-selected={option === selectedOption}
                >
                  <span className={`font-normal block truncate ${option === selectedOption ? 'font-semibold text-blue-600' : 'font-normal'}`}>
                    {option}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="relative w-full md:flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="搜索线索名称或手机号"
          className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition shadow-sm"
        />
      </div>
      <div className="w-full md:w-auto">
         <button className="w-full md:w-auto flex items-center justify-center bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-200 shadow-sm">
            <FilterIcon className="mr-2 text-slate-500"/>
            高级筛选
          </button>
      </div>
    </div>
  );
};
