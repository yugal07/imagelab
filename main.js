/**
 * @module main
 * @description Electron main process. Creates the BrowserWindow, loads the
 * application, and manages the application menu.
 */

"use strict";

const electron = require("electron");
const path = require("path");
const { createLogger } = require("./src/helpers/logger");
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");

const logger = createLogger("Main");

const { app, BrowserWindow, Menu, shell, ipcMain, dialog } = electron;

// Initialize custom titlebar (must be called before window creation)
setupTitlebar();

// Hot-reload in development only
if (process.argv.includes("--dev")) {
  try {
    require("electron-reload")(__dirname, {
      electron: path.join(__dirname, "node_modules", ".bin", "electron"),
      hardResetMethod: "exit",
    });
  } catch (_err) {
    logger.warn("electron-reload failed to initialize");
  }
}

app.on("ready", () => {
  logger.info("App ready, creating windows");

  // Main window properties
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false,
      preload: path.join(__dirname, "preload.js"),
    },
    height: 1080,
    width: 1920,
    minWidth: 1100,
    minHeight: 800,
    show: false,
    icon: __dirname + "/assets/logos/Image Lab Icon.png",
    frame: false,
    titleBarStyle: "hidden",
  });

  // Attach titlebar event listeners (fullscreen, focus)
  attachTitlebarToWindow(mainWindow);

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open DevTools only in development mode
  if (process.argv.includes("--dev")) {
    mainWindow.webContents.openDevTools();
  }

  // Show main window once content has rendered
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    logger.info("Main window shown");
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  // Save dialog when user tries to close the application
  mainWindow.on("close", function (e) {
    const choice = dialog.showMessageBoxSync(this, {
      type: "question",
      buttons: ["Save", "Don't save", "Cancel"],
      title: "Image Lab",
      message: "Do you want to save changes to ........ ?",
    });
    if (choice === 2) {
      logger.info("Close cancelled by user");
      e.preventDefault();
    }
  });
});

// IPC handlers — renderer calls these via ipcRenderer.invoke()
ipcMain.handle("dialog:showMessageBox", async (_event, options) => {
  logger.debug("IPC: dialog:showMessageBox", { title: options.title });
  const result = await dialog.showMessageBox(options);
  return result;
});

// Menu configuration
const isMac = process.platform === "darwin";

const template = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  {
    label: "File",
    submenu: [
      { label: "New File" },
      { label: "Open File" },
      { label: "Save" },
      isMac ? { role: "close" } : { role: "quit" },
    ],
  },
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { label: "Zoom in" },
      { label: "Zoom out" },
      { label: "Center blocks" },
    ],
  },
  {
    role: "help",
    submenu: [
      { label: "Tutorials" },
      {
        label: "About",
        click() {
          aboutWindowPreview();
        },
      },
      {
        label: "Learn More",
        click: async () => {
          await shell.openExternal("https://github.com/scorelab/imagelab");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

/**
 * Opens the About window showing application info and external links.
 */
function aboutWindowPreview() {
  let aboutWindow = new BrowserWindow({
    height: 520,
    width: 600,
    title: "About",
    resizable: false,
    minimizable: false,
    fullscreenable: false,
    show: false,
    autoHideMenuBar: true,
    icon: __dirname + "/assets/logos/Image Lab Icon.png",
  });
  aboutWindow.loadURL(`file://${__dirname}/about.html`);
  aboutWindow.show();

  aboutWindow.on("closed", function () {
    aboutWindow = null;
  });

  // Open external links in the user's default browser instead of Electron
  aboutWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith("file://")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });
}
