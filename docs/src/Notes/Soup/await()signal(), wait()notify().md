---
tags:
  - JUC
---
是的，`wait()/notify()` 和 `await()/signal()` 是实现线程间通信的两种不同机制，它们分别用于 **传统线程通信** 和 **基于 AQS 的线程通信**。

### **区别与联系**
| **比较维度**    | **`wait()/notify()`**                               | **`await()/signal()`**                              |
|-----------------|----------------------------------------------------|---------------------------------------------------|
| **所属体系**     | Object 类的线程通信机制（早期设计）                  | AQS 提供的条件变量机制，依赖 Lock 实现             |
| **使用对象**     | 任何 Java 对象                                     | 需要与 Lock（如 ReentrantLock）结合使用             |
| **线程等待队列** | 调用 `wait()` 的线程进入对象的等待队列              | 调用 `await()` 的线程进入 AQS 的条件队列（Condition Queue） |
| **阻塞与唤醒**   | `wait()` 使线程阻塞，`notify()` 随机唤醒一个线程   | `await()` 使线程阻塞，`signal()` 唤醒特定的条件队列线程 |
| **锁释放行为**   | `wait()` 释放对象锁，但 `notify()` 不释放锁         | `await()` 释放关联锁，`signal()` 不释放锁           |
| **灵活性**       | 灵活度较低，需手动管理线程间的通信                  | 结合 Lock，更适合复杂场景，简化多线程并发控制        |
| **典型应用**     | 传统的线程同步与通信                               | 现代并发工具（如 ReentrantLock 的 Condition）        |

---

### **详解 `wait()/notify()`**
- **基本用法**：它们是 Java 的早期设计，用于传统线程间通信。
- **示例**：
```java
synchronized (lock) {
    while (!condition) {
        lock.wait(); // 线程等待
    }
    // 处理逻辑
    lock.notify(); // 唤醒一个等待线程
}
```

- **不足之处**：
  - 需要搭配 `synchronized` 使用，写法不够直观。
  - 容易出现死锁和线程丢失通知的问题。

---

### **详解 `await()/signal()`**
- **特点**：
  - 属于 Condition 类，依赖 ReentrantLock 提供的同步机制，解决了 `wait/notify` 的一些缺陷。
  - 将条件管理与锁分离，增强了代码的清晰性和灵活性。

- **示例**：
```java
Lock lock = new ReentrantLock();
Condition condition = lock.newCondition();

lock.lock();
try {
    while (!conditionMet) {
        condition.await(); // 等待条件满足
    }
    // 执行业务逻辑
    condition.signal(); // 唤醒等待线程
} finally {
    lock.unlock();
}
```

- **优势**：
  - 支持多个条件队列，通过多个 `Condition` 管理不同的线程。
  - 更适合复杂多线程并发场景，例如生产者-消费者模型。

---

### **总结**
- 如果你是管理简单的线程通信，`wait()/notify()` 可以胜任。
- 如果是复杂并发环境（如锁的高级控制），`await()/signal()` 提供更强大、易维护的机制。
