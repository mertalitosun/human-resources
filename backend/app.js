const express = require("express");
const app = express();
const sequelize = require("./src/data/dbConnection");
require("dotenv").config();

require("./src/data/dbConnection");
require("./src/data/modelRelationships");


//Veritabanını modellere göre sıfırlar
// (async () => {
//   await sequelize.sync({ force: true });
// })();


app.listen(process.env.PORT || 80, () => {
    console.log(process.env.PORT  || 80, "portuna bağlandı")
})