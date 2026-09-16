---
title: "4.5. Supported Devices"
---

This section lists the device types, systems and models the current gateway version can connect to. <span class="sup-y" title="Supported">✓</span> means supported and ready to configure; <span class="sup-d" title="In development">◐</span> means in development — the protocol is covered by the communication library the gateway uses, but the integration is unfinished, so ask the vendor about the schedule before relying on it.

The machine type, system and model are chosen in [3.3.1.1. General Settings](/en/usage/machines/#general-settings); the options there match the tables below.

Which data and file-transfer interfaces each system and model supports is listed interface by interface in *Communication Protocol* 1.4. Interface Support.

## 4.5.1. CNC Machine Tools {#cnc}

<!-- support:devices type=CNC -->
<div class="support-devices">

| System | Models | State |
| --- | --- | :---: |
| Bosunman | BSK Series Serial over Ethernet, BSK Series Ethernet, DF Series Serial over Ethernet, DF Series Ethernet | <span class="sup-y" title="Supported">✓</span> |
| Brother | TC Series, S Series, A00 Series Serial over Ethernet | <span class="sup-y" title="Supported">✓</span> |
| Citizen | Mitsubishi | <span class="sup-y" title="Supported">✓</span> |
| Delta | General | <span class="sup-y" title="Supported">✓</span> |
| Dmg Mori | 730BM, 840D, OPC UA | <span class="sup-y" title="Supported">✓</span> |
| Fagor | 8035M, 8035T, 8040M, 8040T, 8055M, 8055T, 8060L, 8060M, 8060T, 8065M, 8065T, 8070L, 8070M, 8070T | <span class="sup-y" title="Supported">✓</span> |
| Fanuc | 0i-B, 0i-C, 15i, 16i, 16i-W, 18i, 18i-W, 21i, Power Mate i-D, Power Mate i-H, 0i-D, 0i-F, 30i, 31i, 32i, 35i, Power Motion i-A | <span class="sup-y" title="Supported">✓</span> |
| Gsk | 980, 988, 25i, Ethernet, Serial over Ethernet, 986 V4.15 | <span class="sup-y" title="Supported">✓</span> |
| Haas | General, Serial, MT-CONNECT | <span class="sup-y" title="Supported">✓</span> |
| Heidenhain | TNC640, TNC640 DNC, iTNC530 DNC | <span class="sup-y" title="Supported">✓</span> |
| Hnc | 1.26.02, 1.24 | <span class="sup-y" title="Supported">✓</span> |
| IO Module | ADVANTECH ADAM-6000, USR IO424T | <span class="sup-y" title="Supported">✓</span> |
| Jingdiao | JD50 | <span class="sup-y" title="Supported">✓</span> |
| Kede | GNC62 | <span class="sup-y" title="Supported">✓</span> |
| Knd | V4.3.00b, V5.1.00c | <span class="sup-y" title="Supported">✓</span> |
| Lanhao | General | <span class="sup-y" title="Supported">✓</span> |
| Lnc | General | <span class="sup-y" title="Supported">✓</span> |
| Lynuc | General | <span class="sup-y" title="Supported">✓</span> |
| Makino | General | <span class="sup-y" title="Supported">✓</span> |
| Mazak | MT-CONNECT, 640, Matrix, Smart, Smooth | <span class="sup-y" title="Supported">✓</span> |
| Mitsubishi | C64, M70/M700 L Series, M70/M700 M Series, M80/M800 L Series, M80/M800 M Series | <span class="sup-y" title="Supported">✓</span> |
| Okuma | P200L, P200M, P300L, P300M, P300S(LP), P300S(MP) | <span class="sup-y" title="Supported">✓</span> |
| Rexroth | OPC UA | <span class="sup-y" title="Supported">✓</span> |
| Siemens | 802D, 808D, 828D, 840D sl, ONE, OPC UA, 810D(winXP), 810D(winNT), 840D(winXP), 840D(winNT) | <span class="sup-y" title="Supported">✓</span> |
| Syntec | General | <span class="sup-y" title="Supported">✓</span> |
| Mock | General | <span class="sup-y" title="Supported">✓</span> |

</div>
<!-- /support -->

## 4.5.2. Laser Welders {#laser}

<!-- support:devices type=Laser -->
<div class="support-devices">

| System | Models | State |
| --- | --- | :---: |
| Hans | General, OPC UA | <span class="sup-y" title="Supported">✓</span> |
| Mock | General | <span class="sup-y" title="Supported">✓</span> |

</div>
<!-- /support -->

## 4.5.3. Robots {#robot}

<!-- support:devices type=Robot -->
<div class="support-devices">

| System | Models | State |
| --- | --- | :---: |
| ABB | RobotWare 6.0 | <span class="sup-y" title="Supported">✓</span> |
| Fanuc | General | <span class="sup-y" title="Supported">✓</span> |
| Knd | General | <span class="sup-y" title="Supported">✓</span> |
| Kuka | Controller-Side Proxy | <span class="sup-y" title="Supported">✓</span> |
| Mock | General | <span class="sup-y" title="Supported">✓</span> |
| Efort | ER7BC10 | <span class="sup-d" title="In development">◐</span> |
| Estun | General | <span class="sup-d" title="In development">◐</span> |
| Hyundai | General | <span class="sup-d" title="In development">◐</span> |
| Yamaha | RCX | <span class="sup-d" title="In development">◐</span> |
| Yaskawa | YRC1000, YRC High-speed Ethernet | <span class="sup-d" title="In development">◐</span> |

</div>
<!-- /support -->

## 4.5.4. PLCs and Other Devices {#plc}

<!-- support:devices type=PLC -->
<div class="support-devices">

| System | Models | State |
| --- | --- | :---: |
| Standard Protocols | Modbus TCP, Modbus RTU, Modbus ASCII over TCP, Modbus RTU over TCP, OPC UA | <span class="sup-y" title="Supported">✓</span> |
| IO Module | ADVANTECH ADAM-6000, USR IO424T | <span class="sup-y" title="Supported">✓</span> |
| Jingtuo | JTE-800 | <span class="sup-y" title="Supported">✓</span> |
| Zhenhuaxing | VCTA-Z5ML | <span class="sup-y" title="Supported">✓</span> |
| Allen-Bradley | 1756, 1769, 1783, Micro800 Series, SLC Series, Others | <span class="sup-y" title="Supported">✓</span> |
| Delta | AS Series, DVP Series | <span class="sup-y" title="Supported">✓</span> |
| Keyence | KV700, KV300, KV Nano Series, Others | <span class="sup-y" title="Supported">✓</span> |
| Melsec | Q Series, L Series, Ethernet Module QJ71E71, Ethernet Module QJ71EIP71, A Series, R Series, FX2N Series, FX3G Series, FX3S Series, FX3U Series, FX5U Series, Others | <span class="sup-y" title="Supported">✓</span> |
| Omron | NJ Series, NX Series, NY Series, Others | <span class="sup-y" title="Supported">✓</span> |
| Panasonic | General | <span class="sup-y" title="Supported">✓</span> |
| Simatic | S7-200, S7-200 Smart, S7-300, S7-400, S7-1200, S7-1500, Others | <span class="sup-y" title="Supported">✓</span> |
| Yongwei | General, General over TCP | <span class="sup-y" title="Supported">✓</span> |
| Mock | General | <span class="sup-y" title="Supported">✓</span> |
| Beckhoff | ADS (TwinCAT2, TwinCAT3) | <span class="sup-d" title="In development">◐</span> |
| Cimon | All models | <span class="sup-d" title="In development">◐</span> |
| Fatek | Programming port (serial, serial over Ethernet) | <span class="sup-d" title="In development">◐</span> |
| Fuji | SPB, SPH | <span class="sup-d" title="In development">◐</span> |
| GE | SRTP | <span class="sup-d" title="In development">◐</span> |
| Inovance | AM400, AM400_800, AC800, H3U, XP, H5U, Easy Series | <span class="sup-d" title="In development">◐</span> |
| LSIS | XGB (Cnet, CPU, Fast Enet) | <span class="sup-d" title="In development">◐</span> |
| MegMeet | MC80, MC100, MC200, MC200E, MC280 | <span class="sup-d" title="In development">◐</span> |
| Toyopuc | Computer Link (2PORT-EFR module) | <span class="sup-d" title="In development">◐</span> |
| Vigor | VS Series | <span class="sup-d" title="In development">◐</span> |
| Xinje | XC, XD, XL Series | <span class="sup-d" title="In development">◐</span> |
| Yaskawa | Memobus | <span class="sup-d" title="In development">◐</span> |
| Yokogawa | Link | <span class="sup-d" title="In development">◐</span> |

</div>
<!-- /support -->

## 4.5.5. Notes {#notes}

- **Models of the same brand do not collect the same data.** Fagor [8060, 8065, 8070 Series], for example, supports neither file transfer nor tool data, while [8035, 8040, 8055 Series] supports both. Check the exact model against *Communication Protocol* 1.4. Interface Support before choosing a system.
- **Some systems are rebadged controls.** Citizen uses a Mitsubishi control, and Makino and Dmg Mori [840D] use Fanuc and Siemens controls respectively, so they collect the same data as the underlying system.
- **IO Module** appears under both CNC machine tools and PLCs, for machines that offer no communication interface at all: an external IO module samples signal lamps, cycle-start signals and similar digital inputs, and the gateway derives machine status from them.
- **Mock** connects to no real device. It exists so gateway configuration and upstream integration can be verified without a machine — see *Communication Protocol* 7. Mock Machine Testing.
- Whether data can actually be collected also depends on the optional functions enabled on the machine (Fanuc DNC permission, Heidenhain Option 18 and the like), on correct network and port settings, and on the tasks included in the gateway licence — see [3.3.1.2. Task Settings](/en/usage/machines/#task-settings).
