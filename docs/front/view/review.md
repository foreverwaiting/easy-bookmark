# review

## HTML 

### HTML语义化：
header、hgroup、footer、nav、aside、article、main、section
对人：
便于团队的开发和维护。
在没有加载 CSS 的情况下也能呈现较好的内容结构与代码结构，易于阅读。

对机器：
有利于 SEO ，搜索引擎的爬虫依赖于标签来确定上下文和各个关键字的权重。
方便其他设备的解析（如屏幕阅读器、盲人阅读器等），利于无障碍阅读，提高可访问性。


### 块级和内联标签：
块：`<div>, <p>, <h1>, <form>, <ul>、<li>`
内连`<span>, <a>, <label>, <input>, <img>, <strong>\<em>`

### head的meta

- [meta](https://www.bilibili.com/video/BV1ui4y1b7UW)

MDN多看看

## CSS

### 盒子模型：

w3c盒子模型的范围包括margin、border、padding、content,并且content部分不包含其他部分

IE盒子模型的content部分包含了padding和border

重点看盒子模型，定位，层级，过渡，动画和 transform。知道原理和规则。重点学习几种常见的布局。完了之后去搞flex。最后搞下sass、less。

flex  grid  BFC、居中、flex、清浮动、适配

## JS

this 用法，相关原理
原型/原型链
闭包
面向对象相关
同步异步/回调/promise/async、await
模块化 CommonJS, 

 CMD （通用模块定义）AMD（异步模块定义）
- [AMD 和 CMD 的区别有哪些？](https://www.zhihu.com/question/20351507)
- [AMD](https://github.com/seajs/seajs/issues/277)
## ES6

ES6（let、const、promise、async、class、promise 然后问asyc await

style 加 scoped 属性的用途和原理：
Vue 中 scoped 属性的效果主要是通过 PostCss 实现的。scoped会在DOM结构及css样式上加上唯一性的标记【data-v-something】属性，即CSS带属性选择器，以此完成类似作用域的选择方式，从而达到样式私有化，不污染全局的作用。给一个组件中的所有dom添加了一个独一无二的动态属性，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom。
覆盖样式scoped 穿透：
外层 >>> 第三方组件{}
外层 /deep/ 第三方组件{}
：
不使用 scoped 属性，通过在最外层加 id 或者 class 的形式进行区分。


tcp和udp两个讲点东西，但我更多的时候会问面试者这两者实际的运用场景。Symbol大家都知道es6之后新加的一种基本类型。但你知道为什么要加么？

JSON.parse(JSON.stringify(oldObj))很多人会说使用这种方式，我就会反问它的缺陷是什么，什么场景下它是不是用的：
1、如果obj里面存在时间对象，JSON.parse(JSON.stringify(obj))之后，时间对象变成了字符串。
2、如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象。
3、如果obj里有函数，undefined，则序列化的结果会把函数， undefined丢失。
4、如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null。
5、JSON.stringify()只能序列化对象的可枚举的自有属性。如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor。
6、如果对象中存在循环引用的情况也无法正确实现深拷贝。


git 面试
很多人简历上经常讲熟练掌握git操作
至少需要知道 [stackoverflow](https://stackoverflow.com/questions/tagged/git)上前几位最常见的的问题吧。
但很多人其实 git pull git fetch 之间的区别都搞不清楚 怎么删除本地和远程无用的分支也不清楚。
$ git branch -d branch_name
$ git branch -D branch_name
我觉得你至少也要知道git flow的工作流
我经常通过一些场景题来考察面试者的git掌握程度。
我们在工作中 线上bug暂存
提交了错误代码该怎么办

### 在浏览器地址栏输入地址到页面渲染完成发生了什么？

1、浏览器（客户端）进行了地址解析。【互联网url默认端口号为80，浏览器默认补齐功能会补齐协议http，有些还会直接在域名前面补上www】

2、将解析出的域名进行dns解析。
    1、先查看浏览器dns缓存中是否有域名对应的ip。

    2、如果没有，则产看操作系统dns缓存中是否有对应的ip（例如windows的hosts文件）。

    3、依旧没有就对本地区的dns服务器发起请求，

    4、如果还是没有，就直接到Root Server域名服务器请求解析。

3、通过ip寻址和arp，找到目标（服务器）地址。
    获取到了ip，此时直接通过ip寻址找到ip对应的服务器，然后通过arp协议找到服务器的mac地址。【arp就是地址转化协议，也就是把ip地址转化为mac地址。和dns很像，先查缓存，然后查路由器。】
    同一子网、子网掩码、网关

4、进行tcp三次握手，建立tcp连接。

5、浏览器发送数据，等待服务器响应。

6、服务器处理请求，并对请求做出响应。

7、浏览器收到服务器响应，得到html代码。

8、渲染页面。
    html解析->外部样式、脚本加载->外部样式执行->外部脚本执行->html继续解析->dom树构建完成->加载图片->页面加载完成


容器 docker odps过高 mq消息队列 redis 微服务


## 浏览器相关知识（强缓存、协商缓存、从输入 URL 到呈现页面过程、cookie、session）

## 编程题(节流防抖、call、bind、new、eventEmitter 、简单的业务实现或者写一个数据处理函数等等)

## 网络（HTTP CODE、https、http2、三次握手与四次挥手）

## 框架

### 了解 Babel 和 webpack

一些原理方面的东西工作中也会用到。babel 里面会有教你如何编译代码。webpack教你如和打包文件。对之后看vue、react源码帮助挺大。

### vue

搞完 Vue 全家桶，去了解下 React，React hooks 学习下新的理念。再回过头来看Vue。你会发现他们是如此的相似去又不同。

### 如何看源码

挑简单的上手。别一开始就搞 vue、react、webpack。太难

按照难易程度，函数库 < 组件库 < 框架 < 工程化 分别典型代表 lodash < vant < vue < webpack

手撸简易模型。像vue, webpack, babel 都有简易项目给你撸。有的创始人（尤哥）还直播手撸。国外的更多，youtube 一搜一大堆。就算不看源码，照着写出了简易 demo 对原理和理解提升都是很大的。

## 前端工程化

重点搞下babel、webpack。 学习下编译，打包的原理。自己配置下 webpack。尝试自己去写下下 webpack 的 loader 和 plugin。学习这些之前要懂一点 node.js， node.js 不需要全部学习。一般就日常用到读写文件fs接口，path 路径接口。这些 api 都不难写几个 demo 就懂了。基本上webpack 里面配置文件也没用到多少 node 的东西。最后自己学会配置webpack的配置文件。如果想深想去优化打包体积和速度，就需要去了解很多webpack插件。webpack 里面最核心的就是插件了。

## 性能优化

## git 命令

## 浏览器再问一遍渲染原理

## web 安全（xss、csrf）

## Event Loop（js、node、宏任务、微任务）

## 构建工具选一个，常用的还是webpack，问你工作原理，写过插件，loader没，webpack-dev-server是怎么工作的，分包又是怎么分的。

## 延伸http缓存问题