const Url = require("../models/urlModel");
const shortid = require("shortid"); // to prevent the use of a hard codded function

exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  try {
    // Check if the URL already exists in the database
    let url = await Url.findOne({ originalUrl });


    if (!url) {
      // Generate a unique 6-character code for the URL
      let urlCode = shortid.generate();
      // Construct the short URL using the current request
      let shortUrl = `${req.protocol}://${req.get("host")}/url/${urlCode}`;
      url = new Url({
        originalUrl,
        urlCode,
        shortUrl,
      });
      await url.save();
    }

    res.json({ shortUrl: url.shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.redirectUrl = async (req, res) => {
  const { urlCode } = req.params;
  console.log(urlCode)
  try {
    const url = await Url.findOne({ urlCode });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }
    // Redirection
    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
