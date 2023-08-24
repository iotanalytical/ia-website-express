const express = require('express');
const router = express.Router();

// Data endpoint
router.get('/data', (req, res) => {
  
  res.status(200).send("Data Endpoint");
});



// Export this module
module.exports = router;
