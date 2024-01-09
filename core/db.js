const Sequelize = require("sequelize");

let poolMaxConnections = 66;
const envPoolMaxConnection = parseInt(process.env.DB_POOL_MAX_CONNECTIONS);
if (envPoolMaxConnection) poolMaxConnections = envPoolMaxConnection;

let opts = {
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true,
    updatedAt: "updatedAt",
    timestamps: true
  },
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  pool: {
    max: poolMaxConnections,
    min: 0,
    idle: 60000,
    acquire: 100000,
    evict: 10000
  },
  benchmark: true,
  logging: (sql, timingMs) => {
    console.log(`${sql} ------- [Execution time ------- ${timingMs}ms ]`);
  }
};

let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, opts);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((e) => {
    console.log(`Unable to connect to the database: ${e.message}`);
    process.exit();
  });

const op = Sequelize.Op;

const userTable = require("../models/user.model");
const roleTable = require("../models/role.model");

const User = userTable(sequelize, Sequelize);
const Role = roleTable(sequelize, Sequelize);

//Relationships
User.belongsTo(Role, { as: "userRole", foreignKey: "roleId" });

module.exports = {
  op,
  sequelize,
  User,
  Role
};
