---
title: "1. Introduction"
---

**Bivrost IoT Gateway Manual · Version: v1.19.7** · Shenzhen Bivrost Technology Co., Ltd. · Tel: 18824672282

The Bivrost IoT Gateway provides data acquisition and machining program transfer for CNC machine tools, laser welders, robots, PLCs and similar equipment. A single gateway can collect from and manage up to 255 devices of different models. It supports all major machine tool controls, exposes a comprehensive software API, is flexible to configure and works out of the box. It reconnects automatically after a dropped link, resumes interrupted transfers, polls multiple machines in parallel from one unit, collects data at millisecond resolution, and forwards data over a range of protocols.

The current version can collect data from the following CNC machine tool brands:

| System [Model] | Basic Data | Axis Data | OEE Monitoring | PLC Data | DNC | Tool Data |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| Bosunman | O | O | O | O | O | O |
| Brother | O | O | O | O | O | O |
| Citizen | O | O | O | O | O | O |
| Delta | O | O | O | O | O | O |
| Dmg Mori | O | O | O | O | O | O |
| Fagor | O | O | O | O | O | O |
| Fanuc | O | O | O | O | O | O |
| Gsk | O | O | O | O | O | O |
| Haas | O | O | O | X | O | X |
| Heidenhain | O | O | O | O | O | O |
| Hnc | O | O | O | O | O | O |
| Jingdiao | O | O | O | O | O | O |
| Kede | O | O | O | O | O | O |
| Knd | O | O | O | O | O | O |
| Lnc | O | O | O | O | O | X |
| Lynuc | O | O | O | O | O | O |
| Mazak | O | O | O | O | O | O |
| Makino | O | O | O | O | O | O |
| Mitsubishi | O | O | O | O | O | O |
| Muratec | O | O | O | O | O | O |
| Okuma | O | O | O | X | O | X |
| Rexroth | O | O | O | O | O | X |
| Siemens | O | O | O | O | O | O |
| Syntec | O | O | O | O | O | O |

Where:

- **Basic Data**: Count, Alarm, Status, Mode, Tool No., Program Info, Program Block, and so on.
- **Axis Data**: Actual Feedrate, Feedrate Override, Spindle speed, Spindle Override, Position, Spindle Load, Servo Axis Load, and so on.
- **OEE Monitoring**: Autorun Time, Manual Time, Wait Time, Emergency Time, Off Time, Availability, and so on.
- **Data Handling**: Forwarding over the MQTT, MODBUS and HTTP protocols; writing to a database.
