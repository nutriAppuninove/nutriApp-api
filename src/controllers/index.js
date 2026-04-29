// Barrel — registro central dos controllers da aplicação.
const userController = require("./user.controller");
const formController = require("./form.controller");
const authController = require("./auth.controller");

module.exports = {
  user: userController,
  form: formController,
  auth: authController,
};
