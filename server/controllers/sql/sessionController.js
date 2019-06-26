const { Pool } = require('pg');
const pool = new Pool({
  connectionString:
    'postgres://infkismr:d6uHQrM8VIgGlBKoaAb25JBH5_GQ0pw-@raja.db.elephantsql.com:5432/infkismr'
});
const controller = {};
/////////

controller.startSession = (req, res, next) => {
  console.log('\n---invoking startSession middleware---');
  const randomSSID = Math.floor(Math.random() * 1000);

  pool.query(
    'INSERT INTO Sessions (cookie_id,user_id) VALUES ($1,$2) RETURNING cookie_id, user_id;',
    [randomSSID, res.locals.result],
    (err, result) => {
      if (err) return next('\nDB ERROR CREATING A SESSION:\n' + err);
      res.locals.ssid = result.rows[0].cookie_id;
      console.log('Session row successfuly created = ', res.locals.ssid);
      next();
    }
  );
};

controller.isLoggedIn = (req, res, next) => {
  pool.query(
    'SELECT * FROM Sessions WHERE cookie_id=$1 RETURNING (user_id);',
    [req.cookies.ssid],
    (error, result) => {
      if (error) return next(error);
      res.locals.result =
        result.rows.length > 0 ? result.rows[0].user_id : false;
      return next();
    }
  );
};

// controller.signup({ body: { uname: 'bob', pw: 'dole' } });

module.exports = controller;
