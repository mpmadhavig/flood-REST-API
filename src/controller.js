const db = require("./db");
const mysql = require("mysql");
module.exports.indexAction = async (req, res) => {
  var params = [];
  params.push(
    mysql
      .escapeId("latitude")
      .concat(" > ")
      .concat(mysql.escape(req.params.latitude - 0.001))
  );

  params.push(
    mysql
      .escapeId("latitude")
      .concat(" < ")
      .concat(mysql.escape(req.params.latitude + 0.001))
  );

  params.push(
    mysql
      .escapeId("longitude")
      .concat(" < ")
      .concat(mysql.escape(req.params.longitude + 0.001))
  );

  params.push(
    mysql
      .escapeId("longitude")
      .concat(" > ")
      .concat(mysql.escape(req.params.longitude - 0.001))
  );

  db.find("predictions", params)
    .then(async (result) => {
      if (result.length !== 0) {
        if (result.length > 1) {
          var lowest = helper(
            {
              latitude: req.params.latitude,
              longitude: req.params.longitude,
            },
            result
          );
          var final = result[lowest.index];
          return res.status(200).json({
            result: final,
          });
        }
        return res.status(200).json({ result });
      }
      res.status(201).json({ message: "No recods Found" });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

function helper(user_coordinates, db_results) {
  var row;
  let lowest = {
    index: count,
    value: 1000000,
    coordinates: { latitude: "", longitude: "" },
  };
  let count = 0;
  for (row of db_results) {
    count += 1;
    var distance =
      Math.sqrt(row.latitude - user_coordinates.latitude) +
      Math.sqrt(row.longitude - user_coordinates.longitude);
    if (distance < lowest.value) {
      lowest.index = count;
      lowest.value = distance;
      lowest.coordinates.latitude = row.latitude;
      lowest.coordinates.longitude = row.longitude;
    }
  }
  return lowest;
}
