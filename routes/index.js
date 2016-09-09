var register = require('../controllers/register');
var login = require('../controllers/login');
var logout = require('../controllers/logout');
var check = require('../controllers/checkLogin');
var appraisal = require('../controllers/appraisal');
var comment = require('../controllers/comment');
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
  app.get('/appraisal/task-list',check.checkLogin);
  app.get('/appraisal/task-list',appraisal.getTask);
  app.post('/appraisal/task-list',appraisal.postTask);

  /*
   * 自我评价列表
   * */
  app.get('/appraisal/rated-list',check.checkLogin);
  app.get('/appraisal/rated-list',appraisal.getRatedList);

  /*
   * 自我评价
   * */
  app.get('/appraisal/task-rated',check.checkLogin);
  app.get('/appraisal/task-rated',appraisal.getRated);
  /*
   * 提交任务的接口
   * */
  app.post('/appraisal/interface-rated',appraisal.postRated);
  /*
   * 内容页面
   * */
  app.get('/content/:date',check.checkLogin);
  app.get('/content/:date',appraisal.getContent);
  /*
   * admin 后台评论页
   * */
  app.get('/admin/comment',check.checkLogin);
  app.get('/admin/comment',comment.getComment);

  /*
   * admin 后台评论保存
   * */
  app.post('/admin/comment-save',check.checkLogin);
  app.post('/admin/comment-save',comment.postSave);

  /*
   * admin 获取单个rated接口
   * */
  app.get('/admin/getRated',check.checkLogin);
  app.get('/admin/getRated',comment.getRated);

  app.get('/logout',check.checkLogin);
  app.get('/logout', logout.get);
};

