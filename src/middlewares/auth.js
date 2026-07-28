import { constants } from "http2"

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res
 * @param {function()} next  
 */
export default function authMiddleware(req, res, next) {
    if (req.method === "OPTIONS") {
        return next();
    }
    const auth = req.header("Authorization")
    if (auth !== "Allow") {
        res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
            success: false,
            message: "Unauthorized"
        })
        return
    }
    next()
}