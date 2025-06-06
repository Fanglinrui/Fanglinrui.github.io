---
tags:
  - 网络层
  - IPv4
  - IPv6
  - 计算机网络
来自于: "[[计算机网络（原书第7版） 自顶向下方法 (James F. Kurose Keith W. R... (Z-Library).pdf#page=232&selection=179,0,187,3|计算机网络（原书第7版） 自顶向下方法 (James F. Kurose Keith W. R... (Z-Library), page 232]]"
updateTime: 2025-04-11 16:48
---
# 第1部分 IPv4  
## 1.1 IP包头  

| 字段           | 长度  | 单位/备注              |
| ------------ | --- | ------------------ |
| 包头长度         | 4b  | 4B                 |
| 包总长度         | 2B  | 1B                 |
| TTL          | 1B  | 生命期/生存时间           |
| 协议           | 1B  |                    |
| 校验和          | 2B  |                    |
| 源IP地址、目的IP地址 | 4B  |                    |
| 分段标识         | 2B  |                    |
| DF           | 1b  | 不要分段，DF=1的数据包不允许分段 |
| MF           | 1b  | 更多片段，MF=0表示最后一个片段  |
| 段偏移量         | 13b | **8B**             |
* 首部总长总为20字节  
## 1.2 分片  
* MTU：最大传送单元  
	* 以太网帧不超过1500B  
* 根据MTU分片，置MF为1（除了最后一个片段）  
* 偏移量单位是8B，因此每片（除了最后一片）的大小都是8的倍数  
## 1.3 IPv4 编址  
* 接口：主机与物理链路之间的边界  
* 技术上来讲，一个IP与一个接口相关联，而不是与接口的设备相关联  
* IP地址长度32bit，大约40亿个  
* 通常采用**点分十进制法**书写  
* [[计算机网络（原书第7版） 自顶向下方法 (James F. Kurose Keith W. R... (Z-Library).pdf#page=236&selection=199,4,209,11|多个接口通过一个不包含路由器的网络互联起来，这个网络：]]   
	* 可能由一个以太网LAN互联，此时接口通过一台*以太网交换机*或通过一个*无线接入点* 连接  
	* 互联多个接口的网络称为**子网**  
### 1.3.1 CIDR  
* 无类别域间路由选择（Classless Interdomain Routing)  
* 形式：a.b.c.d/x，其中x(子网掩码)指示了地址第一部分的比特数  
	* 第一部分：网络前缀；引入 [[计算机网络（原书第7版） 自顶向下方法 (James F. Kurose Keith W. R... (Z-Library).pdf#page=238&selection=136,0,136,4|实践原则]]，为一个组织分配一块连续的地址（具有相同前缀的地址）x bit, 路由器仅关注这一部分，可以大大减少路由器转发表的长度  
		* 实践原则的关键字：路由聚合，最长前缀匹配（选择最具体的网络）  
			* 最长前缀匹配使得可以有相同的IP，只看哪个ISP提供的更具体
	* 第二部分：用于区分内部设备，也可以再划子网  
* *另一种早期的形式：分类编址*，按网络部分8、16、24bit分为A, B, C三类网络  
### 1.3.2 具体是如何获得地址的  
1. 获取一块地址：  
	* 由ISP提供  
	* 全球性权威机构：因特网名字和编号分配机构ICANN  
2. 获取主机地址：动态主机配置协议（DHCP）
	* 特点：
		* 某组织*获取一块地址*后，主机被自动分配地址  
			* 根据配置，每次IP相同或临时IP地址  
		* 主机得知子网掩码、默认网关、本地DNS服务器地址  
			* 默认网关：第一跳路由器地址  
		* 即插即用，零配置  
		* 客户-服务器协议：  
			* 客户：新到达的主机  
			* 服务器：DHCP服务器/DHCP中继代理（通常是一台路由器） ——也就是说，一个**网络**里有一台DHCP服务器即可；一个子网没有， 它通过路由器连接的子网有就行  
	* 分配步骤：  
		1. DHCP 服务器发现：新到达主机广播 **DHCP发现报文**  
			* UDP  
			* 端口 67  
			* 广播目的地址 255.255.255.255  
			* 源地址 0.0.0.0  
		2. DHCP 服务器提供：DHCP 服务器受到发现报文后向 *子网所有节点广播* **DHCP提供报文**  
			* 可能有多个DHCP服务器，用户可以选择更优越的位置  
			* 报文包括：收到的发现报文的事务ID、向客户推荐的IP地址、网络掩码、IP地址租用期(通常为几小时/几天)  
		3. DHCP 请求：客户 选择一个服务器，向它发送 **DHCP请求报文**响应，回显配置参数  
		4. DHCP ACK：响应请求报文，证实参数  
	* 缺陷：移动性方面存在缺陷，移动节点无法维持与远程应用之间的TCP连接  
## 1.4 网络地址转换（NAT)  
- NAT：Network Address Translation  
- 专用网络，仅对在该网络中的设备有意义的网络  
- NAT使能路由器在互联网视角下就是一个设备  
	- 相当于代理  
	- 用**端口号**来进行**主机**寻址  
# 1.5 IPv6  

- 首部40Byte  
- 一个IP地址：16 Byte  
- IPv4迁移至IPv6：隧道，将IPv6数据报作为数据蕴含在一个IPv4数据报中，通过协议号：41来得到IPv4的有效载荷是IPv6  
