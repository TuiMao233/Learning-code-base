---
title: socked.io 实时应用开发
date: 2020-11-01
categories:
  - 扩展知识
tags: 
  - socked.io
---
## 写在前面

最近由于利用`node`重构某个项目，项目中有一个实时聊天的功能，于是就研究了一下聊天室。这个聊天室的主要利用到了`socket.io`和`express`。这个聊天室支持群聊，私聊，支持发送图片。下面就来和大家分享下实现过程：

## WebSocket

> HTML5一种新的协议。它实现了浏览器与服务器全双工通信。

为了更好的理解`WebSocket`，需要了解一下在没有`WebSocket`阶段是如何写聊天室这种实时系统的：
基于`http`协议浏览器可以实现单向通信，只能由浏览器发起请求（Request），服务器进行响应（Response），一个请求对应一个响应。由于服务器不能主动向客户端推送消息，于是普遍采用的方式就是**轮询（polling）**，轮询实现起来非常简单，就是定时的利用`ajax`向服务器端进行请求。**如果服务器有新的数据就返回新的数据，如果没有数据就返回空响应**。用代码来模拟下就是这个样子的：

```js
// 前端请求代码
function update (fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "./update.php");
    xhr.onreadystatechange = function(){    
    if(xhr.readyState === 4){
      if(xhr.status == 200){    
        const res = JSON.parse(xhr.response);
          if (res.flag) {
              // 进行相应操作
              // fn为接到响应后的处理函数
              fn && fn(fn);
          }
      }
    }
    };
    xhr.send();
}
function polling () {
    update();
}

setInterval(polling, 2000);

// 后台响应代码
<?php
    // 利用随机数的大小来模拟是否有新数据
    if (rand(1, 100) < 35) {
        echo json_encode(array( 
            "flag" => true, 
            "data" => '有新数据来了'
        ));
    } else {
        echo json_encode(array(
            "flag" => false
        ));
    }
?>
```

这种定时请求的方式的关键在于间隔时间的选取，依据我在上面代码做的模拟，很少概率能拿到下真正的数据，**多半的`ajax`请求是无效的**，于是又有前辈基于轮询提出来了**Comet（服务器推）**，这种技术可以通过**长轮询（long polling）**实现（还可以利用`iframe`），长轮询也是靠`ajax`实现客户端的请求，其流程为：**客户端发起请求，服务器挂起请求，假若有新的数据返回，服务器响应客户端刚才的请求，客户端得到响应后继续请求服务器**。用伪代码来模拟下长轮询的过程：

```js
// 前端利用下面函数进行请求
function longPolling () {
    update(update);
}

longpolling();

// 后端代码做如下更改
<?php
    // 利用随机数的大小来模拟是否有新数据
    while (true) {
        if (rand(1, 100) < 5) {
            echo json_encode(array( 
                "flag" => true, 
                "data" => '有新数据来了'
            ));
            break;
        }
    }
?>
```

长轮询的确减少了请求的次数，但是它也有着很大的问题，**那就是耗费服务器的资源**。
无论是轮询还是长轮询，还有着一个问题就是`http`并不是支持长连接很多人会说`keep-alive`不就是做到了长连接吗？然而并非如此，`keep-alive`是重用一个`TCP`连接，就是说http 1.1做到了一个`TCP`连接可以发送多个`http`请求，然而每个`http`请求还需要发送`Request Header`，每个请求的响应还会带着`Response Header`。对于轮询和长轮询来说伴随着真实数据的交换，还有进行的就是大量的`http header`的交换。
基于这些问题，`WebSocket`被提出，`WebSocket`可以理解为对`http`的一个补丁包，`WebSocket`使`http`变成了一个真正的长连接，握手阶段利用`http`协议，之后就不会再发起`http`请求了。下面来看下`WebSocket`握手的过程：

