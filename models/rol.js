const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Usuario = require("./usuario");

class Rol extends Model{};


Rol.init({
    nombre:{
        type:DataTypes.STRING
    },
    sigla:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'rol'
});


Rol.hasMany(Usuario,{
    as:'RolUsuario',
    foreignKey:'id_rol'
});
Usuario.belongsTo(Rol,{
    foreignKey:'id_rol',
    sourceKey:'id'
});

module.exports = Rol;