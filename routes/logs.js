const express = require("express");
const router = express.Router();

const db = require("../database/db");

// Get specific user log data
router.get("/:user", (req, res) => {
  // fetch data from database
  async function run() {
    try {
      const col = db.collection("logs");
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


// Delete a single log
router.delete("/:id", (req, res) => {
  // fetch data from database
  async function run() {
    try {
      const col = db.collection("logs");
      const query = { _id: req.params.id };

      let result = await col.deleteOne(query);

      res.status(200).send(result);
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

module.exports = router;
