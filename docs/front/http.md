# http请求

## XMLHttpRequest（XHR）对象

XMLHttpRequest（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。XMLHttpRequest 在 AJAX 编程中被大量使用。

### 兼容性

```js
// Provide the XMLHttpRequest class for IE 5.x-6.x:
// Other browsers (including IE 7.x-8.x) ignore this
//   when XMLHttpRequest is predefined
var xmlHttp;
if (typeof XMLHttpRequest != "undefined") {
    xmlHttp = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    var aVersions = ["Msxml2.XMLHttp.5.0", "Msxml2.XMLHttp.4.0", 
        "Msxml2.XMLHttp.3.0", "Msxml2.XMLHttp", "Microsoft.XMLHttp"];
    for (var i = 0; i < aVersions.length; i++) {
        try {
            xmlHttp = new ActiveXObject(aVersions[i]);
            break;
        } catch (e) {}
    }
}
```

### XMLHttpRequest传统请求

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';

// readyState
// 0
// UNSENT (未打开)
// 表示已创建 XHR 对象，open() 方法还未被调用
// 1
// OPENED (未发送)
// open() 方法已被成功调用，send() 方法还未被调用
// 2
// HEADERS_RECEIVED (已获取响应头)
// send() 方法已经被调用，响应头和响应状态已经返回
// 3
// LOADING (正在下载响应体)
// 响应体下载中，responseText中已经获取了部分数据
// 4
// DONE (请求完成)
// 整个请求过程已经完毕

// 请求成功回调函数
xhr.onload = e => {
    console.log('request success');
};
// 请求结束
xhr.onloadend = e => {
    console.log('request loadend');
};
// 请求出错
xhr.onerror = e => {
    console.log('request error');
};
// 请求超时
xhr.ontimeout = e => {
    console.log('request timeout');
};
xhr.timeout = 0; // 设置超时时间,0表示永不超时
// 初始化请求
xhr.open('GET/POST/DELETE/...', '/url', true || false);

// ArrayBuffer - 固定长度二进制数据缓冲区
// Blob - 二进制不可变数据
// Document - HTML或XML文档
// JSON - JavaScript Object Notation
// Text - 普通文本
// 设置期望的返回数据类型 'json' 'text' 'document' 'blob' 'arraybuffer' ...
xhr.responseType = '';
// 设置请求头
xhr.setRequestHeader('', '');
// 发送请求
xhr.send(null || new FormData || 'a=1&b=2' || 'json字符串');
```

### 事件

loadstart - 当程序开始加载时，loadstart 事件将被触发。
progress - 进度事件会被触发用来指示一个操作正在进行中。
abort - 当一个资源的加载已中止时，将触发 abort 事件。
error - 当一个资源加载失败时会触发error事件。
load - 当一个资源及其依赖资源已完成加载时，将触发load事件。
timeout - 当进度由于预定时间到期而终止时，会触发timeout 事件。
loadend - 当一个资源加载进度停止时 (例如，在已经分派“错误”，“中止”或“加载”之后)，触发loadend事件。
readystatechange - readystatechange 事件会在 document.readyState属性发生变化时触发。

### XMLHttpRequest Level 1

- XMLHttpRequest Level 1 缺点

只支持文本数据的传送，无法用来读取和上传二进制文件。
传送和接收数据时，没有进度信息，只能提示有没有完成。
受到"同域限制"（Same Origin Policy），只能向同一域名的服务器请求数据。

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'example.php');
xhr.send();
xhr.onreadystatechange = function(){
　　if ( xhr.readyState == 4 && xhr.status == 200 ) {
　　　　　alert( xhr.responseText );
　　} else {
　　　　　alert( xhr.statusText );
　　}
};
// xhr.readyState： XMLHttpRequest对象的状态，等于4表示数据已经接收完毕。
// xhr.status：服务器返回的状态码，等于200表示一切正常。
// xhr.responseText：服务器返回的文本数据。
// xhr.statusText：服务器返回的状态文本。
```

### XMLHttpRequest Level 2

- 可以设置HTTP请求的超时时间。

```js
xhr.timeout = 3000;
xhr.ontimeout = function(event){
　　console.log('请求超时');
}
```

- 可以使用FormData对象管理表单数据。

```js
var formData = new FormData(form)
formData.append('username', 'test');
formData.append('id', 111);
xhr.send(formData);

// 或
var form = document.getElementById('myform'); // 获取页面上表单对象
var formData = new FormData(form);
formData.append('username', 'test'); // 添加一个表单项
xhr.open('POST', form.action);
xhr.send(formData);
```

- 可以上传文件。

```js
var input = document.getElementById("input"),
formData = new FormData();
formData.append("file",input.files[0]); // file名称与后台接收的名称一致
xhr.send(formData);
```

- 可以请求不同域名下的数据（跨域请求）。

