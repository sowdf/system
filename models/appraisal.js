var mongodb = require('./db');

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
        data : this.data,
        email : this.email,
        efficiency : this.efficiency,
        mass : this.mass,
        sicence : this.sicence,
        grown : this.grown,
        summed : this.summed
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
            collection.insert(user, {
                safe: true
            }, function (err, rated) {
                mongodb.close();
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                callback(null, rated[0]);//成功！err 为 null，并返回存储后的用户文档
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
        //读取 users 集合
        db.collection('rateds', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //查找用户名（email）值为 email 一个文档
            collection.findOne({
                email: email,
                date : date
            }, function (err, rated) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                callback(null, rated);//成功！返回查询的用户信息
            });
        });
    });
};