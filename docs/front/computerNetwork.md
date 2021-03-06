# 计算机网络

## 计算机基础

### 互联网协议（一）

五层模型："应用层"（Application Layer）、"传输层"（Transport Layer）、"网络层"（Network Layer）、"链接层"（Link Layer）、"实体层"（Physical Layer）、

层与协议：每一层都是为了完成一种功能。为了实现这些功能，就需要大家都遵守共同的规则。大家都遵守的规则，就叫做"协议"（protocol）。

互联网协议：互联网的每一层，都定义了很多协议。这些协议的总称，就叫做"互联网协议"（Internet Protocol Suite）。

### 实体层

电脑组网：光缆、电缆、双绞线、无线电波等方式把电脑连接起来的物理手段，主要规定了网络的一些电气特性，作用是负责传送0和1的电信号。

### 链接层（MAC地址）

定义：单纯的0和1没有任何意义，必须规定解读方式：多少个电信号算一组？每个信号位有何意义？链接层确定了0和1的分组方式。

以太网协议：其电信号分组方式占据了主导地位，并规定，一组电信号构成一个数据包，叫做"帧"（Frame）。每一帧分成两个部分：标头【说明项、发送者、接受者、数据类型等等】（Head）和数据【具体内容】（Data）。

标头：固定为18字节

数据：最短为46字节，最长为1500字节

整个帧：最短为64字节，最长为1518字节。如果数据很长，就必须分割成多个帧进行发送。

MAC地址：网卡的地址，就是数据包的发送地址和接收地址，这叫做MAC地址。【每块网卡出厂的时候，都有一个全世界独一无二的MAC地址，长度是48个二进制位，通常用12个十六进制数表示。前6个十六进制数是厂商编号，后6个是该厂商的网卡流水号。】

::: tip ARP （地址解析协议）
使用地址解析协议，可根据网络层IP数据包包头中的IP地址信息解析出目标硬件地址（MAC地址）信息，以保证通信的顺利进行。【得到同一个子网络内的主机MAC地址，如果两台主机不在同一个子网络，那么事实上没有办法得到对方的MAC地址，只能把数据包传送到两个子网络连接处的"网关"（gateway），让网关去处理。】
:::

广播：向本网络内所有计算机发送，让每台计算机自己判断，是否为接收方。计算机找到接收方的MAC地址，然后与自身的MAC地址相比较，如果两者相同，就接受这个包，做进一步处理，否则就丢弃这个包。这种发送方式就叫做"广播"（broadcasting）。

结果：有了数据包的定义、网卡的MAC地址、广播的发送方式，"链接层"就可以在多台计算机之间传送数据了。

::: tip 以太网数据包
【标头（MAC地址）】+【数据（数据内容）】
:::

### 网络层（IP地址）

作用：引进一套新的地址，使得我们能够区分不同的计算机是否属于同一个子网络。这套地址就叫做"网络地址"，简称"网址"。

IP协议：规定网络地址的协议，叫做IP协议。它所定义的地址，就被称为IP地址。习惯上分成四段的十进制数表示IP地址，从0.0.0.0一直到255.255.255.255。每个计算久都会被分配一个IP地址，前一部分代表网络，后一部分代表主机，处于同一个子网络的电脑，它们IP地址的网络部分必定是相同的

::: tip IP协议
IPv4由32个二进制位组成，最大地址个数为2^32、IPv6由128个二进制位组成，最大地址个数为2^128。
:::

子网掩码：才能从IP地址，判断两台计算机是否属于同一个子网络。它在形式上等同于IP地址，也是一个32位二进制数字，它的网络部分全部为1，主机部分全部为0。
知道"子网掩码"，我们就能判断，任意两个IP地址是否处在同一个子网络。方法是将两个IP地址与子网掩码分别进行AND运算（两个数位都为1，运算结果为1，否则为0），然后比较结果是否相同，如果是的话，就表明它们在同一个子网络中，否则就不是。

