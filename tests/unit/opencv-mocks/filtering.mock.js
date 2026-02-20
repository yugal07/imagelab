const opencvMock = {
  cv2: {
    Mat: class MatMock {
      constructor(rows, cols) {
        this.rows = rows || 0;
        this.cols = cols || 0;
      }

      // Mock implementation of the ones method
      static ones(rows, cols, type) {
        return new MatMock(rows, cols);
      }
    },
    bilateralFilter: jest.fn(),
    cvtColor: jest.fn(),
    boxFilter: jest.fn(),
    erode: jest.fn(),
    dilate: jest.fn(),
    morphologyEx: jest.fn(),
    pyrUp: jest.fn(),
    pyrDown: jest.fn(),
    Size: jest.fn((width, height) => ({ width, height })),
    Point: jest.fn((x, y) => ({ x, y })),
    BORDER_CONSTANT: 1,
    BORDER_DEFAULT: 4,
    CV_8U: 0,
    MORPH_OPEN: 2,
    MORPH_CLOSE: 3,
    MORPH_GRADIENT: 4,
    MORPH_TOPHAT: 5,
    MORPH_BLACKHAT: 6,
    COLOR_RGBA2RGB: 3,
    morphologyDefaultBorderValue: jest.fn(),
  },
};
module.exports = opencvMock;
