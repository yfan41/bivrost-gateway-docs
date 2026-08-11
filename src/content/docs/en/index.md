---
title: "1. Introduction"
hero:
  title: Bivrost IoT Gateway
  tagline: Data acquisition and machining program transfer for CNC machine tools, laser welders, robots and PLCs
  actions:
    - text: "Get started: Networking"
      link: networking/
      icon: rocket
    - text: Sign in to the gateway
      link: usage/login/
      variant: minimal
      icon: right-arrow
---

**Bivrost IoT Gateway Manual** · Shenzhen Bivrost Technology Co., Ltd. · Tel: 18824672282

<div class="home-grid not-content">
  <a class="home-card" href="networking/">
    <span class="home-card-title">Networking</span>
    <span class="home-card-desc">Wiring, network setup and requirements</span>
  </a>
  <a class="home-card" href="usage/login/">
    <span class="home-card-title">Using the Gateway</span>
    <span class="home-card-desc">Signing in and the admin pages</span>
  </a>
  <a class="home-card" href="usage/file-transfer/">
    <span class="home-card-title">File Transfer</span>
    <span class="home-card-desc">Uploading and sending machining programs</span>
  </a>
  <a class="home-card" href="reference/command-format/">
    <span class="home-card-title">Command Format</span>
    <span class="home-card-desc">Software API and command reference</span>
  </a>
  <a class="home-card" href="faq/">
    <span class="home-card-title">FAQ</span>
    <span class="home-card-desc">Troubleshooting and answers</span>
  </a>
  <a class="home-card" href="changelog/">
    <span class="home-card-title">Changelog</span>
    <span class="home-card-desc">What changed in each release</span>
  </a>
</div>

The Bivrost IoT Gateway provides data acquisition and machining program transfer for CNC machine tools, laser welders, robots, PLCs and similar equipment. A single gateway can collect from and manage up to 255 devices of different models. It supports all major machine tool controls, exposes a comprehensive software API, is flexible to configure and works out of the box. It reconnects automatically after a dropped link, resumes interrupted transfers, polls multiple machines in parallel from one unit, collects data at millisecond resolution, and forwards data over a range of protocols.

The current version can collect data from the following CNC machine tool brands:

| System [Model] | Basic Data | Axis Data | OEE Monitoring | PLC Data | DNC | Tool Data |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| Bosunman | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Brother | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Citizen | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Delta | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Dmg Mori | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Fagor | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Fanuc | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Gsk | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Haas | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-n" title="Not supported">✗</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-n" title="Not supported">✗</span> |
| Heidenhain | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Hnc | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Jingdiao | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Kede | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Knd | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Lnc | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-n" title="Not supported">✗</span> |
| Lynuc | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Mazak | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Makino | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Mitsubishi | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Muratec | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Okuma | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-n" title="Not supported">✗</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-n" title="Not supported">✗</span> |
| Rexroth | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-n" title="Not supported">✗</span> |
| Siemens | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |
| Syntec | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> | <span class="sup-y" title="Supported">✓</span> |

Where:

- **Basic Data**: Count, Alarm, Status, Mode, Tool No., Program Info, Program Block, and so on.
- **Axis Data**: Actual Feedrate, Feedrate Override, Spindle speed, Spindle Override, Position, Spindle Load, Servo Axis Load, and so on.
- **OEE Monitoring**: Autorun Time, Manual Time, Wait Time, Emergency Time, Off Time, Availability, and so on.
- **Data Handling**: Forwarding over the MQTT, MODBUS and HTTP protocols; writing to a database.
