
import { 
  Lead, Customer, Supplier, Warehouse, 
  InventoryCheckProductSelection, QualityCheckRecord, 
  StockInOrder, StockOutOrder, PurchaseReturn, Quotation, 
  ExportContract, ProductionOverviewItem,
  ShippingPlanItem, OrderSettlementItem, CustomerPoolItem
} from './types';

// CRM 线索管理表头 (15列，移除“客户级别”)
export const TABLE_HEADERS = [
  "线索名称", "联系人", "尊称", "线索来源", "联系电话", "座机", "邮箱", 
  "负责人", "地址", "备注", "最近更新时间", "下次跟进时间", 
  "创建人", "创建时间", "更新时间"
];

export const LEADS_DATA: Lead[] = [
  {
    id: 1,
    线索名称: "北京科勒卫浴采购意向",
    联系人: "张经理",
    尊称: "先生",
    线索来源: "行业展会",
    联系电话: "13800001111",
    座机: "010-88889999",
    邮箱: "zhang@kohler.com",
    负责人: "林瑞敏",
    客户级别: "A级潜在客户",
    地址: "北京市朝阳区XX路1号",
    备注: "对红外线感应器有大量需求",
    最近更新时间: "2026-01-09 10:00",
    下次跟进时间: "2026-01-15 10:00",
    创建人: "林瑞敏",
    创建时间: "2026-01-01 09:00",
    更新时间: "2026-01-09 10:00"
  }
];

// 线索池表头 (13列，移除“客户级别”)
export const LEADS_POOL_HEADERS = [
  "线索名称", "联系人", "所在地区", "尊称", "线索来源", "联系电话", "意向产品", 
  "座机", "邮箱", "负责人", "地址", "备注", "最近更新时间", 
  "下次跟进时间", "创建人", "创建时间"
];

export const LEADS_POOL_MOCK_DATA: Lead[] = [
  {
    id: 101,
    线索名称: "上海摩恩洁具配件",
    联系人: "李主管",
    所在地区: "上海市",
    尊称: "女士",
    线索来源: "广告",
    联系电话: "13911112222",
    意向产品: "感应线圈",
    座机: "021-66667777",
    邮箱: "li@moen.com",
    负责人: "未分配",
    客户级别: "B级潜在客户",
    地址: "上海市浦东新区XX园区",
    备注: "寻求长期合作伙伴",
    最近更新时间: "2026-01-08 14:00",
    下次跟进时间: "--",
    创建人: "系统导入",
    创建时间: "2026-01-05 11:00",
    更新时间: "2026-01-08 14:00"
  }
];

// 客户管理表头 (19列，移除行业、部门、级别、状态、方式、锁定)
export const CUSTOMERS_TABLE_HEADERS = [
  "客户名称", "客户电话", "座机", "客户来源", "客户官网", 
  "地址", "备注", "邮箱地址", "客户编号", "团队成员",
  "最近跟进时间", "下次联系时间", "首要联系人", "是否有跟进记录",
  "客户成交状态", "最近回收时间", "负责人", "创建人", "创建时间", "更新时间"
];

export const CUSTOMERS_DATA: Customer[] = [
  {
    id: "C001",
    客户名称: "众林卫浴有限公司",
    客户电话: "13727328733",
    座机: "--",
    客户来源: "老客户介绍",
    客户官网: "www.zhonglin.com",
    客户级别: "A级客户",
    地址: "浙江省杭州市XX路",
    备注: "重点维护对象",
    邮箱地址: "info@zhonglin.com",
    客户编号: "KH2026010101",
    团队成员: "林瑞敏, 王朔",
    最近跟进时间: "2026-01-09 17:10",
    下次联系时间: "2026-01-20",
    首要联系人: "王丽",
    是否有跟进记录: "是",
    客户成交状态: "已成交",
    最近回收时间: "--",
    负责人: "林瑞敏",
    创建人: "林瑞敏",
    创建时间: "2026-01-01 10:00",
    更新时间: "2026-01-09 17:10"
  }
];

// 客户池表头 (21列，移除行业、部门、级别、状态、方式、锁定)
export const CUSTOMER_POOL_HEADERS = [
  "客户名称", "所在地区", "客户电话", "总跟进次数", "意向产品", "座机",
  "客户来源", "客户官网", "地址", "备注", "邮箱地址", "客户编号",
  "最近跟进时间", "下次联系时间", "首要联系人",
  "是否有跟进记录", "客户成交状态", "最近回收时间", "创建人", "创建时间", "更新时间"
];

