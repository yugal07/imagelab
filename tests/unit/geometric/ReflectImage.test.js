const ReflectImage = require("../../../src/operator/geometric/ReflectImage");
const opencvMock = require("../opencv-mocks/geometric.mock");

describe("ReflectImage Operator", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should flip image around X axis for direction X", () => {
    const operator = new ReflectImage("type", "id");
    operator.cv2 = opencvMock.cv2;

    const imageMock = "mockImageData";
    operator.setParams("type", "X");
    operator.compute(imageMock);

    expect(opencvMock.cv2.Mat).toHaveBeenCalledTimes(1);
    expect(opencvMock.cv2.flip).toHaveBeenCalledWith(imageMock, {}, 0);
  });

  it("should flip image around Y axis for direction Y", () => {
    const operator = new ReflectImage("type", "id");
    operator.cv2 = opencvMock.cv2;

    const imageMock = "mockImageData";
    operator.setParams("type", "Y");
    operator.compute(imageMock);

    expect(opencvMock.cv2.flip).toHaveBeenCalledWith(imageMock, {}, 1);
  });

  it("should flip image around both axes for direction Both", () => {
    const operator = new ReflectImage("type", "id");
    operator.cv2 = opencvMock.cv2;

    const imageMock = "mockImageData";
    operator.setParams("type", "Both");
    operator.compute(imageMock);

    expect(opencvMock.cv2.flip).toHaveBeenCalledWith(imageMock, {}, -1);
  });
});
