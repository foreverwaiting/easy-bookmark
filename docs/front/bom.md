# BOM

- BOM的核心：window对象
- 控制窗口、框架、弹出窗口
- location对象了解页面信息
- navigator对象了解浏览器

## window

### window对象

- 既是通过js访问浏览器窗口的一个接口，又是全局对象global。

- 尝试访问未声明的变量会报错，但通过window. 点属性，可以知道某个可能未声明的变量是否存在。

### 窗口关系与框架

- 如果页面包含框架，则每个框架都有自己的window对象，并保存在frames集合中。可通过数值索引从0开始，或者框架name访问相应的window对象。window.frames[0]，或者，window.frames['name']。但其实用top好，因为top对象始终指向最高最外层的框架，也就是浏览器窗口。window下有top最顶层，parent父级。
每个window对象都有一个name属性，其中包含框架名称。
在使用框架的情况下，浏览器会存在多个global对象，每个框架都会有一套自己的构造函数，所以top.Object并不等于top.frames[0].Object，这个问题会影响到对跨域框架传递的对象使用instanceof。

- 可能被浏览器禁用，且只支持最外层window，不支持框架

```js
moveTo()接收的是新位置的 x 和 y 坐标值，而 moveBy()接收的是在水平和垂直方向上移动的像素数
//将窗口移动到(200,300)
window.moveTo(200,300);
//将窗口向左移动 50 像素
window.moveBy(-50,0); 
resizeTo()接收浏览器窗口的新宽度和新高度，而 resizeBy()接收新窗口与原窗口的宽
度和高度之差
//调整到 100×100
window.resizeTo(100, 100);
//调整到 200×150
window.resizeBy(100, 50); 
```

### window.innerHeight   innerWidth

- window.innerHeight   innerWidth页面视图区域大小，window.outerHeight  outerWidth浏览器窗口本身大小
document.documentElement.clientWidth 和document.documentElement.clientHeight 中保存了页面视口的信息
document.body.clientWidth 和 document.body.clientHeight 取得相同信息

```js
// 取得页面视口大小：
var pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
// 判断是不是数值
if (typeof pageWidth != "number"){
// 判断是不是标准模式
    if (document.compatMode == "CSS1Compat"){
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
} 
```

### window.open

- window.open()方法既可以导航到一个特定的 URL，也可以打开一个新的浏览器窗口。方法返回一个指向新窗口的引用。（有些浏览器在默认情况下可能不允许我们针对主浏览器窗口调整大小或移动位置，但却允许我们针对通过 window.open()创建的窗口调整大小或移动位置。）

```js
// 适用于通过 window.open()打开的弹出窗口
var wroxWin = window.open("http://www.wrox.com/","wroxWindow","height=400,width=400,top=10,left=10,resizable=yes");
//调整大小
wroxWin.resizeTo(500,500);
//移动位置
wroxWin.moveTo(100,100);
// 调用 close()方法还可以关闭新打开的窗口。
wroxWin.close(); 
// 弹出窗口倒是可以调用 top.close()在不经用户允许的情况下关闭自己。弹出窗口关闭之后，窗口的引用仍然还在，但除了像下面这样检测其 closed 属性之外，已经没有其他用处了。
wroxWin.close();
alert(wroxWin.closed); //true 
```

- 4 个参数

1、要加载的 URL、

2、窗口目标、【该参数若是已有窗口或框架的名称，则在其上打开url，若不是则创建一个新窗口打开url并命名为该参数】【或者这些值_self、_parent、_top 或_blank】

3、一个特性字符串、【不打开新窗口的情况下，会忽略第三个参数】否则【第三个参数是一个逗号分隔的设置字符串，表示在新窗口中都显示哪些特性】如：字符串，逗号分开，名值对等号连接，不允许有空格

- [详细参数](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)

4、一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值（只在不打开新窗口的情况下使用）

### 检测出调用 window.open()打开的弹出窗口是不是被屏蔽了

```js
var blocked = false;
try {
    var wroxWin = window.open("http://www.wrox.com", "_blank");
    if (wroxWin == null){
        blocked = true;
    }
} catch (ex){
    blocked = true;
}
if (blocked){
    alert("The popup was blocked!");
}
```

### 同步的操作，代码会停止执行

- alert('1')

- confirm('111')取消确定返回true，false

- prompt("What's your name?","xxx")  确定返回输入框值，取消或关闭返回null

### 异步的

```js
//显示“打印”对话框
window.print();
//显示“查找”对话框
window.find(); 
```

## location

### window.location 和 document.location 引用的是同一个对象

- location.属性
    - hash | 返回一个URL的锚部分 | "#idcontents"
    - host | 返回一个URL的主机名和端口 | "www.google.com:80"
    - hostname | 返回URL的主机名 | "www.google.com"
    - href | 返回完整的URL | "http:/www.google.com"
    - pathname | 返回的URL路径名 | "/name1/"
    - port | 返回一个URL服务器使用的端口号 | "8080"
    - protocol | 返回一个URL协议 | "http:"
    - search | 返回一个URL的查询部分 | "?q=js"

