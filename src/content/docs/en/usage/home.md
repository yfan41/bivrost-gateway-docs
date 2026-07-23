---
title: "5.2. Home"
---

After you sign in, the gateway opens the **Home** page. The navigation bar at the top contains a **Home** link and four menus: **Configurations** (Machines/Group/Task/Communication), **Diagnosis** (API Test/Network Tools/Logger), **App** (DNC/Analysis/Monitor) and **System** (Network/Settings). The **Account** menu is in the top right corner. The page content is shown below the bar.

![Home](/img/manual/en/home/home-page.png)

## 5.2.1. Function Buttons {#function-buttons}

The function buttons are in the top right corner of the "Gateway Status" panel on the Home page: **Restart Service** and **Gateway Shutdown/Restart**. After you change any configuration, the navigation bar also shows the prompt "Configuration changed. Restart the service for changes to take effect." — click it to restart the service.

The **Restart Service** button restarts the gateway service. After you change configuration parameters — on the **Machines**, **Groups**, **Communication** or **Tasks** pages, for example — you must click **Restart Service** for the changes to take effect. Clicking **Restart Service** opens the restart dialog; after about 5~10 seconds it reports that the service has restarted, and you can click **Confirm** to close it.

![Restart Service](/img/manual/en/home/restart-service.png)

The **Gateway Shutdown/Restart** button powers the gateway hardware down or restarts it.

![Gateway Shutdown/Restart](/img/manual/en/home/shutdown-dialog.png)

Click **Shutdown** to power the gateway hardware down safely. Wait until the gateway's power LED goes out before unplugging the power cable.

Click **Restart** to restart the gateway hardware. The restart takes about a minute.

## 5.2.2. Gateway Status {#gateway-status}

"Gateway Status" shows the gateway's main operating status. At the top is a summary of machine connections (the number of machines that are connected, offline or in connection error):

![Machine connection status](/img/manual/en/home/status-chips.png)

The "Data Pipeline" card shows the status of the Cloud, MQTT, Database, MODBUS and Local Caching services; the "System Resources" card shows CPU, Memory and Disk usage. All statuses refresh automatically every 5 seconds.

![Data Pipeline](/img/manual/en/home/status-cards.png)

The individual entries under Gateway Status are described below:

| Name | Description | Status |
| --- | --- | --- |
| Network | Whether the gateway is currently connected to the internet | Connected: connected to the internet<br />Disconnected: not connected to the internet |
| Cloud | Connection between the gateway and the cloud platform | Running: the Cloud service is on (see [5.6.1. Cloud Settings](/en/usage/communication/#cloud)), correctly configured, and connected to the server<br />Off: the Cloud service is off<br />Delayed: an upload did not complete in time, for example because of network latency<br />Other statuses: the Cloud service has failed |
| MQTT | Connection between the gateway and the MQTT server | Running: the MQTT service is on (see [5.6.3. MQTT Settings](/en/usage/communication/#mqtt)), correctly configured, and connected to the server<br />Off: the MQTT service is off<br />Delayed: an upload did not complete in time, for example because of network latency<br />Other statuses: the MQTT service has failed |
| Database | Connection between the gateway and the database | Running: the Database service is on (see [5.6.4. Database Settings](/en/usage/communication/#database)), correctly configured, and connected to the server<br />Off: the Database service is off<br />Delayed: an upload did not complete in time, for example because of network latency<br />Other statuses: the Database service has failed |
| MODBUS | Status of the gateway's local MODBUS service | Running: the MODBUS service is on (see [5.6.2. MODBUS Settings](/en/usage/communication/#modbus)), correctly configured, and the local server is running normally<br />Off: the MODBUS service is off<br />Delayed: an upload did not complete in time, for example because of network latency<br />Other statuses: the MODBUS service has failed |
| Local Caching | Whether local caching is on or off | Running: local caching is on<br />Off: local caching is off |
| Machine Connections - Connected | Number of machines connected successfully | 0~255 |
| Machine Connections - Offline | Number of machines offline | 0~255 |
| Machine Connections - Error | Number of machines with a connection error | 0~255 |

For Cloud, MQTT, Database and MODBUS, the other statuses include "Initiated", "Waiting for Connection" and "Error". "Initiated" means the gateway has initialised the service but cannot proceed any further, because of a configuration error or a break in the network. "Waiting for Connection" means no reply has been received from the target server, which may indicate a network fault or a server fault. "Error" means a fault occurred at some stage.

## 5.2.3. Gateway Details {#gateway-details}

The **UID** under "Gateway Details" is the device's unique identifier. You need to give it to support when you request help or upgrade your license.

- **Expiration** is the date on which the collection license expires.
- **License Count** is the number of collection licenses configured on the gateway, that is, how many machines the gateway may collect from at the same time.
- **License Type** is the type of collection license. Contact support to find out which features each type provides.
- **License Status** shows whether the current license is valid. "Invalid" means the license has not been assigned, or has expired.
- **Version** is the software version currently running on the gateway.

![Gateway Details](/img/manual/en/home/gateway-details.png)

In the screenshot above, the gateway's license type is "Full". The available interfaces include Basic Data (Status, Count, Alarm, current program name, Current Program Block and so on), Axis Data (Position, Feed and Spindle, Load), Cycle Data, OEE Monitoring, PLC Data, tool offset read/write and DNC. The gateway can collect from up to 255 machines at the same time, and the license expires on 31 December 2999. The current license status is valid. The gateway software version in the screenshot is 1.19.4.19.
