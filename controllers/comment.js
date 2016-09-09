"use strict"
var request = require('request'),
    Comment = require('../models/comment.js');

module.exports.getComment = function(req,res){
    Comment.getUser(function(err,list){
        if(err){
            console.log(err);
            return;
        }
        res.render('admin-comment',{
            title:'列表',
            list : list
        });
    });
};

module.exports.getRated = function (req,res) {
    var email = req.query.email;
    var now = new Date();
    var year = now.getFullYear();
    var mouth = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1) ;
    var date = year + '-' + mouth;
    Comment.getRated(email,date,function(err,rated){
        if(err){
            res.json({
                code : 99,
                result : {

                },
                msg : err
            });
            return;
        }
        if(!rated){
            res.json({
                code : 99,
                result : {

                },
                msg : '改自评不存在!'
            });
            return;
        }
        res.json({
            code : 100,
            result : rated,
            msg : 'success'
        });
    });

};

module.exports.postSave = function(req,res){
    var email = req.body.email;
    var now = new Date();
    var year = now.getFullYear();
    var mouth = (now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1) ;
    var date = year + '-' + mouth;
    var data =  eval(req.body.data);
    var comment = {};
    for(let item of data){
        comment[item.name] = item.value;
    }
    var newComment = new Comment(email,date,comment);

    newComment.save(function(err){
        if(err){
            return res.json({
                code : 98,
                result : {},
                msg : err
            });
        }
        res.json({
            code : 100,
            result : {},
            msg : 'success'
        })
    });
};


