# 前端安全

待完善。。。

- web中可能存在的安全漏洞以及如何去检测这些安全漏洞，如何去防范潜在的恶意攻击

## 跨站脚本攻击（Cross Sites Script）

## 跨站点请求伪造（Cross Sites Request Forgery）

## 点击劫持（ClickJacking）

### 点击劫持防御方式

## 其他安全问题

### 跨域问题处理

### postMessage 跨窗口传递信息

### Web Storage

### 跨域问题处理

## 总结

- 谨慎用户输入信息，进行输入检查（客户端和服务端同时检查）
- 在变量输出到HTML页面时，都应该进行编码或转义来预防XSS攻击
- 该用验证码的时候一定要添上
- 尽量在重要请求上添加Token参数，注意Token要足够随机，用足够安全的随机数生成算法









参考：
- [前端安全编码规范](https://segmentfault.com/a/1190000037657222)