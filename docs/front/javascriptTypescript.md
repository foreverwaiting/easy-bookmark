# js 和 ts

## 基础语法

### ECMAScript一切区分大小写

### 标识符（变量/函数/属性名/函数参数）的规定：

- 第一个字符：必须是一个字母、下划线、或者$

- 其他字符：可以是字母、下划线、$、数字，标识符的字母可以是ASCII或者Unicode。

- 格式：驼峰大小写

- 关键字、保留字、true、false、null不可以用作标识符

### 严格模式下不确定行为将得到处理、不安全操作会报错

- 整个脚本使用严格模式：顶部添加    "use strict"

```js
// 指定函数严格模式：
function doSomething() {
"use strict";
//函数体
}
```

### 语句由分号结尾，省略则由解析器确定句尾。建议加分号！！！

### 关键字不可用于标识符，保留字（将来用作关键字的）也不可。严格模式下，eval和arguments也不可用作标识符或者属性名。

### 变量，松散类型。

```js
// var定义的变量成为该变量作用域中的局部变量，如：
function doSome() {
var x = 'nihao';
}
doSome();
alert(x);会报错，
```

## 数据类型

### 基本数据类型undefined、null、number、string、boolean，复杂数据类型object

### typeof操作值的返回值：undefined、boolean、string、number、object、function、

- 写法：typeof  被操作值。    typeof是一个操作值不是函数，所以被操作值不用带括号。

### typeof对未声明的变量和未初始化的变量都反悔undefined

### Boolean()方法对空字符串、0、NaN、null、undefined转为false

### Number范围，Number.MIN_VALUE、Number.MAX_VALUE，如果计算值不在范围内，自动转换为infinity和-infinity且后续无法参与计算，isFinite()检测是否超出范围。

### 任何数除以0返回NaN，not a number。且NaN!=NaN。isNaN()判断是否是个数，会转化后判断。

- 调用valueOf()方法、toString()方法

### 一元加操作符的操作跟Number()一样，parseInt(val，进制)，parseFloat()只解析十进制，且解析遇到第一个无效浮点字符停止，即在第二个小数点停止。

### string字符串，转义序列，\n换行、\b空格、\r回车、\\斜杠、\'单引号、\"双引号、\Unicode字符。

toString()：
数值.toString(进制)默认十进制，可传参。
布尔值.toString()：‘true‘  ‘false‘。
字符串.toString()：返回字符串的副本。
对null和undefined报错

String():
以上同上且对null返回‘null‘，对undefined返回‘undefined‘。

## 操作符

### 用于操作数据值的操作符【算术操作符、位操作符、关系操作符、相等操作符】。操作符可适用于字符串数字布尔对象，对对象回先执行valueOf或者toString方法。

### 一元操作符：只能操作一个值。

【++、--前置后置】前置先加或减，再操作；后置先操作再加或减。对所有类型值都可以操作。
【+、-加减】
【～、&、|、^按位】二进制操作：64位转为32位，执行位操作（0变1，1变0），32转回64位。正数同上，负数先转二进制补码（求绝对值二进制码，0变1，1变0就是二进制反码，二进制反码加1，就是这个负数的二进制），后续同理。
按位非～，操作数的负值减1。如～25  === -26
按位与&，23 & 3   两个数二进制数按规则求值。两个都为1才1，否则为0
按位或|，23 | 3   两个数二进制数按规则求值。有一个为1就是1，否则为0
按位异或^，23 ^ 3   两个数二进制数按规则求值。两个都为1和都为0是0，否则为1
【<<、>>、>>>左移有符号右移无符号右移】二进制移动
##：“<<”运算符执行左移位运算。在移位运算过程中，符号位始终保持不变。如果右侧空出位置，则自动填充为 0；超出 32 位的值，则自动丢弃。
##：“>>”运算符执行有符号右移位运算。与左移运算操作相反，它把 32 位数字中的所有有效位整体右移，再使用符号位的值填充空位。移动过程中超出的值将被丢弃。
##：“>>>”运算符执行五符号右移位运算。它把无符号的 32 位整数所有数位整体右移。
对于无符号数或正数右移运算，无符号右移与有符号右移运算的结果是相同的。
对于负数来说，无符号右移将使用 0 来填充所有的空位，同时会把负数作为正数来处理，所得结果会非常大所以，使用无符号右移运算符时要特别小心，避免意外错误。
【!、!!、&&、||】
【*、/、+、-、>、<、>=、<=、==、===、三元运算符、赋值=、逗号操作符，】

## 语句、函数

### label用户跳出循环，结合break、continue。

