import { constants } from "http2"

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {function()} next
 */

export default function corsMiddleware(req, res, next) {
    const url = "http://localhost:5173"
    res.setHeader("Access-Control-Allow-Origin", url)
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    if (req.method === "OPTIONS"){
        res.sendStatus(constants.HTTP_STATUS_NO_CONTENT)
    }
    next()
}