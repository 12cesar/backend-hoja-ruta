const { request, response } = require("express");
const { codigoTramiteExterno } = require("../helpers");
const { TramiteExterno } = require("../models");
const { Op } = require("sequelize");
const getTramiteExternos = async (req = request, res = response) => {
  try {
    const { buscar } = req.query;
    const usuario = req.usuarioToken;
    if (buscar === "") {
      console.log(buscar);
      const tramiteExterno = await TramiteExterno.findAll({
        where: {
          id_area: usuario.id_area,
        },
        order: [["codigo_documento", "DESC"]],
      });
      return res.json({
        ok: true,
        msg: "Se muestra los tramites con exito",
        tramiteExterno,
      });
    }
    const tramiteExterno = await TramiteExterno.findAll({
        where: {
          id_area: usuario.id_area,
          [Op.or]: [
            {
              dni: {
                [Op.startsWith]: `%${buscar}%`,
              },
            },
            {
              ciudadano: {
                [Op.startsWith]: `%${buscar}%`,
              },
            },
            {
              codigo_documento: {
                [Op.startsWith]: `%${buscar}%`,
              },
            },
            {
              proveido: {
                [Op.startsWith]: `%${buscar}%`,
              },
            },
            {
              asunto:{
                [Op.startsWith]:`%${buscar}%`
              }, 
            }
          ],
        },
        order: [["codigo_documento", "DESC"]],
      });
      res.json({
        ok: true,
        msg: "Se muestra los tramites con exito",
        tramiteExterno,
      });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const getTramiteExterno = async (req = request, res = response) => {
  try {
    const { codigo } = req.params;
    const tramiteExterno = await TramiteExterno.findOne({
      where: {
        codigo_documento: codigo,
      },
    });
    res.json({
      ok: true,
      msg: "Se muestra el tramite con exito",
      tramiteExterno,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const postTramiteExterno = async (req = request, res = response) => {
  try {
    const usuario = req.usuarioToken;
    const { asunto, ...data } = req.body;
    data.asunto = asunto.toUpperCase();
    const registrado = `${usuario.nombre} ${usuario.apellido}`;
    const { codigo, ano, fecha, hora } = await codigoTramiteExterno();
    data.codigo_documento = codigo;
    data.registrado = registrado;
    data.ano = `${ano}`;
    data.fecha = fecha;
    data.hora = hora;
    data.id_area = usuario.id_area;
    const tramiteExterno = await TramiteExterno.create(data);
    res.json({
      ok: true,
      msg: "Se creo el tramite externo con exito",
      tramiteExterno,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const putTramiteExterno = (req = request, res = response) => {
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
const deleteTramiteExterno = (req = request, res = response) => {
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
  getTramiteExternos,
  getTramiteExterno,
  postTramiteExterno,
  putTramiteExterno,
  deleteTramiteExterno,
};
