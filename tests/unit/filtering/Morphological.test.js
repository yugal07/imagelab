const Morphological = require("../../../src/operator/filtering/Morphological");
const opencvMock = require("../opencv-mocks/filtering.mock");

describe("Morphological Operator", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should apply TOPHAT morphological operation (default)", () => {
    const operator = new Morphological("type", "id");
    operator.cv2 = opencvMock.cv2;

    const imageMock = "mockImageData";
    operator.compute(imageMock);

    expect(opencvMock.cv2.cvtColor).toHaveBeenCalledTimes(1);
    expect(opencvMock.cv2.morphologyEx).toHaveBeenCalledWith(
      imageMock,
      expect.anything(),
      opencvMock.cv2.MORPH_TOPHAT,
      expect.anything()
    );
  });

  it("should apply OPEN morphological operation", () => {
    const operator = new Morphological("type", "id");
    operator.cv2 = opencvMock.cv2;

    operator.setParams("type", "OPEN");

    const imageMock = "mockImageData";
    operator.compute(imageMock);

    expect(opencvMock.cv2.morphologyEx).toHaveBeenCalledTimes(1);
  });

  it("should apply CLOSE morphological operation", () => {
    const operator = new Morphological("type", "id");
    operator.cv2 = opencvMock.cv2;

    operator.setParams("type", "CLOSE");

    const imageMock = "mockImageData";
    operator.compute(imageMock);

    expect(opencvMock.cv2.morphologyEx).toHaveBeenCalledWith(
      imageMock,
      expect.anything(),
      opencvMock.cv2.MORPH_CLOSE,
      expect.anything()
    );
  });

  it("should apply GRADIENT morphological operation", () => {
    const operator = new Morphological("type", "id");
    operator.cv2 = opencvMock.cv2;

    operator.setParams("type", "GRADIENT");

    const imageMock = "mockImageData";
    operator.compute(imageMock);

    expect(opencvMock.cv2.cvtColor).toHaveBeenCalledTimes(1);
    expect(opencvMock.cv2.morphologyEx).toHaveBeenCalledTimes(1);
  });
});
