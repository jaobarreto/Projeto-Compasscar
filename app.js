const express = require("express");
const app = express();

const port = 4000;

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API rodando em localhost:${port}`);
});