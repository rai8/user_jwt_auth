const constants = require("../constants/constants");

module.exports = (sequelize, type) => {
  const Role = sequelize.define(
    constants.tables.roleTable,
    {
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
  return Role;
};
