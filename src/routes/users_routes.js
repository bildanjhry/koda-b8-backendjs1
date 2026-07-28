import { Router } from "express";
import * as userCtl from "../controllers/users_ctrls.js"
import authMiddleware from "../middlewares/auth.js";
import uploadMiddleware from "../middlewares/upload.js";

const usersRouter = Router()
usersRouter.use(authMiddleware)
usersRouter.get("", userCtl.getAvailUsers)
usersRouter.get("/:id", userCtl.getUserById)
usersRouter.delete("/:id", userCtl.deleteUser)
usersRouter.put("/:id", userCtl.updateUser)
usersRouter.put("/:id/upload", uploadMiddleware("file"), userCtl.updload)

export default usersRouter