const { Router } = require("express");
const { getRutaExternas, getRutaExterna, postRutaExterna, putRutaExterna, deleteRutaExterna } = require("../controllers/ruta-externas");



const router = Router();




router.get('/',getRutaExternas);
router.get('/:id',getRutaExterna);
router.post('/',postRutaExterna);
router.put('/:id',putRutaExterna);
router.delete('/:id',deleteRutaExterna);



module.exports = router;
