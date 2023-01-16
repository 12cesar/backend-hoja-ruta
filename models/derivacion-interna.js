const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class DerivacionInterna extends Model{};


DerivacionInterna.init({
    observacion:{
        type:DataTypes.CHAR
    },
    estado_recepcion:{
        type:DataTypes.TINYINT,
        defaultValue:0
    },
    id_accion:{
        type:DataTypes.INTEGER
    },
    codigo_tramite:{
        type:DataTypes.INTEGER
    },
    id_area:{
        type:DataTypes.INTEGER
    },
    id_respuesta:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    timestamps:false,
    tableName:'derivacion_interna'
});

module.exports = DerivacionInterna;