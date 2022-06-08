---
title: 【计算机基础】JavaScript设计模式与开发实践笔记
date: 2022-04-02
sidebar: true
categories:
- 学习
tags:
- 计算机基础
---

前言：找出程序中变化的地方，并将变化封装起来

<!-- more -->

七大基本原则：

1. 单一职责原则（SRP）
2. 开放-关闭原则（OCP）
3. 里氏替换原则（LSP）
4. 依赖倒转原则（DIP）
5. 接口隔离原则（ISP）
6. 迪米特法则（LOD）又称最少知道原则
7. 组合、聚合复用原则（CRP）

# 第一部分：基础知识

## 第一章 面向对象的JavaScript

### 1.1&&1.2 动态类型语言、多态（与生俱来）

### 1.3 封装

**1.3.1 封装数据**

依赖变量的作用域实现封装特性：public、private

```javaScript
var myObj = (function(){
    var _name = 'tom' // privite
    return {
        getName: function(){ // public
            return _name;
        }
    }
})();
console.log(myObj.getName); // tom
console.log(myObj._name); // undefined
```

**1.3.2 封装实现**

**1.3.3 封装类型**

封装类型是静态类型语言中一种重要的封装方式。一般而言，封装类型是通过抽象类和接口来进行的。在 JavaScript 中，并没有对抽象类和接口的支持。对于 JavaScript 的设计模式实现来说，不区分类型是一种失色，也可以说是一种解脱。

**1.3.3 封装变化**


### 1.4 原型模式和基于原型继承的JavaScript对象系统

#### 1.4.1 使用克隆的原型模式

原型模式是用于创建对象的一种模式。原型模式的实现关键，是语言本身是否提供了clone方法。

>克隆是创建对象的手段

#### 1.4.4 原型编程泛型的一些规则

原型编程范型至少包括以下基本规则：

- 所有的数据都是对象。
>我们不能说在 JavaScript 中所有的数据都是对象，但可以说绝大部分数据都是对象。
- 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它。
>当使用 new 运算符来调用函数时，此时的函数就是一个构造器。 用new 运算符来创建对象的过程，实际上也只是先克隆 Object.prototype 对象，再进行一些其他额外操作的过程。
- 对象会记住它的原型。
>JavaScript 给对象提供了一个名为__proto__的隐藏属性，某个对象的__proto__属性默认会指向它的构造器的原型对象，即{Constructor}.prototype。实际上，__proto__就是对象跟“对象构造器的原型”联系起来的纽带。
- 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。
```javaScript
var obj = {name:"tom"};
var A = function(){};
A.prototype = obj;

var a = new A();
console.log(a.name); // tom
```

1. 首先，尝试遍历对象 a 中的所有属性，但没有找到 name 这个属性;
2. 查找 name 属性的这个请求被委托给对象 a 的构造器的原型，它被 a.__proto__记录着并且指向 A.prototype，而 A.prototype 被设置为对象 obj;
3. 在对象 obj 中找到了 name 属性，并返回它的值。

## 第二章 this、call和apply

### 2.1 this

js的this总是指向一个对象，具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而不是函数被声明时的环境。

#### 2.1.1 this的指向

函数中this的指向大致可分为四种情况
1. 函数作为对象的方法调用
2. 函数作为普通函数调用

```js
    window.name = "globalName";
    const obj = {
		name:"myName",
		getMyName(){
			console.log(this.name)
		}
	}
    // 1、作为对象方法被调用，this指向该对象
	obj.getMyName() // myName
	const getName = obj.getMyName
    // 2、作为普通函数被调用，this指向全局对象。在浏览器的js中，就是window对象。
	getName() // globalName
```

3. 函数作为构造函数调用

>构造器的外表跟普通函数一模一样，它们的区别在于被调用的方式

**当用new运算符调用函数时，该函数总会返回一个对象，通常情况下，构造器里的this就指向这个对象。**

```js
    var myClass = function () {
        this.name = "sly"
    }
  const a = new myClass();
  console.log(a.name) // sly
```

注意：_如果构造器显示的返回了一个object类型的对象，那么它此次运算结果最终会返回这个对象_

4. Function.prototype.call或Function.prototype.apply调用

可以动态的改变传入函数的this

