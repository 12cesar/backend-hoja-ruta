const { request, response } = require("express");
const { Respuesta, DerivacionInterna, SeguimientoInterno } = require("../models");
const { funDate } = require("../helpers/generar-fecha");


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
const putRespuestaInternoDerivado=async(req=request,res=response)=>{
    try {
        const {observacion,accion,codigo_tramite, id_destino, id_respuesta,id_derivacion,...data} = req.body;
        const {fecha,hora,ano}= funDate();
        const dataDerivar = {
            observacion,
            id_accion:accion,
            codigo_tramite,
            id_area:id_destino
        }
        const dataSeguimiento= {
            fecha_derivacion:fecha,
            hora_derivacion:hora
        }
        const derivar = await DerivacionInterna.create(dataDerivar);
        dataSeguimiento.id_derivacion = derivar.id;
        const seguimiento = await SeguimientoInterno.create(dataSeguimiento);
        const derivacion = await DerivacionInterna.update({
            id_respuesta
        },{
            where:{
                id:id_derivacion
            }
        })
        res.json({
            ok:true,
            msg:'Se derivo el documento con exito',
            derivacion
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const putRespuestaInternoSinDerivado=async(req=request,res=response)=>{
    try {
        const {id_derivacion,id_respuesta,...data} = req.body;
        const derivacion = await DerivacionInterna.update({
            id_respuesta
        },{
            where:{
                id:id_derivacion
            }
        })
        res.json({
            ok:true,
            msg:'Se actualizo con exito',
            derivacion
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
    putRespuestaInternoDerivado,
    putRespuestaInternoSinDerivado,
    deleteRespuesta
}