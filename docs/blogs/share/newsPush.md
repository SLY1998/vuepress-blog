---
title: 【技术分享】web实时消息推送
date: 2022-07-27
sidebar: true
categories:
 - 技术分享
tags:
 - 前端基础
---

## 短轮询

**定义**：实际上就是简单的轮询，前端写定时器发请求。

**实现**：

```js
setInterval(() => {
  // 方法请求
  messageCount().then((res) => {
      if (res.code === 200) {
          this.messageCount = res.data
      }
  })
}, 1000);
```

**优点**：实现容易

**缺点**：难维护，浪费宽带和服务器资源。

## 长轮询

>长轮询是对上边短轮询的一种改进版本，在尽可能减少对服务器资源浪费的同时，保证消息的相对实时性。

**定义**：客户端向服务器发送Ajax请求，服务器接到请求后hold住连接，直到有新消息才返回响应信息并关闭连接，客户端处理完响应信息后再向服务器发送新的请求。

**实现**：

前端实现：

```js
// 请求数据方法
const request = () => {}
// 当数据请求返回结果后发起下一次请求
request().then(res => {
  request();
})
```

**优点**：在无消息的情况下不会频繁的请求，耗费资源小。

**缺点**：服务器hold连接会消耗资源，返回数据顺序无保证，难于管理维护。

## iframe流

## SSE

## Websocket

## MQTT

## 自定义推送