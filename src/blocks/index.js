/* Block definition aggregator — imports all category block files and registers them. */

const BASIC_BLOCKS = require("./src/blocks/basic.blocks");
const GEOMETRIC_BLOCKS = require("./src/blocks/geometric.blocks");
const CONVERSIONS_BLOCKS = require("./src/blocks/conversions.blocks");
const DRAWING_BLOCKS = require("./src/blocks/drawing.blocks");
const BLURRING_BLOCKS = require("./src/blocks/blurring.blocks");
const FILTERING_BLOCKS = require("./src/blocks/filtering.blocks");
const THRESHOLDING_BLOCKS = require("./src/blocks/thresholding.blocks");
const SOBEL_DERIVATIVES_BLOCKS = require("./src/blocks/sobel-derivatives.blocks");
const TRANSFORMATION_BLOCKS = require("./src/blocks/transformation.blocks");

Blockly.defineBlocksWithJsonArray([
  ...BASIC_BLOCKS,
  ...GEOMETRIC_BLOCKS,
  ...CONVERSIONS_BLOCKS,
  ...DRAWING_BLOCKS,
  ...BLURRING_BLOCKS,
  ...FILTERING_BLOCKS,
  ...THRESHOLDING_BLOCKS,
  ...SOBEL_DERIVATIVES_BLOCKS,
  ...TRANSFORMATION_BLOCKS,
]);
