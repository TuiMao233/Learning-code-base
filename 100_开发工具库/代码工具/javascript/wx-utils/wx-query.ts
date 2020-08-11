/*
 * @Author: 毛先生
 * @Date: 2020-08-01 15:59:15
 * @LastEditTime: 2020-08-06 11:32:00
 * @LastEditors: 毛先生
 * @Description: 
 * @傻瓜都能写出计算机能理解的程序。优秀的程序员写出的是人类能读懂的代码。
 */
// 获取标签元素节点属性, 返回该节点对应的信息对象
type nodesRefs = keyof {
  boundingClientRect: string;
  context: string;
  fields: string;
  node: string;
  scrollOffset: string;
};
interface ENodeInfos {
  selectStr: string;
  nodesRefs: nodesRefs[];
  fieldsOptions?: {
    id?: boolean
    dataset?: boolean
    mark?: boolean
    rect?: boolean
    size?: boolean
    scrollOffset?: boolean
    computedStyle?: Array<any>
    context?: boolean
    node?: boolean
  };
  selectorQuery?: keyof {
    select: string
    selectAll: string
  };
  filter?: null | Function;
}
interface EReturnInfo {
  boundingClientRect?: Record<string, any>;
  context?: Record<string, any>;
  fields?: Record<string, any>;
  node?: Record<string, any>;
  scrollOffset?: Record<string, any>;
}
export const getNodeInfos = ({
  selectStr = '', // 选择器名称
  nodesRefs = [], // 获取哪些节点信息
  fieldsOptions = {}, // fields的配置
  selectorQuery = 'select', // 选择器(默认单选)
  filter = null // 过滤特定属性函数 -> (res) => (res.top)
}: ENodeInfos): Promise<EReturnInfo> => {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()[selectorQuery](selectStr)
    const nodeRefInfos = nodesRefs.reduce((total: any, _refName) => {
      if (_refName == 'fields') {
        return total[_refName](fieldsOptions)
      }
      return total[_refName]()
    }, query)
    nodeRefInfos.exec(function (result: any) {
      const nodeInfos = result.reduce((total: any, nodeInfo: any, index: any) => {
        total[nodesRefs[index]] = nodeInfo
        return total
      }, {})
      if (selectorQuery === 'select' && typeof filter === 'function') {
        return resolve(filter(nodeInfos.fields))
      }
      if (selectorQuery === 'selectAll' && typeof filter === 'function') {
        return resolve(nodeInfos.fields.map(filter))
      }
      return resolve(nodeInfos.fields)
    })
  })
}

// 使用案例：
/**
 * @param {string} selectStr 选择器名称
 * @param {array} nodesRefs 获取哪些节点(NodesRef)信息, 支持所有微信节点信息的获取
 * @param {object} fieldsOptions 对fields(NodesRef)节点信息的配置，默认为空对象
 * @param {Function} filter 可选项, 对最终结果的筛选 (res) => (res.top)
 */
const nodeInfos = await getNodeInfos({
  selectStr: '.header', // 选择器字符串
  nodesRefs: ['boundingClientRect', 'fields'], // 选择哪些节点属性
  fieldsOptions: { size: true, rect: true } // fields的配置, 默认无配置->{}
})
console.log(nodeInfos) // ->  {boundingClientRect:{...}, fields:{...}}