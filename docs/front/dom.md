# DOM

## DOM1

- DOM 描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分。
- DOM 可以将任何 HTML 或 XML 文档描绘成一个由多层节点构成的结构。
- HTML 元素通过元素节点表示，
- 特性（attribute）通过特性节点表示，
- 文档类型通过文档类型节点表示，
- 注释则通过注释节点表示
- 总共有 12 种节点类型，这些类型都继承自一个基类型。

### DOM1 级定义了一个 Node 接口，该接口将由 DOM 中的所有节点类型实现。每个节点都有一个 nodeType 属性，用于表明节点的类型。

- 节点类型由在 Node 类型中定义的下列12 个数值常量来表示，任何节点类型必居其一。

- [nodeType值](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)

```js
Node.ELEMENT_NODE(1) // 一个 元素 节点，例如 <p> 和 <div>
Node.ATTRIBUTE_NODE(2) // 已被弃用
Node.TEXT_NODE(3) // Element 或者 Attr 中实际的  文字
Node.CDATA_SECTION_NODE(4) // 一个 CDATASection，例如 <!CDATA[[ … ]]>
Node.ENTITY_REFERENCE_NODE(5) // 已被弃用
Node.ENTITY_NODE(6) // 已被弃用
Node.PROCESSING_INSTRUCTION_NODE(7) // 一个用于XML文档的 ProcessingInstruction ，例如 <?xml-stylesheet ... ?> 声明
Node.COMMENT_NODE(8) // 一个 Comment 节点
Node.DOCUMENT_NODE(9) // 一个 Document 节点
Node.DOCUMENT_TYPE_NODE(10) // 描述文档类型的 DocumentType 节点。例如 <!DOCTYPE html>  就是用于 HTML5 的
Node.DOCUMENT_FRAGMENT_NODE(11) // 一个 DocumentFragment 节点
Node.NOTATION_NODE(12) // 已被弃用
```

### 确定节点类型

```js
// 1、
if (someNode.nodeType == Node.ELEMENT_NODE){ //在 IE 中无效
 alert("Node is an element.");
} 
// 2、
if (someNode.nodeType == 1){ //适用于所有浏览器
 alert("Node is an element.");
} 
```

### 节点信息

使用 nodeName 和 nodeValue 这两个属性。这两个属性的值完全取决于节点的类型。用前先检测下节点类型。

### 节点关系（文档中所有的节点之间都存在这样或那样的关系）

- 每个节点都有一个 childNodes 属性，其中保存着一个 NodeList 对象。

- NodeList 是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。

- 请注意，虽然可以通过方括号语法来访问 NodeList 的值，而且这个对象也有 length 属性，但它并不是 Array 的实例。

- NodeList 对象的独特之处在于，它实际上是基于 DOM 结构动态执行查询的结果，因此 DOM 结构的变化能够自动反映在NodeList 对象中。

- 常说，NodeList 是有生命、有呼吸的对象，而不是在我们第一次访问它们的某个瞬间拍摄下来的一张快照。

```js
var firstChild = someNode.childNodes[0];
var secondChild = someNode.childNodes.item(1);
var count = someNode.childNodes.length; 
```

### Array.prototype.slice()

- 对 arguments 对象使用 Array.prototype.slice()方法可以将其转换为数组。而采用同样的方法，也可以将 NodeList 对象转换为数组。

```js
var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0); 
// 兼容所有浏览器：（怪癖检测）
function convertToArray(nodes){
 	var array = null;
 	try {
 		array = Array.prototype.slice.call(nodes, 0); //针对非 IE 浏览器
 	} catch (ex) {
 		array = new Array();
 		for (var i=0, len=nodes.length; i < len; i++){
 			array.push(nodes[i]);
 		}
 	}
 	return array;
} 
```

### 操作节点

- appendChild()插入末尾

- 任何 DOM 节点也不能同时出现在文档中的多个位置上，所以appendChild一个已经存在的会转移。

- insertBefore()插入参照前面。接受两个参数：要插入的节点和作为参照的节点。

