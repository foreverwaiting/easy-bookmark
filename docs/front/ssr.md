# SSR

## React 的 Next

## Vue.js 的 Nuxt

## SSR

SPA（single page application）、SEO（Search Engine Optimization）、SSR（Server-Side Rendering）

## SSR

### CSR（客户端渲染）的流程

<img :src="$withBase('/ssr1.png')" alt="ssr1">

- 一个 React 应用，通常我们把 CSS 放在 head，有个 React 应用挂载的根节点空标签，以及 React 应用编译后的主体文件。浏览器在加载 HTML 后，加载 CSS 和 JS，到这时候为止，浏览器呈现给用户的仍然是个空白的页面。

- < 红色箭头部分> JS 开始执行，状态管理会初始化个 store，会先拿这个 store 去渲染页面，这时候页面开始渲染元素（白屏时间结束）。但是还没有列表的详细信息，也没有头像、用户名那些信息。

- 初始化 store 后会发起异步的 CGI 请求，在请求回来后会更新 store，触发 React 重新渲染页面，绑定事件，整个页面完全呈现（首屏时间结束）。

### CSR（服务端渲染）的流程

<img :src="$withBase('/ssr2.png')" alt="ssr2">

- 1、< 绿色箭头部分> 首先我们复用原来的 React 组件编译出可以在 Node 环境下运行的文件，并且部署一个 Node 服务。

- 2、< 蓝色箭头部分> 在浏览器发起 HTML 请求时，我们的 Node 服务会接收到请求。可以从请求里取出 HTTP 头部，Cookie 等信息。运行对应的 JS 文件，初始化 store，发起 CGI 请求填充数据，调用 React 渲染 DOM 节点（这里和 CSR 的差异在于我们得等 CGI 请求回来数据改变后再渲染，也就是需要的数据都准备好了再渲染）。

- 3、将渲染的 DOM 节点插入到原 React 应用根节点的内部，同时将 store 以全局变量的形式注入到文档里，返回最终的页面给浏览器。浏览器在拿到页面后，加上原来的 CSS，在 JS 下载下来之前，就已经能够渲染出完整的页面了（白屏时间结束、首屏时间结束）。

- 4、< 红色箭头部分> JS 开始执行，拿服务端注入的数据初始化 store，渲染页面，绑定事件（可交互时间结束）（这里其实后面可能还有一些 CGI，因为有一些 CGI 是不适合放在服务端的，且不影响首页直出的页面，会放在客户端上加快首屏速度。这里的一个优化点在于我们将尽量避免在服务端有串行的 CGI 存在，比如需要先发起一个 CGI，等结果返回后才发起另外一个 CGI，因为这会将 SSR 完全拖垮一个 CGI 的速度）。

- [SSR](http://www.alloyteam.com/2020/12)