const express = require('express')
const router = express.Router()

const db = require('../db')

// @get api/watermeters retrieve all meters
router.get('/', (req, res) => {
    db.query('SELECT * from watermeters', (err, results) => {
        if (!err) {
            res.json(results.rows)
        } else {
            console.log(err)
            res.status(500).send('Internal error')
        }
    })
})

// @get api/watermeters/:id retrieve meter via ID
router.get('/:id', (req, res) => {
    db.query('SELECT * from watermeters where id=$1', [req.params.id], (err, results) => {
        if (!err) {
            res.json(results.rows[0])
        } else {
            console.log(err)
            res.status(500).send('Internal error')
        }
    })
})

// @post api/watermeters create a new water meter
router.post('/', (req, res) => {
    const sqltext = 
        `INSERT into watermeters(
                number, 
                name, 
                made_by, 
                model, 
                made_on, 
                update_on
            ) 
            VALUES($1, $2, $3, $4, $5, NOW()) 
            RETURNING *`
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
            res.status(500).send('Internal error')
        }
    })
})

// @delete api/watermeters delete a watermeters
router.delete('/:id', (req, res) => {
    db.query('DELETE from watermeters where id=$1', [req.params.id], (err, results) => {
        if (!err) {
            if (results.rowCount == 0) {
                res.status(404).send('Not found')
            } else {
                res.json({success:true})
            }
        } else {
            console.log(err)
            res.status(500).send('Internal error')
        }
    })
});

// @put api/watermeters update a watermeter
//  - input: json string with key/value pair to update
router.put('/:id', (req, res) => {
    updatesql = 'UPDATE watermeters set '
    // build update SQL with key/value pairs
    var sqlparams = []
    for(var keys = Object.keys(req.body), i = 0, end = keys.length; i < end; i ++) {
        var key = keys[i]
        updatesql += `${key}=($${i + 1})`
        sqlparams.push(req.body[key])
        if (i + 1 < end) {
            updatesql += ', '
        }
    }
    // TODO: update_by / update_on
    // TODO: update history audit
    
    sqlparams.push(req.params.id)
    updatesql += ` where id=$${sqlparams.length} RETURNING *`
    db.query(updatesql, sqlparams, (err, results) => {
        if (!err) {
            if (results.rowCount == 0) {
                res.status(404).send('Not found')
            } else {
                res.json({success:true, changed:results.rows[0]})
            }
        } else {
            console.log(err)
            res.status(500).send('Internal error')
        }
    })
});

module.exports = router
