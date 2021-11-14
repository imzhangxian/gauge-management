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
router.post('/', async (req, resp) => {
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
        ( order_id, name, description, step, assignee )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`;
    const client = await db.connect();
    try {
        await client.query('BEGIN');
        let res = await client.query(wosql, wodata);
        let wo = res.rows[0];
        // if there's a default task associated with the type, then create it
        let task = null;
        let defaultTask = null;
        // try catch: we don't want to roll back work order just because no default task defined.
        try {
            defaultTask = require(`../wf/${req.body.type}/default-task.js`);
        } catch (e) { defaultTask = null; console.log(e); }
        if ( defaultTask ) {
            task = defaultTask(wo);
            const taskdata = [
                wo.id, task.name, task.description, task.step, task.assignee];
            res = await client.query(tasksql, taskdata);
            task = res.rows[0];
        }
        await client.query('COMMIT');
        resp.json([wo, task]);
    } catch (e) {
        client.query('ROLLBACK');
        resp.status(500).send('Internal error');
    } finally {
        client.release();
    }
})

module.exports = router;