---
title: 【前端基础】typeScript
date: 2022-03-31
sidebar: true
categories:
 - 学习
tags:
 - typeScript
 - 前端基础
---

前言：ts学习提上日程

## 20220304

### 基础语法🌼
TypeScript程序由以下几个部分组成：
- 模块
- 函数
- 变量
- 语句和表达式
- 注释

tsc常用编译参数如下表所示：
- --help 显示帮助信息
- --removeComments 删除文件的注释
- --out 编译多个文件并合并到一个输出文件
- --sourcemap 生成一个 sourcemap (.map) 文件
- --watch 在监视模式下运行编译器，会监视输出文件，在它们改变时重新编译

### 基础类型
1. any：声明为 any 的变量可以赋予任意类型的值
适用场景：
- 变量的值会动态改变
- 改写现有代码
- 定义存储各种类型数据的数组时
2. number
3. string
4. boolean
5. 数组类型
``` typeScript
// 在元素类型后面加上[]
let arr:number[] = [1,2]
// 或者使用数组泛型
let arr1:Array<number> = [1,2]
```
6. 元组：元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同
```typeScript
let x: [string, number];
x = ['Runoob', 1];    // 运行正常
x = [1, 'Runoob'];    // 报错
console.log(x[0]);    // 输出 Runoob
```
7. enum：枚举类型用于定义数值集合
```typeScript
enum Color {Red,Green,Blue};
let c:Color = Color.Blue;
console.log(c);
```
8. void
9. null
10. undefined
11. never：代表不会出现的值

### 变量声明
#### 类型断言
类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型

## 20220325

### 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

- 什么是声明文件：通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件
- 声明文件必需以 .d.ts 为后缀。

### 书写声明文件

在不同的场景下，声明文件的内容和使用方式会有所区别，库的使用场景主要有以下几种：
1. 全局变量：通过script标签引入第三方库，注入全局变量。
2. npm包：通过import foo from "foo"导入，符合ES6模块规范。
3. UMD库：既可以通过script标签引入，又可以通过import导入。
4. 直接扩展全局变量：通过 script 标签引入后，改变一个全局变量的结构。
5. 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构。
6. 模块插件：通过 script 或 import 导入后，改变另一个模块的结构 

## 20220328

### 内置对象

#### ECMAScript 的内置对象

Boolean、Error、Date、RegExp等

```typeScript
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

#### BOM 和 DOM 的内置对象

Document、HTMLElement、Event、NodeList 等。

```typeScript
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```