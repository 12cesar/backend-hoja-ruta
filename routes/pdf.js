const { Router } = require("express");
const { postPdfTramiteInterno } = require("../controllers/pdf");


const router = Router();


router.get('/',postPdfTramiteInterno);


module.exports = router;