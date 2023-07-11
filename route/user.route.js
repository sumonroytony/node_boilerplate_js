module.exports = (app) => {
  const userController = require('../controller/user.controller.js');
  app.post('/register', userController.register);
  app.post('/login', userController.login);
};
