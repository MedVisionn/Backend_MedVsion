export const errorHandler = (err, req, res, next) => {
  console.error('[API Gateway] Error:', err.message);
  res.status(502).json({ success: false, message: 'Gateway Error' });
};
