var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET posts. */
router.get("/", async (req, res) => {
  try {
    const result = await db("SELECT * FROM Posts;");

    if (!result.data[0]) {
      res.status(404).send();
      return;
    }

    res.send(result.data);
  } catch (error) {
    res.send(500);
  }
});

router.post("/", async (req, res) => {
  try {
    await db(`INSERT INTO Posts(UserID, Title, Category, Body, Image1, Image2, Image3, Video) 
    VALUES (${req.body.UserID}, '${req.body.Title}', '${req.body.Category}', '${req.body.Body}', '${req.body.Image1}', '${req.body.Image2}', '${req.body.Image3}', '${req.body.Video}');`);

    const result = await db(`SELECT * FROM Posts;`);

    if (!result.data[0]) {
      res.status(404).send();
      return;
    }

    res.send(result.data);
  } catch (error) {
    res.send(500);
  }
});

module.exports = router;
