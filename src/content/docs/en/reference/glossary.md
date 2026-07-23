---
title: "6.1. Glossary"
---

## 6.1.1. Machine OEE Data {#machine-oee}

Machine OEE (Overall Equipment Efficiency) data includes figures such as the machine's Off time, Wait time, Emergency time, Autorun time and Manual time, as well as its Availability.

Take machine autorun time as an example: it is the time the machine spent in automatic operation during the monitoring window. The monitoring window is set under "Monitor Mode" in [5.5.3. OEE Monitoring Settings](/en/usage/tasks/#oee-monitor).

```
Machine Availability = Autorun Time / Total Time
```

Here, Autorun Time is the machine's autorun time and Total Time is the monitoring window.

OEE data requires local caching, so turn on the "Local Caching" switch under [5.12. Settings](/en/usage/settings/#local-cache) - Options.

## 6.1.2. Group OEE Data {#group-oee}

Group OEE data includes figures such as the group's Off time, Wait time, Emergency time, Autorun time and Manual time, as well as its Availability.

Take group autorun time as an example: it is the sum of the time the group's activated machines spent in automatic operation during the monitoring window. The monitoring window is set under "Monitor Mode" in [5.5.3. OEE Monitoring Settings](/en/usage/tasks/#oee-monitor).

```
Group Availability = Autorun Time / Total Time
```

Here, Autorun Time is the group's autorun time and Total Time is the total monitoring window, that is, the monitoring window multiplied by the number of activated machines in the group.

OEE data requires local caching, so turn on the "Local Caching" switch under [5.12. Settings](/en/usage/settings/#local-cache) - Options.

## 6.1.3. Group Part Count {#group-count}

The group part count is the group's cumulative part count. It is calculated as follows:

```
Group Part Count = (Machine 1 Cumulative Part Count - Machine 1 Initial Value) * Machine 1 Count Multiplier
                 + (Machine 2 Cumulative Part Count - Machine 2 Initial Value) * Machine 2 Count Multiplier
                 + ...
```

The initial value is that machine's cumulative part count the first time the group part count was collected after the machine joined the group. The group part count is stored on the gateway and bound to the group number, and is never reset.

The group part count requires local caching, so turn on the "Local Caching" switch under [5.12. Settings](/en/usage/settings/#local-cache) - Options.
