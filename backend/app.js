const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./routes/user.router");
const taskRoute = require('./routes/task.router');

const app = express();
const port = process.env.URL_PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use('/api/users', userRoute);
app.use('/api/tasks', taskRoute);

app.listen(port, () => console.log(`server is runing ${port}`));