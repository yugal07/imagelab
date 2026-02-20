const MainController = require("../../../src/controller/main");

// Mock the registry operations module to avoid loading real opencv
jest.mock("../../../src/registry/operations", () => ({
  READIMAGE: "basic_readimage",
  WRITEIMAGE: "basic_writeimage",
  BLURIMAGE: "blurring_applyblur",
}));

// Mock the operator-registry to return simple mock operators
jest.mock("../../../src/registry/operator-registry", () => {
  const registry = new Map();

  class MockReadImage {
    constructor(type, id) {
      this.type = type;
      this.blockId = id;
    }
    compute(image) {
      return image;
    }
    setParams() {}
  }

  class MockBlur {
    constructor(type, id) {
      this.type = type;
      this.blockId = id;
    }
    compute(image) {
      return "blurred_" + image;
    }
    setParams(param, value) {
      this[param] = value;
    }
  }

  registry.set("basic_readimage", { key: "READIMAGE", OperatorClass: MockReadImage });
  registry.set("blurring_applyblur", { key: "BLURIMAGE", OperatorClass: MockBlur });

  return {
    create(blockType, id) {
      const entry = registry.get(blockType);
      if (entry) return new entry.OperatorClass(blockType, id);
      return null;
    },
    has(blockType) {
      return registry.has(blockType);
    },
    register() {},
    getOperationConstants() {
      return {};
    },
    clear() {},
  };
});

describe("MainController", () => {
  let controller;

  beforeEach(() => {
    controller = new MainController();
  });

  describe("addOperator", () => {
    it("should add a registered operator", () => {
      controller.addOperator("basic_readimage", "block1");
      // No error thrown means success
    });

    it("should silently ignore unregistered block types", () => {
      controller.addOperator("unknown_block", "block1");
      // Should not throw
    });
  });

  describe("deleteBlock", () => {
    it("should remove an operator by block ID", () => {
      controller.addOperator("basic_readimage", "block1");
      controller.addOperator("blurring_applyblur", "block2");
      controller.deleteBlock("block1");

      // After deleting readimage, computeAll should fail because first block isn't readimage
      expect(() => controller.computeAll()).toThrow("Read Image block is not added");
    });
  });

  describe("arrangeBlocks", () => {
    it("should reorder operators based on parent-child relationship", () => {
      controller.addOperator("basic_readimage", "block1");
      controller.addOperator("blurring_applyblur", "block2");

      // Rearranging to same order shouldn't break anything
      controller.arrangeBlocks("basic_readimage", "blurring_applyblur");

      controller.setOriginalImage("test_image");
      controller.computeAll();
      expect(controller.getProcessedImage()).toBe("blurred_test_image");
    });

    it("should handle missing parent/child gracefully", () => {
      controller.addOperator("basic_readimage", "block1");
      // Should not throw with unknown block types
      controller.arrangeBlocks("unknown_type", "basic_readimage");
    });
  });

  describe("computeAll", () => {
    it("should throw if no operators are added", () => {
      expect(() => controller.computeAll()).toThrow("No operators are added to the workspace");
    });

    it("should throw if first block is not ReadImage", () => {
      controller.addOperator("blurring_applyblur", "block1");
      expect(() => controller.computeAll()).toThrow("Read Image block is not added");
    });

    it("should throw if no image is set", () => {
      controller.addOperator("basic_readimage", "block1");
      expect(() => controller.computeAll()).toThrow("Image is not set");
    });

    it("should execute pipeline successfully", () => {
      controller.addOperator("basic_readimage", "block1");
      controller.addOperator("blurring_applyblur", "block2");
      controller.setOriginalImage("test_image");

      controller.computeAll();

      expect(controller.getProcessedImage()).toBe("blurred_test_image");
    });
  });

  describe("changeValuesOfBlocks", () => {
    it("should update operator params", () => {
      controller.addOperator("blurring_applyblur", "block1");
      // Should not throw
      controller.changeValuesOfBlocks("blurring_applyblur", "width", 5);
    });

    it("should silently ignore unknown block types", () => {
      controller.changeValuesOfBlocks("unknown_type", "param", "value");
      // Should not throw
    });
  });

  describe("resetTheWorkspace", () => {
    it("should clear all operators and image", () => {
      controller.addOperator("basic_readimage", "block1");
      controller.setOriginalImage("test_image");

      controller.resetTheWorkspace();

      expect(() => controller.computeAll()).toThrow("No operators are added to the workspace");
      expect(controller.getOriginalImage()).toBeNull();
    });
  });

  describe("getOriginalImage / setOriginalImage", () => {
    it("should store and retrieve the original image", () => {
      expect(controller.getOriginalImage()).toBeNull();
      controller.setOriginalImage("test_image");
      expect(controller.getOriginalImage()).toBe("test_image");
    });
  });

  describe("getProcessedImage", () => {
    it("should return null initially", () => {
      expect(controller.getProcessedImage()).toBeNull();
    });
  });
});
