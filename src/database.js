const mysql = require('mysql');
const router = require('./routes/usuarios');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password@123',
  database: 'rocket1',
  multipleStatements: true
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
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
  const{ID, NOMBRE,SEGUNDORNOMBRE,APELLIDOPATERNO,APELLIDOMATERNO,FECHANACIMIENTO,EMAIL,TELEFONO} = req.body;
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
module.exports = mysqlConnection;