require("dotenv").config();
const express = require("express");
const router = require("./router/route");
const midwareErrorHandler = require("./error/midwareErrorHandler");

const app = express();
const HOST = process.env.PORT;

app.use(router);
app.use(midwareErrorHandler);

app.listen(HOST, () => console.log("Server connected"));
