const { Pool } = require('pg');
const pool = new Pool({
  connectionString:
    'postgres://infkismr:d6uHQrM8VIgGlBKoaAb25JBH5_GQ0pw-@raja.db.elephantsql.com:5432/infkismr'
});
// 'postgres://infkismr:d6uHQrM8VIgGlBKoaAb25JBH5_GQ0pw-@raja.db.elephantsql.com:5432/infkismr'

const controller = {};

// had to create tables using command line.
// const CREATE_TODOS_TABLE =
//   'CREATE TABLE IF NOT EXISTS Todos(todo_id SERIAL PRIMARY KEY, uname VARCHAR(100) NOT NULL, text VARCHAR(100) NOT NULL);';

// const CREATE_USERS_TABLE =
//   'CREATE TABLE IF NOT EXISTS Users(user_id SERIAL PRIMARY KEY, uname VARCHAR(100) NOT NULL, pw VARCHAR(100) NOT NULL);';

// pool.query(CREATE_TODOS_TABLE, (err, res, next) => {
//   console.log('successfully created todos table! ');
// });

// pool.query(CREATE_USERS_TABLE, (err, res, next) => {
//   console.log('successfully created Users table! ');
// });

controller.signup = (req, res, next) => {
  console.log(req.body.uname, req.body.pw);
  pool.query(
    'INSERT INTO Users (uname, pw) VALUES ($1, $2);',
    [req.body.uname, req.body.pw],
    (error, result) => {
      if (error) console.log(error);
      console.log('created a user!');
      next();
    }
  );
};
controller.login = (req, res, next) => {
  pool.query(
    'SELECT * FROM Users WHERE uname=$1 AND pw=$2;',
    [req.body.uname, req.body.pw],
    (error, result) => {
      if (error) next(error);
      res.locals.result = result.rows[0]; // result is undefined if there's no matching row.
      next();
    }
  );
};

module.exports = controller;
