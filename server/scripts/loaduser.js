require('dotenv').config()
const { Client } = require('pg')
const bcrypt = require('bcrypt');

db = new Client();

// user credential, password, display, role(s), organization
const users = [
    ['xian', 'xian', '天弦', ['admin'], 0], 
    ['zht', 'zht', '队长', ['admin'], 0], 
    ['mapi', 'mapi', '马皮', ['admin'], 0], 
    ['laowei', 'laowei', '老伟', ['admin'], 0]]
// const user = ['admin', 'admin', 'System Admin', ['admin'], 0]
const sqltext = `
    INSERT into users(
        username,
        password,
        display,
        roles,
        org
    ) VALUES (
        $1, $2, $3, $4, $5
    ) RETURNING *`;
loaduser = async () =>{
    try {
        await db.connect();
        for (let i in users) {
            let user = users[i];
            console.log('Loading ... ' + user);
            const hash = await bcrypt.hash(user[1], 10);
            console.log(hash);
            user[1] = hash;
            const results = await db.query(sqltext, user);
            console.log('loaded: ' + results.rows[0]);
        }
    } catch (e) {
        console.log(e);
    } finally {
        await db.end();
    }
}

loaduser()
