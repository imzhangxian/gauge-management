require('dotenv').config()
const { Client } = require('pg')
const bcrypt = require('bcrypt');

db = new Client();

// meter template
const meter = {
    "number": "GW010023",
    "name": "普通表023",
    "made_by": 3,
    "model": 103,
    "made_on": "2021-05-09",
    "update_by": 100002
};
// const user = ['admin', 'admin', 'System Admin', ['admin'], 0]
const sqltext = `
    INSERT into watermeters(
        number,
        name,
        made_by,
        model,
        made_on,
        update_by
    ) VALUES (
        $1, $2, $3, $4, $5, $6
    ) RETURNING *`;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

loaduser = async () =>{
    try {
        await db.connect();
        for (let i = 0; i < 5; i ++) {
            let suffix = getRandomInt(9);
            meter.number = `GWM010${i}0${suffix}`;
            meter.name = `表计${i}0${suffix}`;
            let manufacturer = getRandomInt(9);
            meter.made_by = manufacturer;
            let model = getRandomInt(60);
            meter.model = manufacturer * 100 + model;
            let ransec = getRandomInt(1000);
            meter.made_on = new Date(Date.now() - 100000000 * ransec);
            const results = await db.query(sqltext, [
                meter.number, meter.name, meter.made_by, meter.model, meter.made_on, meter.update_by
            ]);
            console.log('Loaded: ' + results.rows[0]);
        }
    } catch (e) {
        console.log(e);
    } finally {
        await db.end();
    }
}

loaduser()
