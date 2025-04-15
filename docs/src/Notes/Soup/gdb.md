---
tags:
  - Linux
  - gdb
updateTime: 2025-04-11 16:48
---
## 基本操作  
- `continue or 'c'`: 执行直到断点  
- `print or 'p'`: 读取  
	- `p $r12`: 读r12这个寄存器里的值  
	- `p/x $r12`: 以16进制读取
- `examine or 'x'`: examine the contents of memory using the `x/<n><u><f> <address>` parameterized command.
- `disas <func>`
- `stepi <n>` command, or `si <n>`：步入
- `nexti <n>` command, or `ni <n>`：步过  
- `finish`：运行完当前的函数  
- `break(or 'b') *<address>`：下断点  
- `set disassembly-flavor intel`： You will probably want to view your instructions using the CORRECT assembly syntax. You can do that with the command  
- `delete or 'd' breakpoint x`
- `display/<n><u><f>` ：常驻展示某个
- `layout regs`：