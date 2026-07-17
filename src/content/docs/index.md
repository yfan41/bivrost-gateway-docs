---
title: "一、简介"
---

**彼络物联网关 说明书 · 版本：v1.19.6** · 深圳市彼络科技有限公司 · 联系电话：18824672282

彼络物联网关为数控机床，激光焊接机，机器人，PLC 等设备提供数据采集与加工程序传送服务。用户可以通过一台网关采集管理最多 255 台不同型号的设备。网关适配各大机床系统，提供全面软件接口，配置灵活，即插即用，支持断线重连，断点续传，支持一带多并行采集，支持毫秒级数据采集，支持多种协议转发数据。

当前版本支持采集以下品牌 CNC 机床数据：

| 系统型号 | 基础数据 | 轴数据 | OEE 监控 | PLC 数据 | 程序传输 | 刀具数据 |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| Bosunman 博尚 | O | O | O | O | O | O |
| Brother 兄弟 | O | O | O | O | O | O |
| Citizen 西铁城 | O | O | O | O | O | O |
| Delta 台达 | O | O | O | O | O | O |
| Dmg Mori 德玛吉森精机 | O | O | O | O | O | O |
| Fagor 法格 | O | O | O | O | O | O |
| Fanuc 发那科 | O | O | O | O | O | O |
| Gsk 广州数控 | O | O | O | O | O | O |
| Haas 哈斯 | O | O | O | X | O | X |
| Heidenhain 海德汉 | O | O | O | O | O | O |
| Hnc 华中数控 | O | O | O | O | O | O |
| Jingdiao 精雕 | O | O | O | O | O | O |
| Kede 科德 | O | O | O | O | O | O |
| Knd 凯恩帝 | O | O | O | O | O | O |
| Lnc 宝元 | O | O | O | O | O | X |
| Lynuc 铼钠克 | O | O | O | O | O | O |
| Mazak 马扎克 | O | O | O | O | O | O |
| Makino 牧野 | O | O | O | O | O | O |
| Mitsubishi 三菱 | O | O | O | O | O | O |
| Muratec 村田 | O | O | O | O | O | O |
| Okuma 大隈 | O | O | O | X | O | X |
| Rexroth 力士乐 | O | O | O | O | O | X |
| Siemens 西门子 | O | O | O | O | O | O |
| Syntec 新代 | O | O | O | O | O | O |

其中：

- **基础数据**：产量，警报，状态，模式，刀号，程序信息，程序段等。
- **轴数据**：进给值，进给倍率，主轴转速，主轴倍率，坐标值，主轴负载，伺服轴负载等。
- **OEE 监控**：运行时间、调机时间、待机时间、急停时间、关机时间、开动率等。
- **数据处理**：支持通过 MQTT、MODBUS、HTTP 协议转发；支持数据库写入。
