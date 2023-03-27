const { request, response } = require("express");
const { rutaInter } = require("../helpers");
const { destinoArray } = require("../helpers/fc-destinos");
const { RutaInterna, TramiteInterno, Area } = require("../models");
const { Op } = require("sequelize");

const getRutaInternas = async (req = request, res = response) => {
  try {
    const { id_area } = req.usuarioToken;
    const rutaInterna = await RutaInterna.findAll({
      where: {
        estado: 1,
        derivacion: 0,
      },
      include: [
        {
          model: TramiteInterno,
          where: {
            id_area,
          },
        },
      ],
      order: [["codigo_tramite", "ASC"]],
    });
    res.json({
      ok: true,
      msg: "Se muestra con exito los tramites internos",
      rutaInterna,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const getTramiteDerivado = async (req = request, res = response) => {
  try {
    const { id_area } = req.usuarioToken;
    const {buscar}= req.query;
    if (buscar === '') {
      const rutaInterna = await RutaInterna.findAll({
        where: {
          estado: 1,
          derivacion: 1,
        },
        include: [
          {
            model: TramiteInterno,
            where: {
              id_area,
            },
          },
        ],
        order: [["codigo_tramite", "ASC"]],
      });
      return res.json({
        ok: true,
        msg: "Se muestra con exito los tramites internos",
        rutaInterna,
      });
    }
    const rutaInterna = await RutaInterna.findAll({
      where: {
        estado: 1,
        derivacion: 1,
      },
      include: [
        {
          model: TramiteInterno,
          where: {
            id_area,
            [Op.or]: [
              {
                codigo_documento: {
                  [Op.startsWith]: `%${buscar}%`,
                },
              },
              {
                asunto:{
                  [Op.startsWith]:`%${buscar}%`
                }, 
              },
              {
                  registrado:{
                    [Op.startsWith]:`%${buscar}%`
                  }, 
                }
            ],
          },
        },
      ],
      order: [["codigo_tramite", "ASC"]],
    });
    res.json({
      ok: true,
      msg: "Se muestra con exito los tramites internos",
      rutaInterna,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const getTramiteDerivadoInternoGeneral = async (req = request, res = response) => {
  try {
    const {buscar}= req.query;
    if (buscar === '') {
      const rutaInterna = await RutaInterna.findAll({
        where: {
          estado: 1,
          derivacion: 1,
        },
        include: [
          {
            model: TramiteInterno
          },
        ],
        order: [["codigo_tramite", "ASC"]],
      });
      return res.json({
        ok: true,
        msg: "Se muestra con exito los tramites internos",
        rutaInterna,
      });
    }
    const rutaInterna = await RutaInterna.findAll({
      where: {
        estado: 1,
        derivacion: 1,
      },
      include: [
        {
          model: TramiteInterno,
          where: {
            [Op.or]: [
              {
                codigo_documento: {
                  [Op.startsWith]: `%${buscar}%`,
                },
              },
              {
                asunto:{
                  [Op.startsWith]:`%${buscar}%`
                }, 
              },
              {
                  registrado:{
                    [Op.startsWith]:`%${buscar}%`
                  }, 
                }
            ],
          },
        },
      ],
      order: [["codigo_tramite", "ASC"]],
    });
    res.json({
      ok: true,
      msg: "Se muestra con exito los tramites internos",
      rutaInterna,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const getRutaInterna = async (req = request, res = response) => {
  try {
    const { codigo } = req.params;
    const rutaInterna = await RutaInterna.findOne({
      where: {
        codigo_tramite: codigo,
        estado: 1,
      },
      include: {
        model: TramiteInterno,
      },
    });
    if (rutaInterna) {
      const arrayDestino = rutaInterna.id_destino.split(",");
      let area = [];
      for (let i = 0; i < arrayDestino.length; i++) {
        const areas = await Area.findOne({
          where: {
            id: Number(arrayDestino[i]),
          },
        });
        area.push({ id: areas.id, nombre: areas.nombre });
      }

      res.json({
        ok: true,
        msg: `Se muestra el tramite interno: ${codigo}`,
        rutaInterna,
        area,
      });
    }
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
    const destinos = destinoArray(id_destino);
    const resp = await rutaInter(codigo);
    if (resp === false) {
      return res.status(400).json({
        ok: false,
        msg: "El tramite ha sido derivado, no se puede actualizar",
      });
    } else {
      data.codigo_tramite = codigo;
      data.cantidad = cantidad;
      data.id_destino = destinos;
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
  getTramiteDerivado,
  getRutaInterna,
  getTramiteDerivadoInternoGeneral,
  postRutaInterna,
  putRutaInterna,
  deleteRutaInterna,
};
