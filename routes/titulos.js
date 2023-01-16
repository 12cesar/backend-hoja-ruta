const { Router } = require("express");
const { getTitulos, getTitulo, postTitulo, putTitulo, deleteTitulo } = require("../controllers/titulos");



const router = Router();




router.get('/',getTitulos);
router.get('/:id',getTitulo);
router.post('/',postTitulo);
router.put('/:id',putTitulo);
router.delete('/:id',deleteTitulo);



module.exports = router;
