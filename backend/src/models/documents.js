const sequelize = require("../data/dbConnection");
const {DataTypes} = require("sequelize");

const Documents = sequelize.define("documents",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    document_type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull:false
    },
    rejection_reason:{
        type:DataTypes.TEXT,
    },
})

module.exports = Documents;
