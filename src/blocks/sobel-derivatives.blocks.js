const SOBEL_DERIVATIVES_BLOCKS = [
  {
    type: "sobelderivatives_soblederivate",
    message0: "Apply  %1 sobel derivative with %2 depth",
    args0: [
      {
        type: "field_dropdown",
        name: "type",
        options: [
          ["Horizontal", "HORIZONTAL"],
          ["Vertical", "VERTICAL"],
          ["Both", "BOTH"],
        ],
      },
      {
        type: "field_number",
        name: "ddepth",
        value: 0,
        min: -10,
        max: 10,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 345,
    tooltip:
      "This operator allows you to detect edges of an image of both horizontal and vertaical direction Moreover it is a first order derivative.",
    helpUrl: "",
  },
  {
    type: "sobelderivatives_scharrderivate",
    message0: "Apply  %1 scharr derivative with %2 depth",
    args0: [
      {
        type: "field_dropdown",
        name: "type",
        options: [
          ["Horizontal", "HORIZONTAL"],
          ["Vertical", "VERTICAL"],
        ],
      },
      {
        type: "field_number",
        name: "ddepth",
        value: 0,
        min: -10,
        max: 10,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 345,
    tooltip:
      "This operator allows you to detect edges of an image in both horizontal and vertaical direction. Moreover it is a second order derivative.",
    helpUrl: "",
  },
];

if (typeof module !== "undefined") {
  module.exports = SOBEL_DERIVATIVES_BLOCKS;
}
