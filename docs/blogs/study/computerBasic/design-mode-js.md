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