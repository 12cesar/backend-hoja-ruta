const { Router } = require("express");
const {
  getDerivacionExternas,
  getDerivacionExterna,
  postDerivacionExterna,
  putDerivacionExterna,
  deleteDerivacionExterna,
} = require("../controllers/derivacion-externas");

const router = Router();

router.get("/", getDerivacionExternas);
router.get("/:id", getDerivacionExterna);
router.post("/", postDerivacionExterna);
router.put("/:id", putDerivacionExterna);
router.delete("/:id", deleteDerivacionExterna);

module.exports = router;
