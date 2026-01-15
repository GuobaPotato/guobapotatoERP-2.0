
import React, { useState, useMemo } from 'react';
import { Customer } from '../types';
import { CUSTOMERS_TABLE_HEADERS } from '../constants';

interface CustomersTableProps {
  customers: Customer[];
}

export const CustomersTable: React.FC<CustomersTableProps> = ({ customers }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = new Set(customers.map(c => c.id));
      setSelected(allIds);
    } else {
      setSelected(new Set());
    }
  };

  const handleSelectOne = (id: string) => {
    const newSelection = new Set(selected);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelected(newSelection);
  };

  const isAllSelected = useMemo(() => {
    return customers.length > 0 && selected.size === customers.length;
  }, [selected, customers]);
  
  const isIndeterminate = useMemo(() => {
      return selected.size > 0 && selected.size < customers.length;
  }, [selected, customers]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th scope="col" className="sticky left-0 z-20 bg-slate-100 px-4 py-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                checked={isAllSelected}
                ref={input => {
                    if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={handleSelectAll}
              />
            </th>
            {CUSTOMERS_TABLE_HEADERS.map((header, index) => (
              <th
                key={header}
                scope="col"
                className={`
                  py-3.5 px-4 text-left font-semibold text-slate-600 whitespace-nowrap
                  ${index === 0 ? 'sticky left-12 z-20 bg-slate-100 min-w-[200px] border-r border-slate-200' : ''}
                `}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {customers.map((customer, customerIndex) => (
            <tr 
              key={customer.id} 
              className={`transition-colors duration-150 ${customerIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}
            >
              <td className={`sticky left-0 z-10 px-4 py-4 whitespace-nowrap transition-colors duration-150 ${customerIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  checked={selected.has(customer.id)}
                  onChange={() => handleSelectOne(customer.id)}
                />
              </td>
              <td className={`sticky left-12 z-10 px-4 py-4 font-medium text-blue-700 hover:text-blue-800 hover:underline whitespace-nowrap min-w-[200px] border-r border-slate-200 transition-colors duration-150 ${customerIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}>
                {customer.客户名称}
              </td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.客户电话}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.座机}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.客户行业}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.客户来源}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.客户官网}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.客户状态}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.客户级别}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap truncate max-w-xs">{customer.地址}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap truncate max-w-xs">{customer.备注}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.邮箱地址}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.客户编号}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.创建方式}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.团队成员}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.最近跟进时间}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.锁定状态}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.下次联系时间}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.首要联系人}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.是否有跟进记录}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.客户成交状态}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.最近回收时间}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.负责人}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.负责人部门}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.创建人}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.创建时间}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{customer.更新时间}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
