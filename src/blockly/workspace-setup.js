const blocklyDiv = document.getElementById("blocklyDiv");

// Workspace configuration (no toolbox — custom sidebar handles block selection)
const workspace = Blockly.inject(blocklyDiv, {
  media: "./node_modules/blockly/media/",
  scrollbars: true,
  trashcan: true,
  sounds: true,
  oneBasedIndex: true,
  grid: {
    spacing: 20,
    length: 2,
    colour: '#dde0e4',
    snap: false,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 0.7,
    maxScale: 2,
    minScale: 0.4,
    scaleSpeed: 1.2,
  },
  renderer: "zelos",
});

// Enable searching on workspace by using Ctrl+F
const workspaceSearch = new WorkspaceSearch(workspace);
workspaceSearch.init();

// Theme-aware grid colour — update grid lines when dark/light mode toggles
(function () {
  const GRID_LIGHT = '#dde0e4';
  const GRID_DARK = '#1f2230';

  function updateGridColour() {
    const isDark = document.body.classList.contains('dark-mode');
    const colour = isDark ? GRID_DARK : GRID_LIGHT;
    const lines = workspace.getParentSvg().querySelectorAll('.blocklyGridLine');
    lines.forEach(function (line) {
      line.setAttribute('stroke', colour);
    });
  }

  // Set initial colour
  updateGridColour();

  // Watch for theme changes via class mutation on <body>
  const observer = new MutationObserver(function (mutations) {
    for (const m of mutations) {
      if (m.attributeName === 'class') {
        updateGridColour();
        break;
      }
    }
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();

// Expose workspace globally for other modules
window.imagelabWorkspace = workspace;
