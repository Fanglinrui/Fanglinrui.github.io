---
tags:
  - Java开发
  - 注解
updateTime: 2025-04-12 17:41
---
@Bean 和 @Autowired 做了两件完全不同的事情：

@Bean 告诉 Spring：“这是这个类的一个实例，请保留它，并在我请求时将它还给我”。
@Autowired 说：“请给我一个这个类的实例，例如，一个我之前用@Bean注释创建的实例”。
```java
@SpringBootApplication
public class Application {

  @Autowired
  BookingService bookingService;

  @Bean
  BookingService bookingService() {
    return new BookingService();
  }

  public static void main(String[] args) {
    bookingService.book("Alice", "Bob", "Carol");
  }
}
```

在本例中，@Bean 注释为 Spring 提供了 BookingService， @Autowired 使用了它。这可能是一个稍微没有意义的示例，因为你在同一个类中使用这些，但是如果您在一个类中定义了@Bean，而在另一个类中定义了@Autowired，那么它就非常有用。

