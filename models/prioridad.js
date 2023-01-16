const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class Prioridad extends Model{};


Prioridad.init({
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
    tableName:'prioridad'
});

module.exports = Prioridad;