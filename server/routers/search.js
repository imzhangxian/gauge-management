const express = require('express')
const router = express.Router()

const db = require('../db')

// @post api/search/watermeters search watermeters
router.post('/watermeters', (req, res) => {
  let keyphrase = req.body.keyphrase;
  db.query('SELECT * from watermeters where name ~* $1 or number ~* $1', 
    [keyphrase], 
    (err, results) => {
      if (!err) {
          res.json(results.rows)
      } else {
          console.log(err)
          res.status(500).send('Internal error')
      }
  })
})

// @post api/search/watermeters search watermeters
router.post('/users', (req, res) => {
  let keyphrase = req.body.keyphrase;
  db.query('SELECT * from users where username ~* $1 or display ~* $1', 
    [keyphrase], 
    (err, results) => {
      if (!err) {
          res.json(results.rows)
      } else {
          console.log(err)
          res.status(500).send('Internal error')
      }
  })
})

module.exports = router