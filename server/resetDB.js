const { Pool } = require('pg');
const pool = new Pool({
  connectionString:
    'postgres://infkismr:d6uHQrM8VIgGlBKoaAb25JBH5_GQ0pw-@raja.db.elephantsql.com:5432/infkismr'
});

const CREATE_TODOS_TABLE =
  'CREATE TABLE IF NOT EXISTS Todos(todo_id SERIAL PRIMARY KEY, uname VARCHAR(100) NOT NULL, text VARCHAR(100) NOT NULL);';

const CREATE_USERS_TABLE =
  'CREATE TABLE IF NOT EXISTS Users(user_id SERIAL PRIMARY KEY, uname VARCHAR(100) NOT NULL, pw VARCHAR(100) NOT NULL);';

const CREATE_SESSIONS_TABLE =
  'CREATE TABLE IF NOT EXISTS Sessions(session_id SERIAL PRIMARY KEY, cookie_id INTEGER NOT NULL, user_id VARCHAR(100) NOT NULL, createdAt DATE NOT NULL default CURRENT_DATE);';

const DROP_TABLES = 'DROP TABLE Todos; DROP TABLE Sessions; DROP TABLE Users;';

async function resetData() {
  await new Promise((resolve, reject) => {
    pool.query(DROP_TABLES, (err, res, next) => {
      console.log('successfully dropped all tables ! ');
      resolve();
    });
  });

  await new Promise((resolve, reject) => {
    pool.query(CREATE_SESSIONS_TABLE, (err, res, next) => {
      console.log('successfully created Sessions table! ');
      resolve();
    });
  });
  await new Promise((resolve, reject) => {
    pool.query(CREATE_TODOS_TABLE, (err, res, next) => {
      console.log('successfully created todos table! ');
      resolve();
    });
  });
  await new Promise((resolve, reject) => {
    pool.query(CREATE_USERS_TABLE, (err, res, next) => {
      console.log('successfully created Users table! ');
      resolve();
    });
  });
}

resetData();
