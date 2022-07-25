---
title: 【flutter】基础知识
date: 2022-06-22
sidebar: true
categories:
 - 学习
tags:
 - flutter
---

## 第一章 起步

### 1.1 移动开发技术简介

#### 1.1.1 原生开发与跨平台技术

**1.原生开发**

原生应用程序是指某一个移动平台（比如iOS或安卓）所特有的应用，使用相应**平台支持的开发工具和语言**，并**直接调用系统提供的SDK API**。比如Android原生应用就是指使用Java或Kotlin语言直接调用Android SDK开发的应用程序；而iOS原生应用就是指通过Objective-C或Swift语言直接调用iOS SDK开发的应用程序。

优点：
- 可以访问平台的全部功能（GPS、摄像头）
- 速度快、性能高、可以实现复杂动画及绘制，用户体验好
  
缺点：
- 平台特定，开发成本高；不同平台必须维护不同的代码，人力成本大
- 内容固定，动态化若，大多数情况下，有新功能更新时只能发版

**2.跨平台技术**

按原理分三类

- H5+原生（Cordova、Ionic、微信小程序）
- js开发+原生渲染（React Native、Weex）
- 自绘UI+原生 (Qt for mobile、Flutter)

#### 1.1.2 Hybrid技术简介

**1.H5+原生**

动态变动内容用H5实现，通过原生的网页加载控件（Android：WebView ，iOS：WKWebView）来加载。 => **混合开发** =>**混合应用**或**HTMLybrid App**。
如果一个应用的大多数功能都是 H5 实现的话，我们称其为 Web App 。

**2.混合开发技术点**

我们把依赖于 WebView 的用于在 JavaScript 与原生之间通信并实现了某种消息传输协议的工具称之为 WebView JavaScript Bridge , 简称 JsBridge，它也是混合开发框架的核心。

#### 1.1.3 React Native、Weex

**1.js开发+原生渲染**

RN 使用JSX 语言（扩展后的 JavaScript，主要是可以在 JavaScript 中写 HTML标签）和 CSS 来开发移动应用

RN 中虚拟 DOM会通过 JavaScriptCore 映射为原生控件。

#### 1.1.4 Qt Mobile

**1. 自绘UI + 原生**

通过在不同平台实现一个统一接口的渲染引擎来绘制UI，而不依赖系统原生控件

#### 1.1.6 小结

|       技术类型        |   UI渲染方式    | 性能  |    开发效率     |   动态化   |    框架代表    |
| :-------------------: | :-------------: | :---: | :-------------: | :--------: | :------------: |
|       H5 + 原生       |   WebView渲染   | 一般  |       高        |    支持    | Cordova、Ionic |
| JavaScript + 原生渲染 |  原生控件渲染   |  好   |       中        |    支持    |    RN、Weex    |
|     自绘UI + 原生     | 调用系统API渲染 |  好   | Flutter高, Qt低 | 默认不支持 |  Qt、Flutter   |

### 1.2 Flutter简介

#### 1.2.2 Flutter框架结构

从上到下：框架层、引擎层、嵌入层

![](https://book.flutterchina.club/assets/img/1-1.82c25693.png)

**1.框架层**

这是一个纯Dart实现的SDK

- 底下两层（Foundation 和 Animation、Painting、Gestures）在 Google 的一些视频中被合并为一个**dart UI层**，对应的是Flutter中的**dart:ui**包，它是 Flutter Engine 暴露的底层UI库，提供动画、手势及绘制能力。
- Rendering 层，即**渲染层**，这一层是一个抽象的布局层，它依赖于 Dart UI 层，渲染层会构建一棵由可渲染对象的组成的渲染树，当动态更新这些对象时，渲染树会找出变化的部分，然后更新渲染。渲染层可以说是Flutter 框架层中最核心的部分，它除了确定每个渲染对象的位置、大小之外还要进行坐标变换、绘制（调用底层 dart:ui ）。
- Widgets 层是 Flutter 提供的的一套**基础组件库**，在基础组件库之上，Flutter 还提供了 Material 和 Cupertino 两种视觉风格的组件库，它们分别实现了 Material 和 iOS 设计规范。

**2.引擎层**

Engine，即引擎层。毫无疑问是 Flutter 的核心， 该层主要是 **C++ 实现**，其中包括了 Skia 引擎、Dart 运行时、文字排版引擎等。在代码调用 dart:ui库时，调用最终会走到引擎层，然后**实现真正的绘制和显示**。

**3. 嵌入层**

Embedder，即嵌入层。Flutter 最终渲染、交互是要依赖其所在平台的操作系统 API，嵌入层主要是**将 Flutter 引擎 "安装" 到特定平台上**。Flutter 本身包含了各个常见平台的嵌入层，**假如以后 Flutter 要支持新的平台，则需要针对该新的平台编写一个嵌入层**。