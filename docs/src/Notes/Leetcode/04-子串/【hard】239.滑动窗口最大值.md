---
题目地址: https://leetcode.cn/problems/sliding-window-maximum/description/?envType=study-plan-v2&envId=top-100-liked
难度: 困难
updateTime: 2025-04-12 22:56
---
值没法标识元素，那就用下标进行标识

这里用到了双端队列 实现的 单调队列  

```
 //双端队列

 //进队列是单向的，出队列是双向的  

 //从队尾出是因为要进来的值比队尾的大，新的比旧的厉害，那么旧的就直接淘汰

 //从队首出是因为窗口已经过去了
```

常看常新