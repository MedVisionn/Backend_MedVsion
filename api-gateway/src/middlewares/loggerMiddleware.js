export const loggerMiddleware = (req, res, next) => {
  console.log(`[API Gateway] ${req.method} ${req.url}`);
  next();
};
