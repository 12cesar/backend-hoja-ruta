const { Router } = require("express");
const { getRespuestas, getRespuesta, postRespuesta, putRespuesta, deleteRespuesta } = require("../controllers/respuestas");



const router = Router();




router.get('/',getRespuestas);
router.get('/:id',getRespuesta);
router.post('/',postRespuesta);
router.put('/:id',putRespuesta);
router.delete('/:id',deleteRespuesta);



module.exports = router;
