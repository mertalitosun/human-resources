const sequelize = require("../data/dbConnection");
const {DataTypes} = require("sequelize");

const Notifications = sequelize.define("notifications",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    message:{
        type:DataTypes.TEXT,
    },
    type:{
        type:DataTypes.ENUM("approved,rejected")
    }
})

module.exports = Notifications;
