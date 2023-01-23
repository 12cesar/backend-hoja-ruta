const { request, response } = require("express");
const { funDate } = require("../helpers/generar-fecha");
const { DerivacionExterna, SeguimientoExterno, RutaExterna, TramiteExterno } = require("../models");


const getDerivacionExternas=async(req=request,res=response)=>{
    try {
        const {id_area} = req.usuarioToken;
        const derivacion = await DerivacionExterna.findAll(
            {
                where:{
                    id_area,
                    id_respuesta:null
                },
                include:[
                    {
                        model:TramiteExterno
                    }
                ]
            }
        )
        res.json({
            ok:true,
            msg:'Se muestran las derivacion con exito',
            derivacion
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const getDerivacionExterna=(req=request,res=response)=>{
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
const postDerivacionExterna=async(req=request,res=response)=>{
    try {
        const {destino,codigo_tramite,...data}=req.body;
        const {fecha,hora,ano}= funDate();
        const arrayEnvio = destino.split(',');
        data.codigo_tramite = codigo_tramite;
        let segui = {};
        
        for (let i = 0; i < arrayEnvio.length; i++) {
            data.id_area = Number(arrayEnvio[i]);
            const derivar = await DerivacionExterna.create(data);
            segui.fecha_derivacion=fecha;
            segui.hora_derivacion=hora;
            segui.id_derivacion= derivar.id;
            const seguimiento = await SeguimientoExterno.create(segui);     
        }
        const ruta = await RutaExterna.update({
            derivacion:1
        },{
            where:{
                codigo_tramite
            }
        });
        res.json({
            ok:true,
            msg:'Se derivo el tramite con exito, no se olvide de imprimir su hoja de ruta'
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const putDerivacionExterna=(req=request,res=response)=>{
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
const deleteDerivacionExterna=(req=request,res=response)=>{
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
    getDerivacionExternas,
    getDerivacionExterna,
    postDerivacionExterna,
    putDerivacionExterna,
    deleteDerivacionExterna
}