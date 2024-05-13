'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

const { SALT } = require('../config/serverConfig');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role,{
        through : 'User_Roles'
        // (1). you cant find any User_Role model file because this table is automatically created by sequelize 
        // with keys id, userId, profileId, createdAt, updatedAt
        // (2). You can also create yourself using models and other ways (.. refer doc) to add any additional columns
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate :{
        isEmail:true,
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,100],
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  // these are the TRIGGERS or we can call it as HOOK in sequelize : MUST READ :)
  User.beforeCreate((user)=>{
    const encryptedPassword = bcrypt.hashSync(user.password,SALT);
    user.password = encryptedPassword;
    console.log("encryptedPassword",encryptedPassword)
  })
  return User;
};