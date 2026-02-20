;(function () {
  const MainController = require("./src/controller/main");

  const workspace = window.imagelabWorkspace;
  const mainController = new MainController();

  // Block event listeners — bridges Blockly UI events to the operator pipeline
  workspace.addChangeListener(function (event) {
    if (event.type === Blockly.Events.CLICK) {
      document.getElementById("operator_name").innerText = workspace.getBlockById(
        event.newElementId
      )?.type;
      document.getElementById("operator_description").innerText = workspace.getBlockById(
        event.newElementId
      )?.tooltip;
    }
    if (event.type === Blockly.Events.BLOCK_CREATE) {
      mainController.addOperator(workspace.getBlockById(event.blockId).type, event.blockId);
    } else if (
      event.type === Blockly.Events.BLOCK_DRAG ||
      event.type === Blockly.Events.BLOCK_MOVE
    ) {
      if (event?.newParentId && event?.blockId) {
        mainController.arrangeBlocks(
          workspace.getBlockById(event?.newParentId).type,
          workspace.getBlockById(event?.blockId).type
        );
      }
    } else if (event.type === Blockly.Events.BLOCK_CHANGE) {
      const blockType = workspace.getBlockById(event.blockId).type;
      const paramType = event.name;
      const value = event.newValue;
      try {
        mainController.changeValuesOfBlocks(blockType, paramType, value);
      } catch (error) {
        showDialog("Error Occured", error.message, "error");
      }
    } else if (event.type === Blockly.Events.BLOCK_DELETE) {
      mainController.deleteBlock(event.blockId);
    }
    if (event.type === Blockly.Events.CLICK) {
      const infoPane = document.getElementById("information-pane");
      if (Blockly.getSelected() === null) {
        infoPane.classList.remove("information-pane--active");
      } else {
        infoPane.classList.add("information-pane--active");
      }
    }
  });

  // Expose controller globally for image-controls
  window.imagelabController = mainController;
})();
