import express from "express";
import routes from "./src/routes/index.js";
import corsMiddleware from "./src/middlewares/cors.js";
const app = express()
app.use(express.urlencoded())
app.use(corsMiddleware)
app.use("/uploads", express.static("uploads/"))
app.use(routes)
const PORT = process.env.PORT || 8080
app.listen(8080, function(){
    console.log(`Listen port ${PORT}`)
})