IP协议作用：一个是为每一台计算机分配IP地址，另一个是确定哪些地址在同一个子网络。

IP数据包：把IP数据包直接放进以太网数据包的"数据"部分，完全不用修改以太网的规格。这就是互联网分层结构的好处：上层的变动完全不涉及下层的结构。IP数据包也分为"标头"和"数据"两个部分。
"标头"：包括版本、长度、IP地址等信息（长度为20到60字节）
"数据"：IP数据包的具体内容（最长65,515）
整个数据包：最大为65,535字节
⚠️：以太网数据包的"数据"部分，最长只有1500字节。因此，如果IP数据包超过了1500字节，它就需要分割成几个以太网数据包，分开发送了。

::: tip IP数据包
【标头（IP地址）】+【数据（数据内容）】
:::

::: tip 则：放入IP数据包之后的【以太网数据包】
【标头（MAC地址）】+【【标头（IP地址）】+【数据（数据内容）】】
:::

### 传输层（端口）

端口：有了MAC地址和IP地址，我们已经可以在互联网上任意两台主机上建立通信。但还需要一个参数，表示这个数据包到底供哪个程序（进程）使用。这个参数就叫做"端口"（port），它其实是每一个使用网卡的程序的编号。每个数据包都发到主机的特定端口，所以不同的程序就能取到自己所需要的数据。

作用："传输层"的功能，就是建立"端口到端口"的通信。相比之下，"网络层"的功能是建立"主机到主机"的通信。只要确定主机和端口，我们就能实现程序之间的交流。（因此，Unix系统就把主机+端口，叫做"套接字"（socket）。有了它，就可以进行网络应用程序开发了。）

::: tip 端口
"端口"是0到65535之间的一个整数，正好16个二进制位。0到1023的端口被系统占用，用户只能选用大于1023的端口。不管是浏览网页还是在线聊天，应用程序会随机选用一个端口，然后与服务器的相应端口联系。
:::

UDP协议：用于在数据包中加入端口信息。由"标头"和"数据"两部分组成。放入IP数据包的数据部分。【UDP协议的优点是比较简单，容易实现，但是缺点是可靠性较差，一旦数据包发出，无法知道对方是否收到。】

TCP协议：有确认机制的UDP协议，每发出一个数据包都要求确认。如果有一个数据包遗失，就收不到确认，发出方就知道有必要重发这个数据包了。其确保数据不会遗失。它的缺点是过程复杂、实现困难、消耗较多的资源。

⚠️：UDP数据包非常简单，"标头"部分一共只有8个字节，总长度不超过65,535字节，正好放进一个IP数据包。TCP数据包和UDP数据包一样，都是内嵌在IP数据包的"数据"部分。TCP数据包没有长度限制，理论上可以无限长，但是为了保证网络的效率，通常TCP数据包的长度不会超过IP数据包的长度，以确保单个TCP数据包不必再分割。

::: tip UDP数据包
【标头（发出端口和接收端口）】+【数据（数据内容）】
:::

::: tip 则：放入UDP数据包之后的【以太网数据包】
【标头（MAC地址）】+【【标头（IP地址）】+【【标头（发出端口和接收端口）】+【数据（数据内容）】】】
:::

### 应用层（HTTP、FTP、IMAP）

作用：规定应用程序的数据格式。互联网数据来源五花八门，必须事先规定好格式，否则根本无法解读。TCP协议可以为各种各样的程序传递数据，比如Email、WWW、FTP等等。那么，必须有不同协议规定电子邮件、网页、FTP数据的格式，这些应用程序协议就构成了"应用层"。

### 最终以太网的数据包

【head】 【head】 【head】【Data】
<-----> <-----> <-----> <----->
 以太网    IP      TCP    应用层
 标头      标头    标头    数据包

### 总结

1、网络通信就是交换数据包。数据包如上所示。
2、发包需要知道对方：MAC地址、IP地址。
3、但MAC地址有局限性，如果两台电脑不在同一个子网络，就无法知道对方的MAC地址，必须通过网关（gateway）转发。

