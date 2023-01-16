const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class SeguimientoExterno extends Model{};


SeguimientoExterno.init({
    id_derivacion:{
        type:DataTypes.INTEGER
    },
    fecha_derivacion:{
        type:DataTypes.CHAR,
    },
    hora_derivacion:{
        type:DataTypes.CHAR,
    },
    fecha_recepcion:{
        type:DataTypes.CHAR,
    },
    hora_recepcion:{
        type:DataTypes.CHAR,
    }
},{
    sequelize,
    timestamps:false,
    tableName:'seguimiento_externo'
});

module.exports = SeguimientoExterno;