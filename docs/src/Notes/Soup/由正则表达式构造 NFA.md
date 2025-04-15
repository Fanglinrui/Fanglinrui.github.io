---
tags:
  - 编译原理
  - NFA
参考: "[[编译原理 原理、技术与工具 ( etc.) (Z-Library).pdf#page=118&selection=1027,0,1033,3|编译原理 原理、技术与工具 ( etc.) (Z-Library), 页面 118]]"
aliases:
  - fsm
updateTime: 2025-04-11 16:48
---
实用网址：https://www.madebyevan.com/fsm/

- 实际上就是由将三种式子的图组合起来  
- 从 $i$ 到 $f$ 
- 具体情况下圈圈里面填数字
### 1.1 $r=a$
![[NFA 与 DFA 图的画法-1.png]]
### 1.2 $r=a|b$
![[NFA 与 DFA 图的画法-2.png]]  
### 1.3 $r=st$  
- 其实就是 $s$ 的 $f$ 圈作为 $t$ 的 $i$ 圈
![[NFA 与 DFA 图的画法-3.png]]  
### 1.4 $r=s^*$  
- 原来的 $i'$, $f'$ 旁边新加俩圈，然后连接就行
![[NFA 与 DFA 图的画法-4.png]]