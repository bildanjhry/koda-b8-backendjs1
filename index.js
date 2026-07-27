import express from "express";
import routes from "./routes/index.js";
const app = express()
app.use(express.urlencoded())
app.use(routes)
app.listen(8080, function(){
    console.log("Listen port 8080")
})