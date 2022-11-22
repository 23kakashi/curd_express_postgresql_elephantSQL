// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "tapish",
//   host: "localhost",
//   database: "mockdb",
//   password: "Kakashi@23Ps",
//   port: 5432,
// });

// const createPerson = (req, res) => {
//   const {name, email} = req.body
//   pool.query('INSERT INTO person (name, email) VALUES ')
// }

// module.exports = pool;

var pg = require("pg");

var conString =
  "postgres://wlvrnqyn:yf5xexuTkWx6zFIlZa7ivfUbsdOBTu1n@tiny.db.elephantsql.com/wlvrnqyn";
export const client = new pg.Client(conString);
// client.connect(function (err) {
//   if (err) {
//     return console.error("could not connect to postgres", err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function (err, result) {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(result.rows[0].theTime);
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });
