var mongodb = require('./db');
var markdown = require('markdown').markdown;
function Rated(rated) {
    this.date = rated.date;
    this.email = rated.email;
    this.efficiency = rated.efficiency;
    this.mass = rated.mass;
    this.sicence = rated.sicence;
    this.grown = rated.grown;
    this.summed = rated.summed;
};

module.exports = Rated;

//存储用户信息
Rated.prototype.save = function(callback) {
    //要存入数据库的用户文档
    var rated = {
        date : this.date,
        email : this.email,
        efficiency : this.efficiency,
        mass : this.mass,
        sicence : this.sicence,
        grown : this.grown,
        summed : this.summed,
        comment : {}
    };
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('rateds', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //将用户数据插入 users 集合
            collection.insert(rated, {
                safe: true
            }, function (err, rated) {
                mongodb.close();
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                callback(null);//成功！err 为 null，并返回存储后的用户文档
            });
        });
    });
};

//读取用户信息
Rated.get = function(email,date, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 rateds 集合
        db.collection('rateds', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            var query = {
                email: email,
                date : date
            };
            //查找用户名（email）值为 email 一个文档
            collection.findOne(query, function (err, rated) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                if(rated){
                    rated.summed = markdown.toHTML(rated.summed);
                }
                callback(null, rated);//成功！返回查询的用户信息
            });
        });
    });
};

Rated.getAll = function(email,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('rateds',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if(email){
                query.email = email;
            }
            collection.find(query).sort({
                time : -1
            }).toArray(function(err,docs){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,docs);
            });
        })
    })
};
Rated.getOne = function(email,date,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('rateds',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({
                "email":email,
                "date":date
            },function(err,rated){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                rated.summed = markdown.toHTML(rated.summed);
                callback(null,rated);
            });
        })
    });
}