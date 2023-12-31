const express = require("express");
const router = express.Router();

const db = require("../database/db");

// Data endpoint
router.get("/:user", (req, res) => {
  // fetch data from database
  async function run() {
    try {
      const col = db.collection("charts");
      const results = await col.find({user_name: req.params.user}).toArray();

      res.status(200).send(results);
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

module.exports = router;
