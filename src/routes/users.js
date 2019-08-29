import { Router } from "express";
import controller from "../controllers/users_controller";
var router = Router();

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);

export default router;
