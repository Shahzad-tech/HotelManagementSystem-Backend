var mongoose = require('mongoose');
var schema = mongoose.Schema;

var reviewSchema = new schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotels", required: true },
    rating: { type: Number, min: 1, max: 5, required: false },
    comment: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Reviews",reviewSchema)