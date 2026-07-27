import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { getServiceUrl } from '../../../shared/registry/index.js';

export const createTargetProxy = (serviceName, displayName) => {
  return createProxyMiddleware({
    target: 'http://localhost:1111', // Fallback target
    changeOrigin: true,
    // Re-add the /api prefix: Express strips it when sub-routing, but
    // downstream services expect the full /api/* path.
    pathRewrite: (path) => `/api${path}`,
    router: async (req) => {
      const url = await getServiceUrl(serviceName);
      if (!url) {
        throw new Error(`Service ${serviceName} not found in registry`);
      }
      console.log('url', url);
      return url;
    },
    // Event listeners in v3.x are nested inside 'on'
    on: {
      proxyReq: fixRequestBody,
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