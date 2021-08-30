# 网络通信

## http https

### 缓存

#### http 缓存

浏览器 -----> 网站

需要加载的资源：html、css、js、img。缓存起来减少网络请求的数量和体积

#### 强制缓存

第一次发送请求，服务器使用了强制缓存的话（觉得需要缓存），会在 response 响应头设置：设置 Cache-control 为： max-age：一个时间单位秒

浏览器会存在相应文件，下次再去请求时候，浏览器会检查 max-age 是否过期，没过期则直接拿。这时请求 code 是 200，Status Code 是 200（form memory cache）

#### 协商缓存（对比缓存）

服务端缓存策略：

第一次发送请求，服务器使用了协商缓存的话，会返回 【资源 和 标识】，浏览器存入。

下次请求，发送请求+资源标识，服务端把 资源标识 跟 自己的服务器上的对比，如果一致，返回 304 code，浏览器直接从缓存拿，如果不一致，返回 code 200，且新的资源、新的资源和新的标识。

#### 协商缓存的标识

- Last-Modified 资源上次修改时间

  - 第一次，返回的资源 + 资源标识（即 Last-Modified 在响应头）

  - Last-Modified 值是一个资源文件

  - 再去请求时候，请求头带上 Last-Modified，但 key 叫：If-Modified-Since

  - 服务器检查 If-Modified-Since，跟服务器自己对比，返回 304 or 200

* ETag 资源对应唯一字符串

  - 第一次，返回的资源 + 资源标识（即 ETag）

  - ETag 值是一个 唯一字符串

  - 再去请求时候，请求头带上 ETag，但 key 叫：If-None-Match

  - 服务器检查 If-None-Match，跟服务器自己对比，返回 304 or 200

- 两个区别：

  - 优先使用 ETag

  - Last-Modified 只精确到秒级别

  - 文件如果每隔一段时间都重复生成，但内容相同，Last-Modified 会每次返回资源文件，即便内容相同，但 ETag 可以判断出文件内容相同，返回 304 使用缓存。

## websocket

- [HTTP1.0、HTTP1.1 和 HTTP2.0 的区别](https://juejin.cn/post/6844903489596833800)
