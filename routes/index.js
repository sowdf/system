var register = require('../controllers/register');
var login = require('../controllers/login');
var logout = require('../controllers/logout');
var check = require('../controllers/checkLogin');
var appraisal = require('../controllers/appraisal');
var crypto = require('crypto'),
    User = require('../models/user.js');
module.exports = function(app) {
  app.get('/',check.checkLogin);
  app.get('/', function (req, res) {
    res.render('index',{
      title : '首页',
      user : req.session.user
    });
  });

  app.get('/reg',check.checkNotLogin);
  app.get('/reg',register.get);
  app.post('/reg',register.post);

  app.get('/login',check.checkNotLogin);
  app.get('/login',login.get);
  app.post('/login',login.post);
  /*
  * 个人任务列表
  * */
  app.get('/appraisal/task-list',check.checkNotLogin);
  app.get('/appraisal/task-list',appraisal.getTask);
  app.post('/appraisal/task-list',appraisal.postTask);

  /*
   * 自我评价列表
   * */
  app.get('/appraisal/rated-list',check.checkNotLogin);
  app.get('/appraisal/rated-list',appraisal.getRatedList);

  /*
   * 自我评价
   * */
  app.get('/appraisal/task-rated',check.checkNotLogin);
  app.get('/appraisal/task-rated',appraisal.getRated);
  /*
   * 提交任务的接口
   * */
  app.post('/appraisal/interface-rated',appraisal.postRated);
  /*
  * 内容页面
  * */
  app.get('/content/:date',check.checkNotLogin);
  app.get('/content/:date',appraisal.getContent);

  app.get('/logout',check.checkLogin);
  app.get('/logout', logout.get);
};

