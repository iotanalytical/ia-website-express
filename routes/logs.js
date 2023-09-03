const express = require("express");
const router = express.Router();

const db = require("../database/db");

router.get("/", (req, res) => {
  // fetch data from database
  async function run() {
    try {
      const col = db.collection("logs");
      const results = await col.find({}).toArray();

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
