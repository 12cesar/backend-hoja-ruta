const { Router } = require("express");
const {
  getDerivacionExternas,
  getDerivacionExterna,
  postDerivacionExterna,
  putDerivacionExterna,
  deleteDerivacionExterna,
} = require("../controllers/derivacion-externas");
const { validarCampos, validarJWT } = require("../middlewares");

const router = Router();

router.get("/",[
  validarJWT, 
  validarCampos
], getDerivacionExternas);
router.get("/:id", getDerivacionExterna);
router.post("/", postDerivacionExterna);
router.put("/:id", putDerivacionExterna);
router.delete("/:id", deleteDerivacionExterna);

module.exports = router;