新版本的XMLHttpRequest对象，可以向不同域名的服务器发出HTTP请求。这叫做"跨域资源共享"（Cross-origin resource sharing，简称CORS）

- 可以获取服务器端的二进制数据。

```js
// 把 responseType 设为 blob，表示服务器传回的是二进制对象
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png');
xhr.responseType = 'blob';
xhr.send();

// 接收数据的时候，用浏览器自带的 Blob 对象即可。
var blob = new Blob([xhr.response], {type: 'image/png'});
```

- 可以获得数据传输的进度信息。

progress 事件，用来返回进度信息。它分成上传和下载两种情况。下载的 progress 事件属于 XMLHttpRequest 对象，上传的 progress 事件属于XMLHttpRequest.upload 对象。

```js
// 1.定义progress事件的回调函数
xhr.onprogress = updateProgress;
xhr.upload.onprogress = updateProgress;
// 2.在回调函数里面，使用这个事件的一些属性。event.total 是需要传输的总字节，event.loaded 是已经传输的字节
function updateProgress(event) {
　　if (event.lengthComputable) {
　　　　var percentComplete = event.loaded / event.total;
　　}
}
```

```js
// 在axios中使用
return axios({
    url:`${baseurl}/upload-image-or-video`,
    method: 'post',
    onUploadProgress:function(progressEvent){//原生获取上传进度的事件
        if(progressEvent.lengthComputable){
            if(fn){
                fn(progressEvent);
            }
        };
    },
    data:params
})
// 
let file = input.files;
let formData = new FormData();
formData.append('file',file);
// event.total 是需要传输的总字节，event.loaded 是已经传输的字节
upload.upLoadImg(formData,(progress)=>{
let loaded = progress.loaded,
    total = progress.total;
    this.press = Math.ceil((loaded/total) * 100);
}).then(res => {
    try {
        
    } catch (e) {

    }
})
```

### XHR 下载数据

```js
// (1) 设置响应的数据类型为 blob
// (2) 基于Blob创建一个唯一的对象URL，并作为图片的源地址 (URL.createObjectURL())
// (3) 图片加载成功后释放对象的URL(URL.revokeObjectURL())
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://www.gitimg.com/200X200?v=1');
xhr.responseType = 'blob'; // 1

xhr.onload = function() {
    if (this.status == 200) {
        var img = document.createElement('img');
        img.src = window.URL.createObjectURL(this.response); // 2
        img.onload = function() {
            window.URL.revokeObjectURL(this.src); //3
        };
        document.body.appendChild(img);
    }
};
xhr.send();
```

### 二进制数据转化

### 简单请求和预请求

一些不会触发 CORS preflight 的请求被称为 "简单请求"。"预请求" 要求必须先发送一个 OPTIONS 方法请求给目的站点，来查明这个跨站请求对于目的站点是不是安全的可接受的。这样做，是因为跨站请求可能会对目的站点的数据产生影响。

