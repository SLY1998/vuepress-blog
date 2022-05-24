---
title: 【vue】权限管理
date: 2022-05-24
sidebar: true
categories:
 - 学习
tags:
 - vue
 - 前端基础
---

## 一、是什么

权限是对特定资源的访问许可，所谓权限控制，也就是确保用户只能访问被分配的资源。

前端权限=>请求的发起权限=>页面加载触发||dom交互触发=>前端路由||视图

总结：

- 路由方面：用户登录后只能看到自己有权访问的导航菜单和访问有权访问的路由地址，否则跳转404

- 视图方面：用户只能看到自己有权浏览的内容和有权操作的控件

- 请求拦截

## 二、怎么做

### 接口权限

jwt验证：没有通过的话一般返回401，跳转到登录页面进行重新登录。

登录完拿到token，将token存起来，通过axios请求拦截器进行拦截，每次请求的时候头部携带token

```js
  axios.interceptors.request.use(config => {
    config.headers['token'] = cookie.get('token')
    return config
  })
  axios.interceptors.response.use(res=>{},{response}=>{
    if (response.data.code === 401 || response.data.code === 402) { //token过期或者错误
        router.push('/login')
    }
  })
```

### 路由权限控制

存在明显缺点：菜单与路由耦合

### 菜单权限控制

菜单与路由分离，菜单由后端返回，或者菜单和路由都由后端返回

### 总结

权限需要前后端结合，前端尽可能的去控制，更多的需要后台判断