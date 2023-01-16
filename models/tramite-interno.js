const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

class TramiteInterno extends Model{};


TramiteInterno.init({
    codigo_documento:{
        type:DataTypes.CHAR,
        primaryKey:true
    },
    asunto:{
        type:DataTypes.STRING
    },
    observacion:{
        type:DataTypes.TEXT
    },
    registrado:{
        type:DataTypes.STRING
    },
    hora:{
        type:DataTypes.CHAR
    },
    fecha:{
        type:DataTypes.CHAR
    },
    ano:{
        type:DataTypes.CHAR
    },
    folio:{
        type:DataTypes.CHAR
    },
    id_prioridad:{
        type:DataTypes.INTEGER,
    }
},{
    sequelize,
    timestamps:false,
    tableName:'tramite_interno'
});

module.exports = TramiteInterno;