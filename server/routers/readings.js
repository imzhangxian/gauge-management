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

// @post api/readings add a new reading record
router.post('/', (req, res) => {
    const sqltext = 
        `INSERT into readings(
                meter_id, 
                reading, 
                update_by
            ) 
            VALUES($1, $2, $3) 
            RETURNING *`
    const rowdata = [
        req.body.meterid,
        req.body.reading,
        req.user.id
    ]
    db.query(sqltext, rowdata, (err, results) => {
        if (!err) {
            res.json(results.rows[0])
        } else {
            console.log(err)
            res.status(500).send('Internal error')
        }
    })
})

module.exports = router