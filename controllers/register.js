var crypto = require('crypto'),
    User = require('../models/user.js');
module.exports.get = function(req, res) {
    res.render('register', { title: 'register' });

};
module.exports.post = function(req, res) {
    var email = req.body.email,
        password = req.body.password;
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        email: email,
        password: password
    });
    //检查用户名是否已经存在
    User.get(newUser.email, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        if (user) {
            req.flash('error', '用户已存在!');
            return res.redirect('/reg');//返回注册页
        }
        //如果不存在则新增用户
        newUser.save(function (err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');//注册失败返回主册页
            }
            req.session.user = newUser;//用户信息存入 session
            req.flash('success', '注册成功!');
            res.redirect('/login');//注册成功后返回主页
        });
    });

};