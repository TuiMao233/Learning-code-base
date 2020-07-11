import {
  RECEIVE_CAR_INFO_ARCHIVES, RECEIVE_CAR_INFO_MASTER,
  RECEIVE_CAR_INFO_REDEEMINFO, RECEIVE_CAR_INFO_CARCERTIFICATES
} from '../mutations-types'
const state = {
  // 车辆档案
  archives: {
    pur_price: '', // 收购价
    mar_price: '', // 市场预估价
    mileage: '', // 里程
    emissions: '', // 排放量
    transfer_count: '', // 过户次数
    up_brand_location: '', // 上牌所在地
    variable_speed: '', // 变速箱类型
    up_brand_date: '', // 上牌时间
  },
  // 车主信息
  master: {
    name: '', // 车主名称
    phone: '', // 手机
    ID: '', // 身份证
    frame_num: '', // 车架号
    license_plate_num: '', // 车牌号
    engine: '', // 发动机号
    bank_num: '', // 车主银行号
    open_bank_num: '', // 开户行银行
    apply_payment_dete: '' // 申请付款时间
  },
  // 赎车款项
  redeemInfo: {
    name: '', // 名称
    bank_num: '', // 银行号
    open_bank_num: '', // 开户行银行
    price: '' // 赎车价格
  },
  // 车辆证件
  carCertificates: {
    is_green_book: false, // 绿本是否收集
    green_book_images: [], // 绿本上传图片
    contract_images: [], // 收购合同图片
    people_car_images: [], // 人车合照
    supplement: '' // 补充
  }
}
const mutations = {
  [RECEIVE_CAR_INFO_ARCHIVES]({ carInfo }, archives) { carInfo.archives = archives },
  [RECEIVE_CAR_INFO_MASTER]({ carInfo }, master) { carInfo.master = master },
  [RECEIVE_CAR_INFO_REDEEMINFO]({ carInfo }, redeemInfo) { carInfo.redeemInfo = redeemInfo },
  [RECEIVE_CAR_INFO_CARCERTIFICATES]({ carInfo }, carCertificates) { carInfo.carCertificates = carCertificates }
}
const actions = {
  // 获取车辆信息
  getCarInfo({ commit, rootState }, id) {
    // 模拟请求

  }
}
const getters = {

}

export default { namespaced: true, state, mutations, actions, getters }