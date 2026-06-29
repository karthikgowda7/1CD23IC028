function log(level, message, meta = {}) {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
}

module.exports = {
  info(message, meta = {}) {
    console.log(log("INFO", message, meta));
  },

  error(message, meta = {}) {
    console.log(log("ERROR", message, meta));
  },
};