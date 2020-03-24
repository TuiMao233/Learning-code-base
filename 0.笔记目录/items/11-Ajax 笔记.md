# HTTP 响应协议

## HTTP 概念

**HTTP是一种能够获取如 HTML 这样的网络资源的 [protocol](https://developer.mozilla.org/en-US/docs/Glossary/protocol)(通讯协议)。它是在 Web 上进行数据交换的基础，是一种 client-server 协议，也就是说，请求通常是由像浏览器这样的接受方发起的。一个完整的Web文档通常是由不同的子文档拼接而成的，像是文本、布局描述、图片、视频、脚本等等。**

## HTTP 请求交互的基本过程

![请求流程](D:\web学习库\0.笔记目录\img\axios\请求流程.png)

1. 前后应用从浏览器端向服务器发送 HTTP 请求(请求报文)
2. 后台服务器接收到请求后, 调度服务器应用处理请求, 向浏览器端返回 HTTP 响应(响应报文)
3. 浏览器端接收到响应, 解析显示响应体/调用监视回调

## HTTP 请求报文

**请求行:** `method url`
			 `GET /product_detail?id=2`
			 `POST /login`
**多个请求头:** `Host: www.baidu.com`
				    `Cookie: BAIDUID=AD3B0FA706E; BIDUPSID=AD3B0FA706;`
					`Content-Type: application/x-www-form-urlencoded 或者 application/json`
**请求体:** `username=tom&pwd=123`
		    `{"username": "tom", "pwd": 123}`

## HTTP 响应报文

**响应状态行:** `status statusText`
**多个响应头:** `Content-Type: text/html;charset=utf-8` 
					`Set-Cookie: BD_CK_SAM=1;path=/`
**响应体:** `html 文本/json 文本/js/css/图片...`

## post 请求体参数格式

`Content-Type: application/x-www-form-urlencoded;charset=utf-8`
**用于键值对参数，参数的键值用=连接, 参数之间用&连接**
例如: `name=%E5%B0%8F%E6%98%8E&age=12`

`Content-Type: application/json;charset=utf-8`
**用于 json 字符串参数**
例如: {"name": "%E5%B0%8F%E6%98%8E", "age": 12}

`Content-Type: multipart/form-data`
**用于文件上传请求**

## 常见的响应状态码

| 响应码 | 状态                  | 状态详情                            |
| ------ | --------------------- | ----------------------------------- |
| 200    | OK                    | 请求成功。一般用于 GET 与 POST 请求 |
| 201    | Created               | 已创建。成功请求并创建了新的资源    |
| 401    | Unauthorized          | 未授权/请求要求用户的身份认证       |
| 404    | Not Found             | 服务器无法根据客户端的请求找到资源  |
| 500    | Internal Server Error | 服务器内部错误，无法完成请求        |

## 不同类型的请求及其作用

1. GET: 从服务器端读取数据
2. POST: 向服务器端添加新数据
3. PUT: 更新服务器端已经数据
4. DELETE: 删除服务器端数据

## API 的分类

### REST API

发送请求进行 CRUD 哪个操作由请求方式来决定
同一个请求路径可以进行多个操作
请求方式会用到 GET/POST/PUT/DELETE

### 非 REST API

请求方式不决定请求的 CRUD 操作
一个请求路径只对应一个操作
一般只有 GET/POST

# json-server

JSON-Server 是一个 Node 模块，运行 Express 服务器，可以指定一个 json 文件作为 api 的数据源。

## 安装 json-server

```sh
npm install -g json-server
npm i cors express --save
```

## 启动 json-server

`json-server`可以直接把一个`json`文件托管成一个具备全`RESTful`风格的`API`,并支持跨域、`jsonp`、路由订制、数据快照保存等功能的 web 服务器。

db.json文件的内容：

```json
{
  "course": [
    {
      "id": 1000,
      "course_name": "马连白米且",
      "autor": "袁明",
      "college": "金并即总变史",
      "category_Id": 2
    },
    {
      "id": 1001,
      "course_name": "公拉农题队始果动",
      "autor": "高丽",
      "college": "先了队叫及便",
      "category_Id": 2
    }
  }
}
```

例如以下命令，把`db.json`文件托管成一个 web 服务。

```sh
$ json-server --watch --port 53000 db.json
```

输出类似以下内容，说明启动成功。

```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:53000/course

Home
http://localhost:53000

Type s + enter at any time to create a snapshot of the database
Watching...
```

此时，你可以打开你的浏览器，然后输入：http://localhost:53000/course

### 使用浏览器进行访问

~~~sh
http://localhost:53000/course/1000
~~~

# XMLHttpRequest的概述

`XMLHttpRequest` 最早是在IE5中以ActiveX组件的形式实现的。非 `W3C` 标准.
创建`XMLHttpRequest`对象（由于非标准所以实现方法不统一）
`Internet Explorer`把`XMLHttpRequest`实现为一个`ActiveX`对象
其他浏览器`（Firefox、Safari、Opera…）`把它实现为一个本地的`JavaScript`对象。
`XMLHttpRequest`在不同浏览器上的实现是兼容的，所以可以用同样的方式访问`XMLHttpRequest`实例的属性和方法，而不论这个实例创建的方法是什么。

## Ajax工作原理

![](.\img\Ajax工作原理.png)

`Ajax`并不是一项新技术，它实际上是几种技术，每种技术各尽其职，以一种全新的方式聚合在一起
服务器端语言：服务器需要具备向浏览器发送特定信息的能力。Ajax与服务器端语言无关。
`XML (eXtensible Markup Language，可扩展标记语言)` 是一种描述数据的格式。`Aajx` 程序需要某种格式化的格式来在服务器和客户端之间传递信息，`XML` 是其中的一种选择
`XHTML（eXtended Hypertext Markup Language）`,使用扩展超媒体标记语言）和 `CSS（Cascading Style Sheet,级联样式单）`标准化呈现；
`DOM（Document Object Model,文档对象模型）`实现动态显示和交互；
使用`XMLHTTP`组件`XMLHttpRequest`对象进行异步数据读取
使用`JavaScript`绑定和处理所有数据

## Ajax的缺陷

`AJAX`不是完美的技术。使用`AJAX`，它的一些缺陷不得不权衡一下：
由 `Javascript` 和 `AJAX` 引擎导致的浏览器的兼容
页面局部刷新，导致后退等功能失效。
对流媒体的支持没有`FLASH`、`Java Applet`好。
一些手持设备（如手机、`PDA`等）支持性差。

# 创建XMLHttpRequest对象

为了每次写`Ajax`的时候都节省一点时间，可以把对象检测的内容打包成一个可复用的函数：

~~~javascript
function getHTTPObject(){
var xhr = false;
if(window.XMLHttpRequest){
	xhr = new XMLHttpRequest();
}else if(window.ActiveXObject){
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
};return xhr;
}
~~~

[^说明]: 对window.XMLHttpRequest的调用会返回一个对象或null，if语句会把调用返回的结果看作是true或false**（如果返回对象则为true，返回null则为false）。**如果XMLHttpRequest对象存在，则把 xhr 的值设为该对象的新实例。如果不存在，就去检测 ActiveObject 的实例是否存在，如果答案是肯定的，则把微软 XMLHTTP 的新实例赋给 xhr

## XMLHttpRequest的方法

| 方法                               | 描述                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| abort()                            | 停止当前请求                                                 |
| getAllResponseHeaders()            | 把HTTP请求的所有响音首部作为键/值返回                        |
| open("method","url")               | 简历对服务器的调用。Method参数可以是GET或POST或PUT.url参数可以是相对url或绝对url |
| send(content)                      | 向服务器发送请求                                             |
| setRequestHeader("header","value") | 把指定首部设置为所提供的值。在设置任何首部之前先调用open()   |

## XMLHttpRequest的属性

| 属性               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| onreadystatechange | 每个状态改变是都会触发这个时间处理器，通常会调用一个javaScript函数 |
| readyState         | 请求的状态，有5个可取值：0=未初始化、1=正在加载、2=已经加载、3、交互中、4=、完成 |
| responseText       | 服务器的响应，表示一个串                                     |
| responseXML        | 服务器的响应，表示为XML，这个对象可以解析为DOM对象           |
| status             | 服务器的HTTP状态码（200对应OK、404对应NotFount、等）         |
| statusText         | HTTP状态码的相应文本（OK或NotFount等）                       |

# 发送请求

利用XMLHttpRequest 实例与服务器进行通信包含以下3个关键部分：
**onreadystatechange 事件处理函数**， **open 方法**，**send 方法**，

## open(method, url, asynch)

`XMLHttpRequest` 对象的 `open` 方法允许程序员用一个`Ajax`调用向服务器发送请求。

**method**
请求类型，类似 `“GET”`或`”POST”`的字符串。若只想从服务器检索一个文件，而不需要发送任何数据，使用GET(可以在GET请求里通过附加在URL上的查询字符串来发送数据，不过数据大小限制为2000个字符)。若需要向服务器发送数据，用POST。
在某些情况下，有些浏览器会把多个XMLHttpRequest请求的结果缓存在同一个URL。如果对每个请求的响应不同，就会带来不好的结果。在此将时间戳追加到URL的最后，就能确保URL的唯一性，从而避免浏览器缓存结果。`(“?time=”+new Date());`

**url：**路径字符串，指向你所请求的服务器上的那个文件。可以是绝对路径或相对路径。

**asynch**
表示请求是否要异步传输，默认值为true。指定true，在读取后面的脚本之前，不需要等待服务器的相应。指定false，当脚本处理过程经过这点时，会停下来，一直等到Ajax请求执行完毕再继续执行。

## send(data)

`open` 方法定义了 Ajax 请求的一些细节。send 方法可为已经待命的请求发送指令
**data**：将要传递给服务器的字符串。
当向`send()`方法提供参数时，要确保open()中指定的方法是`POST`，如果没有数据作为请求体的一部分发送，则使用`null`.

~~~javascript
var request = getHTTPObject()
request.open("GET","file.txt",true)
request.send(null)
request.onreadystatechange = doSomeThing
~~~

## onreadystatechange

该事件处理函数由服务器触发，而不是用户

# 接收响应

用 XMLHttpRequest 的方法可向服务器发送请求。在 Ajax 处理过程中，XMLHttpRequest 的如下属性可被服务器更改：
`readyState	status	responseText	responseXML`

## readyState

**readyState 属性表示Ajax请求的当前状态。它的值用数字代表。**
0 代表未初始化。 还没有调用 open 方法
1 代表正在加载。 open 方法已被调用，但 send 方法还没有被调用
2 代表已加载完毕。send 已被调用。请求已经开始
3 代表交互中。服务器正在发送响应4 代表完成。响应发送完毕

每次 `readyState` 值的改变，都会触发 `readystatechange` 事件。如果把 `onreadystatechange` 事件处理函数赋给一个函数，那么每次 `readyState` 值的改变都会引发该函数的执行。
`readyState` 值的变化会因浏览器的不同而有所差异。但是，当请求结束的时候，每个浏览器都会把 readyState 的值统一设为 4

## status

服务器发送的每一个响应也都带有首部信息。三位数的状态码是服务器发送的响应中最重要的首部信息，并且属于超文本传输协议中的一部分。

常用状态码及其含义：
404 没找到页面(not found)
403 禁止访问(forbidden)
500 内部服务器出错(internal service error)
200 一切正常(ok)
304 没有被修改(not modified)

在 XMLHttpRequest 对象中，服务器发送的状态码都保存在 status 属性里。通过把这个值和 200 或 304 比较，可以确保服务器是否已发送了一个成功的响应

## responseText

XMLHttpRequest 的 responseText 属性包含了从服务器发送的数据。它是一个HTML,XML或普通文本，这取决于服务器发送的内容。

当 readyState 属性值变成 4 时, responseText 属性才可用，表明 Ajax 请求已经结束。

~~~javascript
request.onreadystatechange = function(){
  if(request.readyState == 4){
		if(request.status == 200 || request.status == 304){
			alert(request.responseText)
		}
	}
}
~~~

## responseXML

如果服务器返回的是 XML， 那么数据将储存在 responseXML 属性中。
只用服务器发送了带有正确首部信息的数据时， responseXML 属性才是可用的。 MIME 类型必须为 text/xml

# 数据格式提要

在服务器端 AJAX 是一门与语言无关的技术。在业务逻辑层使用何种服务器端语言都可以。
从服务器端接收数据的时候，那些数据必须以浏览器能够理解的格式来发送。服务器端的编程语言只能以如下 3 种格式返回数据：**- XML		- JSON		- HTML**

## XML

**优点：**XML 是一种通用的数据格式。不必把数据强加到已定义好的格式中，而是要为数据自定义合适的标记。利用 DOM 可以完全掌控文档。
**缺点：**如果文档来自于服务器，就必须得保证文档含有正确的首部信息。若文档类型不正确，那么 responseXML 的值将是空的。当浏览器接收到长的 XML 文件后， DOM 解析可能会很复杂

## JSON

JSON（JavaScript Object Notation）一种简单的数据格式，比xml更轻巧。JSON是JavaScript原生格式，这意味着在JavaScript中处理JSON数据不需要任何特殊的API或工具包。
JSON的规则很简单：对象是一个无序的“‘名称/值’对”集合。一个对象以“{”（左括号）开始，“}”（右括号）结束。每个“名称”后跟一个“:”（冒号）；“‘名称/值’对”之间使用“,”（逗号）分隔。

~~~javascript
[{
	"songname": "70亿人の头の上に风船を",
	"singer": "きくお",
	"album": "きくおミク",
},{
	"songname": "70亿人の头の上に风船を",
	"singer": "きくお",
	"album": "きくおミク",
}]
~~~

JSON 用冒号(而不是等号)来赋值。每一条赋值语句用逗号分开。整个对象用大括号封装起来。可用大括号分级嵌套数据。

JSON 只是一种文本字符串。它被存储在 responseText 属性中
为了读取存储在 responseText 属性中的 JSON 数据，需要根据 JavaScript 的 eval 语句。函数 eval 会把一个字符串当作它的参数。然后这个字符串会被当作 JavaScript 代码来执行。因为 JSON 的字符串就是由 JavaScript 代码构成的，所以它本身是可执行的。

~~~javascript
// 使用eval()
var jsonStr = xhr.responseText
var personObj = eval("("+jsonStr+")")
var name = personObj.name
// 使用JSON.parse()
var jsonStr = xhr.responseText
var personObj = JSON.parse(jsonStr)
var name = personObj.name
~~~

**优点：**作为一种数据传输格式，JSON 与 XML 很相似，但是它更加灵巧。JSON 不需要从服务器端发送含有特定内容类型的首部信息。
**缺点：**语法过于严谨，代码不易读，eval 函数存在风险

## HTML

HTML 由一些普通文本组成。如果服务器通过 XMLHttpRequest 发送 HTML， 文本将存储在 responseText 属性中。
不必从 responseText 属性中读取数据。它已经是希望的格式，可以直接将它插入到页面中。插入 HTML 代码最简单的方法是更新这个元素的 innerHTML 属性。
**优点：**从服务器端发送的 HTML 代码在浏览器端不需要用 JavaScript 进行解析。HTML 的可读性好。HTML 代码块与 innerHTML 属性搭配，效率高。
**缺点：**若需要通过 AJAX 更新一篇文档的多个部分，HTML 不合适，innerHTML 并非 DOM 标准。

## 对比小结

若应用程序不需要与其他应用程序共享数据的时候, 使用 HTML 片段来返回数据时最简单的
如果数据需要重用, JSON 文件是个不错的选择, 其在性能和文件大小方面有优势
当远程应用程序未知时, XML 文档是首选, 因为 XML 是 web 服务领域的 “世界语”

# 原生Ajax请求流程

## 封装兼容其他浏览器  getHTTPObject 对象

~~~javascript
function getHTTPObject(){
var xhr = false;
if(window.XMLHttpRequest){
	xhr = new XMLHttpRequest();
}else if(window.ActiveXObject){
	xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
return xhr;
}
~~~

## 原生 Ajax  发送请求流程

~~~javascript
// 1. 创建 XmlHttpRequest 对象
var request = getHTTPObject()
// 2. 准备发送请求的数据：url
var url = 'helloAjax.txt'+"?time="+new Date(); // 防止缓存
var method = 'GET'
// 3. 调用 XMLHttpRequest 对象的 open 方法规定发送格式
request.open(method, url)
// 4. 调用 XMLHttpRequest 对象的 send 方法,发送请求
request.send(null)
// 5. 为 XMLHttpRequset 对象添加 onreadystatechange 监听函数
request.onreadystatechange = function () {
	// 6. 判断响应是否完成：XMLHttpRequest 对象的 readyState 属性值为4的时候
  // 7. 在判断响应是否可用：XMLHttpRequest 对象 status 属性值为 200 或者304
	if(request.readyState == 4 && request.status == 200 || request.status == 304){
		// 8. 打印输出结果 request
    	console.log(request)
	}
}
~~~

# jQyery-ajax 获取数据(框架)

## 返回结果替换元素文字

`$dom.load(url);`

## $.get()函数

`$.get(url,data,success(response,status,xhr),dataType)`

## $.post()函数

`$.post(url,data,success(data, textStatus, jqXHR),dataType)`

## $.ajax()函数

`$.ajax({settings});`

| 参数                  | 类型     | 属性                                                         |
| --------------------- | -------- | :----------------------------------------------------------- |
| **url**               | String   | 默认值: 当前页地址。发送请求的地址。                         |
| **data**              | String   | 发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。查看 processData 选项说明以禁止此自动转换。必须为 Key/Value 格式。如果为数组，jQuery 将自动为不同值对应同一个名称。如 {foo:["bar1", "bar2"]} 转换为 '&foo=bar1&foo=bar2'。 |
| **success**           | Function | 请求成功后的回调函数。                                       |
| **dataType**          | String   | 预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如 XML MIME 类型就被识别为 XML。在 1.4 中，JSON 就会生成一个 JavaScript 对象，而 script 则会执行这个脚本。随后服务器端返回的数据会根据这个值解析后，传递给回调函数。 |
| **type**              | String   | 默认值: "GET")。请求方式 ("POST" 或 "GET")， 默认为 "GET"。注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。 |
| **timeout**           | Number   | 设置请求超时时间（毫秒）。此设置将覆盖全局设置。             |
| **error**             | Function | 默认值: 自动判断 (xml 或 html)。请求失败时调用此函数。三个参数：XMLHttpRequest 对象、错误信息、（可选）捕获的异常对象。。 |
| **username**          | String   | 用于响应 HTTP 访问认证请求的用户名。                         |
| **password**          | String   | 用于响应 HTTP 访问认证请求的密码                             |
| **xhr**               | Function | 需要返回一个 XMLHttpRequest 对象。默认在 IE 下是 ActiveXObject 而其他情况下是 XMLHttpRequest 。用于重写或者提供一个增强的 XMLHttpRequest 对象。这个参数在 jQuery 1.3 以前不可用。 |
| **cache**             | Boolean  | 默认值: true，dataType 为 script 和 jsonp 时默认为 false。设置为 false 将不缓存此页面。jQuery 1.2 新功能。 |
| **dataFilter**        | Function | 给 Ajax 返回的原始数据的进行预处理的函数。提供 data 和 type 两个参数：data 是 Ajax 返回的原始数据，type 是调用 jQuery.ajax 时提供的 dataType 参数。函数返回的值将由 jQuery 进一步处理 |
| **context**           | Object   | 这个对象用于设置 Ajax 相关回调函数的上下文。也就是说，让回调函数内 this 指向这个对象（如果不设定这个参数，那么 this 就指向调用本次 AJAX 请求时传递的 options 参数）。比如指定一个 DOM 元素作为 context 参数，这样就设置了 success 回调函数的上下文为这个 DOM 元素。 |
| **jsonp**             | String   | 在一个 jsonp 请求中重写回调函数的名字。这个值用来替代在 "callback=?" 这种 GET 或 POST 请求中 URL 参数里的 "callback" 部分，比如 {jsonp:'onJsonPLoad'} 会导致将 "onJsonPLoad=?" 传给服务器。 |
| **jsonpCallback**     | String   | 为 jsonp 请求指定一个回调函数名。这个值将用来取代 jQuery 自动生成的随机函数名。这主要用来让 jQuery 生成度独特的函数名，这样管理请求更容易，也能方便地提供回调函数和错误处理。你也可以在想让浏览器缓存 GET 请求的时候，指定这个回调函数名。 |
| **contentType**       | String   | 默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。默认值适合大多数情况。如果你明确地传递了一个 content-type 给 $.ajax() 那么它必定会发送给服务器（即使没有数据要发送）。 |
| **processData**       | Boolean  | 默认值: true。默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。 |
| **scriptCharset**     | String   | 只有当请求时 dataType 为 "jsonp" 或 "script"，并且 type 是 "GET" 才会用于强制修改 charset。通常只在本地和远程的内容编码不同时使用。 |
| **ifModified**        | Boolean  | 仅在服务器数据改变时获取新数据。默认值: false。使用 HTTP 包 Last-Modified 头信息判断。在 jQuery 1.4 中，它也会检查服务器指定的 'etag' 来确定数据没有被修改过。 |
| **traditional**       | Boolean  | 如果你想要用传统的方式来序列化数据，那么就设置为 true。请参考工具分类下面的 jQuery.param 方法。 |
| **async**             | Boolean  | 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。 |
| **complete(XHR, TS)** | Function | 请求完成后回调函数 (请求成功或失败之后均调用)。参数： XMLHttpRequest 对象和一个描述请求类型的字符串。这是一个 Ajax 事件。 |
| **global**            | Boolean  | 是否触发全局 AJAX 事件。默认值: true。设置为 false 将不会触发全局 AJAX 事件，如 ajaxStart 或 ajaxStop 可用于控制不同的 Ajax 事件。 |
| **beforeSend(XHR)**   | Function | 发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头。XMLHttpRequest 对象是唯一的参数。这是一个 Ajax 事件。如果返回 false 可以取消本次 ajax 请求。 |

# axios-ajax 获取数据(框架)

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

## 执行 `GET` 请求

```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 可选地，上面的请求可以这样做
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## 执行 `POST` 请求

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## 执行多个并发请求

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```

# fetch 获取数据(原生)

~~~js
fetch('url').then(function(response) {return response.json();})
.then(function (data) {
    console.log(data);
})
 .catch(function (myJson) {
  	console.log(myJson)
});
~~~

