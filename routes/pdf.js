const { Router } = require("express");
const { postPdfTramiteInterno, postPdfTramiteExterno } = require("../controllers/pdf");


const router = Router();


router.get('/',postPdfTramiteInterno);
router.get('/externo',postPdfTramiteExterno);

module.exports = router;