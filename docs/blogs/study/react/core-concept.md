---
title: 【react】核心概念
date: 2022-04-01
categories:
 - 学习
tags:
 - react
---

前言：本编笔记是刚毕业入职实习时（2021-03-23）记录的react笔记。

<!-- more -->

## 2.JSX简介

```javascript
const element = <h1>Hello, world!</h1>;
```

它被称为 JSX，是一个 JavaScript 的语法扩展。

### 在JSX中嵌入表达式

在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式。

### JSX 也是一个表达式

### JSX特定属性

- 你可以通过使用引号，来将属性值指定为字符串字面量：

- 也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：

注意：**因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。**

## 3.元素渲染

### 将一个元素渲染为 DOM

假设你的 HTML 文件某处有一个div：

```html
<div id="root"></div>
```

我们将其称为“根” DOM 节点，因为该节点内的所有内容都将由 React DOM 管理。

仅使用 React 构建的应用通常只有单一的根 DOM 节点。

想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 ReactDOM.render()

```javascript
const element = <h1>Hello,world</h1>;
ReactDOM.render(
    element,
    document.getElementById('root)
);
```

### 更新已渲染的元素

React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。

### React 只更新它需要更新的部分

## 4.组件 & Props

组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

### 函数组件与 class 组件

定义组件最简单的方式就是编写 JavaScript 函数：

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

还可以使用 ES6 的 class 来定义组件：

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### 渲染组件

当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。

例如，这段代码会在页面上渲染 “Hello, Sara”：

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

**注意： 组件名称必须以大写字母开头。**

### 组合组件

组件可以在其输出中引用其他组件

通常来说，每个新的 React 应用程序的顶层组件都是 App 组件。

但是，如果你将 React 集成到现有的应用程序中，你可能需要使用像 Button 这样的小组件，并**自下而上**地将这类组件逐步应用到视图层的每一处。

### 提取组件

将组件拆分为更小的组件

如果 UI 中有一部分被多次使用（Button，Panel，Avatar），或者组件本身就足够复杂（App，FeedStory，Comment），那么它就是一个可复用组件的候选项。

### Props 的只读性

任何组件都不能修改自身的props。

- 纯函数：不会更改传入参数的函数

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

## 5.State & 生命周期

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

Class 组件应该始终使用 props 参数来调用父类的构造函数。

### 将生命周期方法添加到 Class 中

