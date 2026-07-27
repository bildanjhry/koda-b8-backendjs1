import { constants } from "http2"
import { create } from "../models/users_models.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export function register(req, res){
    const {name, email, password} = req.body
    const response = create({
        name:name,
        email:email,
        password:password
    })
    
    if(!response) {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success:false,
            message:"Email already being used"
        })
        return
    }

    res.status(constants.HTTP_STATUS_CREATED).json({
        success:true,
        message:"Success Create Account",
        results: {
            name: name,
            email: email
        }
    })
}