const express = require('express');
const router = express.Router();


router.get('/login', (req, res) => {
  res.send('Accessed auth route')
});

router.get('/register', (req, res) => {
  res.send('Accessed register route')
});

module.exports = router;
