const pgp = require('pg-promise')();

const cn = process.env.PG_DB || 'postgresql://localhost/resto';

const db = pgp(cn);
module.exports = db
