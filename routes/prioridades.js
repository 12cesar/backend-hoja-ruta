const { Router } = require("express");
const { getPrioridades, getPrioridad, postPrioridad, putPrioridad, deletePrioridad } = require("../controllers/prioridades");



const router = Router();




router.get('/',getPrioridades);
router.get('/:id',getPrioridad);
router.post('/',postPrioridad);
router.put('/:id',putPrioridad);
router.delete('/:id',deletePrioridad);



module.exports = router;
