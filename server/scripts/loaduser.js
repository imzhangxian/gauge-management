require('dotenv').config()
const { Client } = require('pg')
const bcrypt = require('bcrypt');

db = new Client()

// user credential, password, display, role(s), organization
const user = ['admin', 'admin', 'System Admin', ['admin'], 0]
const sqltext = `
    INSERT into users(
        username,
        password,
        display,
        roles,
        org
    ) VALUES (
        $1, $2, $3, $4, $5
    ) RETURNING *`
loaduser = async () =>{
    try {
        const hash = await bcrypt.hash(user[1], 10)
        console.log(hash)
        user[1] = hash
        await db.connect()
        const results = await db.query(sqltext, user)
        console.log(results.rows[0])
        
        await db.end()
    } catch (e) {
        console.log(e)
    }
}

loaduser()


