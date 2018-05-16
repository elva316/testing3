var mongoose = require('mongoose');
var Bike = mongoose.model("Bike");
var User = mongoose.model("User");
var Login = mongoose.model('Login');

module.exports = {
	login: function(req,res){
		User.findOne({email: req.body.email }, function(err, user){
			if(err){
				console.log("login error find");
				console.log(err);
			}else{
				if(user == null){
					res.json({error:"Email is invalid!"});
				}else{
					Login.findOne({email: req.body.email }, function(err, logined){
						if(logined == null ){
							console.log("logined error find");
						}else{
						let now = new Date();

						if(logined.allowed_time < now){

							if(user.password == req.body.password){
								logined.attempt = 0;
								logined.save(function(err){});
								res.json(user);
							}else{
								logined.attempt = logined.attempt + 1;
								logined.save(function(err){});
								console.log(logined.attempt);
								res.json({error:"Password is incorrected!"});
							}
						}else{
							let diff = logined.allowed_time.getMinutes() - now.getMinutes();
							if(diff<= 0){diff = diff + 60  };
							res.json({error:"Please try login in "+diff+" minutes"});
						}
						if(logined.attempt == 5){
							logined.allowed_time = now;
							logined.allowed_time.setHours(logined.allowed_time.getHours()+1);
							logined.attempt = 0;
							logined.save(function(err){});
						}
					}
					})
					// if(user.password == req.body.password){
					// 	res.json(user);
					// }else{
					// 	res.json({error:"Password is incorrected!"});

					// }
				}
			}
		})
	},
	create: function(req,res){
		User.findOne({email: req.body.email }, function(err, user){
			if(err){
				console.log("register error find");
			}else{
				if(user == null){
					var user = new User(req.body);
					user.save(function(err,user){
						if(err){
							console.log(err);
							res.json(err);
						}else{
						res.json({message:"success", user:user});
						let d = new Date();
						var logined = new Login({email: req.body.email, attempt:0, allowed_time: d});
						logined.save(function(err){
							if(err){
								console.log(err);
							}else{
								console.log("login");
							}
						})
						}
					})

				}else{
					console.log("already have this user!!");
					res.json('email existed');
				}
			}
		})

	},
	show:function(req, res){
		User.findOne({_id:req.params.id}, function(err, user){
			if(err){
				console.log("user error find");
			}else{
				res.json(user);
			}
		})
	},
	// destroy: function(req,res){
	// 	Player.remove({_id: req.params.id},function(err){
	// 		if(err){
	// 			console.log("Delete Error: ",err);
	// 			res.json({error:err});
	// 		}
	// 		res.redirect(303,'/players');
	// 	})
	// }
}
