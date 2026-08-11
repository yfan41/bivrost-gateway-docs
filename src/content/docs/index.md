---
title: "一、简介"
hero:
  title: 彼络物联网关
  tagline: 数控机床、激光焊接机、机器人、PLC 等设备的数据采集与加工程序传送服务
  actions:
    - text: 快速上手：联网说明
      link: networking/
      icon: rocket
    - text: 登录网关
      link: usage/login/
      variant: minimal
      icon: right-arrow
---

<div class="home-grid not-content">
  <a class="home-card" href="networking/">
    <span class="home-card-title">联网说明</span>
    <span class="home-card-desc">接线、配网与网络要求</span>
  </a>
  <a class="home-card" href="usage/login/">
    <span class="home-card-title">网关使用</span>
    <span class="home-card-desc">登录与管理页面操作</span>
  </a>
  <a class="home-card" href="usage/file-transfer/">
    <span class="home-card-title">程序传输</span>
    <span class="home-card-desc">加工程序上传与下发</span>
  </a>
  <a class="home-card" href="reference/command-format/">
    <span class="home-card-title">指令格式</span>
    <span class="home-card-desc">软件接口与命令格式</span>
  </a>
  <a class="home-card" href="faq/">
    <span class="home-card-title">常见问题</span>
    <span class="home-card-desc">故障排查与解答</span>
  </a>
  <a class="home-card" href="changelog/">
    <span class="home-card-title">变更历史</span>
    <span class="home-card-desc">各版本更新记录</span>
  </a>
</div>

彼络物联网关为数控机床，激光焊接机，机器人，PLC 等设备提供数据采集与加工程序传送服务。用户可以通过一台网关采集管理最多 255 台不同型号的设备。网关适配各大机床系统，提供全面软件接口，配置灵活，即插即用，支持断线重连，断点续传，支持一带多并行采集，支持毫秒级数据采集，支持多种协议转发数据。

当前版本支持采集以下品牌 CNC 机床数据：

| 系统型号 | 基础数据 | 轴数据 | OEE 监控 | PLC 数据 | 程序传输 | 刀具数据 |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| Bosunman 博尚 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Brother 兄弟 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Citizen 西铁城 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Delta 台达 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Dmg Mori 德玛吉森精机 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Fagor 法格 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Fanuc 发那科 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Gsk 广州数控 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Haas 哈斯 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-n" title="不支持">✗</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-n" title="不支持">✗</span> |
| Heidenhain 海德汉 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Hnc 华中数控 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Jingdiao 精雕 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Kede 科德 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Knd 凯恩帝 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Lnc 宝元 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-n" title="不支持">✗</span> |
| Lynuc 铼钠克 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Mazak 马扎克 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Makino 牧野 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Mitsubishi 三菱 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Muratec 村田 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Okuma 大隈 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-n" title="不支持">✗</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-n" title="不支持">✗</span> |
| Rexroth 力士乐 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-n" title="不支持">✗</span> |
| Siemens 西门子 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |
| Syntec 新代 | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> | <span class="sup-y" title="支持">✓</span> |

其中：

- **基础数据**：产量，警报，状态，模式，刀号，程序信息，程序段等。
- **轴数据**：进给值，进给倍率，主轴转速，主轴倍率，坐标值，主轴负载，伺服轴负载等。
- **OEE 监控**：运行时间、调机时间、待机时间、急停时间、关机时间、开动率等。
- **数据处理**：支持通过 MQTT、MODBUS、HTTP 协议转发；支持数据库写入。
