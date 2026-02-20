module.exports = {
  cv2: {
    Mat: jest.fn(),
    circle: jest.fn(),
    ellipse: jest.fn(),
    line: jest.fn(),
    arrowedLine: jest.fn(),
    rectangle: jest.fn(),
    putText: jest.fn(),
    Point: jest.fn((x, y) => ({ x, y })),
    Size: jest.fn((width, height) => ({ width, height })),
  },
};
