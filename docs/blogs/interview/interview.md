---
title: 【前端面试】每天一道面试题
date: 2022-05-06
sidebar: true
categories:
 - 前端面试题
tags:
 - 前端面试
---

## JavaScript

### 1.什么是防抖和节流？有什么区别？如何实现？（2022.5.6）

学习自☞
1. [什么是防抖和节流？有什么区别？如何实现？](https://vue3js.cn/interview/JavaScript/debounce_throttle.html)
2. [JavaScript专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)
3. [JavaScript专题之跟着 underscore 学防抖](https://github.com/mqyqingfeng/Blog/issues/22)

优化高频率执行代码

比如：浏览器的resize，scroll，keypress，mousemove等事件在触发时，会不断地调用绑定在事件上的回调函数，极大的浪费资源，降低前端性能。

为了优化体验，需要对这类事件进行调用次数的限制=>**防抖（debounce）和节流（throttle）**

**定义&&区别**

(1)、定义

- 节流：n秒内只运行一次，若在n秒内重复触发，只有一次生效。
- 防抖：n秒后执行该事件，若在n秒内重复触发，则重新计时。

(2)、区别

相同点：

- 都可以通过使用setTimeout实现
- 目的都是，降低回调执行频率。节省计算资源

不同点

- 函数节流，在一段连续操作中，每一段时间只执行一次回调
- 函数防抖，在一段连续操作结束后，处理回调

>例如：都设置时间频率为500ms，在2秒时间内，频繁触发函数。节流，每隔 500ms 就执行一次。防抖，则不管调动多少次方法，在2s后，只会执行一次

正常：|||||||||||||||||||

节流：&emsp;|&emsp;|&emsp;|&emsp;|

防抖：&emsp;&emsp;&emsp;&emsp;&emsp;|

**实现**

开发过程中可以直接使用lodash中实现的方法

☞[节流（throttle）](https://www.lodashjs.com/docs/lodash.throttle#_throttlefunc-wait0-options)

☞[防抖（debounce）](https://www.lodashjs.com/docs/lodash.debounce#_debouncefunc-wait0-options)

(1)、节流

完成节流可以使用时间戳与定时器的写法

使用时间戳写法，事件会立即执行，停止触发后没有办法再次执行

```js
 function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
```

使用定时器写法，delay毫秒后第一次执行，第二次事件停止触发后依然会再一次执行

```js
function throttle(func, wait) {
    var timeout;
    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, args)
            }, wait)
        }
    }
}
```

可以将时间戳写法的特性与定时器写法的特性相结合，实现一个更加精确的节流。实现如下

```js
function throttle(func, wait) {
    var timeout, context, args, result;
    var previous = 0;

    var later = function() {
        previous = +new Date();
        timeout = null;
        func.apply(context, args)
    };

    var throttled = function() {
        var now = +new Date();
        //下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
         // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    };
    return throttled;
}
```

(2)、防抖

简单实现

```js
function debounce(func, wait) {
    var timeout;

    return function () {
        var context = this;
        var args = arguments;

        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}

```

防抖如果需要立即执行，可加入第三个参数用于判断，实现如下：

```js
function debounce(func, wait, immediate) {
    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    }
    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };
    return debounced;
}

```

**应用场景**

防抖：

- 搜索框搜索输入。只需用户最后一次输入完，再发送请求
- 手机号、邮箱验证输入检测
- 窗口大小resize。只需窗口调整完成后，计算窗口大小。防止重复渲染

节流：

- 滚动加载，加载更多或滚到底部监听
- 搜索框，搜索联想功能

### 2.介绍下Set、Map、WeakSet 和 WeakMap 的区别？（2022.5.7）

#### （1）Set

类似于数组，但员是唯一且无序的，没有重复的值。

Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。

```js
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

[...new Set('ababbc')].join('')
// "abc"

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56

// 属性和方法
let s = new Set();
s.add(1).add(2).add(2);
// 注意2被加入了两次
s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

#### （2）WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

- WeakSet 的成员只能是对象，而不能是其他类型的值。
- WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

```js
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false

```

#### （3）Map

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

#### （4）WeakMap

WeakMap与Map的区别有两点。首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。

## 网络

### 1.说一下什么是 Http 协议无状态?怎么解决 Http 协议无状态?

#### http协议无状态的含义

**1.1 有状态协议**

常见的许多七层协议实际上是有状态的

**1.2 为什么说http协议是无状态协议**

因为它的每个请求都是完全独立的，每个请求包含了处理这个请求所需的完整的数据，发送请求不涉及到状态的变更。

**1.3 为什么不改进http协议使之有状态**

最初的http协议只是用来浏览静态文件的，无状态协议已经足够，这样实现的负担也很轻。随着web的发展，它需要变得有状态，但是不是就要修改http协议使之有状态呢？是不需要的。因为我们经常长时间停留在某一个网页，然后才进入另一个网页，如果这两个页面之间维持状态，代价是很高的。其次，历史让http无状态，但是现在对http提出来新的要求。按照软件领域的通常做法是，保留历史经验，在 http 协议上再加上一层实现我们的目的（“再加上一层，你可以做任何事”）。所以引入了其他机制来实现这种有状态的连接。

**1.4 无状态协议的优缺点**

优点：会话（Session）支持、对中间件友好

缺点：单个请求需要的所有信息都必须要包含在请求中一次发送到服务端，这导致单个消息的结构需要比较复杂，必须能够支持大量元数据，因此 HTTP 消息的解析要比其他许多协议都要复杂得多。同时，这也导致了相同的数据在多个请求上往往需要反复传输，例如同一个连接上的每个请求都需要传输 Host、Authentication、Cookies、Server 等往往是完全重复的元数据，一定程度上降低了协议的效率。

**1.5 HTTP 协议是无状态协议，这句话本身到底对不对？**

实际上，并不全对。至于 HTTP/2，它应该算是一个有状态的协议了（有握手和 GOAWAY 消息，有类似于 TCP 的流控），所以以后说“HTTP 是无状态的协议”就不太对了，最好说“HTTP 1.x 是无状态的协议”

#### 如何解决无状态问题

HTTP 协议是无状态的，无状态意味着，服务器无法给不同的客户端响应不同的信息。这样一些交互业务就无法支撑了。Cookie 应运而生。

**2.1 Cookie**

>cookie 的传递会经过下边这 4 步：

1. Client 发送 HTTP 请求给 Server
2. Server 响应，并附带 Set-Cookie 的头部信息
3. Client 保存 Cookie，之后请求 Server 会附带 Cookie 的头部信息
4. Server 从 Cookie 知道 Client 是谁了，返回相应的响应

>Server 拿到 Cookie 后，通过什么信息才能判断是哪个 Client 呢？服务器的 SessionID。

**2.2 Session**

如果把用户名、密码等重要隐私都存到客户端的 Cookie 中，还是有泄密风险。为了更安全，把机密信息保存到服务器上，这就是 Session。

Session 是服务器上维护的客户档案，可以理解为服务器端数据库中有一张 user 表，里面存放了客户端的用户信息。SessionID 就是这张表的主键 ID。

Session 信息存到服务器，必然占用内存。用户多了以后，开销必然增大。为了提高效率，需要做分布式，做负载均衡。因为认证的信息保存在内存中，用户访问哪台服务器，下次还得访问相同服务器才能拿到授权信息，这就限制了负载均衡的能力。而且 SeesionID 存在 Cookie中，还是有暴露的风险，比如 CSRF(Cross-Site Request Forgery，跨站请求伪造)。

>如何解决这些问题呢？基于 Token 令牌鉴权。

**2.3 Token**

首先，Token 不需要再存储用户信息，节约了内存。其次，由于不存储信息，客户端访问不同的服务器也能进行鉴权，增强了扩展能力。然后，Token 可以采用不同的加密方式进行签名，提高了安全性。

Token 就是一段字符串，Token 传递的过程跟 Cookie 类似，只是传递对象变成了 Token。用户使用用户名、密码请求服务器后，服务器就生成 Token，在响应中返给客户端，客户端再次请求时附带上 Token，服务器就用这个 Token 进行认证鉴权。

Token 虽然很好的解决了 Session 的问题，但仍然不够完美。服务器在认证 Token 的时候，仍然需要去数据库查询认证信息做校验。为了不查库，直接认证，JWT 出现了。

**2.4 JWT**

JWT 的英文全称是 JSON Web Token。JWT 把所有信息都存在自己身上了，包括用户名密码、加密信息等，且以 JSON 对象存储的。

JWT 长相是 xxxxx.yyyyy.zzzzz，极具艺术感。包括三部分内容

- Header：包括 token 类型和加密算法(HMAC SHA256 RSA)

```js
{  "alg": "HS256",  "typ": "JWT"}
```

- Payload：传入内容

```js
{  "sub": "1234567890",  "name": "John Doe",  "admin": true}
```

- Signature：签名，把 header 和 payload 用 base64 编码后"."拼接，加 secret(服务器私钥)。

```js
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret);
```

最终的 token 就是这样一个字符串：

```js
eyJhbGciOiJIUzI1NiJ9
  .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
  .yKOB4jkGWu7twu8Ts9zju01E10_CPedLJkoJFCan5J4;
```

给 Token 穿个外套

```js
Authorization: Bearer;
```

这就是我们在请求 Header 里面看到的内容格式了。

### 2.说一下开发中常用的几种 Content-Type ？

#### Content-Type是什么

Http 的实体首部字段，用于说明请求或返回的消息主体是用何种方式编码，在 request header 和 response header 里都存在。

几个常见的类型如下：

- application/x-www-form-urlencoded
- multipart/form-data
- application/json
- text/xml

#### 1.application/x-www-form-urlencoded

浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。请求如下面形式：

```js
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8
title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```

该种方式提交的数据放在 body 里面，数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。

#### 2.multipart/form-data

该种方式也是一个常见的 POST 提交方式，通常表单上传文件时使用该种方式。

使用表单上传文件时，必须让 form 的 enctype 等于这个值。

```js
<form action="/" method="post" enctype="multipart/form-data">
  <input type="text" name="description" value="some text" />
  <input type="file" name="myFile" />
  <button type="submit">Submit</button>
</form>
```

请求头看起来像这样

```js
POST /foo HTTP/1.1
Content-Length: 68137
Content-Type: multipart/form-data; boundary=---------------------------974767299852498929531610575

---------------------------974767299852498929531610575
Content-Disposition: form-data; name="description"

some text
---------------------------974767299852498929531610575
Content-Disposition: form-data; name="myFile"; filename="foo.txt"
Content-Type: text/plain

(content of the uploaded file foo.txt)
---------------------------974767299852498929531610575--
```

#### 3.application/json

application/json 作为响应头大家都不陌生，现在越来越多的人把其作为请求头，用来告诉服务器消息主体是序列化后的 JSON 字符串。请求类似下面形式

```js
POST http://www.example.com HTTP/1.1
Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]}
```

这种方案，可以方便的提交复杂的结构化数据，特别适合 RESTful 的接口。各大抓包工具如 Chrome 自带的开发者工具、Firebug、Fiddler，都会以树形结构展示 JSON 数据，非常友好。

#### 4.text/xml

该种方式主要用来提交 XML 格式的数据，请求形式如下：

```js
POST http://www.example.com HTTP/1.1
Content-Type: text/xml

<?xml version="1.0"?>
<methodCall>
    <methodName>examples.getStateName</methodName>
    <params>
        <param>
            <value><i4>41</i4></value>
        </param>
    </params>
</methodCall>
```

### 3.说下 URL 和 URI 的区别？

#### 一、URI：统一资源标识符

URI 全称 Uniform Resource Identifier,指的是统一资源标识符，用来标识唯一的资源。

Web 上可用的每种资源-HTML 文档、图像、视频片段、程序等都由一个通用资源标识符(即 URI)进行定位。

URI 一般由三部分组成：

- 1.访问资源的命名机制
- 2.存放资源的主机名
- 3.资源自身的名称，由路径表示

看个例子：http://www.xxx.com/html/html4

这个 URi 是这样的：这是一个通过 HTTP 协议访问的资源，位于www.xxx.com上，通过路径"/html/html4"访问。

有的 URI 指向一个资源的内部。这种 URi 以"#"结束，并跟着一个 anchor 标识符（称为片段标识符）。例如，下面是一个指向 section_2 的 URI：http://somesite.com/html/top.htm#section_2

**1.1 绝对 URI**

URI 有绝对和相对之分，绝对的 URI 指以 scheme（后面跟着冒号）开头的 URI。前面提到的http://www.cnn.com就是绝对的 URI 的一个例子，其它的例子还有mailto:jeff@javajeff.com、news:comp.lang.java.help和xyz://whatever。你可以把绝对的 URI 看作是以某种方式引用某种资源，而这种方式对标识符出现的环境没有依赖。如果使用文件系统作类比，绝对的 URI 类似于从根目录开始的某个文件的径。

**1.2 相对 URI**

相对 URI 不包含任何命名规范信息。它的路径通常指同一台机器上的资源。相对 URI 可能含有相对路径（如，".."表示上一层路径），还可能包含片段标识符。比如看下面的例子：

- 相对 URI

```
suppliers.html
```

它扩展成完全的 URI 就是http://www.xxx.com/suppliers.htm

- 一个图片的相对URI

 ```html
<img src="../icons/logo.png" alt="logo">
 ```

它扩展成完全的 URI 就是http://www.xxx.com/icons/logo.png

与绝对的 URI 不同的，相对的 URI 不是以 scheme（后面跟着冒号）开始的 URI。 它的一个例子是articles/articles.html。你可以把相对的 URI 看作是以某种方式引用某种资源，而这种方式依赖于标识符出现的环境。如果用文件系统作类比，相对的 URI 类似于从当前目录开始的文件路径。

**1.3 URI 的用途**

在 HTML 中，URI 被用来：

- 链接到另一个文档或资源
- 链接到一个外部样式表或脚本
- 在页内包含图形、对象或 applet
- 建立图像映射
- 提交一个表单
- 建立一个框架文档
- 引用一个外部参考
- 指向一个描述文档的 metadata
  
#### 二、URL：统一资源定位器

URL 全称是 Uniform Resource Locator,指的是统一资源定位器,它是一种具体的 URI，即 URL 可以用来标识一个资源，而且还指明了如何 locate 这个资源。

通俗地说，URL 是 Internet 上用来描述资源的字符串，主要用在各种 www 客户端和服务器程序，特别是著名的 Mosaic。采用 URL 可以用一种统一的格式来描述各种信息资源，包括文件、服务器的地址和目录等。

URL 的第一个部分 http://表示要访问的文件的类型。在网上，这几乎总是使用 http（超文本传输协议，HyperText Transfer Protocol-用来转换网页的协议）；有时也使用 ftp（文件传输协议，File Transfer Protocol-用来传输软件和大文件）；telnet（远程登录），主要用于远程交谈以及文件调用等，意思是浏览器正在阅读本地盘外的一个文件而不是一个远程计算机。

**2.1 URL 组成**

1. Internet 资源类型（schema）：指出 www 客户程序用来操作的工具。如http://表示 www 服务器，ftp://表示 ftp 服务器，gopher://表示 Gopher 服务器，而new:表示 Newgroup 新闻组。必需的。
2. 服务器地址（host）：指出 www 网页所在的服务器域名。必需的。
3. 端口（port）：有时（并非总是这样），对某些资源的访问来说，需给出相应的服务器提供端口。可选的。
4. 路径（path）：指明服务器上某资源的位置。与端口一样，路径并非总是需要的。可选的。

URL 地址格式排列为：schema://host:port/path

>必须注意：www 上的服务器都是区分大小写的，所以千万要注意正确的 URL 大小写表达形式。

#### 三、URN：统一资源名称

URN,全称 Uniform Resource Name,指的是统一资源命名,是通过名字来标识资源。比如mailto:java-net@java.sun.com

URN 是 URL 的一种更新形式，统一资源名称(URN, Uniform Resource Name)不依赖于位置，并且有可能减少失效连接的个数。

#### 四、总结

URI: Uniform Resource Identifier 指的是统一资源标识符
URL: Uniform Resource Location 指的是统一资源定位符
URN: Universal Resource Name 指的是统一资源名称

URI 指的是统一资源标识符，用唯一的标识来确定一个资源，它是一种抽象的定义，也就是说，不管使用什么方法来定义，只要能唯一的标识一个资源，就可以称为 URI。它是以某种统一的(标准化的)方式标识资源的简单字符串。

URL 和 URN 是 URI 的子集，URL 可以理解为使用地址来标识资源，URN 可以理解为使用名称来标识资源。

Web 上地址的基本形式是 URI，它代表统一资源标识符,有两种形式

- URL:目前 URI 的最普遍的形式就是无处不在的 URL 或统一资源定位器
- URN:URL 的一种更新形式，统一资源名称不依赖于位置，并且有可能减少失效链接的个数。但是其流行还需要时间，因为它需要更精密软件的支持。

## Vue

### 1.权限管理

#### 一、是什么

权限是对特定资源的访问许可，所谓权限控制，也就是确保用户只能访问被分配的资源。

前端权限=>请求的发起权限=>页面加载触发||dom交互触发=>前端路由||视图

总结：

- 路由方面：用户登录后只能看到自己有权访问的导航菜单和访问有权访问的路由地址，否则跳转404

- 视图方面：用户只能看到自己有权浏览的内容和有权操作的控件

- 请求拦截

#### 二、怎么做

**1.接口权限**

jwt验证：没有通过的话一般返回401，跳转到登录页面进行重新登录。

登录完拿到token，将token存起来，通过axios请求拦截器进行拦截，每次请求的时候头部携带token

```js
  axios.interceptors.request.use(config => {
    config.headers['token'] = cookie.get('token')
    return config
  })
  axios.interceptors.response.use(res=>{},{response}=>{
    if (response.data.code === 401 || response.data.code === 402) { //token过期或者错误
        router.push('/login')
    }
  })
```

**2.路由权限控制**

存在明显缺点：菜单与路由耦合

**3.菜单权限控制**

菜单与路由分离，菜单由后端返回，或者菜单和路由都由后端返回

**4.总结**

权限需要前后端结合，前端尽可能的去控制，更多的需要后台判断