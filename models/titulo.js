const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class Titulo extends Model{};


Titulo.init({
    nombre_ano:{
        type:DataTypes.STRING
    },
    nombre_institucion:{
        type:DataTypes.STRING
    },
    logo_institucion:{
        type:DataTypes.STRING,
        defaultValue:1
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'titulo'
});

module.exports = Titulo;