const { Router } = require("express");
const {
  getSeguimientoExternos,
  getSeguimientoExterno,
  postSeguimientoExterno,
  putSeguimientoExterno,
  deleteSeguimientoExterno,
} = require("../controllers/seguimiento-externos");

const router = Router();

router.get("/", getSeguimientoExternos);
router.get("/:id", getSeguimientoExterno);
router.post("/", postSeguimientoExterno);
router.put("/:id", putSeguimientoExterno);
router.delete("/:id", deleteSeguimientoExterno);

module.exports = router;
