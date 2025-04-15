---
tags:
  - Java开发
  - SSM
updateTime: 2025-04-11 16:48
---
## 一、Controller层

1. 创建xxController **类**  
2. 类--添加注解：
	1. `@RestController`  
	2. `@RequestMapping`  
	3. `@Api`
	4. `@Slf4j`  
3.  注入服务层  这样就可以使用方法了
```java
	@Autowired
	private DishService dishService
```
4. 新增方法
	1. 根据POST或是其他添加`@PostMapping` 等注解  
	2. `@ApiOperation`  

## 二、Service层  

1. 创建接口 （选interface)  
	1. 这里没有注解  
2. 创建实现类（选class）
	1. `@Service`
	2. `@Slf4j`  
	3.  `public xxServiceImpl implements xxService`  
3. 实现类中注入持久层  
```java
@Autowired
private XxMapper xxMapper
```  
1. 如果要对多个表操作，要加入`@Transactional`注解同时要在`com/sky/SkyApplication.java`处通过`@EnableTransactionManagement //开启注解方式的事务管理`

## 三、Mapper层  
2. 创建接口XxMapper.java (interface)  
	1. 记得添加`@Mapper`
3. 在/resources/mapper中创建DishFlavorMapper.xml