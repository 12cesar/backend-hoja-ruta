const { request, response } = require("express");
const { Prioridad } = require("../models");


const getPrioridades=async(req=request,res=response)=>{
    try {
        const {estado}= req.query;
        const prioridad =  await Prioridad.findAll({
            where:{
                estado
            }
        })
        res.json({
            ok:true,
            msg:'Se muestran las prioridades con exito',
            prioridad
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const getPrioridad=(req=request,res=response)=>{
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
const postPrioridad=(req=request,res=response)=>{
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
const putPrioridad=(req=request,res=response)=>{
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
const deletePrioridad=(req=request,res=response)=>{
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
    getPrioridades,
    getPrioridad,
    postPrioridad,
    putPrioridad,
    deletePrioridad
}