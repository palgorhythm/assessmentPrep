const { Pool } = require('pg');
const pool = new Pool({
  connectionString:
    'postgres://infkismr:d6uHQrM8VIgGlBKoaAb25JBH5_GQ0pw-@raja.db.elephantsql.com:5432/infkismr'
});
const controller = {};

controller.signup = (req, res, next) => {
  pool.query(
    'INSERT INTO Users (uname, pw) VALUES ($1, $2) RETURNING (uname);',
    [req.body.uname, req.body.pw],
    (error, result) => {
      if (error) console.log(error);
      res.locals.result = result.rows[0].uname;
      console.log('created a user!');
      next();
    }
  );
};
controller.login = (req, res, next) => {
  console.log(req.body.uname, req.body.pw);
  pool.query(
    'SELECT * FROM Users WHERE uname=$1 AND pw=$2;',
    [req.body.uname, req.body.pw],
    (error, result) => {
      if (error) return next(error);
      if (!result.rows[0]) return next('you are not a user');
      res.locals.result = result.rows[0].uname; // result is undefined if there's no matching row.
      return next();
    }
  );
};

module.exports = controller;
