var bikes = require('../controllers/bikes.js');
var users = require('../controllers/users.js');
var comments = require('../controllers/comments.js');
var path = require('path');

module.exports = function(app){
	app.post('/users', (req,res)=>{users.create(req,res)})
	app.post('/login', (req,res,next)=>{users.login(req,res)})
	app.post('/bikes', (req,res,next)=>{bikes.create(req,res)})
	app.get('/bikes', (req,res,next)=>{bikes.getAll(req,res)} )
	app.get('/bikes/user/:id', (req,res,next)=>{bikes.getmybikes(req,res)} )
	app.put('/bikes/:id',(req,res,next)=>{bikes.update(req,res)} )
	app.delete('/bikes/:id',(req,res,next)=>{bikes.destroy(req,res)} )
	app.get('/users/:id',(req,res)=>{users.show(req,res)} )
	app.post('/bikes/search',(req,res,next)=>{bikes.search(req,res)} )
	app.get('/comments/bikes/:id', (req,res)=>{comments.getall(req,res)})
	app.post('/comments', (req,res)=>{comments.create(req,res)})
	app.post('/comments/likes', (req,res)=>{comments.updatelike(req,res)})

	app.all("*",function(req,res){
		res.sendFile('index.html', { root: './public/dist' });
	})
}
