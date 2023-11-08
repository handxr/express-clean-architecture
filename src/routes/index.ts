import { Application, Router } from "express";
import { IndexController } from "../controllers/index";

export function setRoutes(app: Application) {
  const router: Router = Router();
  const indexController: IndexController = new IndexController();

  router.get("/", indexController.getIndex);
  router.get("/posts", indexController.getPosts);

  app.use("/", router);
}
