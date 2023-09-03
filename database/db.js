const { MongoClient } = require("mongodb");
require("dotenv").config();

const MongodbUrl = process.env.ATLAS_URI;

const client = new MongoClient(MongodbUrl);
const dbName = "ia-website";

// Connect to database
const dbConnect = async () => {
  try {
    await client.connect();
  } catch(e) {
    console.error(e);
  }
}

dbConnect();

const db = client.db(dbName);

module.exports = db;