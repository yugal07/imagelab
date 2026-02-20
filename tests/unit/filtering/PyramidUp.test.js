const PyramidUp = require("../../../src/operator/filtering/PyramidUp");
const opencvMock = require("../opencv-mocks/filtering.mock");

describe("PyramidUp Operator", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should apply pyramid up with doubled dimensions", () => {
    const operator = new PyramidUp("type", "id");
    operator.cv2 = opencvMock.cv2;

    const imageMock = { rows: 100, cols: 200 };
    operator.compute(imageMock);

    expect(opencvMock.cv2.Size).toHaveBeenCalledWith(400, 200);
    expect(opencvMock.cv2.pyrUp).toHaveBeenCalledTimes(1);
  });
});
