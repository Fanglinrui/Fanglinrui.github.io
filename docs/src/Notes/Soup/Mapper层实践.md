---
tags:
  - SSM
  - MyBatis
updateTime: 2025-04-11 16:48
---
除了在mapper层通过注解写SQL 查询语句之外，还可以通过Mybatis XML语句实现，下面是一个例子  

```xml
<mapper namespace="com.sky.mapper.EmployeeMapper">  
    <select id="pageQuery" resultType="com.sky.entity.Employee">  
        select * from employee  
        <where>  
            <if test="name != null and name !=''">  
                and name like concat('%',#{name},'%')  
            </if>  
        </where>  
        order by create_time desc  
    </select>  
</mapper>
```  

## XML解释如下

这段代码是一个MyBatis的Mapper XML配置文件，用于定义数据库查询操作。它实现了一个动态SQL查询，根据条件筛选员工信息并分页返回结果。以下是对代码的详细解释：

---

### 1. **Mapper 命名空间**
```xml
<mapper namespace="com.sky.mapper.EmployeeMapper">
```
- **作用**：将当前XML文件与Java接口 `com.sky.mapper.EmployeeMapper` 绑定。
- **细节**：接口中的方法名（如 `pageQuery`）需与XML中的SQL语句`id`一致，MyBatis会自动通过反射关联。

---

### 2. **查询定义（Select 语句）**
```xml
<select id="pageQuery" resultType="com.sky.entity.Employee">
```
- **`id="pageQuery"`**：对应Java接口中的方法名 `pageQuery`。
- **`resultType="com.sky.entity.Employee"`**：查询结果映射到的实体类，MyBatis会自动将数据库字段与实体属性匹配（需字段名一致或开启驼峰转换）。

---

### 3. **基础SQL与动态条件**
```sql
select * from employee
<where>
    <if test="name != null and name !=''">
        and name like concat('%', #{name}, '%')
    </if>
</where>
```
- **`<where>` 标签**：动态生成`WHERE`子句。
  - **自动处理**：如果内部条件成立，自动添加`WHERE`；若条件不成立，忽略`WHERE`。
  - **去除多余AND**：智能删除条件开头的`AND`/`OR`，避免语法错误（如 `WHERE AND ...`）。
  
- **`<if>` 标签**：根据条件动态拼接SQL。
  - **`test` 表达式**：判断参数`name`是否非空。
  - **模糊查询**：`name like concat('%', #{name}, '%')` 实现按名称模糊匹配。
    - **防SQL注入**：`#{name}` 使用预编译占位符，避免直接拼接字符串。
    - **数据库兼容**：`concat`函数兼容多数数据库（如MySQL），其他数据库可能需要调整。

---

### 4. **排序与分页**
```sql
order by create_time desc
```
- **排序**：按`create_time`降序排列，确保最新数据在前。
- **分页说明**：虽然SQL中无`LIMIT`，但通常结合分页插件（如PageHelper）在Java代码中实现分页逻辑。例如：
  ```java
  PageHelper.startPage(pageNum, pageSize); // 自动添加LIMIT
  List<Employee> employees = employeeMapper.pageQuery(name);
  ```

---

### 5. **完整逻辑流程**
1. **调用方法**：Java中调用 `EmployeeMapper.pageQuery("Alice")`。
2. **动态SQL生成**：
   - 若`name`非空，生成SQL：
     ```sql
     SELECT * FROM employee WHERE name LIKE '%Alice%' ORDER BY create_time DESC
     ```
   - 若`name`为空，生成SQL：
     ```sql
     SELECT * FROM employee ORDER BY create_time DESC
     ```
3. **结果映射**：将查询结果自动封装为`Employee`对象列表。

---

### 6. **常见问题解答**
- **为何条件中有`AND`前缀？**  
  `<where>`标签会自动移除开头的`AND`/`OR`，保持语法正确性。

- **如何实现分页？**  
  通常借助分页插件（如PageHelper），在调用方法前添加分页参数，插件会自动修改SQL添加`LIMIT`。

