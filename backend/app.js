const express = require("express");
const app = express();

require("dotenv").config();

require("./src/data/dbConnection");



app.listen(process.env.PORT || 80, () => {
    console.log(process.env.PORT  || 80, "portuna bağlandı")
})