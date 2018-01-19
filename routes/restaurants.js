var express = require('express');
var router = express.Router();
const db = require('../db')

/* GET restos listing. */
router.get('/', (req, res, next) => {
  db.query('SELECT * FROM restaurants', null, (err, res) => {
    if (err) {
      return next(err)
    }
    res.send(res.rows[0])
  })
});

module.exports = router;
