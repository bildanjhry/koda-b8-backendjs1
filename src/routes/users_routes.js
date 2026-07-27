import { Router } from "express";
import * as userCtl from "../controllers/users_ctrls.js"

const usersRouter = Router()
usersRouter.get("", userCtl.getAvailUsers)
usersRouter.get("/:id", userCtl.getUserById)
usersRouter.delete("/:id", userCtl.deleteUser)
usersRouter.put("/:id", userCtl.updateUser)

export default usersRouter