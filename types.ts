
export interface Supplier {
  id: string;
  供应商名称: string;
  供应商分类: string;
  合作次数?: string;
  供应商评级?: string;
  联系人: string;
  手机号: string;
  固定电话: string;
  地址: string;
  备注: string;
  负责人: string;
  创建人: string;
  创建时间: string;
  更新时间: string;
}

export interface Lead {
  id: number;
  线索名称: string;
  联系人: string;
  尊称: string;
  线索来源: string;
  意向产品?: string;
  所在地区?: string;
  联系电话: string;
  座机: string;
  邮箱: string;
  负责人: string;
  客户级别: string; 
  地址: string;
  备注: string;
  最近更新时间: string;
  下次跟进时间: string;
  创建人: string;
  创建时间: string;
  更新时间: string;
}

export interface Customer {
  id: string;
  客户名称: string;
  客户电话: string;
  座机: string;
  客户来源: string;
  客户官网: string;
  客户级别: string;
  地址: string;
  备注: string;
  邮箱地址: string;
  客户编号: string;
  团队成员: string;
  最近跟进时间: string;
  下次联系时间: string;
  首要联系人: string;
  是否有跟进记录: string;
  客户成交状态: string;
  最近回收时间: string;
  负责人: string;
  创建人: string;
  创建时间: string;
  更新时间: string;
}

export interface Warehouse {
  id: string;
  warehouseCode: string;
  warehouseName: string;
  warehouseAddress: string;
  status: '启用' | '禁用';
  warehouseKeeper: string;
}

export interface ShippingPlanItem {
  id: string;
  checked: boolean;
  rowNo: string;
  exportContract: string;
  shippingOrderNo: string;
  shippingDate: string;
  ourCompanyName: string;
  customerName: string;
  transactionMode: string;
  currency: string;
  freightForwarder: string;
  deliveryDate: string;
  estimatedETD: string;
  estimatedETA: string;
  creatorCode: string;
  creatorName: string;
  goodsDescription: string;
}

export interface OrderSettlementItem {
  id: string;
  checked: boolean;
  rowNo: string;
  settlementNo: string;
  settlementDate: string;
  isClosed: string;
  customerCode: string;
  customerName: string;
  loadPort: string;
  destPort: string;
  paymentMode: string;
  tradeMode: string;
  currency: string;
  exchangeRate: string;
  transportMode: string;
  deliveryDate: string;
  shippingAmount: string;
  receivedAmount: string;
  receivedCNY: string;
  unreceivedAmount: string;
  totalPayment: string;
  foreignFee: string;
  cnyFee: string;
  totalFee: string;
  fixedFee: string;
  estimatedTaxRefund: string;
  theoreticalMargin: string;
  theoreticalProfit: string;
  actualProfit: string;
  actualMargin: string;
  commissionRate: string;
  commissionAmount: string;
}

export interface StockInOrder {
  orderCode: string;
  所属位置: string;
  source: string;
  sourceName: string;
  handler: string;
  stockInTime: string;
  remark: string;
}

export interface StockOutOrder {
  orderCode: string;
  所属位置: string;
  source: string;
  sourceName: string;
  handler: string;
  stockOutTime: string;
  remark: string;
}

export type CheckType = 'incoming_material' | 'process' | 'finished_product' | 'delivery';
export type CheckStatus = 'pending' | 'checking' | 'approved' | 'rejected' | 'invalid';

export interface QualityCheckRecord {
  id: string;
  check_order_no: string;
  check_type: CheckType;
  product_name: string;
  product_model: string;
  batch_no: string;
  check_quantity: number;
  unqualified_quantity: number;
  check_status: CheckStatus;
  checker_name: string;
  check_time: string;
  related_order_no: string;
}

export interface ExportContract {
  id: string;
  rowNo: number;
  orderType: string;
  contractNo: string;
  contractDate: string;
  customerOrderNo?: string;
  ourName: string;
  customerName: string;
  tradingParty: string;
  currency: string;
  deliveryDate: string;
  creatorCode: string;
  creatorName: string;
  salesAmount: number;
  totalQuantity: number;
}

