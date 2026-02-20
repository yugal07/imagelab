const PyramidDown = require("../../../src/operator/filtering/PyramidDown");
const opencvMock = require("../opencv-mocks/filtering.mock");

describe("PyramidDown Operator", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should apply pyramid down", () => {
    const operator = new PyramidDown("type", "id");
    operator.cv2 = opencvMock.cv2;

    const imageMock = { rows: 100, cols: 200 };
    operator.compute(imageMock);

    expect(opencvMock.cv2.Size).toHaveBeenCalledWith(400, 200);
    expect(opencvMock.cv2.pyrDown).toHaveBeenCalledTimes(1);
  });
});
