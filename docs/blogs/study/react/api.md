---
title: 【react】api
date: 2022-03-31
sidebar: true
categories:
 - 学习
tags:
 - react
 - 前端基础
---

前言：本篇笔记是工作中遇到问题，去学习reactAPI记录的。

<!-- more -->

## 组件类

![](https://img.qiyuandi.com/images/5/%E3%80%8Creacsfsmxohry3y.jpg)

### 基类组件

**一、Component**

**二、PureComponent**

纯组件PureComponent会浅比较，props和state是否相同，来决定是否重新渲染组件。所以一般用于性能调优，减少render次数。

### 内置组件

**一、Fragment**

react不允许一个组件返回多个节点元素，比如说如下情况

```javascript
render(){
    return <li> ??? </li>
           <li> ??? </li>
           <li> ??? </li>
}
```

如果我们想解决这个情况，很简单，只需要在外层套一个容器元素。

```javascript
render(){
    return <div>
           <li> ??? </li>
           <li> ??? </li>
           <li> ??? </li>
    </div>
}
```

但是我们不期望，增加额外的dom节点，所以react提供Fragment碎片概念，能够让一个组件返回多个元素。 所以我们可以这么写

```javascript
<React.Fragment>
    <li> ??? </li>
    <li> ??? </li>
    <li> ??? </li>
</React.Fragment>
```

还可以简写成：

```javascript
<>
    <li> ??? </li>
    <li> ??? </li>
    <li> ??? </li>
</>
```

和Fragment区别是，Fragment可以支持key属性。<></>不支持key属性。

温馨提示。我们通过map遍历后的元素，react底层会处理，默认在外部嵌套一个Fragment。

**二、Profiler**

Profiler这个api一般用于开发阶段，性能检测，检测一次react组件渲染用时，性能开销。

Profiler 需要两个参数：

第一个参数：是 id，用于表示唯一性的Profiler。

第二个参数：onRender回调函数，用于渲染完成，接受渲染参数。

**三、StrictMode**

StrictMode见名知意，严格模式，用于检测react项目中的潜在的问题。与 Fragment 一样， StrictMode 不会渲染任何可见的 UI 。它为其后代元素触发额外的检查和警告。

### 高阶组件

**一、memo**

React.memo 接受两个参数，第一个参数原始组件本身，第二个参数，可以根据一次更新中props是否相同决定原始组件是否重新渲染。是一个返回布尔值，true 证明组件无须重新渲染，false证明组件需要重新渲染，这个和类组件中的shouldComponentUpdate()正好相反 。

React.memo一定程度上，可以等价于组件外部使用shouldComponentUpdate ，用于拦截新老props，确定组件是否更新。

**二、forwardRef**

应用场景：

1、 转发引入Ref：比如父组件想获取孙组件，某一个dom元素。这种隔代ref获取引用，就需要forwardRef来助力。

react不允许ref通过props传递，因为组件上已经有 ref 这个属性,在组件调和过程中，已经被特殊处理，forwardRef出现就是解决这个问题，把ref转发到自定义的forwardRef定义的属性上，让ref，可以通过props传递。

```javascript
function Son (props){
    const { grandRef } = props
    return <div>
        <div> i am alien </div>
        <span ref={grandRef} >这个是想要获取元素</span>
    </div>
}

class Father extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <div>
            <Son grandRef={this.props.grandRef}  />
        </div>
    }
}

const NewFather = React.forwardRef((props,ref)=><Father grandRef={ref}  {...props} />  )

class GrandFather extends React.Component{
    constructor(props){
        super(props)
    }
    node = null 
    componentDidMount(){
        console.log(this.node)
    }
    render(){
        return <div>
            <NewFather ref={(node)=> this.node = node } />
        </div>
    }
}
```

效果：

![](https://img.qiyuandi.com/images/5/%E3%80%8Creac45lincepbqw.jpg)

**三、lazy**

React.lazy和Suspense配合一起用，能够有动态加载组件的效果。

React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise ，该 Promise 需要 resolve 一个 default export 的 React 组件。

父组件：

```javascript
import Test from './comTest'

//我们用setTimeout来模拟import异步引入效果。
const LazyComponent =  React.lazy(()=> new Promise((resolve)=>{
      setTimeout(()=>{
          resolve({
              default: ()=> <Test />
          })
      },2000)
}))
class index extends React.Component{   
    render(){
        return <div className="context_box"  style={ { marginTop :'50px' } }   >
           <React.Suspense fallback={ <div className="icon" ><SyncOutlined  spin  /></div> } >
               <LazyComponent />
           </React.Suspense>
        </div>
    }
}
```

Test

```javascript
class Test extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log('--componentDidMount--')
    }
    render(){
        return <div>
            <img src={alien}  className="alien" />
        </div>
    }
}
```

**四、Suspense**

Suspense 让组件“等待”某个异步操作，直到该异步操作结束即可渲染。

用于数据获取的 Suspense 是一个新特性，你可以使用 Suspense 以声明的方式来“等待”任何内容，包括数据。本文重点介绍它在数据获取的用例，它也可以用于等待图像、脚本或其他异步的操作。

```javascript
const ProfilePage = React.lazy(() => import('./ProfilePage')); // 懒加载
<Suspense fallback={<Spinner />}>
  <ProfilePage />
</Suspense>
```

## 工具类

![](https://img.qiyuandi.com/images/5/%E3%80%8Creacjocu45vhbdz.jpg)

## hooks

![](https://img.qiyuandi.com/images/5/%E3%80%8Creaceu5s0ywqkfi.jpg)

### useMemo

useMemo接受两个参数，第一个参数是一个函数，返回值用于产生保存值。 第二个参数是一个数组，作为dep依赖项，数组里面的依赖项发生变化，重新执行第一个函数，产生新的值。

应用场景： 

1 缓存一些值，避免重新执行上下文
2 减少不必要的dom循环

3 减少子组件渲染

### useCallback

useMemo 和 useCallback 接收的参数都是一样，都是在其依赖项发生变化后才执行，都是返回缓存的值，区别在于 useMemo 返回的是函数运行的结果， useCallback 返回的是函数。 返回的callback可以作为props回调函数传递给子组件。

### useRef

useRef的作用：

一 是可以用来获取dom元素，或者class组件实例 。

二 react-hooks原理文章中讲过，创建useRef时候，会创建一个原始对象，只要函数组件不被销毁，原始对象就会一直存在，那么我们可以利用这个特性，来通过useRef保存一些数据。

### useReducer

useReducer 接受的第一个参数是一个函数，我们可以认为它就是一个 reducer , reducer 的参数就是常规 reducer 里面的 state 和 action ,返回改变后的 state , useReducer 第二个参数为 state 的初始值 ,useReducer返回一个数组，数组的第一项就是更新之后 state 的值 ，第二个参数是派发更新的 dispatch 函数。

```javascript
const DemoUseReducer = ()=>{
    /* number为更新后的state值,  dispatchNumbner 为当前的派发函数 */
   const [ number , dispatchNumbner ] = useReducer((state,action)=>{
       const { payload , name  } = action
       /* return的值为新的state */
       switch(name){
           case 'add':
               return state + 1
           case 'sub':
               return state - 1 
           case 'reset':
             return payload       
       }
       return state
   },0)
   return <div>
      当前值：{ number }
      { /* 派发更新 */ }
      <button onClick={()=>dispatchNumbner({ name:'add' })} >增加</button>
      <button onClick={()=>dispatchNumbner({ name:'sub' })} >减少</button>
      <button onClick={()=>dispatchNumbner({ name:'reset' ,payload:666 })} >赋值</button>
      { /* 把dispatch 和 state 传递给子组件  */ }
      <MyChildren  dispatch={ dispatchNumbner } State={{ number }} />
   </div>
}
```

### useImperativeHandle

useImperativeHandle 可以配合 forwardRef 自定义暴露给父组件的实例值。这个很有用，我们知道，对于子组件，如果是class类组件，我们可以通过ref获取类组件的实例，但是在子组件是函数组件的情况，如果我们不能直接通过ref的，那么此时useImperativeHandle和 forwardRef配合就能达到效果。

useImperativeHandle接受三个参数：

第一个参数ref: 接受 forWardRef 传递过来的 ref。

第二个参数 createHandle ：处理函数，返回值作为暴露给父组件的ref对象。

第三个参数 deps:依赖项 deps，依赖项更改形成新的ref对象。

我们来模拟给场景，用useImperativeHandle，使得父组件能让子组件中的input自动赋值并聚焦。

```javascript
function Son (props,ref) {
    console.log(props)
    const inputRef = useRef(null)
    const [ inputValue , setInputValue ] = useState('')
    useImperativeHandle(ref,()=>{
       const handleRefs = {
           /* 声明方法用于聚焦input框 */
           onFocus(){
              inputRef.current.focus()
           },
           /* 声明方法用于改变input的值 */
           onChangeValue(value){
               setInputValue(value)
           }
       }
       return handleRefs
    },[])
    return <div>
        <input
            placeholder="请输入内容"
            ref={inputRef}
            value={inputValue}
        />
    </div>
}

const ForwarSon = forwardRef(Son)

class Index extends React.Component{
    cur = null
    handerClick(){
       const { onFocus , onChangeValue } =this.cur
       onFocus()
       onChangeValue('let us learn React!')
    }
    render(){
        return <div style={{ marginTop:'50px' }} >
            <ForwarSon ref={cur => (this.cur = cur)} />
            <button onClick={this.handerClick.bind(this)} >操控子组件</button>
        </div>
    }
}
```

## react-dom

![](https://img.qiyuandi.com/images/5/%E3%80%8Creacu01xqeqqbj5.jpg)

**render**

**createPortal**

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。createPortal 可以把当前组件或 element 元素的子节点，渲染到组件之外的其他地方。

那么具体应用到什么场景呢？

比如一些全局的弹窗组件model,Model组件一般都写在我们的组件内部，倒是真正挂载的dom，都是在外层容器，比如body上。此时就很适合createPortalAPI。

createPortal接受两个参数

ReactDOM.createPortal(child, container)

第一个： child 是任何可渲染的 React 子元素 第二个： container是一个 DOM 元素。