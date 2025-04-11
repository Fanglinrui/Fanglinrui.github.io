---
tags:
  - Redis
---
## 一、 数据类型  

- 字符串  
- 哈希
- 列表
- 集合
- 有序集合 zset
## 二、常用命令  

### 2.1 字符串操作命令  

| 命令                      | 效果                                |
| ----------------------- | --------------------------------- |
| SET key value           | 设置指定key的值                         |
| GET key                 | 获取指定key的值                         |
| SETEX key seconds value | 设置指定key的值，并将过期时间设为seconds秒——短信验证码 |
| SETNX key value         | 如果key存在，则设置失败                     |

### 2.2 哈希操作命令

| 命令                   | 效果                    |
| -------------------- | --------------------- |
| HSET key field value | 将key中字段field的值设为value |
| HGET key field       | 获取对应的值                |
| HDEL key field       | 删除指定字段                |
| HKEYS key            | 获取哈希表中的所有字段           |
| HVALS key            | 获取哈希表中的所有值            |

### 2.3 列表操作命令

是字符串列表

| 命令                        | 效果                         |
| ------------------------- | -------------------------- |
| LPUSH key value1 [value2] | 将一个或多个值插入头部，L表示left，最左边的先进 |
| LRANGE key start stop     | 获取指定范围的元素                  |
| RPOP key                  | 移除并获取最后一个元素                |
| LLEN key                  | 获取列表长度                     |

### 2.4 集合操作命令

string类型无序集合，集合成员唯一

| 命令                         | 效果          |
| -------------------------- | ----------- |
| SADD key member1 [member2] | 添加一个或多个成员   |
| SMEMBERS key               | 返回所有成员      |
| SCARD key                  | 返回集合的成员数    |
| SINTER key [key2]          | 返回给定所有集合的交集 |
| SUNION key1 [key2]         | 并集          |
| SREM key member1 [member2] | 删除          |

### 2.5 有序集合操作命令  

每个元素关联一个double类型的分数,升序排列

| 命令                                       | 效果                     |
| ---------------------------------------- | ---------------------- |
| ZADD key score1 member1 [score2 member2] | 添加                     |
| ZRANGE key strat stop [WITHSCORES]       | 通过索引区间返回指定区间的成员        |
| ZINCRBY key increment member             | 对指定成员的分数加上增量 increment |
| ZREM key member [member ...]             | 移除                     |
### 2.6 通用命令

| 命令           | 效果              |
| ------------ | --------------- |
| KEYS pattern | 查找符合pattern的key |
| EXISTS key   | 检查是否存在          |
| TYPE key     | 查询key的value类型   |
| DEL key      | 删除key 可以删多个     |
