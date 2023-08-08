var mongoose = require('mongoose');
var schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var hotelRolesEnum = require("../common/enums/hotelRoles");


const roomCategorySchema = new schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true }
})
const propertyPoliciesSchema = new schema({
    cancellationRules: { type: String, required: true },
    propertyRules: { type: String, required: true },
    notices: { type: String, required: true },
})

const hotelSchema = new schema({
    name: {
        type: String,
        require: true,
        default: ''
    },
    address: {
        type: String,
        require: true,
        default: ''
    },
    contactInfo: {
        type: {
            email: { type: String, required: true },
            phoneno: { type: String, required: true }
        },
        require: true,
        default: ''
    },
    roomCategories: {
        type: [roomCategorySchema],
        require: false
    },
    images: {
        type: [String],
        require: false,
    },
    propertyPolicies: {
        type: [propertyPoliciesSchema],
        require: false
    },
    role:{
        type:String,
        default: ''
    }
})

hotelSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Hotels', hotelSchema);
