const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class Respuesta extends Model{};


Respuesta.init({
    nombre:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'respuesta'
});

module.exports = Respuesta;