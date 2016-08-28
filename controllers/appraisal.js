"use strict"
var request = require('request'),
    Rated = require('../models/appraisal.js');
module.exports.getTask = function(req,res){


};

module.exports.postTask = function(req,res){

};
module.exports.getRatedList = function(req,res){
    var email = req.session.user.email;
    Rated.getAll(email,function(err,list){
        if(err){
            return;
        }
        res.render('rated-list', {
            title: '自评列表',
            data : list
        })
    });


};

module.exports.getContent = function(req,res){
    var email = req.session.user.email;
    var date = req.params.date;
    Rated.getOne(email,date,function(err,doc){
        if(err){
            return;
        }
        res.render('content', {
            title: '自评列表',
            content : doc.summed,
            date : doc.date
        })
    });

};

module.exports.getRated = function(req,res){
    res.render('rated', { title: '自评' });
};
module.exports.postRated = function(req,res){
    var data =  eval(req.body.data);
    var rated = {};
    for(let item of data){
        //console.log(item);
        rated[item.name] = item.value;
    }
    rated.email = req.session.user.email;
    var newRated = new Rated(rated);
    Rated.get(rated.email,rated.date,function(err,data){
        console.log(data);
        if(err){
            res.json({
                code : 97,
                msg : err
            });
            return ;
        }
        if(data){
            res.json({
                code : 99,
                msg : '该自评已存在!'
            });
            return ;
        }
        newRated.save(function(err){
            console.log(err);
            if(err){
                res.json({
                    code : 97,
                    msg : err
                });
                return ;
            }
            res.json({
                code : 100,
                msg : '提交成功'
            });
        });
    });

};


