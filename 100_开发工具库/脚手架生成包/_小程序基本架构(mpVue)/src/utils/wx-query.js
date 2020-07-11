// 获取标签元素节点属性, 返回该节点对应的信息对象
export const getNodeInfos = ({
  selectStr = '', // 选择器名称
  nodesRefs = [], // 获取哪些节点信息
  fieldsOptions = {}, // fields的配置
  selectorQuery = 'select', // 选择器(默认单选)
  filter = null // 过滤特定属性函数 -> (res) => (res.top)
}) => {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()[selectorQuery](selectStr)
    const nodeRefInfos = nodesRefs.reduce((total, _refName) => {
      if (_refName = 'fields') {
        return total[_refName](fieldsOptions)
      }
      return total[_refName]()
    }, query)
    nodeRefInfos.exec(function (result) {
      const nodeInfos = result.reduce((total, nodeInfo, index) => {
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
(async function () {
  const nodeInfos = await getNodeInfos({
    selectStr: '.header', // 选择器字符串
    nodesRefs: ['boundingClientRect', 'fields'], // 选择哪些节点属性
    fieldsOptions: { size: true, rect: true } // fields的配置, 默认无配置->{}
  })
  console.log(nodeInfos) // ->  {boundingClientRect:{...}, fields:{...}}
})