const express = require('express');
const router = express.Router();

const db = require('../db');
const taskmapping = require('../wf/task-mapping')

// @get api/tasks/mine - retrieve meter via work order ID
router.get('/mine', (req, res) => {
  db.query('SELECT * from tasks where assignee=$1', 
    [req.user.id], (err, results) => {
      if (!err) {
          res.json(results.rows);
      } else {
          console.log(err);
          res.status(500).send('Internal error');
      }
  });
})

// @post /api/tasks/execute - execute task
router.post('/execute/:id', async (req, resp) => {
  let client = await db.connect();
  try {
    // 1. query for task and work order
    let res = await client.query('SELECT * from tasks where id=$1', [req.params.id]);
    let task = res.rows[0];
    if ( task.completed ) {
      throw new Error('Task already completed!');
    }
    res = await client.query('SELECT * from work_orders where id=$1', [task.order_id]);
    let wo = res.rows[0];
    // 2. find executor
    const executor = loadTaskExecutor(wo, task);
    if ( ! executor ) {
      throw new Error('Task executor NOT defined!')
    }
    // 3. execute task and return: 
    //    i) updated work order, ii) updated task and iii) if applicable, next task
    // TODO: executor to return array of objects (or SQLs?) to persist?
    let nextTask;
    let variables = req.body.variables;
    if (! variables) {
      variables = task.variables;
    }
    wo, task, nextTask = 
      executor(wo, task, req.body.approval, variables);
    // 4. persist work order, task and next task 
    await client.query('BEGIN');
    res = await client.query(
      'UPDATE work_orders set state=$1 where id=$2 RETURNING *', 
      [wo.state, wo.id])
    wo = res.rows[0];
    res = await client.query(
      'UPDATE tasks set completed=$1 where id=$2 RETURNING *', 
      [task.completed, task.id])
    task = res.rows[0];
    if ( nextTask ) {
      const newtasksql = 
      `INSERT into tasks 
          ( order_id, name, description, step, assignee, variables )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *`;
      res = await client.query(
        newtasksql, 
        [wo.id, nextTask.name, nextTask.description, nextTask.step, nextTask.assignee, nextTask.variables])
      nextTask = res.rows[0];
    }

    // TODO here if any more biz objects to create/update

    await client.query('COMMIT');
    // 5. send response
    resp.json([wo, task, nextTask]);
  } catch (e) {
    console.log(e);
    client.query('ROLLBACK');
    resp.status(500).send(e.message);
  } finally {
    client.release();
  }
})

function loadTaskExecutor( wo, task ) {
  let executor = null;
  try {
    executor = require(`../wf/${wo.type}/executor/${taskmapping[wo.type][task.step]}`);
  } catch (e) {
    executor = null;
    console.log(e);
  }
  return executor;
}

module.exports = router;
