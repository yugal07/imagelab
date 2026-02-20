const Dilation = require("../../../src/operator/filtering/Dilation");
const opencvMock = require("../opencv-mocks/filtering.mock");

describe("Dilation Operator", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should apply dilation with default parameters", () => {
    const operator = new Dilation("type", "id");
    operator.cv2 = opencvMock.cv2;

    const imageMock = "mockImageData";
    operator.compute(imageMock);

    expect(opencvMock.cv2.dilate).toHaveBeenCalledTimes(1);
    expect(opencvMock.cv2.Point).toHaveBeenCalledWith(-1, -1);
  });

  it("should apply dilation with custom iterations and point", () => {
    const operator = new Dilation("type", "id");
    operator.cv2 = opencvMock.cv2;

    operator.setParams("iteration", 5);
    operator.setParams("point_x", 1);
    operator.setParams("point_y", 2);

    const imageMock = "mockImageData";
    operator.compute(imageMock);

    expect(opencvMock.cv2.dilate).toHaveBeenCalledTimes(1);
    expect(opencvMock.cv2.Point).toHaveBeenCalledWith(1, 2);
  });
});
