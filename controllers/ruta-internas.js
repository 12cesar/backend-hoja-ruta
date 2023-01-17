const { request, response } = require("express");
const { rutaInter } = require("../helpers");
const { RutaInterna, TramiteInterno } = require("../models");

const getRutaInternas = async (req = request, res = response) => {
  try {
    const { id_area } = req.usuarioToken;
    const rutaInterna = await RutaInterna.findAll({
      where: {
        estado: 1,
        derivacion:0
      },
      include: [
        {
          model: TramiteInterno,
          where: {
            id_area,
          },
        },
      ],
    });
    res.json({
      ok: true,
      msg:'Se muestra con exito los tramites internos',
      rutaInterna,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const getRutaInterna = async(req = request, res = response) => {
  try {
    const { codigo } = req.params;
    const rutaInterna = await RutaInterna.findOne({
        where:{
            codigo_tramite:codigo
        },
        include:{
            model:TramiteInterno
        }
    })
    res.json({
      ok: true,
      msg:`Se muestra el tramite interno: ${codigo}`,
      rutaInterna
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const postRutaInterna = async (req = request, res = response) => {
  try {
    const { codigo, cantidad, id_destino, ...data } = req.body;
    const resp = await rutaInter(codigo);
    if (resp === false) {
      return res.status(400).json({
        ok: false,
        msg: "El tramite ha sido derivado, no se puede actualizar",
      });
    } else {
      data.codigo_tramite = codigo;
      data.cantidad = cantidad;
      data.id_destino = id_destino;
      const rutaInterna = await RutaInterna.create(data);
      res.json({
        ok: true,
        msg: "Se registro la ruta con exito",
        rutaInterna,
      });
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const putRutaInterna = (req = request, res = response) => {
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
const deleteRutaInterna = (req = request, res = response) => {
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
  getRutaInternas,
  getRutaInterna,
  postRutaInterna,
  putRutaInterna,
  deleteRutaInterna,
};
