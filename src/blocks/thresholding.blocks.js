const THRESHOLDING_BLOCKS = [
  {
    type: "thresholding_applyborders",
    message0: "Apply borders  %1",
    args0: [
      {
        type: "input_value",
        name: "border",
        check: ["border_for_all", "border_each_side"],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip:
      "This effect adds a border around the given image. You can set the top, bottom, left and right border sizes from the properties.",
    helpUrl: "",
  },
  {
    type: "thresholding_adaptivethreshold",
    message0: "Apply adaptive threshold with max value %1",
    args0: [
      {
        type: "field_number",
        name: "maxValue",
        value: 0,
        min: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip:
      "Adaptive thresholding is the method where the threshold value is calculated for smaller regions and therefore, there will be different threshold values for different regions",
    helpUrl: "",
  },
  {
    type: "thresholding_applythreshold",
    message0: "Apply simple threshold with max value %1 and threshold value %2",
    args0: [
      {
        type: "field_number",
        name: "maxValue",
        value: 0,
        min: 0,
      },
      {
        type: "field_number",
        name: "thresholdValue",
        value: 0,
        min: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 270,
    tooltip:
      "Thresholding is a method of image segmentation, in general it is used to create binary images. You can change the threshold value from the properties as well as you can assign a max value.",
    helpUrl: "",
  },
  {
    type: "border_for_all",
    message0: "with thickness %1",
    args0: [
      {
        type: "field_number",
        name: "border_all_sides",
        value: 2,
        min: 0,
      },
    ],
    output: "border_for_all",
    colour: 270,
    tooltip: "",
    helpUrl: "",
  },
  {
    type: "border_each_side",
    lastDummyAlign0: "CENTRE",
    message0: "with thickness %1 %2 %3 %4 %5 %6 %7",
    args0: [
      {
        type: "input_dummy",
        align: "CENTRE",
      },
      {
        type: "field_number",
        name: "borderTop",
        value: 2,
        min: 0,
      },
      {
        type: "input_dummy",
        align: "CENTRE",
      },
      {
        type: "field_number",
        name: "borderLeft",
        value: 2,
        min: 0,
      },
      {
        type: "field_number",
        name: "borderRight",
        value: 2,
        min: 0,
      },
      {
        type: "input_dummy",
        align: "CENTRE",
      },
      {
        type: "field_number",
        name: "borderBottom",
        value: 2,
        min: 0,
      },
    ],
    inputsInline: false,
    output: "border_each_side",
    colour: 270,
    tooltip: "",
    helpUrl: "",
  },
];

if (typeof module !== "undefined") {
  module.exports = THRESHOLDING_BLOCKS;
}
