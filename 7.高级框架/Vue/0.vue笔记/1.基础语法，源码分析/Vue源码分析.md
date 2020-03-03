## Vue框架相关JS技术

#### 伪数组转换为真数组

- ~~~html
  <li>test1</li><li>test2</li><li>test3</li>
  <script>
      const lis = document.querySelectorAll('li') // 这是一个伪数组 {0:li, 1:li....}
  	const lisAll = Array.prototype.slice.call(lis) // ES5 [0:li, 1:li....]
  	const lisAll2 = Array.from(lis) // ES6 [0:li, 1:li....]
  </script>
  ~~~

#### 获取节点类型

- ~~~javascript
  const el = document.getElementById('test') // 获取元素节点
  const attrNode = el.getAttributeNode('id') // 获取标签节点
  const textNode = el.firstChild // 获取文本节点
  console.log(el.nodeType, attrNode.nodeType, textNode.nodeType)
  // 元素节点返回 1 标签节点返回 2 文本节点返回 3
  ~~~

#### 给对象添加属性 属性可设置数据描述符和存取描述符

- ~~~javascript
  语法：Object.defineProperty(obj  ,  prop , { descriptor })
  obj： 要在其上定义属性的对象。
  prop：要定义或修改的属性的名称。
  descriptor：将被定义或修改的属性描述符。
  ~~~

#### defineProperty数据绑定数据同步

- ~~~javascript
  const obj = { firstName: 'A', lastName: 'B' }
  // 给obj添加一个 fullName 其绑定firstName和lastName的数据
  Object.defineProperty(obj, 'fullName', {
      // 当读取时值是firstName + '-' + lastName
  	get: function () {
  		return this.firstName + '-' +this.lastName
  	},
      // 当修改时分割-字符串在把两个的值给firstName和lastName
  	set: function (value) {
  		const names = value.split('-')
  		this.firstName = names[0]
  		this.lastName = name
          s[1]
  	}
  })
  ~~~

<div STYLE="page-break-after: always;">

#### 修改defineProperty方法数据描述符

- ~~~javascript
  Object.defineProperty(obj, 'fullName2', {
  	configurable: true, // 是否可修改
  	enumerable: true, // 是否可枚举
  	value: 'fullName2222' , // 初始值 可以是任何有效的javascript值
  	writable: false
  })
  ~~~

#### 得到对象自身可枚举属性名称字符串组成的数组

- ~~~javascript
  const ObjNames = Object.keys(obj)
  // ObjNames-->['firstName', 'lastName', 'fullName']
  ~~~

#### 判断prop是否是obj自身的属性( 判断是否为对象的属性 )

- ~~~javascript
  // 语法：obj.hasOwnProperty(prop)
  console.log(obj.hasOwnProperty('firstName'))
  ~~~

- #### DocumentFragment(高效批量更新多个节点)

  - **documentFragment**：内存中保存n个elment 的容器对象(不与界面关联)，用来存节点的容器，并且容器是在内存隔离的，不与外界发生关系

- #### 利用documentFragment一次性修改所有li

  - ~~~html
    <ul>
    	<li>test1</li>
    	<li>test2</li>
    	<li>test3</li>
    </ul>
    <script>
        const ul = document.querySelector('ul')
        // 1. 创建fragment
        const fragment = document.createDocumentFragment()
        // 2. 取出ul中所有子节点取出保存到fragment
        let child
    	while (child = ul.firstChild) {
    		 fragment.appendChild(child)
    	}
        // 3. 更新fragment中的所有li文本
        Array.prototype.slice.call(fragment.childNodes).forEach(node => {
    		if (node.nodeType === 1) { // 过滤不是文本节点的节点
    			node.innerText = 'WWWW'
    		}
    	})
        // 4. 将fragment插入ul
        ul.appendChild(fragment)
    </script>
    ~~~


</div>