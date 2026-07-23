---
title: "7. FAQ"
---

## 7.1. Cannot Open the Gateway Management Page {#cannot-open}

Use an Ethernet cable to connect the gateway's LAN1 or LAN2 port to the LAN port of your computer, either directly or through a switch.

Check the computer's network settings. Its IP address must be on the same subnet as the gateway's port, and the subnet mask must be identical. The gateway's LAN1 port defaults to IP address 192.168.100.1 with subnet mask 255.255.0.0; the LAN2 port obtains both its IP address and its subnet mask automatically. If LAN1's IP address and subnet mask have been changed and you no longer remember the current values, connect through LAN2 instead.

Check whether the gateway's power LED is lit steadily and whether the network port LED is blinking. If the power LED is off, the gateway is not powered on. If the port LED is not blinking, check both ends of the Ethernet cable and make sure the computer and the gateway are properly connected.

If the power LED is on and the port LEDs at both ends are blinking, a network connection between the computer and the gateway has been detected. Open the gateway management page on the computer. If it does not open, enter one of the following commands in the computer's command prompt, depending on the operating system:

```
ping IOTGW -4       (Windows)
ping IOTGW.local    (Linux or Mac)
```

:::note[Note]
On some early gateway models, if IOTGW does not work, replace IOTGW with BIV-[first part of the gateway UID]. The gateway UID is printed on the label on the bottom of the gateway. For example, if the gateway UID is "152KUCG-1TOSJH4-1WXYSON-JY531Q", the first part of the UID is "152KUCG", so on a Windows computer the command is:

```
ping BIV-152KUCG -4
```

:::

If the ping succeeds and the reply shows the IP address of the gateway's current port, communication between the computer and the gateway is working. If the gateway management page still will not open, contact customer support.

If the ping fails, disconnect all other devices, make sure the computer is connected to a single gateway only, and run the command again.

If the command now succeeds, either the gateway or the computer had an IP address conflict with a device that has since been disconnected from the LAN. Change the conflicting IP address.

If the ping fails again, there is a network fault between the computer and the gateway, usually caused by the network port or the cable.

## 7.2. The Gateway Page Is Blank or Incomplete in the Browser {#blank-page}

The browser you are using does not support the page framework. Use Google Chrome, Microsoft Edge or Apple Safari. If none of these is available, download and install the latest version of Chrome.

## 7.3. Changing the Gateway's LAN1 IP Address {#change-lan1-ip}

Open the gateway management page and click **Network** in the navigation bar. LAN1's IP address can be changed in the network settings; see [5.7.1. Wired Network](/en/usage/network/#wired).

## 7.4. Finding the Gateway's Current LAN2 IP Address {#get-lan2-ip}

Use an Ethernet cable to connect the gateway's LAN2 port to the LAN port of your computer, either directly or through a switch. Follow [7.1. Cannot Open the Gateway Management Page](#cannot-open) and run the command to obtain the address of the gateway port you are connected to.

:::note[Note]
LAN2 obtains its IP address automatically by default, so the address may differ every time you connect through LAN2.

:::

## 7.5. Recovering the LAN1 IP Address {#recover-lan1-ip}