- [location属性值](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)

- 每次修改location属性页面都会以url重新加载，除了hash，hash有history，不想有历史记录回退前进，使用replace。
    - window.location.assign(url) ： 加载 URL 指定的新的 HTML 文档。就相当于一个链接，跳转到指定的url，当前页面会转为新页面内容，可以点击后退返回上一个页面。

    - window.location.replace(url) ： 通过加载 URL 指定的文档来替换当前文档，这个方法是替换当前窗口页面，前后两个页面共用一个窗口，所以是没有后退返回上一页的

```js
// reload，没参数以最有效的方式重新加载（如果自上次请求后并没变过，就去缓存拿）
// 如果要强制从服务器重新加载，则需要像下面这样为该方法传递参数 true
location.reload(); //重新加载（有可能从缓存中加载）
location.reload(true); //重新加载（从服务器重新加载）
location.replace(newURL); //可用一个新文档取代当前文档
// 位于 reload()调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素。为此，最好将 reload()放在代码的最后一行。
```

- 查询字符串参数

```js
function getQueryStringArgs(){
    //取得查询字符串并去掉开头的问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),

    //保存数据的对象
    args = {},

    //取得每一项
    items = qs.length ? qs.split("&") : [],
    item = null,
    name = null, 
    value = null,
    //在 for 循环中使用
    i = 0,
    len = items.length;
    //逐个将每一项添加到 args 对象中
    for (i=0; i < len; i++){
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
} 
```

## navigator

