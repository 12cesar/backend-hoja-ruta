const { request, response } = require("express");
const { Respuesta } = require("../models");


const getRespuestas=async(req=request,res=response)=>{
    try {
        const {estado} = req.query;
        const respuesta = await Respuesta.findAll({
            where:{
                estado
            }
        })
        res.json({
            ok:true,
            msg:'Se muestran las respuestas con exito',
            respuesta
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const getRespuesta=(req=request,res=response)=>{
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
const postRespuestaInterno=(req=request,res=response)=>{
    try {
        const data = req.body;
        res.json({
            ok:true,
            data
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const putRespuesta=(req=request,res=response)=>{
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
const deleteRespuesta=(req=request,res=response)=>{
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
    getRespuestas,
    getRespuesta,
    postRespuestaInterno,
    putRespuesta,
    deleteRespuesta
}