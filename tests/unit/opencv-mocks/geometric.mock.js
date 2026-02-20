module.exports = {
  cv2: {
    Mat: jest.fn(),
    getRotationMatrix2D: jest.fn(),
    warpAffine: jest.fn(),
    resize: jest.fn(),
    flip: jest.fn(),
    matFromArray: jest.fn(),
    Size: jest.fn((width, height) => ({ width, height })),
    Scalar: jest.fn((...args) => args),
    Point: jest.fn((x, y) => ({ x, y })),
  },
};
