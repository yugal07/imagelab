const GEOMETRIC_BLOCKS = [
  {
    type: "geometric_reflectimage",
    message0: "Reflect image in %1 direction",
    args0: [
      {
        type: "field_dropdown",
        name: "type",
        options: [
          ["X", "X"],
          ["Y", "Y"],
          ["Both", "Both"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Refelction produces a missror image like about and an axis of reflection. There are two type of reflection. One is x direction reflection and other is y direction reflection",
    helpUrl: "",
  },
  {
    type: "geometric_rotateimage",
    message0: "Rotate image with angle of %1 and rescale by %2",
    args0: [
      {
        type: "field_angle",
        name: "angle",
        angle: 90,
      },
      {
        type: "field_number",
        name: "scale",
        value: 1,
        min: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "This operator allows you to rotate an image to a specific angle. Moreover you can change angle and scale related to the rotation.",
    helpUrl: "",
  },
  {
    type: "geometric_affineimage",
    message0: "Affine Image",
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Image Affine Translation or shearing express in a materix form. It's a combination of shearing and reflection",
    helpUrl: "",
  },
  {
    type: "geometric_scaleimage",
    message0: "Scale Image by %1 in X axis and by %2 in Y axis",
    args0: [
      {
        type: "field_number",
        name: "fx",
        value: 1,
        min: 0,
      },
      {
        type: "field_number",
        name: "fy",
        value: 1,
        min: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip:
      "Image Affine Translation or shearing express in a materix form. It's a combination of shearing and reflection",
    helpUrl: "",
  },
];

if (typeof module !== "undefined") {
  module.exports = GEOMETRIC_BLOCKS;
}
