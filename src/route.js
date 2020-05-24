const router = require("express").Router();
const controller = require("./controller");

router.get("/api/prediction/:latitude&:longitude", controller.indexAction);

module.exports = router;
