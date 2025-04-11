---
tags:
  - Java开发
  - 反射
参考: https://javaguide.cn/java/basis/reflection.html
---
Java中的反射（Reflection）是一种强大的机制，允许程序在运行时动态地获取类的信息并操作类或对象的结构（如方法、字段、构造方法等）

---

### **一、反射的核心类**
- **`Class`类**：表示类或接口的类型信息。
- **`Method`类**：表示类的方法。
- **`Field`类**：表示类的字段（成员变量）。
- **`Constructor`类**：表示类的构造方法。
- **`java.lang.reflect`包**：包含上述核心类和工具类（如`Array`处理数组）。

---

### **二、反射的基本用法**

#### **1. 获取`Class`对象**
- **通过类名**：`Class clazz = String.class;`
- **通过对象**：`Class clazz = obj.getClass();`
- **通过全限定类名**：`Class clazz = Class.forName("java.lang.String");`（需处理`ClassNotFoundException`）

#### **2. 创建实例**
- **无参构造**：`Object obj = clazz.newInstance();`（已弃用，建议使用构造器）
- **带参构造**：
  ```java
  Constructor constructor = clazz.getConstructor(String.class); // 获取公共构造方法
  Object obj = constructor.newInstance("Hello");
  ```

#### **3. 调用方法**
- **获取方法**：
  ```java
  Method method = clazz.getMethod("方法名", 参数类型.class); // 获取公共方法（包括继承的）
  Method privateMethod = clazz.getDeclaredMethod("私有方法名", 参数类型.class); // 获取私有方法
  ```
- **调用方法**：
  ```java
  method.invoke(obj, 参数); // 实例方法
  staticMethod.invoke(null, 参数); // 静态方法（obj传null）
  privateMethod.setAccessible(true); // 允许访问私有方法
  ```

#### **4. 访问/修改字段**
- **获取字段**：
  ```java
  Field field = clazz.getField("字段名"); // 公共字段
  Field privateField = clazz.getDeclaredField("私有字段名");
  ```
- **读写字段值**：
  ```java
  privateField.setAccessible(true); // 允许访问私有字段
  Object value = privateField.get(obj); // 读值
  privateField.set(obj, "新值"); // 写值
  ```

#### **5. 其他操作**
- **获取父类/接口**：
  ```java
  Class superClass = clazz.getSuperclass(); // 父类
  Class[] interfaces = clazz.getInterfaces(); // 实现的接口
  ```
- **处理泛型/注解**：通过`Type`接口和`AnnotatedElement`方法（如`getAnnotation()`）。

---

### **三、应用场景**
1. **框架开发**：如Spring（依赖注入）、Hibernate（ORM）、JUnit（动态调用测试方法）。
2. **动态代理**：基于`Proxy`和`InvocationHandler`生成代理对象。
3. **配置文件驱动**：根据外部配置动态加载类（如JDBC驱动）。
4. **调试工具**：分析类的运行时结构。

---

### **四、优缺点**
- **优点**：
  - 动态性：运行时处理未知类。
  - 灵活性：支持动态代理、插件扩展等场景。
- **缺点**：
  - **性能低**：反射调用比直接调用慢（JVM优化如缓存可缓解）。
  - **安全性**：可能破坏封装（如访问私有成员）。
  - **维护性**：代码可读性差，编译器无法检查反射错误。

---

### **五、注意事项**
1. **异常处理**：需捕获`ClassNotFoundException`、`NoSuchMethodException`、`IllegalAccessException`等。
2. **模块系统（Java 9+）**：需在`module-info.java`中开放包（`opens`）以允许反射访问。
3. **内部类**：类名格式为`外部类$内部类`（如`Outer$Inner`）。

---

### **代码示例**
```java
// 反射创建对象并调用方法
public class ReflectionExample {
    public static void main(String[] args) throws Exception {
        Class<?> clazz = Class.forName("java.lang.String");
        Constructor<?> constructor = clazz.getConstructor(String.class);
        Object str = constructor.newInstance("Hello Reflection!");
        
        Method method = clazz.getMethod("substring", int.class);
        String result = (String) method.invoke(str, 6);
        System.out.println(result); // 输出 "Reflection!"
        
        // 访问私有字段示例（假设存在私有字段）
        Field field = clazz.getDeclaredField("value");
        field.setAccessible(true);
        char[] value = (char[]) field.get(str);
        System.out.println(Arrays.toString(value));
    }
}
```
