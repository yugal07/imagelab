/**
 * @module helpers/logger
 * @description Lightweight structured logging utility wrapping console with
 * log levels and contextual prefixes.
 */

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Default to "debug" in development, "warn" in production
const currentLevel =
  typeof process !== "undefined" && process.env.LOG_LEVEL
    ? process.env.LOG_LEVEL
    : typeof process !== "undefined" && process.argv?.includes("--dev")
      ? "debug"
      : "warn";

/**
 * Creates a logger instance with a contextual prefix.
 *
 * @param {string} context - The context label (e.g., "Pipeline", "Operator", "UI")
 * @returns {{ debug: Function, info: Function, warn: Function, error: Function }}
 *
 * @example
 * const logger = createLogger("Pipeline");
 * logger.info("Executing pipeline with 5 operators");
 * logger.error("Pipeline failed", { step: 2, error: err.message });
 */
function createLogger(context) {
  const prefix = `[${context}]`;

  function shouldLog(level) {
    return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
  }

  function formatArgs(args) {
    const timestamp = new Date().toISOString();
    return [`${timestamp} ${prefix}`, ...args];
  }

  return {
    debug(...args) {
      if (shouldLog("debug")) {
        console.log(...formatArgs(args));
      }
    },
    info(...args) {
      if (shouldLog("info")) {
        console.log(...formatArgs(args));
      }
    },
    warn(...args) {
      if (shouldLog("warn")) {
        console.warn(...formatArgs(args));
      }
    },
    error(...args) {
      if (shouldLog("error")) {
        console.error(...formatArgs(args));
      }
    },
  };
}

module.exports = { createLogger, LOG_LEVELS };