#### 2.1.2 丢失的this

下面这段代码在浏览器中运行会报错，**为什么呢？**

```js
 <body> 
    <div id="div1">我是一个 div</div> 
 </body> 
 <script> 
    var getId = document.getElementById; 
    getId( 'div1' ); 
 </script> 
</html>
```
>原因：在许多引擎中的document.getElementById 方法的内部实现中需要用到 this。这个 this 本来被期望指向document，当 getElementById 方法作为 document 对象的属性被调用时，方法内部的 this 确实是指向 document 的。但当用 getId 来引用 document.getElementById 之后，再调用 getId，此时就成了普通函数调用，函数内部的 this 指向了 window，而不是原来的 document。

- 解决办法
  
```js
// 1
var getId = function( id ){ 
  return document.getElementById( id ); 
};

// 2、利用 apply 把 document 当作 this 传入 getId 函数，帮助“修正”this：
document.getElementById = (function(func){
  return function(){
      return func.apply(document, arguments)
  }
})(document.getElementById)

var getId = document.getElementById;

```

### 2.2 call和apply

调用一个对象的方法，用另一个对象替换当前对象，可以继承另外一个对象的属性。

#### 2.2.1 call和apply的区别

区别仅在于传入参数形式的不同

- apply()方法接收两个参数，一个是函数运行的作用域（this），另一个是参数数组。
- call()方法不一定接受两个参数，第一个参数也是函数运行的作用域（this），但是传递给函数的参数必须列举出来。


```js
  func.apply( null, [ 1, 2, 3 ] );
  func.call( null, 1, 2, 3 );
```

#### 2.2.2 call和apply的用途

**1、改变this的指向**

**2、借用其他对象的方法**

_apply有一个巧妙的用处,就是可以**将一个数组默认的转换为一个参数列表**([param1,param2,param3]转换为param1,param2,param3)，借助apply的这点特性，所以就有了以下高效率的方法：_

因为Math.max(Math.min)参数里面不支持Math.max([param1,param2])，也就是数组，但是它支持Math.max(param1,param2,param3…)，所以可以根据apply的那个特点来解决：

```js
var array = [1, 2, 3];
var max = Math.max.apply(null, array);
console.log(max);//3
```



## 第三章 闭包和高阶函数

### 3.1 闭包

#### 3.1.2 变量的生存周期

局部变量随着函数的调用结束而被销毁

下面介绍一个闭包的经典应用：假设页面上有 5 个div 节点，我们通过循环来给每个 div 绑定 onclick 事件，按照索引顺序，点击第 1 个 div 时弹出0，点击第 2 个 div 时弹出 1，以此类推。代码如下：

```js
<html> 
  <body> 
   <div>1</div> 
   <div>2</div> 
   <div>3</div> 
   <div>4</div> 
   <div>5</div> 
  <script> 
    var nodes = document.getElementsByTagName( 'div' ); 
    for ( var i = 0, len = nodes.length; i < len; i++ ){ 
      nodes[ i ].onclick = function(){ 
       alert ( i ); 
      } 
    }; 
  </script> 
 </body> 
</html>
```
运行这段代码，点击第一个div

>弹出结果是？_无论点击哪一个，弹出结果都是5_

>原因？_节点的点击事件是被异步触发的，当事件被触发的时候，for循环早已经结束，此时i===5_

>解决办法？利用闭包，把每次循环的i值封闭起来

```js
 for ( var i = 0, len = nodes.length; i < len; i++ ){ 
   (function(i){
      nodes[ i ].onclick = function(){ 
        alert ( i ); 
      } 
   })(i)
  }; 
```

#### 3.1.3 闭包的更多作用

**1.封装变量**

提炼函数是代码重构中的一种常见技巧。独立出来的小函数有助于代码复用，如果这些小函数有一个良好的命名，它们本身也起到了注释的作用。_如果这些小函数不需要在程序的其他地方使用，最好是把它们用闭包封闭起来。_

**2.延续局部变量的寿命**
#### 3.1.4 闭包和面向对象设计

过程与数据的结合是形容面向对象中的“对象”时经常使用的表达。对象以方法的形式包含
了过程，而闭包则是在过程中以环境的形式包含了数据。通常用面向对象思想能实现的功能，用闭包也能实现。

