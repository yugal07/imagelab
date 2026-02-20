const DrawArrowLine = require("../../../src/operator/drawing/DrawArrowLine");
const opencvMock = require("../opencv-mocks/drawing.mock");

describe("DrawArrowLine Operator", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should draw an arrowed line with given parameters", () => {
    const operator = new DrawArrowLine("type", "id");
    operator.cv2 = opencvMock.cv2;

    const imageMock = "mockImageData";

    operator.setParams("thickness", 3);
    operator.setParams("rgbcolors_input", "#00FF00");
    operator.setParams("starting_point_x", 10);
    operator.setParams("starting_point_y", 20);
    operator.setParams("ending_point_x", 100);
    operator.setParams("ending_point_y", 200);

    operator.compute(imageMock);

    expect(opencvMock.cv2.Point).toHaveBeenCalledTimes(2);
    expect(opencvMock.cv2.arrowedLine).toHaveBeenCalledWith(
      imageMock,
      { x: 10, y: 20 },
      { x: 100, y: 200 },
      [0, 255, 0, 255],
      3
    );
  });
});
