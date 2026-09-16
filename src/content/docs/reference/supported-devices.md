---
title: "4.5. 支持设备"
---

本节列出网关当前版本支持接入的设备类型、系统与型号。<span class="sup-y" title="已支持">✓</span> 表示已支持，可以直接配置使用；<span class="sup-d" title="开发中">◐</span> 表示开发中，即网关所用的通讯库已覆盖该设备的通讯协议，但接入工作尚未完成，如需使用请与厂家确认排期。

机台类型与系统型号在[3.3.1.1. 常规设置](/usage/machines/#general-settings)中选择，选项与下表一致。

各系统型号对具体数据读写接口与程序传输接口的支持情况，逐个接口列在《通讯协议》1.4. 接口支持说明中。

## 4.5.1. 数控机床 {#cnc}

<!-- support:devices type=CNC -->
<div class="support-devices">

| 系统 | 型号 | 状态 |
| --- | --- | :---: |
| Bosunman 博尚 | BSK系列串口转网口，BSK系列网口，DF系列串口转网口，DF系列网口 | <span class="sup-y" title="已支持">✓</span> |
| Brother 兄弟 | TC系列，S系列，A00系列串口转网口 | <span class="sup-y" title="已支持">✓</span> |
| Citizen 西铁城 | Mitsubishi 三菱 | <span class="sup-y" title="已支持">✓</span> |
| Delta 台达 | 通用型 | <span class="sup-y" title="已支持">✓</span> |
| Dmg Mori 德马吉森精机 | 730BM，840D，OPC UA | <span class="sup-y" title="已支持">✓</span> |
| Fagor 法格 | 8035M，8035T，8040M，8040T，8055M，8055T，8060L，8060M，8060T，8065M，8065T，8070L，8070M，8070T | <span class="sup-y" title="已支持">✓</span> |
| Fanuc 发那科 | 0i-B，0i-C，15i，16i，16i-W，18i，18i-W，21i，Power Mate i-D，Power Mate i-H，0i-D，0i-F，30i，31i，32i，35i，Power Motion i-A | <span class="sup-y" title="已支持">✓</span> |
| Gsk 广州数控 | 980，988，25i，以太网，串口转网口，986 V4.15 | <span class="sup-y" title="已支持">✓</span> |
| Haas 哈斯 | 通用型，串口，MT-CONNECT | <span class="sup-y" title="已支持">✓</span> |
| Heidenhain 海德汉 | TNC640，TNC640 DNC，iTNC530 DNC | <span class="sup-y" title="已支持">✓</span> |
| Hnc 华中数控 | 1.26.02，1.24 | <span class="sup-y" title="已支持">✓</span> |
| IO 外接模块 | 研华 ADAM-6000，有人 IO424T | <span class="sup-y" title="已支持">✓</span> |
| Jingdiao 北京精雕 | JD50 | <span class="sup-y" title="已支持">✓</span> |
| Kede 科德 | GNC62 | <span class="sup-y" title="已支持">✓</span> |
| Knd 凯恩帝 | V4.3.00b，V5.1.00c | <span class="sup-y" title="已支持">✓</span> |
| Lanhao 蓝昊 | 通用型 | <span class="sup-y" title="已支持">✓</span> |
| Lnc 宝元 | 通用型 | <span class="sup-y" title="已支持">✓</span> |
| Lynuc 铼钠克 | 通用型 | <span class="sup-y" title="已支持">✓</span> |
| Makino 牧野 | 通用型 | <span class="sup-y" title="已支持">✓</span> |
| Mazak 马扎克 | MT-CONNECT，640，Matrix，Smart，Smooth | <span class="sup-y" title="已支持">✓</span> |
| Mitsubishi 三菱 | C64，M70/M700 L系列，M70/M700 M系列，M80/M800 L系列，M80/M800 M系列 | <span class="sup-y" title="已支持">✓</span> |
| Okuma 大隈 | P200L，P200M，P300L，P300M，P300S(LP)，P300S(MP) | <span class="sup-y" title="已支持">✓</span> |
| Rexroth 力士乐 | OPC UA | <span class="sup-y" title="已支持">✓</span> |
| Siemens 西门子 | 802D，808D，828D，840D sl，ONE，OPC UA，810D(winXP)，810D(winNT)，840D(winXP)，840D(winNT) | <span class="sup-y" title="已支持">✓</span> |
| Syntec 新代 | 通用型 | <span class="sup-y" title="已支持">✓</span> |
| 模拟机台 | 通用型 | <span class="sup-y" title="已支持">✓</span> |

</div>
<!-- /support -->

## 4.5.2. 激光焊接机 {#laser}

<!-- support:devices type=Laser -->
<div class="support-devices">

| 系统 | 型号 | 状态 |
| --- | --- | :---: |
| Hans 大族 | 通用型，OPC UA | <span class="sup-y" title="已支持">✓</span> |
| 模拟机台 | 通用型 | <span class="sup-y" title="已支持">✓</span> |

</div>
<!-- /support -->

## 4.5.3. 机器人 {#robot}

<!-- support:devices type=Robot -->
<div class="support-devices">

| 系统 | 型号 | 状态 |
| --- | --- | :---: |
| ABB | RobotWare 6.0 | <span class="sup-y" title="已支持">✓</span> |
| Fanuc 发那科 | 通用型 | <span class="sup-y" title="已支持">✓</span> |
| Knd 凯恩帝 | 通用型 | <span class="sup-y" title="已支持">✓</span> |
| Kuka 库卡 | 机侧代理 | <span class="sup-y" title="已支持">✓</span> |
| 模拟机台 | 通用型 | <span class="sup-y" title="已支持">✓</span> |
| Efort 埃夫特 | ER7BC10 | <span class="sup-d" title="开发中">◐</span> |
| Estun 埃斯顿 | 通用型 | <span class="sup-d" title="开发中">◐</span> |
| Hyundai 现代 | 通用型 | <span class="sup-d" title="开发中">◐</span> |
| Yamaha 雅马哈 | RCX | <span class="sup-d" title="开发中">◐</span> |
| Yaskawa 安川 | YRC1000，YRC 高速以太网 | <span class="sup-d" title="开发中">◐</span> |

</div>
<!-- /support -->

## 4.5.4. PLC 与其它设备 {#plc}

<!-- support:devices type=PLC -->
<div class="support-devices">

| 系统 | 型号 | 状态 |
| --- | --- | :---: |
| 标准协议 | Modbus TCP，Modbus RTU，Modbus ASCII over TCP，Modbus RTU over TCP，OPC UA | <span class="sup-y" title="已支持">✓</span> |
| IO 外接模块 | 研华 ADAM-6000，有人 IO424T | <span class="sup-y" title="已支持">✓</span> |
| Jingtuo 劲拓 | JTE-800 | <span class="sup-y" title="已支持">✓</span> |
| Zhenhuaxing 振华兴 | VCTA-Z5ML | <span class="sup-y" title="已支持">✓</span> |
| Allen-Bradley 罗克韦尔 | 1756，1769，1783，Micro800系列，SLC系列，其它 | <span class="sup-y" title="已支持">✓</span> |
| Delta 台达 | AS系列，DVP系列 | <span class="sup-y" title="已支持">✓</span> |
| Keyence 基恩士 | KV700，KV300，KV Nano系列，其它 | <span class="sup-y" title="已支持">✓</span> |
| Melsec 三菱 | Q系列，L系列，以太网模块QJ71E71，以太网模块QJ71EIP71，A系列，R系列，FX2N系列，FX3G系列，FX3S系列，FX3U系列，FX5U系列，其它 | <span class="sup-y" title="已支持">✓</span> |
| Omron 欧姆龙 | NJ系列，NX系列，NY系列，其它 | <span class="sup-y" title="已支持">✓</span> |
| Panasonic 松下 | 通用型 | <span class="sup-y" title="已支持">✓</span> |
| Simatic 西门子 | S7-200，S7-200 Smart，S7-300，S7-400，S7-1200，S7-1500，其它 | <span class="sup-y" title="已支持">✓</span> |
| Yongwei 咏为 | General，通用协议转以太网 | <span class="sup-y" title="已支持">✓</span> |
| 模拟机台 | 通用型 | <span class="sup-y" title="已支持">✓</span> |
| Beckhoff 倍福 | ADS（TwinCAT2，TwinCAT3） | <span class="sup-d" title="开发中">◐</span> |
| Cimon 西蒙 | 所有型号 | <span class="sup-d" title="开发中">◐</span> |
| Fatek 永宏 | 编程口协议（串口，串口转网口） | <span class="sup-d" title="开发中">◐</span> |
| Fuji 富士 | SPB，SPH | <span class="sup-d" title="开发中">◐</span> |
| GE 通用电气 | SRTP | <span class="sup-d" title="开发中">◐</span> |
| Inovance 汇川 | AM400，AM400_800，AC800，H3U，XP，H5U，Easy 系列 | <span class="sup-d" title="开发中">◐</span> |
| LSIS LS 产电 | XGB（Cnet，CPU，Fast Enet） | <span class="sup-d" title="开发中">◐</span> |
| MegMeet 麦格米特 | MC80，MC100，MC200，MC200E，MC280 | <span class="sup-d" title="开发中">◐</span> |
| Toyopuc 丰田工机 | 计算机链接（2PORT-EFR 模块） | <span class="sup-d" title="开发中">◐</span> |
| Vigor 丰炜 | VS 系列 | <span class="sup-d" title="开发中">◐</span> |
| Xinje 信捷 | XC，XD，XL 系列 | <span class="sup-d" title="开发中">◐</span> |
| Yaskawa 安川 | Memobus | <span class="sup-d" title="开发中">◐</span> |
| Yokogawa 横河 | Link | <span class="sup-d" title="开发中">◐</span> |

</div>
<!-- /support -->

## 4.5.5. 补充说明 {#notes}

- **同一品牌的不同型号，可采集的数据并不相同。** 例如 Fagor 法格［8060，8065，8070 系列］不支持程序传输与刀具数据，而［8035，8040，8055 系列］支持。选型前请按具体型号核对《通讯协议》1.4. 接口支持说明。
- **部分系统由其它系统的控制器改制。** Citizen 西铁城使用 Mitsubishi 三菱控制器，Makino 牧野与 Dmg Mori 德马吉森精机［840D］分别使用 Fanuc 发那科与 Siemens 西门子控制器，可采集的数据与对应的原系统一致。
- **IO 外接模块**列在数控机床与 PLC 下，用于本身不提供通讯接口的机台：由外接 IO 模块采集信号灯、启动信号等数字量，再由网关换算成机台状态。
- **模拟机台**（Mock）不连接真实设备，用于在没有机台的情况下验证网关配置与上层系统对接，详见《通讯协议》七、模拟机台测试。
- 能否采集还取决于机台的选项功能是否开通（如 Fanuc 发那科的 DNC 权限、Heidenhain 海德汉的 Option 18）、网络与端口设置是否正确，以及网关许可证是否包含相应任务，详见 [3.3.1.2. 任务设置](/usage/machines/#task-settings)。
