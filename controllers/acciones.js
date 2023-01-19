const { request, response } = require("express");
const { Accion } = require("../models");


const getAcciones=async(req=request,res=response)=>{
    try {
        const {estado} =req.query;
        const acciones = await Accion.findAll({
            where:{
                estado
            }
        })
        res.json({
            ok:true,
            msg:'Se muestra con exito las acciones',
            acciones
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const getAccion=(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const postAccion=(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const putAccion=(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const deleteAccion=(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}


module.exports = {
    getAcciones,
    getAccion,
    postAccion,
    putAccion,
    deleteAccion
}