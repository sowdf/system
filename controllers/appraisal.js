"use strict"
var request = require('request'),
    Rated = require('../models/user.js');
module.exports.getTask = function(req,res){


}

module.exports.postTask = function(req,res){

}


module.exports.getRated = function(req,res){
    res.render('rated', { title: '自评' });
}
module.exports.postRated = function(req,res){
    var data =  eval(req.body.data);
    var rated = {};
    for(let item of data){
        //console.log(item);
        rated[item.name] = item.value;
    }
    rated.email = req.session.email;
    

}
