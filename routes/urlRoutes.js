const router = require("express").Router();
const controller = require("../controller/urlController");

// Create a short URL
router.post("/shorten", controller.shortenUrl);

// Redirect to the original URL
router.get("/:urlCode", controller.redirectUrl);

module.exports = router;
