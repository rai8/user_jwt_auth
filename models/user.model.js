const constants = require("../constants/constants");

module.exports = (sequelize, type) => {
  const User = sequelize.define(constants.tables.userTable, {
    userId: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: type.STRING(100),
      allowNull: false
    },
    lastName: {
      type: type.STRING(100),
      allowNull: false
    },
    roleId: {
      type: type.INTEGER,
      allowNull: false
    },
    email: {
      type: type.STRING(50),
      allowNull: false
    },
    password: {
      type: type.STRING(225),
      allowNull: false
    },
    isArchived: {
      type: type.BOOLEAN,
      allowNull: false,
      default: false
    },
    createdAt: {
      type: type.DATE,
      allowNull: false,
      default: new Date()
    },
    updatedAt: {
      type: type.DATE,
      allowNull: false,
      default: new Date()
    }
  });
  return User;
};
