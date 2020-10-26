const { getConnectionManager } = require('typeorm');
require('dotenv').config();

const {
  DATABASE,
  USER_NAME,
  USER_PASSWORD,
  HOST,
  DB_PORT,
} = process.env;

const connectionManager = getConnectionManager();

const connection = connectionManager.create({
  type: 'postgres',
  host: HOST,
  port: DB_PORT,
  username: USER_NAME,
  password: USER_PASSWORD,
  database: DATABASE,
});

connection.connect()
  .then(() => console.log('did this work?'))
  .catch(() => console.log('this did not work :('));
