---
title: "5.6. Communication"
---

**Communication** covers Cloud Settings, MODBUS Settings, MQTT Settings, Database Settings, Gateway File Server Settings, HTTP Settings, Hub Settings and so on. You can turn on one or more of these communication methods as required.

The left side of the **Communication** page lists the available communication methods (and shows whether each one is enabled); the right side holds the settings for the selected method. Turn on the **Enable** switch in those settings to show all of the fields. After you click **Save**, go back to Home and click **Restart Service** to apply the changes.

![Communication page](/img/manual/en/communication/communication-page.png)

## 5.6.1. Cloud Settings {#cloud}

Click the **Enable** switch to turn on cloud platform communication.

![Cloud Settings](/img/manual/en/communication/cloud-settings.png)

Once cloud communication is enabled, the server settings are complete and the automatic collection tasks of the target machines and groups are switched on (see [5.3.1.2. Task Settings](/en/usage/machines/#task-settings) and [5.4.1.2. Group Task Settings](/en/usage/groups/#group-tasks)), task data is uploaded in real time to the designated standard cloud platform over a standard protocol, where it can be stored, analysed and shown on dashboards. Bivrost runs a standard cloud platform server at tb.bivrost.cn; contact support to arrange a trial (see *Cloud Platform Manual*).

- Enter the cloud platform address in **Broker Address**.
- Enter the token the cloud platform has assigned to the gateway in **Token**.
- With **Enable Broadcasting** on, the gateway broadcasts data through the cloud platform to the other gateways on that platform.
- With **Enable Gateway Linking** on, the gateway receives data broadcast through the cloud platform by the other gateways on that platform. Add the UID and token of each gateway you want to link to under **Gateway Links**, in the following format:

```
UID,token;
```

Separate multiple linked gateways with `;`.

![Enable Gateway Linking](/img/manual/en/communication/cloud-gateway-link.png)

:::note[Note]
When the settings are complete, click **Save**, then go back to Home and click **Restart Service** to apply the changes.

:::

## 5.6.2. MODBUS Settings {#modbus}

Click the **Enable** switch to turn on MODBUS communication.

![MODBUS Settings](/img/manual/en/communication/modbus-settings.png)

Once MODBUS communication is enabled and the automatic collection tasks of the target machines and groups are switched on (see [5.3.1.2. Task Settings](/en/usage/machines/#task-settings) and [5.4.1.2. Group Task Settings](/en/usage/groups/#group-tasks)), the gateway uses the MODBUS protocol to store the task data in the corresponding address registers — see section 3, MODBUS Communication, of the *Communication Protocol*.

- **Byte(4) Order** selects the decoding format used in MODBUS communication for 32-bit data (long integers such as Int32, single-precision Float and any other type that occupies two register addresses). The default is "DCBA".
- **Byte(8) Order** selects the decoding format used in MODBUS communication for 64-bit data (double-precision Double and any other type that occupies four register addresses). The default is "HGFEDCBA".
- **Encoding** selects the string encoding used by the MODBUS protocol. The default is "Chinese (GBK)".
- With **Reverse String** on, the character order of strings is reversed.

:::note[Note]
When the settings are complete, click **Save**, then go back to Home and click **Restart Service** to apply the changes.

:::

## 5.6.3. MQTT Settings {#mqtt}

Turn on the **Enable** switch to start MQTT communication.

![MQTT Settings](/img/manual/en/communication/mqtt-settings.png)

Once MQTT communication is enabled and the automatic collection tasks of the target machines and groups are switched on (see [5.3.1.2. Task Settings](/en/usage/machines/#task-settings) and [5.4.1.2. Group Task Settings](/en/usage/groups/#group-tasks)), the gateway uses the MQTT protocol to convert the task data into JSON messages and publish them to the designated MQTT broker — see section 4, MQTT Communication, of the *Communication Protocol*.

The MQTT settings are: Mode, Broker Address, Port, Client ID, Anonymous, Username, Password, Data Report Topic, RPC Request Topic, RPC Response Topic, Encoding, Array to String and Publish on Value Change.

- **Data Report Topic** is the topic an automatic collection task reports its result on over MQTT. The default is "r".
- **RPC Request Topic** and **RPC Response Topic** are used by the RPC interface. Both are blank by default, which disables the RPC interface. Once they are set, the gateway subscribes to the RPC request topic and publishes the result of each request to the RPC response topic — see 4.2. RPC Interface of the *Communication Protocol*.
- With **Publish on Value Change** on, the automatic collection tasks enabled in the machine task settings and group task settings only upload a result when the collected value has changed.

:::note[Note]
When the settings are complete, click **Save**, then go back to Home and click **Restart Service** to apply the changes.

:::

## 5.6.4. Database Settings {#database}

Turn on the **Enable** switch to start database communication.

![Database Settings](/img/manual/en/communication/database-settings.png)

Once database communication is enabled and the automatic collection tasks of the target machines and groups are switched on (see [5.3.1.2. Task Settings](/en/usage/machines/#task-settings) and [5.4.1.2. Group Task Settings](/en/usage/groups/#group-tasks)), the gateway writes the results of those tasks to the designated database. The database types currently supported are SQL Server, MySQL, PostgreSQL and InfluxDB v2.x. See section 5, Database Communication, of the *Communication Protocol*.

The database settings are: Type, Broker Address, Port, Username, Password, Bucket, Table Prefix, Storage Mode, Data Retention Period (h), Use Local Time, Enable Primary Key, Write on Value Change and so on.

- **Type** is the type of database: SQL Server, MySQL, PostgreSQL, InfluxDB v2.x and so on.
- **Broker Address** is the IP address of the server the database runs on.
- **Port** is the port of the server the database runs on.
- **Username** and **Password** are used to sign in to the database.
- **Bucket** is the name of the database.
- **Table Prefix** adds a prefix in front of the default table names.
- **Storage Mode** offers Log, Real Time, User Defined and so on.
  - **Log** mode: every time the gateway reads data from a machine it writes a matching record to the database. The database keeps the complete history.
  - **Real Time** mode: every time the gateway reads data from a machine it finds the matching record for that machine in the database and updates it with the latest data; no history is kept.
  - The default storage mode is **User Defined**: click the **Settings** button on the right and use the "Database Custom Save Mode Settings" dialog to put each individual task into Log mode or Real Time mode. In the dialog, the left column is **Types (Logging Mode)**, the middle column is **Types (Real Time Mode)** and the right column is **Types (No Action)** (not recorded). Drag an interface with the mouse into the mode you want, or click the left and right arrow buttons to move every interface on one side across to the other. Click anywhere outside the dialog to close it, then click **Save** on the page to store your custom settings. By default Alarm, Machine OEE and Group OEE are in Real Time mode and all other data is in Log mode.

![Database Custom Save Mode Settings](/img/manual/en/communication/database-save-mode.png)

- **Data Retention Period (h)** is how long data is kept in the database, in hours. If it is set to x, the gateway runs a scheduled database cleanup after start-up and automatically deletes data older than x hours. The default is 0, which keeps all data.
- With **Use Local Time** on, data is written using the local time of the time zone set in [5.12. Settings](/en/usage/settings/); otherwise UTC is used.
- **Enable Primary Key** adds a primary key column to every table in the database.
- With **Write on Value Change** on, the automatic collection tasks enabled in the machine task settings and group task settings only write a result when the collected value has changed.

:::note[Note]
When the settings are complete, click **Save**, then go back to Home and click **Restart Service** to apply the changes.

:::

## 5.6.5. Gateway File Server Settings {#file-server}

Turn on the **Enable** switch to start the gateway file server. The gateway file server is a file server created locally on the gateway that machines can reach over FTP or as a shared folder. Once it is running, the File Server Type option in [5.3.1.3. DNC Settings](/en/usage/machines/#transfer-settings) can be set to "Gateway File Server".

![Gateway File Server Settings](/img/manual/en/communication/file-server-settings.png)

The username and password are shared by FTP and the shared folder. Both default to dnc_user. At present only the password can be changed.

Turn on **Enable FTP** to allow the gateway file server to be reached over FTP. The FTP address is:

```
ftp://iotgw or ftp://<gateway-IP>
```

Under the FTP home directory each machine has its own folder, named after the machine's IP address.

Turn on **Enable SMB** to allow the gateway file server to be reached as a shared folder. Each machine has its own shared folder, named after the machine's IP address. The shared folder address is:

```
\\iotgw\<machine-IP> or \\<gateway-IP>\<machine-IP>
```

:::note[Note]
When the settings are complete, click **Save**, then go back to Home and click **Restart Service** to apply the changes.

:::

## 5.6.6. HTTP Settings {#http}

Turn on the **Enable** switch to start the HTTP service.

![HTTP Settings](/img/manual/en/communication/http-settings.png)

With **Enable IP Whitelist** on, the gateway only accepts HTTP interface requests from valid IP addresses on the whitelist. The **Whitelist** can hold several IP addresses, separated by ";".

:::note[Note]
When the settings are complete, click **Save**, then go back to Home and click **Restart Service** to apply the changes.

:::

## 5.6.7. Hub Settings {#hub}

Turn on the **Enable** switch to start the Hub service. A Hub server is used to reach the gateway's interfaces remotely, so that configuration can be changed remotely and gateways on different sites can exchange data. Contact support to have one deployed.

![Hub Settings](/img/manual/en/communication/hub-settings.png)

- Enter the Hub server address in **Broker Address**.
- Enter the token the Hub server has assigned to the gateway in **Token**.
- With **Enable Broadcasting** on, the gateway broadcasts data through the cloud platform to the other gateways on that platform.
- With **Enable Gateway Linking** on, the gateway receives data broadcast by other gateways through the Hub server. Add the UID and token of each gateway you want to link to under **Gateway Links**, in the following format:

```
UID,token;
```

Separate multiple linked gateways with `;`.

![Hub gateway linking](/img/manual/en/communication/hub-gateway-link.png)

:::note[Note]
When the settings are complete, click **Save**, then go back to Home and click **Restart Service** to apply the changes.

:::
