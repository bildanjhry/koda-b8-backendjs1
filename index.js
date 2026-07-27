import express from "express";
import routes from "./routes/index.js";
const app = express()
app.use(express.urlencoded())
app.use(routes)
const PORT = process.env.PORT || 8080
app.listen(8080, function(){
    console.log(`Listen port ${PORT}`)
})


