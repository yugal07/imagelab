const { createLogger, LOG_LEVELS } = require("../../../src/helpers/logger");

describe("Logger", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = {
      log: jest.spyOn(console, "log").mockImplementation(),
      warn: jest.spyOn(console, "warn").mockImplementation(),
      error: jest.spyOn(console, "error").mockImplementation(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a logger with context prefix", () => {
    const logger = createLogger("Test");
    logger.error("test message");

    expect(consoleSpy.error).toHaveBeenCalledTimes(1);
    const args = consoleSpy.error.mock.calls[0];
    expect(args[0]).toContain("[Test]");
    expect(args[1]).toBe("test message");
  });

  it("should include timestamp in log output", () => {
    const logger = createLogger("Test");
    logger.error("test");

    const args = consoleSpy.error.mock.calls[0];
    // Timestamp format: YYYY-MM-DDTHH:MM:SS.mmmZ
    expect(args[0]).toMatch(/\d{4}-\d{2}-\d{2}T/);
  });

  it("should have all log level methods", () => {
    const logger = createLogger("Test");
    expect(typeof logger.debug).toBe("function");
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.warn).toBe("function");
    expect(typeof logger.error).toBe("function");
  });

  it("should export LOG_LEVELS constants", () => {
    expect(LOG_LEVELS.debug).toBe(0);
    expect(LOG_LEVELS.info).toBe(1);
    expect(LOG_LEVELS.warn).toBe(2);
    expect(LOG_LEVELS.error).toBe(3);
  });

  it("should pass additional arguments through", () => {
    const logger = createLogger("Test");
    const data = { operator: "GaussianBlur", step: 3 };
    logger.error("Pipeline failed", data);

    const args = consoleSpy.error.mock.calls[0];
    expect(args[2]).toBe(data);
  });
});
