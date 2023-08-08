var mongoose = require('mongoose');
var schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new schema({
    name: { 
        type: String, 
        default: '' 
    },
    role: { 
        type: String, 
        default: '' 
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);