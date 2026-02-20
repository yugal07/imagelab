/**
 * @module registry/operator-registry
 * @description Central registry for all image processing operators. Operators
 * register themselves here, and the MainController uses this registry to
 * instantiate operators by block type — replacing the previous switch statement.
 */

/**
 * Static registry mapping Blockly block type strings to operator classes.
 * Follows the self-registration pattern: each operator file calls
 * `OperatorRegistry.register()` when loaded.
 *
 * @class
 *
 * @example
 * // Registration (in operator file):
 * OperatorRegistry.register("blurring_applyblur", "BLURIMAGE", Blur);
 *
 * // Usage (in MainController):
 * const operator = OperatorRegistry.create("blurring_applyblur", blockId);
 */
class OperatorRegistry {
  static #registry = new Map();

  /**
   * Registers an operator class for a given block type.
   *
   * @param {string} blockType - The Blockly block type string (e.g., "blurring_applyblur")
   * @param {string} key - The operation constant key (e.g., "BLURIMAGE")
   * @param {Function} OperatorClass - The operator class constructor
   */
  static register(blockType, key, OperatorClass) {
    OperatorRegistry.#registry.set(blockType, { key, OperatorClass });
  }

  /**
   * Creates an operator instance for the given block type.
   *
   * @param {string} blockType - The Blockly block type string
   * @param {string} id - The Blockly block ID
   * @returns {OpenCvOperator|null} A new operator instance, or null if unregistered
   */
  static create(blockType, id) {
    const entry = OperatorRegistry.#registry.get(blockType);
    if (entry) {
      return new entry.OperatorClass(blockType, id);
    }
    return null;
  }

  /**
   * Checks if a block type has a registered operator.
   *
   * @param {string} blockType - The Blockly block type string
   * @returns {boolean}
   */
  static has(blockType) {
    return OperatorRegistry.#registry.has(blockType);
  }

  /**
   * Returns a map of operation constant keys to block type strings.
   * Used for backward compatibility with code that referenced PROCESS_OPERATIONS.
   *
   * @returns {Object<string, string>} Map of { KEY: blockType }
   */
  static getOperationConstants() {
    const constants = {};
    for (const [blockType, { key }] of OperatorRegistry.#registry) {
      constants[key] = blockType;
    }
    return constants;
  }

  /**
   * Clears all registrations. Used in testing.
   */
  static clear() {
    OperatorRegistry.#registry.clear();
  }
}

module.exports = OperatorRegistry;
