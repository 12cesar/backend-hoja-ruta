const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class RutaExterna extends Model{};


RutaExterna.init({
    codigo_tramite:{
        type:DataTypes.CHAR
    },
    cantidad:{
        type:DataTypes.TINYINT,
        defaultValue:1
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
    tableName:'ruta_externa'
});

module.exports = RutaExterna;