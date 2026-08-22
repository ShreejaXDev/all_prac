const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[LOG] ${req.method} ${req.originalUrl || req.url} - ${timestamp}`);
  next();
};

module.exports = loggerMiddleware;
