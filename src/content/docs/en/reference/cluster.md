---
title: "4.3. Cluster Failover (Optional)"
---

Cluster failover is an optional gateway feature that shortens the collection outage caused by a whole-host gateway failure (power loss, hardware fault, system crash). All gateways under the same cloud platform share one pool of standby hosts: when any gateway fails as a whole, the cloud platform assigns an idle standby to take it over and run under that gateway's identity. Once the original gateway is repaired, comes back online and stays stable, the system switches back automatically and the standby returns to the pool. The standby may sit at a different site, which makes this an off-site disaster-recovery setup.

:::note[Note]
This feature requires the gateway to be connected to the Bivrost cloud platform. With no standby pool configured, a gateway behaves exactly as in a normal deployment.
:::

## 4.3.1. How It Works {#overview}

- **Shared standby pool**: a standby is not tied to one gateway. It is registered in the cloud platform's standby pool and stands by for every gateway under that cloud platform (N+1).
- **Takeover means switching identity**: a standby does not collect while idle. When it receives a takeover command it imports the failed gateway's configuration snapshot (machines, groups, tasks, communication settings and user accounts, plus that gateway's cloud identity) and restarts under that gateway's identity. The data source on the cloud platform and its dashboards follows the standby automatically — nothing upstream needs to be reconfigured.
- **One takeover at a time**: a standby covers only one gateway at any moment. If every standby is busy when another gateway fails, the cloud platform only records an event and pushes an alarm; it does not switch. As soon as a standby is released it automatically takes over the gateway that is still down. Register several standbys in the pool to cover more simultaneous failures.
- **Switchover time**: about 15 seconds (14–17 seconds measured) from the moment the gateway goes silent to the standby serving requests under that gateway's identity with its collection engine started. Reconnecting each machine tool afterwards depends on how many machines there are and is not counted in that figure.

## 4.3.2. Prerequisites {#prerequisites}

