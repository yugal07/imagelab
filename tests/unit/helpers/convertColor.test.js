const { hexToRgb } = require("../../../src/helpers/convertColor");

describe("hexToRgb", () => {
  it("should convert hex color to RGB object", () => {
    expect(hexToRgb("#FF0000")).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb("#00FF00")).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb("#0000FF")).toEqual({ r: 0, g: 0, b: 255 });
  });

  it("should handle hex without hash prefix", () => {
    expect(hexToRgb("FF0000")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("should handle mixed case hex", () => {
    expect(hexToRgb("#ff8800")).toEqual({ r: 255, g: 136, b: 0 });
    expect(hexToRgb("#FF8800")).toEqual({ r: 255, g: 136, b: 0 });
  });

  it("should return null for invalid hex", () => {
    expect(hexToRgb("not-a-color")).toBeNull();
    expect(hexToRgb("")).toBeNull();
  });

  it("should convert black and white", () => {
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("#FFFFFF")).toEqual({ r: 255, g: 255, b: 255 });
  });
});
