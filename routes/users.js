require("dotenv").config();
const router = require("express").Router();

const db = require("../database/db");
const jwt = require("jsonwebtoken");

// POST /users/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  // Fetch the user by email
  async function run() {
    try {
      let col = db.collection("users");
      let query = { email: email };
      let user = await col.findOne(query);

      // If no email in DB, respond with 400
      if (!user) {
        return res.status(400).send("Invalid email");
      }

      // Validate the password
      if (user.password !== password) {
        return res.status(400).send("Invalid password");
      }

      // Sign the token and send to the user
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: "15m" }
      );

      res.status(200).json({ token: token, user: user.name });
    } catch (err) {
      res.status(400).send("Couldnt log you in");
    }
  }
  run().catch(console.dir);
});

//  GET /users/current
//  returns current user's info
router.get("/current", (req, res) => {
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return res.status(401).send("Please include your JWT");
  }

  // Parse the bearer token
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  jwt.verify(authToken, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid auth token");
    }

    // Fetch the user info by id
    async function run() {
      try {
        let col = db.collection("users");
        let query = { email: decoded.email };
        let user = await col.findOne(query);

        res.json(user.name);
      } catch (err) {
        res.status(500).send("Can't fetch user info");
      }
    }
    run().catch(console.dir);
  });
});

module.exports = router;