1. The gateways must already be connected to the Bivrost cloud platform. The cloud platform is both the liveness arbiter and the channel used for configuration replication and takeover assignment.
2. A standby is a complete gateway host, with the same hardware and software specification as the gateways it protects.
3. The standby and the protected gateways should run the same software version. A takeover still works across versions, but it records a version-mismatch event; only run that way during a rolling-upgrade window.
4. The standby needs a licence bound to its own hardware, see [3.12.2.1. Upload License](/en/usage/settings/#upload-license).
5. **Every gateway under the cloud platform is protected by default** — there is nothing to configure per gateway. Older gateways (which report neither heartbeats nor configuration snapshots) are not protected and are greyed out on the cluster admin page.

## 4.3.3. Building the Standby Pool {#setup}

The pool is configured on the cloud platform's **Gateway Cluster** admin page. Contact Bivrost for the page address and the admin key.

1. Install the gateways as usual and connect them to the cloud platform.
2. Install each standby the way you install an **ordinary gateway**, and note its UID (see [3.2.3. Gateway Details](/en/usage/home/#gateway-details)).
3. Open the gateway cluster admin page on the cloud platform and enter the admin key.
4. Under "Standby Pool", click **Generate** to obtain the **pool token**, click **+ Standby** to add each standby (UID and name), set the **stability window** (300 seconds by default), then click **Save**.
5. On each standby, enable the cloud platform connection, set the server address to the cloud platform and the AccessToken to the **pool token** generated in the previous step, then restart the service. Once the standby reports a heartbeat it enters the waiting state automatically: collection and cloud upload are suspended, and its own web page becomes read-only and shows a standby banner.
6. Back on the cluster admin page, confirm that the standby shows "Online · Waiting", that each gateway in the protected-gateway table shows "Protected", and that its **snapshot** timestamp refreshes after you change that gateway's configuration — this confirms the replication channel works. Each standby also caches the latest configuration snapshot of every protected gateway locally, for use in the double-fault case.
7. To leave a gateway unprotected, click **Exclude** on its row; click **Protect** to bring it back.

:::caution[Caution]
The pool token is what lets a standby join the pool. Keep it safe, and do not mix it up with a gateway's own AccessToken.
:::

## 4.3.4. Failover and Switch-back {#failover}

| Situation | Behaviour |
| --- | --- |
| Whole-host gateway failure (power loss, network loss, system crash) | After the heartbeat times out (15 seconds) the cloud platform assigns an idle standby. The standby imports that gateway's configuration snapshot, restarts, and comes online under that gateway's identity. |
| The gateway only loses its link to the cloud platform and keeps collecting locally | **No switchover.** The gateway keeps collecting and uploads the backlog once the link is restored. |
| Another gateway fails while every standby is busy | Only an event and an alarm are recorded; no switchover. The gateway that is still down is taken over automatically as soon as a standby is released. |
| The original gateway is repaired and comes back online | It is first put into read-only mode with collection stopped (to prevent dual collection). Once it has been online continuously for the **stability window**, the system switches back: the standby releases the identity and restarts back into the pool, and the original gateway pulls the latest configuration snapshot from the cloud platform (including changes made while it was covered) before resuming. |
| You need to postpone the switch-back (site maintenance still in progress) | Click **Hold** on that row of the cluster admin page. The original gateway will not switch back automatically even once stable; click **Resume auto switch-back** to cancel. |
| You need to switch back immediately | Click **Switch back now** (available only while the original gateway is online). |

:::caution[Caution]
An off-site standby usually cannot reach the machine tools on the shop floor. In that case it only serves configuration, query and dashboard functions and collects no data, which is expected.
:::

## 4.3.5. On-screen Notices {#web-ui}

The cluster state is shown as a banner at the top of the gateway management page:

| Banner | Meaning |
| --- | --- |
| This host is a shared standby, waiting in the pool (read-only) | This host is an idle standby in the pool and is not covering any gateway. |
| This shared standby is currently serving gateway *&lt;name&gt;* | This host is a standby currently running under that gateway's identity. |
| This gateway is covered by a standby (read-only); it switches back automatically once stable | This host is the original gateway. It has just come back online and is waiting out the stability window. |

A host that is waiting in the pool or is currently covered by a standby serves a **read-only** web page: you can sign in to inspect configuration and status, but every write is rejected, so the two hosts cannot conflict with each other.

In addition, when the browser cannot reach the current gateway the page offers the addresses of alternative nodes to jump to. Those addresses have to be configured in the gateway's front-end configuration file beforehand — contact Bivrost to set this up.

## 4.3.6. Double Fault: Forced Takeover {#force-takeover}

If the site loses its link to the cloud platform **and** a gateway suffers a whole-host failure at the same time, the cloud platform cannot judge liveness or assign a standby, so no automatic takeover happens (without an arbiter, the system will not risk dual collection or a split brain). An administrator can take over manually instead:

1. Sign in to the **standby's own** gateway management page with an administrator account.
2. Click **Force takeover** on the standby banner (visible to administrators only).
3. Pick the gateway to take over from the list that appears (the list comes from the configuration snapshots cached on the standby). After you confirm, the standby restarts and runs under that gateway's identity.
4. Once the link to the cloud platform is restored, the cloud platform adopts this takeover automatically and folds it into the normal switch-back flow.

:::caution[Caution]
**Confirm that the target gateway really is down** before forcing a takeover. If that gateway is still collecting, a forced takeover leaves two hosts collecting from the same machines and produces duplicate data.
:::

## 4.3.7. What Is Not Replicated {#not-replicated}

- **Historical and time-series data**: this lives on the cloud platform and is not replicated between hosts. A standby starts collecting from the moment it takes over and does not inherit the locally cached history.
- **The part-program directory** used by DNC (the gateway file server directory, e.g. `E:\dnc`): this is outside the product's replication scope and has to be synchronised at the operations level, for example with a scheduled task on each gateway that mirrors the directory to a share on the standby.
- **The local shop-floor entry point**: on-site users normally reach the gateway by its own IP address, which is unavailable after a whole-host failure. The entry point the product guarantees is the address served by the cloud platform, which always points at whichever host currently carries that gateway. If you need the local address to follow the switchover too, configure DNS or a virtual IP at the network layer.

## 4.3.8. Leaving the Standby Pool {#leave-pool}

After you **remove** a standby from the pool on the cluster admin page, that host stays exactly as it is; it does not turn itself back into an ordinary gateway (its local configuration may still hold some gateway's settings, and enabling it by hand would cause dual collection). To reuse the host as an ordinary gateway, reinstall the gateway software and configure it from scratch.
