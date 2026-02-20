const { hexToRgb } = require("../../helpers/convertColor");
const OpenCvOperator = require("../OpenCvOperator");

/**
 * This class contains all the logic regarding with
 * drawing a line in the input image
 */
class DrawLine extends OpenCvOperator {
  #thickNess = 2;
  #lineColor = { r: 40, g: 40, b: 240 };
  #point_x1 = 0;
  #point_y1 = 0;
  #point_x2 = 0;
  #point_y2 = 0;
  constructor(type, id) {
    super(type, id);
  }

  setParams(param, value) {
    if (param === "thickness") {
      this.#thickNess = value;
    } else if (param === "rgbcolors_input") {
      this.#lineColor = hexToRgb(value);
    } else if (param === "starting_point_x1") {
      this.#point_x1 = value;
    } else if (param === "starting_point_y1") {
      this.#point_y1 = value;
    } else if (param === "ending_point_x") {
      this.#point_x2 = value;
    } else if (param === "ending_point_y") {
      this.#point_y2 = value;
    }
  }

  /**
   * This function draw line on the input image
   * according to the inputs given by the user
   * @param {Mat} image
   * @returns
   */
  compute(image) {
    const p1 = new this.cv2.Point(this.#point_x1, this.#point_y1);
    const p2 = new this.cv2.Point(this.#point_x2, this.#point_y2);
    this.cv2.line(
      image,
      p1,
      p2,
      [this.#lineColor.r, this.#lineColor.g, this.#lineColor.b, 255],
      this.#thickNess
    );
    return image;
  }
}

module.exports = DrawLine;
