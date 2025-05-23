---
tags:
  - JVM
  - CMS
  - G1
updateTime: 2025-04-11 16:48
---
CMS（Concurrent Mark-Sweep）和 G1（Garbage-First）是 Java 虚拟机中两种不同的垃圾收集器，主要针对不同场景设计。以下是它们的对比：

---

### **1. 设计目标**
- **CMS**  
  - **低停顿时间**：专注于减少老年代垃圾回收的停顿时间（Stop-The-World, STW），适合对延迟敏感的应用（如 Web 服务器）。  
  - **并发执行**：大部分垃圾回收工作与用户线程并发执行。

- **G1**  
  - **平衡吞吐量和延迟**：在可控的停顿时间（可配置 `-XX:MaxGCPauseMillis`）下实现高吞吐量，适合大内存堆（如 4GB+）。  
  - **分区域管理**：将堆划分为多个 Region，动态管理年轻代和老年代，避免内存碎片。

---

### **2. 工作方式**
- **CMS**  
  - **分阶段标记清除**：  
    1. **初始标记**（STW）：标记 GC Roots 直接关联的对象。  
    2. **并发标记**：与用户线程并发标记存活对象。  
    3. **重新标记**（STW）：修正并发标记期间的变动。  
    4. **并发清除**：与用户线程并发清理垃圾。  
  - **缺点**：  
    - 内存碎片问题（标记-清除算法）。  
    - 无法处理浮动垃圾（并发阶段新产生的垃圾）。  
    - 可能触发 Full GC（如碎片化严重时）。

- **G1**  
  - **分区域复制整理**：  
    1. **初始标记**（STW）：类似 CMS。  
    2. **并发标记**：类似 CMS。  
    3. **最终标记**（STW）：处理剩余对象。  
    4. **筛选回收**（STW）：优先回收垃圾最多的 Region（Garbage-First），复制存活对象到新 Region，整理内存。  
  - **优点**：  
    - 避免内存碎片（标记-整理算法）。  
    - 可预测的停顿时间模型。  
    - 支持超大堆（如数十 GB）。

---

### **3. 适用场景**
| **场景**              | **CMS**                          | **G1**                          |
|-----------------------|----------------------------------|----------------------------------|
| **堆大小**            | 中小堆（如 < 4GB）              | 大堆（如 > 4GB）                |
| **延迟敏感度**        | 极高（追求最低 STW 时间）       | 较高（平衡延迟与吞吐量）        |
| **内存碎片容忍度**    | 低（需定期 Full GC 整理碎片）   | 高（自动整理，避免碎片）        |
| **JDK 版本**          | JDK 8 及之前（JDK 9+ 已废弃）   | JDK 7u4+ 支持，JDK 9+ 默认      |

---

### **4. 优缺点对比**
| **特性**          | **CMS**                              | **G1**                              |
|-------------------|--------------------------------------|--------------------------------------|
| **停顿时间**      | 更短（但可能突发 Full GC）          | 可控且稳定                          |
| **内存占用**      | 较低                                | 较高（需维护 Region 元数据）        |
| **吞吐量**        | 中等                                | 较高                                |
| **碎片问题**      | 存在（需 Full GC 处理）             | 无（自动整理）                      |
| **适用性**        | 老年代专用                          | 全堆管理（年轻代 + 老年代）         |

---

### **5. 总结**
- **选择 CMS**：  
  适用于对延迟极度敏感、堆内存较小的场景（如实时系统），但需容忍潜在的内存碎片和 Full GC 风险。  
  **注意**：CMS 在 JDK 9 后已废弃，未来可能被移除。

- **选择 G1**：  
  适合大内存堆、需要平衡吞吐量和延迟的场景（如大数据应用），尤其是 JDK 9+ 的默认选择。  
  若追求更低延迟，可进一步考虑 ZGC 或 Shenandoah（针对超大规模堆）。

---

**迁移建议**：  
- 新项目或 JDK 9+ 环境优先使用 G1。  
- 旧项目若需升级 JDK，建议从 CMS 迁移到 G1 或 ZGC。