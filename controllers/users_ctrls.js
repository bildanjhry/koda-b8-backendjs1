import { constants } from "http2"
import express from "express"
import { getAll, getDetail } from "../models/users_modes.js"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export function getAvailUsers(req, res){
    const results = getAll()
    res.status(constants.HTTP_STATUS_ACCEPTED).json({
        success:true,
        message:"Success Get All Users",
        results: results
    })
}

export function getUserById(req, res){
    const id = req.params.id
    const results = getDetail(id)
    res.status(constants.HTTP_STATUS_ACCEPTED).json({
        success:true,
        message:"Success Get Detail",
        results: results
    })
}

export function deleteUser(req, res){
    const id = req.params.id
    console.log(req.params)
    const result = deleteUser(id)
    res.status(HTT_STATUS_OK).json({
        success:true,
        message: "Success Delete Users",
    })
}