Use an Ethernet cable to connect the gateway's LAN2 port to the LAN port of your computer, either directly or through a switch. Sign in from the computer using the domain name (see [5.1. Signing In](/en/usage/login/)); alternatively, find LAN2's current IP address first (see [7.4. Finding the Gateway's Current LAN2 IP Address](#get-lan2-ip)) and sign in with that IP address.

Go to **Network** and change the LAN1 address (see [5.7.1. Wired Network](/en/usage/network/#wired)).

## 7.6. Resetting the Gateway's LAN1 Settings {#reset-lan1}

Gateway software version 1.5.6.8 and later supports resetting LAN1. Rename any USB flash drive that is not a system boot disk (used for installing the operating system) to "resetlan1" (case does not matter) and plug it into any USB port on the gateway. After the gateway is shut down and restarted, LAN1's IP address and subnet mask are automatically reset to the factory settings: IP address 192.168.100.1, subnet mask 255.255.0.0. Remove the USB drive once the reset is complete, otherwise the reset will run again on the next restart.

## 7.7. Cannot Read Machine Data from API Test {#api-test-failure}

If you cannot read data from the target machine on the **API Test** page, follow the returned error code and its remedy. The main API Test error codes are listed below.

**Error Code: 3, Machine off or offline**

Remedy: Unable to communicate with the machine. Please check: 1. the machine is turned on; 2. the machine and the gateway are on the same subnet of the same LAN; 3. the machine's network is properly set ①; 4. the gateway is properly configured ②; 5. network hardware such as ports, cables and switches is working correctly.

**Error Code: 102, Machine network error, unable to read data**

Remedy: Please ensure the machine's communication service is started. Check whether another device on the LAN conflicts with this machine's IP address ③, and try changing the machine's IP address.

**Error Code: 10003, machineID does not exist**

Remedy: The machineID is wrong, the corresponding machine is not activated, or the gateway service was not restarted after the machine's IP address or activation status was edited.

**Error Code: 10006, API not authorized**

Remedy: Contact Bivrost if you need to use an unauthorized API.

The remaining error codes are described in *Communication Protocol*, section 2.2. Error Handling. If the error code does not let you resolve the problem, contact customer support for remote assistance; see [7.10. Getting Remote Assistance](#remote-assist).

:::note[Note]
① On machines with certain control systems, setting the IP address is not enough: you also have to enable the communication options, configure the firewall and so on before data can be collected. On some models, after the IP address is set, the machine must be powered off for 3 seconds and then powered on again for the setting to take effect. See *Machine Setup*.

② On machines with certain control systems, besides setting the system model and the IP address on the gateway, you also have to set a user name and password. See *Machine Setup*. When you are finished, you must click **Restart Service** on the home page.

③ A machine IP conflict usually means the IP address configured on the machine is already used by another device on the same LAN. Some devices cannot be pinged because of their firewall settings, so their IP addresses are often mistaken for unused ones. In this case, change the machine's IP address to one that is currently free and power-cycle the machine; at the same time, change the machine's IP address to the new one on the gateway's **Machines** page, click **Restart Service**, and run the collection test again.

The other form of address conflict is a subnet conflict. This is common when the acquisition network and another internal network are connected to the same switch and both use the same subnet. When this happens, move either the conflicting internal devices or the gateway and machines to a subnet that is not in use.

To keep IP conflicts from recurring, see [7.11. The Gateway or a Machine Has an IP Conflict with Another Device on the LAN](#ip-conflict).

:::

## 7.8. Cannot Get Automatically Collected Machine Data over MODBUS, MQTT or a Database {#no-machine-data}

On the gateway's **API Test** page, check whether the machine's common data can be read; see [5.8. API Test](/en/usage/api-test/).

If it cannot, follow [7.7. Cannot Read Machine Data from API Test](#api-test-failure).

If API Test does return machine data, open the **Machines** page, then the "Edit Machine" dialog and its "Task" tab, and check whether the machine's automatic collection tasks are enabled; see [5.3.1.2. Task Settings](/en/usage/machines/#task-settings). Task results are only uploaded automatically over the protocols once the corresponding automatic collection tasks are enabled.

Check the settings for the protocol you are using on the gateway's **Communication** page; see [5.6. Communication](/en/usage/communication/).

Once all of the gateway settings above are confirmed, click **Restart Service** on the gateway's home page.

If the automatically collected data still does not arrive over MODBUS, MQTT or the database, check the settings of the receiving system and the network connection between it and the gateway.

## 7.9. Cannot Get Automatically Collected Group Data over MODBUS, MQTT or a Database {#no-group-data}

First confirm that the target group has been added successfully on the gateway's **Groups** page and is activated; see [5.4. Groups](/en/usage/groups/).

Check the group's settings in the "Edit Group" dialog on the gateway's **Groups** page, and make sure the group contains at least one machine; see [5.4.2. Editing a Group](/en/usage/groups/#edit-group).

In the "Group Task Settings" dialog for that group on the gateway's **Groups** page, check whether the automatic collection tasks are enabled; see [5.4.1.2. Group Task Settings](/en/usage/groups/#group-tasks). Task results are only uploaded automatically over the protocols once automatic collection is enabled.

On the gateway's **API Test** page, check whether the common data of the machines in the group can be read; see [5.8. API Test](/en/usage/api-test/). If it cannot, follow [7.7. Cannot Read Machine Data from API Test](#api-test-failure).

Once everything is confirmed, click **Restart Service** on the gateway's home page and run the collection test again.

## 7.10. Getting Remote Assistance {#remote-assist}

Scan the QR code on the cover to contact customer support and describe the problem; support will assign an engineer to work with you.

Once remote assistance has been agreed, connect the gateway's LAN2 port to the internet (if LAN2's settings have been changed, make sure the current settings still allow internet access), or connect the gateway to the internet over WiFi (see [5.7.2. WiFi Settings](/en/usage/network/#wireless)). Then sign in, open **Home**, confirm that "Network" under "Gateway Status" reads "Connected" and that the "Remote Assistance" switch in the "Settings" dialog is turned on, and notify the engineer you are working with.

## 7.11. The Gateway or a Machine Has an IP Conflict with Another Device on the LAN {#ip-conflict}

An IP address or a whole subnet already being in use is a common problem when connecting the gateway or a machine to a network. It can be resolved as follows:

1. Put the gateway and the machines on their own router, isolated from other devices.
2. When connecting, make sure the gateway and the machines do not use an IP address or subnet mask that is already taken.
3. In the router's management page, bind the static IP addresses of the gateway and the machines to their MAC addresses so that those IP addresses are not handed out to other devices automatically.

If IP addresses cannot be bound to MAC addresses, apply either of the following settings in the router's management page:

1. Disable the router's DHCP server so that IP addresses are no longer assigned automatically and devices can only be connected with manually configured addresses.
2. Restrict the router's DHCP address pool so that it does not overlap the addresses configured on the gateway and the machines.

For the router settings themselves, refer to the router's own manual.

## 7.12. The DNC Page Can List, Receive, Send and Delete Files but the Matching API Calls Fail {#url-encoding}

The path or file name contains unsafe characters such as special symbols or spaces, which must be converted to URL encoding. For example, the path `TNC:\nc_prog` becomes `TNC%3A%5Cnc_prog`, and `Sinumerik/FileSystem/Part Program` becomes `Sinumerik/FileSystem/Part%20Program`. Most browsers and test tools apply URL encoding automatically, but some software still requires you to convert the path by hand when calling the API.
