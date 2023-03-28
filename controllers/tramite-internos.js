const { request, response } = require("express");
const { codigoTramiteInterno } = require("../helpers/fc-codigo-tramite");
const { TramiteInterno, Prioridad } = require("../models");
const { Op } = require("sequelize");

const getTramiteInternos = async (req = request, res = response) => {
  try {
    const usuario = req.usuarioToken;
    const { buscar } = req.query;
    if (buscar === "") {
      const tramiteInterno = await TramiteInterno.findAll({
        where: {
          id_area: usuario.id_area,
        },
        order: [["codigo_documento", "DESC"]],
        include:[
          {
            model:Prioridad
          }
        ]
      });
      return res.json({
        ok: true,
        msg: "Se muestra los tramites con exito",
        tramiteInterno,
      });
    }
    const tramiteInterno = await TramiteInterno.findAll({
      where: {
        id_area: usuario.id_area,
        [Op.or]: [
          {
            codigo_documento: {
              [Op.startsWith]: `%${buscar}%`,
            },
          },
          {
            asunto: {
              [Op.startsWith]: `%${buscar}%`,
            },
          },
          {
            registrado: {
              [Op.startsWith]: `%${buscar}%`,
            },
          },
        ],
        include:[
          {
            model:Prioridad
          }
        ]
      },
      order: [["codigo_documento", "DESC"]],
    });
    res.json({
      ok: true,
      msg: "Se muestra los tramites con exito",
      tramiteInterno,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const getTramiteInterno = async (req = request, res = response) => {
  try {
    const { codigo } = req.params;
    const tramiteInterno = await TramiteInterno.findOne({
      where: {
        codigo_documento: codigo,
      },
    });
    res.json({
      ok: true,
      msg: "Se muestra el tramite con exito",
      tramiteInterno,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const postTramiteInterno = async (req = request, res = response) => {
  try {
    const usuario = req.usuarioToken;
    const { asunto, ...data } = req.body;
    data.asunto = asunto.toUpperCase();
    const registrado = `${usuario.nombre} ${usuario.apellido}`;
    const { codigo, ano, fecha, hora } = await codigoTramiteInterno();
    data.codigo_documento = codigo;
    data.registrado = registrado;
    data.ano = `${ano}`;
    data.fecha = fecha;
    data.hora = hora;
    data.id_area = usuario.id_area;
    const tramiteInterno = await TramiteInterno.create(data);
    res.json({
      ok: true,
      msg: "Se creo el tramite interno con exito",
      tramiteInterno,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const putTramiteInterno = async(req = request, res = response) => {
  try {
    const {codigo} = req.params;
    const { asunto, ...data } = req.body;
    data.asunto = asunto.toUpperCase();
    const tramiteInterno = await TramiteInterno.update(data,{
      where:{
        codigo_documento:codigo
      }
    });
    res.json({
      ok: true,
      msg: "Se actualizo el tramite interno con exito",
      tramiteInterno,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const deleteTramiteInterno = (req = request, res = response) => {
  try {
    res.json({
      ok: true,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

module.exports = {
  getTramiteInternos,
  getTramiteInterno,
  postTramiteInterno,
  putTramiteInterno,
  deleteTramiteInterno,
};
