---
title: 【计算机基础】JavaScript设计模式与开发实践笔记
date: 2022-04-02
sidebar: true
categories:
- 学习
tags:
- 计算机基础
---

>前言：找出程序中变化的地方，并将变化封装起来

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

#### 2.2.1 call和apply的区别

区别仅在于传入参数形式的不同

```js
  func.apply( null, [ 1, 2, 3 ] );
  func.call( null, 1, 2, 3 );
```

#### 2.2.2 call和apply的用途

**1、改变this的指向**

**2、借用其他对象的方法**

## 第三章 闭包和高阶函数

