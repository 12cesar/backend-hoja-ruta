const { TramiteInterno } = require("../models");
const { funDate } = require("./generar-fecha");



const codigoTramiteInterno = async()=>{
    const {ano,fecha,hora} = funDate();
    const count = await TramiteInterno.count({
        where:{
            ano
        }
    });
    const numero = `${count+1}`;
    const codigo = numero.padStart(6, "0");
    return {
        ano,
        fecha,
        hora,
        codigo
    };
}


module.exports = {
    codigoTramiteInterno
}