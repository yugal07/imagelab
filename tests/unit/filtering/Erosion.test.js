const Erosion = require("../../../src/operator/filtering/Erosion");
const opencvMock = require("../opencv-mocks/filtering.mock");

describe("Erosion Operator", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should apply erosion with default parameters", () => {
    const operator = new Erosion("type", "id");
    operator.cv2 = opencvMock.cv2;

    const imageMock = "mockImageData";
    operator.compute(imageMock);

    expect(opencvMock.cv2.erode).toHaveBeenCalledTimes(1);
    expect(opencvMock.cv2.Point).toHaveBeenCalledWith(-1, -1);
  });

  it("should apply erosion with custom iterations and point", () => {
    const operator = new Erosion("type", "id");
    operator.cv2 = opencvMock.cv2;

    operator.setParams("iteration", 3);
    operator.setParams("point_x", 2);
    operator.setParams("point_y", 3);

    const imageMock = "mockImageData";
    operator.compute(imageMock);

    expect(opencvMock.cv2.erode).toHaveBeenCalledTimes(1);
    expect(opencvMock.cv2.Point).toHaveBeenCalledWith(2, 3);
  });
});