- [XMLHttpRequest](https://juejin.cn/post/6844903472714743816)

- [发送和接收二进制数据](https://developer.mozilla.org)
https://developer.mozilla.org/zh-cn/DOM/XMLHttpRequest/Sending_and_Receiving_Binary_Data

- [二进制数据](https://javascript.ruanyifeng.com/stdlib/arraybuffer.html#toc1)

## Fetch

fetch()是 XMLHttpRequest 的升级版，用于在 JavaScript 脚本里面发出 HTTP 请求。浏览器原生提供这个对象。

### 基本用法

- fetch()的功能与 XMLHttpRequest 基本相同，但有三个主要的差异。

    - （1）fetch()使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。

    - （2）fetch()采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。

    - （3）fetch()通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。

```js
// fetch()接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象
fetch('https://api.github.com/')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err)); 
// fetch()接收到的response是一个 Stream 对象，response.json()是一个异步操作，取出所有内容，并将其转为 JSON 对象。
// Stream: 表示数据的可读流。用于处理 Fetch API 返回的响应，或者开发者自定义的流（例如通过 ReadableStream() 构造的流）。

// async await
async function getJSON() {
  let url = 'https://api.github.com/';
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Request Failed', error);
  }
}
```

### Response 包含的数据  1.Stream 接口异步读取  2.同步属性标头信息（Headers）
- 标头信息属性:
    - Response.ok属性返回一个布尔值，表示请求是否成功，true对应 HTTP 请求的状态码 200 到 299，false对应其他的状态码。

    - Response.status属性返回一个数字，表示 HTTP 回应的状态码（例如200，表示成功请求）。

    - Response.statusText属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回"OK"）。

    - Response.url属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。

    - Response.type属性返回请求的类型。可能的值如下：
        - basic：普通请求，即同源请求。
        - cors：跨域请求。
        - error：网络错误，主要用于 Service Worker。
        - opaque：如果fetch()请求的type属性设为no-cors，就会返回这个值，详见请求部分。表示发出的是简单的跨域请求，类似<form>表单的那种跨域请求。
        - opaqueredirect：如果fetch()请求的redirect属性设为manual，就会返回这个值，详见请求部分。

    - Response.redirected属性返回一个布尔值，表示请求是否发生过跳转。

### Response.headers 属性

Response 对象还有一个Response.headers属性，指向一个 Headers 对象，对应 HTTP 回应的所有标头。

Headers 对象可以使用for...of循环进行遍历。

```js
const response = await fetch(url);

for (let [key, value] of response.headers) { 
  console.log(`${key} : ${value}`);  
}

// 或者
for (let [key, value] of response.headers.entries()) { 
  console.log(`${key} : ${value}`);  
}

// 操作标头
// Headers.get()：根据指定的键名，返回键值。
// Headers.has()： 返回一个布尔值，表示是否包含某个标头。
// Headers.set()：将指定的键名设置为新的键值，如果该键名不存在则会添加。
// Headers.append()：添加标头。
// Headers.delete()：删除标头。
// Headers.keys()：返回一个遍历器，可以依次遍历所有键名。
// Headers.values()：返回一个遍历器，可以依次遍历所有键值。
// Headers.entries()：返回一个遍历器，可以依次遍历所有键值对（[key, value]）。
// Headers.forEach()：依次遍历标头，每个标头都会执行一次参数函数。
```

### 判断请求是否成功【fetch请求对某些错误http状态不会reject】

fetch()发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，fetch()才会报错，其他情况都不会报错，而是认为请求成功。

这就是说，即使服务器返回的状态码是 4xx 或 5xx，fetch()也不会报错（即 Promise 不会变为 rejected状态）。

- 通过Response.status属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。
```js
async function fetchText() {
  let response = await fetch('/readme.txt');
  if (response.status >= 200 && response.status < 300) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
```
- 判断response.ok是否为true。
```js
if (response.ok) {
  // 请求成功
} else {
  // 请求失败
}
```

### 读取内容的方法[异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。]

- response.text()：得到文本字符串。
用于获取文本数据，比如 HTML 文件

- response.json()：得到 JSON 对象。
获取服务器返回的 JSON 数据

- response.blob()：得到二进制 Blob 对象。
获取二进制文件
```js
// 读取图片文件flower.jpg，显示在网页上。
const response = await fetch('flower.jpg');
const myBlob = await response.blob();
const objectURL = URL.createObjectURL(myBlob);

const myImage = document.querySelector('img');
myImage.src = objectURL;
```

- response.formData()：得到 FormData 表单对象。
用在 Service Worker 里面，拦截用户提交的表单，修改某些数据以后，再提交给服务器

- response.arrayBuffer()：得到二进制 ArrayBuffer 对象。
获取流媒体文件
```js
// response.arrayBuffer()获取音频文件song.ogg，然后在线播放的例子。
const audioCtx = new window.AudioContext();
const source = audioCtx.createBufferSource();

const response = await fetch('song.ogg');
const buffer = await response.arrayBuffer();

const decodeData = await audioCtx.decodeAudioData(buffer);
source.buffer = buffer;
source.connect(audioCtx.destination);
source.loop = true;
```

### Response.clone()

Stream 对象只能读取一次，读取完就没了。
Response 对象提供Response.clone()方法，创建Response对象的副本，实现多次读取。

### Response.body 属性

Response.body属性是 Response 对象暴露出的底层接口，返回一个 ReadableStream 对象，供用户操作。它可以用来分块读取内容，应用之一就是显示下载的进度。

response.body.getReader()方法返回一个遍历器。这个遍历器的read()方法每次返回一个对象，表示本次读取的内容块。

这个对象的done属性是一个布尔值，用来判断有没有读完；value属性是一个 arrayBuffer 数组，表示内容块的内容，而value.length属性是当前块的大小。
```js
// 
const response = await fetch('flower.jpg');
const reader = response.body.getReader();

while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

### fetch()的第二个参数：定制 HTTP 请求

fetch()的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。

```js
// HTTP 请求的方法、标头、数据体都在这个对象里面设置
fetch(url, optionObj)
//提交 JSON 数据
const user =  { name:  'John', surname:  'Smith'  };
//提交表单
const form = document.querySelector('form');
//文件上传
const input = document.querySelector('input[type="file"]');
const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');
//直接上传二进制数据
let blob = await new Promise(resolve =>   
  canvasElem.toBlob(resolve,  'image/png')
);

const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: JSON.stringify(user)  //提交 JSON 数据
  body: new FormData(form)  //提交表单
  body: data  //文件上传
  body: blob  //直接上传二进制数据
  cache: '',
  mode: '',
  credentials: '',
  referrerPolicy: '',
});
```

fetch默认不携带cookie
fetch不支持JSONP
fetch不支持progress事件
fetch不支持超时timeout处理【timeout+abort()】

- cache
    default：默认值，先在缓存里面寻找匹配的请求。
    no-store：直接请求远程服务器，并且不更新缓存。
    reload：直接请求远程服务器，并且更新缓存。
    no-cache：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
    force-cache：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
    only-if-cached：只检查缓存，如果缓存里面不存在，将返回504错误。
- mode
    cors：默认值，允许跨域请求。
    same-origin：只允许同源请求。
    no-cors：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。
- credentials
    same-origin：默认值，同源请求时发送 Cookie，跨域请求时不发送。
    include：不管同源请求，还是跨域请求，一律发送 Cookie。
    omit：一律不发送。
- referrerPolicy
    no-referrer-when-downgrade：默认值，总是发送Referer标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
    no-referrer：不发送Referer标头。
    origin：Referer标头只包含域名，不包含完整的路径。
    origin-when-cross-origin：同源请求Referer标头包含完整的路径，跨域请求只包含域名。
    same-origin：跨域请求不发送Referer，同源请求发送。
    strict-origin：Referer标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送Referer标头。
    strict-origin-when-cross-origin：同源请求时Referer标头包含完整路径，跨域请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
    unsafe-url：不管什么情况，总是发送Referer标头。

### 取消fetch()请求

```js
// fetch()请求发送以后，如果中途想要取消，需要使用AbortController对象。

// 新建 AbortController 实例
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal
});

