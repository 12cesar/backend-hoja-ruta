const { Router } = require("express");
const { getRespuestas, getRespuesta, putRespuesta, deleteRespuesta, postRespuestaInterno, putRespuestaInternoDerivado, putRespuestaInternoSinDerivado } = require("../controllers/respuestas");



const router = Router();




router.get('/',getRespuestas);
router.get('/:id',getRespuesta);
router.post('/tramite/interno',postRespuestaInterno);
router.put('/interno/derivado',putRespuestaInternoDerivado);
router.put('/interno/sin-derivado',putRespuestaInternoSinDerivado);
router.put('/:id',putRespuesta);
router.delete('/:id',deleteRespuesta);



module.exports = router;
