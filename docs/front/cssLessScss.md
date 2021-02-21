# CSS

## 有意思的CSS属性

### object-fit属性

- object-fit：fill
被替换的内容大小可以填充元素的内容框。 整个对象将完全填充此框。 如果对象的高宽比不匹配其框的宽高比，那么该对象将被拉伸以适应。
- object-fit:container
被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。 整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”。
- object-fit:cover
被替换的内容大小保持其宽高比，同时填充元素的整个内容框。 如果对象的宽高比与盒子的宽高比不匹配，该对象将被剪裁以适应。
- object-fit:none
被替换的内容尺寸不会被改变。
- object-fit:scale-down
内容的尺寸就像是指定了none或contain，取决于哪一个将导致更小的对象尺寸。

### 三边阴影

box-shadow: 0px 8px 10px gray,-10px 8px 15px gray, 10px 8px 15px gray;

- [CSS box-shadow on three sides of a div? ](https://stackoverflow.com/questions/8738768/css-box-shadow-on-three-sides-of-a-div)

- [写CSS的常用套路](https://juejin.cn/post/6844904033405108232)

- [伪类伪元素](https://segmentfault.com/a/1190000007180315)

### cursor

cursor: pointer | wait | hand | text | move | not-allowed;

cursor: url(jartto.cur), url(http://jartto.wang/jartto.gif), auto;

- [Using_URL_values_for_the_cursor_property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Basic_User_Interface/Using_URL_values_for_the_cursor_property)

### currentColor currentColor 表示“当前的标签所继承的文字颜色”

- [currentColor-CSS变量](https://www.zhangxinxu.com/wordpress/2014/10/currentcolor-css3-powerful-css-keyword/)

### 去掉 chrome input 的背景黄色

- [去掉 chrome input 的背景黄色](https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete)

### linear-gradient 0.5px border

```css
.div::after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(0deg, transparent 50%, #e0e0e0 50%);
}
```

### drop-shadow

CSS3 滤镜 filter 中的 drop-shadow，drop-shadow 滤镜可以给元素或图片非透明区域添加投影

使用拼凑法作出的小气泡，如果气泡需要阴影的话，请用 drop-shadow 来替代 box-shadow

- [尖角带阴影](https://www.zhangxinxu.com/wordpress/2016/05/css3-filter-drop-shadow-vs-box-shadow/)

### 修改浏览器默认滚动条

```css
/*滚动条 start*/
::-webkit-scrollbar {
  width: 1px;
  height: 4px;
  background-color: #F5F5F5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background: #fff ;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  // background-color:rgba(7, 170, 247, 0.7);
  background-color: transparent;
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 3px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color:rgba(7, 170, 247, 1);
}
```
### safari placeholder bugs

在项目中遇到 input 的 placeholder 在 safari 下设置行高失效的问题，解决思路如下：
1.使用 padding 使提示文字居中，如果 font-size:14px, UI 高度为 40px,我们可以设 height：14px,padding:13px 0;
2.使用 line-height:1px;
3.使用 vertical-align: middle;

### 改变placeholder的字体颜色大小

```css
input::-webkit-input-placeholder { 
    /* WebKit browsers */ 
    font-size:14px;
    color: #333;
} input::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    font-size:14px;
    color: #333;
} input:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
    font-size:14px;
    color: #333;
}
```
### 单行文本溢出显示 ...

```css
overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
/* 当然还需要加宽度width来兼容部分浏览。 */
```
### 多行文本溢出显示...

- 因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;overflow: hidden;
```

### :focus-within

```css
/* 关键CSS代码： */
.bar {
    background-color: #e3e4e5;
    color: #888;
    padding-left: 40px;
}
.summary {
    display: inline-block;
    padding: 5px 28px;
    text-indent: -15px;
    user-select: none;
    outline: 0;
    position: relative;
    z-index: 1;
}
.summary::after {
    content: '';
    position: absolute;
    width: 12px; height: 12px;
    margin: 4px 0 0 .5ch;
    background: url(./arrow-on.svg) no-repeat;
    background-size: 100% 100%;
    transition: transform .2s;
}
.details:focus-within .summary,
.summary:hover {
    background-color: #fff;
    box-shadow: inset 1px 0 #ddd, inset -1px 0 #ddd;
}
.details:focus-within .summary::after {
    transform: rotate(180deg);
}
.box {
    display: none;
    position: absolute;
    border: 1px solid #ddd;
    background-color: #fff;
}
.details:focus-within .box {
    display: block;
}
```
```html
<!-- HTML代码： -->
<div class="bar">
    <div class="details">
        <a href="javascript:" class="summary" tabindex="0">我的消息</a> 
        <div class="box">
            <a href="javascript:">我的回答<sup>12</sup></a>
            <a href="javascript:">我的私信</a>
            <a href="javascript:">未评价订单<sup>2</sup></a>
            <a href="javascript:">我的关注</a>
        </div>
    </div>
</div>
<p>这里放一段文字表明上面的是悬浮效果。</p>
```

### CSS实现中文简繁转换

```css
font-variant-east-asian: traditional;
```
- 需要字体支持-OS X和iOS有效，因为这种效果需要字体本身包含繁体变体。而在Windows系统中的几个默认字体都没有包含繁体变体，而OS X，也就是iMac或者 Mac Pro，以及iOS系统，也就是苹果手机，iPad等设备的默认中文字体是包含繁体变体的。

- 苹方字体 支持。（font-variant-east-asian属性实现的繁体效果则原始的字符还是简体中文，只是视觉呈现的是繁体而已）

### ::part伪元素

- [part MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)

### 两个type=range input实现区域范围选择

- [使用了Shadow DOM开发的Web Components组件](https://www.zhangxinxu.com/study/202102/two-range-input-demo.php)

### 元素重叠

- margin负值定位、绝对定位外层relative限制，提示信息absolute绝对定位
- Grid布局也可以

```css
/* CSS代码： */
figure {
    display: inline-grid;
}
figure > img,
figure > figcaption {
    grid-area: 1 / 1 / 2 / 2;
}
figure > figcaption {
    align-self: end;
    text-align: center;
    background-color: #0009;
    color: #fff;
    line-height: 2;
}
/* HTML代码： */
<figure>
    <img src="11.jpg" alt="上海钓鱼自然风景">
    <figcaption>上海钓鱼自然风景 by zhangxinxu</figcaption>
</figure>
```

### Web Components中引入外部CSS的3种方法

- @import方法：简单，但性能差，兼容性好
```js
class uiRange extends HTMLElement {
    constructor () {
        super();
        // 附加Shadow DOM
        this.attachShadow({
            mode: 'open'
        });
        // 创建样式
        let node = document.createElement('style');
        node.innerHTML = `@import './range.css';`;
        this.shadowRoot.append(node);
    }
    ...
}
if (!customElements.get('ui-range')) {
    customElements.define('ui-range', uiRange);
}
```
- fetch获取请求：复杂，但性能好异步请求，兼容性好
```js
class uiRange extends HTMLElement {
    constructor () {
        super();
        // 附加Shadow DOM
        this.attachShadow({
            mode: 'open'
        });
        // 获取样式
        fetch('./range.css').then(response => response.text()).then(data => {
            let node = document.createElement('style');
            node.innerHTML = data;
            shadow.appendChild(node);
        });
    }
    ...
}
if (!customElements.get('ui-range')) {
    customElements.define('ui-range', uiRange);
}
```
- 作为CSS module import：简单，性能好，但兼容性差
```js
// import引入；CSS文件直接import这个语法目前仅Chrome及其同样内核浏览器支持，因此Firefox和Safari下使用的是fetch方法。
import styles from './range.css';
class uiRange extends HTMLElement {
    constructor () {
        super();

        let shadow = this.attachShadow({
            mode: 'open'
        });
        // adoptedStyleSheets采用；adoptedStyleSheets这个API方法是随着样式表构造（Constructed StyleSheets）一起出现的。存在与shadowRoot和document两个对象上，用来设置样式。
        shadow.adoptedStyleSheets = [styles];
    }
    ...
}
if (!customElements.get('ui-range')) {
    customElements.define('ui-range', uiRange);
}
```

### CSS全局关键字

- inherit、initial、unset和revert都是CSS全局关键字。（全局关键字指的是所有的CSS属性都可以使用这几个关键字作为属性值。）

    - revert关键字可以让当前元素的样式还原成浏览器内置的样式，注意，是还原到浏览器内置的默认样式，而不是CSS属性原本的初始值。

    - inherit是继承的意思

    - initial表示初始值的意思

    - unset表示不固定值

### 垂直排版，text-combine-upright

- 文本在水平或垂直方向上如何排布writing-mode: horizontal-tb【left-right-top-bottom】 | vertical-rl【top-bottom-right-left】 | vertical-lr【垂直方向内内容从上到下，水平方向从左到右】 | sideways-rl | sideways-lr

- 设定行中字符的方向【仅影响纵向模式（当 writing-mode 的值不是horizontal-tb）】text-orientation:
    - mixed默认值。顺时针旋转水平书写的字符90°，将垂直书写的文字自然布局。
    - upright将水平书写的字符自然布局（直排），包括垂直书写的文字（as well as the glyphs for vertical scripts）。注意这个关键字会导致所有字符被视为从左到右，也就是 direction 被强制设为 ltr。
    - sideways所有字符被布局为与水平方式一样，但是整行文本被顺时针旋转90°。
    - sideways-right处于兼容目的，sideways 的别名。
    - use-glyph-orientation对于SVG元素，这个关键字导致使用已弃用的SVG属性。 glyph-orientation-vertical 和 glyph-orientation-horizontal。

- text-combine-upright: 让垂直排版中的局部区域的文字水平排版，同时多个水平排版字符占据的宽度和一个正常的字符一样。
    - none初始值。不连续横排。
    - all试图水平排版框内所有连续字符，使它们占用框垂直线内单个字符的空间。
    - digits `<integer>`多少个连续数字认为是横着显示。默认是2，范围不能在2-4之外，否则认为是不合法。也就是最多只能让一个标签内4个字符水平排列。

### css属性

- line-break中文标点换行

- aspect-ratio明确元素的高宽比例

- text-underline-offset设置下划线偏移位置(下划线和文字重叠的问题)，text-decoration为underline才有效。`text-underline-offset: auto | <length> | <percent>`

## CSS揭秘

- [CSS揭秘](https://www.cnblogs.com/forever-xuehf/p/12907577.html)

## less

## scss