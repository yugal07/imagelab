/**
 * @module preload
 * @description Electron preload script. Exposes a safe subset of Electron APIs
 * to the renderer process via window.electronAPI. This replaces the deprecated
 * remote module with explicit IPC channels.
 */

"use strict";

const { ipcRenderer } = require("electron");

/**
 * Safe API surface exposed to the renderer process.
 * Each method maps to an IPC channel handled in the main process.
 */
const electronAPI = {
  /**
   * Shows a message box dialog.
   *
   * @param {object} options - Electron MessageBoxOptions (title, message, buttons, type)
   * @returns {Promise<object>} The dialog result with a `response` index
   */
  showMessageBox: (options) => ipcRenderer.invoke("dialog:showMessageBox", options),
};

// With contextIsolation: false, we set the API directly on window.
// When contextIsolation is enabled in a future PR, switch to contextBridge.
window.electronAPI = electronAPI;
