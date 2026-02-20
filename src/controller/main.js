/**
 * @module controller/main
 * @description MainController manages the operator pipeline: maintains an ordered
 * array of operators, handles block creation/deletion/reordering, and executes
 * the pipeline sequentially via computeAll().
 */

const PROCESS_OPERATIONS = require("../registry/operations");
const OperatorRegistry = require("../registry/operator-registry");
const { createLogger } = require("../helpers/logger");

const logger = createLogger("Pipeline");

/**
 * Controls the image processing pipeline. Operators are added when blocks
 * are created in the Blockly workspace, reordered when blocks are moved,
 * and executed sequentially when the user clicks "Run".
 *
 * @class
 */
class MainController {
  /** @type {OpenCvOperator[]} Ordered array of operators in the pipeline */
  #appliedOperators;

  /** @type {HTMLImageElement|null} The source image loaded by the user */
  #originalImage;

  /** @type {string|null} Data URL of the last successfully processed image */
  #processedImage;

  constructor() {
    this.#appliedOperators = [];
    this.#originalImage = null;
    this.#processedImage = null;
  }

  /**
   * Removes an operator from the pipeline by its Blockly block ID.
   *
   * @param {string} blockId - The Blockly block ID to remove
   */
  deleteBlock(blockId) {
    const index = this.#appliedOperators.findIndex((item) => item.blockId === blockId);
    if (index !== -1) {
      logger.info("Operator removed", { blockId, type: this.#appliedOperators[index].type });
      this.#appliedOperators.splice(index, 1);
    }
  }

  /**
   * Reorders operators so that `child` is placed immediately after `parent`.
   * This is called when blocks are connected/moved in the Blockly workspace.
   * The algorithm finds both operators by type, removes the child from its
   * current position, and inserts it right after the parent.
   *
   * @param {string} parent - Block type string of the parent operator
   * @param {string} child - Block type string of the child operator
   */
  arrangeBlocks(parent, child) {
    const parentIndex = this.#appliedOperators.findIndex((item) => item.type === parent);
    const childIndex = this.#appliedOperators.findIndex((item) => item.type === child);

    if (parentIndex === -1 || childIndex === -1) {
      return;
    }

    // Already in correct position
    if (parentIndex + 1 === childIndex) {
      return;
    }

    const childElement = this.#appliedOperators[childIndex];
    this.#appliedOperators.splice(childIndex, 1);
    this.#appliedOperators.splice(parentIndex + 1, 0, childElement);
  }

  /**
   * Sets the source image for the pipeline.
   *
   * @param {HTMLImageElement} image - The loaded image element
   */
  setOriginalImage(image) {
    this.#originalImage = image;
    logger.info("Original image set");
  }

  /**
   * Returns the source image.
   *
   * @returns {HTMLImageElement|null}
   */
  getOriginalImage() {
    return this.#originalImage;
  }

  /**
   * Returns the last processed image data URL.
   *
   * @returns {string|null}
   */
  getProcessedImage() {
    return this.#processedImage;
  }

  /**
   * Creates and adds an operator to the pipeline based on a Blockly block type.
   * Uses the OperatorRegistry to instantiate the correct operator class.
   *
   * @param {string} operatorType - The Blockly block type string (e.g., "blurring_applyblur")
   * @param {string} id - The Blockly block ID
   */
  addOperator(operatorType, id) {
    const operator = OperatorRegistry.create(operatorType, id);
    if (operator) {
      this.#appliedOperators.push(operator);
      logger.info("Operator added", { type: operatorType, id });
    }
  }

  /**
   * Executes all operators in the pipeline sequentially. Each operator receives
   * the output of the previous one. The pipeline must start with a ReadImage
   * block and an image must be loaded.
   *
   * @throws {Error} If no operators are in the pipeline
   * @throws {Error} If the first operator is not ReadImage
   * @throws {Error} If no image has been loaded
   */
  computeAll() {
    if (this.#appliedOperators.length === 0) {
      throw Error("No operators are added to the workspace");
    }

    if (this.#appliedOperators[0]?.type !== PROCESS_OPERATIONS.READIMAGE) {
      throw Error("Read Image block is not added");
    }

    if (this.#originalImage === null) {
      throw Error("Image is not set");
    }

    logger.info("Pipeline executing", { operatorCount: this.#appliedOperators.length });

    let image = this.#originalImage;
    this.#appliedOperators.forEach((item, index) => {
      if (image) {
        logger.debug("Executing operator", { step: index, type: item.type });
        try {
          image = item.compute(image);
          if (image) {
            this.#processedImage = image;
          }
        } catch (error) {
          logger.error("Pipeline failed at operator", { step: index, type: item.type, error: error.message });
          throw error;
        }
      }
    });

    logger.info("Pipeline completed successfully");
  }

  /**
   * Updates parameters on a specific operator in the pipeline.
   *
   * @param {string} blockType - The Blockly block type to find
   * @param {string} paramType - The parameter name to update
   * @param {*} value - The new parameter value
   */
  changeValuesOfBlocks(blockType, paramType, value) {
    const block = this.#appliedOperators.find((item) => item.type === blockType);
    if (block) {
      block.setParams(paramType, value);
      logger.debug("Parameter changed", { blockType, paramType, value });
    }
  }

  /**
   * Clears all operators and resets the image state.
   */
  resetTheWorkspace() {
    this.#appliedOperators = [];
    this.#originalImage = null;
    logger.info("Workspace reset");
  }
}

module.exports = MainController;