```js
if(同一个子网络) {
    // 数据包地址[对方的MAC地址，对方的IP地址]
} else if (非同一个子网络) {
    // 数据包地址[网关的MAC地址，对方的IP地址]
}
```

### 互联网协议（二）

### 用户的上网设置：本机的IP地址、子网掩码、网关的IP地址、DNS的IP地址

"静态IP地址上网"：给定的，计算机每次开机，都会分到同样的IP地址

"动态IP地址上网"：开机后，会自动分配到一个IP地址，不用人为设定。它使用的协议叫做DHCP协议。

DHCP协议：协议规定，每一个子网络中，有一台计算机负责管理本网络的所有IP地址，它叫做"DHCP服务器"。新的计算机加入网络，必须向"DHCP服务器"发送一个"DHCP请求"数据包，申请IP地址和相关的网络参数。

两台计算机在同一个子网络，必须知道对方的MAC地址和IP地址，才能发送数据包。但是，新加入的计算机不知道这两个地址，怎么发送数据包呢？
如下：
【head】 【head】 【head】【Data】
<-----> <-----> <-----> <----->
 以太网    IP      UDP    应用层
 标头      标头    标头    数据包

此时：
以太网标头：本机MAC地址 + DHCP服务器MAC地址（不知道使用广播地址：FF-FF-FF-FF-FF-FF）
IP标头：本机IP地址（不知道使用：0.0.0.0） + DHCP服务器IP地址（不知道使用：255.255.255.255）
UDP标头：发出方端口（不知道使用：68端口） + 接收方端口（不知道使用：67端口）

DHCP服务器读出这个包的数据内容，分配好IP地址，发送回去一个"DHCP响应"数据包。新加入的计算机收到这个响应包，于是就知道了自己的IP地址、子网掩码、网关地址、DNS服务器等等参数。

上网：输入网址，DNS协议（将网址转换成IP地址），访问，子网掩码（判断这个IP地址是不是在同一个子网络），不是则，通过网关转发。

::: tip DHCP协议。
用于内部网络或网络服务供应商自动分配IP地址给用户
用于内部网络管理员对所有电脑做中央管理
:::


### IPV4与IPV6

IPv4，长度为 32 位【所以共有2的32次方个地址】【32位2进制数字组成】（32位0或1组成的一串数字）（4 个字节），每8位数转成十进制的三位数，变成常用的4个0-255数字，即：10101010 22222222 33333333 88888888 == 192.168.001.002

IPv4 使用 ARP 来查找与 IPv4 地址相关联的物理地址（如 MAC 或链路地址）

IPv6，长度为 128 位【所以共有2的128次方个地址】（128位0或1组成的一串数字）（16 个字节），由8组4位16进制组合成，

NAT网络地址转换（由网关对ip地址的映射）+ 端口映射  ，让ipv4苟延残喘到现在。
公网IP（网关的IP）、私有IP（该网关下的电脑IP）

## 专有名词

### 交换机
一种用于电（光）信号转发的网络设备。它可以为接入交换机的任意两个网络节点提供独享的电信号通路。最常见的交换机是以太网交换机。
广域网交换机和局域网交换机：广域网交换机主要应用于电信领域，提供通信用的基础平台。而局域网交换机则应用于局域网络，用于连接终端设备，如PC机及网络打印机等。

### 局域网

局部地区形成的一个区域网络，其特点就是分布地区范围有限，可大可小，大到一栋建筑楼 与相邻建筑之间的连接，小到可以是办公室之间的联系。
局域网组成：计算机设备、网络连接设备、网络传输介质
计算机设备又包括服务器与工作站，网络连接设备则包含了网卡、集线器、交换机，网络传输介质简单来说就是网线，由同轴电缆、双绞线及光缆3大原件构成。

### 广域网

又称广域网、外网、公网。是连接不同地区局域网或城域网计算机通信的远程网。

