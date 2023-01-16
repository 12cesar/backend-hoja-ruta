const { Router } = require("express");
const { getAcciones, getAccion, postAccion, deleteAccion, putAccion } = require("../controllers/acciones");



const router = Router();




router.get('/',getAcciones);
router.get('/:id',getAccion);
router.post('/',postAccion);
router.put('/:id',putAccion);
router.delete('/:id',deleteAccion);



module.exports = router;
