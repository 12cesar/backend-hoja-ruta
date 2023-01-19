const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const SeguimientoInterno = require("./seguimiento-interno");

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
DerivacionInterna.hasMany(SeguimientoInterno,{
    as:'DerivacionInternaSeguimiento',
    foreignKey:'id_derivacion'
});

SeguimientoInterno.belongsTo(DerivacionInterna,{
    foreignKey:'id_derivacion',
    sourceKey:'id'
})
module.exports = DerivacionInterna;