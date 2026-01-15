
import React, { useState, useMemo } from 'react';
import { Lead } from '../types';
import { TABLE_HEADERS } from '../constants';

interface LeadsTableProps {
  leads: Lead[];
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads }) => {
  const [selectedLeads, setSelectedLeads] = useState<Set<number>>(new Set());

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allLeadIds = new Set(leads.map(lead => lead.id));
      setSelectedLeads(allLeadIds);
    } else {
      setSelectedLeads(new Set());
    }
  };

  const handleSelectOne = (leadId: number) => {
    const newSelection = new Set(selectedLeads);
    if (newSelection.has(leadId)) {
      newSelection.delete(leadId);
    } else {
      newSelection.add(leadId);
    }
    setSelectedLeads(newSelection);
  };

  const isAllSelected = useMemo(() => {
    return leads.length > 0 && selectedLeads.size === leads.length;
  }, [selectedLeads, leads]);
  
  const isIndeterminate = useMemo(() => {
      return selectedLeads.size > 0 && selectedLeads.size < leads.length;
  }, [selectedLeads, leads]);

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
            {TABLE_HEADERS.map((header, index) => (
              <th
                key={header}
                scope="col"
                className={`
                  py-3.5 px-4 text-left font-semibold text-slate-600 whitespace-nowrap
                  ${index === 0 ? 'sticky left-12 z-20 bg-slate-100 min-w-[250px] border-r border-slate-200' : ''}
                `}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {leads.map((lead, leadIndex) => (
            <tr 
              key={lead.id} 
              className={`transition-colors duration-150 ${leadIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}
            >
              <td className={`sticky left-0 z-10 px-4 py-4 whitespace-nowrap transition-colors duration-150 ${leadIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedLeads.has(lead.id)}
                  onChange={() => handleSelectOne(lead.id)}
                />
              </td>
              <td className={`sticky left-12 z-10 px-4 py-4 font-medium text-blue-700 hover:text-blue-800 hover:underline whitespace-nowrap min-w-[250px] border-r border-slate-200 transition-colors duration-150 ${leadIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50`}>
                {lead.线索名称}
              </td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{lead.联系人}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{lead.尊称}</td>
              <td className="px-4 py-4 border-b border-slate-50">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">{lead.线索来源}</span>
              </td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{lead.联系电话}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{lead.座机}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{lead.邮箱}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{lead.负责人}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap truncate max-w-xs">{lead.地址}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap truncate max-w-xs">{lead.备注}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{lead.最近更新时间}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{lead.下次跟进时间}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{lead.创建人}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{lead.创建时间}</td>
              <td className="px-4 py-4 text-slate-600 whitespace-nowrap">{lead.更新时间}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
