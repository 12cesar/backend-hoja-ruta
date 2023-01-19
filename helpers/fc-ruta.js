const { RutaInterna } = require("../models");

const rutaInter = async(codigo)=>{
    const resp = await RutaInterna.findOne(
        {
            where:{
                codigo_tramite:codigo,
                estado:1
            }
        }
     );
     console.log(resp);
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


module.exports = {
    rutaInter
}