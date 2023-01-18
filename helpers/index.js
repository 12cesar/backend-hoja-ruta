const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const fcLetra = require("./fc-letra");
const fcCodigoTramite=require("./fc-codigo-tramite");
const fcDate = require("./generar-fecha");
const fcRuta = require("./fc-ruta");
const fcDestino = require("./fc-destinos");
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...fcLetra,
  ...fcCodigoTramite,
  ...fcDate,
  ...fcRuta,
  ...fcDestino
};
