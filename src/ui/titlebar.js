/**
 * @module ui/titlebar
 * @description Configures the custom-electron-titlebar in the renderer process.
 * The main process counterpart (setupTitlebar/attachTitlebarToWindow) runs in main.js.
 */

const { Titlebar, TitlebarColor } = require("custom-electron-titlebar");

window.addEventListener("DOMContentLoaded", () => {
  const isDark = document.documentElement.classList.contains('dark-mode');
  const titlebar = new Titlebar({
    icon: "./assets/logos/Image Lab Icon.png",
    menuPosition: "left",
    backgroundColor: TitlebarColor.fromHex(isDark ? '#12141c' : '#f1f3f5'),
  });
  window.imagelabTitlebar = titlebar;
});
