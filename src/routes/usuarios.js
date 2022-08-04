const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/:ID', (req, res) => {
    const { ID } =req.params;
    console.log(ID);
    mysqlConnection.query('SELECT * FROM usuarios WHERE ID = ?', [ID], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;