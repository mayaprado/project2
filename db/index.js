const pgp = require('pg-promise')();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'mars_db',
};

const db = pgp(process.env.DATABASE_URL || cn);

module.exports = db;