- **字段名与属性名不一致怎么办？**  
  使用`<resultMap>`定义映射关系，或开启`mapUnderscoreToCamelCase`驼峰转换。

---

### 总结
这段代码实现了一个灵活的员工分页查询，支持按名称模糊搜索，结果按时间倒序排列。动态SQL处理保证了代码简洁性和安全性，是MyBatis高效查询的典型示例。  

## 如何与mapper接口中的函数定义产生联系  

Employmapper.java中的定义是 
`Page<Employee> pageQuery(EmployeePageQueryDTO employeePageQueryDTO);`  

您的疑问涉及MyBatis与分页插件（如PageHelper）的协作机制，这里的关键点在于：**XML中的`resultType`定义的是单条记录的映射类型，而`Page<Employee>`是分页插件对查询结果的二次封装**。以下是详细解释：

---

### 1. **接口方法与XML的关系**
在MyBatis中：
- **Mapper接口方法**：定义调用逻辑和返回类型（`Page<Employee>`）。
- **XML中的SQL**：定义实际执行的SQL和单行记录的映射类型（`Employee`）。

二者的协作方式是：
- MyBatis会**先执行XML中的SQL**，将查询结果映射为`List<Employee>`。
- 分页插件（如PageHelper）**拦截查询过程**，将`List<Employee>`包装为`Page<Employee>`。

---

### 2. **为什么XML返回`Employee`而不是`Page`？**
#### (1) **`resultType`的本质**
- `resultType="Employee"` 表示**每一行记录**映射为一个`Employee`对象。
- SQL查询结果是一个`List<Employee>`，即使分页后，数据库返回的仍然是`Employee`的集合，而不是`Page`对象。

#### (2) **分页插件的介入**
分页插件（如PageHelper）的运作流程：
1. **前置拦截**：调用`PageHelper.startPage(pageNum, pageSize)`后，插件会拦截下一个SQL。
2. **改写SQL**：自动为原SQL添加分页语句（如MySQL的`LIMIT`）。
3. **执行查询**：得到分页后的`List<Employee>`。
4. **二次查询**：自动执行`COUNT(*)`查询获取总记录数。
5. **封装结果**：将`List<Employee>`和分页信息（总记录数、页码等）包装成`Page<Employee>`。

因此：
- **XML只需关心单条记录的映射**（`Employee`）。
- **接口方法返回`Page<Employee>`是分页插件的功劳**，与XML无关。

---

### 3. **代码示例验证**
假设接口方法如下：
```java
// Mapper接口方法
Page<Employee> pageQuery(EmployeePageQueryDTO dto);
```

调用时的代码：
```java
// 1. 启动分页（假设查询第2页，每页10条）
PageHelper.startPage(2, 10);

// 2. 执行查询（返回Page<Employee>，但XML中resultType是Employee）
Page<Employee> page = employeeMapper.pageQuery(dto);

// 3. 分页结果
List<Employee> employees = page.getResult(); // 当前页的Employee列表
long total = page.getTotal();                // 总记录数
```

此时：
- **XML中的SQL**返回的是`List<Employee>`。
- **分页插件**将其包装为`Page<Employee>`，并添加分页信息。

---

### 4. **常见误区**
#### 误区1：`Page<Employee>`需要特殊XML配置
- **不需要！** 分页插件通过拦截器机制实现，与XML解耦。XML只需编写普通查询。

#### 误区2：`resultType`必须和接口返回类型一致
- **不一定！** MyBatis允许接口返回类型与XML的`resultType`不同，前提是插件或代码能处理转换逻辑。例如：
  - 返回`List<Employee>` → `resultType="Employee"`（直接映射）。
  - 返回`Page<Employee>` → `resultType="Employee"`（插件包装）。

---

### 5. **总结
- **XML的`resultType`**：定义单行记录的映射目标（`Employee`）。
- **接口的`Page<Employee>`**：由分页插件通过包装`List<Employee>`生成。
- **分页插件的作用**：自动改写SQL、添加分页、封装结果，无需修改XML。

这种设计保证了SQL的纯粹性（只关注查询逻辑），而分页等附加功能由插件动态实现，符合职责分离原则。