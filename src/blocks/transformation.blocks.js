const TRANSFORMATION_BLOCKS = [
  {
    type: "transformation_distance",
    message0: "Apply  %1 distance with %2 depth",
    args0: [
      {
        type: "field_dropdown",
        name: "type",
        options: [
          ["DISTC", "DIST_C"],
          ["DISTL1", "DIST_L1"],
          ["DISTL2", "DIST_L2"],
          ["DISTLABEL_PIXEL", "DIST_LABEL_PIXEL"],
          ["DISTMASK_3", "DIST_MASK_3"],
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
    colour: 195,
    tooltip:
      "Distance Transformation generally takes binary images as inputs. In this operation,the gray level intensities of the points inside the foreground regions are changed to distance their respective distances from the closest 0 value.",
    helpUrl: "",
  },
  {
    type: "transformation_laplacian",
    message0: "Apply laplacian with %1 depth",
    args0: [
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
    colour: 195,
    tooltip:
      "Laplacian Transformation is also a derivative which is used to find edges in an image.It is a second order derivative mask.Moreover, there are two classifications: Positive Laplacian and Negative Laplacian.Unlike other operators, Laplacian doesn't take out edges in any particular direction, but it takes out edges in inward edges and outward edges.",
    helpUrl: "",
  },
];

if (typeof module !== "undefined") {
  module.exports = TRANSFORMATION_BLOCKS;
}
