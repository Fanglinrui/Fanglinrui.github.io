---
updateTime: 2025-04-13 16:20
---
- 通过 `java.util.Scanner` 导入
- 新建时 `Scanner sc = new Scanner(System.in)  
- 有 `sc.hasNext[XX]` 来判断输入缓冲区的内容 ，通过 `sc.next[XX]` 来获取对应的内容，目前遇到的 `[XX]` 有：`Int Line`，直接next就是一个word
	- `Line` 有 `split` 方法，得到的还是 `String` 类型
- `split`方法可以用正则表达式，比如`split("\\s+")`用于去除多个空格  
- `sc.nextXX`如果只用一次，会留下一个回车，需要用`sc.nextLine()`干掉
- 变成大写有`toUpperCase()` 方法