const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class RutaExterna extends Model{};


RutaExterna.init({
    codigo_tramite:{
        type:DataTypes.CHAR
    },
    id_destino:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    timestamps:false,
    tableName:'ruta_externa'
});

module.exports = RutaExterna;