- [label用户跳出循环](https://www.cnblogs.com/forever-xuehf/p/12775024.html)

函数的命名参数可与arguments一起使用，arguments值永远跟对应命名参数值保持同步，但是独立的内存空间。
没有传递值的命名参数会是undefined，ECMAScript中所有参数传递的都是值，不可能通过引用传递参数。
没有重载，同名函数会覆盖。

## 基本类型引用类型

### 定义

按照JavaScript变量松散类型的本质，决定了他只是在特定时间用于保存特定值的一个名字而已。由于不存在定义某个变量必须要保存何种数据类型值的规则，变量的值及数据类型可以在脚本的生命周期内改变。

### 基本类型、引用类型

js引擎对变量的存储：堆（object对象）、栈（Boolean、Number、String、Undefined、Null、以及对象变量的指针）
栈内存中的变量一般都是已知大小或者有范围上限的，算作一种简单存储。而堆内存存储的对象类型数据对于大小这方面，一般都是未知的。个人认为，这也是为什么null作为一个object类型的变量却存储在栈内存中的原因。
【const定义常量其实就是指针，实际保证的就是这个常量指向的那个内存地址不可改动。
基本类型：的值指向的内存地址就是那个值，所以就是等于常量。
引用类型：的值指向的内存地址保存的只是一个指针，所以只能保证指针固定，对其依旧可写，但重新赋值会报错（因为改内存地址了），若想冻结对象使用Object.freeze()】
基本类型：是简单的数据段。按值访问，因为可以操作保存在变量中的实际的值。存在栈内存中
引用类型：是指那些可能由多个值构成的对象。存在堆内存中

### 传递参数【按值传递】

在向函数传递基本类型参数值时，被传递的值会被复制给一个局部变量（即命名参数，或者用ECMASscript的话来说，就是Arguements对象中的一个元素）。
在向函数传递引用类型参数值时，会把这个值在内存中的地址复制一份给局部变量，因此这个局部变量的变化会反应在函数的外部。

### 检测类型

检测变量基本数据类型使用typeof，instanceof根据原型链识别

### var逗号隔开可定义多个变量

## 环境

### 执行环境及作用域。

执行环境定义了变量和函数有权限访问的其他数据，决定各自行为。
每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都定义在这个对象中。

### 全局环境就是最外成的执行环境，根据ECMAScript实现所在的宿主环境不同，表示宿主环境的对象也不一样，在web浏览器，全局执行环境被认为是window对象。

某个执行环境中所有代码执行完毕，该环境被销毁，保存在其中的函数定义和变量也随之销毁。
全局执行环境只有到应用程序退出（如关闭网页或者浏览器）才销毁。
每个函数都有自己执行环境。

### ECMAScript执行流：

执行流进入一个函数 =》该函数执行环境推入环境栈中 =》执行完后 =》栈将其环境弹出 =》控制权返还给之前的执行环境。

### 某个执行环境：

当代码在一个执行环境中时，会创建变量对象的一个作用域链。
作用域链：保证对执行环境有权限访问的所有变量和函数有序访问。

### 链的前端============作用域链（由一个个变量对象连接）=========链的后端（最终是window）

前端1：当前执行代码所在环境的变量对象（环境中定义的所有变量和函数都定义在这个对象中）。
前端2：如果这个环境是函数，则其活动对象（arguments对象）就是变量对象。
内部环境可以通过作用域链访问所有外部环境，但外部环境不能访问内部环境的任何变量和函数。
环境之间的联系是线性的有序的，每个环境都可以向上搜索作用域链以查询变量和函数。

### 延长作用域链

执行环境类型：全局（window）、局部（函数）
延长原理：在作用域链前端临时加一个变量对象，在代码执行完后移除。
try-catch延长：创建一个新的变量对象，其中包含被抛出的错误对象的声明
with延长：将指定对象加到作用域链中

### 垃圾回收

自动垃圾回收机制：执行环境负责管理代码执行过程中使用的内存。
标记清除：执行流，进入执行环境标记为‘进入环境’，离开环境后，标记为‘离开环境’。然后最终，去除环境中的变量和被环境中变量引用的变量，此后标记的就是需要清除的。
引用计数：引用计的数为0是清除。（循环引用有问题）

### 管理内存

解除引用：设置为null（解除引用的真正作用是让值脱离执行环境，以便下次垃圾回收器运行是将其回收）

## 引用类型

### 各种类型，原型链，闭包，面向对象，函数

## 总结

### 基本类型值在内存中占据固定大小的空间，因此被保存在栈内存中。

### 从一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本。

### 引用类型的值是对象，保存在堆内存中。

### 包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针。

### 从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个数据。

### instanceof 操作符。

    所有变量（包括基本类型和引用类型）都存在于一个执行环境（也称为作用域）当中，这个执
    行环境决定了变量的生命周期，以及哪一部分代码可以访问其中的变量。以下是关于执行环境的几
    点总结：
     执行环境有全局执行环境（也称为全局环境）和函数执行环境之分；
     每次进入一个新执行环境，都会创建一个用于搜索变量和函数的作用域链；
     函数的局部环境不仅有权访问函数作用域中的变量，而且有权访问其包含（父）环境，乃至全
    局环境；
     全局环境只能访问在全局环境中定义的变量和函数，而不能直接访问局部环境中的任何数据；
     变量的执行环境有助于确定应该何时释放内存。
    JavaScript 是一门具有自动垃圾收集机制的编程语言，开发人员不必关心内存分配和回收问题。可
    以对 JavaScript 的垃圾收集例程作如下总结。
     离开作用域的值将被自动标记为可以回收，因此将在垃圾收集期间被删除。
     “标记清除”是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然
    后再回收其内存。
     另一种垃圾收集算法是“引用计数”，这种算法的思想是跟踪记录所有值被引用的次数。JavaScript
    引擎目前都不再使用这种算法；但在 IE 中访问非原生 JavaScript 对象（如 DOM 元素）时，这种
    算法仍然可能会导致问题。
     当代码中存在循环引用现象时，“引用计数”算法就会导致问题。
     解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回
    收内存，应该及时解除不再使用的全局对象、全局对象属性以及循环引用变量的引用。

## 事件

### 事件流

IE「微软」：事件冒泡流：由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。
Netscape「网景」：事件捕获流：不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件
事件捕获=》目标阶段=》事件冒泡

### DOM0 级事件处理程序

```js
// 给DOM赋值事件：
var btn = document.getElementById("myBtn");
btn.onclick = function(){
 alert("Clicked");
}; 
// 移除直接：btn.onclick = null; //删除事件处理程序
```

### “DOM2级事件

「3 个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。（最后这个布尔值参数如果是 true，表示在捕获
阶段调用事件处理程序；如果是 false，表示在冒泡阶段调用事件处理程序。）」

```js
// addEventListener()添加
// removeEventListener()移除
var btn = document.getElementById("myBtn");
btn.addEventListener("click", function(){
 alert(this.id);
}, false); 
```

通过 addEventListener()添加的事件处理程序只能使用 removeEventListener()来移除，移除时传入的参数与添加处理程序时使用的参数相同。所以：通过 addEventListener()添加的匿名函数将无法移除

### IE事件处理程序【IE8 及更早版本只支持事件冒泡，所以通过attachEvent()添加的事件处理程序都会被添加到冒泡阶段。所以就两个参数】

```js
attachEvent()
detachEvent()
var btn = document.getElementById("myBtn");
btn.attachEvent("onclick", function(){
 alert("Clicked");
});
```

### 事件对象 event

在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的
信息。包括导致事件的元素、事件的类型以及其他与特定事件相关的信息。例如，鼠标操作导致的事件
对象中，会包含鼠标位置的信息，而键盘操作导致的事件对象中，会包含与按下的键有关的信息。所有
浏览器都支持 event 对象，但支持方式不同。

### 事件类型

 UI（User Interface，用户界面）事件，当用户与页面上的元素交互时触发；
 焦点事件，当元素获得或失去焦点时触发；
 鼠标事件，当用户通过鼠标在页面上执行操作时触发；
 滚轮事件，当使用鼠标滚轮（或类似设备）时触发；
 文本事件，当在文档中输入文本时触发；
 键盘事件，当用户通过键盘在页面上执行操作时触发；
 合成事件，当为 IME（Input Method Editor，输入法编辑器）输入字符时触发；
 变动（mutation）事件，当底层 DOM 结构发生变化时触发。

### UI事件

load 事件：当页面完全加载后（包括所有图像、JavaScript 文件、CSS 文件等外部资源），就会触发 window 上面的 load 事件。图像上面也可以触发 load 事件。动态创建的img，要在指定 src 属性之前先指定onload事件。
unload 事件：切换页面触发
resize 事件：当浏览器窗口被调整到一个新的高度或宽度时，就会触发 resize 事件。浏览器窗口最小化或最大化时也会触发。
scroll 事件：

### 焦点事件

焦点事件会在页面元素获得或失去焦点时触发。利用这些事件并与 document.hasFocus()方法及document.activeElement 属性配合，可以知晓用户在页面上的行踪。

### 鼠标与滚轮事件

click、dblclick、mousedown、mouseenter、mouseleave、mousemove、mouseout、mouseover、mouseup
a. 客户区坐标位置clientX 和clientY：鼠标事件都是在浏览器视口中的特定位置上发生的。这个位置信息保存在事件对象的 clientX 和clientY 属性中。所有浏览器都支持这两个属性，它们的值表示事件发生时鼠标指针在视口中的水平和垂直坐标。【不包括页面滚动的距离】
b. 页面坐标位置pageX 和pageY：这两个属性表示鼠标光标在页面中的位置【坐标是从页面本身而非视口的左边和顶边计算的】
c. 电脑屏幕坐标位置：鼠标事件发生时，不仅会有相对于浏览器窗口的位置，还有一个相对于整个电脑屏幕的位置。而通过 screenX 和 screenY 属性就可以确定鼠标事件发生时鼠标指针相对于整个屏幕的坐标信息。
d. 修改键：按下鼠标时键盘上的某些键的状态也可以影响到所要采取的操作。
这些修改键就是 Shift、Ctrl、Alt 和 Meta（在 Windows 键盘中是 Windows 键，在苹果机中是 Cmd 键）
DOM 为此规定了 4 个属性，表示这些修改键的状态：shiftKey、ctrlKey、altKey 和 metaKey。这些属性中包含的都是布尔值，如果相应的键被按下了，则值为 true，否则值为 false。当某个鼠标事件发生时，通过检测这几个属性就可以确定用户是否同时按下了其中的键。

### 更多的事件信息

event 对象中还提供了 detail 属性，对于鼠标事件来说，detail 中包含了一个数值，表示在给定位置上发生了多少次单击。在同一个元素上相继地发生一次 mousedown 和一次 mouseup 事件算作一次单击。detail 属性从 1 开始计数，每次单击发生后都会递增。如果鼠标在 mousedown 和 mouseup 之间移动了位置，则 detail 会被重置为 0。

### 键盘

 keydown：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。
 keypress：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。
按下 Esc 键也会触发这个事件。Safari 3.1 之前的版本也会在用户按下非字符键时触发 keypress
事件。
 keyup：当用户释放键盘上的键时触发。
在发生 keydown 和 keyup 事件时，event 对象的 keyCode 属性中会包含一个代码，与键盘上一个特定的键对应。对数字字母字符键，keyCode 属性的值与 ASCII 码中对应小写字母或数字的编码相同。

### contextmenu 事件右键菜单

### beforeunload 事件

这个事件会在浏览器卸载页面之前触发，可以通过它来取消卸载并继续使用原有页面。
```js
EventUtil.addHandler(window, "beforeunload", function(event){
 event = EventUtil.getEvent(event);
 var message = "I'm really going to miss you if you go.";
 event.returnValue = message;
 return message;
}); 
```

### DOMContentLoaded 事件

形成完整的 DOM 树之后就会触发，
不理会图像、JavaScript 文件、CSS 文件或其他资源是否已经下载完毕。与 load 事件不同，
DOMContentLoaded 支持在页面下载的早期添加事件处理程序，这也就意味着用户能够尽早地与页面
进行交互。

### hashchange 事件

HTML5 新增了 hashchange 事件，以便在 URL 的参数列表（及 URL 中“#”号后面的所有字符串）
发生变化时通知开发人员。
必须要把 hashchange 事件处理程序添加给 window 对象，然后 URL 参数列表只要变化就会调用
它。此时的 event 对象应该额外包含两个属性：oldURL 和 newURL。这两个属性分别保存着参数列表
变化前后的完整 URL。

```js
EventUtil.addHandler(window, "hashchange", function(event){
 alert("Old URL: " + event.oldURL + "\nNew URL: " + event.newURL);
}); 
```

### 设备事件

orientationchange苹果的横屏竖屏
MozOrientation火狐的包括xyz竖直左倾右倾，只有带加速计的设备才支持 MozOrientation 事件。设备如何移动
deviceorientation设备在空间中朝向哪儿xyz
devicemotion告诉开发人员设备什么时候移动，而不仅仅是设备方向如何改变。例如，通过 devicemotion 能够检测到设备是不是正在往下掉，或者是不是被走着的人拿在手里。

### 触摸与手势事件

 touchstart：当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
 touchmove：当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用preventDefault()
可以阻止滚动。
 touchend：当手指从屏幕上移开时触发。
 touchcancel：当系统停止跟踪触摸时触发。
除了常见的 DOM 属性外，触摸事件还包含下列三个用于跟踪触摸的属性。
 touches：表示当前跟踪的触摸操作的 Touch 对象的数组。
 targetTouchs：特定于事件目标的 Touch 对象的数组。
 changeTouches：表示自上次触摸以来发生了什么改变的 Touch 对象的数组。
每个 Touch 对象包含下列属性：
 clientX：触摸目标在视口中的 x 坐标。
 clientY：触摸目标在视口中的 y 坐标。
 identifier：标识触摸的唯一 ID。
 pageX：触摸目标在页面中的 x 坐标。
 pageY：触摸目标在页面中的 y 坐标。
 screenX：触摸目标在屏幕中的 x 坐标。
 screenY：触摸目标在屏幕中的 y 坐标。
 target：触摸的 DOM 节点目标。
手势事件：
iOS 2.0 中的 Safari 还引入了一组手势事件。当两个手指触摸屏幕时就会产生手势，手势通常会改变
显示项的大小，或者旋转显示项。有三个手势事件，分别介绍如下。
 gesturestart：当一个手指已经按在屏幕上而另一个手指又触摸屏幕时触发。
 gesturechange：当触摸屏幕的任何一个手指的位置发生变化时触发。
 gestureend：当任何一个手指从屏幕上面移开时触发。

### 对“事件处理程序过多”问题的解决方案就是事件委托。事件委托利用了事件冒泡，

```js
// 复杂：
var item1 = document.getElementById("goSomewhere");
var item2 = document.getElementById("doSomething");
var item3 = document.getElementById("sayHi");
EventUtil.addHandler(item1, "click", function(event){
 location.href = "http://www.wrox.com";
});
EventUtil.addHandler(item2, "click", function(event){
 document.title = "I changed the document's title";
});
EventUtil.addHandler(item3, "click", function(event){
 alert("hi");
}); 
```

```js
// 简单：
var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event){
 event = EventUtil.getEvent(event);
 var target = EventUtil.getTarget(event);
 switch(target.id){
 case "doSomething":
 document.title = "I changed the document's title";
 break;
 case "goSomewhere":
 location.href = "http://www.wrox.com";
 break;
 case "sayHi":
 alert("hi");
 break;
 }
}); 
```

与前面未使用事件委托的代码比一比，会发现这段代码的事前消耗更低，因为只取得了一个 DOM 元素，只添加了一个事件处理程序。虽然对用户来说最终的结果相同，但这种技术需要占用的内存更少。所有用到按钮的事件（多数鼠标事件和键盘事件）都适合采用事件委托技术。

### 模拟事件，模拟点击等

## 表单

### 基础

通过 document.forms 可以取得页面中所有的表单。在这个集合中，可以通过数值索引或name 值来取得特定的表单。
使用 type 特性值为"reset"的input或button都可以创建重置按钮

### 共有的表单字段属性

 disabled：布尔值，表示当前字段是否被禁用。
 form：指向当前字段所属表单的指针；只读。
 name：当前字段的名称。
 readOnly：布尔值，表示当前字段是否只读。
 tabIndex：表示当前字段的切换（tab）序号。
 type：当前字段的类型，如"checkbox"、"radio"，等等。
 value：当前字段将被提交给服务器的值。对文件字段来说，这个属性是只读的，包含着文件
在计算机中的路径。
HTML5 为表单字段新增了一个 autofocus 属性

### 共有的表单字段事件

 blur：当前字段失去焦点时触发。
 change：对于和
元素，在它们失去焦点且 value 值改变时触发；对于
`<select>`元素，在其选项改变时触发。
 focus：当前字段获得焦点时触发。

```js
EventUtil.addHandler(textbox, "change", function(event){
 event = EventUtil.getEvent(event);
 var target = EventUtil.getTarget(event);

 if (/[^\d]/.test(target.value)){
 target.style.backgroundColor = "red";
 } else {
 target.style.backgroundColor = "";
 }
}); 
```

### select()

select()方法：选择所有文本，
select()事件：可以知道用户什么时候选择了文本，但仍然不知道用户选择了什么文本
返回选择了什么文本
function getSelectedText(textbox){
 return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
} 

### 选择部分文本

setSelectionRange()方法。这个方法接收两个参数：要选择的第一个字符的索引和要选择的最后一个字符之后的字符的索引

### 剪切板事件

 beforecopy：在发生复制操作前触发。
 copy：在发生复制操作时触发。
 beforecut：在发生剪切操作前触发。
 cut：在发生剪切操作时触发。
 beforepaste：在发生粘贴操作前触发。
 paste：在发生粘贴操作时触发。
要访问剪贴板中的数据，可以使用 clipboardData 对象。【三个方法：getData()、setData()和 clearData()】
IE 中，这个对象是 window 对象的属性；
在 Firefox 4+、Safari 和 Chrome 中，这个对象是相应 event 对象的属性。
但是，在 Firefox、Safari 和 Chorme 中，只有在处理剪贴板事件期间 clipboardData 对象才有效，这是为了防止对剪贴板
的未授权访问；
在 IE 中，则可以随时访问 clipboardData 对象。

### HTML5 约束验证API 

required、input的type为"email"和"url"、【"number"、"range"、"datetime"、"datetime-local"、"date"、"month"、"week"，
还有"time"】、min 属性（最小的可能值）、max 属性（最大的可能值）和 step 属性（从 min 到 max 的两个刻度间的差值）。

### 输入模式

HTML5 为文本字段新增了 pattern 属性。这个属性的值是一个正则表达式，用于匹配文本框中的值。
只想允许在文本字段中输入数值：pattern="\d+"

### 检测表单有效性

checkValidity()方法可以检测表单中的某个字段是否有效。所有表单字段都有个方法，有效true，否则返回false。
值是否有效的判断依据：a。必填字段中如果没有值就是无效的。b。字段中的值与 pattern 属性不匹配也是无效的。
【要检测整个表单是否有效，可以在表单自身调用 checkValidity()方法。如果所有表单字段都有效，这个方法返回 true；即使有一个字段无效，这个方法也会返回 false。】

### validity 属性则会告诉你为什么字段有效或无效。

customError ：如果设置了setCustomValidity()，则为true，否则返回false。
 patternMismatch：如果值与指定的pattern 属性不匹配，返回true。
 rangeOverflow：如果值比max 值大，返回true。
 rangeUnderflow：如果值比min 值小，返回true。
 stepMisMatch：如果min 和max 之间的步长值不合理，返回true。
 tooLong：如果值的长度超过了maxlength 属性指定的长度，返回true。有的浏览器（如Firefox 4）
会自动约束字符数量，因此这个值可能永远都返回false。
 typeMismatch：如果值不是"mail"或"url"要求的格式，返回true。
 valid：如果这里的其他属性都是false，返回true。checkValidity()也要求相同的值。
 valueMissing：如果标注为required 的字段中没有值，返回true。
如下：

```js
if (input.validity && !input.validity.valid){
 if (input.validity.valueMissing){
 alert("Please specify a value.")
 } else if (input.validity.typeMismatch){
 alert("Please enter an email address.");
 } else {
 alert("Value is invalid.");
 }
} 
```

### 通过对form设置 novalidate 属性，可以告诉表单不进行验证。

### 如果为 appendChild()方法传入一个文档中已有的元素，那么就会先从该元素的父节点中移除它，再把它添加到指定的位置。【将一个选择框中的选项移动到另一个选择框中】

### 富文本编辑【两种实现】

frames 与designMode【富文本编辑功能是通过一个包含空 HTML 文档的 iframe 元素来实现】
contenteditable

### 操作富文本【使用 document.execCommand()】

execCommand命令修改富文本
【3 个参数：要执行的命令名称、false，执行命令必须的一个值（如果不需要值，则传递null）】：如

document.execCommand("bold", false, null);
document.execCommand("fontsize", false, 6);
命令相关的方法：
第一个方法： queryCommandEnabled()检测是否可以针对当前选择的文本，或者当前插入字符所在位置执行某个命令。【参数命令名称，返回bool值】【也可用于确定是否已将指定命令应用到了选择的文本】
第二个方法： queryCommandValue()用于取得执行命令时传入的值（即前面例子中传给document.execCommand()的第三个参数）

## canvas2D

### 要使用canvas元素，必须先设置其 width 和 height 属性

### 要在这块画布（canvas）上绘图，需要取得绘图上下文

### 要取得绘图上下文对象的引用，需要调用getContext()方法并传入上下文的名字。传入"2d"，就可以取得 2D 上下文对象。

```js
var drawing = document.getElementById("drawing"); 
var context = drawing.getContext("2d"); 
context.drawImage(image, 50, 10, 20, 30); //【图片url、x、y、图片宽高】
context.drawImage(image, 0, 10, 50, 50, 0, 100, 40, 60); //【要绘制的图像、源图像的 x 坐标、源图像的 y 坐标、源图像的宽度、源图像的高度、目标图像的 x 坐标、目标图像的 y 坐标、目标图像的宽度、目标图像的高度】
```

给 drawImage()方法传入 HTML 元素外，还可以传入另一个canvas元素作为其第一个参数。这样，就可以把另一个画布内容绘制到当前画布上。

### toDataURL()方法，可以导出在元素上绘制的图像【跨域限制】

### 基本功能：填充和描边、绘制矩形、绘制路径、绘制文本、变换、绘制图像、阴影、渐变

### 使用图像数据

getImageData()取得原始图像数据【4个参数：要取得其数据的画面区域的 x 和 y 坐标以及该区域的像素宽度和高度】
返回值三个属性：width、height 和data
data 属性是一个数组，保存着图像中每一个像素的数据。
data 数组中，每一个像素用4 个元素来保存，分别表示红、绿、蓝和透明度值。如：

```js
var data = imageData.data,
 red = data[0],
 green = data[1],
 blue = data[2],
 alpha = data[3]; 
```

数组中每个元素的值都介于 0 到 255 之间（包括 0 和 255）。
能够直接访问到原始图像数据，就能够以各种方式来操作这些数据。【创建一个简单的灰阶过滤器】

```js
var drawing = document.getElementById("drawing");
//确定浏览器支持
元素
if (drawing.getContext){
 var context = drawing.getContext("2d"),
 image = document.images[0],
 imageData, data,
 i, len, average,
 red, green, blue, alpha;
 //绘制原始图像
 context.drawImage(image, 0, 0);
 //取得图像数据
 imageData = context.getImageData(0, 0, image.width, image.height);
 data = imageData.data;
 for (i=0, len=data.length; i < len; i+=4){
 red = data[i];
 green = data[i+1];
 blue = data[i+2];
 alpha = data[i+3];
 //求得 rgb 平均值
 average = Math.floor((red + green + blue) / 3);
 //设置颜色值，透明度不变
 data[i] = average;
 data[i+1] = average;
 data[i+2] = average;
 }

 //回写图像数据并显示结果
 imageData.data = data;
 context.putImageData(imageData, 0, 0);
} 
```

*绘制一幅图像
*取得原始图像数据
*for 循环遍历图像数据中的每一个像素「循环控制变量 i 都递增 4」
*在取得每个像素的红、绿、蓝颜色值后，计算出它们的平均值。再把这个平均值设置为每个颜色的值，结果就是去掉了每个像素的颜色，只保留了亮度接近的灰度值（即彩色变黑白）。
*把 data 数组回写到 imageData 对象后，调用putImageData()方法把图像数据绘制到画布上

### 合成

globalAlpha 是一个介于 0 和 1 之间的值（包括 0 和 1），用于指定所有绘制的透明度。默认值为 0。
//修改全局透明度
context.globalAlpha = 0.5; 

globalCompositionOperation 表示后绘制的图形怎样与先绘制的图形结合。这个属性的值是字符串如下：

//设置合成操作
context.globalCompositeOperation = "destination-over";

### WebGL 是针对 Canvas 的 3D 上下文。

## 跨文档消息传递

### postMessage()方法：目的：向另一个地方传递数据。【“另一个地方”指的是包含在当前页面中的元素，或者由当前页面弹出的窗口。】

两个参数：一条消息【最好JSON.stringify()转一下】和一个表示消息接收方来自哪个域的字符串。
//注意：所有支持 XDM 的浏览器也支持 iframe 的 contentWindow 属性
var iframeWindow = document.getElementById("myframe").contentWindow;
iframeWindow.postMessage("A secret", "http://www.wrox.com"); 

### 接收到 XDM 消息时，会触发 window 对象的 message 事件。

onmessage 处理程序的事件对象：
 data：作为 postMessage()第一个参数传入的字符串数据。
 origin：发送消息的文档所在的域，例如"http://www.wrox.com"。
 source：发送消息的文档的 window 对象的代理。这个代理对象主要用于在发送上一条消息的窗口中调用 postMessage()方法。如果发送消息的窗口来自同一个域，那这个对象就是window。

```js
EventUtil.addHandler(window, "message", function(event){
 //确保发送消息的域是已知的域
 if (event.origin == "http://www.wrox.com"){
 //处理接收到的数据
 processMessage(event.data);
 //可选：向来源窗口发送回执
 event.source.postMessage("Received!", "http://p2p.wrox.com");
 }
});
```

## 拖放

### 默认情况下，图像、链接和文本是可以拖动的

### 拖放事件

(1) dragstart
(2) drag
(3) dragend 
(1) dragenter
(2) dragover
(3) dragleave 或 drop

### 自定义放置目标

可以把任何元素变成有效的放置目标，方法是重写 dragenter 和 dragover 事件的默认行为

### dataTransfer对象【在拖放事件的事件处理程序中访问 dataTransfer 对象。】

有两个主要方法：getData()和 setData()。
getData()可以取得由 setData()保存的值。
setData()方法的第一个参数，也是 getData()方法唯一的一个参数，是一个字符串，表示保存的数据类型，取为"text"或"URL"【HTML5则对此加以扩展，允许指定各种MIME类型】
//设置和接收文本数据
event.dataTransfer.setData("text", "some text");
var text = event.dataTransfer.getData("text");
//设置和接收 URL
event.dataTransfer.setData("URL", "http://www.wrox.com/");
var url = event.dataTransfer.getData("URL");

### dataTransfer 对象的两个属性：dropEffect 和effectAllowed 

dropEffect：被拖动的元素能够执行哪种放置行为【在 ondragenter 事件处理程序中针对放置目标来设置它】
 "none"：不能把拖动的元素放在这里。这是除文本框之外所有元素的默认值。
 "move"：应该把拖动的元素移动到放置目标。
 "copy"：应该把拖动的元素复制到放置目标。
 "link"：表示放置目标会打开拖动的元素（但拖动的元素必须是一个链接，有 URL）。
effectAllowed：允许拖动元素的哪种 dropEffect【在 ondragstart 事件处理程序中设置 effectAllowed 属性】
 "uninitialized"：没有给被拖动的元素设置任何放置行为。
 "none"：被拖动的元素不能有任何行为。
 "copy"：只允许值为"copy"的 dropEffect。
 "link"：只允许值为"link"的 dropEffect。
 "move"：只允许值为"move"的 dropEffect。
 "copyLink"：允许值为"copy"和"link"的 dropEffect。
 "copyMove"：允许值为"copy"和"move"的 dropEffect。
 "linkMove"：允许值为"link"和"move"的 dropEffect。
 "all"：允许任意 dropEffect。

## 媒体元素

### 开始和结束标签之间的任何内容都将作为后备内容，在浏览器不支持这两个媒体元素的情况下显示。

width、 height播放器大小
poster视频海报封面
controls显示UI控件

### 因为并非所有浏览器都支持所有媒体格式，所以可以指定多个不同的媒体来源。为此，不用在标签中指定 src 属性，而是要像下面这样使用一或多个元素。

### 音视频audio，video共有的属性

### 事件

### 事件栗子

```js
//取得元素的引用
var player = document.getElementById("player"),
 btn = document.getElementById("video-btn"),
 curtime = document.getElementById("curtime"),
 duration = document.getElementById("duration");
//更新播放时间
duration.innerHTML = player.duration;
//为按钮添加事件处理程序
EventUtil.addHandler(btn, "click", function(event){
 if (player.paused){
 player.play();
 btn.value = "Pause";
 } else {
 player.pause();
 btn.value = "Play";
 }
});
//定时更新当前时间
setInterval(function(){
 curtime.innerHTML = player.currentTime;
}, 250);
```

### audio元素还有一个原生的 JavaScript 构造函数 Audio，可以在任何时候播放音频 。

从同为 DOM元素的角度看，Audio 与 Image 很相似，但 Audio 不用像 Image 那样必须插入到文档中。
只要创建一个新实例，并传入音频源文件即可。

```js
var audio = new Audio("sound.mp3");
EventUtil.addHandler(audio, "canplaythrough", function(event){
 audio.play();
}); 
```

## 错误

### 捕获错误

```js
try{
 // 可能会导致错误的代码
} catch(error){
 // 在错误发生时怎么处理
}
```

### finally【只要代码中包含 finally 子句，则无论 try 或 catch 语句块中包含什么代码——甚至 return 语句，都不会阻止 finally 子句的执行】

```js
function testFinally(){
 try {
 return 2;
 } catch (error){
 return 1;
 } finally {
 return 0;
 }
}
```

3、抛出错误【与 try-catch 语句相配的还有一个 throw 操作符，用于随时抛出自定义错误。】  

## JSON

### 序列化选项JSON.stringify()：除了要序列化的 JavaScript 对象外，还可以接收另外两个参数

第一个参数是个过滤器，可以是一个数组，也可以是一个函数；

第二个参数是一个选项，表示是否在 JSON 字符串中保留缩进

```js
// 如下：
var jsonText = JSON.stringify(book, function(key, value){
 switch(key){
 case "authors":
 return value.join(",")
 case "year":
 return 5000;
 case "edition":
 return undefined;
 default:
 return value;
 }
});
```

### JSON.parse()方法也可以接收另一个参数，该参数是一个函数，将在每个键值对儿上调用

区别 JSON.stringify()接收的替换（过滤）函数（replacer），这个函数被称为还原函数（reviver），但实际上这两个函数的签名是相同的——它们都接收两个参数，一个键和一个值，而且都需要返回一个值。

## 跨域

### 利用图像Ping 【在线广告跟踪浏览量的主要方式】【动态地创建图像，使用它们的 onload 和 onerror 事件处理程序来确定是否接收到了响应。】

```js
var img = new Image();
img.onload = img.onerror = function(){
 alert("Done!");
};
img.src = "http://www.example.com/test?name=Nicholas"; 
```

使用img标签，图像 Ping 最常用于跟踪用户点击页面或动态广告曝光次数。
缺点：一、只能发送 GET 请求，二：无法访问服务器的响应文本。
图像 Ping 只能用于浏览器与服务器间的单向通信

### jsonp

- 【优点：能够直接访问响应文本，支持在浏览器与服务器之间双向通信】
- 【缺点：JSONP 是从其他域中加载代码执行，其他域不一定安全，且不知道调用是否成功】

```js
function handleResponse(response){
 alert("You’re at IP address " + response.ip + ", which is in " +
 response.city + ", " + response.region_name);
}
var script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script, document.body.firstChild); 
```

通过查询地理定位服务来显示你的 IP 地址和位置信息

### Comet服务器推送

Ajax 是一种从页面向服务器请求数据的技术，而 Comet 则是一种服务器向页面推送数据的技术。Comet 能够让信息近乎实时地被推送到页面上。
- 两种实现 Comet 的方式：
    - 1、长轮询和流【长轮询是传统轮询（也称为短轮询）的一个翻版】。
    - 2、HTTP 流。


### Web Sockets【可跨域】

要创建 Web Socket，先实例一个 WebSocket 对象并传入要连接的 URL：
var socket = new WebSocket("ws://www.example.com/server.php"); 【必须给 WebSocket 构造函数传入绝对 URL】
实例化了 WebSocket 对象后，浏览器就会马上尝试创建连接：
 WebSocket.OPENING (0)：正在建立连接。
 WebSocket.OPEN (1)：已经建立连接。
 WebSocket.CLOSING (2)：正在关闭连接。
 WebSocket.CLOSE (3)：已经关闭连接。

- 关闭

关闭 Web Socket 连接，可以在任何时候调用 close()方法。socket.close()

- send【客户端给服务器发消息】

Web Sockets 只能通过连接发送纯文本数据，发前json转下
socket.send(JSON.stringify(data));

- message事件【服务端给客户端发消息】

当服务器向客户端发来消息时：监听message

```js
socket.onmessage = function(event){
 var data = event.data; // data是字符串要转一下
 //处理数据
}; 
```

- 其他事件
 open：在成功建立连接时触发。
 error：在发生错误时触发，连接不能持续。
 close：在连接关闭时触发。【事件对象event的属性：wasClean布尔值是否已经明确地关闭、code服务器返回的数值状态码、reason字符串，包含服务器发回的消息】
- 
```js
var socket = new WebSocket("ws://www.example.com/server.php");
socket.onopen = function(){
 alert("Connection established.");
};
socket.onerror = function(){
 alert("Connection error.");
};
socket.onclose = function(){
 alert("Connection closed.");
}; 
```

## 安全的类型检测

### Object.prototype.toString

```js
function isArray(value){
 return Object.prototype.toString.call(value) == "[object Array]";
} 
```

### Page Visibility API

用户是不是正在与页面交互
 document.hidden：表示页面是否隐藏的布尔值。页面隐藏包括页面在后台标签页中或者浏览
器最小化。
 document.visibilityState：表示下列 4 个可能状态的值。
	页面在后台标签页中或浏览器最小化。
	页面在前台标签页中。
	实际的页面已经隐藏，但用户可以看到页面的预览（就像在 Windows 7 中，用户把鼠标移动到
任务栏的图标上，就可以显示浏览器中当前页面的预览）。
	页面在屏幕外执行预渲染处理。
 visibilitychange 事件：当文档从可见变为不可见或从不可见变为可见时，触发该事件。

### Geolocation API 

navigator.geolocation 对象：
第一个方法是 getCurrentPosition()，调用这个方法就会触发请求用户共享地理定位信息的对话框。
方法接收 3 个参数：成功回调函数、可选的失败回调函数、可选的选项对象
成功回调函数：返回Position 对象参数【对象有两个属性：coords 和timestamp】
coords 对象中将包含下列与位置相关的信息：
 latitude：以十进制度数表示的纬度。
 longitude：以十进制度数表示的经度。
 accuracy：经、纬度坐标的精度，以米为单位。
有些浏览器还可能会在 coords 对象中提供如下属性。
 altitude：以米为单位的海拔高度，如果没有相关数据则值为 null。
 altitudeAccuracy：海拔高度的精度，以米为单位，数值越大越不精确。
 heading：指南针的方向，0°表示正北，值为 NaN 表示没有检测到数据。
 speed：速度，即每秒移动多少米，如果没有相关数据则值为 null。
失败回调函数：参数是一个对象，包含两个属性：message 和 code。
【code 属性中保存着一个数值，表示错误的类型：用户拒绝共享（1）、位置无效（2）或者超时（3）】
第二个方法：希望跟踪用户的位置，那么可以使用另一个方法 watchPosition()。watchPosition() 与定时调用getCurrentPosition()的效果相同

### Web Workers

实例化 Worker 对象并传入要执行的 JavaScript 文件名就可以创建一个新的 Web Worker。例如：
var worker = new Worker("stufftodo.js"); 
这行代码会导致浏览器下载 stufftodo.js，
但只有 Worker 接收到消息才会实际执行文件中的代码。
要给 Worker 传递消息，可以使用 postMessage()方法
worker.postMessage(“start! "); 
Worker 是通过 message 和 error 事件与页面通信的
worker.onmessage = function(event){
 var data = event.data;
 //对数据进行处理
} 
Worker 不能完成给定的任务时会触发 error 事件
发生 error 事件时，事件对象中包含三个属性：filename、lineno 和 message，分别表示发生错误的文件名、代码行号和完整的错误消息
worker.terminate(); //立即停止 Worker 的工作。【Worker 中的代码会立即停止执行，后续的所有过程都不会再发生（包括 error 和 message 事件也不会再触发）。】

### 图文不可复制

```css
-webkit-user-select: none; 
-ms-user-select: none;
-moz-user-select: none;
-khtml-user-select: none;
user-select: none;
```

- 复制的文本 都会被加上一段来源说明
    - 1、监听copy事件，并阻止这个事件的默认行为。
    - 2、获取选中的内容（window.getSelection()）加上版权信息，然后设置到剪切板（clipboarddata.setData()）。

### 微任务 宏任务

### sessionStorage 、localStorage 和 cookie 之间的区别

共同点：用于浏览器端存储的缓存数据
不同点：
(1)、存储内容是否发送到服务器端：当设置了Cookie后，数据会发送到服务器端，造成一定的宽带浪费；
        web storage,会将数据保存到本地，不会造成宽带浪费；
(2)、数据存储大小不同：Cookie数据不能超过4K,适用于会话标识；web storage数据存储可以达到5M;
(3)、数据存储的有效期限不同：cookie只在设置了Cookid过期时间之前一直有效，即使关闭窗口或者浏览器；
        sessionStorage,仅在关闭浏览器之前有效；localStorage,数据存储永久有效；
(4)、作用域不同：cookie和localStorage是在同源同窗口中都是共享的；sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；

### Web Storage与Cookie相比存在的优势：

(1)、存储空间更大：IE8下每个独立的存储空间为10M，其他浏览器实现略有不同，但都比Cookie要大很多。
(2)、存储内容不会发送到服务器：当设置了Cookie后，Cookie的内容会随着请求一并发送的服务器，这对于本地存储的数据是一种带宽浪费。而Web Storage中的数据则仅仅是存在本地，不会与服务器发生任何交互。
(3)、更多丰富易用的接口：Web Storage提供了一套更为丰富的接口，如setItem,getItem,removeItem,clear等,使得数据操作更为简便。cookie需要自己封装。
(4)、独立的存储空间：每个域（包括子域）有独立的存储空间，各个存储空间是完全独立的，因此不会造成数据混乱。

## getXXXByXXX与querySelector

getXXXByXXX 获取的是动态集合，querySelector获取的是静态集合。

简单的说就是，动态就是选出的元素会随文档改变，静态的不会，取出来之后就和文档的改变无关了。

### lodash稀疏数组

Array.from(arrayLike[, mapFn[, thisArg]])

参数：
arrayLike
想要转换成数组的伪数组对象或可迭代对象。
mapFn
如果指定了该参数，新数组中的每个元素会执行该回调函数。
thisArg
可选参数，执行回调函数 mapFn 时 this 对象。

返回值：
一个新的数组实例。

一、填充数组
【使用值填充】：
const result = Array.from({ length }, () => 0); 
const result = Array(length).fill(0);
【使用对象填充】：
const resultA = Array.from({ length }, () => ({}));    每个对象都是独立的
const resultB = Array(length).fill({});    每个对象都是引用的同一处
由 Array.from 返回的 resultA 使用不同空对象实例进行初始化。之所以发生这种情况是因为每次调用时，mapFunction，即此处的 () => ({}) 都会返回一个新的对象。

二、序列生成器(指定范围)
三、Array.from(new Set(array));去重

```js
let length = 5
let resultA = Array.from({ length }, () => ({
    'a': '1',
    'b': '2',
}));
let resultB = Array(5).fill({
    'a': '1',
    'b': '2',
});
console.log(resultA)
console.log(resultB)
console.log(resultA[0] === resultA[1])
console.log(resultB[0] === resultB[1])

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
range(1, 10, 2); 
// [1, 3, 5, 7, 9]
```

### 节流函数防抖函数

```js
// 节流函数
  const throttle = (fn, delay = 500) => {
    let flag = true;
    return (...args) => {
      if (!flag) return;
      flag = false;
      setTimeout(() => {
        fn.apply(this, args);
        flag = true;
      }, delay);
    };
  };

  // 防抖函数
  const debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  };
```

### 满足 if (a == 1 & a == 2 & a == 3)这个条件

```js
const a = {
  i: 1,
  toString() {
    return a.i++
  }
}
```

## JS 定时器

### 从 JS 执行机制说起

浏览器（或者说 JS 引擎）执行 JS 的机制是基于事件循环。

由于 JS 是单线程，所以同一时间只能执行一个任务，其他任务就得排队，后续任务必须等到前一个任务结束才能开始执行。

为了避免因为某些长时间任务造成的无意义等待，JS 引入了异步的概念，用另一个线程来管理异步任务。

同步任务直接在主线程队列中顺序执行，而异步任务会进入另一个任务队列，不会阻塞主线程。等到主线程队列空了（执行完了）的时候，就会去异步队列查询是否有可执行的异步任务了（异步任务通常进入异步队列之后还要等一些条件才能执行，如 ajax 请求、文件读写），如果某个异步任务可以执行了便加入主线程队列，以此循环。

### 定时器

JS 的定时器目前有三个：setTimeout、setInterval 和 setImmediate。

定时器也是一种异步任务，通常浏览器都有一个独立的定时器模块，定时器的延迟时间就由定时器模块来管理，当某个定时器到了可执行状态，就会被加入主线程队列。

JS 定时器非常实用，做动画的肯定都用到过，也是最常用的异步模型之一。

有时候一些奇奇怪怪的问题，加一个 setTimeout(fn, 0)（以下简写 setTimeout(0)）就解决了。不过，如果对定时器本身不熟悉，也会产生一些奇奇怪怪的问题。

### setTimeout

setTimeout(fn, x) 表示延迟 x 毫秒之后执行 fn。

使用的时候千万不要太相信预期，延迟的时间严格来说总是大于 x 毫秒的，至于大多少就要看当时 JS 的执行情况了。

另外，多个定时器如不及时清除（clearTimeout），会存在干扰，使延迟时间更加捉摸不透。所以，不管定时器有没有执行完，及时清除已经不需要的定时器是个好习惯。

HTML5 规范规定最小延迟时间不能小于 4ms，即 x 如果小于 4，会被当做 4 来处理。 不过不同浏览器的实现不一样，比如，Chrome 可以设置 1ms，IE11/Edge 是 4ms。

setTimeout 注册的函数 fn 会交给浏览器的定时器模块来管理，延迟时间到了就将 fn 加入主进程执行队列，如果队列前面还有没有执行完的代码，则又需要花一点时间等待才能执行到 fn，所以实际的延迟时间会比设置的长。如在 fn 之前正好有一个超级大循环，那延迟时间就不是一丁点了。

```js
(function testSetTimeout() {
    const label = 'setTimeout';
    console.time(label);
    setTimeout(() => {
        console.timeEnd(label);
    }, 10);
    for(let i = 0; i < 100000000; i++) {}
})();
// setTimeout: 335.187ms，远远不止 10ms。
```

### setInterval

setInterval 的实现机制跟 setTimeout 类似，只不过 setInterval 是重复执行的。

对于 setInterval(fn, 100) 容易产生一个误区：并不是上一次 fn 执行完了之后再过 100ms 才开始执行下一次 fn。 事实上，setInterval 并不管上一次 fn 的执行结果，而是每隔 100ms 就将 fn 放入主线程队列，而两次 fn 之间具体间隔多久就不一定了，跟 setTimeout 实际延迟时间类似，和 JS 执行情况有关。

```js
(function testSetInterval() {
    let i = 0;
    const start = Date.now();
    const timer = setInterval(() => {
        i += 1;
        i === 5 && clearInterval(timer);
        console.log(`第${i}次开始`, Date.now() - start);
        for(let i = 0; i < 100000000; i++) {}
        console.log(`第${i}次结束`, Date.now() - start);
    }, 100);
})();

// 第1次开始 100
// 第1次结束 1089
// 第2次开始 1091
// 第2次结束 1396
// 第3次开始 1396
// 第3次结束 1701
// 第4次开始 1701
// 第4次结束 2004
// 第5次开始 2004
// 第5次结束 2307
```

可见，虽然每次 fn 执行时间都很长，但下一次并不是等上一次执行完了再过 100ms 才开始执行的，实际上早就已经等在队列里了。

另外可以看出，当 setInterval 的回调函数执行时间超过了延迟时间，已经完全看不出有时间间隔了。

如果 setTimeout 和 setInterval 都在延迟 100ms 之后执行，那么谁先注册谁就先执行回调函数。

### setImmediate

这算一个比较新的定时器，目前 IE11/Edge 支持、Nodejs 支持，Chrome 不支持，其他浏览器未测试。

从 API 名字来看很容易联想到 setTimeout(0)，不过 setImmediate 应该算是 setTimeout(0) 的替代版。

在 IE11/Edge 中，setImmediate 延迟可以在 1ms 以内，而 setTimeout 有最低 4ms 的延迟，所以 setImmediate 比 setTimeout(0) 更早执行回调函数。不过在 Nodejs 中，两者谁先执行都有可能，原因是 Nodejs 的事件循环和浏览器的略有差异。

```js
(function testSetImmediate() {
    const label = 'setImmediate';
    console.time(label);
 
    setImmediate(() => {
        console.timeEnd(label);
    });
})();
// Edge 输出：setImmediate: 0.555 毫秒
```

很明显，setImmediate 设计来是为保证让代码在下一次事件循环执行，以前 setTimeout(0) 这种不可靠的方式可以丢掉了。

### requestAnimationFrame

requestAnimationFrame 并不是定时器，但和 setTimeout 很相似，在没有 requestAnimationFrame 的浏览器一般都是用 setTimeout 模拟。

requestAnimationFrame 跟屏幕刷新同步，大多数屏幕的刷新频率都是 60Hz，对应的 requestAnimationFrame 大概每隔 16.7ms 触发一次，如果屏幕刷新频率更高，requestAnimationFrame 也会更快触发。基于这点，在支持 requestAnimationFrame 的浏览器还使用 setTimeout 做动画显然是不明智的。

在不支持 requestAnimationFrame 的浏览器，如果使用 setTimeout/setInterval 来做动画，最佳延迟时间也是 16.7ms。 如果太小，很可能连续两次或者多次修改 dom 才一次屏幕刷新，这样就会丢帧，动画就会卡；如果太大，显而易见也会有卡顿的感觉。

有趣的是，第一次触发 requestAnimationFrame 的时机在不同浏览器也存在差异，Edge 中，大概 16.7ms 之后触发，而 Chrome 则立即触发，跟 setImmediate 差不多。按理说 Edge 的实现似乎更符合常理。

```js
(function testRequestAnimationFrame() {
    const label = 'requestAnimationFrame';
    console.time(label);
 
    requestAnimationFrame(() => {
        console.timeEnd(label);
    });
})();
// Edge 输出：requestAnimationFrame: 16.66 毫秒

// Chrome 输出：requestAnimationFrame: 0.698ms
```

但相邻两次 requestAnimationFrame 的时间间隔大概都是 16.7ms，这一点是一致的。当然也不是绝对的，如果页面本身性能就比较低，相隔的时间可能会变大，这就意味着页面达不到 60fps。

### Promise

Promise 是很常用的一种异步模型，如果我们想让代码在下一个事件循环执行，可以选择使用 setTimeout(0)、setImmediate、requestAnimationFrame(Chrome) 和 Promise。

而且 Promise 的延迟比 setImmediate 更低，意味着 Promise 比 setImmediate 先执行。

```js
function testSetImmediate() {
    const label = 'setImmediate';
    console.time(label);
 
    setImmediate(() => {
        console.timeEnd(label);
    });
}
 
function testPromise() {
    const label = 'Promise';
    console.time(label);
    new Promise((resolve, reject) => {
        resolve();
    }).then(() => {
        console.timeEnd(label);
    });
}
 
testSetImmediate();
testPromise();
// Edge 输出：Promise: 0.33 毫秒 setImmediate: 1.66 毫秒
```

尽管 setImmediate 的回调函数比 Promise 先注册，但还是 Promise 先执行。

可以肯定的是，在各 JS 环境中，Promise 都是最先执行的，setTimeout(0)、setImmediate 和 requestAnimationFrame 顺序不确定。

### process.nextTick

process.nextTick 是 Nodejs 的 API，比 Promise 更早执行。

事实上，process.nextTick 是不会进入异步队列的，而是直接在主线程队列尾强插一个任务，虽然不会阻塞主线程，但是会阻塞异步任务的执行，如果有嵌套的 process.nextTick，那异步任务就永远没机会被执行到了。

使用的时候要格外小心，除非你的代码明确要在本次事件循环结束之前执行，否则使用 setImmediate 或者 Promise 更保险。

## 事件循环、微任务、宏任务

## Math 对象

### Math对象提供以下一些静态方法：

Math.abs()：绝对值

Math.ceil()：向上取整

Math.floor()：向下取整

Math.max()：最大值

Math.min()：最小值

Math.pow()：幂运算

Math.sqrt()：平方根

Math.log()：自然对数

Math.exp()：e的指数

Math.round()：四舍五入

Math.random()返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。

### 🌰栗子：任意范围的随机数生成函数如下：

```js
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

getRandomArbitrary(1.5, 6.5)
// 2.4942810038223864
```

### 🌰栗子：任意范围的随机整数生成函数如下：

```js
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(1, 6) // 5
```

### 🌰栗子：返回随机字符的例子如下：

```js
function random_str(length) {
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET += '0123456789-_';
  var str = '';
  for (var i = 0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}

random_str(6) // "NdQKOr"
```

### 循环for-of Iterator

跟 forEach 相比，可以正确响应 break, continue, return。

for-of 循环不仅支持数组，还支持大多数类数组对象，例如 DOM nodelist 对象。

for-of 循环也支持字符串遍历，它将字符串视为一系列 Unicode 字符来进行遍历。

for-of 也支持 Map 和 Set （两者均为 ES6 中新增的类型）对象遍历。

### Object.freeze

```js
const user = {
  name: 'Joe',
  age: 25,
  pet: {
    type: 'dog',
    name: 'Buttercup',
  },
};

Object.freeze(user);

user.pet.name = 'Daffodil';

console.log(user.pet.name); //Daffodil
```

Object.freeze 将会使对象浅冻结，但不会保护深层属性不被修改。在这个例子中，不能对 user.age 进行修改，但是对 user.pet.name 进行修改却没有问题。如果我们觉得需要保护一个对象，避免其“从头到尾”发生改变，则可以递归地应用 Object.freeze 或使用现有的“深度冻结”库。


### Promise 解决的顺序与 Promise.all 无关。

```js
const timer = a => {
  return new Promise(res =>
    setTimeout(() => {
      res(a);
    }, Math.random() * 100)
  );
};

const all = Promise.all([timer('first'), timer('second')]).then(data =>
  console.log(data)
);
// ["first", "second"]
```
我们能够可靠地依靠它们按照数组参数中提供的相同顺序返回。

### 展开操作符

```js
const arr1 = [{ firstName: 'James' }];
const arr2 = [...arr1];
arr2[0].firstName = 'Jonah';

console.log(arr1);
//  [{ firstName: "Jonah" }]
```

展开操作符会创建数组的浅表副本

### 数组方法绑定

```js
const map = ['a', 'b', 'c'].map.bind([1, 2, 3]);
map(el => console.log(el));
// 123
```
当 ['a', 'b', 'c'].map 被调用时，将会调用 this' 值为 '['a'，'b'，'c'] 的 Array.prototype.map。但是当用作 引用 时， Array.prototype.map 的引用。

Function.prototype.bind 会将函数的 this 绑定到第一个参数（在本例中为 [1, 2, 3]），用 this 调用Array.prototype.map 将会导致这些项目被迭代并输出。

## JS Base64编码解码

## Base64解码

（浏览器中）：
var decodedData = window.atob(encodedData);
或者（浏览器或js Worker线程中）：
var decodedData = self.atob(encodedData);

## Base64编码
语法为（浏览器中）：
var encodedData = window.btoa(stringToEncode);
或者（浏览器或js Worker线程中）：
var encodedData = self.btoa(stringToEncode);

## 中文Base64数据转换会有报错问题

中文先encode转码和decode编码。btoa(unescape(encodeURIComponent(str)))

## 任意文件Base64编码

借助FileReader对象和readAsDataURL方法，我们可以把任意的文件转换为Base64 Data-URI。
var reader = new FileReader();
reader.onload = function(e) {
  // e.target.result就是该文件的完整Base64 Data-URI
};
reader.readAsDataURL(file);

# HTML字符的转义和反转义

## 1. 转义document.createTextNode把HTML内容作为文本节点的textContent内容，然后使用普通元素的innerHTML属性返回下就可以了

```js
let textNode = document.createTextNode('<span>by zhangxinxu</span>');
let div = document.createElement('div');
div.append(textNode);
console.log(div.innerHTML);
```
## 2.反转义DOMParser API。

let str = '&lt;span&gt;by zhangxinxu&lt;/span&gt;';
let doc = new DOMParser().parseFromString(str, 'text/html');
console.log(doc.documentElement.textContent);

## 3.借助<textarea>元素，这是IE浏览器时代常用的一种方法

let textarea = document.createElement('textarea');
textarea.innerHTML = '&lt;span&gt;by zhangxinxu&lt;/span&gt;';
console.log(textarea.childNodes[0].nodeValue);

[DOMParser和XMLSerializer两个API简介](https://www.zhangxinxu.com/wordpress/2019/06/domparser-xmlserializer-api/)

DOMParser可以让HTML字符串解析为DOM树，格式类型包括XML文档，或者HTML文档。
XMLSerializer方法的作用和DOMParser相反，XMLSerializer可以让DOM树对象序列化为字符串。

```js
传统的字符串处理代码示意：
/**
 * 转义HTML标签的方法
 * @param  {String} str 需要转义的HTML字符串
 * @return {String}     转义后的字符串
 */
var funEncodeHTML = function (str) {
    if (typeof str == 'string') {
        return str.replace(/<|&|>/g, function (matches) {
            return ({
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;'
            })[matches];
        });
    }

    return '';
};
/**
 * 反转义HTML标签的方法
 * @param  {String} str 需要反转义的字符串
 * @return {String}     反转义后的字符串
 */
var funDecodeHTML = function (str) {
    if (typeof str == 'string') {
        return str.replace(/&lt;|&gt;|&amp;/g, function (matches) {
            return ({
                '&lt;': '<',
                '&gt;': '>',
                '&amp;': '&'
            })[matches];
        });
    }

    return '';
};
```



## 万物皆空之 JavaScript 原型

- [万物皆空之 JavaScript 原型](https://ulivz.com/2016/12/20/javascript-prototype/)