const { Router } = require("express");
const { getRutaInternas, getRutaInterna, postRutaInterna, putRutaInterna, deleteRutaInterna, getTramiteDerivado } = require("../controllers/ruta-internas");
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
router.get('/:codigo',getRutaInterna);
router.post('/',postRutaInterna);
router.put('/:codigo',putRutaInterna);
router.delete('/:codigo',deleteRutaInterna);



module.exports = router;
