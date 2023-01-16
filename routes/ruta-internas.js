const { Router } = require("express");
const { getRutaInternas, getRutaInterna, postRutaInterna, putRutaInterna, deleteRutaInterna } = require("../controllers/ruta-internas");



const router = Router();




router.get('/',getRutaInternas);
router.get('/:id',getRutaInterna);
router.post('/',postRutaInterna);
router.put('/:id',putRutaInterna);
router.delete('/:id',deleteRutaInterna);



module.exports = router;
