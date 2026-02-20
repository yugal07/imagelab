/**
 * @module operator/basic/WriteImage
 * @description Renders the processed image to the preview canvas using cv2.imshow.
 */

const OpenCvOperator = require("../OpenCvOperator");

/**
 * Writes/displays the processed image to the preview pane. This is
 * typically the last operator in the pipeline. It renders the Mat
 * to a canvas element and returns the data URL for download.
 *
 * @class
 * @extends OpenCvOperator
 */
class WriteImage extends OpenCvOperator {
  constructor(type, id) {
    super(type, id);
  }

  /**
   * Renders the processed image to the preview canvas.
   *
   * @param {object} processedImage - The OpenCV Mat to display
   * @returns {string|undefined} The canvas data URL if rendering succeeds
   */
  compute(processedImage) {
    const preview = document.getElementById("image-preview");
    this.cv2.imshow(preview, processedImage);
    if (preview.toDataURL) {
      return preview.toDataURL();
    }
  }
}

module.exports = WriteImage;