signal.addEventListener('abort',
  () => console.log('abort!')
);

controller.abort(); // 取消

console.log(signal.aborted); // true
```

- [Streams_API](https://developer.mozilla.org/zh-CN/docs/Web/API)


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



## 关于Fetch API

fetch 函数是一个基于 Promise 的机制，用于在浏览器中以编程方式发送 Web 请求。该项目是实现标准 Fetch 规范的一个子集的 polyfill ，足以作为传统 Web 应用程序中 XMLHttpRequest 的代替品。

## 关于http2.0

http2.0主要是相对我们正在使用的http1.1性能方面的提升,语法方面继续使用1.1的内容,只是更改了系统之间传输数据的方式,这些细节实现由浏览器和服务器实现.所以叫http1.2更合适.
你的网站想用http2？首先你的网站要全面支持https,然后在服务器端(tomcat或nginx等)配置启用http2
点这里了解更多http2
如何判断某网站是否使用了http2？在某网站控制台执行如下代码

```js
(function(){
    // 保证这个方法只在支持loadTimes的chrome浏览器下执行
    if(window.chrome && typeof chrome.loadTimes === 'function') {
        var loadTimes = window.chrome.loadTimes();
        var spdy = loadTimes.wasFetchedViaSpdy;
        var info = loadTimes.npnNegotiatedProtocol || loadTimes.connectionInfo;
        // 就以 「h2」作为判断标识
        if(spdy && /^h2/i.test(info)) {
            return console.info('本站点使用了HTTP/2');
        }
    }
    console.warn('本站点没有使用HTTP/2');
})();
```
## 关于http,XMLHttpRequest,Ajax的关系

http是浏览器和web服务器交换数据的协议,规范
XMLHttpRequest javascript的一个对象,是浏览器实现的一组api函数(方法),使用这些函数,浏览器再通过http协议请求和发送数据
Ajax不是一种技术,是综合多种技术实现交互的模式:用html+css展示页面>使用XMLHttpRequest请求数据>使用js操作dom

## GET和POST

GET在浏览器回退时是无害的，而POST会再次提交请求。
GET产生的URL地址可以被Bookmark，而POST不可以。
GET请求会被浏览器主动cache，而POST不会，除非手动设置。
GET请求只能进行url编码，而POST支持多种编码方式。
GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
GET请求在URL中传送的参数是有长度限制的，而POST么有。
对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
GET参数通过URL传递，POST放在Request body中。

GET产生一个TCP数据包；POST产生两个TCP数据包。
对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

- [阮一峰RESTful API 最佳实践](http://www.ruanyifeng.com/blog/2018/10/restful-api-best-practices.html)

- [阮一峰Fetch API 教程](http://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

- [阮一峰XMLHttpRequest Level 2 使用指南](http://www.ruanyifeng.com/blog/2012/09/)
http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html

- [CORS的9种HTTP头信息](https://dev.opera.com/articles/dom-access-control-using-cors/)

- [github的所有API](https://api.github.com/)

## HTTP缓存控制

- [HTTP缓存控制小结](https://imweb.io/topic/5795dcb6fb312541492eda8c)

## GraphQL 

是一种针对 Graph（图状数据）进行查询特别有优势的 Query Language（查询语言）。GraphQL 是 Facebook 发明的。

- [GraphQL](https://graphql.cn/)