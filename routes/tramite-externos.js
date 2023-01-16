const { Router } = require("express");
const { getTramiteExternos, getTramiteExterno, postTramiteExterno, deleteTramiteExterno, putTramiteExterno } = require("../controllers/tramite-externos");



const router = Router();




router.get('/',getTramiteExternos);
router.get('/:id',getTramiteExterno);
router.post('/',postTramiteExterno);
router.put('/:id',putTramiteExterno);
router.delete('/:id',deleteTramiteExterno);



module.exports = router;
