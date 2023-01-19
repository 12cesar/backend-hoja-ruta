const { Router } = require("express");
const {
  getSeguimientoInternos,
  getSeguimientoInterno,
  postSeguimientoInterno,
  putSeguimientoInterno,
  deleteSeguimientoInterno,
} = require("../controllers/seguimiento-interno");

const router = Router();

router.get("/", getSeguimientoInternos);
router.get("/:codigo", getSeguimientoInterno);
router.post("/", postSeguimientoInterno);
router.put("/:id", putSeguimientoInterno);
router.delete("/:id", deleteSeguimientoInterno);

module.exports = router;
