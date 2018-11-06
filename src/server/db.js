const initOptions = {
  connect(client, dc, useCount) {
    const cp = client.connectionParameters;
    console.log('Connected to database:', cp.database);
  },
  disconnect(client, dc) {
    const cp = client.connectionParameters;
    console.log('Disconnecting from database:', cp.database);
  },
  query(e) {
    console.log('QUERY:', e.query);
  },
  receive(data, result, e) {
    console.log('DATA: ', data);
  }
}

const pgp = require('pg-promise')(initOptions);
const cn = "postgres://wzchjvxa:OIT6nK-98-kJFLAn_RESoiQq3tnBMU5L@pellefant.db.elephantsql.com:5432/wzchjvxa";
const db = pgp(cn);

module.exports = db;