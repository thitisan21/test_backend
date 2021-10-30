import express from 'express';
import middleware from '../middlewares/middlewareValidate';
import * as controller from '../controllers/controllerUser';

const router = express.Router();

router.get("/user", controller.getUser)
router.post("/user", middleware.validateType, controller.createUser)
router.patch("/user", controller.updateUser)
router.delete("/user", controller.deleteUser)

export = router;