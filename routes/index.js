var register = require('../controllers/register');
var login = require('../controllers/login');
var logout = require('../controllers/logout');
var check = require('../controllers/checkLogin');
var crypto = require('crypto'),
    User = require('../models/user.js');
module.exports = function(app) {
  app.get('/',check.checkLogin);
  app.get('/', function (req, res) {
    res.render('index', { title: '主页' });
  });

  app.get('/reg',check.checkNotLogin);
  app.get('/reg',register.get);
  app.post('/reg',register.post);

  app.get('/login',check.checkNotLogin);
  app.get('/login',login.get);
  app.post('/login',login.post);

  app.get('/logout',check.checkLogin);
  app.get('/logout', logout.get);
};

