const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const TramiteExterno = require("./tramite-externo");

class TipoDocumento extends Model{};


TipoDocumento.init({
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
    tableName:'tipo_documento'
});


TipoDocumento.hasMany(TramiteExterno,{
    as:'ExternoTipoDoc',
    foreignKey:'tipo_documento'
});
TramiteExterno.belongsTo(TipoDocumento,{
    foreignKey:'tipo_documento',
    sourceKey:'id'
});

module.exports = TipoDocumento;