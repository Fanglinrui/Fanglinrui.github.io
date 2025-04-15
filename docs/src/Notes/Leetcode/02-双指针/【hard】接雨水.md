---
题目地址: https://leetcode.cn/problems/trapping-rain-water/solutions/692342/jie-yu-shui-by-leetcode-solution-tuvc/?envType=study-plan-v2&envId=top-100-liked
难度: 困难
解析: https://www.programmercarl.com/0042.%E6%8E%A5%E9%9B%A8%E6%B0%B4.html#%E6%80%9D%E8%B7%AF
updateTime: 2025-04-12 22:56
---
这道题，重点要理解：
$maxLeft[i] = max(height[i], maxLeft[i - 1]);$ 
和
$maxLeft[i] = max(height[i-1], maxLeft[i - 1]);$
的区别

也就是说，是否要把自己也放进去；

为什么？
因为这一列的雨水面积：min(左边柱子的最高高度，记录右边柱子的最高高度) - 当前柱子高度。
假如不算自己，那么遇到 “凸”字形，会减成负数，这时候取0就可以了
如果是“凹”字形，那么算不算都无所谓

总之，就是处理负数时的手法不同；两种都可以。