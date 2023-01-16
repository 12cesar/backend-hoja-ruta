const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class Rol extends Model{};


Rol.init({
    nombre:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'rol'
});

module.exports = Rol;