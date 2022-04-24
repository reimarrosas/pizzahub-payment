require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));

app.get("/", (req, res) => {
  res.send({
    message: "Hello, World!",
  });
});

app.use(require('./stripe-endpoints').router);