![](https://upload-images.jianshu.io/upload_images/16775500-8d325f8093591c76.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/740/format/webp)

- 挂载：当组件第一次被渲染到DOM的时候

- 卸载：当组件被删除时

广义分三个阶段：挂载、渲染、卸载

可以看成两个阶段：

**一、挂载卸载过程**

1. constructor():完成数据初始化

2. componentWillMount():在constructor后，但是未渲染DOM

3. componentDidMount():组件第一次渲染完成，dom节点生成，Ajax请求

4. componentWillUnmount():

**二、更新过程**

1. componentWillReceiveProps()

2. shouldComponentUpdate(nextProps,nextState)

3. componentWillUpdate (nextProps,nextState)

4. componentDidUpdate(prevProps,prevState)


第一个钩子函数componentDidMount，这个钩子函数在组件一开始就会调用。
第二个钩子函数componentDidUpdate，这个钩子函数在数据发生改变时就会触发。

### 正确地使用 State

1. 不要直接修改 State，而是应该使用 setState()，构造函数是唯一可以给 this.state 赋值的地方：

2. State 的更新可能是异步的

3. State 的更新会被合并：当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。 **

4. 数据是向下流动的

## 6.事件处理

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。

- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

当你使用 ES6 class 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。

**绑定this：**

1. this.handleClick = this.handleClick.bind(this); 在构造函数中绑定

2. class fields 语法 

```javascript
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }
```

3. 在回调中使用箭头函数

```javascript
 <button onClick={() => this.handleClick()}>
 ```

### 向事件处理程序传递参数

在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 id 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上述两种方式是等价的，分别通过箭头函数和 Function.prototype.bind 来实现。

## 7.条件渲染

React 中的条件渲染和 JavaScript 中的一样，使用 JavaScript 运算符 if 或者条件运算符去创建元素来表现当前的状态，然后让 React 根据它们来更新 UI。

### 元素变量

使用变量来储存元素，它可以帮助你有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。

### 在 JSX 中内联条件渲染

1. 与运算符 &&

在 JavaScript 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。

2. 三目运算符

condition ? true : false。

### 阻止组件渲染

在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 render 方法直接返回 null，而不进行任何渲染。

## 8.列表 & key

### 渲染多个组件

可以通过使用 {} 在 JSX 内构建一个元素集合。

```javascript
cont numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

### 基础列表组件

通常需要在一个组件中渲染列表。

### Key

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识；

一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key；

当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key。

### 用 key 提取组件

元素的 key 只有放在就近的数组上下文中才有意义。

一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。

### key 只是在兄弟节点之间必须唯一

数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值。

## 9.表单

在 React 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同，这是因为表单元素通常会保持一些内部的 state。

### 受控组件

在 HTML 中，表单元素（如input、 textarea和 select）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

对于受控组件来说，输入的值始终由 React 的 state 驱动。

#### textarea 标签

在 HTML 中, textarea 元素通过其子元素定义其文本。而在 React 中，textarea 使用 value 属性代替。这样，可以使得使用 textarea的表单和使用单行 input 的表单非常类似。

#### select 标签

React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性。

#### 文件 input 标签

因为它的 value 只读，所以它是 React 中的一个**非受控组件**。

### 处理多个输入

当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作。

### 受控输入空值

在受控组件上指定 value 的 prop 会阻止用户更改输入。

## 10.状态提升

通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。

在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”

## 11.组合 vs 继承

React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。无需使用继承。

### 包含关系

有些组件无法提前知晓它们子组件的具体内容，建议这些组件使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中。

这使得别的组件可以通过 JSX 嵌套，将任意组件作为子组件传递给它们。

### 特例关系

## 12.React 哲学

### 第一步：将设计好的 UI 划分为组件层级

- 单一功能原则

### 第二步：用 React 创建一个静态版本

最容易的方式，是先用已有的数据模型渲染一个不包含交互功能的 UI。

最好将渲染 UI 和添加交互这两个过程分开。

在构建应用的静态版本时，我们需要创建一些会重用其他组件的组件，然后通过 props 传入所需的数据。

**props 是父组件向子组件传递数据的方式**。

即使你已经熟悉了 state 的概念，也完全不应该使用 state 构建静态版本。

state 代表了随时间会产生变化的数据，应当仅在实现交互时使用。所以构建应用的静态版本时，你不会用到它。

可以**自上而下**或者**自下而上**构建应用

- 自上而下：首先编写层级较高的组件（应用比较简单时）

- 自下而上：从最基本的组件开始编写（较为大型的项目）

React 单向数据流（也叫单向绑定）的思想使得组件模块化，易于快速开发。

### 第三步：确定 UI state 的最小（且完整）表示

1. 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。

2. 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。

3. 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。

### 第四步：确定 state 放置的位置

对于应用中的每一个 state：

- 找到根据这个 state 进行渲染的所有组件。

- 找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。

- 该共同所有者组件或者比它层级更高的组件应该拥有该 state。

- 如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。

### 第五步：添加反向数据流

由于 state 只能由拥有它们的组件进行更改，FilterableProductTable 必须将一个能够触发 state 改变的回调函数（callback）传递给 SearchBar。

我们可以使用输入框的 onChange 事件来监视用户输入的变化，并通知 FilterableProductTable 传递给 SearchBar 的回调函数。然后该回调函数将调用 setState()，从而更新应用。