export const CUSTOMER_POOL_DATA: CustomerPoolItem[] = [
  {
    ...CUSTOMERS_DATA[0],
    id: "CP001",
    总跟进次数: 5,
    意向产品: "红外传感器",
    所在地区: "浙江省"
  }
];

export const SHIPPING_PLAN_HEADERS = [
  "行号", "外销合同", "出运单号", "出运日期", "我方名称", "客户名称",
  "成交方式", "币别", "货代公司", "交货日期", "预计ETD", "预计ETA",
  "创建人代码", "创建人名称", "货物描述", "操作"
];

export const SHIPPING_PLAN_DATA: ShippingPlanItem[] = [
  {
    id: "1",
    checked: true,
    rowNo: "1",
    exportContract: "123456",
    shippingOrderNo: "1234567, 7654321",
    shippingDate: "2026-01-06",
    ourCompanyName: "汉朝",
    customerName: "秦朝",
    transactionMode: "FOB",
    currency: "老挝币",
    freightForwarder: "汉王船舶",
    deliveryDate: "2026-01-05",
    estimatedETD: "",
    estimatedETA: "",
    creatorCode: "test01",
    creatorName: "test01",
    goodsDescription: "汽车"
  }
];

export const SELECT_CONTRACT_HEADERS = [
  "#", "勾选", "外销合同号", "合同日期", "我方名称", "客户名称",
  "成交方式", "币别", "建立人代码", "建立人名称", "海关申报要"
];

export const SELECT_CONTRACT_DATA = [
  { id: "c1", no: "1", contractNo: "WSDF2508", date: "2026-01-13", ourName: "", customerName: "SSS", tradeMode: "", currency: "USD", creatorCode: "test03", creatorName: "test03", customsReq: "" },
  { id: "c2", no: "2", contractNo: "123456", date: "2026-01-05", ourName: "汉朝", customerName: "秦朝", tradeMode: "FOB", currency: "老挝币", creatorCode: "test01", creatorName: "test01", customsReq: "" }
];

export const ORDER_SETTLEMENT_HEADERS = [
  "行号", "结算单号", "结算日期", "是否结案", "客户编号", "客户名称",
  "起运港", "目的港", "结汇方式", "成交方式", "币别", "结算汇率", "运输方式",
  "交货日期", "出运金额", "收款金额", "收款CNY金额", "未收款金额", "付款总金额",
  "费用外币金额", "费用CNY金额", "费用总金额", "固定费用", "预计退税金额", 
  "理论利润率", "理论利润金额", "实际利润金额", "实际利润率", "佣金比例", "佣金金额", "操作"
];

export const ORDER_SETTLEMENT_DATA: OrderSettlementItem[] = [
  {
    id: "1",
    checked: false,
    rowNo: "1",
    settlementNo: "JS1202",
    settlementDate: "2025-12-26",
    isClosed: "否",
    customerCode: "C103",
    customerName: "HS000000Xtation Limited",
    loadPort: "Qingdao",
    destPort: "ROTTERDAM",
    paymentMode: "T/T",
    tradeMode: "EXW",
    currency: "CNY",
    exchangeRate: "1.0000",
    transportMode: "海运",
    deliveryDate: "2024-04-05",
    shippingAmount: "54,332.00",
    receivedAmount: "",
    receivedCNY: "",
    unreceivedAmount: "",
    totalPayment: "",
    foreignFee: "",
    cnyFee: "",
    totalFee: "",
    fixedFee: "",
    estimatedTaxRefund: "",
    theoreticalMargin: "",
    theoreticalProfit: "",
    actualProfit: "",
    actualMargin: "",
    commissionRate: "",
    commissionAmount: ""
  },
  {
    id: "2",
    checked: false,
    rowNo: "2",
    settlementNo: "JS1203",
    settlementDate: "2025-12-09",
    isClosed: "否",
    customerCode: "C101",
    customerName: "HS000000Xtional Inc",
    loadPort: "Qingdao",
    destPort: "ROTTERDAM",
    paymentMode: "T/T",
    tradeMode: "EXW",
    currency: "CNY",
    exchangeRate: "1.0000",
    transportMode: "火车",
    deliveryDate: "2024-04-05",
    shippingAmount: "1,558.10",
    receivedAmount: "",
    receivedCNY: "",
    unreceivedAmount: "",
    totalPayment: "",
    foreignFee: "",
    cnyFee: "",
    totalFee: "",
    fixedFee: "",
    estimatedTaxRefund: "",
    theoreticalMargin: "",
    theoreticalProfit: "",
    actualProfit: "",
    actualMargin: "",
    commissionRate: "",
    commissionAmount: ""
  },
  {
    id: "3",
    checked: false,
    rowNo: "3",
    settlementNo: "JS8007",
    settlementDate: "2025-08-29",
    isClosed: "否",
    customerCode: "C102",
    customerName: "HS000000Xtional Inc",
    loadPort: "Qingdao",
    destPort: "ROTTERDAM",
    paymentMode: "T/T",
    tradeMode: "EXW",
    currency: "CNY",
    exchangeRate: "1.0000",
    transportMode: "货车",
    deliveryDate: "2024-04-05",
    shippingAmount: "2,219.52",
    receivedAmount: "",
    receivedCNY: "",
    unreceivedAmount: "",
    totalPayment: "",
    foreignFee: "",
    cnyFee: "",
    totalFee: "",
    fixedFee: "",
    estimatedTaxRefund: "",
    theoreticalMargin: "",
    theoreticalProfit: "",
    actualProfit: "",
    actualMargin: "",
    commissionRate: "",
    commissionAmount: ""
  }
];

