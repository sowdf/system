var mongodb = require('./db');
var markdown = require('markdown').markdown;

function Comment(email,date,comment){
    this.email = email;
    this.date = date;
    this.comment = comment;
}
module.exports = Comment;

Comment.getUser = function(callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find().sort({
                time : -1
            }).toArray(function(err,users){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,users);
            });
        })
    })
};
Comment.getRated = function(email,date,callback){
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
                "email" : email,
                "date" : date
            },function(err,rated){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                if(rated){
                    rated.summed = markdown.toHTML(rated.summed);
                }
                callback(null,rated);
            });
        })
    })
};
Comment.prototype.save = function(callback){
    var email = this.email;
    var date = this.date;
    var comment = this.comment;
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('rateds',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.update({
                "email" : email,
                "date" : date
            },{$set : {"comment": comment}},function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            });
        });
    })
};

