var mongoose =require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({
	"userId":String,
	"userName":String,
	"userPwd":String,
	"tel":Number,
	"Depart":String,
	"Position":String,
	"access": String,
	"name":String ,
	"registDate": String
	
});
module.exports = mongoose.model("user",userSchema);