export const PRODUCT_STOCK_HEADERS = ["产品名称", "规格", "单位", "当前可用库存", "实际库存", "待入库", "待出库"];
export const PRODUCT_STOCK_DATA = [
  { 产品名称: "红外传感器探头", 规格: "HC-SR501", 单位: "个", 当前可用库存: "198.00", 实际库存: "208.00", 待入库: "10.00", 待出库: "20.00" }
];
export const IN_OUT_RECORDS_HEADERS = ["产品名称", "规格", "单位", "所在位置", "类别", "状态", "数量", "出入库类别", "出入库订单", "操作时间", "备注"];
export const IN_OUT_RECORDS_DATA = [
  { 产品名称: "红外传感器探头", 规格: "HC-SR501", 单位: "个", 所在位置: "电子件一号仓", 类别: "电子料", 状态: "在售", 数量: "+100", 出入库类别: "采购入库", 出入库订单: "PO2024102001", 操作时间: "2024-10-21 10:00", 备注: "" }
];
export const STOCK_CHANGE_HEADERS = ["产品名称", "初始库存", "采购入库", "生产入库", "销售退货", "销售出库", "生产出库", "采购退货", "盘点入库", "盘点出库", "剩余"];
export const STOCK_CHANGE_DATA = [
  { 产品名称: "红外传感器探头", 初始库存: "100", 采购入库: "170", 生产入库: "0", 销售退货: "0", 销售出库: "10", 生产出库: "0", 采购退货: "0", 盘点入库: "0", 盘点出库: "0", 剩余: "260" }
];
export const PURCHASE_SALE_HEADERS = ["产品名称", "需交付", "现存库存", "可用库存", "已采购未入库", "需采购"];
export const PURCHASE_SALE_DATA = [
  { 产品名称: "红外传感器探头", 需交付: "10", 现存库存: "208", 可用库存: "198", 已采购未入库: "10", 需采购: "0" }
];
export const PURCHASE_TABLE_HEADERS = ["采购名称", "来源", "订单状态", "供应商", "采购时间", "采购金额(元)", "产品总金额(元)", "其他金额(元)", "采购单编号", "付款状态", "入库状态", "审核状态"];
export const PURCHASE_DATA: any[] = [
  { 采购名称: "25121000红外感应器采购", 来源: "生产工单", 订单状态: "已下单", 供应商: "某半导体有限公司", 采购时间: "2024-10-20", "采购金额(元)": 150.00, "产品总金额(元)": 150.00, "其他金额(元)": 0.00, 采购单编号: "PO2024102001", 付款状态: "未付款", 入库状态: "未入库", 审核状态: "通过" }
];
export const SUPPLIER_LIST_TABLE_HEADERS = ["供应商名称", "供应商分类", "联系人", "手机号", "固定电话"];
export const SUPPLIER_LIST_DATA: any[] = [
  { id: "S001", 供应商名称: "深圳芯片科技有限公司", 供应商分类: "电子料", 联系人: "王经理", 手机号: "13800001111", 固定电话: "0755-88889999" }
];
export const PRODUCT_CATEGORIES = ["全部分类", "成品", "半成品", "原材料", "辅料"];
export const PRODUCT_SELECTION_TABLE_HEADERS = ["产品名称", "属性", "采购价格(元)", "商品编码", "条形码", "单位", "状态", "负责人", "创建人"];
export const PRODUCT_SELECTION_DATA: any[] = [
  { id: "P001", 产品名称: "红外传感器", "产品名称(规格)": "红外传感器(HC-SR501)", 属性: "成品", "采购价格 (元)": 15.5, 商品编码: "IR-001", 条形码: "690000000001", 单位: "个", 状态: "启用", 负责人: "张三", 创建人: "张三" }
];
export const WAREHOUSE_LIST_DATA: Warehouse[] = [
  { id: "W001", warehouseCode: "WH01", warehouseName: "一号仓库", warehouseAddress: "工业园A区", status: "启用", warehouseKeeper: "李四" }
];
export const INVENTORY_CHECK_PRODUCTS_DATA: InventoryCheckProductSelection[] = [
  { id: "P001", productName: "红外传感器", spec: "HC-SR501", unit: "个", availableStock: 200, warehouse: "一号仓库" }
];
export const PRODUCT_CATEGORIES_LIST = ["成品", "半成品", "原材料", "辅料", "外协件", "备品备件"];

