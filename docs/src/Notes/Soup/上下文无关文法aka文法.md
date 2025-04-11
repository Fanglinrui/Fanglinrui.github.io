---
tags:
  - 编译原理
  - 语法定义
  - 文法
来自于: "[[编译原理 原理、技术与工具 ( etc.) (Z-Library).pdf#page=43&selection=795,0,798,1|编译原理 原理、技术与工具 ( etc.) (Z-Library), 页面 43]]"
aliases:
  - context-free grammar
  - grammar
---

> [!NOTE] e.g if-else
> (*expr* denote expression; *stmt* denote statement)
>$$
stmt \to \mathbf{if}\; ( expr )\; stmt \;\mathbf{else}\; stmt
>$$
> 整体称为产生式（production）
> lexical elements: terminals  
> Variables(e.g. expr):nonterminals
# 定义  

包括四部分：  
1. token, 终结符号(terminal)集合  
	1. 终结符号：基本符号集合  
2.  语法**变量**，非终结符号集合  
	1. 非终结符号：终结符号串  
3. 产生式集合  
4. 指定一个非终结符号作为开始符号  
最后看到这里[[编译原理 原理、技术与工具 ( etc.) (Z-Library).pdf#page=45&selection=228,0,229,2|编译原理 原理、技术与工具 ( etc.) (Z-Library), 页面 45]]
[[编译原理（龙书英文版第二版）.pdf#page=67&selection=73,0,75,11|编译原理（龙书英文版第二版）, 页面 67]]  