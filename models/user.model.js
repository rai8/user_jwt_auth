const constants = require("../constants/constants");

module.exports = (sequelize, type) => {
  const User = sequelize.define(
    constants.tables.userTable,
    {
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
      }
    },
    {
      paranoid: true,
      defaultScope: {
        where: {
          isArchived: false
        },
        attributes: {
          exclude: ["isArchived"]
        }
      }
    }
  );
  return User;
};
