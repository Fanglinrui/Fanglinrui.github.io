---
tags:
  - Java开发
参考: https://blog.csdn.net/wintershii/article/details/80558739
aliases:
  - Overload
---
背景：在学习苍穹外卖时，对一种新的错误需要在“全局错误捕获中”添加错误处理，老师提到了重载  

> [!NOTE] 重载：Overload
> 在一个类中，同名的方法如果有不同的参数列表（**参数类型不同、参数个数不同甚至是参数顺序不同**）则视为重载。同时，重载对返回类型没有要求，可以相同也可以不同，但**不能通过返回类型是否相同来判断重载**。

也就是同一个方法对不同的参数有不同的处理方式  

一个例子（也就那个异常处理器）：

```java
@RestControllerAdvice  
@Slf4j  
public class GlobalExceptionHandler {  
  
    /**  
     * 捕获业务异常  
     * @param ex  
     * @return  
     */  
    @ExceptionHandler  
    public Result exceptionHandler(BaseException ex){  
        log.error("异常信息：{}", ex.getMessage());  
        return Result.error(ex.getMessage());  
    }  
  
    /**  
     * 处理SQL错误  
     * @param ex  
     * @return  
     */  
    @ExceptionHandler  
    public Result exceptionHandler(SQLIntegrityConstraintViolationException ex){  
        // Duplicate entry 'zhangsan' for key 'employee.idx_username'  
        String message = ex.getMessage();  
        if(message.contains("Duplicate entry")){  
            String[] split = message.split(" ");  
            String username = split[2];  
            String msg = username + MessageConstant.ALREADY_EXISTS;  
            return Result.error(msg);  
        } else {  
            return Result.error(MessageConstant.UNKNOWN_ERROR);  
        }  
    }  
}
```

