const { Router } = require("express");
const { getRoles, getRole, postRole, putRole, deleteRole } = require("../controllers/roles");



const router = Router();




router.get('/',getRoles);
router.get('/:id',getRole);
router.post('/',postRole);
router.put('/:id',putRole);
router.delete('/:id',deleteRole);



module.exports = router;
