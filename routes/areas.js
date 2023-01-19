const { Router } = require("express");
const { getAreas, getArea, postArea, putArea, deleteArea, getSinAreas } = require("../controllers/areas");
const { validarCampos, validarJWT } = require("../middlewares");



const router = Router();




router.get('/',getAreas);
router.get('/sin/area',[
    validarJWT,
    validarCampos
],getSinAreas);
router.get('/:id',getArea);
router.post('/',postArea);
router.put('/:id',putArea);
router.delete('/:id',deleteArea);



module.exports = router;
