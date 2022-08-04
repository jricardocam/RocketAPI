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
    mysqlConnection.query('SELECT * FROM usuarios WHERE ID = ?', [ID], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/', (req, res) => {
    const{ID, NOMBRE,SEGUNDORNOMBRE,APELLIDOPATERNO,APELLIDOMATERNO,FECHANACIMIENTO,EMAIL,TELEFONO} = req.body;
    const query= `
      SET @ID = ?;
      SET @NOMBRE = ?;
      SET @SEGUNDORNOMBRE = ?;
      SET @APELLIDOPATERNO = ?;
      SET @APELLIDOMATERNO = ?;
      SET @FECHANACIMIENTO = ?;
      SET @EMAIL = ?;
      SET @TELEFONO = ?;
      CALL USUARIOADDOREDIT(@ID, @NOMBRE, @SEGUNDORNOMBRE, @APELLIDOPATERNO, @APELLIDOMATERNO, @FECHANACIMIENTO, @EMAIL, @TELEFONO);
      `;
    mysqlConnection.query(query,[ID, NOMBRE,SEGUNDORNOMBRE,APELLIDOPATERNO,APELLIDOMATERNO,FECHANACIMIENTO,EMAIL,TELEFONO],(err, rows, fields) => {
      if (!err) {
        res.json({Status: 'Usuario agregado'});
      } else {
        console.log(err);
      }
    });
  });
  
  router.put('/:ID', (req, res) => {
    const{I, NOMBRE,SEGUNDORNOMBRE,APELLIDOPATERNO,APELLIDOMATERNO,FECHANACIMIENTO,EMAIL,TELEFONO} = req.body;
    const { ID } = req.params;
    const query= 'CALL USUARIOUPDATE(?,?,?,?,?,?,?,?)';
    mysqlConnection.query(query,[ID, NOMBRE,SEGUNDORNOMBRE,APELLIDOPATERNO,APELLIDOMATERNO,FECHANACIMIENTO,EMAIL,TELEFONO],(err, rows, fields) => {
      if (!err) {
        res.json({Status: 'Usuario actualizado'});
      } else {
        console.log(err);
      }
    });
    
  });
  
  router.delete('/:ID', (req, res) => {
    const { ID } = req.params;
    mysqlConnection.query('DELETE FROM usuarios WHERE ID = ?', [ID], (err, rows, fields) => {
      if (!err) {
        res.json({Status: 'Usuario eliminado'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;