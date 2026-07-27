import { Router } from "express";
import * as authCtl from "../controllers/auth_ctrls.js"

const authRouter = Router()
authRouter.post("/register", authCtl.register)

export default authRouter