const { request, response } = require("express");
const { DerivacionInterna, SeguimientoInterno, Area } = require("../models");
const Respuesta = require("../models/respuesta");


const getSeguimientoInternos=(req=request,res=response)=>{
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
const getSeguimientoInterno=async(req=request,res=response)=>{
    try {
        const {codigo} =req.params;
        const seguimiento = await SeguimientoInterno.findAll({
            include:[
                {
                    model:DerivacionInterna,
                    include:[
                        {
                            model:Area
                        },
                        {
                            model:Respuesta
                        }
                    ],
                    where:{
                        codigo_tramite:codigo
                    }
                }
            ]
        })
        res.json({
            ok:true,
            msg:'Se muestra el seguimiento con exito',
            seguimiento
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const postSeguimientoInterno=(req=request,res=response)=>{
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
const putSeguimientoInterno=(req=request,res=response)=>{
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
const deleteSeguimientoInterno=(req=request,res=response)=>{
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
    getSeguimientoInternos,
    getSeguimientoInterno,
    postSeguimientoInterno,
    putSeguimientoInterno,
    deleteSeguimientoInterno
}