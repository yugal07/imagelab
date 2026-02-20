const OpenCvOperator = require("../OpenCvOperator");

/**
 * This class contains the main logic
 * of adding reflex image transformation
 * to the image
 */
class ReflectImage extends OpenCvOperator {
  #direction = "X";
  constructor(type, id) {
    super(type, id);
  }

  setParams(param, value) {
    this.#direction = value;
  }

  /**
   *
   * @param {Mat} image
   * @returns
   * This function reflects the image
   */
  compute(image) {
    const dst = new this.cv2.Mat();
    let flipCode;
    if (this.#direction === "X") {
      flipCode = 0; // Flip around X axis (vertical flip)
    } else if (this.#direction === "Y") {
      flipCode = 1; // Flip around Y axis (horizontal flip)
    } else {
      flipCode = -1; // Flip around both axes
    }
    this.cv2.flip(image, dst, flipCode);
    return dst;
  }
}

module.exports = ReflectImage;
