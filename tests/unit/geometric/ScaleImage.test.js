const ScaleImage = require("../../../src/operator/geometric/ScaleImage");
const opencvMock = require("../opencv-mocks/geometric.mock");

describe("ScaleImage Operator", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should process resize function with given parameters", () => {
    const operator = new ScaleImage("type", "id");
    operator.cv2 = opencvMock.cv2;

    // Use asymmetric dimensions to catch axis swap bugs
    const imageMock = {
      rows: 20,
      cols: 30,
    };

    operator.setParams("fx", 1.5); // Set the x-axis scale
    operator.setParams("fy", 0.8); // Set the y-axis scale

    operator.compute(imageMock);

    expect(opencvMock.cv2.Mat).toHaveBeenCalledTimes(1);
    // Size(width, height) = Size(cols * fx, rows * fy)
    expect(opencvMock.cv2.Size).toHaveBeenCalledWith(
      Math.round(imageMock.cols * 1.5),
      Math.round(imageMock.rows * 0.8)
    );
    expect(opencvMock.cv2.resize).toHaveBeenCalledWith(
      imageMock,
      {},
      { width: 45, height: 16 },
      1.5,
      0.8,
      opencvMock.cv2.INTER_AREA
    );
  });

  // Add more test cases as needed
});
