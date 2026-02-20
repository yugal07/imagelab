// Custom accordion sidebar — replaces Blockly's built-in toolbox
;(function () {
  var workspace = window.imagelabWorkspace;

  // Hidden off-screen workspace for rendering block SVG previews
  var hiddenDiv = document.createElement('div');
  hiddenDiv.style.position = 'absolute';
  hiddenDiv.style.left = '-9999px';
  hiddenDiv.style.visibility = 'hidden';
  hiddenDiv.style.width = '800px';
  hiddenDiv.style.height = '600px';
  document.body.appendChild(hiddenDiv);

  var previewWorkspace = Blockly.inject(hiddenDiv, {
    media: './node_modules/blockly/media/',
    renderer: 'zelos',
    readOnly: true,
  });

  // Category/block structure mirroring the old toolbox XML
  var SIDEBAR_CATEGORIES = [
    {
      name: 'Basic',
      icon: 'mdi-cog',
      colour: '#5ba58c',
      blocks: ['basic_readimage', 'basic_writeimage', 'browse_file', 'browse_folder'],
    },
    {
      name: 'Geometric',
      icon: 'mdi-format-rotate-90',
      colour: '#a5745b',
      blocks: ['geometric_reflectimage', 'geometric_rotateimage', 'geometric_affineimage', 'geometric_scaleimage'],
    },
    {
      name: 'Conversions',
      icon: 'mdi-palette',
      colour: '#a55b80',
      blocks: ['imageconvertions_grayimage', 'imageconvertions_colormaps', 'imageconvertions_graytobinary', 'imageconvertions_colortobinary'],
    },
    {
      name: 'Drawing',
      icon: 'mdi-shape',
      colour: '#5b67a5',
      blocks: ['drawingoperations_drawline', 'drawingoperations_drawellipse', 'drawingoperations_drawarrowline', 'drawingoperations_drawtext', 'drawingoperations_drawcircle', 'drawingoperations_drawrectangle'],
    },
    {
      name: 'Blurring',
      icon: 'mdi-blur',
      colour: '#9fa55b',
      blocks: ['blurring_applyblur', 'blurring_applygaussianblur', 'blurring_applymedianblur'],
    },
    {
      name: 'Filtering',
      icon: 'mdi-filter',
      colour: '#5ba55b',
      blocks: ['filtering_bilateral', 'filtering_pyramidup', 'filtering_boxfilter', 'filtering_pyramiddown', 'filtering_erosion', 'filtering_dilation', 'filtering_morphological'],
    },
    {
      name: 'Thresholding',
      icon: 'mdi-border-none',
      colour: '#745ba5',
      blocks: ['thresholding_applyborders', 'border_for_all', 'border_each_side', 'thresholding_adaptivethreshold', 'thresholding_applythreshold'],
    },
    {
      name: 'Sobel Derivatives',
      icon: 'mdi-image-auto-adjust',
      colour: '#a55b80',
      blocks: ['sobelderivatives_soblederivate', 'sobelderivatives_scharrderivate'],
    },
    {
      name: 'Transformation',
      icon: 'mdi-image-move',
      colour: '#5b80a5',
      blocks: ['transformation_distance', 'transformation_laplacian'],
    },
  ];

  // Pre-render blocks as SVG snapshots (only once at init)
  var blockInfo = {};
  Blockly.Events.disable();
  try {
    SIDEBAR_CATEGORIES.forEach(function (cat) {
      cat.blocks.forEach(function (blockType) {
        if (blockInfo[blockType]) return;
        try {
          var tmpBlock = previewWorkspace.newBlock(blockType);
          tmpBlock.initSvg();
          tmpBlock.render();

          var svgRoot = tmpBlock.getSvgRoot();
          var svgClone = svgRoot.cloneNode(true);
          var bbox = svgRoot.getBBox();

          blockInfo[blockType] = {
            svg: svgClone,
            width: bbox.width,
            height: bbox.height,
            tooltip: tmpBlock.tooltip || '',
          };

          tmpBlock.dispose();
        } catch (e) {
          blockInfo[blockType] = { svg: null, width: 0, height: 0, tooltip: '' };
        }
      });
    });
  } finally {
    Blockly.Events.enable();
  }

  function humanizeName(blockType) {
    return blockType
      .replace(/^[a-z]+_/, '')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function (s) { return s.toUpperCase(); })
      .trim();
  }

  // Build the sidebar DOM using safe DOM methods
  function buildSidebar() {
    var container = document.getElementById('customSidebar');
    if (!container) return;

    SIDEBAR_CATEGORIES.forEach(function (cat) {
      var section = document.createElement('div');
      section.className = 'sidebar-category';

      // Header (built with DOM API — no innerHTML)
      var header = document.createElement('div');
      header.className = 'sidebar-category-header';

      var iconEl = document.createElement('span');
      iconEl.className = 'mdi ' + cat.icon + ' sidebar-category-icon';
      header.appendChild(iconEl);

      var nameEl = document.createElement('span');
      nameEl.className = 'sidebar-category-name';
      nameEl.textContent = cat.name;
      header.appendChild(nameEl);

      var countEl = document.createElement('span');
      countEl.className = 'sidebar-category-count';
      countEl.textContent = cat.blocks.length;
      header.appendChild(countEl);

      var chevronEl = document.createElement('span');
      chevronEl.className = 'mdi mdi-chevron-right sidebar-category-chevron';
      header.appendChild(chevronEl);

      header.addEventListener('click', function () {
        section.classList.toggle('sidebar-category--expanded');
      });

      // Body
      var body = document.createElement('div');
      body.className = 'sidebar-category-body';

      cat.blocks.forEach(function (blockType) {
        var info = blockInfo[blockType] || { svg: null, width: 0, height: 0, tooltip: '' };
        var item = document.createElement('div');
        item.className = 'sidebar-block-item';
        item.setAttribute('data-block-type', blockType);
        item.setAttribute('title', info.tooltip);

        if (info.svg) {
          var svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svgEl.setAttribute('viewBox', '0 0 ' + info.width + ' ' + info.height);
          svgEl.setAttribute('width', info.width * 0.55);
          svgEl.setAttribute('height', info.height * 0.55);
          svgEl.style.display = 'block';
          svgEl.appendChild(info.svg);
          item.appendChild(svgEl);
        } else {
          item.textContent = humanizeName(blockType);
        }

        // Click-to-add
        item.addEventListener('click', function () {
          if (item._dragged) { item._dragged = false; return; }
          addBlockToWorkspace(blockType);
        });

        // Ghost drag
        item.addEventListener('mousedown', function (e) {
          if (e.button !== 0) return;
          startGhostDrag(e, blockType, item);
        });

        body.appendChild(item);
      });

      section.appendChild(header);
      section.appendChild(body);
      container.appendChild(section);
    });
  }

  // Add a block to the center of the visible workspace
  function addBlockToWorkspace(blockType, wsCoords) {
    var block = workspace.newBlock(blockType);
    block.initSvg();
    block.render();

    if (wsCoords) {
      block.moveBy(wsCoords.x, wsCoords.y);
    } else {
      var metrics = workspace.getMetrics();
      var scale = workspace.scale;
      var x = (metrics.viewLeft + metrics.viewWidth / 2) / scale;
      var y = (metrics.viewTop + metrics.viewHeight / 2) / scale;
      block.moveBy(x, y);
    }
  }

  // Ghost drag state
  var ghostEl = null;
  var dragStarted = false;
  var dragBlockType = '';
  var dragStartX = 0;
  var dragStartY = 0;
  var dragSourceItem = null;
  var DRAG_THRESHOLD = 5;

  function startGhostDrag(e, blockType, itemEl) {
    dragBlockType = blockType;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    dragStarted = false;
    dragSourceItem = itemEl;

    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  }

  function onDragMove(e) {
    var dx = e.clientX - dragStartX;
    var dy = e.clientY - dragStartY;

    if (!dragStarted) {
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      dragStarted = true;

      ghostEl = document.createElement('div');
      ghostEl.className = 'sidebar-drag-ghost';
      ghostEl.textContent = humanizeName(dragBlockType);
      document.body.appendChild(ghostEl);
    }

    ghostEl.style.left = (e.clientX + 12) + 'px';
    ghostEl.style.top = (e.clientY - 14) + 'px';
  }

  function onDragEnd(e) {
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);

    if (ghostEl) {
      ghostEl.remove();
      ghostEl = null;
    }

    if (dragStarted) {
      if (dragSourceItem) dragSourceItem._dragged = true;

      var blocklyDiv = document.getElementById('blocklyDiv');
      var rect = blocklyDiv.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        var wsCoords = Blockly.utils.svgMath.screenToWsCoordinates(
          workspace,
          new Blockly.utils.Coordinate(e.clientX, e.clientY)
        );
        addBlockToWorkspace(dragBlockType, wsCoords);
      }
    }

    dragStarted = false;
    dragSourceItem = null;
  }

  // Initialize
  buildSidebar();

  // Free the hidden preview workspace now that all SVGs are cloned
  previewWorkspace.dispose();
  hiddenDiv.remove();
})();
