const { request, response } = require("express");
const { funDate } = require("../helpers/generar-fecha");
const { SeguimientoExterno, DerivacionExterna, Area, Respuesta } = require("../models");


const getSeguimientoExternos=(req=request,res=response)=>{
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
const getSeguimientoExterno=async(req=request,res=response)=>{
    try {
        const {codigo} =req.params;
        const seguimiento = await SeguimientoExterno.findAll({
            include:[
                {
                    model:DerivacionExterna,
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
const postSeguimientoExterno=(req=request,res=response)=>{
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
const putSeguimientoExterno=async(req=request,res=response)=>{
    try {
        const {id}= req.params;
        const {ano,fecha, hora} = funDate();
        const derivacion = await DerivacionExterna.update({
            estado_recepcion:1
        },{
            where:{
                id
            }
        });
        const data = {
            fecha_recepcion:fecha,
            hora_recepcion:hora
        }
        const recepcion = await SeguimientoExterno.update(data,{
            where:{
                id_derivacion:id
            }
        })
        res.json({
            ok:true,
            msg:'Se recepciono el tramite interno con exito',
            derivacion,
            recepcion
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const deleteSeguimientoExterno=(req=request,res=response)=>{
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
    getSeguimientoExternos,
    getSeguimientoExterno,
    postSeguimientoExterno,
    putSeguimientoExterno,
    deleteSeguimientoExterno
}