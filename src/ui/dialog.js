/**
 * @module ui/dialog
 * @description Utility for showing message box dialogs via Electron IPC.
 */

function showDialog(title, message, type) {
  window.electronAPI.showMessageBox({
    title: title,
    buttons: ["Dismiss"],
    type: type,
    message: message,
  });
}
