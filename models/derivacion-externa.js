const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const SeguimientoExterno = require("./seguimiento-externo");

class DerivacionExterna extends Model{};


DerivacionExterna.init({
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
    tableName:'derivacion_externa'
});
DerivacionExterna.hasMany(SeguimientoExterno,{
    as:'DerivacionExternaSeguimiento',
    foreignKey:'id_derivacion'
});

SeguimientoExterno.belongsTo(DerivacionExterna,{
    foreignKey:'id_derivacion',
    sourceKey:'id'
})
module.exports = DerivacionExterna;