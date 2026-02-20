// Theme toggle with localStorage persistence and wave animation
(function () {
  const STORAGE_KEY = 'imagelab-theme';
  const toggle = document.querySelector('.toggle');
  const wave = document.querySelector('.wave');

  // Apply saved theme on load (class may already be set by anti-flash script)
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark') {
    document.documentElement.classList.add('dark-mode');
    toggle.classList.add('active');
  }

  toggle.addEventListener('click', function () {
    // Start wave animation
    wave.classList.add('active');

    setTimeout(() => {
      // Toggle theme
      const isDark = document.documentElement.classList.toggle('dark-mode');
      toggle.classList.toggle('active');

      // Persist
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');

      // Sync titlebar background color
      if (window.imagelabTitlebar) {
        const { TitlebarColor } = require("custom-electron-titlebar");
        window.imagelabTitlebar.updateBackground(
          TitlebarColor.fromHex(isDark ? '#12141c' : '#f1f3f5')
        );
      }

      // End wave after transition completes
      setTimeout(() => {
        wave.classList.remove('active');
      }, 400);
    }, 150);
  });
})();
