const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const DerivacionExterna = require("./derivacion-externa");
const RutaExterna = require("./ruta-externa");

class TramiteExterno extends Model{};


TramiteExterno.init({
    codigo_documento:{
        type:DataTypes.CHAR,
        primaryKey:true
    },
    asunto:{
        type:DataTypes.STRING
    },
    proveido:{
        type:DataTypes.INTEGER
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
    },
    id_area:{
        type:DataTypes.INTEGER,
    }
},{
    sequelize,
    timestamps:false,
    tableName:'tramite_externo'
});

TramiteExterno.hasMany(RutaExterna,{
    as:'TramiteExternoRuta',
    foreignKey:'codigo_tramite'
});

RutaExterna.belongsTo(TramiteExterno,{
    foreignKey:'codigo_tramite',
    sourceKey:'codigo_documento'
});
TramiteExterno.hasMany(DerivacionExterna,{
    as:'TramiteExternoDerivacion',
    foreignKey:'codigo_tramite'
});

DerivacionExterna.belongsTo(TramiteExterno,{
    foreignKey:'codigo_tramite',
    sourceKey:'codigo_documento'
})

module.exports = TramiteExterno;