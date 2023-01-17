const { request, response } = require("express");
const { mayusPrimeraCadena, siglaFun } = require("../helpers");
const { Rol } = require("../models");


const getRoles=async(req=request,res=response)=>{
    try {
        const {estado} = req.query;
        const rol = await Rol.findAll({
            where:{
                estado
            }
        });
        res.json({
            ok:true,
            rol
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const getRole=(req=request,res=response)=>{
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
const postRole=async(req=request,res=response)=>{
    try {
        const {nombre,...data} =req.body;
        const nom= nombre.toUpperCase();
        const sigla = siglaFun(nombre);
        data.nombre = nom;
        data.sigla = sigla;
        const rol = await Rol.create(data);
        res.json({
            ok:true,
            msg:'Se creo el rol con exito',
            rol
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error:${error}`
        })
    }
}
const putRole=(req=request,res=response)=>{
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
const deleteRole=(req=request,res=response)=>{
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
    getRoles,
    getRole,
    postRole,
    putRole,
    deleteRole
}