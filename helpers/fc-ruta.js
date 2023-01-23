const { RutaInterna } = require("../models");
const RutaExterna = require("../models/ruta-externa");

const rutaInter = async(codigo)=>{
    const resp = await RutaInterna.findOne(
        {
            where:{
                codigo_tramite:codigo,
                estado:1
            }
        }
     );
    if (resp) {
        if (resp.derivacion === 1) {
            return false   
        }
        else{
            const resp = await RutaInterna.destroy(
                {
                    where:{
                        codigo_tramite:codigo
                    }
                }
             );
             return true;
        }
    }else{
         return true
    }
    
    
}
const rutaExter = async(codigo)=>{
    const resp = await RutaExterna.findOne(
        {
            where:{
                codigo_tramite:codigo,
                estado:1
            }
        }
     );
    if (resp) {
        if (resp.derivacion === 1) {
            return false   
        }
        else{
            const resp = await RutaExterna.destroy(
                {
                    where:{
                        codigo_tramite:codigo
                    }
                }
             );
             return true;
        }
    }else{
         return true
    }
    
    
}


module.exports = {
    rutaInter,
    rutaExter
}