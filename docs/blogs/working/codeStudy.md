---
title: 【工作记录】代码整理
date: 2022-08-11
sidebar: true
categories:
 - 工作记录
tags:
 - 代码整理
---

## uni-app

### 整体布局

pages/index

内容

底部导航栏

**新知识**

1、getCurrentInstance：获取当前组件的实例、上下文来操作router和vuex等

```js
import { getCurrentInstance } from 'vue';
// 获取当前组件实例
const instance = getCurrentInstance();

// 获取当前组件的上下文，下面两种方式都能获取到组件的上下文。
const { ctx }  = getCurrentInstance();  //  方式一，这种方式只能在开发环境下使用，生产环境下的ctx将访问不到
const { proxy }  = getCurrentInstance();  //  方式二，此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）
// ctx 中包含了组件中由ref和reactive创建的响应式数据对象,以及以下对象及方法;
proxy.$attrs
proxy.$data
proxy.$el
proxy.$emit
proxy.$forceUpdate
proxy.$nextTick
proxy.$options
proxy.$parent
proxy.$props
proxy.$refs
proxy.$root
proxy.$slots
proxy.$watch
```

2、uni.login

3、uni.getUpdateManager() 管理小程序更新

- uni.canIUse(String) 判断应用的API，回调，参数，组件是否在当前版本可用。
- uni.getUpdateManager() 本API返回全局唯一的版本更新管理器对象： updateManager，用于管理小程序更新。
- updateManager 对象的方法列表：
  
>(1).**onCheckForUpdate** ; callback ; 当向小程序后台请求完新版本信息，会进行回调
>(2).**onUpdateReady** ; callback ; 当新版本下载完成，会进行回调
>(3).**onUpdateFailed** ; callback ; 当新版本下载失败，会进行回调
>(4).**applyUpdate** 当新版本下载完成，调用该方法会强制当前小程序应用上新版本并重启

在onShow()中调用

```js
// 获取小程序更新机制兼容
if (uni.canIUse('getUpdateManager')) {
        let _this = this
        const updateManager = uni.getUpdateManager()
        // 检查是否有新版本发布
        updateManager.onCheckForUpdate(function(res) {
           console.log(res.hasUpdate) // true
            if (res.hasUpdate) {
                //小程序有新版本，则静默下载新版本，做好更新准备
                updateManager.onUpdateReady(function() {
                    uni.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success: function(res) {
                            if (res.confirm) {
                                //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager.applyUpdate()
                            } else if (res.cancel) {
                                //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                                uni.showModal({
                                    title: '温馨提示',
                                    content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                                    showCancel: false, //隐藏取消按钮，也可显示，取消会走res.cancel，然后从新开始提示
                                    success: function(res) {
                                        //第二次提示后，强制更新
                                        if (res.confirm) {
                                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                            updateManager.applyUpdate()
                                        } else if (res.cancel) {
                                            //重新回到版本更新提示
                                            _this.autoUpdate()
                                        }
                                    }
                                })
                            }
                        }
                    })
                })
                  // 新的版本下载失败
                updateManager.onUpdateFailed(function() {
                    uni.showModal({
                        title: '温馨提示',
                        content: '新版本已经上线，请您删除当前小程序，重新搜索打开',
                    })
                })
            }
        })
    } else {
        // 提示用户在最新版本的客户端上体验
        uni.showModal({
            title: '温馨提示',
            content: '当前微信版本过低，可能无法使用该功能，请升级到最新版本后重试。'
        })
    }

```

4、css属性：env()和constant()设置安全区域

env()和constant()，是IOS11新增特性，Webkit的css函数，用于设定安全区域与边界的距离，有4个预定义变量：

- safe-area-inset-left：安全区域距离左边边界的距离
- safe-area-inset-right：安全区域距离右边边界的距离
- safe-area-inset-top：安全区域距离顶部边界的距离
- safe-area-inset-bottom ：安全距离底部边界的距离

env()和constant()函数有个必要的使用前提，H5网页设置viewport-fit=cover的时候才生效，小程序里的viewport-fit默认是cover。

```css
page{
  padding-bottom: calc( constant(safe-area-inset-bottom) + 150rpx);
  padding-bottom: calc( env(safe-area-inset-bottom) + 150rpx);
}

/* not 表示不支持括号内的属性 */
@supports not(constant(safe-area-inset-bottom)){
  page{
    padding-bottom: 150rpx;
  }
}
```

### 首页

pages/tabBar/home

