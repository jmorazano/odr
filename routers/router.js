const serverAssets = require('express').static;

// TODO: build API integration
const routerApi = require('./api.router.js');
const routerApp = require('./app.router.js');
const routerAccount = require('./account.router.js');
const routerAdmin = require('./admin.router.js');
const errorMiddleware = require('./../middlewares/error.middleware.js');

module.exports.init = (app, path) => {
  // Set static path
  app.use('/assets', serverAssets(`${path}/assets`));

  // Set routers
  app.use('/', routerAccount, routerApp); // TODO: fix error middleware
  app.use('/admin', routerAdmin);
  app.use('/api', routerApi, errorMiddleware.api);

  // Set default route TODO: define default route behaviour
  app.use('*', (req, res, next) => {
    res.send('Default route');
    next();
  });
};
