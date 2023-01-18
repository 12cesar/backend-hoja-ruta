const { Model } = require("sequelize");


const destinoArray=(destino)=>{
    let destinos='';
      if (Array.isArray(destino)) {
          for (let i = 0; i < destino.length; i++) {
            console.log(destino);
              destinos += destino[i].id+`${(destino.length-1 === i) ? '':','}`;
          }
          return destinos;
      }else{
        destinos = destino;
        return destinos;
      }
}



module.exports = {
    destinoArray
}