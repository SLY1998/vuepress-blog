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
console.log(c);// 输出 2
```
8. void
9. null
10. undefined
```ts
// 启用 --strictNullChecks
let x: number;
x = 1; // 编译正确
x = undefined;    // 编译错误
x = null;    // 编译错误
// 上面的例子中变量 x 只能是数字类型。如果一个类型可能出现 null 或 undefined， 可以用 | 来支持多种类型，示例代码如下：
// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1; // 编译正确
x = undefined;    // 编译正确
x = null;    // 编译正确
```
11. never：never 是其它类型（包括 null 和 undefined）的子类型，代表不会出现的值，这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）。

### 变量声明

TypeScript 变量的命名规则：
- 变量名称可以包含数字和字母
- 除了下划线 _ 和美元 $ 符号外，不能包含其他特殊字符，包括空格
- 变量名不能以数字开头

#### 类型断言
类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型

语法格式为：**<类型>值** 或 **值 as 类型**

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

## 20220802

### 运算符

ts主要包括以下几种运算：

- 算术运算符
- 逻辑运算符
- 关系运算符
- 按位运算符
- 赋值运算符
- 三元、条件运算符
- 字符串运算符
- 类型运算符

### 函数

```ts
// 函数返回值
function function_name():return_type { 
    // 语句
    return value; 
}

// 带参数函数
function func_name( param1 [:datatype], param2 [:datatype]) {   
}

function add(x: number, y: number): number {
    return x + y;
}
console.log(add(1,2))

// 可选参数
// 可选参数必须跟在必需参数后面。
// 如果我们定义了参数，则我们必须传入这些参数，除非将这些参数设置为可选，可选参数使用问号标识 ？。
function buildName(firstName: string, lastName?: string): string {
    if (lastName){
      return firstName + " " + lastName;
    }
    else{
      return firstName;
    }
}
 
let result1 = buildName("Bob");  // 正确
let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
let result3 = buildName("Bob", "Adams");  // 正确

// 默认参数
// 参数不能同时设置为可选和默认
function function_name(param1[:type],param2[:type] = default_value) { 
}

// 剩余参数
// 剩余参数语法允许我们将一个不确定数量的参数作为一个数组传入
// 函数的最后一个命名参数 restOfName 以 ... 为前缀，它将成为一个由剩余参数组成的数组，索引值从0（包括）到 restOfName.length（不包括）
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

// 匿名函数
var res = function( [arguments] ) { ... }

// 匿名函数自调用
(function () { 
    var x = "Hello!!";   
    console.log(x)     
 })()
```

### 类

```ts
class Car { 
   // 字段
   engine:string; 
   
   // 构造函数
   constructor(engine:string) { 
      this.engine = engine 
   }  
   
   // 方法
   disp():void { 
      console.log("函数中显示发动机型号  :   "+this.engine) 
   } 
} 
 
// 创建一个对象
var obj = new Car("XXSY1")
 
// 访问字段
console.log("读取发动机型号 :  "+obj.engine)  
 
// 访问方法
obj.disp()

```

### 命名空间

```ts
namespace SomeNameSpaceName { 
   export interface ISomeInterfaceName {      }  
   export class SomeClassName {      }  
}
```

如果一个命名空间在一个单独的 TypeScript 文件中，则应使用三斜杠 /// 引用它，语法格式如下：
```ts
/// <reference path = "SomeFileName.ts" />
```

例如：

```ts
// IShape.ts 文件代码：
namespace Drawing { 
    export interface IShape { 
        draw(); 
    }
}

// Circle.ts 文件代码：
/// <reference path = "IShape.ts" /> 
namespace Drawing { 
    export class Circle implements IShape { 
        public draw() { 
            console.log("Circle is drawn"); 
        }  
    }
}

// Triangle.ts 文件代码：
/// <reference path = "IShape.ts" /> 
namespace Drawing { 
    export class Triangle implements IShape { 
        public draw() { 
            console.log("Triangle is drawn"); 
        } 
    } 
}

// TestShape.ts 文件代码：
/// <reference path = "IShape.ts" />   
/// <reference path = "Circle.ts" /> 
/// <reference path = "Triangle.ts" />  
function drawAllShapes(shape:Drawing.IShape) { 
    shape.draw(); 
} 
drawAllShapes(new Drawing.Circle());
drawAllShapes(new Drawing.Triangle());
```