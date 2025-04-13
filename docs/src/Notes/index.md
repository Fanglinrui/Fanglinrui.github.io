---
layout: page
sidebar: false

hero:
  title: "Posts"
  subTitle: "📚 看看我最近写了什么"

types:
  - name: "ACM 模式练习"
    desc: "ACM 模式练习"
    link: "/Notes/ACM-mode/" 
    icon: "🦁"
  - name: "Leetcode 刷题"
    desc: "Leetcode"
    link: "/Notes/Leetcode/"
    icon: "🐱"
  - name: "期末个人复习攻略"
    desc: "BUPT·SCSS"
    link: "/Notes/MyBUPT/"
    icon: "🐻‍❄️"
  - name: "一锅乱炖"
    desc: "Soup"
    link: "/Notes/Soup/"
    icon: "🐯" 

flow: true
---

<script setup>
import BlogArchive from '../../.vitepress/views/BlogArchive.vue'
</script>

<BlogArchive/>
