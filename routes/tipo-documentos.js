const { Router } = require("express");
const { getTipoDocumentos } = require("../controllers/tipo-documentos");




const router = Router();


router.get('/',getTipoDocumentos);




module.exports = router;