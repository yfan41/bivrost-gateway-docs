---
title: "5.7. Network"
---

The **Network** page is split into two parts: "Interfaces" (LAN1, LAN2 and the wireless adapter) and "Services" (Static Routing Settings, Remote Access Settings). Click an interface card to expand its settings.

![Network page](/img/manual/en/network/network-page.png)

## 5.7.1. Wired Network {#wired}

The "Wired Network" section shows the current connection status of the LAN1 port. "Connected" means the LAN adapter has detected a device at the other end of the cable; it does not guarantee that the device can be pinged. You can change the Connection Type of the gateway's LAN1 port, setting the IP Assignment Mode to DHCP (obtained automatically) or Static (entered manually). LAN1 is normally set to Static, in which case you can edit the IP Address, Subnet Mask, Default Gateway and DNS server settings. The default gateway and DNS server only need to be changed when the company network is restricted; otherwise leave them at their defaults. When you are done, click **Save** to apply the settings.

:::note[Note]
The settings take effect as soon as you click **Save** — no service restart is required. If you were connecting to the gateway on its LAN1 IP address, you must use the new IP address after changing it.

:::

![LAN1 Settings](/img/manual/en/network/lan1-settings.png)

Once the LAN2 Settings option has been enabled under [Settings](/en/usage/settings/), LAN2 Settings appears below LAN1 Settings and you can change the Connection Type of the LAN2 port; see [5.12. Settings](/en/usage/settings/) for details.

## 5.7.2. WiFi Settings {#wireless}

The gateway is fitted with a wireless adapter and can connect to a WiFi network (models on which the wireless adapter is unavailable do not show this section).

While WiFi is disconnected, click the "WiFi Name" field to scan automatically for nearby networks. You can type a name to narrow the list, then click the network you want to join. For a hidden network, type the full WiFi name manually.


Enter the "WiFi Password" and click **Connect**. If the connection succeeds, the "Status" field shows "Connected: [WiFi name][signal strength]" and the **Connect** button changes to **Disconnect**. Unless you click **Disconnect**, the gateway reconnects automatically whenever it detects that network again. Clicking **Disconnect** drops the current network and stops the gateway from reconnecting to it automatically.


Once connected, click **Configure** to open the "WiFi Settings" dialog. As in [5.7.1. Wired Network](#wired), you can change the WiFi IP Address, Subnet Mask and other settings.


## 5.7.3. Static Routing Settings {#static-routing}

You can add static routes here. The route format is:

```
IP network address 1,subnet mask 1,gateway IP address 1;IP network address 2,subnet mask 2,gateway IP address 2;
```

Separate multiple routes with `;`.

![Static Routing Settings](/img/manual/en/network/static-routing.png)

## 5.7.4. Remote Access Settings {#remote-access}

Once remote access is configured, connecting to a remote server provides the following:

1. Remote access to the gateway from outside the local network.
2. Bridging of the LAN1 or LAN2 network, so that debugging software can connect to a machine remotely for commissioning.

Checking the remote access configuration takes a while; the status reads "Detecting" while it runs, as shown below.


This feature is not enabled by default and shows the message below. Contact customer support if you need it enabled.

![Remote access not enabled](/img/manual/en/network/remote-not-enabled.png)

Once the feature has been enabled, the status is "Disconnected" until it is configured for the first time, as shown below.


Click **Configure** and set up the remote server in the configuration dialog: enter the server address, password and bridge target, then click Confirm. After changing the configuration, you must reconnect to the remote server for it to take effect.


Click the **Connect** button; the gateway starts connecting to the remote server.


Once connected, the gateway connects to the remote server automatically the next time it comes online, as shown below. Click the **Disconnect** button to drop the connection to the remote server immediately and stop it from reconnecting automatically next time.
