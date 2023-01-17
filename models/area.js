const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
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
Area.hasMany(Usuario,{
    as:'AreaUsuario',
    foreignKey:'id_area'
});
Usuario.belongsTo(Area,{
    foreignKey:'id_area',
    sourceKey:'id'
});
module.exports = Area;