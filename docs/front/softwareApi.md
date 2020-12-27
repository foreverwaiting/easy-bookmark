# 软件架构

软件架构（software architecture）是一系列相关的抽象模式，用于指导大型软件系统各个方面的设计。软件架构是一个系统的草图。软件体系结构是构建计算机软件实践的基础。

## 分层架构、单体架构

Client Server Database。如：Java Spring mvc

## 分布式

将一个大的系统划分为多个业务模块，业务模块分别部署在不同的服务器上，各个业务模块之间通过接口进行数据交互。数据库也大量采用分布式数据库，如redis、ES、solor等。通过LVS/Nginx代理应用，将用户请求均衡的负载到不同的服务器上。

- [代理应用](nginx/Nginx.md)

## 微服务

后端将项目拆分，各个模块各自单独开发，并且根据其访问情况，单独部署不同的机器、容器数量。这样的模块拆分，后端项目向微服务架构演进，各个模块有各自的路由，它们之间内部会通过http、rpc或者kafka进行通信。每个功能都被称为一项服务，可以单独构建和部署，这意味着各项服务在工作（和出现故障）时不会相互影响。将一个完整的应用分解为小的、互相连接的微服务,每个服务完成特定的功能, 并且某些特定的服务还能为其他服务提供API接口，使得自动化CI(持续集成)/CD(持续交付)成为可能。解耦不同服务间的依赖

## Serverless架构

未来云

## RESTful（Representational State Transfer）

目前最流行的 API 设计规范，用于 Web 数据接口的设计。

- URL设计：GET、POST、PUT、PATCH、DELETE、

PATCH：仅向URL（表单）提交已变动数据的局部更新请求、更新局部资源

PUT：提交完整的资源对象

- 状态码：1xx相关信息、2xx操作成功、3xx重定向、4xx客户端错误、5xx服务器错误

POST返回201状态码，表示生成了新的资源；DELETE返回204状态码，表示资源已经不存在；

301状态码（永久重定向）和302状态码（暂时重定向，307也是这个含义），这俩都是应用级别的，浏览器会直接跳转，到不了API级别。

303（暂时重定向），区别在于302和307用于GET请求，303用于POST、PUT和DELETE请求。收到303以后，浏览器不会自动跳转，而会让用户自己决定下一步怎么办。

400 Bad Request：服务器不理解客户端的请求，未做任何处理。

401 Unauthorized：用户未提供身份验证凭据，或者没有通过身份验证。

403 Forbidden：用户通过了身份验证，但是不具有访问资源所需的权限。

404 Not Found：所请求的资源不存在，或不可用。

405 Method Not Allowed：用户已经通过身份验证，但是所用的 HTTP 方法不在他的权限之内。

410 Gone：所请求的资源已从这个地址转移，不再可用。

415 Unsupported Media Type：客户端要求的返回格式不支持。比如，API 只能返回 JSON 格式，但是客户端要求返回 XML 格式。

422 Unprocessable Entity ：客户端上传的附件无法处理，导致请求失败。

429 Too Many Requests：客户端的请求次数超过限额。

500 Internal Server Error：客户端请求有效，服务器处理时发生了意外。

503 Service Unavailable：服务器无法处理请求，一般用于网站维护状态。

- 服务器

Content-Type属性要设为application/json

- [阮一峰RESTful API](http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html)

- [github的所有API](https://api.github.com/)

## GraphQL 

是一种针对 Graph（图状数据）进行查询特别有优势的 Query Language（查询语言）。GraphQL 是 Facebook 发明的。

- [GraphQL](https://graphql.cn/)

