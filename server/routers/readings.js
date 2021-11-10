const express = require('express')
const router = express.Router()

const db = require('../db')

// @get api/readings/:id retrieve meter via ID
router.get('/:meterid', (req, res) => {
  db.query('SELECT * from readings where meter_id=$1', [req.params.meterid], (err, results) => {
      if (!err) {
          res.json(results.rows)
      } else {
          console.log(err)
          res.status(500).send('Internal error')
      }
  })
})

module.exports = router