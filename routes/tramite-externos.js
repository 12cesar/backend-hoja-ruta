const { Router } = require("express");
const { getTramiteExternos, getTramiteExterno, postTramiteExterno, deleteTramiteExterno, putTramiteExterno } = require("../controllers/tramite-externos");
const { validarCampos, validarJWT } = require("../middlewares");



const router = Router();




router.get('/',[
    validarJWT,
    validarCampos
],getTramiteExternos);
router.get('/:codigo',getTramiteExterno);
router.post('/',[
    validarJWT,
    validarCampos
],postTramiteExterno);
router.put('/:codigo',putTramiteExterno);
router.delete('/:id',deleteTramiteExterno);



module.exports = router;
