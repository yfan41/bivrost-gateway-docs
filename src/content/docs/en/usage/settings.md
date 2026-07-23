---
title: "5.12. Settings"
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 5
---

The Settings page is where you configure and maintain the gateway's advanced functions: user permissions, license updates, software upgrades, API security, time and region settings, and so on.

When you sign in with an administrator account (for example the initial `admin` account), the Settings page shows the following cards from top to bottom: **Gateway** (Gateway Alias, Version, License), **Security**, **Options**, **Time And Region Setup**, **Backup & Restore** and **Users & Access**.

![Settings page](/img/manual/en/settings/settings-page.png)

When you sign in with a standard user account, only the **Change Password** and **Language** items in the account menu at the top right are available.

The instructions below describe the interface as seen by an administrator. Unless stated otherwise, a setting can only be changed while signed in as an administrator.

## 5.12.1. Common Functions {#function-buttons}

### 5.12.1.1. Change Password {#change-password}

Click the **Account** button at the top right of the page to open the account menu, choose **Change Password**, enter your current password to verify your identity, then enter the new password and click Confirm to apply the change. Once the change is confirmed, you must use the new password the next time you sign in. This function is available to administrators and standard users alike.

![Change Password](/img/manual/en/settings/change-password-dialog.png)

### 5.12.1.2. Change Gateway Alias {#change-gateway-name}

In the "Gateway" card, click the **Edit** button to the right of the Gateway Alias to open a dialog where you can change it. The alias is also the gateway's domain name, which is used both to reach the gateway and for MQTT communication (see [5.6.3. MQTT Settings](/en/usage/communication/#mqtt)). The default alias is iotgw. If you reach the gateway by domain name, use the new domain name to sign in after changing the alias.

![Change Gateway Alias](/img/manual/en/settings/change-gateway-name-dialog.png)

### 5.12.1.3. Manage Users {#manage-users}

The "Users & Access" card lets you add, edit and delete gateway users, and edit their permissions.

![Users & Access](/img/manual/en/settings/manage-users-dialog.png)

#### 5.12.1.3.1. Add User {#add-user}

Click the **Add User** button on the card to create a new user.

![Add User](/img/manual/en/settings/add-user-dialog.png)

In the dialog that opens, set the username, choose whether the user is an administrator, and assign permissions. A new user's initial password is the same as the username. There are two user types: administrator and standard user. An administrator has full access to every page and setting on the gateway. A standard user can only open the pages granted to them; tick those pages in the permissions box. Click Confirm when you are done.

![Selecting user permissions](/img/manual/en/settings/user-permissions.png)

#### 5.12.1.3.2. User Security Settings {#user-security}

In the management dialog, click the shield button 🛡 in the action column of a user's row to open the User Security Settings dialog, where you can set a Secret Key and Authorized APIs. User security settings only take effect once the [Security Control](#security-control) option is enabled.

![User Security Settings](/img/manual/en/settings/user-security-dialog.png)

The **Secret Key** authenticates a user by key when calling an API; see *Communication Protocol*, 2.3.2. Secret Key. The key must start with "sk-". Click the **Generate Secret Key** button 🔄 to the right of the Secret Key field to generate a random key.

