const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class RutaInterna extends Model{};


RutaInterna.init({
    codigo_tramite:{
        type:DataTypes.CHAR
    },
    cantidad:{
        type:DataTypes.TINYINT,
        defaultValue:1
    },
    id_envio:{
        type:DataTypes.INTEGER
    },
    id_destino:{
        type:DataTypes.STRING
    },
    derivacion:{
        type:DataTypes.TINYINT,
        defaultValue:0
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'ruta_interna'
});

module.exports = RutaInterna;