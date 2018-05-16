var mongoose = require('mongoose');
var Bike = mongoose.model("Bike");
var User = mongoose.model("User");
var Login = mongoose.model('Login');
var Comment = mongoose.model('Comment');

module.exports = {
    getall:function(req, res){
        Bike.findOne({_id: req.params.id}).populate('comments').exec(function(err, bike){
            if(err){
                console.log(err)
                res.json('unsuccessful');
            }else{
                
                res.json(bike);
            }
        })
    },
    create: function(req, res){
        Bike.findOne({_id: req.body.id}, function(err, bike){
            var comment = new Comment(req.body.comment);
            comment._bike = bike._id;
            bike.comments.push(comment);
            comment.save(function(err){
                if(err){
                    res.json('unsuccessful');
                }else{
                    bike.save(function(err){
                        if(err){
                            res.json('unsuccessful');
                        }else{
                            res.json('success');
                        }
                    })
                }
            })
        })
    },

    updatelike: function(req, res){
        Comment.findOne({_id: req.body.id}, function(err, comment){
            if(req.body.status == 'y'){
                comment.likes = comment.likes + 1;
                comment.save(function(err){
                    if(err){
                        res.json('unsuccessful');
                    }else{
                        res.json('success');
                    }
                })
            }else if(req.body.status == 'n'){
                comment.likes = comment.likes - 1;
                comment.save(function(err){
                    if(err){
                        res.json('unsuccessful');
                    }else{
                        res.json('success');
                    }
                })
            }
        })
    },



}