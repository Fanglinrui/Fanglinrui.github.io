---
tags:
  - JUC
  - synchronized
---

是的，Java 中的 **`synchronized`** 是支持重入的（Reentrant）。这意味着一个线程在已经持有某个锁的情况下，可以再次获取同一个锁而不会被阻塞。这种机制被称为**可重入锁**（Reentrant Lock）。

---

### **1. 什么是重入？**
重入是指一个线程在持有锁的情况下，可以多次获取同一个锁。例如：

```java
public class ReentrantExample {
    public synchronized void methodA() {
        System.out.println("Method A");
        methodB(); // 调用另一个同步方法
    }

    public synchronized void methodB() {
        System.out.println("Method B");
    }
}
```

- 如果一个线程调用 `methodA()`，它会先获取当前对象的锁。
- 在 `methodA()` 内部调用 `methodB()` 时，线程会再次尝试获取同一个锁。
- 由于 `synchronized` 支持重入，线程可以成功获取锁，而不会被阻塞。

---

### **2. 为什么需要重入？**
重入机制是为了避免**死锁**和简化编程模型。如果没有重入机制，以下代码会导致死锁：

```java
public class DeadlockExample {
    public synchronized void methodA() {
        System.out.println("Method A");
        methodB(); // 调用另一个同步方法
    }

    public synchronized void methodB() {
        System.out.println("Method B");
    }
}
```

- 如果 `synchronized` 不支持重入，线程在 `methodA()` 中调用 `methodB()` 时会被阻塞，因为它已经持有锁。
- 由于 `methodB()` 需要获取同一个锁，而锁被当前线程持有，线程会永远等待，导致死锁。

通过支持重入，`synchronized` 避免了这种问题。

---

### **3. `synchronized` 重入的实现原理**
`java` 中 `synchronized` 的重入是通过 **锁的计数器** 和 **线程标识** 实现的。具体来说：

#### **(1) 锁的计数器**
- 每个锁对象（`Object`）内部维护了一个计数器，用于记录锁被同一个线程重入的次数。
- 当线程第一次获取锁时，计数器为 1。
- 每次线程重入锁时，计数器加 1。
- 每次线程释放锁时，计数器减 1。
- 当计数器减到 0 时，锁被完全释放，其他线程可以获取锁。

#### **(2) 线程标识**
- 锁对象内部还记录了当前持有锁的线程。
- 当线程尝试获取锁时，JVM 会检查锁的持有者是否是当前线程：
  - 如果是当前线程，则允许重入（计数器加 1）。
  - 如果不是当前线程，则线程进入阻塞状态。

---

### **4. 底层实现**
`java` 中 `synchronized` 的底层实现依赖于 **对象头** 和 **Monitor 机制**。

#### **(1) 对象头**
- 每个 Java 对象都有一个对象头，其中包含锁的状态信息。
- 对象头中有一个字段用于记录锁的持有者和计数器。

#### **(2) Monitor 机制**
- `synchronized` 的锁是基于 **Monitor** 实现的。
- Monitor 是一个同步工具，包含以下组件：
  - **Entry Set**：等待获取锁的线程队列。
  - **Owner**：当前持有锁的线程。
  - **Wait Set**：调用 `wait()` 后进入等待状态的线程队列。
- 当线程尝试获取锁时：
  - 如果锁未被持有，线程成为 Owner，计数器设置为 1。
  - 如果锁已被当前线程持有，计数器加 1。
  - 如果锁被其他线程持有，线程进入 Entry Set 等待。

https://www.cnblogs.com/qingshan-tang/p/12698705.html

---

### **5. 示例代码**
以下代码展示了 `synchronized` 的重入特性：

```java
public class ReentrantDemo {
    public synchronized void outer() {
        System.out.println("Outer method");
        inner(); // 调用另一个同步方法
    }

    public synchronized void inner() {
        System.out.println("Inner method");
    }

    public static void main(String[] args) {
        ReentrantDemo demo = new ReentrantDemo();
        demo.outer(); // 同一个线程可以重入锁
    }
}
```

**输出**：
```
Outer method
Inner method
```

---

### **6. 与 `ReentrantLock` 的区别**
`ReentrantLock` 是 `java.util.concurrent.locks` 包中的一种显式锁，也支持重入。与 `synchronized` 的主要区别在于：
- **灵活性**：`ReentrantLock` 支持公平锁、非公平锁、尝试获取锁、超时机制等。
- **性能**：在高并发场景下，`ReentrantLock` 的性能可能优于 `synchronized`。
- **使用方式**：`synchronized` 是隐式锁，`ReentrantLock` 是显式锁，需要手动加锁和释放锁。

---

### **总结**
- `synchronized` 支持重入，通过锁的计数器和线程标识实现。
- 重入机制避免了死锁，并简化了编程模型。
- 底层实现依赖于对象头和 Monitor 机制。
- 与 `ReentrantLock` 相比，`synchronized` 更简单易用，但功能较少。

通过理解 `synchronized` 的重入机制，可以更好地编写线程安全的代码。