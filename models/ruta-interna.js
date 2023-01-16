const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class RutaInterna extends Model{};


RutaInterna.init({
    codigo_tramite:{
        type:DataTypes.CHAR
    },
    id_destino:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    timestamps:false,
    tableName:'ruta_interna'
});

module.exports = RutaInterna;