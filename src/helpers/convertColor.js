/**
 * @module helpers/convertColor
 * @description Color conversion utilities for translating between hex and RGB formats.
 */

/**
 * Converts a hexadecimal color string to an RGB object.
 *
 * @param {string} hex - Hex color string (e.g., "#FF0000" or "FF0000")
 * @returns {{ r: number, g: number, b: number }|null} RGB object or null if invalid
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

module.exports = { hexToRgb };