export interface ProductionOverviewItem {
  productionPlanNo: string;
  productionWorkOrderNo: string;
  productionInboundNo: string;
  productName: string;
  productBatchNo: string;
  productionTeam: string;
  teamLeader: string;
  workOrderStatus: {
    text: string;
    tagStyle: string;
    hoverTips: string;
  };
  plannedQty: number;
  dispatchedQty: number;
  inboundQty: number;
  productionProgressBar: {
    text: string;
    style: string;
    value: number;
  };
  warehousingProgressBar: {
    text: string;
    style: string;
    value: number;
  };
  warningStatus: {
    text: string;
    tagStyle: string;
    hoverTips: string;
  };
  overallProgress: string;
  operations: string[];
}

export interface PurchaseOrder {
  采购单编号: string;
  采购名称: string;
  来源: string;
  订单状态: string;
  供应商: string;
  采购时间: string;
  "采购金额(元)": number;
  "产品总金额(元)": number;
  "其他金额(元)": number;
  付款状态: string;
  入库状态: string;
  审核状态: string;
}

export interface CustomerPoolItem extends Customer {
  总跟进次数: number;
  意向产品: string;
  所在地区: string;
}

export interface PurchaseReturn {
  id: string;
  标题: string;
  编号: string;
  采购单: string;
  退货金额: number;
  审核状态: string;
  回款状态: string;
  出库状态: string;
  退换货: string;
  退货时间: string;
  负责人: string;
  创建时间: string;
}

export interface Quotation {
  id: string;
  报价名称: string;
  报价单编号: string;
  来源客户: string;
  "报价金额(元)": number;
  "产品总金额(元)": number;
  联系人: string;
  联系人手机: string;
  联系人邮箱: string;
  状态: string;
  审核状态: string;
  负责人: string;
  创建人: string;
  创建时间: string;
  更新时间: string;
}

export interface InventoryCheckProductSelection {
  id: string;
  productName: string;
  spec: string;
  unit: string;
  availableStock: number;
  warehouse: string;
}

export interface ProductStock {
  产品名称: string;
  规格: string;
  单位: string;
  当前可用库存: string;
  实际库存: string;
  待入库: string;
  待出库: string;
}

export interface InOutRecord {
  产品名称: string;
  规格: string;
  单位: string;
  数量: string;
  出入库类别: string;
  出入库订单: string;
  操作时间: string;
  备注: string;
  所在位置: string;
  类别: string;
  状态: string;
}

export interface StockChange {
  产品名称: string;
  初始库存: string;
  采购入库: string;
  生产入库: string;
  销售出库: string;
  生产出库: string;
  剩余: string;
  销售退货: string;
  采购退货: string;
  盘点入库: string;
  盘点出库: string;
}

export interface PurchaseSaleComparison {
  产品名称: string;
  需交付: string;
  现存库存: string;
  可用库存: string;
  已采购未入库: string;
  需采购: string;
}

export interface InventoryCheckProduct {
  id: string;
  productName: string;
  spec: string;
  unit: string;
  originalStock: number;
  actualStock: number;
  status: string;
  snCode?: string;
  remarks?: string;
}

export type FlowCategory = '全部' | '采购类' | '仓储类' | '销售类' | '人事类' | '财务类';
export type FlowStatus = '启用' | '停用' | '全部';
export type ApprovalStatus = '待我审批' | '已驳回' | '已撤销' | '已完成' | '审批中' | '全部';

// 已优化产品接口
export interface Product {
  id: string;
  产品类型: string; // 原“产品属性”
  产品分类: string; // 原“产品类型”
  规格型号: string;
  单位: string;
  标准价格?: number;
  采购价?: number;
  "采购价格 (元)"?: number;
  SN码启用?: string;
  多规格启用?: string;
  负责人?: string;
  负责人部门?: string;
  创建人?: string;
  创建时间?: string;
  更新时间?: string;
  商品编码?: string;
  属性?: string; // 兼容旧代码
  条形码?: string;
  状态?: string;
}

export interface PurchaseProduct extends Product {
  quantity: number;
  discount: number;
}

export interface WarehouseStock {
  产品名称: string;
  [key: string]: any;
}
