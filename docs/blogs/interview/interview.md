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

