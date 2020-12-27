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

## less

## scss