const sequelize = require("../data/dbConnection");
const {DataTypes} = require("sequelize");

const Documents = sequelize.define("documents",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    path: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type:DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue:"pending",
        allowNull:false
    },
    rejection_reason:{
        type:DataTypes.TEXT,
    },
})

module.exports = Documents;
