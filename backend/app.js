const express = require("express");
const app = express();
const path = require("path")
const sequelize = require("./src/data/dbConnection");
const cookieParser = require('cookie-parser');


app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cookieParser());

require("./src/data/dbConnection");
require("./src/data/modelRelationships");

app.use(cors({origin: '*',credentials: true}));
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
const apiAuthRoutes = require("./src/routes/auth");
const apiAdminRoutes = require("./src/routes/admin");
const apiUserRoutes = require("./src/routes/user");


app.use(apiAuthRoutes);
app.use(apiAdminRoutes);
app.use(apiUserRoutes);

//Veritabanını modellere göre sıfırlar

// (async () => {
//   await sequelize.sync({ alter: true });
//   await require("./src/data/dummyData")();
// })();

app.listen(process.env.PORT || 8000, () => {
    console.log(process.env.PORT  || 8000, "portuna bağlandı")
})