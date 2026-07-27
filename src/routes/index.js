import { Router } from "express";
import authRouter from "./auth_routes.js";
import usersRouter from "./users_routes.js"

const routes = Router()
routes.use("/auth", authRouter)
routes.use("/users", usersRouter)

export default routes