- replaceChild()替换

- removeChild()移除

- cloneNode()参数true或false，深复制浅复制（cloneNode()方法不会复制添加到 DOM 节点中的 JavaScript 属性，例如事件处理程序等。但IE会）

### 动态脚本：src引入和直接加入代码

```js
function loadScript(url){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}
// 然后，就可以通过调用这个函数来加载外部的 JavaScript 文件了：
loadScript("client.js"); 
```

```js
function loadScriptString(code){
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex){
        script.text = code;
    }
    document.body.appendChild(script);
}
// 下面是调用这个函数的示例：
loadScriptString("function sayHi(){alert('hi');}"); 
```

### 动态样式：scr引入和直接加入代码

```js
function loadStyles(url){
    var link = document.createElement("link"); 
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}
// 调用 loadStyles()函数的代码如下所示：
loadStyles("styles.css");
```

```js
function loadStyleString(css){
    var style = document.createElement("style"); 
    style.type = "text/css";
    try{
        style.appendChild(document.createTextNode(css));
    } catch (ex){
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}  
// 调用这个函数的示例如下：
loadStyleString("body{background-color:red}");
```

### NodeList、NamedNodeMap、HTMLCollection

- 这三个集合都是“动态的”；换句话说，每当文档结构发生变化时，它们都会得到更新。因此，它们始终都会保存着最新、最准确的信息。

- 所有 NodeList 对象都是在访问 DOM 文档时实时运行的查询

- 应该尽量减少访问 NodeList 的次数。因为每次访问 NodeList，都会运行一次基于文档的查询。

### CSS 选择符

- querySelector()仅仅是一个元素。不支持的参数会报错，找不到返回null

- querySelectorAll()返回的是一个 NodeList 的实例。不支持的参数会报错，找不到返回空NodeList

- matchesSelector()如果调用元素与该选择符匹配，返回 true；否则，返回 false。

- div.classList.remove("class1");

    - add(value)：将给定的字符串值添加到列表中。如果值已经存在，就不添加了。

    - contains(value)：表示列表中是否存在给定的值，如果存在则返回 true，否则返回 false。

    - remove(value)：从列表中删除给定的字符串。

    - toggle(value)：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。

### 焦点

- 页面加载、用户输入（通常是通过按 Tab 键）、在代码中调用 focus()方法

- document.activeElement 属性，这个属性始终会引用 DOM 中当前获得了焦点的元素。

- 文档刚刚加载完成时，document.activeElement 中保存的是 document.body 元素的引用。

- 文档加载期间，document.activeElement 的值为 null。

- document.hasFocus()方法，这个方法用于确定文档是否获得了焦点


```js
var button = document.getElementById("myButton");
button.focus();
alert(document.activeElement === button); //true 
```

### document.readyState

```js
// loading，正在加载文档；
// complete，已经加载完文档。
if (document.readyState == "complete"){
 //执行操作
}
```

### 区分渲染页面的模式是标准的还是混杂的【混杂模式BackCompat、标准模式CSS1Compat】

```js
if (document.compatMode == "CSS1Compat"){
    alert("Standards mode");
} else {
    alert("Quirks mode");
} 
```

### 获取head

```js
var head = document.head || document.getElementsByTagName("head")[0]; 
```

### 文档中实际使用的字符集

```js
document.charset
```

### 自定义数据属性

```js
// 以 data-开头即可：<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
// 通过元素的 dataset 属性来访问自定义属性的值：div.dataset.appId、div.dataset.myname
```