// 优化后的产品管理表头
export const PRODUCT_MANAGEMENT_HEADERS = [
  "产品编码", "产品类型", "产品分类", "规格型号", "单位", "标准价格", 
  "采购价", "SN码启用", "多规格启用", "负责人", "创建人", "创建时间", "更新时间"
];

export const STOCK_IN_ORDER_HEADERS = ["单号", "库位", "入库类型", "来源", "操作人", "操作时间", "备注"];
export const STOCK_IN_ORDER_DATA: StockInOrder[] = [
  { orderCode: "RK2024102001", 所属位置: "一号仓库", source: "采购入库", sourceName: "PO2024102001", handler: "张三", stockInTime: "2024-10-20 10:00", remark: "正常入库" }
];
export const STOCK_OUT_ORDER_HEADERS = ["单号", "库位", "出库类型", "来源", "操作人", "操作时间", "备注"];
export const STOCK_OUT_ORDER_DATA: StockOutOrder[] = [];
export const QUALITY_CHECK_DATA: QualityCheckRecord[] = [
  { id: "1", check_order_no: "QC2024102001", check_type: "incoming_material", product_name: "红外传感器探头", product_model: "HC-SR501", batch_no: "B20241020", check_quantity: 1000, unqualified_quantity: 0, check_status: "approved", checker_name: "赵质检", check_time: "2024-10-20 14:00", related_order_no: "PO2024102001" }
];
export const APPROVAL_FLOW_DATA = [
  { flowCode: "AF001", flowName: "采购审批流", flowCategory: "采购类", approvalType: "条件审批", limitCondition: "金额 > 5000", approvalLevel: 2, approvalNodeCount: 2, lastModifier: "管理员", status: "启用" }
];
export const LEADS_POOL_MANAGEMENT_DATA = [
  { id: "LP001", name: "公共线索池", department: "全公司", description: "系统默认公海池", isSystem: true }
];
export const MY_APPROVALS_DATA = [
  { serialNo: 1, approvalId: "AP001", approvalType: "采购审批", approvalName: "探头采购申请", initiateTime: "2026-01-13 10:00", initiator: "张三", department: "采购部", currentNode: "财务审批", approvalStatus: "待我审批" as any, estimatedFinishTime: "2026-01-14 18:00" }
];
export const APPROVAL_RECORDS_DATA = [
  { serialNo: 1, approvalId: "AP000", approvalName: "办公用品采购", approvalType: "行政审批", approvalNo: "SP-2026-0000", initiateDept: "行政部", initiator: "李四", approvalAmount: 500, finalApprover: "王五", finalResult: "已通过", initiateTime: "2026-01-12 09:00", archiveStatus: "未归档" }
];
export const INVENTORY_CHECK_LIST_DATA = [
  { title: "2026年1月定期盘点", location: "一号仓库", auditStatus: "未发起", checkTime: "2026-01-20", checkResponsible: "李仓管", createTime: "2026-01-13 14:00" }
];
export const EXPORT_CONTRACT_HEADERS = ["行号", "订单类型", "外销合同号", "合同日期", "客户订单号", "我方名称", "客户名称", "成交方式", "币别", "交货日期", "建立人代码", "建立人名称", "外销总额", "总数量", "操作"];
export const EXPORT_CONTRACT_DATA: ExportContract[] = [
  { id: "EC001", rowNo: 1, orderType: "大货", contractNo: "123456", contractDate: "2026-01-05", customerOrderNo: "PO-TH-001", ourName: "众成贸易", customerName: "泰华贸易", tradingParty: "FOB", currency: "USD", deliveryDate: "2026-01-25", creatorCode: "admin", creatorName: "管理员", salesAmount: 85000.00, totalQuantity: 500 }
];
export const ORDER_TRACKING_HEADERS = ["中文货名", "合同数量", "备货数量", "计划数量", "出运数量", "外销合同", "国际货运单号", "我方名称", "客户名称", "交货日期", "起运港", "目的港", "运输方式"];
export const ORDER_TRACKING_DATA = [
  { 中文货名: "红外传感器", 合同数量: 1000, 备货数量: 1000, 计划数量: 500, 出运数量: 500, 外销合同: "123456", 国际货运单号: "BL-001", 我方名称: "众成贸易", 客户名称: "泰华贸易", 交货日期: "2026-01-25", 起运港: "青岛港", 目的港: "曼谷港", 运输方式: "Sea" }
];
export const FREIGHT_FORWARDER_HEADERS = ["行号", "承运商编号", "简称", "全称", "地址", "电话", "创建人", "操作"];
export const FREIGHT_FORWARDER_DATA = [
  { id: "FF001", rowNo: 1, code: "FF-001", shortName: "汉王船舶", fullName: "汉王国际货运代理有限公司", address: "青岛市XX路", phone: "0532-88889999", creator: "管理员" }
];
export const PURCHASE_RETURN_HEADERS = ["标题", "编号", "采购单", "退货金额", "审核状态", "回款状态", "出库状态", "退换货", "退货时间", "负责人", "创建时间"];
export const PURCHASE_RETURN_DATA: PurchaseReturn[] = [
  { id: "PR001", 标题: "传感器探头坏品退货", 编号: "PR-2026-001", 采购单: "PO2024102001", 退货金额: 1880.00, 审核状态: "已通过", 回款状态: "未回款", 出库状态: "未出库", 退换货: "退货", 退货时间: "2026-01-13", 负责人: "王朔", 创建时间: "2026-01-13 14:00" }
];
export const QUOTATION_HEADERS = ["报价名称", "报价单编号", "来源客户", "报价金额(元)", "产品总金额(元)", "联系人", "联系人手机", "联系人邮箱", "状态", "审核状态", "负责人", "创建人", "创建时间", "更新时间"];
export const SUPPLIER_MANAGEMENT_HEADERS = ["供应商名称", "供应商分类", "合作次数", "供应商评级", "联系人", "手机号", "固定电话", "地址", "备注", "负责人", "创建人", "创建时间", "更新时间"];
export const SUPPLIER_MANAGEMENT_DATA: Supplier[] = [
  { id: "S001", 供应商名称: "某半导体制造有限公司", 供应商分类: "电子料", 合作次数: "12", 供应商评级: "A", 联系人: "张经理", 手机号: "13812345678", 固定电话: "0755-88889999", 地址: "深圳市南山区", 备注: "长期稳定", 负责人: "王朔", 创建人: "王朔", 创建时间: "2024-10-20 09:30", 更新时间: "2024-10-21 14:20" }
];
export const PRODUCTION_OVERVIEW_DATA: ProductionOverviewItem[] = [
  { 
    productionPlanNo: "SC-JH-202601", 
    productionWorkOrderNo: "GD-2026011001", 
    productionInboundNo: "RK-2026011201", 
    productName: "感应龙头外壳", 
    productBatchNo: "B20260110", 
    productionTeam: "组装一组", 
    teamLeader: "李班组", 
    workOrderStatus: { text: "生产中", tagStyle: "blue", hoverTips: "正在进行外壳注塑" },
    plannedQty: 1000, 
    dispatchedQty: 1000, 
    inboundQty: 450, 
    productionProgressBar: { text: "100%", style: "green", value: 100 }, 
    warehousingProgressBar: { text: "45%", style: "blue", value: 45 }, 
    warningStatus: { text: "入库缺口", tagStyle: "yellow", hoverTips: "入库进度落后于计划" }, 
    overallProgress: "45%", 
    operations: ["报工"] 
  }
];
