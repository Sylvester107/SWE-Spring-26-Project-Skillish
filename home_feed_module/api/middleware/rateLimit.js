const limits = {}; // In-memory rate limiting: userId -> { count, resetTime }

const WINDOW_MS = 3600000; // 1 hour
const MAX_REQUESTS = 100; // Max requests per window

module.exports = (req, res, next) => {
  const userId = req.userId;
  const now = Date.now();

  if (!limits[userId]) {
    limits[userId] = { count: 0, resetTime: now + WINDOW_MS };
  }

  if (now > limits[userId].resetTime) {
    limits[userId] = { count: 0, resetTime: now + WINDOW_MS };
  }

  if (limits[userId].count >= MAX_REQUESTS) {
    return res.status(429).json({ error: 'Rate limit exceeded. Try again later.' });
  }

  limits[userId].count++;
  next();
};