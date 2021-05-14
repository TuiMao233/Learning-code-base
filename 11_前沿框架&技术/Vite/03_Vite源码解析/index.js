const specList = [
  {
    "id": 245,
    "title": "颜色1",
    "items": [
      {
        "id": 387,
        "title": "黄1"
      },
      {
        "id": 386,
        "title": "红1"
      },
      {
        "id": 380,
        "title": "小"
      },
    ]
  },
  {
    "id": 246,
    "title": "大小",
    "items": [
      {
        "id": 385,
        "title": "小"
      },
      {
        "id": 391,
        "title": "中"
      }
    ]
  }
];

const option = [
  {
    "id": 165,
    "uniacid": 0,
    "merchant_id": 0,
    "title": "黄1+小",
    "thumb": "",
    "stock": 21,
    "stock_warning": 21,
    "sales": 21,
    "weight": "0.00",
    "goods_code": "21",
    "bar_code": "",
    "specs": "384,386"
  },
  {
    "id": 166,
    "uniacid": 0,
    "merchant_id": 0,
    "title": "黄1+中",
    "thumb": "",
    "stock": 21,
    "stock_warning": 21,
    "sales": 21,
    "weight": "0.00",
    "goods_code": "21",
    "bar_code": "",
    "specs": "384,385"
  },
  {
    "id": 167,
    "uniacid": 0,
    "merchant_id": 0,
    "title": "红1+小",
    "thumb": "",
    "stock": 21,
    "stock_warning": 21,
    "sales": 21,
    "weight": "0.00",
    "goods_code": "21",
    "bar_code": "",
    "specs": "385,386"
  },
  {
    "id": 168,
    "uniacid": 0,
    "merchant_id": 0,
    "title": "红1+中",
    "thumb": "",
    "stock": 21,
    "stock_warning": 21,
    "sales": 21,
    "weight": "0.00",
    "goods_code": "21",
    "bar_code": "",
    "specs": "385,387"
  }
]

const selected = ['385', '387']

let codeOptional = []
option.forEach(i => {
  const newO = i.specs.split(',')
  const isExist = selected.some(v => {
    return !newO.some(i => i == v)
  })
  if (isExist) return
  codeOptional.push(...newO.filter(i => !codeOptional.includes(i)))
})



const optional = specList.map(i => {
  return {
    '名字': i.title,
    '可选': i.items.map(i => i.id).filter(i => codeOptional.includes(i + '')),
    '视图':i.items.map(i => ({...i,'是否可选':codeOptional.includes(i.id + '')})),
  }
})

const showObject = option.find(v => {
  const z = v.specs.split(',')
  const a = codeOptional.sort(i=>i-1)
  if(JSON.stringify(a) === JSON.stringify(z)) return v
})


console.log(codeOptional)
console.log('optional', JSON.stringify(optional, null, "\t"))
console.log(showObject)