**Authorized APIs** specifies which interfaces the user may call; see [6.2.7. Protected API and Authorized APIs](/en/reference/command-format/#protected-api) for how to set them.

:::note[Note]
Protected APIs take precedence over authorized APIs: if an authorized API is also a protected API, the user cannot call it.

:::

Click Confirm to save your changes.

#### 5.12.1.3.3. Edit User {#edit-user}

In the management dialog, click the edit button ✏️ in the action column of a user's row to change the username, administrator status and page permissions. Click Confirm to apply the change.

![Edit User](/img/manual/en/settings/edit-user-dialog.png)

#### 5.12.1.3.4. Delete User {#delete-user}

In the Manage Users dialog, click the delete button 🗑 in the action column of a user's row and confirm to delete the user.

![Delete User](/img/manual/en/settings/delete-user-dialog.png)

### 5.12.1.4. Backup & Restore {#more}

The "Backup & Restore" card provides two functions: Backup Config and Restore Config.

![Backup & Restore](/img/manual/en/settings/more-dialog.png)

**Backup Config** backs up the gateway's current configuration file. Click the **Backup** button to download it.

**Restore Config** restores the gateway configuration from a backup file. Click the **Restore Config…** button and upload a gateway configuration backup file to restore the configuration. This operation cannot be undone.

## 5.12.2. Options {#advanced-options}

The "Gateway" card provides the Upload License and Upgrade Gateway functions; the "Options" card contains the Local Caching, Remote Assistance and LAN2 Settings switches; the "Security" card contains the Security Control option.

![Options](/img/manual/en/settings/advanced-options.png)

### 5.12.2.1. Upload License {#upload-license}

**Upload License…** in the "Gateway" card uploads a new license file (.lic) to change the license type, raise the license count and so on. If you need to do this, contact support with the gateway UID (see [5.2.3. Gateway Details](/en/usage/home/#gateway-details)) and the license type and count you want. Once you have received the new license file on your computer, click the **Upload License…** button, select the license file in the dialog that opens, and click **Open** to upload it. When the upload finishes, click **Restart Service** on the Home page (see [5.2.1. Function Buttons](/en/usage/home/#function-buttons)) for it to take effect. After restarting the service and refreshing the Home page, check that "License Type", "License Count" and "License Status" under Gateway Details match what you expect; contact support if anything looks wrong.

### 5.12.2.2. Upgrade Gateway {#upgrade-gateway}

**Upgrade Gateway…** in the "Gateway" card uploads an upgrade package (.bpkg) to update the gateway software.

The procedure is similar to "Upload License": contact support to obtain the upgrade package, save it on your computer, then click the **Upgrade Gateway…** button to upload it. An upload progress dialog appears — please wait a moment. Once the package has uploaded successfully, a confirmation dialog appears; click **Confirm** to start the upgrade. Wait about 10 seconds, then refresh the Home page and check the gateway version under Gateway Details.


### 5.12.2.3. Local Caching {#local-cache}

The "Local Caching" switch turns local caching on or off; it is on by default. Local caching stores recently collected data and run logs on the gateway so that it can serve historical data and the statistics derived from it, such as machine status statistics and count records for a past period. Data is kept locally for at most 365 days. Turning local caching off disables some gateway functions, so we recommend leaving it on. If you change this switch, click **Restart Service** on the Home page for it to take effect.

### 5.12.2.4. Remote Assistance {#remote-assist}

The "Remote Assistance" switch turns remote assistance on or off; it is on by default. When it is on, support staff can reach the gateway over the internet. You can turn this option off for normal operation; if you need remote assistance, contact support first, then turn the option back on once the gateway is connected to the internet. Changes to this switch take effect immediately — no **Restart Service** is needed.

### 5.12.2.5. LAN2 Settings {#lan2-settings}

The "LAN2 Settings" switch shows or hides the LAN2 settings on the **Network** page; it is off by default. With the switch on, you can change the LAN2 settings on the **Network** page, following the same steps used for LAN1 in [5.7.1. Wired Network](/en/usage/network/#wired).

:::note[Note]
Turning the "LAN2 Settings" switch off after changing the LAN2 settings does not reset them.

:::

### 5.12.2.6. Security Control {#security-control}

The "Security Control" switch turns API access control on or off; it is on by default. With the switch on, you can edit the protected APIs.

![Security Control](/img/manual/en/settings/security-control.png)

"Protected API" lists the APIs that may not be called. By default, Write Offset Data and Write PLC Data are blocked: writing incorrect data through either interface can cause injury, death or equipment damage, so only use them once you have confirmed it is safe to do so. To change the list, see [6.2.7. Protected API and Authorized APIs](/en/reference/command-format/#protected-api), then click **Apply**.

After changing "Security Control" or "Protected API", click **Restart Service** on the Home page for the change to take effect.

## 5.12.3. Time And Region Setup {#time-region}

"Time And Region Setup" covers Local Time, Switch Language, Time Server Address and Time Zone.

![Time And Region Setup](/img/manual/en/settings/time-region.png)

### 5.12.3.1. Local Time {#local-time}

"Local Time" shows the gateway's current time.

### 5.12.3.2. Switch Language {#switch-language}

"Switch Language" switches the gateway's web interface between Chinese and English. It does the same thing as the language selector at the top right of the sign-in page and the **Language** item in the account menu.

### 5.12.3.3. Time Server Address {#time-server}

"Time Server Address" takes the addresses of the servers used for time synchronization (separate multiple addresses with ";"). The default is `ntp1.aliyun.com;ntp2.aliyun.com;ntp3.aliyun.com;ntp4.aliyun.com;`, the Alibaba Cloud public time servers, which require an internet connection. Click the **Sync** button on the right to synchronize the time: the gateway starts with the first address and moves on to the next one if it fails, stopping as soon as one succeeds. The current time server address is saved only if synchronization succeeds.

### 5.12.3.4. Time Zone {#timezone}

"Time Zone" selects the time zone the gateway is in. The default is "China Standard Time", i.e. Beijing time. Click the **Apply** button to save.
