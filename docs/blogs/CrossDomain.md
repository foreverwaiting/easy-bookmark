# 跨域

## 几种解决跨域的方式

待补充...

- [跨域](https://segmentfault.com/a/1190000015597029)

## 代理 Nginx

- [代理](https://www.cnblogs.com/forever-xuehf/p/14022133.html)

- [Nginx](https://mp.weixin.qq.com/s/ylprzDaCrncnLB2Owa-ivw)


## Cookie localStorage sessionStorage

一、Cookie

　　cookie 虽然在持久保存客户端数据供了方便，分担了服务器存储的负担，但还是有很多
局限性：
每个特定的域名下最多生成 20 个 cookie
1.IE6 或更低版本最多 20 个 cookie
2.IE7 和之后的版本最后可以有 50 个 cookie。
3.Firefox 最多 50 个 cookie
4.chrome 和 Safari 没有做硬性限制
5.IE 和 Opera 会清理近期最少使用的 cookie，Firefox 会随机清理 cookie。
6.cookie 的最大大约为 4096 字节，为了兼容性，一般不能超过 4095 字节。
7.IE 供了一种存储可以持久化用户数据，叫做 uerData，从 IE5.0 就开始支持。每个数据最多 128K，每个域名下最多 1M。这个持久化数据放在缓存中，
如果缓存没有清理，那么会一直存在。
 
优点：极高的扩展性和可用性
1.通过良好的编程，控制保存在 cookie 中的 session 对象的大小。
2.通过加密和安全传输技术（SSL），减少 cookie 被破解的可能性。
【SSL：安全套接字层】SSL由Netscape公司于1994年创建，它旨在通过Web创建安全的Internet通信。它是一种标准协议，用于加密浏览器和服务器之间的通信。它允许通过Internet安全轻松地传输账号密码、银行卡、手机号等私密信息。SSL证书就是遵守SSL协议，由受信任的CA机构颁发的数字证书。
【HTTPS：安全超文本传输协议】HTTPS是HTTP的安全版本，它可以通过SSL / TLS连接保护在线传输的任何通信。简而言之，HTTPS=HTTP+SSL。如果想要建立HTTPS连接，则首先必须从受信任的证书颁发机构（CA）Gworg机构注册 SSL证书。安装SSL证书后，网站地址栏HTTP后面就会多一个“S”，还有绿色安全锁标志。
3.只在 cookie 中存放不敏感数据，即使被盗也不会有重大损失。
4.控制 cookie 的生命期，使之不会永远有效。偷盗者很可能拿到一个过期的 cookie。
 
缺点：
1.Cookie数量和长度的限制。每个 domain 最多只能有 20 条 cookie，每个 cookie 长度不能超过 4KB，否则会被截掉。
2.安全性问题。如果 cookie 被人拦截了，那人就可以取得所有的 session 信息。即使加密也与事无补，因为拦截者并不需要知道 cookie 的意义，他只要原样转发 cookie 就可以达到目的了。
3.有些状态不可能保存在客户端。例如，为了防止重复交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。
 
二、浏览器本地存储
　　sessionStorage 和 localStorage
html5 中的 WebStorage 包括了两种存储方式：sessionStorage 和 localStorage。
sessionStorage 用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage 不是一种持久化的本地存储，仅仅是会话级别的存储。
localStorage 用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。
 
　　web storage 和 cookie 的区别
Web Storage 的概念和 cookie 相似，区别是它是为了更大容量存储设计的。
Cookie 的大小是受限的，并且每次你请求一个新的页面的时候 Cookie 都会被发送过去，这样无形中浪费了带宽，另外 cookie 还需要指定作用域，不可以跨域调用。
除此之外，Web Storage 拥有 setItem,getItem,removeItem,clear 等方法，不像 cookie 需要前端开发者自己封装 setCookie，getCookie。
但是 Cookie 也是不可以或缺的：Cookie 的作用是与服务器进行交互，作为 HTTP 规范的一部分而存在 ，而 Web Storage 仅仅是为了在本地“存储”数据而生
　　localStorage优缺点：
优点：1、localStorage 拓展了 cookie 的 4K 限制。

　　　2、localStorage 会可以将第一次请求的数据直接存储到本地，这个相当于一个 5M 大小的针对于前端页面的数据库，相比于 cookie 可以节约带宽，但是这个却是只有在高版本的浏览器中才支持的。

缺点：1、浏览器的大小不统一，并且在 IE8 以上的 IE 版本才支持 localStorage 这个属性。

2、目前所有的浏览器中都会把localStorage的值类型限定为string类型，这个在对我们日常比较常见的JSON对象类型需要一些转换。

3、localStorage在浏览器的隐私模式下面是不可读取的。

4、localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡。

5、localStorage不能被爬虫抓取到。

注意⚠️：判断是否支持：

if(！window.localStorage){
    alert("浏览器不支持localstorage");
    return false;
}
var storage=window.localStorage;
增：storage.setItem("name",data);    存data需要JSON.stringify(data);
删：storage.removeItem("name");
改：storage.name=newData;
查：storage.getItem("name");    取data需要JSON.parse(data);
清：storage.clear();

// Storage 接口储存的数据发生变化时，会触发 storage 事件，可以指定这个事件的监听函数。利用这个可以实现跨tab页通信
window.addEventListener('storage', onStorageChange);


三、作用域

localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份。

localstorage在所有同源窗口中都是共享的；
sessionStorage:不能在不同的浏览器窗口中共享，即使是同一个页面；
cookie: 也是在所有同源窗口中都是共享的；
localStorage理论上来说是永久有效的，即不主动清空的话就不会消失，即使保存的数据超出了浏览器所规定的大小，也不会把旧数据清空而只会报错。但需要注意的是，在移动设备上的浏览器或各Native App用到的WebView里，localStorage都是不可靠的，可能会因为各种原因（比如说退出App、网络切换、内存不足等原因）被清空。

待补充...

## Cookie 的 SameSite 属性

- [SameSite](chrome://flags/)

## Cookie 和 Session 关系和区别

待补充...

- [不止跨域](https://mp.weixin.qq.com/s/9KOZL0c7OnrbCFPj1vzqAw)
