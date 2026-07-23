---
title: "5.4. Groups"
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 5
---

On the **Groups** page you can combine the machines defined on the **Machines** page into groups. The gateway then uses the data collected from each machine to calculate group-level statistics and uploads them as a package.

After changing anything on the **Groups** page, return to the home page and click **Restart Service** for the changes to take effect.

:::note[Note]
Unlike machine activation, activating a group does not consume a license. An activated group is enabled, and its data is uploaded through the cloud platform (see [5.6.1. Cloud Settings](/en/usage/communication/#cloud) for how to set this up), MODBUS, MQTT and a database (see the *Communication Protocol*). A deactivated group stops collecting statistics for that group and stops uploading them. If a group contains a machine that is not activated (see [5.3. Machines](/en/usage/machines/)), no data is collected or included in the statistics for that machine.

:::

![Groups page](/img/manual/en/groups/groups-page.png)

There are three buttons in the top-right corner of the page: Find Group, Refresh and Create Group.

Click the 🔍 Find Group button and type a keyword into the input field to its left; the matching results appear below. The search covers the group number and the group name. Click the close button on the right of the search field to show all groups again.

![Group search](/img/manual/en/groups/groups-search.png)

Click the ↻ Refresh button to refresh the whole group list.

Click the + Create Group button to add a group, as described in [5.4.1. Adding a Group](#add-group).

## 5.4.1. Adding a Group {#add-group}

Click the + Create Group button in the top-right corner. The "Create Group" dialog opens, with four sections from top to bottom: "Identity", "Select Machine(s) for This Group", "Task" and "Advanced".

![Create Group dialog](/img/manual/en/groups/add-group-dialog.png)

### 5.4.1.1. Group General Settings {#group-general}

In the "Identity" section, enter the group number and the group name. The group number must currently be an integer between 1 and 16 inclusive, and must not duplicate an existing group number. You can also activate or deactivate the group: statistics are uploaded only while the group is activated. Deactivating it disables the group, and its statistics are no longer uploaded. If the group contains a machine that is not activated (for machine activation, see [5.3. Machines](/en/usage/machines/)), that machine is not added to the collection list and is neither polled nor included in the statistics.


Click the "Search" box under "Select Machine(s) for This Group" and pick the machines for the group from the machine list. The selected machines are shown as tags, and the number of machines in the group appears in the "Machine Count" column on the **Groups** page.

![Selecting machines for the group](/img/manual/en/groups/group-machine-picker.png)

Each selected machine tag shows the machine IP, the machine name and the count multiplier (for example ×0). Click the × on the right of a tag to remove that machine.

![Machines selected for the group](/img/manual/en/groups/group-machines-selected.png)

Adjusting the count multipliers of the machines in a group lets you define how the group's count is calculated. Click a selected machine tag to edit its count multiplier.

![Editing the count multiplier](/img/manual/en/groups/group-count-multiplier.png)

For example, if machine "OP01" and machine "OP02" form a production line and handle two consecutive operations, the output of the line should be taken from the last operation, "OP02". Set the count multiplier of "OP01" to 0 and that of "OP02" to 1, giving:

```
Group Count = "OP01" Count * 0 + "OP02" Count * 1
```

If the last operation is handled by several machines, set the count multiplier of all of those machines to 1.

If a machine produces several parts per cycle, set its count multiplier to the corresponding number.

By enabling external machines you can add to the group machines that belong to the gateways linked in Cloud Settings or Hub Settings. This requires a command that identifies the gateway and the machine; see [6.2.6. External Machines](/en/reference/command-format/#external-machine).

![Enabling external machines](/img/manual/en/groups/group-external-machines.png)

### 5.4.1.2. Group Task Settings {#group-tasks}

In the "Task" section, configure the group's automatic collection tasks. Tick an available interface to turn on automatic statistics collection and upload for the corresponding group task. The number of enabled tasks appears in the "Task Count" column of the table on the "Groups" page.

Group tasks work in much the same way as machine tasks: their results can be uploaded automatically through the cloud platform, MODBUS, MQTT or a database. To receive group task results, at least one of the cloud platform, MODBUS, MQTT or database communication methods must be enabled and configured in [5.6. Communication](/en/usage/communication/). The collection interval and the detailed settings for group tasks are configured in [5.5. Tasks](/en/usage/tasks/). For the format in which group task results are published over MODBUS, MQTT and a database, see the *Communication Protocol*.

:::note[Note]
If the group contains a machine that is not activated (for machine activation, see [5.3. Machines](/en/usage/machines/)), that machine is not on the collection list and is not included in the statistics.

:::


Group OEE data covers all activated machines in the group: total Off time, total Wait time, total Emergency time, total Autorun time, total Manual time, the current number of machines that are Off, Wait, Emergency, Autorun and Manual, and the group availability. See [6.1.2. Group OEE Data](/en/reference/glossary/#group-oee).

For the group part count, see [6.1.3. Group Part Count](/en/reference/glossary/#group-count).

Both group OEE and the group part count require local caching, so the "Local Caching" switch under Options in [5.12. Settings](/en/usage/settings/) must be turned on before you enable them.

Group Cumulative Status Time is the total time spent in each status, summed over all machines in the group, since the gateway started collecting from those machines, in seconds.

### 5.4.1.3. Advanced Settings {#group-advanced}

In the "Advanced" section you can define a custom group ID (GroupID). The group ID identifies the group's data for every communication method except MODBUS. The default group ID is the letter g followed by the group number, for example "g1".


## 5.4.2. Editing a Group {#edit-group}

Click the **Edit** button in the "Operations" column on the right of an existing group row to open the "Edit Group" dialog, which is similar to "Create Group". Here you can change the group number, group name and activation state, select the machines in the group, adjust their count multipliers, configure group tasks, change the group ID, and so on.

![Editing a group](/img/manual/en/groups/edit-group-dialog.png)

## 5.4.3. Deleting a Group {#delete-group}

Click the **Delete** button in the "Operations" column on the right of an existing group row. The "Delete Group" dialog appears; click **Confirm** to delete the group.

![Deleting a group](/img/manual/en/groups/delete-group-dialog.png)

## 5.4.4. Batch Activation {#group-batch-activate}

Select several groups using the checkboxes at the far left of the list, or the select-all button at the top left of the list.

![Selecting several groups](/img/manual/en/groups/group-batch-select.png)

A batch action bar then appears at the top of the page with the **Activate**, **Deactivate**, **Batch Delete** and **Clear Selection** buttons.

Click **Activate** or **Deactivate** to activate or deactivate all the selected groups at once.


## 5.4.5. Batch Delete {#group-batch-delete}

Select several groups using the checkboxes at the far left of the list, or the select-all button at the top left of the list.

Click **Batch Delete** on the batch action bar, then click Confirm in the dialog that appears to delete the selected groups.

![Batch deleting groups](/img/manual/en/groups/group-batch-delete.png)