```js
  // 闭包
  var extent = function(){
    var value = 0;
    return {
      call:function(){
        value++;
        console.log(value)
      }
    }
  }
  var extent = extent();
  extent.call() // 1
  extent.call() // 2
  extent.call() // 3

  // 面向对象
  var extent = {
    value:0,
    call:function(){
      this.value++;
      console.log(this.value)
    }
  };
  extent.call() // 1
  extent.call() // 2
  extent.call() // 3
```

#### 3.1.5 用闭包实现命令模式

命令模式的意图是把请求封装为对象，从而分离请求的发起者和请求的执行者之间的耦合关系。

```js
   <button id="execute">点击我执行命令</button> 
   <button id="undo">点击我执行命令</button>

   // 封装为对象
   var Tv = {
     open:function(){
       console.log("打开电视机")
     },
     close:function(){
       console.log("关闭电视机")
     }
   }
   // 创建命令
   var creatCommand = function(receiver){
     var execute = function(){
       return receiver.open()
     };
     var undo = function(){
       return receiver.close()
     }
     return {
       execute,
       undo
     }
   }
   // 发起命令
   var setCommand = function(command){
     document.getElementById( 'execute' ).onclick = function(){ 
       command.execute(); // 输出：打开电视机
    } 
     document.getElementById( 'undo' ).onclick = function(){ 
       command.undo(); // 输出：关闭电视机
    }
   }
   setCommand(creatCommand(Tv))
```

>拓展：在 IE 浏览器中，由于 BOM 和 DOM 中的对象是使用 C++以 COM 对象的方式实现的，而 COM 对象的垃圾收集机制采用的是引用计数策略。在基于引用计数策略的垃圾回收机制中，如果两个对象之间形成了循环引用，那么这两个对象都无法被回收。

### 3.2 高阶函数

高阶函数是指至少满足下列条件之一的函数

- 函数可以作为参数被传递
- 函数可以作为返回被输出

# 第二部分 设计模式

## 第四章 单例模式

保证一个类仅有一个实例，并提供一个访问它的全局访问点

### 4.4 JavaScript中的单例模式

全局变量不是单例模式，但在 JavaScript 开发中，我们经常会把全局变量当成单例来使用。

以下几种方式可以相对降低全局变量带来的命名污染：

1. 使用命名空间

2. 使用闭包封装私有变量
### 4.5 惰性单例

与全局变量结合实现惰性的单例

```js
 var getSingle = function(fn){
    var result;
    return function(){
      return result||result = fn.apply(this,arguments);
    }
 }
 var createLoginLayer = function(){ 
   var div = document.createElement( 'div' ); 
   div.innerHTML = '我是登录浮窗'; 
   div.style.display = 'none'; 
   document.body.appendChild( div ); 
   return div; 
}; 
 var createSingleLoginLayer = getSingle( createLoginLayer ); 
 document.getElementById( 'loginBtn' ).onclick = function(){ 
   var loginLayer = createSingleLoginLayer(); 
   loginLayer.style.display = 'block'; 
};

```

## 第五章 策略模式

定义一系列的算法，把它们一个个封装起来，并且使他们可以相互替换。

一个基于策略模式的程序至少由两部分组成。第一部分是一组策略类，第二部分是环境类。

### 5.2 JavaScript版本的策略模式

```js
    var strategies = {
      "S":function(salary){
        return salary*4;
      },
      "A":function(salary){
        return salary*3;
      },
      "B":function(salary){
        return salary*2;
      },
    };
    var calculateBonus = function(level,salary){
      return strategies[level](salary);
    }
    console.log( calculateBonus( 'S', 20000 ) ); // 输出：80000
```

## 第六章 代理模式

### 6.3 虚拟代理实现图片预加载

```js
  var myImage = (function(){
    var imgNode = document.createElement("img");
		document.body.appendChild(imgNode);
    return {
      setSrc: function(src) {
				imgNode.src = src
			}
    }
  })()

  var proxyImage = (function(){
		var img = new Image;
		img.onload = function(){
			myImage.setSrc(this.src)
		}
		return {
			setSrc:function(src){
				myImage.setSrc("./imgs/序列_00000.png")
				img.src = src
			}
		}
	})()

  proxyImage.setSrc("https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wyUh?ver=322d")
```

