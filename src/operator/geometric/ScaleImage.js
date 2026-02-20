const OpenCvOperator = require("../OpenCvOperator");

class ScaleImage extends OpenCvOperator {
  #xaxis = 1;
  #yaxis = 1;
  constructor(type, id) {
    super(type, id);
  }

  /**
   * This methods sets the values of the class
   * @param {String} param
   * @param {String} value
   */
  setParams(param, value) {
    if (param === "fx") {
      this.#xaxis = value;
    } else if (param === "fy") {
      this.#yaxis = value;
    }
  }

  /**
   *
   * @param {Mat} image
   * @returns
   * This function scale up the image
   */
  compute(image) {
    const dst = new this.cv2.Mat();
    const dsize = new this.cv2.Size(
      Math.round(image.cols * this.#xaxis),
      Math.round(image.rows * this.#yaxis)
    );
    this.cv2.resize(image, dst, dsize, this.#xaxis, this.#yaxis, this.cv2.INTER_AREA);
    return dst;
  }
}

module.exports = ScaleImage;
