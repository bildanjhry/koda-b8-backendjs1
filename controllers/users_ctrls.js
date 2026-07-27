import { constants } from "http2"
import { getAll, getDetail, delUser, putUser } from "../models/users_models.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export function getAvailUsers(req, res){
    const results = getAll()
    if (results.length < 1){
            res.status(constants.HTTP_STATUS_OK).json({
            success:true,
            message:"Users are empty",
        })
        return
    }
    res.status(constants.HTTP_STATUS_OK).json({
        success:true,
        message:"Success Get All Users",
        results: results
    })
}

export function getUserById(req, res){
    const id = req.params.id
    const results = getDetail(id)
    if(results.length < 1){
        res.status(constants.HTTP_STATUS_OK).json({
            succes:true,
            message:"User not found"
        })
    }
    res.status(constants.HTTP_STATUS_OK).json({
        success:true,
        message:"Success Get Detail",
        results: results
    })
}

export function deleteUser(req, res){
    const id = req.params.id
    const result = delUser(id)
    if (!result.succes){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            succes:result.succes,
            message:result.message
        })
    }
    res.status(constants.HTTP_STATUS_OK).json({
        success:true,
        message: "Success Delete Users",
    })
}

export function updateUser(req, res){
    const id = req.params.id
    const {name, email, password} = req.body
    const result = putUser(id, {
        name:name,
        email:email,
        password:password
    })
    if(!result.succes){
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
            success: false,
            message:result.message,
        })
        return
    }

    res.status(constants.HTTP_STATUS_OK).json({
        success: true,
        message:"Success Update User",
        results:result.result
    })
}