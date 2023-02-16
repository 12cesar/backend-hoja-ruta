const { request, response } = require("express");
const { TipoDocumento } = require("../models");



const getTipoDocumentos =async(req=request, res=response)=>{
    try {
        const tipoDoc = await TipoDocumento.findAll({
            where:{
                estado:1
            },
            order:[
                ['nombre','ASC']
            ]
        });
        res.json({
            ok:true,
            msg:'Se muestran los tipos de documentos con exito',
            tipoDoc
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`${error}`
        })   
    }
}


module.exports = {
    getTipoDocumentos
}