var mongoose = require('mongoose');
var schema = mongoose.Schema;

var coupounSchema = new schema({
    hotelId:{type:mongoose.Schema.Types.ObjectId, ref:'Hotels', required:true},
    code:{type:String, required:false},
    discountAmount:{type:Number, required:false},
    validFrom:{type:Date},
    validUntil:{type:Date}
})

module.exports = mongoose.model("Coupons",coupounSchema)