const express = require("express");
const bodyParser = require("body-parser");
const carsRoutes = require("./routes/cars.js");
const carItemsRoutes = require("./routes/carItems.js");

const app = express();

app.use(bodyParser.json());

app.use("/api/cars", carsRoutes);
app.use("/api/carItems", carItemsRoutes);

const port = process.env.port || 4000;

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API rodando em localhost:${port}`);
});
