const logger = {
  debug: (message) => console.log(`[home_feed_module] DEBUG: ${message}`),
  info: (message) => console.log(`[home_feed_module] INFO: ${message}`),
  warn: (message) => console.log(`[home_feed_module] WARN: ${message}`),
  error: (message) => console.log(`[home_feed_module] ERROR: ${message}`)
};

module.exports = logger;