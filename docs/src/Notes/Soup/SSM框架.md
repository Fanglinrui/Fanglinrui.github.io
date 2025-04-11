---
tags:
  - Java开发
  - Spring
  - SpringMVC
  - MVC
  - SSM
  - MyBatis
---
## 基础名词

SSM=Spring+SpringMVC+MyBatis  

- **Spring**是轻量级的容器，负责管理和配置Bean，依赖注入和控制反转是关键点。
	- Bean：**In Spring** , the **objects** that form the backbone of your application and that are managed by the Spring IoC container are called beans
- **Spring MVC**处理Web层的请求分发，模型-视图-控制器模式。
	
- **MyBatis**是ORM（对象关系映射）框架，简化数据库操作，对比Hibernate的话，可能更灵活，使用SQL映射。

这也是一种MVC：[[MVC—一种软件设计模式]]  

## 框架结构  

1. **View 层**  
	- 负责前台的展示
2. **Controller 层** ：负责具体的业务模块流程控制 
	-  调用Service层的接口
3. **Service 层**  ：负责业务模块逻辑设计  
	
4. **DAO 层（Mapper）层**  ：负责与数据库进行联络的一些任务都封装在此
	- DAO：Data Access Object  
	- 这个层处于数据库和Service之间
## 典型应用场景

- **用户注册流程**：
    
    1. 用户提交表单 → Spring MVC的`Controller`接收请求。
        
    2. `Service`层校验数据并处理业务逻辑。
        
    3. `DAO`层通过MyBatis将用户数据写入数据库。
        
    4. 返回结果（如JSON或跳转页面）。



