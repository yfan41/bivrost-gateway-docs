---
title: "5.11. Monitor"
---

The Monitor page shows machine and group status in real time. At the top of the page are device counts summarised by status (Device Total, Run, Manual, Wait, Emergency, Off, Alarm), each of which can be clicked to filter. Below it are the Machine List (Machine Name, System, Status, Alarm Status) and the Group List.

![Monitor page](/img/manual/en/monitor/monitor-page.png)

The layout adapts to the screen size: the Machine List and the Group List may be arranged side by side instead of one above the other.

## 5.11.1. Machine Monitor {#machine-monitor}

Click a machine row in the Machine List to open the Machine Monitor page, which shows the machine's live data (Main Program, Sub-program, current Alarm Level, Current Tool No, spindle load, feedrate, Feedrate Override, spindle speed, Spindle Override and so on) together with the Count, Availability, status statistics and Alarm History for the last 24 hours.

The ‹ button in the top-left corner returns to the Monitor home page.

![Machine Monitor](/img/manual/en/monitor/machine-monitor.png)

## 5.11.2. Group Monitor (Group Overview) {#group-monitor}

Click a group row in the Group List to open the Group Monitor page, which presents the group's live data as an Andon wall (Availability, the number of machines in each status, a status tile for every machine, alarm severity and time, and so on) along with the availability and status trend charts. For groups with a large amount of data, the trend charts take a moment to load.

The ‹ button in the top-left corner returns to the Monitor home page.

![Group Monitor](/img/manual/en/monitor/group-monitor.png)

:::note[Note]
The Availability shown on the page is the cumulative availability over the monitoring period (see [5.5.3. OEE Monitoring Settings](/en/usage/tasks/#oee-monitor)). The availability plotted in the availability trend chart is calculated per bucket, using 5-minute buckets within the trend time window.

:::
