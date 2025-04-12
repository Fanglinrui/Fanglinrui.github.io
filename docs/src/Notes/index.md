---
layout: page
sidebar: false

hero:
  title: "Posts"
  subTitle: "📚 看看我最近写了什么"

types:
  - name: "一锅乱炖"
    desc: "Soup"
    link: "/Notes/Soup/"
    icon: "🐯" 
  - name: "leetcode 刷题"
    desc: "leetcode"
    link: "/Notes/leetcode"
    icon: "🐱"
# flow: true
---

<script setup>
import BlogArchive from '../../.vitepress/views/BlogArchive.vue'
</script>

<BlogArchive/>
