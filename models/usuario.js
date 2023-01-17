const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class Usuario extends Model{};


Usuario.init({
    id_rol:{
        type:DataTypes.INTEGER
    },
    id_area:{
        type:DataTypes.INTEGER
    },
    dni:{
        type:DataTypes.CHAR
    },
    nombre:{
        type:DataTypes.STRING
    },
    apellido:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'usuario'
});

module.exports = Usuario;