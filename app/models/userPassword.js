const Sequelize = require("sequelize");
const db = require("../models/db");
const User = require("./user");

const userPassword = db.define('user_password',{
   id:{
    type:Sequelize.BIGINT,
    autoIncrement:true,
    primaryKey:true,
    allowNull:false
   },
   password:{
    type:Sequelize.STRING,
    allowNull:false
   },
   createdBy:{
    type:Sequelize.STRING,
    allowNull:true
   },
   userId:{
    type:Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
  }
   }
});
User.hasOne(userPassword, { foreignKey: 'userId' });
userPassword.belongsTo(User, { foreignKey: 'userId' });
module.exports =userPassword;
