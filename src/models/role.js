'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User,{
        through : 'User_Roles',
        // (1). you cant find any User_Role model file because this table is automatically created by sequelize 
        // with keys id, userId, profileId, createdAt, updatedAt
        // (2). You can also create yourself using models and other ways (.. refer doc) to add any additional columns
      })
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};