- [userAgent参数意义](https://developer.mozilla.org/zh-CN/docs/Web/API/NavigatorID/userAgent)

- 检测浏览器插件

```js
window.navigator.plugins
window.navigator.plugins.refresh() //只更新 plugins集合，不重新加载页面
window.navigator.plugins.refresh(true) //会重新加载包含插件的所有页面

// 非IE：plugins数组检测
// 检测插件（在 IE 中无效）
function hasPlugin(name){
    name = name.toLowerCase();
    for (var i=0; i < navigator.plugins.length; i++){
        if (navigator. plugins [i].name.toLowerCase().indexOf(name) > -1){
            return true;
        }
    }
    return false;
}
//检测 Flash
alert(hasPlugin("Flash"));
//检测 QuickTime
alert(hasPlugin("QuickTime")); 
```

## screen和history

- screen对象基本上只用来表明客户端的能力，其中包括浏览器窗口外部的显示器的信息，如像素宽度和高度等

- history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。

- 因为 history 是 window对象的属性，因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的 history 对象与特定的window 对象关联。

- go()方法可以在用户的历史记录中任意跳转；

    ```js
    //后退一页
    history.go(-1);
    //前进一页
    history.go(1);
    //前进两页
    history.go(2);
    ```

- 也可以给 go()方法传递一个字符串参数，此时浏览器会跳转到历史记录中包含该字符串的第一个位置——可能后退，也可能前进，具体要看哪个位置最近。如果历史记录中不包含该字符串，那么这个方法什么也不做

    ```js
    //跳转到最近的 wrox.com 页面
    history.go("wrox.com");
    //跳转到最近的 nczonline.net 页面
    history.go("nczonline.net");
    ```

- 还可以使用两个简写方法 back()和 forward()来代替 go()。顾名思义，这两个方法可以模仿浏览器的“后退”和“前进”按钮。

    ```js
    //后退一页
    history.back();
    //前进一页
    history.forward();
    ```

- history 对象还有一个 length 属性，保存着历史记录的数量 

## 客户端检测

### 能力检测（在编写代码之前先检测特定浏览器的能力）对于想知道某个特性代码是否会按照适当方式行事。

```js
//检查 sort 是不是函数
function isSortable(object){
 return typeof object.sort == "function";
} 
```

### 怪癖检测

（怪癖实际上是浏览器实现中存在的 bug）前提知道某浏览器有什么bug，然后去检测。

### navigator.userAgent。

userAgent 属性是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值。浏览器应该发送简短的用户代理字符串，指明浏览器的名称和版本号。

用户代理检测（通过检测用户代理字符串userAgent来识别浏览器）

### 以下是完整的用户代理字符串检测脚本，包括检测呈现引擎、平台、Windows 操作系统、移动设备和游戏系统。

```js
var client = function(){
 //呈现引擎
 var engine = {
 ie: 0,
 gecko: 0,
 webkit: 0,
 khtml: 0,
 opera: 0,

 //完整的版本号
 ver: null
 };
 //浏览器
 var browser = {

 //主要浏览器
 ie: 0,
 firefox: 0,
 safari: 0,
 konq: 0,
 opera: 0,
 chrome: 0,

 //具体的版本号
 ver: null
 };
 //平台、设备和操作系统
 var system = {
 win: false,
 mac: false,
 x11: false,

 //移动设备
 iphone: false,
 ipod: false,
 ipad: false,
 ios: false,
 android: false,
 nokiaN: false,
 winMobile: false,

 //游戏系统
 wii: false,
 ps: false
 };

 //检测呈现引擎和浏览器
 var ua = navigator.userAgent;
 if (window.opera){
 engine.ver = browser.ver = window.opera.version();
 engine.opera = browser.opera = parseFloat(engine.ver);
 } else if (/AppleWebKit\/(\S+)/.test(ua)){
 engine.ver = RegExp["$1"];
 engine.webkit = parseFloat(engine.ver);

 //确定是 Chrome 还是 Safari
 if (/Chrome\/(\S+)/.test(ua)){
 browser.ver = RegExp["$1"];
 browser.chrome = parseFloat(browser.ver);
 } else if (/Version\/(\S+)/.test(ua)){
 browser.ver = RegExp["$1"];
 browser.safari = parseFloat(browser.ver);
 } else {
 //近似地确定版本号
 var safariVersion = 1;
 if (engine.webkit < 100){
 safariVersion = 1;
 } else if (engine.webkit < 312){
 safariVersion = 1.2;
 } else if (engine.webkit < 412){
 safariVersion = 1.3;
 } else {
 safariVersion = 2;
 }

 browser.safari = browser.ver = safariVersion;
 } 
} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
 engine.ver = browser.ver = RegExp["$1"];
 engine.khtml = browser.konq = parseFloat(engine.ver);
 } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
 engine.ver = RegExp["$1"];
 engine.gecko = parseFloat(engine.ver);

 //确定是不是 Firefox
 if (/Firefox\/(\S+)/.test(ua)){
 browser.ver = RegExp["$1"];
 browser.firefox = parseFloat(browser.ver);
 }
 } else if (/MSIE ([^;]+)/.test(ua)){
 engine.ver = browser.ver = RegExp["$1"];
 engine.ie = browser.ie = parseFloat(engine.ver);
 }
 //检测浏览器
 browser.ie = engine.ie;
 browser.opera = engine.opera;
 //检测平台
 var p = navigator.platform;
 system.win = p.indexOf("Win") == 0;
 system.mac = p.indexOf("Mac") == 0;
 system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
 //检测 Windows 操作系统
 if (system.win){
 if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
 if (RegExp["$1"] == "NT"){
 switch(RegExp["$2"]){
 case "5.0":
 system.win = "2000";
 break;
 case "5.1":
 system.win = "XP";
 break;
 case "6.0":
 system.win = "Vista";
 break;
 case "6.1":
 system.win = "7";
 break;
 default:
 system.win = "NT";
 break;
 }
 } else if (RegExp["$1"] == "9x"){
 system.win = "ME";
 } else {
 system.win = RegExp["$1"];
 }
 }
 }
 //移动设备
system.iphone = ua.indexOf("iPhone") > -1;
 system.ipod = ua.indexOf("iPod") > -1;
 system.ipad = ua.indexOf("iPad") > -1;
 system.nokiaN = ua.indexOf("NokiaN") > -1;
 //windows mobile
 if (system.win == "CE"){
 system.winMobile = system.win;
 } else if (system.win == "Ph"){
 if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
 system.win = "Phone";
 system.winMobile = parseFloat(RegExp["$1"]);
 }
 }

 //检测 iOS 版本
 if (system.mac && ua.indexOf("Mobile") > -1){
 if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
 system.ios = parseFloat(RegExp.$1.replace("_", "."));
 } else {
 system.ios = 2; //不能真正检测出来，所以只能猜测
 }
 }
 //检测 Android 版本
 if (/Android (\d+\.\d+)/.test(ua)){
 system.android = parseFloat(RegExp.$1);
 }
 //游戏系统
 system.wii = ua.indexOf("Wii") > -1;
 system.ps = /playstation/i.test(ua);
 //返回这些对象
 return {
 engine: engine,
 browser: browser,
 system: system
 };
}();
```

## 总结

- *在使用框架时，每个框架都有自己的 window 对象以及所有原生构造函数及其他函数的副本。每个框架都保存在 frames 集合中，可以通过位置或通过名称来访问。

- *有一些窗口指针，可以用来引用其他框架，包括父框架。

- *top 对象始终指向最外围的框架，也就是整个浏览器窗口。

- *parent 对象表示包含当前框架的框架，而 self 对象则回指 window

- *使用 location 对象可以通过编程方式来访问浏览器的导航系统。设置相应的属性，可以逐段或整体性地修改浏览器的 URL。

- *调用 replace()方法可以导航到一个新 URL，同时该 URL 会替换浏览器历史记录中当前显示的页面。

- *navigator 对象提供了与浏览器有关的信息。到底提供哪些信息，很大程度上取决于用户的浏览器；不过，也有一些公共的属性（如 userAgent）存在于所有浏览器中。

- *screen 对象中保存着与客户端显示器有关的信息，这些信息一般只用于站点分析。

- *history 对象为访问浏览器的历史记录开了一个小缝隙，开发人员可以据此判断历史记录的数量，也可以在历史记录中向后或向前导航到任意页面。
