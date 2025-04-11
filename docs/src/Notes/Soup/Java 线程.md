---
tags:
  - JUC
  - 线程
---
### **1. 线程的创建方式**
- **继承** `Thread` **类**：通过重写 `run()` 方法直接定义线程。
- **实现** `Runnable` **接口**：任务逻辑与线程分离，推荐使用。
- **使用匿名内部类**：适合简短任务的快速实现。
- **实现** `Callable` **接口**：支持返回值和异常处理，需结合线程池。
- **使用线程池（**`ExecutorService`**）**：通过线程池管理线程，效率更高。
- **使用** `FutureTask`：支持返回结果和任务控制，兼具 `Runnable` 和 `Callable` 特性。

### **2. 任务与线程的关系**
- **任务 (**`Runnable` **或** `Callable`**)**：
    - 描述“要做什么”，仅定义逻辑。
- **线程 (**`Thread`**)**：
    - 是“执行任务的载体”，负责运行任务。
- **两者结合**：任务可以分配给线程或线程池，由线程负责调度和执行。

### **3. 线程池（**`ExecutorService`**）**
- **核心功能**：
    - 任务提交：`submit()`、`execute()`。
    - 管理线程：`shutdown()`、`shutdownNow()`。
    - 状态检查：`isDone()`、`isCancelled()`。
- **常见实现**：
    - `FixedThreadPool`：固定大小线程池。
    - `CachedThreadPool`：动态扩展线程池。
    - `SingleThreadExecutor`：单线程池。
    - `ScheduledThreadPool`：支持定时与周期任务。

### **4. 终止线程的方式**
- **推荐方法**：
    - 使用标志变量：通过循环判断标志，安全退出。
    - 调用 `interrupt()`：通知线程中断，配合 `InterruptedException` 处理。
    - 使用线程池的 `shutdown()` 或 `Future.cancel()`。
- **不推荐方法**：
    - 使用 `stop()`：已弃用，可能导致资源未释放问题。

### **5.** `Runnable` **和** `Callable` **的区别**
- **返回值**：
    - `Runnable` 无返回值，方法为 `run()`。
    - `Callable` 有返回值（通过 `Future` 获取），方法为 `call()`。
- **异常处理**：
    - `Runnable` 无法抛出受检异常。
    - `Callable` 支持抛出受检异常。

### **6.** `LockSupport.park()` **的作用**
- **阻塞当前线程**：线程进入等待状态，需通过 `LockSupport.unpark()` 唤醒。
- **基于许可证**：线程调用 `park()` 阻塞时，需发放“许可证”才能继续运行。
    

### **7.** `Future` **的作用**
- 用于表示异步任务的结果。
- **核心方法**：
    - `get()`：阻塞等待任务完成并返回结果。
    - `cancel()`：尝试取消任务。
    - `isDone()` 和 `isCancelled()`：检查任务状态。

### **8. 总体推荐**
- 使用线程池 (`ExecutorService`) 和任务 (`Runnable`/`Callable`) 是现代开发的最佳实践，特别是在需要高效管理大量并发任务时