const express = require('express');
const router = express.Router();

const db = require('../db');

// @get api/tasks/mine retrieve meter via work order ID
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

module.exports = router;
