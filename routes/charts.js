const express = require("express");
const router = express.Router();

const { MongoClient } = require("mongodb");

require("dotenv").config();

const MongodbUrl = process.env.ATLAS_URI;

const dbName = "ia-website";

// Data endpoint
router.get("/", (req, res) => {
  // connect to database and fetch data
  const client = new MongoClient(MongodbUrl);
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection("charts");

      const document = await col.find({}).toArray();
      res.status(200).send(document);
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

module.exports = router;
