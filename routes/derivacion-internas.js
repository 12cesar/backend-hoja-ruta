const { Router } = require("express");
const {
  getDerivacionInternas,
  getDerivacionInterna,
  postDerivacionInterna,
  putDerivacionInterna,
  deleteDerivacionInterna,
} = require("../controllers/derivacion-internas");

const router = Router();

router.get("/", getDerivacionInternas);
router.get("/:id", getDerivacionInterna);
router.post("/", postDerivacionInterna);
router.put("/:id", putDerivacionInterna);
router.delete("/:id", deleteDerivacionInterna);

module.exports = router;
