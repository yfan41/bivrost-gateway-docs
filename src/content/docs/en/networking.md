---
title: "4. Networking"
---

## 4.1. Gateway Network {#gateway-network}

The Bivrost IoT Gateway has two wired Ethernet ports, LAN1 and LAN2, plus a built-in wireless adapter.

**LAN1** is dedicated to the data-acquisition network. Its default IP address is 192.168.100.1 and its default subnet mask is 255.255.0.0. If several gateways share the same internal network, change the gateway network settings so that no two static IP addresses collide (see [5.7.1. Wired Network](/en/usage/network/#wired)). To collect machine data, connect LAN1 directly to the Ethernet port of a CNC machine with a network cable for one-to-one acquisition, or connect LAN1 and the CNC machines through a switch or similar device so that they share one acquisition network for parallel acquisition.

**LAN2** is the external communication port. If you need to upload data to the cloud or to receive remote assistance, contact Bivrost first, then connect LAN2 to the external network.

The **wireless adapter** can join a WiFi network (see [5.7.2. WiFi Settings](/en/usage/network/#wireless)) and serves the same purpose as LAN2. It is especially useful when testing in a plant that has no network in place: connect the gateway to a phone hotspot and remote assistance becomes much easier to arrange.

## 4.2. Networking Steps {#network-steps}

A typical customer network architecture is shown below. Machines of all kinds connect to the gateway over Ethernet, serial over Ethernet, WiFi, a 4G/5G network or other links. Servers running applications such as MES connect to the gateway and read data and issue commands over HTTP, MODBUS, MQTT, a database or other channels.

![Typical customer network architecture](/img/manual/en/networking/topology.png)

1. Connect the gateway to the CNC machines, switches, servers and other equipment (see [4.1. Gateway Network](#gateway-network)).
2. Configure the network settings on the CNC machines (see *Bivrost IoT Gateway — Machine Setup*, referred to below as *Machine Setup*).
3. Start the gateway, sign in, configure it, add the CNC machines and restart the gateway service (see [5.1. Signing In](/en/usage/login/) through [5.7. Network](/en/usage/network/)).
4. Check that the gateway is receiving machine data (see [5.8. API Test](/en/usage/api-test/)).
5. Following the communication protocol documentation (see *Bivrost IoT Gateway — Communication Protocol*, referred to below as *Communication Protocol*), debug your server-side program and confirm that it receives data from the gateway. If no physical machine is available, choose the **Mock** machine type when adding a machine so you can test communication between the gateway and the server (see [5.3.1. Adding a Machine](/en/usage/machines/#add-machine)).
6. If you need data storage, analysis or dashboard displays, configure them on the Bivrost cloud platform (see *Bivrost Cloud Platform — User Manual*, referred to below as *Cloud Platform Manual*).

To ensure acquisition quality, we recommend shielded Cat 5e or Cat 6 cabling and gigabit network equipment. If a CNC machine has to connect over a wireless network, fit it with a wireless module or a 4G/5G module.
