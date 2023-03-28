const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const TramiteInterno = require("./tramite-interno");

class Prioridad extends Model{};


Prioridad.init({
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
    tableName:'prioridad'
});

Prioridad.hasMany(TramiteInterno,{
    as:'PrioridadInterno',
    foreignKey:'id_prioridad'
    
});
TramiteInterno.belongsTo(Prioridad,{
    
    foreignKey:'id_prioridad',
    sourceKey:'id',
})

module.exports = Prioridad;