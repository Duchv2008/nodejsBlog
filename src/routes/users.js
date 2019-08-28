import { Router } from "express";
import controller from "../controllers/users_controller";
var router = Router();

router.get("/", controller.index);
// router.get("/:id", controller.show);

export default router;
