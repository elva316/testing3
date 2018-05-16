var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
	first_name: {type: String, require: true},
	last_name: {type: String, require: true},
	email:{type: String, require: true, index: { unique: true }},
	password: {type: String, require: true },
	bikes: [{type: Schema.Types.ObjectId, ref: 'Bike'}]
},{timestamps: true})

var BikeSchema = mongoose.Schema({
	title: {type: String, require: true},
	desc: {type: String, require: true},
	price:{type:Number, require:true, min:1},
	location:{type: String, require: true},
	imgurl: {type: String, require: true},
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
},{timestamps: true})

var LoginSchema = mongoose.Schema({
	email:{type: String, require: true, index: { unique: true }},
	attempt:{type:Number},
	allowed_time:{type:Date},
},{timestamps: true})

var CommentSchena = mongoose.Schema({
	user:{type: String, require: true},
	title:{type: String, require: true},
	content:{type:String},
	likes:{type:Number, default:0},
	_bike: {type: Schema.Types.ObjectId, ref: 'Bike'},
},{timestamps: true})


mongoose.model('User',UserSchema),
mongoose.model('Bike',BikeSchema),
mongoose.model('Login',LoginSchema),
mongoose.model('Comment',CommentSchena)
