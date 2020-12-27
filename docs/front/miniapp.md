# 小程序

## 小程序基础

### 小程序 （解析富文本）

- 在需要使用WXparse的wxml引入import和模板

```html
<view class='ask_prolem_conter'>
<import src="../template/wxParse/wxParse.wxml" />
<template is="wxParse" data="{{wxParseData:articleone.nodes}}" />
</view>
<view class='ask_prolem_conter'>
<import src="../template/wxParse/wxParse.wxml" />
<template is="wxParse" data="{{wxParseData:articletwo.nodes}}" />
</view>
```

- 在对应js引入var WxParse = require('../template/wxParse/wxParse.js'); //html转小程序代码

- 在接口请求成功处

```js
success(res) {
    console.log(res.data)
    var articleone = res.data.data.cou_introduct.cat_content;
    var articletwo = res.data.data.cou_introduct.cou_desc;
    that.setData({
        cou_introduct: res.data.data.cou_introduct,
    })
    WxParse.wxParse('articleone', 'html', articleone, that, 5); //解析HTML
    WxParse.wxParse('articletwo', 'html', articletwo, that, 5); //解析HTML
}
```