const express = require('express')
const router = express.Router()

const db = require('../db')

// @get api/watermeters retrieve all meters
router.get('/', (req, res) => {
    db.query('SELECT * from watermeters', (err, results) => {
        if (!err) {
            res.json(results.rows)
        } else {
            res.json({error:err})
        }
    })
})

// @get api/watermeters/:id retrieve meter via ID
router.get('/:id', (req, res) => {
    db.query('SELECT * from watermeters where id=$1::integer', [req.params.id], (err, results) => {
        if (!err) {
            res.json(results.rows[0])
        } else {
            res.json({error:err})
        }
    })
})

// @post api/watermeters create a new water meter
router.post('/', (req, res) => {
    const sqltext = 'INSERT into watermeters(number, name, made_by, model, made_on, update_on) VALUES($1, $2, $3, $4, $5, NOW()) RETURNING *'
    const rowdata = [
        req.body.number,
        req.body.name,
        req.body.made_by,
        req.body.model,
        req.body.made_on
    ]
    db.query(sqltext, rowdata, (err, results) => {
        if (!err) {
            res.json(results.rows[0])
        } else {
            console.log(err)
            res.status()
        }
    })
})

// @delete api/watermeters delete a watermeters
router.delete('/:id', (req, res) => {
    db.query('DELETE from watermeters where id=$1::integer', [req.params.id], (err, results) => {
        if (!err) {
            res.json({success:true})
        } else {
            res.json({error:err})
        }
    })
});
  
module.exports = router
