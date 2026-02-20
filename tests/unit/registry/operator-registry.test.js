const OperatorRegistry = require("../../../src/registry/operator-registry");

class MockOperator {
  constructor(type, id) {
    this.type = type;
    this.blockId = id;
  }
}

describe("OperatorRegistry", () => {
  afterEach(() => {
    OperatorRegistry.clear();
  });

  it("should register and create an operator", () => {
    OperatorRegistry.register("test_block", "TEST", MockOperator);

    const operator = OperatorRegistry.create("test_block", "block1");
    expect(operator).toBeInstanceOf(MockOperator);
    expect(operator.type).toBe("test_block");
    expect(operator.blockId).toBe("block1");
  });

  it("should return null for unregistered block types", () => {
    const operator = OperatorRegistry.create("unknown_block", "block1");
    expect(operator).toBeNull();
  });

  it("should check if a block type is registered", () => {
    OperatorRegistry.register("test_block", "TEST", MockOperator);

    expect(OperatorRegistry.has("test_block")).toBe(true);
    expect(OperatorRegistry.has("unknown_block")).toBe(false);
  });

  it("should return operation constants map", () => {
    OperatorRegistry.register("test_block1", "TEST1", MockOperator);
    OperatorRegistry.register("test_block2", "TEST2", MockOperator);

    const constants = OperatorRegistry.getOperationConstants();
    expect(constants).toEqual({
      TEST1: "test_block1",
      TEST2: "test_block2",
    });
  });
});
