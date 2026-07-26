import express from 'express';

export const createAuthRoutes = (authController) => {
  const router = express.Router();

  router.post('/login', authController.login.bind(authController));

  return router;
};
