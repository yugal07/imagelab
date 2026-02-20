const BASIC_BLOCKS = [
  {
    type: "browse_file",
    message0: " %1",
    args0: [
      {
        name: "file_browse",
        type: "field_image",
        src: "./assets/icons/image-plus.png",
        width: 40,
        height: 40,
        alt: "*",
        flipRtl: false,
      },
    ],
    output: "browse_file",
    colour: 160,
    tooltip: "Choose an image",
    helpUrl: "",
    extensions: ["file_button"],
  },
  {
    type: "browse_folder",
    message0: " %1",
    args0: [
      {
        name: "folder_browse",
        type: "field_image",
        src: "./assets/icons/folder-plus.png",
        width: 40,
        height: 40,
        alt: "*",
        flipRtl: false,
      },
    ],
    output: "browse_folder",
    colour: 160,
    tooltip: "Choose output folder",
    helpUrl: "",
    extensions: ["folder_button"],
  },
  {
    type: "basic_readimage",
    id: "1",
    message0: "Read image %1",
    args0: [
      {
        type: "input_value",
        id: "1",
        name: "imageURL",
        check: "browse_file",
      },
    ],
    nextStatement: null,
    colour: 160,
    tooltip:
      "This operator helps you to read an image file and convert it to an OpenCV Mat object.",
    helpUrl: "",
  },
  {
    type: "basic_writeimage",
    message0: "Write image",
    previousStatement: null,
    colour: 160,
    tooltip: "This operator allows you to save your processed image as a file.",
    helpUrl: "",
  },
];

if (typeof module !== "undefined") {
  module.exports = BASIC_BLOCKS;
}
