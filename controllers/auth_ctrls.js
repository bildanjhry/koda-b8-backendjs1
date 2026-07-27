import { constants } from "http2"
import { create } from "../models/users_models.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export function register(req, res){
    const {name, email, password} = req.body
    create({
        name:name,
        email:email,
        password:password
    })
    
    res.status(constants.HTTP_STATUS_CREATED).json({
        success:true,
        message:"Success Create Account",
        results: {
            name: name,
            email: email
        }
    })
}