const CannyEdge = require('../../../src/operator/filtering/CannyEdge');
const opencvMock = require('../opencv-mocks/filtering.mock');

describe('CannyEdge Operator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should apply Canny edge detection with default thresholds', () => {
    const operator = new CannyEdge('type', 'id');
    operator.cv2 = opencvMock.cv2;

    const imageMock = 'mockImageData';
    operator.compute(imageMock);

    expect(opencvMock.cv2.Canny).toHaveBeenCalledWith(
      imageMock,
      new opencvMock.cv2.Mat(),
      50,
      150
    );
  });

  it('should apply Canny edge detection with custom thresholds', () => {
    const operator = new CannyEdge('type', 'id');
    operator.cv2 = opencvMock.cv2;

    const imageMock = 'mockImageData';
    operator.setParams('threshold1', 100);
    operator.setParams('threshold2', 200);
    operator.compute(imageMock);

    expect(opencvMock.cv2.Canny).toHaveBeenCalledWith(
      imageMock,
      new opencvMock.cv2.Mat(),
      100,
      200
    );
  });

  it('should only update threshold1 when setting threshold1 param', () => {
    const operator = new CannyEdge('type', 'id');
    operator.cv2 = opencvMock.cv2;

    const imageMock = 'mockImageData';
    operator.setParams('threshold1', 80);
    operator.compute(imageMock);

    expect(opencvMock.cv2.Canny).toHaveBeenCalledWith(
      imageMock,
      new opencvMock.cv2.Mat(),
      80,
      150
    );
  });

  it('should only update threshold2 when setting threshold2 param', () => {
    const operator = new CannyEdge('type', 'id');
    operator.cv2 = opencvMock.cv2;

    const imageMock = 'mockImageData';
    operator.setParams('threshold2', 180);
    operator.compute(imageMock);

    expect(opencvMock.cv2.Canny).toHaveBeenCalledWith(
      imageMock,
      new opencvMock.cv2.Mat(),
      50,
      180
    );
  });
});
