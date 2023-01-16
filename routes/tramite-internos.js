const { Router } = require("express");
const { getTramiteInternos, getTramiteInterno, postTramiteInterno, putTramiteInterno, deleteTramiteInterno } = require("../controllers/tramite-internos");



const router = Router();




router.get('/',getTramiteInternos);
router.get('/:id',getTramiteInterno);
router.post('/',postTramiteInterno);
router.put('/:id',putTramiteInterno);
router.delete('/:id',deleteTramiteInterno);



module.exports = router;
