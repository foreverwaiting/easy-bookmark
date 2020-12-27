# HTML（5）CSS（3）基础

- JavaScript 简介

1、1995 javascript诞生
js出现前，必须把表单提交到服务端才能确定用户是否没填某个必填项
从一个简单的输入验证器发展成为强大的编程语言
2、简介
Netscape网景公司开发的客户端语言，用来处理简单的验证。（最初叫LiveScript，为炒作，媒体搭上Java改名为Javascript）；
【网景：与IE竞争失利后，宣布自家软件免费，成立Mozilla组织，之后美国在线公司收购网景，03年美国在线解散网景，Mozilla基金会成立，07年网景浏览器停止开发，建议用户转移使用Mozilla Firefox浏览器】
随后微软在自家IE浏览器加入名为JScript的Javascript实现；
网景与微软两家JS版本并存，同行竞争，标准提上议程，于是欧洲计算机制造商协会ECMA，指定39号技术委员会TC39（负责“标准化一种通用跨平台供应商中立的脚本语言的语法和语义”），完成ECMAScript新语言脚本标准。第二年ISO（国际标准化组织）/ IEC（国际电工委员会）也采用ECMAScript作为标准，自此之后浏览器开发商致力于将ECMAScript作为各自Javascript实现的基础。
3、Javascript实现 = 核心（ECMAScript） + 文档对象模型（DOM） + 浏览器对象模型（BOM）
4、ECMAScript、web浏览器、Javascript关系
a、ECMAScript是Javascript实现的基础标准，Javascript是在ECMAScript标准的基础上实现更多功能。
b、ECMAScript只是这门语言的基础，在此基础上可以构建更完善的脚本语言。
c、常见的web浏览器只是ECMAScript实现可能的宿主环境之一。（还有node服务端Javascript平台、Adobe Flash）。
d、宿主环境：提供基本的ECMAScript实现，同时提供该语言的扩展，以便语言与环境之间对接交互；而这些扩展，如DOM，则利用ECMAScript的核心类型和语法提供更多更具体的功能，以便实现针对环境的操作。
5、ECMAScript规定了这门语言的啥：
语法、类型、语句、关键字、保留字、操作符、对象、
6、文档对象模型（DOM document object model），针对xml但经过扩展用于html的应用程序编程接口application programming interface；dom把整个页面映射为一个多层节点结构，html或者xml页面中每个组成部分都是某种类型的节点，这些节点又包含不同的类型。通过DOM创建的这个表示文档的树形图，借助DOM提供的API去增删改查任何节点。有了DOM开发人员无需重新加载网页就可以修改外观和内容了。
7、由于网景于微软竞争，浏览器互不兼容，负责制定web通信标准的w3c开始着手规划DOM。
DOM1：主要映射文档结构
DOM2：引入事件、鼠标用户交互、定义遍历和操作文档树的接口、css样式
DOM3：dom加载和保存文档、dom验证
8、浏览器对象模型（BOM browser object model），控制浏览器页面以外的部分，html5致力于BOM规范。BOM相关：弹出新窗口的功能、移动缩放关闭浏览器窗口的功能、浏览器详细信息navigater对象、浏览器加载页面详细信息的location对象、用户显示器分辨率screen对象、cookies、XMLHttpRequset和IE的ActiveXObject自定义对象。

- 在html使用Javascript

1、script标签属性：
async、立即下载脚本
Charest、src属性指定的代码的字符集，大多数浏览器会忽略这个属性
defer、脚本延迟到文档完全被解析和显示后再执行
language、已废弃、表示编写代码的使用的脚本语言
src、外部文件
type、可看作language的替代属性、表示编写代码的使用的脚本语言类型。默认text/JavaScript
2、带有src的script标签内的代码不会被执行
3、src可跨域引用文件
4、延迟脚本：设置了defer的，即使放在head内，也会在整个页面都解析完毕才执行。相当于立即下载但延迟执行。
`<script src="a.js"></script>`
`<script src="b.js"></script>`
HTML5规范要求脚本按先后出现顺序执行，因此应该执行a、b、并且ab在DOMContentLOaded前执行，但现实是不一定，因此最好包含一个延迟脚本。
5、异步脚本：设置了async的，立即下载文件，且不让页面等待这俩脚本的下载和执行。相当于立即下载但异步执行。
`<script src="a.js"></script>`
`<script src="b.js"></script>`
ab需要互不依赖，因为执行顺序不定，所以不要再ab内操作dom，异步脚本一定会在页面load事件前执行，但在DOMContentLOaded前后不一定。
6、不支持script的可使用`<noscript></noscript>`标签


## H5-元素

### details元素

- [details元素](https://shkspr.mobi/blog/2020/12/a-terrible-way-to-do-footnotes-in-html/)

details的妙用，角标。

## H5-语义化

## H5-DOM

## CSS3-选择器

## CSS3-布局

## CSS3-交互


