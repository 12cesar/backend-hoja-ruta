const { request, response } = require("express");
const { Op } = require("sequelize");
const { destinoArray } = require("../helpers");
const { rutaExter } = require("../helpers");
const { RutaExterna, TramiteExterno, Area } = require("../models");

const getRutaExternas = async (req = request, res = response) => {
  try {
    const { id_area } = req.usuarioToken;
    const rutaExterna = await RutaExterna.findAll({
      where: {
        estado: 1,
        derivacion: 0,
      },
      include: [
        {
          model: TramiteExterno,
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
      rutaExterna,
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
    const {buscar} = req.query;
    console.log(buscar);
    if (buscar === '') {
      const rutaExterna = await RutaExterna.findAll({
        where: {
          estado: 1,
          derivacion: 1,
        },
        include: [
          {
            model: TramiteExterno,
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
        rutaExterna,
      });
    }
    const rutaExterna = await RutaExterna.findAll({
      where: {
        estado: 1,
        derivacion: 1,
      },
      include: [
        {
          model: TramiteExterno,
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
      rutaExterna,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const getTramiteExternoGeneral = async (req = request, res = response) => {
  try {
    const {buscar} = req.query;
    console.log(buscar);
    if (buscar === '') {
      const rutaExterna = await RutaExterna.findAll({
        where: {
          estado: 1,
          derivacion: 1,
        },
        include: [
          {
            model: TramiteExterno
          },
        ],
        order: [["codigo_tramite", "ASC"]],
      });
      return res.json({
        ok: true,
        msg: "Se muestra con exito los tramites internos",
        rutaExterna,
      });
    }
    const rutaExterna = await RutaExterna.findAll({
      where: {
        estado: 1,
        derivacion: 1,
      },
      include: [
        {
          model: TramiteExterno,
          where: {
            [Op.or]: [
              {
                codigo_documento: {
                  [Op.startsWith]: `%${buscar}%`,
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
      rutaExterna,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const getRutaExterna = async (req = request, res = response) => {
  try {
    const { codigo } = req.params;
    const rutaExterna = await RutaExterna.findOne({
      where: {
        codigo_tramite: codigo,
        estado: 1,
      },
      include: {
        model: TramiteExterno,
      },
    });
    if (rutaExterna) {
      const arrayDestino = rutaExterna.id_destino.split(",");
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
        rutaExterna,
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
const postRutaExterna = async (req = request, res = response) => {
  try {
    const { codigo, cantidad, id_destino, ...data } = req.body;
    const destinos = destinoArray(id_destino);
    const resp = await rutaExter(codigo);
    if (resp === false) {
      return res.status(400).json({
        ok: false,
        msg: "El tramite ya ha sido derivado, no se puede actualizar",
      });
    } else {
      data.codigo_tramite = codigo;
      data.cantidad = cantidad;
      data.id_destino = destinos;
      const rutaExterna = await RutaExterna.create(data);
      res.json({
        ok: true,
        msg: "Se registro la ruta con exito",
        rutaExterna,
      });
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};
const putRutaExterna = (req = request, res = response) => {
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
const deleteRutaExterna = (req = request, res = response) => {
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
  getRutaExternas,
  getTramiteDerivado,
  getRutaExterna,
  getTramiteExternoGeneral,
  postRutaExterna,
  putRutaExterna,
  deleteRutaExterna,
};
