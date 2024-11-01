const sequelize = require("../data/dbConnection");
const {DataTypes} = require("sequelize");

const Workers = sequelize.define("workers",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    surname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    identity_no:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
})

module.exports = Workers;
