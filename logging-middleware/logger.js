export const logger = {
  info: (message, meta = {}) => {
    console.info(
      JSON.stringify({
        level: "INFO",
        timestamp: new Date().toISOString(),
        message,
        meta,
      })
    );
  },

  error: (message, meta = {}) => {
    console.error(
      JSON.stringify({
        level: "ERROR",
        timestamp: new Date().toISOString(),
        message,
        meta,
      })
    );
  },
};