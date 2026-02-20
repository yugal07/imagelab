const BLURRING_BLOCKS = [
  {
    type: "blurring_applyblur",
    message0: "Apply Blur with width %1 , height %2 %3 from point x %4 and y %5",
    args0: [
      {
        type: "field_number",
        name: "widthSize",
        value: 3,
        min: 0,
      },
      {
        type: "field_number",
        name: "heightSize",
        value: 3,
        min: 0,
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "pointX",
        value: -1,
      },
      {
        type: "field_number",
        name: "pointY",
        value: -1,
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 75,
    tooltip:
      "This operations allows you to apply simple blur effects to your image. You can change size and point properties to change the blur effect.",
    helpUrl: "",
  },
  {
    type: "blurring_applygaussianblur",
    message0: "Apply gaussian Blur with width %1 , height %2",
    args0: [
      {
        type: "field_number",
        name: "widthSize",
        value: 1,
        min: 1,
      },
      {
        type: "field_number",
        name: "heightSize",
        value: 1,
        min: 1,
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 75,
    tooltip: "This operations allows you to apply gaussian blur effects to your image.",
    helpUrl: "",
  },
  {
    type: "blurring_applymedianblur",
    message0: "Apply median Blur with kernel value of %1",
    args0: [
      {
        type: "field_number",
        name: "kernelSize",
        value: 5,
        min: 1,
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 75,
    tooltip: "This operations allows you to apply gaussian blur effects to your image.",
    helpUrl: "",
  },
];

if (typeof module !== "undefined") {
  module.exports = BLURRING_BLOCKS;
}
