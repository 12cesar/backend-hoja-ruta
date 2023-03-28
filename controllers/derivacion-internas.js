const { request, response } = require("express");
const { funDate } = require("../helpers");
const { DerivacionInterna, RutaInterna, SeguimientoInterno, TramiteInterno } = require("../models");
const { Op } = require("sequelize");

const getDerivacionInternas=async(req=request,res=response)=>{
    try {
        const {id_area} = req.usuarioToken;
        const {buscar} = req.query;
        if (buscar === '') {
            const derivacion = await DerivacionInterna.findAll(
                {
                    where:{
                        id_area,
                        id_respuesta:null
                    },
                    include:[
                        {
                            model:TramiteInterno
                        }
                    ]
                }
            )
            return res.json({
                ok:true,
                msg:'Se muestran las derivacion con exito',
                derivacion,
                buscar
            })
        }
        const derivacion = await DerivacionInterna.findAll(
            {
                where:{
                    id_area,
                    id_respuesta:null
                },
                include:[
                    {
                        model:TramiteInterno,
                        where:{
                            [Op.or]: [
                                {
                                  codigo_documento: {
                                    [Op.startsWith]: `%${buscar}%`,
                                  },
                                },
                                {
                                  asunto:{
                                    [Op.startsWith]:`%${buscar}%`
                                  }, 
                                },
                              ],
                        }
                    }
                ]
            }
        )
        return res.json({
            ok:true,
            msg:'Se muestran las derivacion con exito',
            derivacion,
            buscar
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const getDerivacionInterna=(req=request,res=response)=>{
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
const postDerivacionInterna=async(req=request,res=response)=>{
    try {
        const {destino,codigo_tramite,...data}=req.body;
        const {fecha,hora,ano}= funDate();
        const arrayEnvio = destino.split(',');
        data.codigo_tramite = codigo_tramite;
        let segui = {};
        for (let i = 0; i < arrayEnvio.length; i++) {
            data.id_area = Number(arrayEnvio[i]);
            const derivar = await DerivacionInterna.create(data);
            segui.fecha_derivacion=fecha;
            segui.hora_derivacion=hora;
            segui.id_derivacion= derivar.id;
            const seguimiento = await SeguimientoInterno.create(segui);     
        }
        const ruta = await RutaInterna.update({
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
const putDerivacionInterna=(req=request,res=response)=>{
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
const deleteDerivacionInterna=(req=request,res=response)=>{
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
    getDerivacionInternas,
    getDerivacionInterna,
    postDerivacionInterna,
    putDerivacionInterna,
    deleteDerivacionInterna
}