---
tags:
  - 前端
  - CSS
来自于: https://html.com/css/
---
- CSS: Cascading Style Sheets  
- 与HTML的区别：  
	- content: HTML  
	- presentation: CSS  
# 元素间的关系  
元素：selectors, properties, values, declarations, declaration blocks, rulesets, at-rules, statements  
关系如下：  
* statement  
	* at-rules  
	* rulesets  
		* selector  
		* declaration blocks  
			* declarations  
				* property: value  
rulesets的selector换成@sign就是at-rules  

hooks: identifier, like ID , Classes, 不可互换  
- 用类来批量指定  
- 用ID来指定单个元素  

# 不同级别的CSS是如何区分的？  
两个关键词：inheritance, specificity  
## Cascading Inheritance  
### Cascading  
*Why are CSS styles called _**cascading**_? When multiple rules are written that conflict with each other, the last rule written will be implemented. In this way, styles cascade downward and the **last rule written is applied.***
### Inheritance  
里面的继承外面的style  

## Specificity  

- 更具体/小的选择器优先级更高，ID>class>element  
- inline>internal>external  

- WYSIWYG editior: 所见即所得编辑器  