### ISP

互联网服务提供商（Internet Service Provider）

### NSP

网络服务提供商（NSP，network service provider）

待补充：

### TCP VS UDP

TCP UDP 两者的区别是什么，各自的应用场景

UDP 场景：

1.  实时音视频是可以而且应该用 UDP 的，一方面因为它常常涉及到网络穿透，另外一方面它不需要重传。——我需要实时的看到你的图像跟声音，至于中间丢一帧什么的完全不重要。而为了重传往往会造成延迟与不同步，考虑一下，某一帧因为重传，导致 0.5 秒以后才到，那么整个音视频就延迟了 0.5 秒。考虑一下接收方看视频，如果使用 TCP 导致视频的中间延迟了 0.5 秒，只要我不按「快进」键，那么后续的视频全都会比发送方延迟 0.5 秒。这种延迟是累加的，随着持续丢帧，延迟会越来越大，达到数秒，甚至分钟级，这会严重影响实时音视频的用户体验。因此「实时音视频聊天」功能通常都会使用 UDP 实现。
2.  网络真的非常非常可靠，以至于你完全不需要考虑 UDP 丢包问题的情况。典型的例子应该是专门为有线局域网设计的协议。
3.  另外一个问题是 TCP 是纯粹的流式数据，所以制定传输协议的时候，接受方需要自行判定一个包的开始和结束，因为你完全可能接受到半个包或者两个包。——如果数据报的起止判定对你具体的程序会成为大问题，也可以考虑 UDP。

**采用 UDP 有 3 个关键点：**

- 网络带宽需求较小，而实时性要求高
- 大部分应用无需维持连接
- 需要低功耗

### DNS 解析

首先拿到 URL 后，浏览器会寻找本地的 DNS 缓存，看看是否有对应的 IP 地址，如果缓存中存在那就好了，如果没有，那就得向 DNS Server 发送一个请求，找到你想要的 IP 地址。
首先他会向你的 ISP(互联网服务提供商) 相关的 DNS servers 发送 DNS query。然后这些 DNS 进行递归查询(recursive)。所谓的递归查询，就是能够直接返回对应的IP地址，而不是其他的 DNS server 地址。
如果上述的 DNS Servers 没有你要的域名地址，则就会发送迭代查询，即会先从 root nameservers 找起。 即是假如你要查询 www.example.com ，会先从包含根结点的 13 台最高级域名服务器开始。
接着，以从右向左的方式递进，找到 com.  然后向包含 com 的 TLD(顶级域名) nameservers 发送 DNS 请求。接着找到包含 example 的 DNS server。
现在进入到了example.com 部分，即是现在正在询问的是权威服务器，该服务器里面包含了你想要的域名信息，也就是拿到了最后的结果 record 。
递归查询的 DNS Server 接受到这 record 之后, 会将该record 保存一份到本地。 如果下一次你再请求这个 domain 时，我就可以直接返回给你了。由于每条记录都会存在 TLL ，所以 server 每隔一段时间都会发送一次请求，获取新的 record，
最后，再经由最近的 DNS Server 将该条 record 返回。 同样，你的设备也会存一份该 record 的副本。 之后，就是 TCP 的事了，下面是一张萌萌的简化图：
到这里，我们大致就可以梳理一下，迭代查询的过程如下：

流程: . => com. => .exampl.com. => www.example.com. => IP adress


- [互联网运作](https://www.bilibili.com/video/BV1Rz4y197Jd)

- [阮一峰互联网协议入门](https://www.ruanyifeng.com/blog/2012/05)

- [IPV6和IPV4、公网IP和私有IP](https://www.bilibili.com/video/BV1DD4y127r4)

- [vlan、三层交换机、网关、DNS、子网掩码、MAC地址](https://mp.weixin.qq.com/s/4gY0k9U1qmvbAAEjo3_GsQ)

- [或许这样能帮你了解 OSI 七层模型](https://juejin.cn/post/6844903505111547918)