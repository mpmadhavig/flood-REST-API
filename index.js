const express = require("express");
const app = express();
const indexRoute = require("./src/route");
require("dotenv").config();
// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "exp-auth-token");
  next();
});

app.use(express.json());

app.use("/", indexRoute);
// app.get("/api/prediction/:latitude&:longitude", (req, res) => {
//   res
//     .status(200)
//     .json(
//       `Welcome to Flood Alert! These are you coordinated (${req.params.latitude}, ${req.params.longitude})...`
//     );
// });

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