### 6.8 缓存代理

缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次计算时，如果传递进来的参数与之前一致，则可以直接返回之前存储的运算结果。

```js
   var mult = function(){
     console.log("mult")
     var a = 1;
     for(var i = 0;l = arguments.length;i < l; i++) {
       a = a*arguments[i];
     }
     return a
   }

   var proxyMult = (function(){
     var cache = {};
     return function(){
       var args = Array.prototype.join.call(arguments,",");
       if(args in cache){
         return cache[args]
       }
       return cache[args] = mult.apply(this,arguments)
     }
  })()

  proxyMult(1,2,3,4) // 24
  proxyMult(1,2,3,4) // 24 但是没有调用mult
```

## 第七章 迭代器模式

迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

迭代器模式是一种相对简单的模式，简单到很多时候我们都不认为它是一种设计模式。目前的绝大部分语言都内置了迭代器。

## 第八章 发布-订阅模式

发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们一般用事件模型来替代传统的发布—订阅模式。

### 如何实现发布-订阅模式？

**1. 实现思路**

- 创建一个对象
- 在该对象上创建一个缓存列表（调度中心）
- on 方法用来把函数 fn 都加到缓存列表中（订阅者注册事件到调度中心）
- emit 方法取到 arguments 里第一个当做 event，根据 event 值去执行对应缓存列表中的函数（发布者发布事件到调度中心，调度中心处理代码）
- off 方法可以根据 event 值取消订阅（取消订阅）
- once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）

**2. demo**

```js
let eventEmitter = {
    // 缓存列表
    list: {},
    // 订阅
    on (event, fn) {
        let _this = this;
        // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
        // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
        (_this.list[event] || (_this.list[event] = [])).push(fn);
        return _this;
    },
    // 监听一次
    once (event, fn) {
        // 先绑定，调用后删除
        let _this = this;
        function on () {
            _this.off(event, on);
            fn.apply(_this, arguments);
        }
        _this.on(event, on);
        return _this;
    },
    // 取消订阅
    off (event, fn) {
        let _this = this;
        let fns = _this.list[event];
        // 如果缓存列表中没有相应的 fn，返回false
        if (!fns) return false;
        if (!fn) {
            // 如果没有传 fn 的话，就会将 event 值对应缓存列表中的 fn 都清空
            fns && (fns.length = 0);
        } else {
            // 若有 fn，遍历缓存列表，看看传入的 fn 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
            let cb;
            for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
                cb = fns[i];
                if (cb === fn || cb.fn === fn) {
                    fns.splice(i, 1);
                    break
                }
            }
        }
        return _this;
    },
    // 发布
    emit () {
        let _this = this;
        // 第一个参数是对应的 event 值，直接用数组的 shift 方法取出
        let event = [].shift.call(arguments),
            fns = [..._this.list[event]];
        // 如果缓存列表里没有 fn 就返回 false
        if (!fns || fns.length === 0) {
            return false;
        }
        // 遍历 event 值对应的缓存列表，依次执行 fn
        fns.forEach(fn => {
            fn.apply(_this, arguments);
        });
        return _this;
    }
};

function user1 (content) {
    console.log('用户1订阅了:', content);
}

function user2 (content) {
    console.log('用户2订阅了:', content);
}

function user3 (content) {
    console.log('用户3订阅了:', content);
}

function user4 (content) {
    console.log('用户4订阅了:', content);
}

// 订阅
eventEmitter.on('article1', user1);
eventEmitter.on('article1', user2);
eventEmitter.on('article1', user3);

// 取消user2方法的订阅
eventEmitter.off('article1', user2);

eventEmitter.once('article2', user4)

// 发布
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');

// eventEmitter.on('article1', user3).emit('article1', 'test111');

/*
    用户1订阅了: Javascript 发布-订阅模式
    用户3订阅了: Javascript 发布-订阅模式
    用户1订阅了: Javascript 发布-订阅模式
    用户3订阅了: Javascript 发布-订阅模式
    用户4订阅了: Javascript 观察者模式
*/

```

## 第九章 命令模式

### 9.1 命令模式的用途

