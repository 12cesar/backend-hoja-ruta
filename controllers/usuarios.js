const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { Rol } = require("../models");

const getUsuarios=async(req=request,res=response)=>{
    try {
        const {estado} = req.query;
        const usuario = await Usuario.findAll({
            where:{
                estado
            },
            include:[
                {
                    model:Rol
                }
            ]
        })
        res.json({
            ok:true,
            msg:'Se muestran los usuarios con exito',
            usuario
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const getUsuario=(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const postUsuario=async(req=request,res=response)=>{
    try {
        const {password,...data} = req.body;
       
        // Creamos un password Hasheado
        const salt = bcryptjs.genSaltSync();
        const hasPassword = bcryptjs.hashSync(password, salt);
        data.password = hasPassword;
        const usuario = await Usuario.create(data);
        res.json({
            ok:true,
            msg:'Se ha creado el usuario con exito',
            usuario
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const putUsuario=(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const deleteUsuario=(req=request,res=response)=>{
    try {
        res.json({
            ok:true
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}


module.exports = {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}