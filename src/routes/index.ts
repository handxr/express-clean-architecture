import { Router } from 'express';
import { IndexController } from '../controllers/index';

export function setRoutes(app: any) {
  const router: Router = Router();
  const indexController: IndexController = new IndexController();

  router.get('/', indexController.getIndex);

  app.use('/', router);
}