const constants = require("../constants/constants");

module.exports = (sequelize, type) => {
  const Role = sequelize.define(constants.tables.roleTable, {
    roleId: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roleName: {
      type: type.STRING(100),
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
  return Role;
};
