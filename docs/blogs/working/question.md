---
title: 【工作记录】问题总结
date: 2022-05-06
sidebar: true
categories:
 - 工作记录
tags:
 - 问题总结
---

## 【dva】 关闭当前tab页，存储在局部model中的数据没有被清空（2020.5.6）

### 问题出现原因

以为umi框架中，写在某个页面文件夹下的model中的数据，会随着页面的销毁自动回到初始值状态

实际上：**局部模型定义在pages文件夹或其子文件夹中，在哪个文件夹定义的模型，会被该文件夹中的所有页面以及子页面、以及该文件夹的祖先文件夹中的页面所共享。** 理论上如果没有手动清空或刷新页面，数据会一直存在。

### 解决办法

当然是在进入页面是调用清空页面数据的方法手动清空数据

>例如：B页面数据需要在一开始的时候为空，那么A页面跳转到B页面时，就要调用clear方法清空数据

现在model.js文件在B页面文件夹下

```js
    // model.js
    namespace:"pageBmodel"
    // ...
    effects:{
        *clearAllData({callback},{ call, put }){
             yield put({
                type:"clear"
             });
             callback()
        }
    },
    reducers: {
        clear(state) { 
           return { 
            ...state, 
            // 数据置空
            data:[]
           };
        }
    },
    // ...
```

A页面在跳转操作前，先调用clearAllData

```js
  // A页面.jsx
  import { useDispatch } from "umi"
  // ...
  const dispatch = useDispatch()
  // 跳转页面方法
  const gotoPageB = ()=>{
      dispatch({
          type:"pageBmodel/clearAllData",
          callback:()=>{
              // 跳转页面操作
          }
      })
  }
  // ...
```
