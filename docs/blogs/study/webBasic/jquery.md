---
title: 【前端基础】jquery
date: 2022-04-06
sidebar: true
categories:
 - 学习
tags:
 - jquery
 - 前端基础
---

## 一、语法

- $(selector).action()

- selector 选择符 查询和查找 HTML元素

## 二、选择器

- 元素选择器

$("button")

- id选择器

$("#button")

- class选择器

$(".button")

## 三、事件及常用事件方法

事件：页面对不同访问者的响应

```javascript
$("p").click(function(){
     //函数体
});
```

常见的DOM事件：（原生JS由on开头）

1. 鼠标事件：click、dblclick、mouseenter、mouseleave
2. 键盘事件：keypress、keydown、keyup
3. 表单事件：submit、change、focus、blur
4. 文档/窗口事件：load、resize、scroll、unload

常用事件方法：

- $(document).ready() 允许我们在文档完全加载完后执行函数。

- click():当按钮点击事件被触发时会调用一个函数

```javascript
$("p").click(function(){
    $(this).hide();
});
```

- dblclick():当双击元素时，会发生dblclick事件

```javascript
$("p").dblclick(function(){
    $(this).hide();
});
```

- mouseenter():当鼠标指针穿过元素时，会发生mouseenter事件

```javascript
$("#p1").mouseenter(function(){
    alert("您的鼠标移到了id='p1'的元素上！");
});
```

- mouseleave():当鼠标指针穿过元素时，会发生mouseleave事件

```javascript
$("#p1").mouseleave(function(){
    alert("再见，您的鼠标离开了该段落！");
});
```

- mousedown():当鼠标指针移动到元素上方，并按下鼠标按键时，会发生mousedown事件

```javascript
$("#p2").mousedown(function(){
    alert("鼠标在该段落上按下！");
});
```

- mouseup():当在元素上松开鼠标时，会发生mouseup事件

```javascript
$("#p2").mouseup(function(){
    alert("鼠标在该段落上松开！");
});
```

- hover():用于模拟光标悬停事件

当鼠标移动到元素上时，会触发指定的第一个函数mouseenter()，当鼠标移出这个元素时，会触发指定的第二个函数mouseleave()

```javascript
$("#p2").hover(
    function(){
    alert("你进入了p2");
    },
    function(){
    alert("拜拜，现在你离开了p2");
    }
);
```

- focus():当元素获得焦点时，会发生focus事件

当通过鼠标点击选中的元素或通过tab键定位到元素时，该元素会获得焦点

```javascript
$("input").focus(function(){
    $(this).css("background-color","red");
});
```

## 四、效果

**显隐效果**

- hide()
- show()
- toggle():显示被隐藏的元素，并隐藏已显示的元素

事实上，这三个函数都有两个参数：

hide(speed,callback);

show(speed,callback);

toggle(speed,callback);

**淡入淡出**

- fadeIn()
- fadeOut()
- fadeToggle()
- fadeTo() : 有透明度

**滑动**

- slideDown()
- slideUp()
- slideToggle()

**动画**

- animate()

$(selector).animate({params},speed,callback);

必须的params参数，定义形成动画的CSS属性

**停止动画**

- stop()

$(selector).stop(stopALL,goEnd);

**链式编程**

```javaScript
$('#p1').css("color","red")
        .slidUp(2000)
        .slidDown(2000)
```

## 五、jQuery HTML

### 5.1 捕获

- text() 文本
- html() 文本
- val()  表单value
- attr("属性") 获得属性值
 
### 5.2 设置

- text("值")
- html("值")
- val("值")
- attr("属性","属性值")

### 5.3 添加元素

- append()：在被选中元素的结尾插入内容
- prepend()：在被选中元素的开头插入内容
- after()：在被选中元素之后插入内容
- before()：在被选中元素之前插入内容

### 5.4 删除元素

- remove()：删除被选元素（及其子元素）

$(selector).remove("条件")其中条件可选

- empty()：从被选元素中删除子元素

### 5.5 CSS类

- addClass()：向被选中的元素添加一个或多个类
- removeClass()：从被选元素删除一个或多个类
- toggleClass()：对被选中元素进行添加或删除类的切换操作
- css()：设置或返回样式属性

### 5.6 尺寸

## 六、jQuery遍历

### 6.2 祖先jQuery parent()方法

parent()方法返回被选元素的直接父元素

该方法只会向上一级对DOM树进行遍历

parents("可选参数")方法返回被选元素的所有祖先元素，它一路向上直到文档的根元素

parentsUntil()方法返回介于两个给定元素之间的所有祖先元素

### 6.3 后代jQuery children()方法

children("可选参数")方法返回被选元素的所有直接子元素

find()方法返回被选元素的后代元素，一路向下直到最后一个后代

### 6.4 同胞jQuery siblings()方法

siblings("可选参数")方法返回被选元素的所有同胞元素

next()方法返回被选元素的下一个同胞元素

nextAll()方法返回被选元素的所有跟随的同胞元素

nextUntil()方法返回介于两个给定参数之间的所有跟随的同胞元素

prev()方法取得一个包含匹配的元素集合中的每一个元素紧邻的前一个同辈元素的元素集合

prevAll()方法查找当前元素之前的所有同胞元素

### 6.5 过滤jQuery first()方法

first()方法返回被选元素的首个元素

last()

eq()方法返回被选元素带有指定索引号的元素

filter("参数")允许规定一个标准并匹配

not("参数")与filter相反

## 七、jQuery ajax

### 7.1 ajax简介

ajax = 异步 JavaScript 和 XML (Asynchronous javaScript and XML)

简单地说，在不重载整个页面的情况下，ajax通过后台加载数据，并在网页上进行显示

### 7.2 get和post方法

$.get(url,[data],[callback],[type]):通过http get 请求从服务器上请求数据

$.post(url, [data], [callback], [type]):通过http post 请求从服务器上请求数据

### ajax()方法

