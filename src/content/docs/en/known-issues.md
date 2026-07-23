---
title: "8. Known Issues"
---

## 8.1. The LAN Port IP Address Shown on the Gateway's Network Page Does Not Match the Actual Setting {#lan-ip-mismatch}

Prior to version 1.12.2.0, if a LAN port was not connected the gateway could not determine that port's address and assigned it a temporary one instead. This does not affect normal operation: once the port has a working connection again, the actual IP address is displayed.

## 8.2. A Brief Power Trip Causes the Gateway to Fail to Restart Automatically {#power-flap}

If power is restored within 15 seconds of a momentary trip, the gateway may fail to restart automatically, in which case you have to start it manually by pressing the gateway's power button. To avoid frequent power interruptions, install the gateway where the supply is stable, and fit it with a UPS if possible.

## 8.3. The Gateway Is Connected to Several Networks and One Is Restricted, So It Cannot Reach the Internet {#multi-network}

When the gateway has a wired network, a WiFi network and an external USB LAN adapter connected at the same time, and all of them can reach the internet, the gateway uses whichever network connected first. If that network is restricted and can only reach a limited set of external hosts, internet access fails even though the other networks are unrestricted.

The correct way to connect to the internet is to disconnect every network first, connect the gateway to the unrestricted network, and only then connect the others. For example, suppose LAN1 is connected to the company intranet (behind a firewall) and an external USB LAN adapter is used to reach the internet for remote assistance. To get remote assistance working, unplug the LAN1 cable, plug in the external adapter, wait until the remote assistance connection is established, and then plug the LAN1 cable back in.

## 8.4. LAN1 and LAN2 on the Same Subnet Cause a Subnet Conflict and Communication Failure {#lan-segment-conflict}

If the gateway's LAN1 and LAN2 ports are on the same subnet, the resulting subnet conflict can cause communication failures. Do not put LAN1 and LAN2 on the same subnet.
