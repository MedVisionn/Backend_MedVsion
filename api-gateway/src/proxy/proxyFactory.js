import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { getServiceUrl } from '../../../shared/registry/index.js';

export const createTargetProxy = (serviceName, displayName) => {
  return createProxyMiddleware({
    target: 'http://localhost:1111', // Fallback target
    changeOrigin: true,
    // Re-add the /api prefix or original path using req.originalUrl so that 
    // downstream services receive the exact same path the gateway was called with.
    pathRewrite: (path, req) => req.originalUrl,
    router: async (req) => {
      const url = await getServiceUrl(serviceName);
      if (!url) {
        throw new Error(`Service ${serviceName} not found in registry`);
      }
      return url;
    },
    // Event listeners in v3.x are nested inside 'on'
    on: {
      proxyReq: (proxyReq, req, res, options) => {
        fixRequestBody(proxyReq, req, res, options);
        if (req.user) {
          if (req.user.id) proxyReq.setHeader('X-User-Id', req.user.id);
          if (req.user.role) proxyReq.setHeader('X-User-Role', req.user.role);
          if (req.user.email) proxyReq.setHeader('X-User-Email', req.user.email);
        }
      },
      error: (err, req, res) => {
        console.error(`[API Gateway] Proxy Error (${displayName} Service):`, err.message);
        if (!res.headersSent) {
          res.status(502).json({
            success: false,
            message: `${displayName} Service is unavailable or not registered`
          });
        }
      }
    }
  });
};