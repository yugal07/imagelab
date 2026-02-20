const FILTERING_BLOCKS = [
  {
    type: "filtering_boxfilter",
    message0: "Apply box filter with width %1 %2 , height %3 , depth %4 , pointX %5 , pointY %6",
    args0: [
      {
        type: "field_number",
        name: "width",
        value: 50,
        min: 0,
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "height",
        value: 50,
        min: 0,
      },
      {
        type: "field_number",
        name: "depth",
        value: 5,
        min: 0,
      },
      {
        type: "field_number",
        name: "point_x",
        value: -1,
      },
      {
        type: "field_number",
        name: "point_y",
        value: -1,
      },
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 135,
    tooltip:
      "This operations allows you to apply simple box filter effects to your image. You can change size and point properties to change the blur effect.",
    helpUrl: "",
  },
  {
    type: "filtering_dilation",
    message0: "Apply dilation with %1 iterations %2 , pointX %3, pointY %4",
    args0: [
      {
        type: "field_number",
        name: "iteration",
        value: 1,
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "point_x",
        value: -1,
      },
      {
        type: "field_number",
        name: "point_y",
        value: -1,
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 135,
    tooltip:
      "This Filter operation allows convolution with some kernel of a specific shape such as a square or a circle the size of an object in white shade or bright shade increases. while the size of an object in black shade or dark shade decreases",
    helpUrl: "",
  },
  {
    type: "filtering_erosion",
    message0: "Apply erosion with %1 iterations %2 , pointX %3, pointY %4",
    args0: [
      {
        type: "field_number",
        name: "iteration",
        value: 1,
        min: 0,
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "point_x",
        value: -1,
      },
      {
        type: "field_number",
        name: "point_y",
        value: -1,
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 135,
    tooltip:
      "Erosion is quite a similar process as dilation. With this procedure the areas of dark regions grow in size and bright regions reduce. The size of an object in white shade or bright shade increases. while it decreases in white shade or bright shade",
    helpUrl: "",
  },
  {
    type: "filtering_bilateral",
    message0: "Apply bilateral  %1 no. of iterations %2 %3 Sigma color %4 %5 Sigma space %6",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "filterSize",
        value: 5,
        min: 0,
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "sigmaColor",
        value: 75,
        min: 0,
      },
      {
        type: "input_dummy",
      },
      {
        type: "field_number",
        name: "sigmaSpace",
        value: 75,
        min: 0,
      },
    ],
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 135,
    tooltip:
      "This Filter can reduce unwanted noise very well while keeping edges fairly sharpe ,It is very slow compared to most filters Sigma Values: If they are small(<10), filter will not have much effect. whereas if they are large(>150), they will have a very strong effect, making image look cartoonish.",
    helpUrl: "",
  },
  {
    type: "filtering_pyramidup",
    message0: "Pyramid up",
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 135,
    tooltip:
      "This Filter operation allows Pyramid, or pyramid representation, is a type of multi scale signal reprsenatation in which a signal or an image is subject to repeated smooted and subsampling you to apply pyramid up effect to your image. image is initially up-sampled and then blurred from this filter. use scaler to up sampled the image.",
    helpUrl: "",
  },
  {
    type: "filtering_pyramiddown",
    message0: "Pyramid down",
    inputsInline: false,
    previousStatement: null,
    nextStatement: null,
    colour: 135,
    tooltip:
      "This Filter operation allows Pyramid, or pyramid representation, is a type of multi scale signal reprsenatation in which a signal or an image is subject to repeated smooted and subsampling you to apply pyramid up effect to your image. image is initially up-sampled and then blurred from this filter. use scaler to up sampled the image.",
    helpUrl: "",
  },
  {
    type: "filtering_morphological",
    message0: "Apply morphological with %1 filter",
    args0: [
      {
        type: "field_dropdown",
        name: "type",
        options: [
          ["Tophat", "TOPHAT"],
          ["Close", "CLOSE"],
          ["Gradient", "GRADIENT"],
          ["Black hat", "BLACKHAT"],
          ["Open", "OPEN"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 135,
    tooltip:
      "This Filter operation allows convolution with some kernel of a specific shape such as a square or a circle the size of an object in white shade or bright shade increases. while the size of an object in black shade or dark shade decreases",
    helpUrl: "",
  },
];

if (typeof module !== "undefined") {
  module.exports = FILTERING_BLOCKS;
}
