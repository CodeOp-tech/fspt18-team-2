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
  console.log(req.body);
  try {
    await db(`INSERT INTO Posts(UserID, Title, Category, Body, Image1, Image2, Image3, Video) 
    VALUES (${req.body.userID}, '${req.body.title}', '${req.body.category}', '${req.body.body}', '${req.body.image1}', '${req.body.image2}', '${req.body.image3}', '${req.body.video}');`);

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
