
import React, { useState } from 'react';
import { Warehouse, InventoryCheckProduct, InventoryCheckProductSelection } from '../types';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { PlusIcon } from '../components/icons/PlusIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { SelectWarehouseModal } from '../components/inventory-check/SelectWarehouseModal';
import { SelectInventoryProductModal } from '../components/inventory-check/SelectInventoryProductModal';

export const InventoryCheckPage: React.FC = () => {
    const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
    const [products, setProducts] = useState<InventoryCheckProduct[]>([]);
    const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    
    const handleSelectWarehouse = (warehouse: Warehouse) => {
        setSelectedWarehouse(warehouse);
        setIsWarehouseModalOpen(false);
        // Reset products if warehouse changes
        setProducts([]);
    };

    const handleAddProducts = (newProducts: InventoryCheckProductSelection[]) => {
        const productsToAdd: InventoryCheckProduct[] = newProducts
            .filter(p => !products.some(sp => sp.id === p.id))
            .map(p => ({
                id: p.id,
                productName: p.productName,
                spec: p.spec,
                unit: p.unit,
                originalStock: p.availableStock,
                actualStock: p.availableStock, // Default to original stock
                status: '待盘点',
            }));
        setProducts(prev => [...prev, ...productsToAdd]);
        setIsProductModalOpen(false);
    };

    const handleProductChange = (productId: string, field: 'actualStock' | 'snCode' | 'remarks', value: string | number) => {
        setProducts(currentProducts =>
            currentProducts.map(p => {
                if (p.id === productId) {
                    const updatedProduct = { ...p, [field]: value };
                    if(field === 'actualStock') {
                        updatedProduct.status = '已盘点';
                    }
                    return updatedProduct;
                }
                return p;
            })
        );
    };

    const removeProduct = (productId: string) => {
        setProducts(currentProducts => currentProducts.filter(p => p.id !== productId));
    };

    const openProductModal = () => {
        if (!selectedWarehouse) {
            alert('请先选择仓库。');
            return;
        }
        setIsProductModalOpen(true);
    };

    const today = new Date().toISOString().split('T')[0];
    const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition";
    const labelClass = "block text-sm font-medium text-slate-700";
    const requiredLabelClass = `${labelClass} after:content-['*'] after:ml-0.5 after:text-red-500`;

    return (
        <>
        <div className="flex-1 overflow-y-auto bg-slate-50">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    <header className="pb-4 mb-6 border-b border-slate-200">
                        <h1 className="text-xl font-bold text-slate-800">添加库存盘点</h1>
                    </header>
                    
                    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                        <h2 className="text-md font-semibold text-slate-800 border-b border-slate-200 pb-3 mb-6">基本信息</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="check-title" className={requiredLabelClass}>标题</label>
                                <input type="text" id="check-title" className={`mt-1 ${inputClass}`} defaultValue="一号塑料件仓库2026年1月盘点" />
                            </div>
                            <div>
                                <label htmlFor="check-date" className={requiredLabelClass}>盘点时间</label>
                                <input type="date" id="check-date" className={`mt-1 ${inputClass}`} defaultValue={today} />
                            </div>
                            <div>
                                <label className={requiredLabelClass}>仓库</label>
                                <button type="button" onClick={() => setIsWarehouseModalOpen(true)} className={`mt-1 ${inputClass} text-left flex justify-between items-center`}>
                                    <span className={selectedWarehouse ? 'text-slate-900' : 'text-slate-400'}>
                                        {selectedWarehouse?.warehouseName || '选择仓库'}
                                    </span>
                                    <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                                </button>
                            </div>
                            <div>
                                <label htmlFor="check-owner" className={requiredLabelClass}>盘点负责人</label>
                                <input type="text" id="check-owner" className={`mt-1 ${inputClass}`} defaultValue="大哈比(全公司)" />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="remarks" className={labelClass}>备注</label>
                                <textarea id="remarks" rows={3} className={`mt-1 ${inputClass}`}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
                            <h2 className="text-md font-semibold text-slate-800">产品信息</h2>
                            <button onClick={openProductModal} disabled={!selectedWarehouse} className="flex items-center justify-center bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm text-sm disabled:bg-slate-400 disabled:cursor-not-allowed">
                                <PlusIcon className="mr-1.5 h-4 w-4" />
                                添加
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="text-left text-slate-500 bg-slate-50">
                                    <tr>
                                        {["产品名称", "原仓库库存", "实际库存", "盘点状态", "SN码", "备注", "操作"].map(h => <th key={h} className="font-medium p-3">{h}</th>)}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {products.length === 0 ? (
                                        <tr><td colSpan={7} className="text-center py-10 text-slate-500">暂无数据</td></tr>
                                    ) : (
                                        products.map(p => (
                                            <tr key={p.id}>
                                                <td className="p-3 text-slate-800">{p.productName} ({p.spec})</td>
                                                <td className="p-3 text-slate-600">{p.originalStock}</td>
                                                <td className="p-3"><input type="number" value={p.actualStock} onChange={e => handleProductChange(p.id, 'actualStock', parseInt(e.target.value, 10))} className="w-24 border-slate-300 rounded-md shadow-sm text-sm" /></td>
                                                <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${p.actualStock !== p.originalStock ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>{p.actualStock === p.originalStock ? '正常' : '异常'}</span></td>
                                                <td className="p-3"><input type="text" onChange={e => handleProductChange(p.id, 'snCode', e.target.value)} className="w-32 border-slate-300 rounded-md shadow-sm text-sm" /></td>
                                                <td className="p-3"><input type="text" onChange={e => handleProductChange(p.id, 'remarks', e.target.value)} className="w-full border-slate-300 rounded-md shadow-sm text-sm" /></td>
                                                <td className="p-3"><button onClick={() => removeProduct(p.id)} className="text-red-500 hover:text-red-700 p-1"><TrashIcon /></button></td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                     <div className="flex justify-end items-center mt-8 pt-4 border-t border-slate-200">
                        <button className="px-5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">取消</button>
                        <button className="ml-3 px-5 py-2.5 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 shadow-sm">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <SelectWarehouseModal isOpen={isWarehouseModalOpen} onClose={() => setIsWarehouseModalOpen(false)} onSelect={handleSelectWarehouse} />
        <SelectInventoryProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} onAddProducts={handleAddProducts} selectedWarehouse={selectedWarehouse} />
        </>
    );
};
