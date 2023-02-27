const router = require("express").Router();
const controller = require("../controller/urlController");

router.post("/shortUrl", controller.shortenUrl);

router.get("/:urlCodeDb", controller.redirectUrl);

module.exports = router;
