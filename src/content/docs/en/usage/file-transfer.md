---
title: "5.9. DNC (Program Transfer)"
---

This page lets you list, upload, download, delete and back up machine program files and send files to several machines at once, and it has a built-in toolpath viewer. Use it to verify a setup before it goes live, or as a lightweight file manager for your machines.

If you have changed any **Machines**, **Groups**, **Tasks** or **Communication** settings, click **Restart Service** on the Home page before transferring programs.

:::caution[Caution]
- A file sent from your computer **cannot overwrite an existing machine file directly**. If you send a file whose name already exists, the gateway asks you to confirm the replacement.
- Some machines support file locking, write protection and similar features. Once these are enabled, files on the machine cannot be deleted.
- **A program that is in use cannot be deleted.**

:::

Program transfer uses the file-transfer parts of the HTTP protocol. For details, see section 2.6, File Management Interfaces, of the *Communication Protocol*.

## Machine Directory {#machine-directory}

The **DNC** page opens on the machine directory: every machine that supports program transfer, together with its IP address, system model, group and connection status. DNC is unavailable for offline machines.

![DNC machine directory](/img/manual/en/file-transfer/transfer-page.png)

Select one or more machines and the Fleet actions bar appears at the top of the page, offering **Send files** and **Download machine files (backup)** for the selected machines.

![Fleet actions bar with machines selected](/img/manual/en/file-transfer/machine-directory-selected.png)

Click a machine name to open that machine's file browser.

## 5.9.1. Reading a Machine's File List {#read-file-list}

The left-hand panel of the file browser lists the folders and files under the machine's root directory (configured in [5.3.1.3. DNC Settings](/en/usage/machines/#transfer-settings)). Click a folder to open it; use the breadcrumb above the list to go back up. A filter box above the list narrows the view by file name.

![Machine file browser](/img/manual/en/file-transfer/file-list.png)

On Mitsubishi controls, a target path holding a large number of files can take a while to list.

If the file list does not respond for a long time and no error appears, go to the [API Test](/en/usage/api-test/) page and use the Common Data interface to check that the gateway can talk to the machine.

## 5.9.2. Receiving a Machine File to Your Computer {#receive-file}

Click a file in the left-hand list and the gateway receives it from the machine and shows its contents in the preview pane on the right. The ‹ › buttons at the top left of the preview pane step through the files.

![File preview](/img/manual/en/file-transfer/file-preview.png)

Click the **Download** icon at the top right of the preview pane to save the received file through your browser. The file lands in your browser's default download folder. You can also open your browser's download settings to change that folder, or have the browser ask you where to save each download. Alternatively, hover over a file in the list and click the **Download** icon on the right of the row to download it directly.

Binary files cannot be shown in the preview pane, but they can still be downloaded.

## 5.9.3. Sending a Local File to a Machine {#send-file}

Click the **Upload files** button at the top right of the page (or select machines in the machine directory and click **Send files**) to open the "Send files" dialog:

1. Confirm the target machine and the target folder (leave the folder empty for the machine's default folder);
2. Drag files into the dialog, or click **Choose files** to pick them from your computer — several files can be selected at once;
3. Click **Send**. The files are sent to the target folder on the machine.

![Send files dialog](/img/manual/en/file-transfer/send-file-dialog.png)

After editing a file in the preview pane, you can also click **Send back** to return the edited contents to the current machine, or **Send to…** to send them to other machines.

:::caution[Caution for Fanuc Systems]
When you send a file to a Fanuc control, the machine automatically takes the first line of the file's contents as the file name, not the name the file had on your computer. You must therefore change the first line to the target file name before sending. With the contents below, the file is named O8003 on the machine after a successful send:

```
%
O8003
T1M06
...
```

:::

## 5.9.4. Deleting a Machine File {#delete-file}

In the left-hand file list, hover over a file, click the **Delete** icon on the right of the row and confirm in the dialog that appears. The file is then deleted.

![Delete file](/img/manual/en/file-transfer/delete-file-dialog.png)

## 5.9.5. Creating a Machine Folder {#create-directory}

Click the **New folder** icon at the top right of the page to open the new folder dialog, enter a folder name and click **Create**. The folder is created inside the current folder.

![New folder](/img/manual/en/file-transfer/create-directory-dialog.png)

## 5.9.6. Deleting a Machine Folder {#delete-directory}

In the left-hand file list, hover over a folder, click the **Delete** icon on the right of the row and confirm in the delete folder dialog. Only empty folders can be deleted at present, so delete all files and subfolders inside it first.

## 5.9.7. Backing Up Machine Files {#backup-files}

This function packs the files of the selected machines — including subfolders and their contents — into a single ZIP archive for you to download. Inside the archive, the first level is a folder named "BackupFiles_" followed by the backup date and time; the second level is one folder per machine root directory, named "machineID_machineName"; below that are each machine's files and folders, with the original folder structure preserved.

In the machine directory, select the machines to back up (tick **All machines** in the table header to select every machine), click **Download machine files (backup)** in the Fleet actions bar, then click **Download** in the confirmation dialog to start the backup. Once the archive is ready, it can be downloaded to your computer.

![Backing up machine files](/img/manual/en/file-transfer/backup-dialog.png)

:::note[Note]
Backing up a folder that holds a large number of files takes a long time. Back up only the machines you need.

:::

## 5.9.8. Batch Sending Files {#batch-send-files}

Select several machines in the machine directory and click **Send files** to send the same set of files to a chosen folder on all of them in one go. In the "Send files" dialog you can click **Choose files** repeatedly to add files from different locations; confirm the target folder and click **Send**.

The send runs as a single batch and the gateway transfers to each machine in turn. If a file of the same name already exists at the destination, you are asked to confirm the replacement.

## 5.9.9. Viewing the Toolpath {#toolpath-viewer}

Two tabs, **Editor** and **Toolpath**, sit above the file preview pane. Once a G-code file is loaded (received from the machine — see [5.9.2. Receiving a Machine File to Your Computer](#receive-file)), switch to the **Toolpath** tab to open the toolpath viewer.

The viewer shows the G-code on the left and an animation of the corresponding toolpath on the right, with X/Y/Z position readouts (DRO) and the current line. The legend above distinguishes toolpath types such as Rapid, Feed, Arc and Drill. Drag to rotate the view, scroll to zoom and adjust the playback speed to study the toolpath directly. If needed, edit the G-code in the code pane on the left and the toolpath on the right updates immediately.

![Toolpath viewer](/img/manual/en/file-transfer/toolpath-viewer.png)
