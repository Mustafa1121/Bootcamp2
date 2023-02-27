const Url = require("../models/urlModel");
// const shortid = require("shortid"); // to prevent the use of a hard codded function

exports.shortenUrl = async (req, res) => {
  const { originalUrl, urlname } = req.body;

  try {
    // Check if the URL already exists in the database or the name
    let url = await Url.findOne({
      $or: [{ originalUrl }, { urlCode: urlname }],
    });

    if (!url) {
      // Generate a unique 6-character code for the URL
      // 1
      // let urlCode = shortid.generate();

      console.log(req.get("host"));
      // Construct the short URL using the current request
      let urlCode = urlname;
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
  const { urlCodeDb } = req.params;
  console.log(urlCodeDb);
  try {
    const url = await Url.findOne({ urlCodeDb });

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
