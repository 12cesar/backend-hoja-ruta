const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const DerivacionExterna = require("./derivacion-externa");
const DerivacionInterna = require("./derivacion-interna");

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
Respuesta.hasMany(DerivacionInterna,{
    as:'RespuestaDerivacionInterna',
    foreignKey:'id_respuesta'
});
DerivacionInterna.belongsTo(Respuesta,{
    foreignKey:'id_respuesta',
    sourceKey:'id'
});

Respuesta.hasMany(DerivacionExterna,{
    as:'RespuestaDerivacionExterna',
    foreignKey:'id_respuesta'
});
DerivacionExterna.belongsTo(Respuesta,{
    foreignKey:'id_respuesta',
    sourceKey:'id'
});
module.exports = Respuesta;