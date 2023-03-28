const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const DerivacionExterna = require("./derivacion-externa");
const DerivacionInterna = require("./derivacion-interna");
const RutaInterna = require("./ruta-interna");
const TramiteInterno = require("./tramite-interno");
const Usuario = require("./usuario");

class Area extends Model{};


Area.init({
    nombre:{
        type:DataTypes.STRING
    },
    abreviatura:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'area'
});
/*  Tramite interno */
Area.hasMany(TramiteInterno,{
    as:'AreaInterno',
    foreignKey:'id_area'
});
TramiteInterno.belongsTo(Area,{
    foreignKey:'id_area',
    sourceKey:'id'
});

/* Area - Ruta Interna */
Area.hasMany(RutaInterna,{
    as:'AreaRutaInterna',
    foreignKey:'id_envio'
});
RutaInterna.belongsTo(Area,{
    foreignKey:'id_envio',
    sourceKey:'id'
})



Area.hasMany(Usuario,{
    as:'AreaUsuario',
    foreignKey:'id_area'
});
Usuario.belongsTo(Area,{
    foreignKey:'id_area',
    sourceKey:'id'
});
Area.hasMany(DerivacionInterna,{
    as:'AreaDerivacionInterna',
    foreignKey:'id_area'
});
DerivacionInterna.belongsTo(Area,{
    foreignKey:'id_area',
    sourceKey:'id'
});
Area.hasMany(DerivacionExterna,{
    as:'AreaDerivacionExterna',
    foreignKey:'id_area'
});
DerivacionExterna.belongsTo(Area,{
    foreignKey:'id_area',
    sourceKey:'id'
});
module.exports = Area;