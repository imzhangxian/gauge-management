const express = require('express');
const router = express.Router();

const db = require('../db');

// @get api/workorders/ retrieve meter via ID
router.get('/', (req, res) => {
  db.query('SELECT * from work_orders where created_by=$1', 
    [req.user.id], (err, results) => {
      if (!err) {
          res.json(results.rows);
      } else {
          console.log(err);
          res.status(500).send('Internal error');
      }
  });
})

// @post api/workorders create a new work order
router.post('/', async (req, res) => {
    const wosql = 
        `INSERT into work_orders 
            ( type, name, description, created_by, state ) 
            VALUES($1, $2, $3, $4, $5) 
            RETURNING *`;
    const wodata = [
        req.body.type,
        req.body.name,
        req.body.description,
        req.user.id, 
        req.body.initialstate
    ];
    const tasksql = 
        `INSERT into tasks 
            ( order_id, name, description, assignee )
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
    const taskdata = [
        0, // placeholder, update on new work order id
        req.body.taskname ? req.body.taskname : "default task",
        req.body.taskdesc ? req.body.taskdesc : "",
        req.user.id
    ];
    const client = await db.connect();
    try {
        await client.query('BEGIN');
        let results = await client.query(wosql, wodata);
        let wo = results.rows[0];
        taskdata[0] = wo.id;
        results = await client.query(tasksql, taskdata);
        let task = results.rows[0];
        await client.query('COMMIT');
        res.json([wo, task]);
    } catch (e) {
        client.query('ROLLBACK');
        res.status(500).send('Internal error');
    } finally {
        client.release();
    }
})

module.exports = router;