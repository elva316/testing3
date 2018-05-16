var mongoose = require('mongoose');
var Bike = mongoose.model("Bike");
var User = mongoose.model("User");

module.exports = {
	getAll: function(req,res){
		Bike.find({}).sort({updatedAt: 'desc'}).exec(function(err,bikes){
			if(err){
				console.log(err);
				res.json({err:err});
			}
			// console.log(players);
			res.json(bikes);
		})
	},
	create: function(req,res){
        console.log(req.body);
		console.log('xxxxxxxxxxxxxxxxxxxxxxx')
		User.findOne({_id: req.body.id}, function(err, user){
            var bike =  new Bike(req.body.bike);
            bike._user = user._id;
            user.bikes.push(bike);
            bike.save(function(err){
                if(err){
                    res.json('unsuccessful');
                }else{
                    user.save(function(err){
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
    getmybikes: function(req, res){
		console.log(res + '++++++++++++++++++++++++++++++=');
        User.findOne({_id:req.params.id}).populate('bikes').exec(function(err, user){
            if(err){
                console.log(err)
                res.json('unsuccessful');
            }else{

                res.json(user);
				//console.log(res +'xkdkdkdkdkdkdkkdkdkdkdkdkdkdkdkdkkdkdkk------------------ ');
				console.log(user + '-----------------------');
            }
        })
    },

    update:function(req, res){
        Bike.findOne({_id: req.params.id}, function(err, bike){
            if(err){
                console.log(err)
            }else{
                bike.title = req.body.title;
                bike.price = req.body.price;
                bike.location = req.body.location;
                bike.desc = req.body.desc;
                bike.imgurl = req.body.imgurl;
                bike.save(function(err){
                    if(err){
                        res.json("can not update")
                    }else{
                        res.json("success");
                    }
                })
            }
        })
    },
	destroy: function(req,res){
		Bike.remove({_id: req.params.id},function(err){
			if(err){
				console.log("Delete Error: ",err);
				res.json({error:err});
			}else{
                res.json("success delete");
            }

		})
    },
    search:function(req, res){
        Bike.find({$or:[{title:{$regex:req.body.search}},{desc:{$regex:req.body.search}}]}).sort({updatedAt: 'desc'}).exec( function(err, bikes){
            if(err){
				console.log("Search Error: ",err);
				res.json({error:err});
			}else{
                res.json(bikes);
            }
        })
    }
}
