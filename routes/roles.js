const controller = require("../controllers/roles");
const router = require("express").Router();

// CRUD Routes /roles
router.get("/", controller.getRoles); // /roles

module.exports = router;
