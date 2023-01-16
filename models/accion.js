const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class Accion extends Model{};


Accion.init({
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
    tableName:'acciones'
});

module.exports = Accion;