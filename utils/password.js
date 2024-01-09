const bcrypt = require("bcryptjs");

//encrypt password
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

//decrypt password
const comparePassword = (pwd, hash) => {
  return bcrypt.compareSync(pwd, hash);
};
module.exports = { hashPassword, comparePassword };