![clipboard.png](https://image-static.segmentfault.com/353/482/353482932-5808aa239fa28_articlex)
客户端的请求头比一般的`http`请求多出来几个字段：

- `Upgrade: websocket,Connection: Upgrade`，利用这两个字段来告诉服务器，我要将协议升级为`websocket`。
- `Sec-WebSocket-Version: 13`，来告诉服务器我想要使用的`WebSocket`的版本。
- `Sec-WebSocket-Key`，其值采用base64编码的随机16字节长的字符序列，这个值会在响应头中回应。
- `Sec-WebSocket-Extensions`，提供了一个客户端支持的协议扩展列表来供服务器选择，服务器只能选择一个，并且会将选择的扩展写入响应头的`Sec-WebSocket-Extensions`。
- `Sec-WebSocket-Protocol`，与`Sec-WebSocket-Extensions`原理相似，用于协商应用子协议。

再来看看响应头：

- `Status Code`，值为101，表示已经升级到`WebSocket`协议
- `Sec-WebSocket-Extensions`告诉客户端服务器选择的协议扩展
- `Sec-WebSocket-Protocol`告诉客户端服务器选择的子协议
- `Sec-WebSocket-Accept`经服务器确认并且加密后的`Sec-WebSocket-Key`

还有一点值得关注的就是协议头由`http/https`换成了`ws/wss`，也标识真`http`完成了其使命，接下来的事情由`WebSocket`来负责啦！

## socket.io

由于写原生的`WebSocket`在处理低版本浏览器的兼容性上的困难，所以一般在写实时交互的这种项目时一般会利用到`socket.io`。`socket.io`并不仅仅是`WebSocket`，还包含着`AJAX long polling`，`AJAX multipart streaming`，`JSONP Polling`等。`socket.io`可以看做是基于`engine.io`的二次开发。通过`emit`和`on`可以轻松地实现服务器与客户端之间的双向通信，`emit`来发布事件，`on`来订阅事件。

## 用户登录/登出

下面开始来写代码，我利用的构建工具是`gulp`，模板语言是`jade`，css预处理语言是`less`，假若也需要使用到这些，可以关注下我所在团队搭建的一个小的[脚手架](https://github.com/zp1996/lsgo-cli)，先从`app.js`开始：

```js
const users = {}, 
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server); 
// 将socket.io绑定到服务器上，使得任何连接到服务器的客户端都具有实时通信的功能

// 服务器来监听客户端
io.on("connection", (socket) => {
    // socket是返回的连接对象,两端的交互就是通过这个对象
});
```

需要创建一个对象（`users`）来存储在线用户，键值为用户昵称，为用户登录来订阅个事件：

```js
socket.on("login", (nickname) => {
        if (users[nickname] || nickname === "system") {
            socket.emit("repeat");            
        } else {
            socket.nickname = nickname;
            users[nickname] = {
                name: nickname,
                socket: socket,
                lastSpeakTime: nowSecond()
            };
            socket.emit("loginSuccess");            
            UsersChange(nickname, true);
        }
});
socket.on("disconnect", () => {
    if (socket.nickname && users[socket.nickname]) {
        delete users[socket.nickname];
        UsersChange(socket.nickname, false);
    }
});
function UsersChange (nickname, flag) {
    io.sockets.emit("system", {
        nickname: nickname,
        size: Object.keys(users).length,
        flag: flag
    });
}
function nowSecond () {
    return Math.floor(new Date() / 1000);
}
```

用户登录时需要验证其昵称是否含有，假若函数，则触发在客户端的`js`代码中注册的`repeat`事件，反之触发`loginSuccess`事件并且登录成功后需要向所有的客户端来广播，所以利用了`io.sockets.emit`。`repeat`，`loginSuccess`，`system`，在src/js/index.js中进行注册，主要用于页面的显示，也就是一些dom操作，所以在这里没有什么好讲的。用户退出，直接调用默认事件`disconnect`就好，并将该用户从用户对象中移除。

## 心跳检测

在用户的状态上的坑还是不少的，因为`WebSocket`中间过程比较复杂，经常会出现一些异常的情况，所以需要进行**心跳检测**，我采用的方式是服务端定时遍历用户列表，假若用户最后的发言时间与现在相比超过了5分钟，就将其视为掉线，从而避免了"用户undefined退出群聊"的这种情况。

```js
function pong () {
    const now = nowSecond();
    for (let k in users) {
        if (users[k].lastSpeakTime + MAX_LEAVE_TIME < now) {
            var socket = users[k].socket;
            users[k].socket.emit("disconnect");
            socket.emit("nouser", "由于长时间未说话，您已经掉线，请重新刷新页面");
            socket = null;
        } 
    }
}
// 心跳检测
setInterval(pong, PONG_TIME);
function UsersChange (nickname, flag) {
    io.sockets.emit("system", {
        nickname: nickname,
        size: Object.keys(users).length,
        flag: flag
    });
}
```

## 写在最后

其实`socket.io`的使用真的非常简单，很容易就会上手，特别需要处理的是在私信和发送图片的处理上，私信需要处理不同消息框，到底把消息添加到那个消息框中，我利用了一个对象来存储这些信息（`cache`），`cache`的键名为用户的昵称（因为在注册时判断了其是否唯一，所以可以将其视为唯一的）；键值为对象，对象属性如下图所示：

![clipboard.png](https://image-static.segmentfault.com/317/278/3172785214-5808c71db76cc_articlex)
具体实现大家还是到源码中去看吧！