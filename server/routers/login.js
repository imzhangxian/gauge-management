require('dotenv').config()
const express = require('express')
const router = express.Router()

const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const accessTokenSecret = process.env.JWTSECRET || 'myaccesstokensecret';

// @login user login
router.post('/', (req, resp) => {
    const sqltext = `SELECT * from users where username=$1`
    const username = req.body.username;
    const password = req.body.password;
    db.query(sqltext, [username], (err, results) => {
        if (err) {
            console.log(err)
            resp.status(500).json({ success: false, reason: "SYSTEM_ERROR" })
        }
        if (results.rowCount === 0) {
            resp.status(401).json({success: false, reason:'NO_USER'})
        }
        bcrypt.compare(password, results.rows[0]['password'], (err, isvaliduser) => {
            if (err) {
                resp.status(500).json({ success: false, reason: "CRYPTO_ERROR" });
            }
            if (isvaliduser) {
                const validateduser = {username: results.rows[0]['username'], roles: results.rows[0]['roles'], org: results.rows[0]['org']}
                const accessToken = jwt.sign(validateduser, accessTokenSecret, { expiresIn: '1h' })
                resp.json({
                  success: true,
                  user: validateduser,
                  token: accessToken
                })
              } else {
                resp.status(401).json({ success: false, reason: "INCORRECT_PWD" });
              }
        })
    })
})

module.exports = router