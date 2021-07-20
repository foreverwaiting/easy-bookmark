# 浏览器相关

## 跨域

- [跨域，不止 CORS](https://mp.weixin.qq.com/s/9KOZL0c7OnrbCFPj1vzqAw)

## 跨浏览器选项卡实时通信方法

- 场景
  - 将对应用程序的主题修改（例如，深色或浅色主题）应用到所有已打开的浏览器选项卡中
  - 请求用于身份验证的最新令牌，并在浏览器选项卡之间共享
  - 跨浏览器选项卡同步应用程序状态数据等

### 使用本地存储事件 LocalStorage

```js
// 存取数据
window.localStorage.setItem('loggedIn', 'true')
// 监听变化
window.addEventListener('storage', event => {
  if (event.storageArea != localStorage) return
  if (event.key === 'loggedIn') {
  }
})
```

### 使用 BroadcastChannel API 接口

- Broadcast Channel API 可以实现同 源 下浏览器不同窗口，Tab 页，frame 或者 iframe 下的 浏览器上下文 (通常是同一个网站下不同的页面)之间的简单通讯。
- 广播频道会被命名和绑定到指定的源

- BroadcastChannel API 允许选项卡、窗口、Frames、Iframes 和 Web Workers 之间的通信。一个选项卡可以创建一个 Channel 并在其中发送消息。

- 通过创建一个监听某个频道下的 BroadcastChannel 对象，你可以接收发送给该频道的所有消息。一个有意思的点是，你不需要再维护需要通信的 iframe 或 worker 的索引。它们可以通过构造 BroadcastChannel 来简单地“订阅”特定频道，并在它们之间进行全双工（双向）通信。

```js
// // 连接到广播频道
const bc = new BroadcastChannel('app-data')
// 发送简单消息的示例(postMessage方法的参数可以是任意对象)
bc.postMessage(data)

// 接收消息
const bc = new BroadcastChannel('app-data')
bc.addEventListener('message', event => {
  console.log(event.data)
})

// 断开频道连接
bc.close()
```

- 浏览器上下文（Windows、Tabs、Frames、或 Iframes）之间可以进行通信。尽管这是浏览器选项卡之间的一种很便捷的通信方式，但 safari 和 IE 是不支持这种方式的。

- [Broadcast Channel API MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Broadcast_Channel_API)

### 使用 Service Worker 发送消息

```js
// 发送消息
navigator.serviceWorker.controller.postMessage({
  broadcast: data
})

// 在接收 Worker 的其他浏览器选项卡中可以监听事件
addEventListener('message', async event => {
  if ('boadcast' in event.data) {
    const allClients = await clients.matchAll()
    for (const client of allClients) {
      client.postMessage(event.broadcast)
    }
  }
})
```

- [Service Worker 实例](https://googlechrome.github.io/samples/service-worker/post-message/)

### 使用 window.postMessage() 方法

- Window.postMessage() 方法是跨浏览器选项卡、弹出窗口和 Iframes 进行通信的传统方法之一

  - 优点: 可以支持跨源通信
  - 限制: 需要引用另一个浏览器选项卡。所以这种方法只适用于通过 window.open() 或 document.open() 方法

- [postMessage 规范](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

```js
// 发送消息
targetWindow.postMessage(message, targetOrigin)
// 目标窗口可以监听事件
window.addEventListener(
  'message',
  event => {
    if (event.origin !== 'http://localhost:8080') return
    // 可以做测试
  },
  false
)
```

### 详解 Cookie 和 Session 关系和区别

- Cookie 是什么？
  从它的词语本身含义来看：Cookie：n. 饼干；小甜点 N-COUNT A cookie is a piece of computer software which enables a website you have visited to recognize you if you visit it again. 再次访问某一网站时，能令网站识别访问人的计算机软件。
  Cookie 是客户端保存用户信息的一种机制，用来记录用户的一些信息。如何识别特定的客户呢？cookie 就可以做到。每次 HTTP 请求时，客户端都会发送相应的 Cookie 信息到服务端。它的过期时间可以任意设置，如果你不主动清除它，在很长一段时间里面都可以保留着，即便这之间你把电脑关机了。
  既然它是存储在客户端的，换句话说通过某些手法我就可以篡改本地存储的信息来欺骗服务端的某些策略，那该怎么办呢？我们先按下不表，来看看另外一位朋友 —— Session。
- Session 是什么？
  同样，我们先来看看释义：Session：普通释义：n. 会议；（法庭的）开庭；（议会等的）开会；学期；讲习会 计算机释义：会话
  Session 是在无状态的 HTTP 协议下，服务端记录用户状态时用于标识具体用户的机制。它是在服务端保存的用来跟踪用户的状态的数据结构，可以保存在文件、数据库或者集群中。在浏览器关闭后这次的 Session 就消失了，下次打开就不再拥有这个 Session。其实并不是 Session 消失了，而是 Session ID 变了，服务器端可能还是存着你上次的 Session ID 及其 Session 信息，只是他们是无主状态，也许一段时间后会被删除。
  实际上 Cookie 与 Session 都是会话的一种方式。它们的典型使用场景比如 “购物车”，当你点击下单按钮时，服务端并不清楚具体用户的具体操作，为了标识并跟踪该用户，了解购物车中有几样物品，服务端通过为该用户创建 Cookie/Session 来获取这些信息。
  如果你的站点是多节点部署，使用 Nginx 做负载均衡，那么有可能会出现 Session 丢失的情况（比如，忽然就处于未登录状态）。这时可以使用 IP 负载均衡（IP 绑定 ip_hash，每个请求按访问 ip 的 hash 结果分配，这样每个访客固定访问一个后端服务器，可以解决 Session 的问题），或者将 Session 信息存储在集群中。在大型的网站中，一般会有专门的 Session 服务器集群，用来保存用户会话，这时可以使用缓存服务比如 Memcached 或者 Redis 之类的来存放 Session。
  目前大多数的应用都是用 Cookie 实现 Session 跟踪的。第一次创建 Session 时，服务端会通过在 HTTP 协议中反馈到客户端，需要在 Cookie 中记录一个 Session ID，以便今后每次请求时都可分辨你是谁。有人问，如果客户端的浏览器禁用了 Cookie 怎么办？建议使用 URL 重写技术进行会话跟踪，即每次 HTTP 交互，URL 后面都被附加上诸如 sid=xxxxx 的参数，以便服务端依此识别用户。

1、Cookie 在客户端（浏览器），Session 在服务器端。
2、Cookie 的安全性一般，他人可通过分析存放在本地的 Cookie 并进行 Cookie 欺骗。在安全性第一的前提下，选择 Session 更优。重要交互信息比如权限等就要放在 Session 中，一般的信息记录放 Cookie 就好了。
3、单个 Cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 Cookie。
4、Session 可以放在 文件、数据库或内存中，比如在使用 Node 时将 Session 保存在 redis 中。由于一定时间内它是保存在服务器上的，当访问增多时，会较大地占用服务器的性能。考虑到减轻服务器性能方面，应当适时使用 Cookie。
5、Session 的运行依赖 Session ID，而 Session ID 是存在 Cookie 中的，也就是说，如果浏览器禁用了 Cookie，Session 也会失效（但是可以通过其它方式实现，比如在 url 中传递 Session ID）。
6、用户验证这种场合一般会用 Session。因此，维持一个会话的核心就是客户端的唯一标识，即 Session ID。

### Cookie 的 SameSite 属性

Cookie 是怎么设置的呢？简单来说就是：
客户端发送 HTTP 请求到服务器
当服务器收到 HTTP 请求时，在响应头里面添加一个 Set-Cookie 字段
浏览器收到响应后保存下 Cookie
之后对该服务器每一次请求中都通过 Cookie 字段将 Cookie 信息发送给服务器。

在请求返回的 Response Headers 可以看到 Set-Cookie 字段：
看下请求，可以在 Request Headers 看到 cookie 字段：

- Expires：
  Expires 用于设置 Cookie 的过期时间。比如：
  Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
  当 Expires 属性缺省时，表示是会话性 Cookie，像上图 Expires 的值为 Session，表示的就是会话性 Cookie。当为会话性 Cookie 的时候，值保存在客户端内存中，并在用户关闭浏览器时失效。需要注意的是，有些浏览器提供了会话恢复功能，这种情况下即使关闭了浏览器，会话期 Cookie 也会被保留下来，就好像浏览器从来没有关闭一样。
  与会话性 Cookie 相对的是持久性 Cookie，持久性 Cookies 会保存在用户的硬盘中，直至过期或者清除 Cookie。这里值得注意的是，设定的日期和时间只与客户端相关，而不是服务端。

- Max-Age：
  Max-Age 用于设置在 Cookie 失效之前需要经过的秒数。比如：
  Set-Cookie: id=a3fWa; Max-Age=604800;
  Max-Age 可以为正数、负数、甚至是 0。
  如果 max-Age 属性为正数时，浏览器会将其持久化，即写到对应的 Cookie 文件中。
  当 max-Age 属性为负数，则表示该 Cookie 只是一个会话性 Cookie。
  当 max-Age 为 0 时，则会立即删除这个 Cookie。
  假如 Expires 和 Max-Age 都存在，Max-Age 优先级更高。

- Domain
  Domain 指定了 Cookie 可以送达的主机名。假如没有指定，那么默认值为当前文档访问地址中的主机部分（但是不包含子域名）。
  像淘宝首页设置的 Domain 就是 .http://taobao.com，这样无论是 a.taobao.com 还是 b.taobao.com 都可以使用 Cookie。
  在这里注意的是，不能跨域设置 Cookie，比如阿里域名下的页面把 Domain 设置成百度是无效的：
  Set-Cookie: qwerty=219ffwef9w0f; Domain=baidu.com; Path=/; Expires=Wed, 30 Aug 2020 00:00:00 GMT

- Path
  Path 指定了一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部。比如设置 Path=/docs，/docs/Web/ 下的资源会带 Cookie 首部，/test 则不会携带 Cookie 首部。
  Domain 和 Path 标识共同定义了 Cookie 的作用域：即 Cookie 应该发送给哪些 URL。

- Secure
  标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端。使用 HTTPS 安全协议，可以保护 Cookie 在浏览器和 Web 服务器间的传输过程中不被窃取和篡改。

- HTTPOnly
  设置 HTTPOnly 属性可以防止客户端脚本通过 document.cookie 等方式访问 Cookie，有助于避免 XSS 攻击。

- SameSite【SameSite 属性可以让 Cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）。】
  SameSite 可以有下面三种值：
  Strict 仅允许一方请求携带 Cookie，即浏览器将只发送相同站点请求的 Cookie，即当前网页 URL 与请求目标 URL 完全一致。
  Lax 允许部分第三方请求携带 Cookie
  None 无论是否跨站都会发送 Cookie

### 跨域和跨站

首先要理解的一点就是跨站和跨域是不同的。同站(same-site)/跨站(cross-site)」和第一方(first-party)/第三方(third-party)是等价的。但是与浏览器同源策略（SOP）中的「同源(same-origin)/跨域(cross-origin)」是完全不同的概念。

同源策略的同源是指两个 URL 的协议/主机名/端口一致。例如，https://www.taobao.com/pages/...，它的协议是 https，主机名是 www.taobao.com，端口是 443。

同源策略作为浏览器的安全基石，其「同源」判断是比较严格的，相对而言，Cookie 中的「同站」判断就比较宽松：只要两个 URL 的 eTLD+1 相同即可，不需要考虑协议和端口。其中，eTLD 表示有效顶级域名，注册于 Mozilla 维护的公共后缀列表（Public Suffix List）中，例如，.com、.http://co.uk、.http://github.io 等。eTLD+1 则表示，有效顶级域名+二级域名，例如 taobao.com 等。
举几个例子，www.taobao.com 和 www.baidu.com 是跨站，www.a.taobao.com 和 www.b.taobao.com 是同站，a.github.io 和 b.github.io 是跨站(注意是跨站)。

Cookie 主要用于以下三个方面：
会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
个性化设置（如用户自定义设置、主题等）
浏览器行为跟踪（如跟踪分析用户行为等）
Cookie 的缺点
从大小、安全、增加请求大小等方面

### DASH

DASH，又叫 MPEG DASH，DASH：Dynamic Adaptive Streaming over HTTP ，是一种在互联网上传送动态码率的 Video Streaming 技术，类似于苹果的 HLS，DASH 会通过 media presentation description (MPD)将视频内容切片成一个很短的文件片段，每个切片都有多个不同的码率，DASH Client 可以根据网络的情况选择一个码率进行播放，支持在不同码率之间无缝切换。

- 观看视频更为流畅，如下图所示，我们会在网速不佳时无缝切换至较低清晰度视频，在网速充足时无缝切换至高清晰度视频，切换过程对于用户无感。

- 可以很容易的支持音频模式，满足听相声/音乐的你（不对

- 在退到后台后，可以自动切换至只拉取音频，更节省你的流量，播放更加流畅。

- 可以很容易的支持视频新增多音轨，多视频轨，多字幕轨的任意切换 ，原声，中配，多版本字幕任君选择。
