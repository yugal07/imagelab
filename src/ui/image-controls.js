/**
 * @module ui/image-controls
 * @description Image control functions (execute, download, zoom, reset) exposed
 * as globals for onclick handlers in index.html.
 */

function executeProcess() {
  const preview = document.getElementById("image-preview");
  try {
    window.imagelabController.computeAll(preview);
  } catch (error) {
    console.log(error);
    showDialog("Error Occured", error.message, "error");
  }
}

function downloadImage() {
  const downloadImage = window.imagelabController.getProcessedImage();
  if (downloadImage !== null) {
    const link = document.createElement("a");
    link.download = "Processed_image.jpg";
    link.href = downloadImage;
    link.click();
  } else {
    showDialog("Error", "No processed image found!", "error");
  }
}

function zoomin() {
  const myImg = document.getElementById("image-preview");
  const currWidth = myImg.clientWidth;
  if (currWidth === 2500) return false;
  else {
    myImg.style.width = currWidth + 100 + "px";
  }
}

function zoomout() {
  const myImg = document.getElementById("image-preview");
  const currWidth = myImg.clientWidth;
  if (currWidth === 100) return false;
  else {
    myImg.style.width = currWidth - 100 + "px";
  }
}

function loadFile() {
  const preview = document.getElementById("input-image");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();
  let url = "";

  reader.addEventListener(
    "load",
    function () {
      url = URL.createObjectURL(file);
      preview.src = url;
    },
    false
  );

  preview.onload = () => {
    window.imagelabController.setOriginalImage(preview);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

function setDirectory() {
  const location = document.getElementById("outputDirectory");
  console.log("Function called");
  location.addEventListener("load", (e) => {
    console.log("Output location is: ", e);
  });
}

function resetWorkspace() {
  window.electronAPI
    .showMessageBox({
      title: "Caution!",
      buttons: ["Cancel", "Reset"],
      type: "warning",
      message:
        "Please note that resetting the workspace will result in the loss of all unsaved work.",
    })
    .then((result) => {
      if (result.response === 1) {
        window.imagelabWorkspace.clear();
        window.imagelabController.resetTheWorkspace();
      }
    });
}

function undo() {
  window.imagelabWorkspace.undo(false);
}

function redo() {
  window.imagelabWorkspace.undo(true);
}
