/**
 * @module operator/OpenCvOperator
 * @description Base class for all OpenCV-based image processing operators.
 * Subclasses must implement compute() and optionally setParams().
 */

const cv2 = require("../opencv");

/**
 * Abstract base class for image processing operators. Each operator wraps
 * one or more OpenCV functions and provides a uniform interface for the
 * pipeline to call.
 *
 * @class
 * @property {object} cv2 - The OpenCV.js library instance
 * @property {string} type - The Blockly block type string identifying this operator
 * @property {string} blockId - The unique Blockly block ID
 *
 * @example
 * class MyOperator extends OpenCvOperator {
 *   constructor(type, id) { super(type, id); }
 *   setParams(param, value) { ... }
 *   compute(image) { ... return processedMat; }
 * }
 */
class OpenCvOperator {
  type = "";
  blockId = "";

  /**
   * @param {string} type - The Blockly block type string
   * @param {string} id - The unique Blockly block ID
   */
  constructor(type, id) {
    this.cv2 = cv2;
    this.type = type;
    this.blockId = id;
  }

  /**
   * Validates that the input image is not null/undefined before processing.
   * Subclasses can override to add parameter-specific validation.
   *
   * @param {object} image - The image to validate
   * @throws {Error} If the image is null or undefined
   */
  validate(image) {
    if (image === null || image === undefined) {
      throw new Error(`${this.type}: Input image is null or undefined`);
    }
  }

  /**
   * Processes the input image and returns the result. Subclasses must
   * override this method with their specific OpenCV operations.
   *
   * @param {object} image - An OpenCV Mat object to process
   * @returns {object} The processed OpenCV Mat object
   * @throws {Error} If not overridden by a subclass
   */
  compute(image) {
    throw Error("This method needs to be implemented in sub classes");
  }
}

module.exports = OpenCvOperator;
