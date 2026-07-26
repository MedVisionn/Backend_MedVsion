import { createProxyMiddleware } from 'http-proxy-middleware';
import { getServiceUrl } from '../../../shared/registry/index.js';

export const createTargetProxy = (serviceName, displayName) => {
  return createProxyMiddleware({
    // A dummy target must be provided, we will override it via router
    target: 'http://localhost:1111', 
    changeOrigin: true,
    router: async (req) => {
      const url = await getServiceUrl(serviceName);
      if (!url) {
        throw new Error(`Service ${serviceName} not found in registry`);
      }
      return url;
    },
    onError: (err, req, res) => {
      console.error(`[API Gateway] Proxy Error (${displayName} Service):`, err.message);
      if (!res.headersSent) {
          res.status(502).json({ success: false, message: `${displayName} Service is unavailable or not registered` });
      }
    }
  });
};
