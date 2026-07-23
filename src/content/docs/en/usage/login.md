---
title: "5.1. Signing In"
---

You can connect a computer to the gateway in any of the following ways:

1. Connect the computer's LAN port directly to the gateway's LAN1 port, or to LAN1 through a switch, then set the computer's IP address to an address on the same subnet as the gateway's LAN1 port, with the same subnet mask.
2. Connect the computer's LAN port directly to the gateway's LAN2 port, or to LAN2 through a switch, then set the computer to obtain its IP address automatically.
3. Connect the computer and the gateway to the same wireless network. You must first use method (1) or (2) to connect, sign in and configure the gateway's WiFi connection.

Once connected, you can sign in to the gateway management page in either of the following two ways:

## Method 1: Signing In by Domain Name {#login-by-name}

In the address bar of the computer's browser (Chrome recommended), enter the following address:

```
http://iotgw.local
```

Press Enter to open the gateway management login page. The initial account and password are both admin. Click **Login**. You can switch the interface language in the top-right corner.

![Login page (domain name)](/img/manual/en/login/login-page.png)

If sign-in fails, disconnect any other devices so that the computer is connected to only one gateway, check the network cabling, and try again.

On some early gateway models, if `iotgw` does not work, replace `iotgw` with BIV-[first part of the gateway UID]. The gateway UID is printed on the label on the bottom of the gateway. For example, if the gateway UID is "152KUCG-1TOSJH4-1WXYSON-JY531Q", the first part of the UID is "152KUCG", so the address to enter in the browser is:

```
http://BIV-152KUCG.local
```

## Method 2: Signing In by IP Address {#login-by-ip}

Alternatively, in the address bar of the computer's browser (Chrome recommended), enter the gateway's IP address (the initial LAN1 IP is 192.168.100.1) and press Enter to open the login page. The initial account and password are both admin. Click **Login**. You can switch the interface language in the top-right corner.

:::note[Note]
After changing the LAN1 IP address (see [5.7.1. Wired Network](/en/usage/network/#wired)), sign in using the new IP address. If you are connected through the LAN2 port or over WiFi, use the corresponding IP address.

:::
