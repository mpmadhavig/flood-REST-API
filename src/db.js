var mysql = require("mysql");
var sql = "";

const db_options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

var con = mysql.createConnection(db_options);

module.exports.find = function find(table, params) {
  sql = `SELECT * `;

  sql = sql.concat(" FROM ?? ");
  sql = mysql.format(sql, [table]);

  var conditions = "";
  if (params && params.length > 0) {
    conditions = conditions.concat(" WHERE ");
    params.forEach((condition) => {
      conditions = conditions.concat(condition, " AND ");
    });
    conditions = conditions.endsWith("AND ")
      ? conditions.slice(0, -4)
      : conditions;
  }

  sql = sql.concat(conditions);
  console.log(sql);

  return new Promise((resolve, reject) => {
    const cb = function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    };

    con.query(sql, cb);
  });
};
