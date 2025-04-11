---
tags:
  - SpringBoot
---
**`xxx-spring-boot-starter`** 通常会根据你在 `application.yml` 或 `application.properties` 中的配置，自动创建和初始化对应的实例。这是 Spring Boot 的核心特性之一，基于 **自动配置（Auto-Configuration）** 和 **依赖注入（Dependency Injection）** 的工作机制实现的。

以下是工作流程的简要说明：

---

### 1. **Spring Boot Starter 的作用**
- 每个 `xxx-spring-boot-starter` 是一组预定义的依赖集合，它们通常包含了实现某一特定功能所需要的库和配置。例如：
  - `spring-boot-starter-web` 包括了 Spring MVC 和嵌入式 Tomcat 的依赖。
  - `spring-boot-starter-data-jpa` 包括了 JPA 和 Hibernate 的依赖。

---

### 2. **自动配置过程**
- 在你启动 Spring Boot 应用时，`SpringApplication` 类会加载所有的自动配置类。这些类通过 `@Configuration` 和 `@ConditionalOnProperty` 等注解，基于你的配置文件判断是否需要初始化对应的 Bean。
- **步骤：**
  1. Spring Boot 解析 `application.yml` 或 `application.properties` 中的配置。
  2. 结合 Starter 的默认行为，动态创建和装配所需的实例（如数据源、Bean、Controller）。

例如，配置数据源时：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: user
    password: pass
```
- Spring Boot 会基于 `spring.datasource` 配置自动创建一个 `DataSource` 实例。

---

### 3. **依赖注入和默认配置**
- 如果你没有在配置文件中指定某些属性，Spring Boot 会加载 Starter 提供的默认值。例如：
  - 使用 `spring-boot-starter-web` 时，默认情况下会启用嵌入式 Tomcat，且监听 `8080` 端口。
- 如果你在配置文件中指定了属性（如 `server.port=9090`），则会覆盖默认值。

---

### 4. **手动和自动的平衡**
- 虽然 Spring Boot 的 Starter 提供了自动化，但你仍然可以手动配置或覆盖某些实例的行为。例如：
  ```java
  @Bean
  public DataSource customDataSource() {
      return new HikariDataSource(); // 手动定义自定义的数据源
  }
  ```

---

总结来说，`xxx-spring-boot-starter` 的核心作用是为你预定义依赖，并通过自动配置机制，根据 `application.yml` 中的配置来动态生成和装配对应的实例