- [dataset以及dom相关api比较](https://www.zhangxinxu.com/wordpress/2020/12/dom-api-diff/)

### 相关读写方法

```js
// innerHTML插入html字符串
div.innerHTML = '<div>111</div>'
// div.outerHTML 表示读，返回返回调用它的元素及所有子节点的 HTML 标签
div.outerHTML =  '<div>111</div>'   // 表示写，替换原div

// insertAdjacentHTML【两个参数：插入位置和要插入的 HTML 文本】
//作为前一个同辈元素插入
element.insertAdjacentHTML("beforebegin", "Hello world!");
//作为第一个子元素插入
element.insertAdjacentHTML("afterbegin", "Hello world!");
//作为最后一个子元素插入
element.insertAdjacentHTML("beforeend", "Hello world!");
//作为后一个同辈元素插入
element.insertAdjacentHTML("afterend", "Hello world!"); 
```

- scrollIntoView()可以在所有 HTML 元素上调用，通过滚动浏览器窗口或某个容器元素，调用元素就可以出现在视口中。
    - 参数true，或者不传任何参数，那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐。
    - 参数false，调用元素会尽可能全部出现在视口中，（可能的话，调用元素的底部会与视口顶部平齐。）不过顶部不一定平齐。

```js
//让元素可见
document.forms[0].scrollIntoView(); 
// 当页面发生变化时，一般会用这个方法来吸引用户的注意力。实际上，为某个元素设置焦点也会导致浏览器滚动并显示出获得焦点的元素。
```

- outerText，innerText「通过 innertText 属性可以操作元素中包含的所有文本内容，包括子文档树中的文本。」
    - innerText 读值：它会按照由浅入深的顺序，将子文档树中的所有文本拼接起来。
    - innerText 写值：会删除元素的所有子节点，插入包含相应文本值的文本节点【编码后的，对文本中存在的 HTML 语法字符（小于号、大于号、引号及和号）进行了编码】。【通过 innerText 属性过滤掉 HTML 标签】
    - outerText：作用范围扩大到了包含调用它的节点
    - outerText：读：它会按照由浅入深的顺序，将子文档树中的所有文本拼接起来【且包含节点本身】
    - outerText：写：不只是替换调用它的元素的子节点，而是会替换整个元素（包括子节点）。

- contains「某个节点是不是另一个节点的后代」

```js
alert(document.documentElement.contains(document.body)); //true  调用着应为要查询的祖先节点
```

## DOM2、DOM3

### css

- 对于css中横杠-连接起来的样式，在js中更改为驼峰使用，唯一例外是float，float是js保留子，所以改为使用cssFloat，IE中为styleFloat。

### cssText

- 获取dom后，myDiv.style.cssText：读：获取style所有样式组成的字符串，写：覆盖其所有style。【设置 cssText 是为元素应用多项变化最快捷的方式】【返回的style不涉及引入的style样式】

```js
myDiv.style.cssText = "width: 25px; height: 100px; background-color: green"; 
```

### getComputedStyle

- myDiv.getComputedStyle（）返回最终生效的样式

### offsetTop

- 所有这些偏移量属性都是只读的，而且每次访问它们都需要重新计算

- [offsetTop相关](https://www.cnblogs.com/gagarinwjj/p/conflict_client_offset_scroll.html)

- [搜索offsetTop](https://www.zhangxinxu.com/wordpress/2011/09/)

### 获取元素left、top、right 和 bottom

```js
function getBoundingClientRect(element){
 var scrollTop = document.documentElement.scrollTop;
 var scrollLeft = document.documentElement.scrollLeft;

 if (element.getBoundingClientRect){
 if (typeof arguments.callee.offset != "number"){
 var temp = document.createElement("div");
 temp.style.cssText = "position:absolute;left:0;top:0;";
 document.body.appendChild(temp);
 arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
 document.body.removeChild(temp); 
 temp = null;
 }
 var rect = element.getBoundingClientRect();
 var offset = arguments.callee.offset;
 return {
 left: rect.left + offset,
 right: rect.right + offset,
 top: rect.top + offset,
 bottom: rect.bottom + offset
 };
 } else {
 var actualLeft = getElementLeft(element);
 var actualTop = getElementTop(element);
 return {
 left: actualLeft - scrollLeft,
 right: actualLeft + element.offsetWidth - scrollLeft,
 top: actualTop - scrollTop,
 bottom: actualTop + element.offsetHeight - scrollTop
 }
 }
} 
```