const OpenCvOperator = require("../OpenCvOperator");

/**
 * This class contains the main logic
 * of applying Canny edge detection to an image
 */
class CannyEdge extends OpenCvOperator {
  #threshold1 = 50;
  #threshold2 = 150;

  constructor(type, id) {
    super(type, id);
  }

  setParams(type, value) {
    if (type === "threshold1") {
      this.#threshold1 = value;
    } else if (type === "threshold2") {
      this.#threshold2 = value;
    }
  }

  /**
   * @param {Mat} image
   * @returns
   * Applies Canny edge detection to the mat image
   */
  compute(image) {
    let dst = new this.cv2.Mat();
    this.cv2.Canny(image, dst, this.#threshold1, this.#threshold2);
    return dst;
  }
}

module.exports = CannyEdge;
