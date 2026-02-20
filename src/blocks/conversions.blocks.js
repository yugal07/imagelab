const CONVERSIONS_BLOCKS = [
  {
    type: "imageconvertions_grayimage",
    message0: "Gray the image",
    previousStatement: null,
    nextStatement: null,
    colour: 315,
    tooltip: "This operations allows you to convert your image into a gray image.",
    helpUrl: "",
  },
  {
    type: "imageconvertions_colormaps",
    message0: "Color map image with %1 filter",
    args0: [
      {
        type: "field_dropdown",
        name: "type",
        options: [
          ["Hot", "HOT"],
          ["Autumn", "AUTUMN"],
          ["Bone", "BONE"],
          ["Cool", "COOL"],
          ["HSV", "HSV"],
          ["JET", "JET"],
          ["Ocean", "OCEAN"],
          ["Parula", "PARULA"],
          ["Piink", "PINK"],
          ["Rainbow", "RAINBOW"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 315,
    tooltip:
      "Color maps can apply different color maps to an image using this method. OpenCV caters various other types All these types are represents by predefined static fields(fixed values).",
    helpUrl: "",
  },
  {
    type: "imageconvertions_colortobinary",
    message0:
      "Convert colored image to a binary one %1 by %2 type %3 with threshold value  %4 and max value  %5 ",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_dropdown",
        name: "thresholdType",
        options: [
          ["Threshold Binary", "threshold_binary"],
          ["Threshold Binary Inv", "threshold_binary_inv"],
        ],
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "thresholdValue",
        value: 0,
        min: 0,
      },
      {
        type: "field_number",
        name: "maxValue",
        value: 0,
        min: 0,
      },
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 315,
    tooltip:
      "This operations allows you to convert your colored (RGB) images into a binary image. Moreover, you can adjust the conversion threshold values and the threshold  type as well.",
    helpUrl: "",
  },
  {
    type: "imageconvertions_graytobinary",
    message0:
      "Convert grayscale image to a binary one %1 with threshold value  %2 and max value  %3 ",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "thresholdValue",
        value: 0,
        min: 0,
      },
      {
        type: "field_number",
        name: "maxValue",
        value: 0,
        min: 0,
      },
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 315,
    tooltip:
      "This operations allows you to convert your grayscale image into a binary image. Moreover, you can adjust the conversion threshold values as well.",
    helpUrl: "",
  },
];

if (typeof module !== "undefined") {
  module.exports = CONVERSIONS_BLOCKS;
}
