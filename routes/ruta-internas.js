const { Router } = require("express");
const { getRutaInternas, getRutaInterna, postRutaInterna, putRutaInterna, deleteRutaInterna, getTramiteDerivado, getTramiteDerivadoInternoGeneral } = require("../controllers/ruta-internas");
const { validarCampos, validarJWT } = require("../middlewares");



const router = Router();




router.get('/',[
    validarJWT,
    validarCampos
],getRutaInternas);
router.get('/tramite/derivado',[
    validarJWT,
    validarCampos
],getTramiteDerivado);
router.get('/tramite/interno/general',[
    validarCampos
], getTramiteDerivadoInternoGeneral)
router.get('/:codigo',getRutaInterna);
router.post('/',[
    validarJWT,
    validarCampos
],postRutaInterna);
router.put('/:codigo',[
    validarJWT,
    validarCampos
],putRutaInterna);
router.delete('/:codigo',deleteRutaInterna);



module.exports = router;
