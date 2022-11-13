(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{290:function(t,s,a){"use strict";a.r(s);var e=a(13),r=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"前端安全"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前端安全"}},[t._v("#")]),t._v(" 前端安全")]),t._v(" "),s("p",[t._v("待完善。。。")]),t._v(" "),s("ul",[s("li",[t._v("web中可能存在的安全漏洞以及如何去检测这些安全漏洞，如何去防范潜在的恶意攻击")])]),t._v(" "),s("h2",{attrs:{id:"跨站脚本攻击-cross-sites-script"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#跨站脚本攻击-cross-sites-script"}},[t._v("#")]),t._v(" 跨站脚本攻击（Cross Sites Script）")]),t._v(" "),s("h2",{attrs:{id:"跨站点请求伪造-cross-sites-request-forgery"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#跨站点请求伪造-cross-sites-request-forgery"}},[t._v("#")]),t._v(" 跨站点请求伪造（Cross Sites Request Forgery）")]),t._v(" "),s("h2",{attrs:{id:"点击劫持-clickjacking"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#点击劫持-clickjacking"}},[t._v("#")]),t._v(" 点击劫持（ClickJacking）")]),t._v(" "),s("h3",{attrs:{id:"点击劫持防御方式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#点击劫持防御方式"}},[t._v("#")]),t._v(" 点击劫持防御方式")]),t._v(" "),s("h2",{attrs:{id:"其他安全问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#其他安全问题"}},[t._v("#")]),t._v(" 其他安全问题")]),t._v(" "),s("h3",{attrs:{id:"跨域问题处理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#跨域问题处理"}},[t._v("#")]),t._v(" 跨域问题处理")]),t._v(" "),s("h3",{attrs:{id:"postmessage-跨窗口传递信息"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#postmessage-跨窗口传递信息"}},[t._v("#")]),t._v(" postMessage 跨窗口传递信息")]),t._v(" "),s("h3",{attrs:{id:"web-storage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#web-storage"}},[t._v("#")]),t._v(" Web Storage")]),t._v(" "),s("h3",{attrs:{id:"跨域问题处理-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#跨域问题处理-2"}},[t._v("#")]),t._v(" 跨域问题处理")]),t._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("ul",[s("li",[t._v("谨慎用户输入信息，进行输入检查（客户端和服务端同时检查）")]),t._v(" "),s("li",[t._v("在变量输出到HTML页面时，都应该进行编码或转义来预防XSS攻击")]),t._v(" "),s("li",[t._v("该用验证码的时候一定要添上")]),t._v(" "),s("li",[t._v("尽量在重要请求上添加Token参数，注意Token要足够随机，用足够安全的随机数生成算法")])]),t._v(" "),s("h3",{attrs:{id:"网页安全政策-content-security-policy-缩写-csp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#网页安全政策-content-security-policy-缩写-csp"}},[t._v("#")]),t._v(' "网页安全政策"（Content Security Policy，缩写 CSP）')]),t._v(" "),s("ul",[s("li",[s("p",[t._v("1、目的：解决跨域脚本攻击 XSS 是最常见、危害最大的网页安全漏洞。")])]),t._v(" "),s("li",[s("p",[t._v("2、实质：CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行，等同于提供白名单。它的实现和执行全部由浏览器完成，开发者只需提供配置。CSP 大大增强了网页的安全性。攻击者即使发现了漏洞，也没法注入脚本，除非还控制了一台列入了白名单的可信主机。")])]),t._v(" "),s("li",[s("p",[t._v("3、启用 CSP：")]),t._v(" "),s("ul",[s("li",[t._v("HTTP 头信息的Content-Security-Policy的字段")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Content"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("Security"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("Policy"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" script"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'self'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" object"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'none'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("style"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src cdn"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("example"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("org third"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("party"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("org"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" child"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("src https"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n")])])]),s("ul",[s("li",[t._v("通过网页的"),s("meta"),t._v("标签")])]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("http-equiv")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("Content-Security-Policy"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 上面代码中，CSP 做了如下配置: --\x3e")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 脚本：只信任当前域名\nobject标签：不信任任何URL，即不加载任何资源\n样式表：只信任cdn.example.org和third-party.org\n框架（frame）：必须使用HTTPS协议加载\n其他资源：没有限制 --\x3e")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 启用后，不符合 CSP 的外部资源就会被阻止加载 --\x3e")]),t._v("\n")])])])]),t._v(" "),s("li",[s("p",[t._v("4、限制选项【CSP 提供了很多限制选项，涉及安全的各个方面】")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("资源加载限制\nscript-src：外部脚本\nstyle-src：样式表\nimg-src：图像\nmedia-src：媒体文件（音频和视频）\nfont-src：字体文件\nobject-src：插件（比如 Flash）\nchild-src：框架\nframe-ancestors：嵌入的外部资源（比如"),s("frame"),t._v("、"),s("iframe",[t._v("、"),s("embed"),t._v("和"),s("applet",[t._v("）\nconnect-src：HTTP 连接（通过 XHR、WebSockets、EventSource等）\nworker-src：worker脚本\nmanifest-src：manifest 文件")])],1)],1)]),t._v(" "),s("li",[s("p",[t._v("default-src用来设置上面各个选项的默认值")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 限制所有的外部资源，都只能从当前域名加载 --\x3e")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 如果同时设置某个单项限制（比如font-src）和default-src，前者会覆盖后者，即字体文件会采用font-src的值，其他资源依然采用default-src的值 --\x3e")]),t._v("\nContent-Security-Policy: default-src 'self'\n")])])])]),t._v(" "),s("li",[s("p",[t._v("URL 限制\nframe-ancestors：限制嵌入框架的网页\nbase-uri：限制 base#href\nform-action：限制 form#action")])]),t._v(" "),s("li",[s("p",[t._v("其他限制\nblock-all-mixed-content：HTTPS 网页不得加载 HTTP 资源（浏览器已经默认开启）\nupgrade-insecure-requests：自动将网页上所有加载外部资源的 HTTP 链接换成 HTTPS 协议\nplugin-types：限制可以使用的插件格式\nsandbox：浏览器行为的限制，比如不能有弹出窗口等。")])]),t._v(" "),s("li",[s("p",[t._v("report-uri（有时，我们不仅希望防止 XSS，还希望记录此类行为。report-uri就用来告诉浏览器，应该把注入行为报告给哪个网址）")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 将注入行为报告给/my_amazing_csp_report_parser这个 URL,浏览器会使用POST方法，发送一个JSON对象 --\x3e")]),t._v("\nContent-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;\n")])])])])])]),t._v(" "),s("li",[s("p",[t._v("5、Content-Security-Policy-Report-Only")]),t._v(" "),s("p",[t._v("除了Content-Security-Policy，还有一个Content-Security-Policy-Report-Only字段，表示不执行限制选项，只是记录违反限制的行为。")]),t._v(" "),s("p",[t._v("它必须与report-uri选项配合使用：\nContent-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;")])]),t._v(" "),s("li",[s("p",[t._v("6、选项值")])]),t._v(" "),s("li",[s("p",[t._v("每个限制选项可以设置以下几种值，这些值就构成了白名单：")])])]),t._v(" "),s("p",[t._v("主机名：example.org，https://example.com:443\n路径名：example.org/resources/js/\n通配符："),s("em",[t._v(".example.org，")]),t._v("😕/"),s("em",[t._v(".example.com:")]),t._v("（表示任意协议、任意子域名、任意端口）\n协议名：https:、data:\n关键字'self'：当前域名，需要加引号\n关键字'none'：禁止加载任何外部资源，需要加引号")]),t._v(" "),s("ul",[s("li",[t._v("多个值也可以并列，用空格分隔")])]),t._v(" "),s("p",[t._v("Content-Security-Policy: script-src 'self' https://apis.google.com")]),t._v(" "),s("ul",[s("li",[t._v("如果同一个限制选项使用多次，只有第一次会生效")])]),t._v(" "),s("p",[t._v("错误的写法\nscript-src https://host1.com; script-src https://host2.com")]),t._v(" "),s("p",[t._v("正确的写法\nscript-src https://host1.com https://host2.com")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("如果不设置某个限制选项，就是默认允许任何值")])]),t._v(" "),s("li",[s("p",[t._v("6、script-src 的特殊值")])]),t._v(" "),s("li",[s("p",[t._v("除了常规值，script-src还可以设置一些特殊值。注意，下面这些值都必须放在单引号里面。")])])]),t._v(" "),s("p",[t._v("'unsafe-inline'：允许执行页面内嵌的<script>标签和事件监听函数\nunsafe-eval：允许将字符串当作代码执行，比如使用eval、setTimeout、setInterval和Function等函数。\nnonce值：每次HTTP回应给出一个授权token，页面内嵌脚本必须有这个token，才会执行\nhash值：列出允许执行的脚本代码的Hash值，页面内嵌脚本的哈希值只有吻合的情况下，才能执行。")]),t._v(" "),s("ul",[s("li",[t._v("nonce值的例子如下，服务器发送网页的时候，告诉浏览器一个随机生成的token，页面内嵌脚本，必须有这个token才能执行")])]),t._v(" "),s("p",[t._v("Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'")]),t._v(" "),s("ul",[s("li",[t._v("hash值的例子如下，服务器给出一个允许执行的代码的hash值，下面的代码就会允许执行，因为hash值相符,注意，计算hash值的时候，script标签不算在内。除了script-src选项，nonce值和hash值还可以用在style-src选项，控制页面内嵌的样式表。")])]),t._v(" "),s("p",[t._v("Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='\n"),s("code",[t._v("<script>alert('Hello, world.');<\/script>")])]),t._v(" "),s("ul",[s("li",[t._v("7、注意点")])]),t._v(" "),s("p",[t._v("（1）script-src和object-src是必设的，除非设置了default-src。")]),t._v(" "),s("p",[t._v("因为攻击者只要能注入脚本，其他限制都可以规避。而object-src必设是因为 Flash 里面可以执行外部脚本。")]),t._v(" "),s("p",[t._v("（2）script-src不能使用unsafe-inline关键字（除非伴随一个nonce值），也不能允许设置data:URL。")]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!-- 下面是两个恶意攻击的例子。 --\x3e")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("x"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token special-attr"}},[s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("onerror")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),s("span",{pre:!0,attrs:{class:"token value javascript language-javascript"}},[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("evil")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("data:text/javascript,evil()"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}}),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("（3）必须特别注意 JSONP 的回调函数。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 代码中，虽然加载的脚本来自当前域名，但是通过改写回调函数，攻击者依然可以执行恶意代码。")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script src"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/path/jsonp?callback=alert(document.domain)//"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),s("ul",[s("li",[s("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2016/09/csp.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Content Security Policy 入门教程"),s("OutboundLink")],1)]),t._v(" "),s("li",[s("a",{attrs:{href:"http://www.alloyteam.com/2021/01/sri/",target:"_blank",rel:"noopener noreferrer"}},[t._v("提高资源的安全性 – SRI 与 CSP"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("参考：")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://segmentfault.com/a/1190000037657222",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端安全编码规范"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=r.exports}}]);